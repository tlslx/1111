import { $req } from "../../../utils";
const BASER_URL = process.env.API_NA_URL;
export default {
  //查询未缴齐订金企业
  getUnderpaidDeposit(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/numberAffirm/notPaySubscription/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团登记企业是否已缴齐订金情况
  postRegisteredRnterprise(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/numberAffirm/notPaySubscription/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团审核企业详情页
  getEnterpriseDetails(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/numberAffirm/notPaySubscription/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //审核企业资质
  enterpriseAetails(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/numberAffirm/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  enterprisePetails(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/numberAffirm/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
