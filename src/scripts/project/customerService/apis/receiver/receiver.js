import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看接单员列表信息
  queryListByCondition(param) {
    let params = '/api/workAcceptor/queryListByCondition?current=' + param.current + '&area=' + param.area + '&deptName=' + param.deptName + '&hall=' + param.hall + '&size=' + param.size;
    if (param.area === "" & param.deptName === "" & param.hall === "") {
      params = '/api/workAcceptor/queryListByCondition?current=' + param.current + '&size=' + param.size;
    }
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看接单人员列表（按展览）
  queryListByExh(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/workAcceptor/queryListByExh?current=' + param.current + '&size=' + param.size + '&deptName=' + param.deptName;
      if (param.deptName === "") {
        params = '/api/workAcceptor/queryListByExh?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看接单人员列表（按科室班组）
  queryList() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workAcceptor/queryList').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加接单员信息
  addworkAcceptor(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workAcceptor/addWorkAcceptor', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 复制接单员人员信息
  addBatch(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workAcceptor/addBatch', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除接单员人员信息
  deleteWorkAcceptor(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workAcceptor/deleteWorkAcceptor', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改接单员人员信息
  updateWorkAcceptor(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workAcceptor/updateWorkAcceptor', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
