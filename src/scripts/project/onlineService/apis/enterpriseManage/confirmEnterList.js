import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 查看企业名单
  getCompanyInfoList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/getCompanyInfoList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部删除vip企业信息(一键删除)
  deleteVipCompanyInfos(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/deleteVipCompanyInfos', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
