import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 审核企业
  approveAssociateEnterprises(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/approveAssociateEnterprisesInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增企业
  addAssociateEnterprises(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/addAssociateEnterprisesInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //  删除企业
  deleteAssociateEnterprises(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/deleteAssociateEnterprisesInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //  更新企业
  updateAssociateEnterprises(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/updateAssociateEnterprisesInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //  获取企业信息详情
  getAssociateEnterprisesDetail(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/getAssociateEnterprisesDetail?associateEnterprisesId=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //获取企业信息
  getAssociateEnterprises(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/getAssociateEnterprisesInfos?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 判重联营企业
  judgeAssociateEnterprises(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsAssociateEnterprisesInfo/getAssociateEnterprisesInfo?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
