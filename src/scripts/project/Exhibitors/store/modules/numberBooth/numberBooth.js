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
    // ????????????????????????
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
    // ?????????????????????????????????
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
    // ????????????????????????
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
    // ????????????????????? ????????????
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
    // ????????????????????? ??????????????????
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
    // ????????????????????? ??????????????????
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
    // ?????????????????????????????????
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
    // ?????????????????? ??????
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
    // ?????????????????? ?????? ???????????????????????????
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
    // ?????????????????? ?????? ??????
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
    //??????????????????????????????
    getCheckCompanyBoothList({ commit }, param) {
      return numberBoothApi.getCheckCompanyBoothList(param);
    }
  }
};
