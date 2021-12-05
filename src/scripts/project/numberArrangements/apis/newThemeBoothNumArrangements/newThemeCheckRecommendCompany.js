import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 交易团审核企业资质列表（新题材）查询
  getCheckByDelegationData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取单条企业展位申请信息
  getOneDemandData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/getOneDemand`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核企业资料（新题材）
  postCheckCompanyInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/checkCompanyInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团企业申请审核（新题材）
  postCheckCompanyApplyData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/checkCompanyApply`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核保存企业类型
  postSaveCompanyInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/external/companyInfo/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核保存
  postSaveCompanyData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/tradeCenter/post`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核符合
  postCheckIfMeetData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/postStandard`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团推荐企业列表查询
  getRecommendByDelegationData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/recommendByDelegation/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团推荐企业改变企业类型
  postRecommendChangeCompanyTypeData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/external/companyInfo/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团推荐企业（新题材）
  postRecommendByDelegationData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/recommendByDelegation/recommend`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
