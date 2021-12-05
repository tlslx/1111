import { releaseAdjustApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getlistAdjust: [],
    getlistArea: [],
    getlistDelegat: [],
    addAdjust: [],
    upsateAdjust: [],
    getlistInte: [],
    addInt: [],
    updateSchedue: [],
    getlistExchange: [],
    addSend: [],
    updateOrdinary: [],
    deleteOrdinary: [],
    deletebaOrdinary: [],
    getlistSends: [],
    updateSend: [],
    getlistAdjusta: [],
    addAdjusta: [],
    updataAdjusta: [],
    deleteaAdjusta: [],
    getlistPostsche: [],
    updatePostsche: [],
    getlistRestore: [],
    addRestore: [],
    getlistAllsche: [],
    getlistCoceral: [],
    updateChecke: [],
    getlistWork: [],
    updatecheSche: [],
    getadjuRecor: [],
    addreSche: [],
    getlistBoothn: [],
    getlistSchedu: [],
    getlistEntry: [],
    addentBooth: [],
    updateEntry: [],
    deletEntry: [],
    deletbatchEntry: [],
    getEba: []
  },
  getters: {
    getlistAdjust: state => state.getlistAdjust,
    getlistArea: state => state.getlistArea,
    getlistDelegat: state => state.getlistDelegat,
    addAdjust: state => state.addAdjust,
    upsateAdjust: state => state.upsateAdjust,
    getlistInte: state => state.getlistInte,
    addInt: state => state.addInt,
    updateSchedue: state => state.updateSchedue,
    getlistExchange: state => state.getlistExchange,
    addSend: state => state.addSend,
    updateOrdinary: state => state.updateOrdinary,
    deleteOrdinary: state => state.deleteOrdinary,
    deletebaOrdinary: state => state.deletebaOrdinary,
    getlistSends: state => state.getlistSends,
    updateSend: state => state.updateSend,
    getlistAdjusta: state => state.getlistAdjusta,
    addAdjusta: state => state.addAdjusta,
    updataAdjusta: state => state.updataAdjusta,
    deleteaAdjusta: state => state.deleteaAdjusta,
    getlistPostsche: state => state.getlistPostsche,
    updatePostsche: state => state.updatePostsche,
    getlistRestore: state => state.getlistRestore,
    addRestore: state => state.addRestore,
    getlistAllsche: state => state.getlistAllsche,
    getlistCoceral: state => state.getlistCoceral,
    updateChecke: state => state.updateChecke,
    getlistWork: state => state.getlistWork,
    updatecheSche: state => state.updatecheSche,
    getadjuRecor: state => state.getadjuRecor,
    addreSche: state => state.addreSche,
    getlistBoothn: state => state.getlistBoothn,
    getlistSchedu: state => state.getlistSchedu,
    getlistEntry: state => state.getlistEntry,
    addentBooth: state => state.addentBooth,
    updateEntry: state => state.updateEntry,
    deletEntry: state => state.deletEntry,
    deletbatchEntry: state => state.deletbatchEntry,
    getEba: state => state.getEba
  },
  mutations: {
    GETLIST_ADJUST(state, payload) {
      state.getlistAdjust = payload;
    },
    GETLIST_AREA(state, payload) {
      state.getlistArea = payload;
    },
    GETLIST_DELEGAT(state, payload) {
      state.getlistDelegat = payload;
    },
    ADD_ADJUST(state, payload) {
      state.addAdjust = payload;
    },
    UPSATE_ADJUST(state, payload) {
      state.upsateAdjust = payload;
    },
    GETLIST_INTE(state, payload) {
      state.getlistInte = payload;
    },
    ADD_INT(state, payload) {
      state.addInt = payload;
    },
    UPDATE_SCHEDUE(state, payload) {
      state.updateSchedue = payload;
    },
    GETLIST_EXCHANGE(state, payload) {
      state.getlistExchange = payload;
    },
    ADD_SEND(state, payload) {
      state.addSend = payload;
    },
    UPDATE_ORDINARY(state, payload) {
      state.updateOrdinary = payload;
    },
    DELETE_ORDINARY(state, payload) {
      state.deleteOrdinary = payload;
    },
    DELETEBA_ORDINARY(state, payload) {
      state.deletebaOrdinary = payload;
    },
    GETLIST_SENDS(state, payload) {
      state.getlistSends = payload;
    },
    UPDATE_SEND(state, payload) {
      state.updateSend = payload;
    },
    GETLIST_ADJUSTA(state, payload) {
      state.getlistAdjusta = payload;
    },
    ADD_ADJUSTA(state, payload) {
      state.addAdjusta = payload;
    },
    UPDATA_ADJUSTA(state, payload) {
      state.updataAdjusta = payload;
    },
    DELETEA_ADJUSTA(state, payload) {
      state.deleteaAdjusta = payload;
    },
    GETLIST_POSTSCHE(state, payload) {
      state.getlistPostsche = payload;
    },
    UPDATE_POSTSCHE(state, payload) {
      state.updatePostsche = payload;
    },
    GETLIST_RESTORE(state, payload) {
      state.getlistRestore = payload;
    },
    ADD_RESTORE(state, payload) {
      state.addRestore = payload;
    },
    GETLIST_ALLSCHE(state, payload) {
      state.getlistAllsche = payload;
    },
    GETLIST_COCERAL(state, payload) {
      state.getlistCoceral = payload;
    },
    UPDATE_CHECKE(state, payload) {
      state.updateChecke = payload;
    },
    GETLIST_WORK(state, payload) {
      state.getlistWork = payload;
    },
    UPDATECHE_SCHE(state, payload) {
      state.updatecheSche = payload;
    },
    GETADJU_RECOR(state, payload) {
      state.getadjuRecor = payload;
    },
    ADDRE_SCHE(state, payload) {
      state.addreSche = payload;
    },
    GETLIST_BOOTHN(state, payload) {
      state.getlistBoothn = payload;
    },
    GETLIST_SCHEDU(state, payload) {
      state.getlistSchedu = payload;
    },
    GETLIST_ENTRY(state, payload) {
      state.getlistEntry = payload;
    },
    ADDENT_BOOTH(state, payload) {
      state.addentBooth = payload;
    },
    UPDATE_ENTRY(state, payload) {
      state.updateEntry = payload;
    },
    DELET_ENTRY(state, payload) {
      state.deletEntry = payload;
    },
    DELETBATCH_ENTRY(state, payload) {
      state.deletbatchEntry = payload;
    },
    GET_EBA(state, payload) {
      state.getEba = payload;
    }
  },
  actions: {
    // 查询工作部设置的规则
    getlistAdjustDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListAdjustDemand(Object).then(res => {
          let localstora = JSON.parse(localStorage.getItem("dictData"));
          let deled = [];
          let exhid = [];
          res["delegation"] = [];
          res["exhibitionArea"] = [];
          for (let j = 0; j < res.records.length; j++) {
            for (let i = 0; i < localstora.delegation.length; i++) {
              if (localstora.delegation[i].value === res.records[j].delegationCode) {
                deled.push(localstora.delegation[i]);
              }
            }
            for (let k = 0; k < localstora.exhibitionArea.length; k++) {
              if (localstora.exhibitionArea[k].value === res.records[j].exhibitionAreaCode) {
                exhid.push(localstora.exhibitionArea[k]);
              }
            }
          }
          let hash = {};
          res["delegation"] = deled.reduce(function(item, next) {
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item;
          }, []);
          res["exhibitionArea"] = exhid.reduce(function(item, next) {
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item;
          }, []);
          localStorage.setItem("temp", JSON.stringify(res));
          // for (let i = 0; i < deled.length; i++) {
          //   if (deled.indexOf(deled[i].value) === -1) {
          //     res["delegation"].push(deled[i]);
          //   }
          // }
          // for (let i = 0; i < exhid.length; i++) {
          //   if (exhid.indexOf(exhid[i].value) === -1) {
          //     res["exhibitionArea"].push(exhid[i]);
          //   }
          // }
          commit('GETLIST_ADJUST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询工作部设置的规则相关的展区
    getlistAreaCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListAreaCode(Object).then(res => {
          commit('GETLIST_AREA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询工作部设置的规则相关的交易团
    getlistDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListDelegation(Object).then(res => {
          commit('GETLIST_DELEGAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 设置规则
    addadjustDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addAdjustDemand(Object).then(res => {
          commit('ADD_ADJUST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改规则
    updateadjustDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateAdjustDemand(Object).then(res => {
          commit('UPSATE_ADJUST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询交易团一般性展位调整需求
    getlistIntent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListIntent(Object).then(res => {
          commit('GETLIST_INTE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团添加一般性展位调整需求
    addintent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addIntent(Object).then(res => {
          commit('ADD_INT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团发布一般性展位调整需求
    updateschedueRequest({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateSchedueRequest(Object).then(res => {
          commit('UPDATE_SCHEDUE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询跟本交易团发布一般性展位调整需求相匹配的其他交易团
    getlistExchangeIntent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListExchangeIntent(Object).then(res => {
          commit('GETLIST_EXCHANGE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 系统匹配完后，向符合要求的交易团发送调整请求
    addsendScheduleRequest({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addSendScheduleRequest(Object).then(res => {
          commit('ADD_SEND', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑交易团调整需求
    updateordinaryExchangeIntent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateOrdinaryExchangeIntent(Object).then(res => {
          commit('UPDATE_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除交易团调整需求
    deleteordinaryExchangeIntent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.deleteOrdinaryExchangeIntent(Object).then(res => {
          commit('DELETE_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量删除交易团调整需求
    deletebatchOrdinaryExchangeIntent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.deleteBatchOrdinaryExchangeIntent(Object).then(res => {
          commit('DELETEBA_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 发布调整需求时，查询需要处理的调整需求
    getlistSendScheduleRequest({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListSendScheduleRequest(Object).then(res => {
          commit('GETLIST_SENDS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 发布调整需求时，处理展位调整需求
    updatesendScheduleRequest({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateSendScheduleRequest(Object).then(res => {
          commit('UPDATE_SEND', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询填写的一般性调整申请
    getlistAdjustApplyDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListAdjustApplyDelegation(Object).then(res => {
          commit('GETLIST_ADJUSTA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 填写一般性调整申请
    addadjustApplyDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addAdjustApplyDelegation(Object).then(res => {
          commit('ADD_ADJUSTA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑一般性调整申请
    updateadjustApplyDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateAdjustApplyDelegation(Object).then(res => {
          commit('UPDATA_ADJUSTA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除一般性调整申请
    deleteadjustApplyDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.deleteAdjustApplyDelegation(Object).then(res => {
          commit('DELETEA_ADJUSTA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 填写一般性调整申请时，查询需要处理的展位调整请求
    getlistPostScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListPostScheduleApply(Object).then(res => {
          commit('GETLIST_POSTSCHE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 填写一般性调整申请时，处理展位调整需求
    updatepostScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updatePostScheduleApply(Object).then(res => {
          commit('UPDATE_POSTSCHE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询还原调整
    getlistRestoreScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListRestoreScheduleApply(Object).then(res => {
          commit('GETLIST_RESTORE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 进行还原调整
    addrestoreScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addRestoreScheduleApply(Object).then(res => {
          commit('ADD_RESTORE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 线上记录查询
    getlistAllScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListAllScheduleApply(Object).then(res => {
          commit('GETLIST_ALLSCHE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询商协会审核交易团展位调整申请
    getlistCoceralScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListCoceralScheduleApply(Object).then(res => {
          commit('GETLIST_COCERAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会审核交易团展位调整申请
    updatecheckScheduleApplyByCoceral({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateCheckScheduleApplyByCoceral(Object).then(res => {
          commit('UPDATE_CHECKE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询工作部审核交易团展位调整申请
    getlistWorkScheduleApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListWorkScheduleApply(Object).then(res => {
          commit('GETLIST_WORK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部审核商协会审核通过的一般性交易团展位申请调整，审核通过的话，同时生成调整记录
    updatecheckScheduleApplyByWork({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateCheckScheduleApplyByWork(Object).then(res => {
          commit('UPDATECHE_SCHE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询生成的调整记录
    getadjustRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getAdjustRecord(Object).then(res => {
          commit('GETADJU_RECOR', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 撤回调整记录
    addreturnScheduleRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addReturnScheduleRecord(Object).then(res => {
          commit('ADDRE_SCHE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位数量查询
    getlistBoothNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListBoothNumber(Object).then(res => {
          commit('GETLIST_BOOTHN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团查看安排方案
    getlistSchedulePlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListSchedulePlan(Object).then(res => {
          commit('GETLIST_SCHEDU', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询录入的展位调整
    getlistEntryBoothAdjustment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getListEntryBoothAdjustment(Object).then(res => {
          commit('GETLIST_ENTRY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增录入展位调整
    addentryBoothAdjustment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.addEntryBoothAdjustment(Object).then(res => {
          commit('ADDENT_BOOTH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改录入展位调整调换记录
    updateentryBoothAdjustment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.updateEntryBoothAdjustment(Object).then(res => {
          commit('UPDATE_ENTRY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除录入展位调整调换记录
    deletentryBoothAdjustment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.deletEntryBoothAdjustment(Object).then(res => {
          commit('DELET_ENTRY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量删除录入展位调整调换记录
    deletbatchEntryBoothAdjustment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.deletBatchEntryBoothAdjustment(Object).then(res => {
          commit('DELETBATCH_ENTRY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部人工录入还原调整时,获取可还原列表
    getentryBoothAdjustment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        releaseAdjustApi.getEntryBoothAdjustment(Object).then(res => {
          commit('GET_EBA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
