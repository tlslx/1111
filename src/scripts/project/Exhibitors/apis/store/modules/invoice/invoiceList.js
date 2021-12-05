import { invoiceListApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getInvoice: []
  },
  getters: {
    getInvoice: state => state.getInvoice

  },
  mutations: {
    GET_INVOICE(state, payload) {
      state.getInvoice = payload;
    }
  },
  actions: {
    // 查看企业信息修改记录
    getIfoAddedValueInvoiceInfo({ commit }, param) {
      return new Promise((resolve, reject) => {
        const promises = invoiceListApi.getIfoAddedValueInvoice(param);
        promises.then(res => {
          commit('GET_INVOICE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
