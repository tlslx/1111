import { $req } from '../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 交易团审核企业资料状态
  selectReviewResult(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/selectReviewResult?companyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位申请、审核
  getOrdinaryArrangeCompanyRecord(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyDemandRecord/getOrdinaryArrangeCompanyRecord', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 数量安排、展位安排结果
  getOrdinaryArrangeCompanyResult(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyDemandRecord/getOrdinaryArrangeCompanyResult', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
