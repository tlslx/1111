import { $req } from '../../../utils';
// import { $reqUtil } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 获取企业基本信息
  getCompanyInformation(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/manageCompanyInformation/get', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业信息修改
  update(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/manageCompanyInformation/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看企业信息修改记录
  getCompanyUpdateHistory(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/manageCompanyInformation/getCompanyUpdateHistory?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看企业信息修改记录详情
  getCompanyUpdateHistoryDetail(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/manageCompanyInformation/getCompanyUpdateHistoryDetail?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除多选文件
  removeCpFileLk(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/manageCompanyInformation/removeCpFileLk?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 目标客户下拉框
  targetConstomSelect() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/dataDictItem/findDicItemListByIfoCoExTarget').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // agent 企业列表
  companyList(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/manageCompanyInformation/getCompanyList', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
