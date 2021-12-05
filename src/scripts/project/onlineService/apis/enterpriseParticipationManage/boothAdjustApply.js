import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 展位数量
  numberBoothData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ordinaryCompanyDemandRecord/boothNumberList?param=` + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增展位数量
  newlyAddedBooths(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/boothAdjustSubmit`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改提交
  newlyAddedSubmitted(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/boothNumberUpdate`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除展位数量
  deleteAddedBooths(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/boothNumberDelete`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据企业id和展区获取原推荐数量
  originalRecommended(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/getOrigin`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
