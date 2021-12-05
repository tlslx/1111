import { payNotificationApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    checkPaymentNotificationData: {}
  },
  getters: {
    checkPaymentNotificationData: state => state.checkPaymentNotificationData
  },
  mutations: {
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
    }


  }
};
