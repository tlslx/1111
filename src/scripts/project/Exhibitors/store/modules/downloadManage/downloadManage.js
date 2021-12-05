import { downloadManageApi } from '../../../apis';

// 下载管理模块
export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  actions: {
    getDownList({ commit }, params) {
      return downloadManageApi.getDownList(params);
    },
    addDownMangeList({ commit }) {
      return downloadManageApi.addDownMangeList();
    },
    addDown2MangeList({ commit }, param) {
      return downloadManageApi.add2DownMangeList(param);
    },
    add3DownMangeList({ commit }) {
      return downloadManageApi.add3DownMangeList();
    }
  },
  mutations: {

  }
};
