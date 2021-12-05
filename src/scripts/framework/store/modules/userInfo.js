import http from '@/scripts/framework/http';
import utility from '@/scripts/framework/utility';
const state = {
  data: {},
  isSystemAdmin: null,
  companyId: "",
  userType: "",
  businessDelegationId: ""
};

const mutations = {
  setUserInfo(_state, { userInfo }) {
    _state.data = userInfo;
  },
  systemAdmin(_state, isSystemAdmin) {
    _state.isSystemAdmin = isSystemAdmin;
  },
  GET_COMPANY_ID(_state, payload) {
    _state.companyId = payload;
  },
  GET_USER_TYPE(_state, payload) {
    _state.userType = payload;
  },
  GET_BUSINESS_DELEGATION_ID(_state, payload) {
    _state.businessDelegationId = payload;
  }
};
const getters = {
  companyId: _state => state.companyId,
  userType: _state => state.userType,
  businessDelegationId: _state => state.businessDelegationId
};

const actions = {

  getUserInfo({ commit, dispatch }, { callback } = {}) {
    try {
      // let url = process.env.SSO_BASE_URL;
      let roleId = kindo.cache.get(kindo.constant.USER_ROLE, 'session');
      if (!roleId) {
        roleId = '';
      }
      let reqSsoToken = kindo.cache.get(kindo.constant.USER_TOKEN);
      let userdata = kindo.cache.get('USER_DATA');
      let url = kindo.config.api.comsUrl;
      // console.log(userdata);
      // 读取info缓存
      if (reqSsoToken) {
        commit('setToken', { token: reqSsoToken }, { root: true });
        url += '/api/security/info?IASID=' + process.env.IASID;
        // url += '/api/security/info?IASID=' + process.env.IASID + '&roleId=' + roleId;
        if (userdata) {
          setTimeout(() => {
            commit('GET_COMPANY_ID', userdata.user.workDeptCode); // 暂存在state里的企业和个人ID
            commit('GET_USER_TYPE', userdata.org.deptType); // 暂存在state里的登陆用户类型（企业/个人）
            commit('GET_BUSINESS_DELEGATION_ID', userdata.org.deptId); // 获取交易团ID
            if (typeof userdata !== 'undefined' && userdata != null) {
              let dept = {};
              if (userdata.org) {
                if (userdata.org.type === "2") {
                  dept.id = userdata.org.parentId;
                  dept.name = userdata.org.parentName;
                  dept.code = userdata.org.oaParentCode;
                } else {
                  dept.id = userdata.org.deptId;
                  dept.name = userdata.org.deptName;
                  dept.code = userdata.org.deptCode;
                }
              }
              let roleIds = userdata.roles.map(item => item.roleId).toString();
              commit('setUserInfo', {
                userInfo: Object.assign({
                  org: userdata.org,
                  role: userdata.roles,
                  roleIds: roleIds,
                  dept,
                  menus: userdata.menus,
                  loginTime: userdata.loginTime
                }, userdata.user)
              });
              kindo.cache.set(kindo.constant.USER_MENU, userdata.menus, 'session');
              // kindo.cache.set(kindo.constant.USER_MENUTREE, userdata.menuTree, 'session');
              kindo.cache.set(kindo.constant.USER_INFO, userdata.roles, 'session');
              // console.log(JSON.stringify(userdata.menus));
              dispatch('right/getRight', (userdata.menus || []), { root: true });
              if (utility.isFunction(callback)) {
                return callback(true);
              }
            }
          }, 1000);
        } else {
          http.get(url).then(data => {
            // localStorage.setItem("userIdBf", data.user.userId);
            // localStorage.setItem("getComPanyId", data.user.workDeptCode); // 登陆公司ID
            // localStorage.setItem("getDeptCode", data.user.workDeptId); // 登陆公司账号类别（GR:个人，QY:企业）
            commit('GET_COMPANY_ID', data.user.workDeptCode); // 暂存在state里的企业和个人ID
            commit('GET_USER_TYPE', data.org.deptType); // 暂存在state里的登陆用户类型（企业/个人）
            commit('GET_BUSINESS_DELEGATION_ID', data.org.deptId); // 获取交易团ID
            if (typeof data !== 'undefined' && data != null) {
              kindo.cache.set('USER_DATA', data, 'session');
              let dept = {};
              if (data.org) {
                if (data.org.type === "2") {
                  dept.id = data.org.parentId;
                  dept.name = data.org.parentName;
                  dept.code = data.org.oaParentCode;
                } else {
                  dept.id = data.org.deptId;
                  dept.name = data.org.deptName;
                  dept.code = data.org.deptCode;
                }
              }
              let roleIds = data.roles.map(item => item.roleId).toString();
              commit('setUserInfo', {
                userInfo: Object.assign({
                  org: data.org,
                  role: data.roles,
                  roleIds: roleIds,
                  dept,
                  menus: data.menus,
                  loginTime: data.loginTime
                }, data.user)
              });
              kindo.cache.set(kindo.constant.USER_MENU, data.menus, 'session');
              // kindo.cache.set(kindo.constant.USER_MENUTREE, data.menuTree, 'session');
              kindo.cache.set(kindo.constant.USER_INFO, data.roles, 'session');
              kindo.cache.set(kindo.constant.THEME, kindo.config, 'session');
              // console.log(JSON.stringify(data.menus));
              dispatch('right/getRight', (data.menus || []), { root: true });
            }
            if (utility.isFunction(callback)) {
              return callback(true);
            }
          }).catch(result => {
            if (utility.isFunction(callback)) {
              kindo.cache.remove(kindo.constant.USER_TOKEN);
              localStorage.removeItem(kindo.constant.USER_TOKEN);
              return callback(false);
            }
          });
        }

      } else {
        return callback(false);
      }
    } catch (err) {
      if (utility.isFunction(callback)) {
        return callback(false);
      }
    }
  },
  setDeveloper({ commit, dispatch }) {
    commit('setUserInfo', { userInfo: { account: process.env.DEVELOPER_ID }});
    commit('setToken', { token: process.env.TOKEN }, { root: true });
    dispatch('right/getRight', [], { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
