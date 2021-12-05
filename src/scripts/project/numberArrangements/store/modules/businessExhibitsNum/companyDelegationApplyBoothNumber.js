import { companyDelegationApplyBoothNumberApi } from "../../../apis";
import { $helper } from '../../../../utils';

export default {
  namespaced: true,
  state: {
    ordinaryAdjustData: {},
    originalRecommendNum: {},
    uploadData: {},
    blackCompanyInfo: {}
  },
  getters: {
    ordinaryAdjustData: state => state.ordinaryAdjustData,
    originalRecommendNum: state => state.originalRecommendNum,
    uploadData: state => state.uploadData,
    blackCompanyInfo: state => state.blackCompanyInfo
  },
  mutations: {
    ORDINARY_ADJUST_DATA(state, payload) {
      state.ordinaryAdjustData = payload;
    },
    ORIGINAL_RECOMMEND_NUM(state, payload) {
      state.originalRecommendNum = payload;
    },
    UPLOAD_DATA(state, payload) {
      state.uploadData = payload;
    },
    BLACK_COMPANY_INFO(state, payload) {
      state.blackCompanyInfo = payload;
    }
  },
  actions: {
    // 交易团审核企业特装数量调整申请查询
    getOrdinaryAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyDelegationApplyBoothNumberApi.getOrdinaryAdjustCompanyData(Object).then(res => {
          commit('ORDINARY_ADJUST_DATA', res);
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          res.cecfCodeOpts = $helper.filterDataToSelect(res.records, 'cecfCode', 'cecfCode');
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据企业id和展区获取原推荐数量
    postOriginalRecommendNum({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyDelegationApplyBoothNumberApi.postOriginalRecommendNumData(Object).then(res => {
          commit('ORIGINAL_RECOMMEND_NUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 上传调整材料
    postOrdinaryAdjustCompanyUpload({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyDelegationApplyBoothNumberApi.postOrdinaryAdjustCompanyUploadData(Object).then(res => {
          commit('UPLOAD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增展位数量调整申请
    postAddBoothNumberApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyDelegationApplyBoothNumberApi.postAddBoothNumberApplyData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核企业展位数量调整申请
    postCheckByDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyDelegationApplyBoothNumberApi.postCheckByDelegationData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据企业ID、展区code查询企业黑名单信息
    postIfBlackCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyDelegationApplyBoothNumberApi.postIfBlackCompanyInfoData(Object).then(res => {
          commit('BLACK_COMPANY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
