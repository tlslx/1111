import { jobIndexApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    IndicatorManagement: [],
    jodIndicator: []
  },
  getters: {
    IndicatorManagement: state => state.IndicatorManagement,
    jodIndicator: state => state.jodIndicator
  },
  mutations: {
    INDICATOR_MANAGEMENT(state, payload) {
      state.IndicatorManagement = payload;
    },
    JOD_INDICATOR(state, payload) {
      state.jodIndicator = payload;
    }
  },
  actions: {
    // 查看指标管理信息
    selectIndicatorManagement({ commit }, params) {
      return new Promise((resolve, reject) => {
        jobIndexApi.IndicatorManagement(params).then(res => {
          commit('INDICATOR_MANAGEMENT', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看作业指标信息
    selectJodIndicator({ commit }, params) {
      return new Promise((resolve, reject) => {
        jobIndexApi.JodIndicator(params).then(res => {
          commit('JOD_INDICATOR', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
