import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 交易团审核企业特装数量调整申请查询
  getOrdinaryAdjustCompanyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ordinaryAdjustCompany/delegation/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据企业id和展区获取原推荐数量
  postOriginalRecommendNumData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/getOrigin`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 上传调整材料
  postOrdinaryAdjustCompanyUploadData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增展位数量调整申请
  postAddBoothNumberApplyData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核企业展位数量调整申请
  postCheckByDelegationData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/checkByDelegation`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据企业ID、展区code查询企业黑名单信息
  postIfBlackCompanyInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/common/rewardPunish/getBlackInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
