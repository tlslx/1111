import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看主项目字典列表
  queryListMainProjectDictionary() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/mainProjectDictionary/queryListMainProjectDictionary').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看主项目字典
  queryMainProjectDictionary(mainProjectId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/mainProjectDictionary/queryMainProjectDictionary?mainProjectId=' + mainProjectId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除主项目字典
  deleteMainProjectDictionary(mainProjectId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/mainProjectDictionary/deleteMainProjectDictionary?mainProjectId=' + mainProjectId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改主项目字典
  updateMainProjectDictionary(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/mainProjectDictionary/updateMainProjectDictionary', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增主项目字典
  addMainProjectDictionary(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/mainProjectDictionary/addMainProjectDictionary', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看二级项目字典列表
  queryListBarriersDictionary() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/barriers/queryListBarriersDictionary').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看二级项目字典
  queryBarriersDictionary(barriersId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/barriers/queryBarriersDictionary?barriersId=' + barriersId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除二级项目字典
  deleteBarriersDictionary(barriersId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/barriers/deleteBarriersDictionary?barriersId=' + barriersId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改二级项目字典
  updateBarriersDictionary(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/barriers/updateBarriersDictionary', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增二级项目字典
  addBarriersDictionary(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/barriers/addBarriersDictionary', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
