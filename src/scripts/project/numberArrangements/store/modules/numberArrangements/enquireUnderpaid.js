import { enquireUnderpaidApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getUnder: [],
    postRegis: [],
    getEnte: [],
    getPeta: [],
    getBnte: []
  },
  getters: {
    getUnder: state => state.getUnder,
    postRegis: state => state.postRegis,
    getEnte: state => state.getEnte,
    getPeta: state => state.getPeta,
    getBnte: state => state.getBnte
  },
  mutations: {
    REPORT_DATA(state, payload) {
      state.getUnder = payload;
    },
    REPORT_BATA(state, payload) {
      state.postRegis = payload;
    },
    REPORT_CATA(state, payload) {
      state.getEnte = payload;
    },
    REPORT_ATA(state, payload) {
      state.getPeta = payload;
    },
    REPORT_QATA(STATE, payload) {
      STATE.getBnte = payload;
    }
  },
  actions: {
    //查询未缴齐订金企业
    getUnderpaidPeposit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enquireUnderpaidApi.getUnderpaidDeposit(obj).then(res => {
          commit('REPORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团登记企业是否已缴齐订金情况
    postRegisteredBnterprise({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enquireUnderpaidApi.postRegisteredRnterprise(obj).then(res => {
          commit('REPORT_BATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团审核企业详情页
    getEnterpriseAetails({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enquireUnderpaidApi.getEnterpriseDetails(obj).then(res => {
          commit('REPORT_CATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业审核资质
    getEnterpriseQetails({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enquireUnderpaidApi.enterpriseAetails(obj).then(res => {
          commit('REPORT_QATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    getEnterprisePetails({ commit }, obj) {
      return new Promise((resolve, reject) => {
        enquireUnderpaidApi.enterprisePetails(obj).then(res => {
          commit('REPORT_ATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }

};
