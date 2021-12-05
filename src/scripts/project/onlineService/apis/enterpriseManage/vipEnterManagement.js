import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 新增采购信息
  addRecommendBuyers(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/addPurchaserInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //删除采购信息
  deletePurchaser(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/deletePurchaserInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //编辑采购信息
  updatePurchaser(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/updatePurchaserInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看推荐采购商列表信息
  getRecoSum(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getPurchaserInfoList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
