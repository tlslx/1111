import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 交易团退回申请git
  tradingRefunds(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBoothRefund/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团退回申请 post
  teamApplica(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBoothRefund/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作处审批退回申请（审核）一般性展位退回审核 get
  applicationReturning(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBoothRefund/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作处审批退回申请（审核）一般性展位退回审核 post(通过，不通过)
  applicationReturn(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBoothRefund/check/affirm', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 自动生成交易团展位数调整记录
  automaticallyAdjustment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustRecord/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作处汇总并通知已通过的申请 get
  notifiesApproved(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBoothRefund/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作处汇总并通知已通过的申请 post
  notifiesBpproved(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBoothRefund/notice/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
