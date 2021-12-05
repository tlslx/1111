import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  //展品情况查询
  getExhibitsStatistic(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfoStatistics/exhibitQuery?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取届数
  getSession(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getSession').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
