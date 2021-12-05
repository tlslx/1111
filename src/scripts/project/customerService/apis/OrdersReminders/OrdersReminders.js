import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看工单列表信息
  queryListWorkOrder(param) {
    let params = '/api/workOrder/queryListWorkOrder?current=' + param.current + '&businessOrderNumber=' + param.businessOrderNumber + '&workType=' + param.workType + '&workStatus=' + param.workStatus + '&size=' + param.size;
    if (param.businessOrderNumber === "" & param.workType === "" & param.workStatus === "") {
      params = '/api/workOrder/queryListWorkOrder?current=' + param.current + '&size=' + param.size;
    }
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看工单详情
  queryWorkOrder(param) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/queryWorkOrder?workOrderNumber=' + param.workOrderNumber).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看工单状态
  queryWorkOrderStatus(param) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/queryWorkOrderStatus?workOrderNumber=' + param.workOrderNumber).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新建手工工单信息
  addWorkOrder(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/addWorkOrder', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 附件删除
  deleteFile(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/deleteFile', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除工单信息
  deleteWorkOrder(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/deleteWorkOrder', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 退单
  orderBack(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/orderBack', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 用户催单
  orderUrge(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/orderUrge', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 快速反馈
  quickFeedback(param) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/quickFeedback?workOrderNumber=' + param.acceptorRowId + '&workOrderNumber=' + param.workOrderNumber).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 结果反馈
  returnWorkResult(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/returnWorkResult', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 派单(下发接单员)
  sendWorkOrder(param) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/sendWorkOrder?acceptorRowId=' + param.acceptorRowId + '&workOrderNumber=' + param.workOrderNumber).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 派工（接单员下发施工组）
  sendWorkOrderToGroup(param) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/sendWorkOrderToGroup?workOrderNumber=' + param.acceptorRowId + '&workOrderNumber=' + param.workOrderNumber).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改工单
  updateWorkOrder(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/updateWorkOrder', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // // 附件上传
  // uploadFile(params) {
  //   return new Promise((resolve, reject) => {
  //     $req.postJson(CYMT_URL + '/api/workOrder/uploadFile', params).then(res => {
  //       resolve(res);
  //     }).catch(e => {
  //       reject(e);
  //     });
  //   });
  // },
  // 批量附件上传
  uploadFiles(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/uploadFiles', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 评价打星
  evaluation(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workOrder/evaluation', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
