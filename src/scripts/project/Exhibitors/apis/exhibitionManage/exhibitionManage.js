import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 查看运输备案关联列表
  getRecordLksData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoProductRecord/getRecordLks?size=' + param.size + '&isAsc=' + param.isAsc
      + '&current=' + param.current + '&loginId=' + param.loginId + '&loginType=' + param.loginType
      + '&orderByField=' + param.orderByField + '&productRecordId=' + param.productRecordId + '&productName=' + param.productName
      + '&secCatalogId=' + param.secCatalogId + '&afterHandleMethod=' + param.afterHandleMethod).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增展品运输备案关联
  addRecordLkData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoProductRecord/addRecordLk', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑展品运输备案关联
  updateRecordLkData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoProductRecord/updateRecordLk', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除展品运输备案关联
  removeRecordLkData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoProductRecord/removeRecordLk?recordLkId=' + param.recordLkId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  childCatalogData(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/ifoExhibitsCatalog/getChildCatalog', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
