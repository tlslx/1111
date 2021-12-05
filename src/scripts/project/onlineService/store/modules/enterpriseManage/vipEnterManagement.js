import { vipEnterManagementApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getRecosum: '',
    addRecBuyer: {},
    deletePur: {},
    updatePur: {}
  },
  getters: {
    getRecosum: state => state.getRecosum,
    addRecBuyer: state => state.addRecBuyer,
    deletePur: state => state.deletePur,
    updatePur: state => state.updatePur
  },
  mutations: {
    GET_RECOSUM(state, payload) {
      state.getRecosum = payload;
    },
    ADD_REC_BUYER(state, payload) {
      state.addRecBuyer = payload;
    },
    DELETE_PURCHASER(state, payload) {
      state.deletePur = payload;
    },
    UPDATE_PURCHASER(state, payload) {
      state.updatePur = payload;
    }
  },
  actions: {
    //新增采购信息
    addRecommendBuyersInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        vipEnterManagementApi.addRecommendBuyers(params).then(res => {
          commit('ADD_REC_BUYER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //删除采购信息
    deletePurchaserInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        vipEnterManagementApi.deletePurchaser(params).then(res => {
          commit('DELETE_PURCHASER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //编辑采购信息
    updatePurchaserInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        vipEnterManagementApi.updatePurchaser(params).then(res => {
          commit('UPDATE_PURCHASER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看推荐采购商列表信息
    getRecoSumInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = vipEnterManagementApi.getRecoSum(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            commit('GET_RECOSUM', res);
          }
          resolve(res);
        });
      });
    }
  }
};
