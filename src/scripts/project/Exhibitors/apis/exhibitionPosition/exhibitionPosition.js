// 进口展招展-查看展位
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 产看展位安排
  exhibitionPositionPlan(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/checkBooth/get?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
