import { newThemeCheckRecommendCompanyApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    tradeCenterApplyData: {},
    recommendByDelegationData: {},
    oneDemandData: {}
  },
  getters: {
    tradeCenterApplyData: state => state.tradeCenterApplyData,
    recommendByDelegationData: state => state.recommendByDelegationData,
    oneDemandData: state => state.oneDemandData
  },
  mutations: {
    TRADE_CENTER_APPLY_DATA(state, payload) {
      state.tradeCenterApplyData = payload;
    },
    RECOMMEND_BY_DELEGATION_DATA(state, payload) {
      state.recommendByDelegationData = payload;
    },
    ONE_DEMAND_DATA(state, payload) {
      state.oneDemandData = payload;
    }
  },
  actions: {
    // 交易团审核企业资质列表（新题材）查询
    getCheckByDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.getCheckByDelegationData(Object).then(res => {
          commit('TRADE_CENTER_APPLY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取单条企业展位申请信息
    getOneDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.getOneDemandData(Object).then(res => {
          commit('ONE_DEMAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核企业资料（新题材）
    postCheckCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postCheckCompanyInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团企业申请审核（新题材）
    postCheckCompanyApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postCheckCompanyApplyData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核保存企业类型
    postSaveCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postSaveCompanyInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核保存
    postSaveCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postSaveCompanyData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核符合
    postCheckIfMeet({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postCheckIfMeetData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团推荐企业列表查询
    getRecommendByDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.getRecommendByDelegationData(Object).then(res => {
          commit('RECOMMEND_BY_DELEGATION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团推荐企业改变企业类型
    postRecommendChangeCompanyType({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postRecommendChangeCompanyTypeData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团推荐企业（新题材）
    postRecommendByDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCheckRecommendCompanyApi.postRecommendByDelegationData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
