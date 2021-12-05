// 审核企业修改
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 审核企业修改记录
  coHistoryList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/ifoApproveInfo/getCoHistoryList', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核企业修改记录详情
  historyModifyDetail(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/ifoApproveInfo/getHistoryModifyDetail', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改详情中 - 确认审核
  approveCoModify(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoApproveInfo/approveCoModify', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
