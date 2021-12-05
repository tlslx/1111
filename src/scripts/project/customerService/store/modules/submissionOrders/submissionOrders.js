import { submissionOrdersApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listByCondition: [],
    deleteComplaint: [],
    byIdComplaint: [],
    customerList: [],
    exportExcel: [],
    addComplaint: [],
    updateComplaint: []
  },
  getters: {
    listByCondition: state => state.listByCondition,
    deleteComplaint: state => state.deleteComplaint,
    byIdComplaint: state => state.byIdComplaint,
    customerList: state => state.customerList,
    exportExcel: state => state.exportExcel,
    addComplaint: state => state.addComplaint,
    updateComplaint: state => state.updateComplaint
  },
  mutations: {
    LIST_BY_CONDITION(state, payload) {
      state.listByCondition = payload;
    },
    DELETE_COMPLAINT(state, payload) {
      state.deleteComplaint = payload;
    },
    BY_ID_COMPLAINT(state, payload) {
      state.byIdComplaint = payload;
    },
    CUSTOMER_LIST(state, payload) {
      state.customerList = payload;
    },
    EXPORT_EXCEL(state, payload) {
      state.exportExcel = payload;
    },
    ADD_COMPLAINT(state, payload) {
      state.addComplaint = payload;
    },
    UPDATE_COMPLAINT(state, payload) {
      state.updateComplaint = payload;
    }
  },
  actions: {
    // 查看咨询投诉保障列表
    selectListByCondition({ commit }, params) {
      return new Promise((resolve, reject) => {
        submissionOrdersApi.queryListByCondition(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_BY_CONDITION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id删除咨询投诉保障信息
    deleteComplaintInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = submissionOrdersApi.deleteComplaint(params);
        promises.then(res => {
          commit('DELETE_COMPLAINT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看咨询投诉保障详情
    selectByIdComplaint({ commit }, params) {
      return new Promise((resolve, reject) => {
        submissionOrdersApi.queryByIdComplaint(params).then(res => {
          commit('BY_ID_COMPLAINT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看客户查询提交列表
    selectCustomerList({ commit }, params) {
      return new Promise((resolve, reject) => {
        submissionOrdersApi.queryCustomerList(params).then(res => {
          commit('CUSTOMER_LIST', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导出excel
    getExportExcel({ commit }) {
      return new Promise((resolve, reject) => {
        submissionOrdersApi.exportExcel().then(res => {
          commit('EXPORT_EXCEL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加咨询投诉保障信息
    addComplaintInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = submissionOrdersApi.addComplaint(params);
        promises.then(res => {
          commit('ADD_COMPLAINT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新咨询投诉保障
    updateComplaintInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = submissionOrdersApi.updateComplaint(params);
        promises.then(res => {
          commit('UPDATE_COMPLAINT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
