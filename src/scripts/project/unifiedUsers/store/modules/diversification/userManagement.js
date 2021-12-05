import { getUserManagementApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getUserSave: [],
    delBatChids: [],
    getSingle: [],
    getProCat: [],
    getResetPwd: [],
    saveExpProCat: [],
    delExpert: []

  },
  getters: {
    getUserList: state => state.getUserList,
    delBatChids: state => state.delBatChids,
    getSingle: state => state.getSingle,
    getProCat: state => state.getProCat,
    getResetPwd: state => state.getResetPwd,
    saveExpProCat: state => state.saveExpProCat,
    delExpert: state => state.delExpert
  },
  mutations: {
    GET_USERLIST(state, payload) {
      state.getUserList = payload;
    },
    DEL_BATCHIDS(state, payload) {
      state.delBatChids = payload;
    },
    GET_SINGLE(state, payload) {
      state.getSingle = JSON.parse(JSON.stringify(payload));
    },
    GET_PROCAT(state, payload) {
      state.getProCat = payload;
    },
    GET_RESETPWD(state, payload) {
      state.getResetPwd = payload;
    },
    SAVE_EXPPROCAT(state, payload) {
      state.saveExpProCat = payload;
    },
    DEL_EXPERT(state, payload) {
      state.delExpert = payload;
    }
  },
  actions: {
    // 用户查询
    getListPageInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.getListPage(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_USERLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 用户删除
    deleteBatchIdsInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.deleteBatchIds(params);
        promises.then(res => {
          commit('DEL_BATCHIDS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改列表 赋值
    getSingleByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.getSingleById(params);
        promises.then(res => {
          commit('GET_SINGLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 用户分配大类查询
    getProductCategoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.listExpertProductCategory(params);
        promises.then(res => {
          commit('GET_PROCAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 重置密码
    resetPwdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.resetPwd(params);
        promises.then(res => {
          commit('GET_RESETPWD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 用户分配大类保存
    saveExpProCatInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.saveExpertProductCategory(params);
        promises.then(res => {
          commit('SAVE_EXPPROCAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 专家删除
    deleteExpertInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getUserManagementApi.deleteExpert(params);
        promises.then(res => {
          commit('DEL_EXPERT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
