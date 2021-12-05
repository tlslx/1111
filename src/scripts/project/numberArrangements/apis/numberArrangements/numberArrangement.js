import { $req } from "../../../utils";
const BASER_URL = process.env.API_NA_URL;
export default {
  //商协会提交品牌展位数量安排方案
  numberArrangement(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/schemePublicityLog/selectApplyForCoceral/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  numberBrrangement(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/schemePublicityLog/boothNumberPlan/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
