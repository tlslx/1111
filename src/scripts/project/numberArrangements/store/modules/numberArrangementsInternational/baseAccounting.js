import { baseAccountingApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getList: [],
    updateOrdinary: [],
    addOrdinary: [],
    getlistOrdin: [],
    delOrdinary: [],
    getBase: [],
    addBaseOrid: [],
    updBase: [],
    updNumber: [],
    getCheck: [],
    updateCheck: [],
    addIsn: [],
    downloadBn: [],
    postSa: [],
    applyRange: {},
    boothQuery: {},
    boothApply: {},
    delegationApply: []
  },
  getters: {
    getList: state => state.getList,
    updateOrdinary: state => state.updateOrdinary,
    addOrdinary: state => state.addOrdinary,
    getlistOrdin: state => state.getlistOrdin,
    delOrdinary: state => state.delOrdinary,
    getBase: state => state.getBase,
    addBaseOrid: state => state.addBaseOrid,
    updBase: state => state.updBase,
    updNumber: state => state.updNumber,
    getCheck: state => state.getCheck,
    updateCheck: state => state.updateCheck,
    addIsn: state => state.addIsn,
    downloadBn: state => state.downloadBn,
    postSa: state => state.postSa,
    applyRange: state => state.applyRange,
    boothQuery: state => state.boothQuery,
    boothApply: state => state.boothApply,
    delegationApply: state => state.delegationApply
  },
  mutations: {
    GET_LIST(state, payload) {
      state.getList = payload;
    },
    UPDATE_ORDINARY(state, payload) {
      state.updateOrdinary = payload;
    },
    ADD_ORDINARY(state, payload) {
      state.addOrdinary = payload;
    },
    GETLIST_ORDINARY(state, payload) {
      state.getlistOrdin = payload;
    },
    DEL_ORDINARY(state, payload) {
      state.delOrdinary = payload;
    },
    GET_BASE(state, payload) {
      state.getBase = payload;
    },
    ADD_BASE(state, payload) {
      state.addBaseOrid = payload;
    },
    UPD_BASE(state, payload) {
      state.updBase = payload;
    },
    UPD_NUMBER(state, payload) {
      state.updNumber = payload;
    },
    GET_CHECK(state, payload) {
      state.getCheck = payload;
    },
    UPDATE_CHECK(state, payload) {
      state.updateCheck = payload;
    },
    ADD_ISN(state, payload) {
      state.addIsn = payload;
    },
    DOWNLOAD_BN(state, payload) {
      state.downloadBn = payload;
    },
    POST_SA(state, payload) {
      state.postSa = payload;
    },
    APPLY_RANGE(state, payload) {
      state.applyRange = payload;
    },
    BOOTH_QUERY(state, payload) {
      state.boothQuery = payload;
    },
    BOOTH_APPLY(state, payload) {
      state.boothApply = payload;
    },
    DELEGATION_APPLY(state, payload) {
      state.delegationApply = payload;
    }
  },
  actions: {
    // ???????????????????????????
    getlistAllOrdinary({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getListAllOrdinary(Object).then(res => {
          commit('GET_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    updateordinaryBase({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.updateOrdinaryBase(Object).then(res => {
          commit('UPDATE_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    addordinaryBase({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.addOrdinaryBase(Object).then(res => {
          commit('ADD_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    getlistOrdinary({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getListOrdinary(Object).then(res => {
          commit('GETLIST_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    deleteordinaryBase({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.deleteOrdinaryBase(Object).then(res => {
          commit('DEL_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????????????????
    getordinaryBase({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getOrdinaryBase(Object).then(res => {
          commit('GET_BASE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????
    addbase({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.addBase(Object).then(res => {
          commit('ADD_BASE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????????????????
    updatebase({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.updateBase(Object).then(res => {
          commit('UPD_BASE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    updatebaseNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.updateBaseNumber(Object).then(res => {
          commit('UPD_NUMBER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????????????????
    getcheckBaseNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getCheckBaseNumber(Object).then(res => {
          commit('GET_CHECK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    updatecheckNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.updateCheckNumber(Object).then(res => {
          commit('UPDATE_CHECK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    addimportSupportNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.addImportSupportNumber(Object).then(res => {
          commit('ADD_ISN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    postscheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postScheduleApply(Object).then(res => {
          commit('POST_SA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    downloadbaseNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.downloadBaseNumber(Object).then(res => {
          commit('DOWNLOAD_BN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    getDelegationApplyRange({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getDelegationApplyRangeData(Object).then(res => {
          commit('APPLY_RANGE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    postDelegationApplyRangeAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postDelegationApplyRangeAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    postDelegationApplyRangeEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postDelegationApplyRangeEditData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    postDelegationApplyRangeDelete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postDelegationApplyRangeDeleteData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????? 
    getBoothNumberQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getBoothNumberQueryData(Object).then(res => {
          commit('BOOTH_QUERY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    postBoothNumberCheck({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postBoothNumberCheckData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getEveryBoothNeedApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.getEveryBoothNeedApplyData(Object).then(res => {
          commit('BOOTH_APPLY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????????????????
    postEveryBoothNeedApplySubmit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postEveryBoothNeedApplySubmitData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    postDelegationNeedApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        baseAccountingApi.postDelegationNeedApplyData(Object).then(res => {
          commit('DELEGATION_APPLY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
