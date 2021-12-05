import { brandBoothArrangementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    confirmList: []
  },
  getters: {
    confirmList: state => state.confirmList
  },
  mutations: {
    CONFIRMLIST(state, payload) {
      state.confirmList = payload;
    }
  },
  actions: {
    // 查询各类型数量安排阶段的时间点
    getConfirmList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothArrangementApi.getconfirmList(Object).then(res => {
          commit('CONFIRMLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
