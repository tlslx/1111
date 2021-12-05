import { materialStatisticsApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listAll: []
  },
  getters: {
    listAll: state => state.listAll
  },
  mutations: {
    LIST_ALL(state, payload) {
      state.listAll = payload;
    }
  },
  actions: {
    // 查看材料统计信息
    selectListAll({ commit }, params) {
      return new Promise((resolve, reject) => {
        materialStatisticsApi.getListAll(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_ALL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
