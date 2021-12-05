import { invoiceListApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getInvoice: [],
    ifoAddedValueInvoiceData: {},
    updateAddedInvoiceInfoData: {}
  },
  getters: {
    getInvoice: state => state.getInvoice,
    ifoAddedValueInvoiceData: state => state.ifoAddedValueInvoiceData,
    updateAddedInvoiceInfoData: state => state.updateAddedInvoiceInfoData
  },
  mutations: {
    GET_INVOICE(state, payload) {
      state.getInvoice = payload;
    },
    IFO_ADDED_VALUE_INVOICE_DATA(state, payload) {
      state.ifoAddedValueInvoiceData = payload;
    },
    UPDATE_ADDED_INVOICE_INFO_DATA(state, payload) {
      state.updateAddedInvoiceInfoData = payload;
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
    },
    // 获取增值税发票信息
    ifoAddedValueInvoice({ commit }, param) {
      return new Promise((resolve, reject) => {
        const promises = invoiceListApi.ifoAddedValueInvoiceData(param);
        promises.then(res => {
          commit('IFO_ADDED_VALUE_INVOICE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新增值税发票信息 保存按钮接口
    updateAddedInvoiceInfo({ commit }, param) {
      return new Promise((resolve, reject) => {
        const promises = invoiceListApi.updateAddedInvoiceInfoData(param);
        promises.then(res => {
          commit('UPDATE_ADDED_INVOICE_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
