import { $req } from '../../../utils';
const BASE_URL = process.env.API_DA_URL;
export default {
  // 新增海关编码
  registerConstructionCompany(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/daConstructionCompanyInfo/registerConstructionCompany', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
