import { exhibitionSettlementApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    ordinaryAdjustData: {}
  },
  getters: {
    ordinaryAdjustData: state => state.ordinaryAdjustData
  },
  mutations: {
    ORDINARY_ADJUST_DATA(state, payload) {
      state.ordinaryAdjustData = payload;
    }
  },
  actions: {
    // 商会查看展位数量调整申请列表查询
    getOrdinaryAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        exhibitionSettlementApi.getOrdinaryAdjustCompanyData(Object).then(res => {
          commit('ORDINARY_ADJUST_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
