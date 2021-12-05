import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 获取企业参展证件列表
  getEnterApplyCardInfo(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/getListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取单条办证申请信息
  getSingleById(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/getSingleById?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增办证申请信息
  add(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑办证申请信息
  updateById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/updateById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除办证申请信息
  deleteById(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/deleteById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看人员资料信息
  getResourceListPage(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/getResourceListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除人员资料信息
  deleteSysUserInfoByBatch(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/deleteSysUserInfoByBatch?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增人员资料信息
  insertUserInfo(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/insertUserInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑人员资料信息
  updateBatch(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/updateBatch', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
