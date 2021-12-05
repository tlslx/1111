import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 品牌展位申请单内容查询
  postBrandApplyData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/applyNumber/brandPosApply/getListAll`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
