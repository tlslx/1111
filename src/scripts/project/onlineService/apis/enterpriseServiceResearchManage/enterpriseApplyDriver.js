import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 获取司机人员信息
  getDriverListPage(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/getDriverListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增司机人员信息
  insertDriverAndAttach(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/insertDriverAndAttach', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑司机人员信息
  updateDriverById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/updateDriverById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除司机人员信息
  deleteDriverById(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/deleteDriverById?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取司机人员证件列表
  getInfoAndDetailListPage(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exhibitorPassOuter/getInfoAndDetailListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增司机人员证件
  submitApplyByGroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/submitApplyByGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改司机人员证件
  updateOne(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/updateOne', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除司机人员证件
  delApplyInfo(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/exhibitorPassOuter/delApplyInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
