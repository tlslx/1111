import { exhibitionStatusQueryApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getExhSts: [],
    getSess: []

  },
  getters: {
    getExhSts: state => state.getExhSts,
    getSess: state => state.getSess
  },
  mutations: {
    GET_EXHSTS(state, payload) {
      state.getExhSts = payload;
    },
    GET_SESSION(state, payload) {
      state.getSess = payload;
    }
  },
  actions: {
    // 展品情况查询
    getExhibitsStatistics({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitionStatusQueryApi.getExhibitsStatistic(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let getExhSts = [];
          getExhSts.push({
            "modifyCount": res[0].modifyCount,
            "newCount": res[0].newCount,
            "noUpdateCount": res[0].noUpdateCount,
            "oldToNewCount": res[0].oldToNewCount,
            "totalCount": res[0].totalCount
          });
          commit('GET_EXHSTS', getExhSts);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取届数
    getSession({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = exhibitionStatusQueryApi.getSession();
        promises.then(res => {
          commit('GET_SESSION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
