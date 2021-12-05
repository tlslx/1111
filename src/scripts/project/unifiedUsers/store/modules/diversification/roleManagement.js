import { roleManagementApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getRole: [],
    getRoleSave: [],
    getPubStas: [],
    delRole: [],
    getUserList: [],
    getUserPage: [],
    modDynTra: [],
    getSingle: [],
    getListAll: [],
    updateById: []

  },
  getters: {
    getRole: state => state.getRole,
    getRoleSave: state => state.getRoleSave,
    getPubStas: state => state.getPubStas,
    delRole: state => state.delRole,
    modDynTra: state => state.modDynTra,
    getUserPage: state => state.getUserPage,
    getUserList: state => state.modDynTra,
    getSingle: state => state.getSingle,
    getListAll: state => state.getListAll,
    updateById: state => state.updateById
  },
  mutations: {
    GET_ROLE(state, payload) {
      state.getRole = payload;
    },
    GET_ROLESAVE(state, payload) {
      state.getRoleSave = payload;
    },
    GET_PUBSTAS(state, payload) {
      state.getPubStas = payload;
    },
    DEL_ROLE(state, payload) {
      state.delRole = payload;
    },
    MOD_DYNTRA(state, payload) {
      state.modDynTra = payload;
    },
    GET_USERLIST(state, payload) {
      state.getUserList = payload;
    },
    GET_USERPAGE(state, payload) {
      state.getUserPage = JSON.parse(JSON.stringify(payload));
    },
    GET_SINGLE(state, payload) {
      state.getSingle = JSON.parse(JSON.stringify(payload));
    },
    GET_LISTALL(state, payload) {
      state.getListAll = payload;
    },
    UPDATE_BYID(state, payload) {
      state.updateById = payload;
    }
  },
  actions: {
    // 角色列表查询
    getRoleList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.getRoleList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_ROLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 角色列表删除
    delRoleInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.delRole(params);
        promises.then(res => {
          commit('DEL_ROLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 角色创建
    getroleSaveInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.getroleSave(params);
        promises.then(res => {
          commit('GET_ROLESAVE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },

    // 修改角色
    modificationDynamicTrade({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.modificationDynamicTrade(params);
        promises.then(res => {
          commit('MOD_DYNTRA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询用户
    getUserListInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.getUserList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_USERLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增用户
    getListPageInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.getListPage(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_USERPAGE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改列表 赋值
    getSingleByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.getSingleById(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_SINGLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 权限列表
    getListAllInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.getListAll(params);
        promises.then(res => {
          commit('GET_LISTALL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 角色修改
    updateByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = roleManagementApi.updateById(params);
        promises.then(res => {
          commit('UPDATE_BYID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }


  }
};
