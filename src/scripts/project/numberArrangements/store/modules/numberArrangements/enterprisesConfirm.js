import { enterprisesConfirmApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getEnter: [],
    postEview: [],
    getente: [],
    postente: [],
    postSum: [],
    getAubm: [],
    addBcf: []
  },
  getters: {
    getEnter: state => state.getEnter,
    postEview: state => state.postEview,
    getente: state => state.getente,
    postente: state => state.postente,
    postSum: state => state.postSum,
    getAubm: state => state.getAubm,
    addBcf: state => state.addBcf
  },
  mutations: {
    REPORT_DATA(state, payload) {
      state.getEnter = payload;
    },
    REPORT_BATA(state, payload) {
      state.postEview = payload;
    },
    REPORT_CATA(state, payload) {
      state.getente = payload;
    },
    REPORT_ATA(state, payload) {
      state.postente = payload;
    },
    REPORT_BTA(state, payload) {
      state.postSum = payload;
    },
    REPORT_TATA(state, payload) {
      state.getAubm = payload;
    },
    ADD_BCF(state, payload) {
      state.addBcf = payload;
    }
  },
  actions: {
    //交易团查看企业退回申请书
    getEnterpriseReturn({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.enterpriseReturn(obj).then(res => {
          commit('REPORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //审核企业资料详情页
    postEviewBusiness({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.eviewBusiness(obj).then(res => {
          commit('REPORT_BATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业提交品牌展位退回确认书
    getEnterprisesSubmit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.enterprisesSubmit(obj).then(res => {
          commit('REPORT_CATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    getEnterprisesAubmit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.enterprisesAubmit(obj).then(res => {
          commit('REPORT_TATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    postEnterprisesBubmit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.enterprisesBubmit(obj).then(res => {
          commit('REPORT_ATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团汇总退回展位数
    postSummarized({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.summarized(obj).then(res => {
          commit('REPORT_BTA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //上传确认书
    addbackConfirmation({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enterprisesConfirmApi.addBackConfirmation(obj).then(res => {
          commit('ADD_BCF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
