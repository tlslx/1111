import { newThemeCompanyApplyApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    tradeCenterApplyData: {},
    companyApplyInfo: {}
  },
  getters: {
    tradeCenterApplyData: state => state.tradeCenterApplyData,
    companyApplyInfo: state => state.companyApplyInfo
  },
  mutations: {
    TRADE_CENTER_APPLY_DATA(state, payload) {
      state.tradeCenterApplyData = payload;
    },
    COMPANY_APPLY_INFO(state, payload) {
      state.companyApplyInfo = payload;
    }
  },
  actions: {
    // 企业申请信息设置查询
    getCompanyApplySetInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCompanyApplyApi.getCompanyApplySetInfoData(Object).then(res => {
          commit('COMPANY_APPLY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业申请信息设置新增
    postCompanyApplySetInfoAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCompanyApplyApi.postCompanyApplySetInfoAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业申请信息设置修改
    postCompanyApplySetInfoEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCompanyApplyApi.postCompanyApplySetInfoEditData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业申请信息设置删除
    postCompanyApplySetInfoDelete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCompanyApplyApi.postCompanyApplySetInfoDeleteData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业申请情况查询
    getTradeCenterApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCompanyApplyApi.getTradeCenterApplyData(Object).then(res => {
          commit('TRADE_CENTER_APPLY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸中心标注
    postTradeCenterLabel({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeCompanyApplyApi.postTradeCenterLabelData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
