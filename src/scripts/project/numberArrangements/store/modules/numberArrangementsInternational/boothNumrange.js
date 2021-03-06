import { boothNumrangeApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    List: [],
    addList: [],
    deleList: [],
    editList: [],
    commendationList: [],
    listopen: [],
    addopenList: [],
    listCommendation: [],
    listBootharrange: [],
    demandList: [],
    preserList: [],
    declaredList: [],
    updatecommend: [],
    arrangeList: [],
    headerList: [],
    preser: [],
    editingplan: [],
    generateList: [],
    grrangementList: [],
    printAlList: [],
    removeapplicationList: [],
    confirmationList: [],
    AddapplicationList: [],
    savereconcileList: [],
    checkboothinfoList: []
  },
  getters: {
    List: state => state.List,
    addList: state => state.addList,
    deleList: state => state.deleList,
    editList: state => state.editList,
    commendationList: state => state.commendationList,
    listopen: state => state.listopen,
    addopenList: state => state.addopenList,
    listCommendation: state => state.listCommendation,
    listBootharrange: state => state.listBootharrange,
    demandList: state => state.demandList,
    preserList: state => state.preserList,
    declaredList: state => state.declaredList,
    updatecommend: state => state.updatecommend,
    arrangeList: state => state.arrangeList,
    headerList: state => state.headerList,
    preser: state => state.preser,
    editingplan: state => state.editingplan,
    generateList: state => state.generateList,
    grrangementList: state => state.grrangementList,
    printAlList: state => state.printAlList,
    removeapplicationList: state => state.removeapplicationList,
    confirmationList: state => state.confirmationList,
    AddapplicationList: state => state.AddapplicationList,
    savereconcileList: state => state.savereconcileList,
    commendboothList: state => state.commendboothList,
    checkboothinfoList: state => state.checkboothinfoList
  },
  mutations: {
    LIST(state, payload) {
      state.List = payload;
    },
    ADDLLIST(state, payload) {
      state.addList = payload;
    },
    DELELLIST(state, payload) {
      state.deleList = payload;
    },
    EDITLLIST(state, payload) {
      state.editList = payload;
    },
    COMMENDATIONLIST(state, payload) {
      state.commendationList = payload;
    },
    LISTOPEN(state, payload) {
      state.listopen = payload;
    },
    ADDOPENLLIST(state, payload) {
      state.addopenList = payload;
    },
    LISTCOMMENDATION(state, payload) {
      state.listCommendation = payload;
    },
    LISTBOOTHARRANGE(state, payload) {
      state.listBootharrange = payload;
    },
    DEMANDLIST(state, payload) {
      state.demandList = payload;
    },
    PRESERLIST(state, payload) {
      state.preserList = payload;
    },
    DECLAREDlIST(state, payload) {
      state.declaredList = payload;
    },
    UPDATECOMMEND(state, payload) {
      state.updatecommend = payload;
    },
    ARRANGELIST(state, payload) {
      state.arrangeList = payload;
    },
    HEADERLIST(state, payload) {
      state.headerList = payload;
    },
    PRESERVA(state, payload) {
      state.preser = payload;
    },
    EDITINGPLAN(state, payload) {
      state.editingplan = payload;
    },
    GENERATELIST(state, payload) {
      state.generateList = payload;
    },
    GRRANGEMENTLIST(state, payload) {
      state.grrangementList = payload;
    },
    PRINTALLIST(state, payload) {
      state.printAlList = payload;
    },
    REMOVEAPPLICATIONLIST(state, payload) {
      state.removeapplicationList = payload;
    },
    CONFIRMATIONLIST(state, payload) {
      state.confirmationList = payload;
    },
    ADDAPPLICATIONLIST(state, payload) {
      state.AddapplicationList = payload;
    },
    SAVERECONCILELIST(state, payload) {
      state.savereconcileList = payload;
    },
    COMMENDBOOTHLIST(state, payload) {
      state.commendboothList = payload;
    },
    CHECKBOOTHINFOLIST(state, payload) {
      state.checkboothinfoList = payload;
    }
  },
  actions: {
    // ????????????????????????????????????
    getlistAllOrdinary({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getListAllOrdinary(Object).then(res => {
          if (res.flag === '1') {
            commit('LIST', res.data);
          }
          commit('LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getAddNumregiste({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getaddNumregister(Object).then(res => {
          commit('ADDLLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getDeleNumregiste({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getdeleNumregister(Object).then(res => {
          commit('DELELLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getEditNumregiste({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.geteditNumregister(Object).then(res => {
          commit('EDITLLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    getlistCommendation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getboothNum(Object).then(res => {
          if (res.flag === '1') {
            commit('COMMENDATIONLIST', res.data);
          }
          commit('COMMENDATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getlistopenApplication({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getopenApplication(Object).then(res => {
          if (res.flag === '1') {
            commit('LISTOPEN', res.data);
          }
          commit('LISTOPEN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getAddOpenApplication({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getaddOpenApplication(Object).then(res => {
          commit('ADDOPENLLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getRemoveApplication({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getremoveApplication(Object).then(res => {
          commit('REMOVEAPPLICATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getConfirmationopenApplication({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getconfirmationopenApplication(Object).then(res => {
          commit('CONFIRMATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getAddApplication({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getaddApplication(Object).then(res => {
          commit('ADDAPPLICATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    getListOpenApplication({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getlistOpenApplication(Object).then(res => {
          commit('LISTCOMMENDATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getBoothArrange({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getboothArrange(Object).then(res => {
          commit('LISTBOOTHARRANGE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getDeclareDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getdeclareDemand(Object).then(res => {
          commit('DEMANDLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getPreservationDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getpreservationDemand(Object).then(res => {
          commit('PRESERLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    getDeclaredDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getdeclaredDemand(Object).then(res => {
          for (let key in res.records) {
            if (res.records[key].examineStatus === '1') {
              res.records[key].examineStatus = '????????????';
            } else if (res.records[key].examineStatus === '0') {
              res.records[key].examineStatus = '?????????';
            } else {
              res.records[key].examineStatus = '???????????????';
            }
          }
          commit('DECLAREDlIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getUpdateCommend({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getupdateCommend(Object).then(res => {
          commit('UPDATECOMMEND', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    getsaveReconcileInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getsaveReconcileInfo(Object).then(res => {
          commit('SAVERECONCILELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    getCommendBoothCalculation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getcommendBoothCalculation(Object).then(res => {
          commit('COMMENDBOOTHLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????????????????
    getArrangementplan({ commit }, Object) {
      // return dispatch('getScheduleheader').then(res => {
      //   boothNumrangeApi.getarrangementplan(Object).then(res => {
      //     commit('ARRANGELIST', res);
      //     resolve(res);
      //   }).catch(e => {
      //     reject(e);
      //   });
      // }).catch()
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getarrangementplan(Object).then(res => {
          commit('ARRANGELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????????????????
    getScheduleheader({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getscheduleheader(Object).then(res => {
          commit('HEADERLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //?????????????????????????????????
    getPrintAll({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getprintAll(Object).then(res => {
          commit('PRINTALLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????????????????
    getPreservation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getpreservation(Object).then(res => {
          commit('PRESERVA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //??????????????????????????????????????????
    getEditingplan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.geteditingplan(Object).then(res => {
          commit('EDITINGPLAN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //??????????????????????????????????????????
    getGeneratebooth({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getgeneratebooth(Object).then(res => {
          for (let key in res.records) {
            if (res.records[key].examineStatus === '1') {
              res.records[key].examineStatus = '????????????';
            } else if (res.records[key].examineStatus === '2') {
              res.records[key].examineStatus = '???????????????';
            } 
          }
          commit('GENERATELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????????????????????????????
    getGrrangementresult({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getarrangementresult(Object).then(res => {
          for (let key in res.records) {
            if (res.records[key].boothType === '3') {
              res.records[key].boothType = '????????????';
            } else if (res.records[key].boothType === '2') {
              res.records[key].boothType = '????????????';
            } else {
              res.records[key].boothType = '???????????????';
            }
            res.records[key].exhibitionPeriod = res.records[key].exhibitionPeriod + '???';
          }
          commit('GRRANGEMENTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //??????????????????????????????????????????
    getCheckBoothInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        boothNumrangeApi.getcheckBoothInfo(Object).then(res => {
          commit('CHECKBOOTHINFOLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
