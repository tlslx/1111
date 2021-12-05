import { enterpriseReturnApplyApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    reviewListData: {},
    applyDetailsData: {},
    affirmCompanyInfo: {},
    confirmDetailData: {},
    workViewData: {},
    enterpriseNameList: [],
    exhibitionList: []
  },
  getters: {
    reviewListData: state => state.reviewListData,
    applyDetailsData: state => state.applyDetailsData,
    affirmCompanyInfo: state => state.affirmCompanyInfo,
    confirmDetailData: state => state.confirmDetailData,
    workViewData: state => state.workViewData,
    enterpriseNameList: state => state.enterpriseNameList,
    exhibitionList: state => state.exhibitionList
  },
  mutations: {
    REVIEW_LIST_DATA(state, payload) {
      state.reviewListData = payload;
    },
    APPLY_DETAILS_DATA(state, payload) {
      state.applyDetailsData = payload;
    },
    AFFIRM_COMPANY_INFO(state, payload) {
      state.affirmCompanyInfo = payload;
    },
    CONFIRM_DETAIL_DATA(state, payload) {
      state.confirmDetailData = payload;
    },
    WORK_VIEW_DATA(state, payload) {
      state.workViewData = payload;
    },
    ENTERPRISENAMELIST(state, payload) {
      state.enterpriseNameList = payload;
    },
    EXHIBITIONLIST(state, payload) {
      state.exhibitionList = payload;
    }
  },
  actions: {
    // 外贸司查看商协会评审
    postReviewList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postReviewListData(Object).then(res => {
          commit('REVIEW_LIST_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除
    postBoothreturnedDelete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.boothreturnedDelete(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 通过or不通过
    postRefundApplyOper({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postRefundApplyOperData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取退回详情
    postApplicationDetail({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postApplicationDetailData(Object).then(res => {
          commit('APPLY_DETAILS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增申请---根据企业、展区获取品牌确认信息
    getAffirmCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.getAffirmCompanyInfoData(Object).then(res => {
          commit('AFFIRM_COMPANY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业确认退回申请书上传
    postConfirmDetailUpload({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postConfirmDetailUploadData(Object).then(res => {
          commit('CONFIRM_DETAIL_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增申请提交
    postAddApplySubmit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postAddApplySubmitData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看汇总
    postSummaryList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postSummaryListData(Object).then(res => {
          commit('WORK_VIEW_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部审核
    postBackBookCheckSubmit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.postBackBookCheckSubmitData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团发起申请(企业名称)
    getEnterprisename ({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.getenterprisename(Object).then(res => {
          commit('ENTERPRISENAMELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团发起申请(展区联想)
    getExhibitionname ({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseReturnApplyApi.getexhibitionname(Object).then(res => {
          commit('EXHIBITIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
