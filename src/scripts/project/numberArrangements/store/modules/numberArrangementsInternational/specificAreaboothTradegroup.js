import { specificAreaboothTradegroupApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    addDem: [],
    getlistDem: [],
    editDem: [],
    deleDem: [],
    getinitDem: [],
    addRec: [],
    getlistRec: [],
    editRec: [],
    deleRec: [],
    getlistOsrd: [],
    editOsrd: [],
    getlistOsre: [],
    editOsre: [],
    getlistOsrt: [],
    editOsrt: [],
    deleOsrt: [],
    addPat: [],
    editPat: [],
    getUposrt: [],
    addOpup: [],
    getPlbd: [],
    getexIbc: [],
    getCibd: [],
    getoneTem: [],
    getlistPat: [],
    addTpat: [],
    uploadFil: []
  },
  getters: {
    addDem: state => state.addDem,
    getlistDem: state => state.getlistDem,
    editDem: state => state.editDem,
    deleDem: state => state.deleDem,
    getinitDem: state => state.getinitDem,
    addRec: state => state.addRec,
    getlistRec: state => state.getlistRec,
    editRec: state => state.editRec,
    deleRec: state => state.deleRec,
    getlistOsrd: state => state.getlistOsrd,
    editOsrd: state => state.editOsrd,
    getlistOsre: state => state.getlistOsre,
    editOsre: state => state.editOsre,
    getlistOsrt: state => state.getlistOsrt,
    editOsrt: state => state.editOsrt,
    deleOsrt: state => state.deleOsrt,
    addPat: state => state.addPat,
    editPat: state => state.editPat,
    getUposrt: state => state.getUposrt,
    addOpup: state => state.addOpup,
    getPlbd: state => state.getPlbd,
    getexIbc: state => state.getexIbc,
    getCibd: state => state.getCibd,
    getoneTem: state => state.getoneTem,
    getlistPat: state => state.getlistPat,
    addTpat: state => state.addTpat,
    uploadFil: state => state.uploadFil
  },
  mutations: {
    ADD_DEM(state, payload) {
      state.addDem = payload;
    },
    GETLIST_DEM(state, payload) {
      state.getlistDem = payload;
    },
    EDIT_DEM(state, payload) {
      state.editDem = payload;
    },
    DELE_DEM(state, payload) {
      state.deleDem = payload;
    },
    GETINIT_DEM(state, payload) {
      state.getinitDem = payload;
    },
    ADD_REC(state, payload) {
      state.addRec = payload;
    },
    GETLIST_REC(state, payload) {
      state.getlistRec = payload;
    },
    EDIT_REC(state, payload) {
      state.editRec = payload;
    },
    DELE_REC(state, payload) {
      state.deleRec = payload;
    },
    GETLIST_OSRD(state, payload) {
      state.getlistOsrd = payload;
    },
    EDIT_OSRD(state, payload) {
      state.editOsrd = payload;
    },
    GETLIST_OSRE(state, payload) {
      state.getlistOsre = payload;
    },
    EDIT_OSRE(state, payload) {
      state.editOsre = payload;
    },
    GETLIST_OSRT(state, payload) {
      state.getlistOsrt = payload;
    },
    EDIT_OSRT(state, payload) {
      state.editOsrt = payload;
    },
    DELE_OSRT(state, payload) {
      state.deleOsrt = payload;
    },
    ADD_PAT(state, payload) {
      state.addPat = payload;
    },
    EDIT_PAT(state, payload) {
      state.editPat = payload;
    },
    GET_UPOSRT(state, payload) {
      state.getUposrt = payload;
    },
    ADD_OPUP(state, payload) {
      state.addOpup = payload;
    },
    GET_PLBD(state, payload) {
      state.getPlbd = payload;
    },
    GETEX_IBC(state, payload) {
      state.getexIbc = payload;
    },
    GET_CIBD(state, payload) {
      state.getCibd = payload;
    },
    GETONE_TEM(state, payload) {
      state.getoneTem = payload;
    },
    GETLIST_PAT(state, payload) {
      state.getlistPat = payload;
    },
    ADD_TPAT(state, payload) {
      state.addTpat = payload;
    },
    UPLOAD_FIL(state, payload) {
      state.uploadFil = payload;
    }
  },
  actions: {
    // 1.1???????????????????????????
    addordinaryDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.addOrdinaryDemand(Object).then(res => {
          commit('ADD_DEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 1.2?????????????????????????????????
    getlistOrdinaryDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getListOrdinaryDemand(Object).then(res => {
          commit('GETLIST_DEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 1.3???????????????????????????
    editordinaryDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.editOrdinaryDemand(Object).then(res => {
          commit('EDIT_DEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 1.4???????????????????????????
    deleordinaryDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.deleOrdinaryDemand(Object).then(res => {
          commit('DELE_DEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 2.1??????????????????????????????????????????????????????
    getinitialOrdinaryDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getInitialOrdinaryDemand(Object).then(res => {
          commit('GETINIT_DEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 2.2???????????????????????????
    addordinaryDemandRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.addOrdinaryDemandRecord(Object).then(res => {
          commit('ADD_REC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 2.3???????????????????????????????????????
    getlistOrdinaryDemandRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getListOrdinaryDemandRecord(Object).then(res => {
          commit('GETLIST_REC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 2.4???????????????????????????????????????
    editordinaryDemandRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.editOrdinaryDemandRecord(Object).then(res => {
          commit('EDIT_REC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 2.5??????????????????????????????????????????
    deleordinaryDemandRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.deleOrdinaryDemandRecord(Object).then(res => {
          commit('DELE_REC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 3.1??????????????????????????????-??????????????????????????????
    getlistordinarySpecialRangeDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getListOrdinarySpecialRangeDemand(Object).then(res => {
          commit('GETLIST_OSRD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 3.2??????????????????????????????-??????????????????????????????
    editordinarySpecialRangeDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.editOrdinarySpecialRangeDemand(Object).then(res => {
          commit('EDIT_OSRD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 4.1??????????????????????????????-???????????????????????????????????????
    getlistOrdinarySpecialRangeExport({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getListOrdinarySpecialRangeExport(Object).then(res => {
          commit('GETLIST_OSRE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 4.2??????????????????????????????-?????????????????????????????????
    editordinarySpecialRangeExport({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.editOrdinarySpecialRangeExport(Object).then(res => {
          commit('EDIT_OSRE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.1????????????????????????????????? getListPostArrangeTotal
    getlistOrdinarySpecialRangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getListOrdinarySpecialRangeTotal(Object).then(res => {
          commit('GETLIST_OSRT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.2??????????????????????????????-?????????????????? ??? 7.3????????????????????????????????????????????????????????????
    editordinarySpecialRangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.editOrdinarySpecialRangeTotal(Object).then(res => {
          commit('EDIT_OSRT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.3??????????????????????????????-?????????????????? ??? 7.4????????????????????????????????????????????????????????????
    deleordinarySpecialRangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.deleOrdinarySpecialRangeTotal(Object).then(res => {
          commit('DELE_OSRT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.4???????????????????????????????????? 
    addordinaryPostArrangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.addOrdinaryPostArrangeTotal(Object).then(res => {
          commit('ADD_PAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.1????????????????????????????????? getListPostArrangeTotal
    getlistPostArrangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getListPostArrangeTotal(Object).then(res => {
          commit('GETLIST_PAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.2???????????????
    editordinaryPostArrangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.editOrdinaryPostArrangeTotal(Object).then(res => {
          commit('EDIT_PAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.1????????????????????????????????????
    getunPublishOrdinarySpecialRangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getUnPublishOrdinarySpecialRangeTotal(Object).then(res => {
          commit('GET_UPOSRT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.2????????????????????????????????????????????????????????????
    addordinaryPostUnPublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.addOrdinaryPostUnPublish(Object).then(res => {
          commit('ADD_OPUP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 8.1?????????????????????
    getpublishListByDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getPublishListByDelegation(Object).then(res => {
          commit('GET_PLBD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    getexhibitionInfoByCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getExhibitionInfoByCode(Object).then(res => {
          localStorage.setItem("spea", JSON.stringify(res));
          commit('GETEX_IBC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????Id???????????????????????????id??????????????????????????? getOneTemplate
    getcompanyInfoByDeleId({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getCompanyInfoByDeleId(Object).then(res => {
          commit('GET_CIBD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 2???????????????Id???????????? getOneTemplate
    getoneTemplate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.getOneTemplate(Object).then(res => {
          commit('GETONE_TEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    addtotalPostArrangeTotal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.addTotalPostArrangeTotal(Object).then(res => {
          commit('ADD_TPAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    uploadfile({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.uploadFile(Object).then(res => {
          commit('UPLOAD_FIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    deleteFile({ commit }, Object) {
      return new Promise((resolve, reject) => {
        specificAreaboothTradegroupApi.deleteFile(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
