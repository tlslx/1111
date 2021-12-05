import { newThemeRecommendCompanyApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    recommendCoceralData: {},
    oneDemandData: {},
    companyBaseInfoData: {},
    recommendWorkDepartData: {},
    rangeWorkDepart: {}
  },
  getters: {
    recommendCoceralData: state => state.recommendCoceralData,
    oneDemandData: state => state.oneDemandData,
    companyBaseInfoData: state => state.companyBaseInfoData,
    recommendWorkDepartData: state => state.recommendWorkDepartData,
    rangeWorkDepart: state => state.rangeWorkDepart
  },
  mutations: {
    RECOMMEND_COCERAL_DATA(state, payload) {
      state.recommendCoceralData = payload;
    },
    ONE_DEMAND_DATA(state, payload) {
      state.oneDemandData = payload;
    },
    COMPANY_BASE_INFO_DATA(state, payload) {
      state.companyBaseInfoData = payload;
    },
    RECOMMEND_WORK_DEPART_DATA(state, payload) {
      state.recommendWorkDepartData = payload;
    },
    RANGE_WORK_DEPART(state, payload) {
      state.rangeWorkDepart = payload;
    }
  },
  actions: {
    // 商协会推荐列表（新题材）查询
    getRecommendByCoceral({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.getRecommendByCoceralData(Object).then(res => {
          commit('RECOMMEND_COCERAL_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会推荐列表（新题材）推荐
    postRecommendCoceral({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.postRecommendCoceralData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取单条企业展位申请信息
    getOneDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.getOneDemandData(Object).then(res => {
          commit('ONE_DEMAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取企业基本信息
    getCompanyBaseInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.getCompanyBaseInfoData(Object).then(res => {
          commit('COMPANY_BASE_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部获取商协会查看范围（新题材）
    getRangeWorkDepart({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.getRangeWorkDepartData(Object).then(res => {
          commit('RANGE_WORK_DEPART', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部设置商协会查看范围（新题材）
    postRangeSetByWorkDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.postRangeSetByWorkDepartmentData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看审核推荐情况（新题材）查询
    getRecommendCheckWorkDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeRecommendCompanyApi.getRecommendCheckWorkDepartmentData(Object).then(res => {
          commit('RECOMMEND_WORK_DEPART_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
