import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 确认展位联系人
  addVipContactInfo(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/addVipContactInfo', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
