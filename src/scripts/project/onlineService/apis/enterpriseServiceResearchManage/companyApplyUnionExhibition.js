import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 企业申请联合布展
  getCompanyApplyUnionExhibition(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/companyApplyUnionExhibition', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据申请企业ID删除申请方以及联合方
  deleteByApplyCode(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/deleteByApplyCode', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据条件查询联合布展信息
  getUnionExhibitions(params) {
    return new Promise((resolve, reject) => {
      // console.log(params, "params");
      $req.get(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/getUnionExhibitionInfo?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核联合发布交易团、商协会
  reviewUnionExhibition(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/reviewUnionExhibition', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核联合发布广交会
  reviewUnionExhibitionByCanton(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/reviewUnionExhibitionByCanton', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 申请方修改信息
  updateUnionExhibition(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/unionExhibitionApplyUpdate', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据公司ID获取公司名称
  selectCompanyName(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/selectCompanyName').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会查询
  queryBusinessData(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/businessApproveSelect?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 广交会查询
  querycantonSessionData(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/cantonApproveSelect?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团查询
  queryTradeSessionData(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/tradeApproveSelect?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
