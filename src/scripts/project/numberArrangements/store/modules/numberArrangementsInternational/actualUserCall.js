import { actualUserCallApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getOrdinary: [],
    getDeal: [],
    addSend: [],
    getCoceral: [],
    getCondition: [],
    addDeal: [],
    addCoceral: [],
    getForeign: [],
    listForeign: [],
    getCheck: [],
    getSync: [],
    addForeignt: [],
    getDealCondft: [],
    getDealCondjyt: [],
    getFtc: [],
    getFcc: [],
    getFct: [],
    getFtsc: []
  },
  getters: {
    getOrdinary: state => state.getOrdinary,
    getDealCond: state => state.getDealCond,
    addSend: state => state.addSend,
    getDeal: state => state.getDeal,
    getCoceral: state => state.getCoceral,
    getCondition: state => state.getCondition,
    addDeal: state => state.addDeal,
    addCoceral: state => state.addCoceral,
    getForeign: state => state.getForeign,
    listForeign: state => state.listForeign,
    getCheck: state => state.getCheck,
    getSync: state => state.getSync,
    addForeignt: state => state.addForeignt,
    getDealCondft: state => state.getDealCondft,
    getDealCondjyt: state => state.getDealCondjyt,
    getFtc: state => state.getFtc,
    getFcc: state => state.getFcc,
    getFct: state => state.getFct,
    getFtsc: state => state.getFtsc
  },
  mutations: {
    GET_ORDINARY(state, payload) {
      state.getOrdinary = payload;
    },
    GET_DEAL_COND(state, payload) {
      state.getDealCond = payload;
    },
    ADD_SEND(state, payload) {
      state.addSend = payload;
    },
    GET_DEAL(state, payload) {
      state.getDeal = payload;
    },
    GET_COCERAL(state, payload) {
      state.getCoceral = payload;
    },
    GET_CONDITION(state, payload) {
      state.getCondition = payload;
    },
    ADD_DEAL(state, payload) {
      state.addDeal = payload;
    },
    ADD_COCERAL(state, payload) {
      state.addCoceral = payload;
    },
    GET_FOREIGN(state, payload) {
      state.getForeign = payload;
    },
    LIST_FOREIGN(state, payload) {
      state.listForeign = payload;
    },
    GET_CHECK(state, payload) {
      state.getCheck = payload;
    },
    GET_SYNC(state, payload) {
      state.getSync = payload;
    },
    ADD_FOREIGNT(state, payload) {
      state.addForeignt = payload;
    },
    GET_DEAL_CONDFT(state, payload) {
      state.getDealCondft = payload;
    },
    GET_DEAL_CONDJYT(state, payload) {
      state.getDealCondjyt = payload;
    },
    GET_FTC(state, payload) {
      state.getFtc = payload;
    },
    GET_FCC(state, payload) {
      state.getFcc = payload;
    },
    GET_FCT(state, payload) {
      state.getFct = payload;
    },
    GET_FTSC(state, payload) {
      state.getFtsc = payload;
    }
  },
  actions: {
    // 汇总实际使用者名单(分页)
    getlistOrdinary({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListOrdinary(Object).then(res => {
          commit('GET_ORDINARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 商协会复核分页条件查询
    getlistDealCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListDealCondition(Object).then(res => {
          commit('GET_DEAL_COND', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 外贸中心汇总实际使用名单的查询
    getlistDealConditionft({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListDealConditionft(Object).then(res => {
          commit('GET_DEAL_CONDFT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 外贸司审核查询条件
    getforeignTradeCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getForeignTradeCondition(Object).then(res => {
          commit('GET_FTC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 外贸中心、交易团查看复核结果查询条件
    getforeignCenterCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getForeignCenterCondition(Object).then(res => {
          commit('GET_FCC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 外贸中心汇总使用者参展资格审核情况表查询条件
    getforeignCheckCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getForeignCheckCondition(Object).then(res => {
          commit('GET_FCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 外贸司查看同步至一般性展位数量安排查询条件
    getforeignTradeSyncCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getForeignTradeSyncCondition(Object).then(res => {
          commit('GET_FTSC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询条件的接口 condition/get 交易团审核参展资格查询条件
    getlistDealConditionjyt({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListDealConditionjyt(Object).then(res => {
          commit('GET_DEAL_CONDJYT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 发送状态的接口 sendData/add
    addsendData({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.addSendData(Object).then(res => {
          commit('ADD_SEND', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核参展资格(分页)
    getlistDealGrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListDealGrade(Object).then(res => {
          commit('GET_DEAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会复核(分页)
    getlistCoceralGrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListCoceralGrade(Object).then(res => {
          commit('GET_COCERAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取分页查询条件
    getlistCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListCondition(Object).then(res => {
          commit('GET_CONDITION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 点击“通过、不通过或者未审核”按钮，交易团提交审核参展资格
    adddealGrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.addDealGrade(Object).then(res => {
          commit('ADD_DEAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 点击“通过、不通过或者未审核”按钮，商协会提交审核参展资格
    addcoceralGrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.addCoceralGrade(Object).then(res => {
          commit('ADD_COCERAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司审核(分页)
    getlistfOreignTrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListfOreignTrade(Object).then(res => {
          commit('GET_FOREIGN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸中心、交易团查看复核结果(分页)
    getlistForeignCenter({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListForeignCenter(Object).then(res => {
          commit('LIST_FOREIGN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸中心汇总使用者参展资格审核情况表(分页)
    getlistForeignCheck({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getListForeignCheck(Object).then(res => {
          commit('GET_CHECK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司查看同步至一般性展位数量安排(分页)
    getforeignTradeSync({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.getForeignTradeSync(Object).then(res => {
          commit('GET_SYNC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司审核(通过/不通过)
    addforeignTradeSync({ commit }, Object) {
      return new Promise((resolve, reject) => {
        actualUserCallApi.addForeignTradeSync(Object).then(res => {
          commit('ADD_FOREIGNT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
