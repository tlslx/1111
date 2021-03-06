import { returnVisitorSatisfactionApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listByCondition: [],
    reportWorkOrderStep: [],
    listByCondtion: [],
    deleteWorkOrder: [],
    byComplaintReportId: [],
    customerList: [],
    addWorkOrder: [],
    updateWorkOrder: [],
    sendWorkOrder: [],
    listVisitRecord: [],
    updateVisitRecord: [],
    addVisitRecord: []
  },
  getters: {
    listByCondition: state => state.listByCondition,
    reportWorkOrderStep: state => state.reportWorkOrderStep,
    listByCondtion: state => state.listByCondtion,
    deleteWorkOrder: state => state.deleteWorkOrder,
    byComplaintReportId: state => state.byComplaintReportId,
    customerList: state => state.customerList,
    addWorkOrder: state => state.addWorkOrder,
    updateWorkOrder: state => state.updateWorkOrder,
    sendWorkOrder: state => state.sendWorkOrder,
    listVisitRecord: state => state.listVisitRecord,
    updateVisitRecord: state => state.updateVisitRecord,
    addVisitRecord: state => state.addVisitRecord
  },
  mutations: {
    LIST_BY_CONDITION(state, payload) {
      state.listByCondition = payload;
    },
    REPORT_WORKORDER_STEP(state, payload) {
      state.reportWorkOrderStep = payload;
    },
    LIST_BY_CONDTION(state, payload) {
      state.listByCondtion = payload;
    },
    DELETE_WORK_ORDER(state, payload) {
      state.deleteWorkOrder = payload;
    },
    BY_COMPLAINT_REPORT_ID(state, payload) {
      state.byComplaintReportId = payload;
    },
    ADD_WORK_ORDER(state, payload) {
      state.addWorkOrder = payload;
    },
    UPDATE_WORK_ORDER(state, payload) {
      state.updateWorkOrder = payload;
    },
    SEND_WORK_ORDER(state, payload) {
      state.sendWorkOrder = payload;
    },
    LIST_VISIT_RECORD(state, payload) {
      state.listVisitRecord = payload;
    },
    UPDATE_VISIT_RECORD(state, payload) {
      state.updateVisitRecord = payload;
    },
    ADD_VISIT_RECORD(state, payload) {
      state.addVisitRecord = payload;
    }
  },
  actions: {
    // ????????????????????????????????????
    selectListByCondition({ commit }, params) {
      return new Promise((resolve, reject) => {
        returnVisitorSatisfactionApi.queryListByCondition(params).then(res => {
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
    // ????????????????????????????????????
    selectReportWorkOrderStep({ commit }, params) {
      return new Promise((resolve, reject) => {
        returnVisitorSatisfactionApi.queryReportWorkOrderStep(params).then(res => {
          commit('REPORT_WORKORDER_STEP', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    selectListByCondtion({ commit }, params) {
      return new Promise((resolve, reject) => {
        returnVisitorSatisfactionApi.queryListByCondtion(params).then(res => {
          commit('LIST_BY_CONDTION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????id????????????????????????
    deleteWorkOrderInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = returnVisitorSatisfactionApi.deleteWorkOrder(params);
        promises.then(res => {
          commit('DELETE_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    selectByComplaintReportId({ commit }, params) {
      return new Promise((resolve, reject) => {
        returnVisitorSatisfactionApi.queryByComplaintReportId(params).then(res => {
          commit('BY_COMPLAINT_REPORT_ID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    addWorkOrderInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = returnVisitorSatisfactionApi.addWorkOrder(params);
        promises.then(res => {
          commit('ADD_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    updateWorkOrdertInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = returnVisitorSatisfactionApi.updateWorkOrder(params);
        promises.then(res => {
          commit('UPDATE_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // ??????
    sendWorkOrdertInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = returnVisitorSatisfactionApi.sendWorkOrder(params);
        promises.then(res => {
          commit('SEND_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    selectListVisitRecord({ commit }, params) {
      return new Promise((resolve, reject) => {
        returnVisitorSatisfactionApi.queryListVisitRecord(params).then(res => {
          commit('LIST_VISIT_RECORD', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    updateVisitRecordInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = returnVisitorSatisfactionApi.updateVisitRecord(params);
        promises.then(res => {
          commit('UPDATE_VISIT_RECORD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    addVisitRecordInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = returnVisitorSatisfactionApi.addVisitRecord(params);
        promises.then(res => {
          commit('ADD_VISIT_RECORD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
