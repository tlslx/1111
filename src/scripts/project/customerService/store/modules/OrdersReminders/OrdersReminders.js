import { OrdersRemindersApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listWorkOrder: [],
    workOrder: [],
    workOrdeStatus: [],
    addWorkOrder: [],
    deleteFile: [],
    deleteWorkOrder: [],
    orderBack: [],
    orderUrge: [],
    quickFeedback: [],
    returnWorkResult: [],
    sendWorkOrder: [],
    sendWorkOrderToGroup: [],
    updateWorkOrder: [],
    uploadFile: [],
    uploadFiles: [],
    evaluation: []
  },
  getters: {
    listWorkOrder: state => state.listWorkOrder,
    workOrder: state => state.workOrder,
    workOrdeStatus: state => state.workOrdeStatus,
    addWorkOrder: state => state.addWorkOrder,
    deleteFile: state => state.deleteFile,
    deleteWorkOrder: state => state.deleteWorkOrder,
    orderBack: state => state.orderBack,
    orderUrge: state => state.orderUrge,
    quickFeedback: state => state.quickFeedback,
    returnWorkResult: state => state.returnWorkResult,
    sendWorkOrder: state => state.sendWorkOrder,
    sendWorkOrderToGroup: state => state.sendWorkOrderToGroup,
    updateWorkOrder: state => state.updateWorkOrder,
    uploadFile: state => state.uploadFile,
    uploadFiles: state => state.uploadFiles,
    evaluation: state => state.evaluation
  },
  mutations: {
    LIST_WORK_ORDER(state, payload) {
      state.listWorkOrder = payload;
    },
    WORK_ORDER(state, payload) {
      state.workOrder = payload;
    },
    WORK_ORDER_STATUS(state, payload) {
      state.workOrdeStatus = payload;
    },
    ADD_WORK_ORDER(state, payload) {
      state.addWorkOrder = payload;
    },
    DELETE_FILE(state, payload) {
      state.deleteFile = payload;
    },
    DELETE_WORK_ORDER(state, payload) {
      state.deleteWorkOrder = payload;
    },
    ORDER_BACK(state, payload) {
      state.orderBack = payload;
    },
    ORDER_URGE(state, payload) {
      state.orderUrge = payload;
    },
    QUICK_FEEDBACK(state, payload) {
      state.quickFeedback = payload;
    },
    RETURN_WORK_RESULT(state, payload) {
      state.returnWorkResult = payload;
    },
    SEND_WORK_ORDER(state, payload) {
      state.sendWorkOrder = payload;
    },
    SEND_WORK_ORDER_TO_GROUP(state, payload) {
      state.sendWorkOrderToGroup = payload;
    },
    UPDATE_WORK_ORDER(state, payload) {
      state.updateWorkOrder = payload;
    },
    UPLOAD_FILE(state, payload) {
      state.uploadFile = payload;
    },
    UPLOAD_FILES(state, payload) {
      state.uploadFiles = payload;
    },
    EVALUATION(state, payload) {
      state.evaluation = payload;
    }
  },
  actions: {
    // 查看工单列表信息
    selectListWorkOrder({ commit }, params) {
      return new Promise((resolve, reject) => {
        OrdersRemindersApi.queryListWorkOrder(params).then(res => {
          res.records.forEach((value, index) => {
            // 工单类型
            if (value.workOrder.workType === "1") {
              value.workOrder.workType = "自动工单";
            } else if (value.workOrder.workType === "2") {
              value.workOrder.workType = "手工工单";
            } else if (value.workOrder.workType === "3") {
              value.workOrder.workType = "投诉工单";
            } else {
              value.workOrder.workType = "报障工单";
            }
            // 工单状态
            if (value.workOrder.workStatus === "0") {
              value.workOrder.workStatus = "待处理";
            } else if (value.workOrder.workStatus === "1") {
              value.workOrder.workStatus = "已处理";
            // } else if (value.workOrder.workStatus === "2") {
            //   value.workOrder.workStatus = "已取消";
            // } else if (value.workOrder.workStatus === "3") {
            //   value.workOrder.workStatus = "已对冲";
            } else if (value.workOrder.workStatus === "4") {
              value.workOrder.workStatus = "待施工完成";
            } else if (value.workOrder.workStatus === "5") {
              value.workOrder.workStatus = "已完工";
            } else if (value.workOrder.workStatus === "6") {
              value.workOrder.workStatus = "已反馈";
            } else if (value.workOrder.workStatus === "7") {
              value.workOrder.workStatus = "已退单";
            } else if (value.workOrder.workStatus === "8") {
              value.workOrder.workStatus = "已转单";
            } else {
              value.workOrder.workStatus = "已结单";
            }
          });
          commit('LIST_WORK_ORDER', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看工单详情
    selectWorkOrder({ commit }, params) {
      return new Promise((resolve, reject) => {
        OrdersRemindersApi.queryWorkOrder(params).then(res => {
          commit('WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看工单状态
    selectWorkOrderStatus({ commit }, params) {
      return new Promise((resolve, reject) => {
        OrdersRemindersApi.queryWorkOrderStatus(params).then(res => {
          commit('WORK_ORDER_STATUS', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新建手工工单信息
    addWorkOrderInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.addWorkOrder(params);
        promises.then(res => {
          commit('ADD_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 附件删除
    deleteFileInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.deleteFile(params);
        promises.then(res => {
          commit('DELETE_FILE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除工单信息
    deleteWorkOrderInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.deleteWorkOrder(params);
        promises.then(res => {
          commit('DELETE_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 退单
    orderBackInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.orderBack(params);
        promises.then(res => {
          commit('ORDER_BACK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 用户催单
    orderUrgeInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.orderUrge(params);
        promises.then(res => {
          commit('ORDER_URGE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 快速反馈
    quickFeedbackInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.quickFeedback(params);
        promises.then(res => {
          commit('QUICK_FEEDBACK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 结果反馈
    returnWorkResultInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.returnWorkResult(params);
        promises.then(res => {
          commit('RETURN_WORK_RESULT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 派单(下发接单员)
    sendWorkOrderInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.sendWorkOrder(params);
        promises.then(res => {
          commit('SEND_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 派工（接单员下发施工组）
    sendWorkOrderToGroupInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.sendWorkOrderToGroup(params);
        promises.then(res => {
          commit('SEND_WORK_ORDER_TO_GROUP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改工单
    updateWorkOrderInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.updateWorkOrder(params);
        promises.then(res => {
          commit('UPDATE_WORK_ORDER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // // 附件上传
    // uploadFileInfo({ commit }, params) {
    //   return new Promise((resolve, reject) => {
    //     const promises = OrdersRemindersApi.uploadFile(params);
    //     promises.then(res => {
    //       commit('UPLOAD_FILE', res);
    //       resolve(res);
    //     }).catch(e => {
    //       reject(e);
    //     });
    //   });
    // },
    // 批量附件上传
    uploadFilesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.uploadFiles(params);
        promises.then(res => {
          commit('UPLOAD_FILES', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量附件上传
    evaluationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = OrdersRemindersApi.evaluation(params);
        promises.then(res => {
          commit('EVALUATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
