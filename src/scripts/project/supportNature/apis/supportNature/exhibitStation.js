import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 驻地信息填报
  exhibitFillSubmit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupAboveSecretaryGeneral/submit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
