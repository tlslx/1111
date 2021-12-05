import { brandWorkDepartmentApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    // 这里放置的是静态参数
    reportData: [],
    getQueryReview: [],
    getBrandEvaluation: [],
    deleteRewiew: [],
    updateBased: []
  },
  getters: {
    // 类似计算属性
    reportData: state => state.reportData,
    getQueryReview: state => state.getQueryReview,
    getBrandEvaluation: state => state.getBrandEvaluation,
    deleteRewiew: state => state.deleteRewiew,
    updateBased: state => state.updateBased
  },
  mutations: {
    REPORT_DATA(state, payload) {
      state.reportData = payload;
    },
    GET_QUERY_REVIEW(state, payload) {
      state.getQueryReview = payload;
    },
    GET_BRAND_EVALUATION(state, payload) {
      state.getBrandEvaluation = payload;
    },
    DELETE_REVIEW(state, payload) {
      state.deleteRewiew = payload;
    },
    UPDATE_BASED(state, payload) {
      state.updateBased = payload;
    }
  },
  actions: {
    // 添加工作部品牌评审规则设置
    getaddWorkDepartmentBrand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandWorkDepartmentApi.addWorkDepartmentBrand(Object).then(res => {
          commit('REPORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据主键ID查询工作部评审规则设置
    getqueryReviewRuleSettings({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandWorkDepartmentApi.getQueryReviewRuleSettings(Object).then(res => {
          commit('GET_QUERY_REVIEW', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询工作部品牌评审规则列表
    getbrandEvaluationRules({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandWorkDepartmentApi.getBrandEvaluationRules(Object).then(res => {
          commit('GET_BRAND_EVALUATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据主键Id删除评审规则
    deletereviewRules({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandWorkDepartmentApi.deleteReviewRules(Object).then(res => {
          commit('DELETE_REVIEW', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据主键ID更新
    updatebasedPrimaryKey({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandWorkDepartmentApi.updateBasedPrimaryKey(Object).then(res => {
          commit('UPDATE_BASED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
