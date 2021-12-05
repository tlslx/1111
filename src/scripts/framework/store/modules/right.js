import { constantRouterMap } from '@/router';
import utility from '@/scripts/framework/utility';
import appBlock from '@/components/framework/app/appBlock';
const _import = require('@/router/_import_' + process.env.NODE_ENV);
const state = {
  rightData: [],
  routers: constantRouterMap,
  addRouters: [],
  userInfo: {},
  token: '',
  menus: [],
  isSystemAdmin: null
};

const mutations = {
  SET_RIGHT(_state, { data }) {
    _state.rightData = data;
  },
  SET_ROUTERS: (_state, { routers }) => {
    routers.push({ path: '*', redirect: '/404', hidden: true });
    _state.addRouters = routers;
    _state.routers = constantRouterMap.concat(routers);
  },
  setMenus(_state, { menus }) {
    _state.menus = menus;
  },
  setToken(_state, { token }) {
    _state.token = token;
  },
  setUserInfo(_state, { userInfo }) {
    _state.userInfo = userInfo;
  },
  systemAdmin(_state, isSystemAdmin) {
    _state.isSystemAdmin = isSystemAdmin;
  }
};
/**
 * 生成路由
 * @param {*} menuList
 * @param {*} parentId
 * @param {*} menuUrl
 * @returns {*} tempList
 */
function genRoutes(menuList, parentId) {
  var tempList = [];
  for (let key in menuList) {
    let item = menuList[key];
    let node = {};
    if (item.parentId === parentId) {
      node.id = item.menuId;
      node.name = item.menuName;
      node.path = item.menuName;
      if (item.menuType === "2") {
        node.action = item.menuCode;
      } else if (item.menuType === "1") {
        node.leaf = true;
        if (item.state === 0) {
          node.hidden = true;
        }
        // node.path = '/' + item.menuCode;
        if (item.menuCode) {
          if (item.menuCode.indexOf('http:') !== -1) {
            node.path = item.menuCode;
          } else {
            node.path = '/' + item.menuCode;
          }
        }
        if (item.imgUrl) {
          if (item.imgUrl !== '') {
            node.subUrl = item.imgUrl;
          } else {
            node.subUrl = '';
          }
        }
        node.actions = genRoutes(menuList, item.menuId);

        try {
          if (!utility.isHttp(item.menuUrl)) {
            if (item.menuUrl) {
              node.component = _import(item.menuUrl);
            } else {
              node.component = appBlock;
            }
          } else {
            node.path = item.menuUrl;
          }
        } catch (e) {
          node.component = appBlock;
        }
      } else {
        if (parentId === "0") {
          node.iconCls = "el-icon-info";
        }
        node.name = node.name + " ";
        if (item.state === 0) {
          node.hidden = true;
        }
        node.component = appBlock;
        node.path = item.menuName;
        node.children = genRoutes(menuList, item.menuId);
      }
      tempList.push(node);
    }
  }
  return tempList;
}

/**
 * 获取权限信息
 * @param {*} menuList
 * @param {*} parentId
 * @returns {*} data
 */
function genRight(menuList, parentId) {
  var data = [];
  for (let key in menuList) {
    let item = menuList[key];
    if (item.parentId === parentId) {
      if (item.menuType === "2") {
        data[item.menuCode] = true;
      }
    }
  }
  return data;
}
/**
 *
 * @param {*} menuList
 * @param {*} parentId
 * @returns {*} data
 */
function genActions(menuList, parentId) {
  var data = [];
  for (let key in menuList) {
    let item = menuList[key];
    if (item.parentId === parentId) {
      if (item.menuType === "2") {
        data[item.menuCode] = true;
      } else if (item.menuType === "1") {
        let rightItem = {};
        rightItem.pageId = item.menuId;
        rightItem.pageCode = item.menuCode;
        rightItem.right = genRight(menuList, item.menuId);
        // if (item.menuName === "菜单管理") {
        //   console.log(rightItem);
        // }
        data.push(rightItem);
      } else {
        data = data.concat(genActions(menuList, item.menuId));
      }
    }
  }
  return data;
}

const actions = {
  getRight({ commit, rootGetters }, menu) {
    var routers = genRoutes(menu, "0");
    var rightData = genActions(menu, "0");
    commit('SET_ROUTERS', { routers });
    commit('SET_RIGHT', { data: rightData });
    commit('setMenus', { menus: menu });
  },
  getMenuRight({ commit, rootGetters }, menu) {
    var routers = genRoutes(menu.children, menu.menuId);
    var rightData = genActions(menu.children, menu.menuId);
    // console.log(JSON.stringify(routers));
    // routers = routers[0].children;
    commit('SET_ROUTERS', { routers });
    commit('SET_RIGHT', { data: rightData });
    commit('setMenus', { menus: menu });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
