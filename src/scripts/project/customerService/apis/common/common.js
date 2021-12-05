import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
const IMPORT_URL = process.env.API_SN_URL;
const COMMONS_URL = process.env.API_COMS_URL;
export default {
  // 模拟届数
  getSession() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getSession').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团字典数据
  getDelegationData() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/comment/getBusinessDelegation').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团字典数据-common
  getSysDepartment(params) {
    return new Promise((resolve, reject) => {
      $req.get(COMMONS_URL + '/api/sysDepartment/search?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所属交易团code
  getDelegationCode(companyId) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/comment/getBusinessDelegationCode?companyId=' + companyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取参展期限
  getProgressTime(params) {
    let queryParams = 'exhibitionNum=' + params.exhibitionNum + '&subKey=' + params.subKey + '&companyId=' + params.companyId;
    if (params.hasOwnProperty('area')) {
      queryParams += '&area=' + params.area;
    }
    return new Promise((resolve, reject) => {
      $req.get(IMPORT_URL + '/api/ot/progress/extra/getRuleInfo?' + queryParams).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
