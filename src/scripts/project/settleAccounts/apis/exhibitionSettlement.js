import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 商会查看展位数量调整申请列表查询
  getOrdinaryAdjustCompanyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ordinaryAdjustCompany/coceral/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
