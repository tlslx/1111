import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看咨询投诉保障记录列表
  queryListByCondition(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/consultationComplaint/queryListByCondition?current=' + param.current + '&size=' + param.size + '&consultationComplaintType=' + param.consultationComplaintType + '&consultationStatus=' + param.consultationStatus + '&counselingComplaintCode=' + param.counselingComplaintCode;
      if (param.consultationComplaintType === "" & param.consultationStatus === "" & param.counselingComplaintCode === "") {
        params = '/api/consultationComplaint/queryListByCondition?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看投诉保障工单进度列表
  queryReportWorkOrderStep(workOrderNumber) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/reportWorkOrder/queryReportWorkOrderStep?workOrderNumber=' + workOrderNumber).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看咨询投诉保障记录列表
  queryListByCondtion(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/reportWorkOrder/queryListByCondtion?current=' + param.current + '&size=' + param.size + '&status=' + param.status + '&workOrderNumber=' + param.workOrderNumber + '&workOrderType=' + param.workOrderType;
      if (param.status === "" & param.workOrderNumber === "" & param.workOrderType === "") {
        params = '/api/reportWorkOrder/queryListByCondtion?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 根据id删除投诉保障记录
  deleteWorkOrder(complaintReportId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/reportWorkOrder/delete?complaintReportId=' + complaintReportId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看咨询投诉保障记录详情
  queryByComplaintReportId(complaintReportId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/reportWorkOrder/queryByComplaintReportId?complaintReportId=' + complaintReportId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加投诉保障工单记录信息
  addWorkOrder(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/reportWorkOrder/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 派单
  sendWorkOrder(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/reportWorkOrder/sendWorkOrder', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 回访记录
  queryListVisitRecord(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/returnVisitRecord/queryList?current=' + param.current + '&size=' + param.size + '&counselingComplainId=' + param.counselingComplainId;
      if (param.counselingComplainId === "") {
        params = '/api/returnVisitRecord/queryList?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 回访修改
  updateVisitRecord(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/returnVisitRecord/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 回访客商
  addVisitRecord(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/returnVisitRecord/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
