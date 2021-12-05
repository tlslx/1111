import { $req } from "../../../utils";
const BASE_URL = process.env.API_NA_URL;
export default {
  // 查询各类型数量安排阶段的时间点
  getconfirmList (param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublish/getConfirmList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
