import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看咨询投诉保障列表
  queryListByCondition(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/consultationComplaint/queryListByCondition?current=' + param.current + '&size=' + param.size + '&consultationComplaintType=' + param.consultationComplaintType + '&consultationStatus=' + param.consultationStatus;
      if (param.consultationComplaintType === "" & param.consultationStatus === "") {
        params = '/api/consultationComplaint/queryListByCondition?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 根据id删除咨询投诉保障信息
  deleteComplaint(counselingComplainId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/consultationComplaint/delete?counselingComplainId=' + counselingComplainId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看咨询投诉保障详情
  queryByIdComplaint(counselingComplainId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/consultationComplaint/queryById?counselingComplainId=' + counselingComplainId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看客户查询提交列表
  queryCustomerList(cantonFairDocumentNo) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/consultationComplaint/queryCustomerList?cantonFairDocumentNo=' + cantonFairDocumentNo).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导出Excel
  exportExcel() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/consultationComplaint/exportExcel').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加咨询投诉保障信息
  addComplaint(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/consultationComplaint/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新咨询投诉保障
  updateComplaint(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/consultationComplaint/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
