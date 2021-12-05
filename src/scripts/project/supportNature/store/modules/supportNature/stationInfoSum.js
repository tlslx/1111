import { stationInfoSumApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    tradingGroupStationSum: {},
    aboveSecretaryGeneralSum: {},
    tradingGroupAssociationSum: {},
    leadershipSum: {}
  },
  getters: {
    tradingGroupStationSum: state => state.tradingGroupStationSum, // 商协会、交易团驻地信息统计
    aboveSecretaryGeneralSum: state => state.aboveSecretaryGeneralSum, // 商协会、交易团秘书长以上参会人员 信息统计
    tradingGroupAssociationSum: state => state.tradingGroupAssociationSum, // 各单位填报人员 信息统计
    leadershipSum: state => state.leadershipSum
  },
  mutations: {
    STATION_SUM(state, payload) {
      state.tradingGroupStationSum = payload;
    },
    ABOVE_SECRETARY_SUM(state, payload) {
      state.aboveSecretaryGeneralSum = payload;
    },
    ASSO_SUM(state, payload) {
      state.tradingGroupAssociationSum = payload;
    },
    LEADER_SUM(state, payload) {
      state.leadershipSum = payload;
    }
  },
  actions: {
    // 商协会、交易团驻地信息统计
    getTradingGroupStationSum({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stationInfoSumApi.tradingGroupStationStatistics(params);
        promises.then(res => {
          commit('STATION_SUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会、交易团秘书长以上参会人员 信息统计
    getAboveSecretaryGeneralSum({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stationInfoSumApi.aboveSecretaryGeneralStatistics(params);
        promises.then(res => {
          commit('ABOVE_SECRETARY_SUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 各单位填报人员 信息统计
    getTradingGroupAssociationSum({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stationInfoSumApi.tradingGroupAssociationStatistics(params);
        promises.then(res => {
          commit('ASSO_SUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 大会领导委员会任职名单 信息统计
    getleadershipListSum({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stationInfoSumApi.leadershipListStatistics(params);
        promises.then(res => {
          commit('LEADER_SUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
