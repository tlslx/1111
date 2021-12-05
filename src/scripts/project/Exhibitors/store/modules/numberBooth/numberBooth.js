import { numberBoothApi } from "../../../apis";
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    applyInfoData: {},
    checkHasLastOrder: {},
    checkIsAppliedData: {},
    blackCompanyListData: {},
    downloadApplyFileData: {},
    productsOfCompanyData: {},
    getExhibitionRegionData: {},
    applicationBoothListData: {},
    applicationExhibitsAddData: {},
    uploadApplySheetAndArticleData: {}
  },
  getters: {
    applyInfoData: state => state.applyInfoData,
    checkHasLastOrder: state => state.checkHasLastOrder,
    checkIsAppliedData: state => state.checkIsAppliedData,
    blackCompanyListData: state => state.blackCompanyListData,
    exhibitionRegionData: state => state.exhibitionRegionData,
    productsOfCompanyData: state => state.productsOfCompanyData,
    downloadApplyFileData: state => state.downloadApplyFileData,
    applicationBoothListData: state => state.applicationBoothListData,
    applicationExhibitsAddData: state => state.applicationExhibitsAddData,
    uploadApplySheetAndArticleData: state => state.uploadApplySheetAndArticleData
  },
  mutations: {
    APPLY_INFO_DATA(state, payload) {
      state.applyInfoData = payload;
    },
    CHECK_HAS_LAST_ORDER(state, payload) {
      state.checkHasLastOrder = payload;
    },
    CHECK_IS_APPLIED(state, payload) {
      state.checkIsAppliedData = payload;
    },
    BLACK_COMPANY_DATA(state, payload) {
      state.blackCompanyListData = payload;
    },
    PRODUCES_OF_COMPANY(state, payload) {
      state.productsOfCompanyData = payload;
    },
    EXHIBITION_REGION_DATA(state, payload) {
      state.exhibitionRegionData = payload;
    },
    APPLICATION_BOOTH_DATA(state, payload) {
      state.applicationBoothListData = payload;
    },
    DOWN_LOAD_APPLIED_FILE_DATA(state, payload) {
      state.downloadApplyFileData = payload;
    },
    APPLICATION_EXHIBITS_ADD_DATA(state, payload) {
      state.applicationExhibitsAddData = payload;
    },
    UPLOAD_APPLY_SHEET_AND_ARTICLE_DATA(state, payload) {
      state.uploadApplySheetAndArticleData = payload;
    }
  },
  actions: {
    // 申请展位接口获取
    getApplicationBooth({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getApplicationBoothData(Object).then(res => {
          commit('APPLICATION_BOOTH_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 申请展位黑名单接口获取
    getBlackCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getBlackCompanyData(utility.urlEncode(JSON.stringify(Object))).then(res => {
          commit('BLACK_COMPANY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位新增提交校验
    getCheckIsApplied({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getCheckIsAppliedData(utility.urlEncode(JSON.stringify(Object))).then(res => {
          commit('CHECK_IS_APPLIED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位新增组件中 专区接口
    getExhibitionRegion({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getExhibitionRegionData(Object).then(res => {
          commit('EXHIBITION_REGION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位新增组件中 主要展品接口
    getProductsOfCompany({ commit }, param) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getProductsOfCompanyData(param).then(res => {
          commit('PRODUCES_OF_COMPANY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位新增组件中 提交按钮接口
    getApplicationExhibitsAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getApplicationExhibitsAddData(Object).then(res => {
          commit('APPLICATION_EXHIBITS_ADD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询上届是否有达成订单
    getCheckHasLastOrder({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getCheckHasLastOrderData().then(res => {
          commit('CHECK_HAS_LAST_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 申请展位列表 编辑
    getApplyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getApplyInfoData(Object).then(res => {
          commit('APPLY_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 申请展位列表 编辑 下载展位申请表模板
    getDownLoadApplyFile({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getDownLoadApplyFileData(Object).then(res => {
          commit('DOWN_LOAD_APPLIED_FILE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 申请展位列表 编辑 上传
    getUploadApplySheetAndArticle({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBoothApi.getUploadApplySheetAndArticleData(Object).then(res => {
          commit('UPLOAD_APPLY_SHEET_AND_ARTICLE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //审核企业展位申请列表
    getCheckCompanyBoothList({ commit }, param) {
      return numberBoothApi.getCheckCompanyBoothList(param);
    }
  }
};
