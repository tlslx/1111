import { downTotalApi } from '../../../apis';

// 下载管理模块
export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  actions: {
    getDownList({ commit }, params) {
      return downTotalApi.getDownList(params);
    },
    addDownMangeList({ commit }) {
      return downTotalApi.addDownMangeList();
    },
    addDown2MangeList({ commit }, param) {
      return downTotalApi.add2DownMangeList(param);
    },
    add3DownMangeList({ commit }) {
      return downTotalApi.add3DownMangeList();
    }
  },
  mutations: {

  }
};
