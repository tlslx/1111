import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 申请付款通知书
  getCheckPaymentNotificationData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/checkPaymentNotification/get?size=' + param.size + '&isAsc=' + param.isAsc
      + '&current=' + param.current + '&loginId=' + param.loginId + '&loginType=' + param.loginType
      + '&orderByField=' + param.orderByField + '&status=' + param.status + '&exhibitionNum=' + param.exhibitionNum
      + '&paymentInfoType=' + param.paymentInfoType + '&exhibitionSession=' + param.exhibitionSession
      + '&paymentNotificationId=' + param.paymentNotificationId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看付款通知书付款水单
  getRemittanceData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/checkPaymentNotification/getRemittance?paymentNotificationId=' + param.paymentNotificationId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑汇款水单
  updateRemittancesData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/checkPaymentNotification/updateRemittances', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
