import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 一键审核vip企业
  approveVipCompanyInfos(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/approveVipCompanyInfos', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 获取商协会审核时间
  getApproveDate(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/EfOsVipStands/getApproveDate?session=' + param.session + '&type=' + param.type).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};

