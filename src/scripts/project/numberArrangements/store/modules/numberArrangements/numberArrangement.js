import { numberArrangementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getNumber: [],
    postNumber: []
  },
  getters: {
    getNumber: state => state.getNumber,
    postNumber: state => state.postNumber
  },
  mutations: {
    REPORT_DATA(state, payload) {
      state.getNumber = payload;
    },
    REPORT_CATA(state, payload) {
      state.postNumber = payload;
    }
  },
  actions: {
    //商协会提交品牌展位数量安排方案
    getNumberArrangement({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberArrangementApi.numberArrangement(obj).then(res => {
          commit('REPORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    postNumberArrangement({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberArrangementApi.numberBrrangement(obj).then(res => {
          commit('REPORT_CATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
