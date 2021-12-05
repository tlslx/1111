import { $req } from "../../../utils";
const BASER_URL = process.env.API_NA_URL;
export default {
  // 公示意见汇总
  getDepartment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/schemePublicityLog/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  postDepartment(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/schemePublicityLog/returnPlanForCoceral/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 返回处理意见
  departmentAcity(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/schemePublicityLog/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
    
  } 
};
