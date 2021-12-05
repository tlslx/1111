import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 获取反馈意见列表
  getFeedBackList(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/tradingroupfeedback/getFeedbackList', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加异议内容
  addObjectionTrad(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/tradingroupfeedback/addObjection', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 取消异议内容
  cancelObjectionTrad(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/tradingroupfeedback/cancelObjection', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下载反馈意见汇总
  downloadTrad(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/tradingroupfeedback/download', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交外贸司
  commitStatusTrad(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/tradingroupfeedback/commitStatus', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
