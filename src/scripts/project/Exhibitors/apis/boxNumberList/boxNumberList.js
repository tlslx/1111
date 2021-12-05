import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 查看展品运输备案列表
  getRecordsData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoProductRecord/getRecords?size=' + param.size + '&isAsc=' + param.isAsc
      + '&current=' + param.current + '&loginId=' + param.loginId + '&loginType=' + param.loginType + '&orderByField=' + param.orderByField
      + '&exhibitionNum=' + param.exhibitionNum + '&boxNo=' + param.boxNo).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增展品运输备案
  addRecordData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoProductRecord/addRecord', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除展品运输备案
  removeRecordData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoProductRecord/removeRecord', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑展品运输备案
  updateRecordData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoProductRecord/updateRecord', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 点击新增时显示当前登录的企业的名称，原产地和国别地区
  getLoginInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoProductRecord/getLoginInfo?companyId=' + param.companyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
