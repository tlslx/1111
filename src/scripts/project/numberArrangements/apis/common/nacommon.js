import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 模拟届数
  getSearch(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysDepartment/search?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
