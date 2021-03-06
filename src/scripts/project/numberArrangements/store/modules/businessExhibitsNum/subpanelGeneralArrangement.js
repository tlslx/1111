import { subpanelGeneralArrangementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    addPod: [],
    getDec: [],
    addDec: [],
    updateDec: [],
    deleteDec: [],
    getRec: [],
    getAlc: [],
    getLln: [],
    getRcc: [],
    addRcc: [],
    updateRcc: [],
    getArc: [],
    getPrc: [],
    deleIrc: [],
    getLprc: [],
    updatCoc: [],
    addOdc: [],
    getPaz: [],
    getPds: [],
    updaAtz: [],
    addAzl: [],
    getlistPrb: [],
    updateReb: [],
    addRcb: [],
    deleBib: [],
    addCha: [],
    getAea: [],
    getAcd: [],
    uploadOrc: [],
    uploadOrb: [],
    getLap: [],
    getSdt: [],
    getRecj: []
  },
  getters: {
    addPod: state => state.addPod,
    getDec: state => state.getDec,
    addDec: state => state.addDec,
    updateDec: state => state.updateDec,
    deleteDec: state => state.deleteDec,
    getRec: state => state.getRec,
    getAlc: state => state.getAlc,
    getLln: state => state.getLln,
    getRcc: state => state.getRcc,
    addRcc: state => state.addRcc,
    updateRcc: state => state.updateRcc,
    getArc: state => state.getArc,
    getPrc: state => state.getPrc,
    deleIrc: state => state.deleIrc,
    getLprc: state => state.getLprc,
    updatCoc: state => state.updatCoc,
    addOdc: state => state.addOdc,
    getPaz: state => state.getPaz,
    getPds: state => state.getPds,
    updaAtz: state => state.updaAtz,
    addAzl: state => state.addAzl,
    getlistPrb: state => state.getlistPrb,
    updateReb: state => state.updateReb,
    addRcb: state => state.addRcb,
    deleBib: state => state.deleBib,
    addCha: state => state.addCha,
    getAea: state => state.getAea,
    getAcd: state => state.getAcd,
    uploadOrc: state => state.uploadOrc,
    uploadOrb: state => state.uploadOrb,
    getLap: state => state.getLap,
    getSdt: state => state.getSdt,
    getRecj: state => state.getRecj
  },
  mutations: {
    ADD_POD(state, payload) {
      state.addPod = payload;
    },
    GET_DEC(state, payload) {
      state.getDec = payload;
    },
    ADD_DEC(state, payload) {
      state.addDec = payload;
    },
    UPDATE_DEC(state, payload) {
      state.updateDec = payload;
    },
    DELETE_DEC(state, payload) {
      state.deleteDec = payload;
    },
    GET_REC(state, payload) {
      state.getRec = payload;
    },
    GET_ALC(state, payload) {
      state.getAlc = payload;
    },
    GET_LLN(state, payload) {
      state.getLln = payload;
    },
    GET_RCC(state, payload) {
      state.getRcc = payload;
    },
    ADD_RCC(state, payload) {
      state.addRcc = payload;
    },
    UPDATE_RCC(state, payload) {
      state.updateRcc = payload;
    },
    GET_ARC(state, payload) {
      state.getArc = payload;
    },
    GET_PRC(state, payload) {
      state.getPrc = payload;
    },
    DELE_IRC(state, payload) {
      state.deleIrc = payload;
    },
    GET_LPRC(state, payload) {
      state.getLprc = payload;
    },
    UPDAT_COC(state, payload) {
      state.updatCoc = payload;
    },
    ADD_ODC(state, payload) {
      state.addOdc = payload;
    },
    GET_PAZ(state, payload) {
      state.getPaz = payload;
    },
    GET_PDS(state, payload) {
      state.getPds = payload;
    },
    UPDA_ATZ(state, payload) {
      state.updaAtz = payload;
    },
    ADD_AZL(state, payload) {
      state.addAzl = payload;
    },
    GETLIST_PRB(state, payload) {
      state.getlistPrb = payload;
    },
    UPDATE_REB(state, payload) {
      state.updateReb = payload;
    },
    ADD_RCB(state, payload) {
      state.addRcb = payload;
    },
    DELE_BIB(state, payload) {
      state.deleBib = payload;
    },
    ADD_CHA(state, payload) {
      state.addCha = payload;
    },
    GET_AEA(state, payload) {
      state.getAea = payload;
    },
    GET_ACD(state, payload) {
      state.getAcd = payload;
    },
    UPLOAD_ORC(state, payload) {
      state.uploadOrc = payload;
    },
    UPLOAD_ORB(state, payload) {
      state.uploadOrb = payload;
    },
    GET_LAP(state, payload) {
      state.getLap = payload;
    },
    GET_SDT(state, payload) {
      state.getSdt = payload;
    },
    GET_RECJ(state, payload) {
      state.getRecj = payload;
    }
  },
  actions: {
    // ?????????????????????(????????????)
    addpoorData({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addPoorData(Object).then(res => {
          commit('ADD_POD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    getlistDeadlineConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListDeadlineConfig(Object).then(res => {
          commit('GET_DEC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    adddeadlineConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addDeadlineConfig(Object).then(res => {
          commit('ADD_DEC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    updatedeadlineConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.updateDeadlineConfig(Object).then(res => {
          commit('UPDATE_DEC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    deletedeadlineConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.deleteDeadlineConfig(Object).then(res => {
          commit('DELETE_DEC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????????????????
    getlistRecommendCompanyjyt({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListRecommendCompanyjyt(Object).then(res => {
          commit('GET_RECJ', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????????????????getListRecommendCompanyjyt
    getlistRecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListRecommendCompany(Object).then(res => {
          commit('GET_REC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????????????????????????????
    getlistAllCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListAllCompany(Object).then(res => {
          commit('GET_ALC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    getlistLastNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListLastNumber(Object).then(res => {
          commit('GET_LLN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????????????????????????????????
    getrecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getRecommendCompany(Object).then(res => {
          commit('GET_RCC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????????????????
    addrecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addRecommendCompany(Object).then(res => {
          commit('ADD_RCC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????????????????
    updaterecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.updateRecommendCompany(Object).then(res => {
          commit('UPDATE_RCC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/?????????????????????
    getadjoinRecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getAdjoinRecommendCompany(Object).then(res => {
          commit('GET_ARC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/????????????????????????
    getpoorRecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getPoorRecommendCompany(Object).then(res => {
          commit('GET_PRC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????????????????
    deletebyIdRecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.deleteByIdRecommendCompany(Object).then(res => {
          commit('DELE_IRC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????
    getlistPageRecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListPageRecommendCompany(Object).then(res => {
          commit('GET_LPRC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    updatecoceralCheck({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.updateCoceralCheck(Object).then(res => {
          commit('UPDAT_COC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    addordinaryDeadlineConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addOrdinaryDeadlineConfig(Object).then(res => {
          commit('ADD_ODC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getlistPageAuthorizeLog({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListPageAuthorizeLog(Object).then(res => {
          commit('GET_PAZ', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getlistPageDelegationSub({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListPageDelegationSub(Object).then(res => {
          commit('GET_PDS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????/????????????
    updateauthorizeLog({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.updateAuthorizeLog(Object).then(res => {
          commit('UPDA_ATZ', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    addauthorizeLog({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addAuthorizeLog(Object).then(res => {
          commit('ADD_AZL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    getlistPageRecommendBranch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListPageRecommendBranch(Object).then(res => {
          commit('GETLIST_PRB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    getlastNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getLastNumber(Object).then(res => {
          commit('GET_LAN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    updateRecommendBranch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.updateRecommendBranch(Object).then(res => {
          commit('UPDATE_REB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    addrecommendBranch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addRecommendBranch(Object).then(res => {
          commit('ADD_RCB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    deletebyIdBranch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.deleteByIdBranch(Object).then(res => {
          commit('DELE_BIB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????? 
    addcheckApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.addCheckApply(Object).then(res => {
          commit('ADD_CHA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    getlistAllExhibitionArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListAllExhibitionArea(Object).then(res => {
          commit('GET_AEA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    getlistAllCompanyDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListAllCompanyDemand(Object).then(res => {
          commit('GET_ACD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????? ??? ??????
    uploadordinaryRecommendCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.uploadOrdinaryRecommendCompany(Object).then(res => {
          commit('UPLOAD_ORC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????? ??? ??????
    uploadordinaryRecommendBranch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.uploadOrdinaryRecommendBranch(Object).then(res => {
          commit('UPLOAD_ORB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    getlistAllProduct({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getListAllProduct(Object).then(res => {
          commit('GET_LAP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????? ?????? deptType = 30;
    getsysDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        subpanelGeneralArrangementApi.getSysDepartment(Object).then(res => {
          commit('GET_SDT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
