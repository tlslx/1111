import { businessAssociationSubmissionApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    getBusiness: [],
    saveBusiness: [],
    saveBatch: [],
    saveSubmit: [],
    downloadTemplate: [],
    addBatch: []
  },
  getters: {
    getBusiness: state => state.getBusiness,
    saveBusiness: state => state.saveBusiness,
    saveBatch: state => state.saveBatch,
    saveSubmit: state => state.saveSubmit,
    downloadTemplate: state => state.downloadTemplate,
    addBatch: state => state.addBatch
  },
  mutations: {
    GET_BUSINESS(state, payload) {
      state.getBusiness = payload;
    },
    SAVE_BUSINESS(state, payload) {
      state.saveBusiness = payload;
    },
    SAVE_BATCH(state, payload) {
      state.saveBatch = payload;
    },
    SAVE_SUBMIT(state, payload) {
      state.saveSubmit = payload;
    },
    DOWNLOAD_TEMPLATE(state, payload) {
      state.downloadTemplate = payload;
    },
    ADD_BATCH(state, payload) {
      state.addBatch = payload;
    }
  },
  actions: {
    // 商协会查询数量安排方案列表
    getbusinessAssociation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        businessAssociationSubmissionApi.getBusinessAssociation(Object).then(res => {
          commit('GET_BUSINESS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会填写保存安排品牌展位数量方案（单个方案保存）
    savebusinessAssociation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        businessAssociationSubmissionApi.saveBusinessAssociation(Object).then(res => {
          commit('SAVE_BUSINESS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会填写保存安排品牌展位数量方案（批量方案保存）
    savebatchBusinessAssociation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        businessAssociationSubmissionApi.saveBatchBusinessAssociation(Object).then(res => {
          commit('SAVE_BATCH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会品牌展位数量安排方案提交（批量）
    savesubmitQuantityPlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        businessAssociationSubmissionApi.saveSubmitQuantityPlan(Object).then(res => {
          commit('SAVE_SUBMIT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会品牌展位数量安排excel下载模板（待完成）
    downloadtemplate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        businessAssociationSubmissionApi.downloadTemplate(Object).then(res => {
          commit('DOWNLOAD_TEMPLATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会品牌展位数量安排方案上传（待完成）
    addbatchUploadExcel({ commit }, Object) {
      return new Promise((resolve, reject) => {
        businessAssociationSubmissionApi.addBatchUploadExcel(Object).then(res => {
          commit('ADD_BATCH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
