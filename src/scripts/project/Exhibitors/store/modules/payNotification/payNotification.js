import { payNotificationApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    getRemittanceData: {},
    updateRemittancesData: {},
    checkPaymentNotificationData: {}
  },
  getters: {
    getRemittanceData: state => state.getRemittanceData,
    updateRemittancesData: state => state.updateRemittancesData,
    checkPaymentNotificationData: state => state.checkPaymentNotificationData
  },
  mutations: {
    GET_REMITTANCE_DATA(state, payload) {
      state.getRemittanceData = payload;
    },
    UPDATE_REMITTANCE_DATA(state, payload) {
      state.updateRemittancesData = payload;
    },
    CHECK_PAYMENT_NOTIFICATION_DATA(state, payload) {
      state.checkPaymentNotificationData = payload;
    }
  },
  actions: {
    // 查看付款通知书
    getCheckPaymentNotification({ commit }, Object) {
      return new Promise((resolve, reject) => {
        payNotificationApi.getCheckPaymentNotificationData(Object).then(res => {
          commit('CHECK_PAYMENT_NOTIFICATION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看付款通知书付款水单
    getRemittance({ commit }, Object) {
      return new Promise((resolve, reject) => {
        payNotificationApi.getRemittanceData(Object).then(res => {
          commit('GET_REMITTANCE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑汇款水单
    updateRemittances({ commit }, Object) {
      return new Promise((resolve, reject) => {
        payNotificationApi.updateRemittancesData(Object).then(res => {
          commit('UPDATE_REMITTANCE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }


  }
};
