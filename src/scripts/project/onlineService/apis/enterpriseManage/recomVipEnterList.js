import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 推荐vip企业信息
  updateVipCompanyInfos(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/updateVipCompanyInfos', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};

