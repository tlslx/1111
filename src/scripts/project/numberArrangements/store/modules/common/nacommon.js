import { nacommonApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    gsearch: ''
  },
  getters: {
    gsearch: state => state.gsearch
  },
  mutations: {
    GET_SEARCH(state, payload) {
      state.gsearch = payload;
    }
  },
  actions: {
    // 查看vip企业参数
    getsearch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        nacommonApi.getSearch(Object).then(res => {
          commit('GET_SEARCH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
