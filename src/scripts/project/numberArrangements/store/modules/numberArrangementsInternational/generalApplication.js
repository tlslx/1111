import { generalApplicationApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getTrad: {},
    postTeam: {},
    getAppli: {},
    postRetur: {},
    getNotifi: {},
    postNotifi: {},
    getAutoma: {}
  },
  getters: {
    getTrad: state => state.getTrad,
    postTeam: state => state.postTeam,
    getAppli: state => state.getAppli,
    postRetur: state => state.postRetur,
    getNotifi: state => state.getNotifi,
    postNotifi: state => state.postNotifi,
    getAutoma: state => state.getAutoma
  },
  mutations: {
    GET_ATOA(state, payload) {
      state.getTrad = payload;
    },
    POST_ATOB(state, payload) {
      state.postTeam = payload;
    },
    GET_ATOB(state, payload) {
      state.getAppli = payload;
    },
    GET_ATOC(state, payload) {
      state.postRetur = payload;
    },
    GET_ATOD(state, payload) {
      state.getNotifi = payload;
    },
    POST_ATOD(state, payload) {
      state.postNotifi = payload;
    },
    GET_ATOE(state, payload) {
      state.getAutoma = payload;
    }

  },
  actions: {
    // 交易团退回申请git
    getTradingRefunds({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.tradingRefunds(obj).then(res => {
          commit('GET_ATOA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团退回申请 post
    postTeamApplica({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.teamApplica(obj).then(res => {
          commit('POST_ATOB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作处审批退回申请（审核）一般性展位退回审核 get
    getApplicationReturning({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.applicationReturning(obj).then(res => {
          commit('GET_ATOB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作处审批退回申请（审核）一般性展位退回审核 post(通过，不通过)
    postApplicationReturn({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.applicationReturn(obj).then(res => {
          commit('GET_ATOC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 自动生成交易团展位数调整记录
    getAutomaticallyAdjustment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.automaticallyAdjustment(obj).then(res => {
          commit('GET_ATOE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作处汇总并通知已通过的申请 get
    getNotifiesApproved({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.notifiesApproved(obj).then(res => {
          commit('GET_ATOD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作处汇总并通知已通过的申请 post
    postNotifiesBpproved({ commit }, obj) {
      return new Promise((resolve, reject) => {
        generalApplicationApi.notifiesBpproved(obj).then(res => {
          commit('POST_ATOD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }

};
