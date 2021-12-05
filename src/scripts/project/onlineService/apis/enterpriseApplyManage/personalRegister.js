import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 申请与公司用户关联
  personalRegister(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsSubAccountInfo/insertPersonalInfo', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 申请关联公司用户查询
  queryCompanyUser(data) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsSubAccountInfo/applyRelatedCompanyInquiry?param=' + data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 申请关联
  applyForAssociation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsSubAccountInfo/applyRelatedCompanyInquiry', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据邮箱去重
  checkPersonalEmail(data) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsSubAccountInfo/checkPersonalInfoByEmail?param=' + data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据邮箱获取用户信息
  companyAddSubAccountByEmail(data) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsSubAccountInfo/companyAddSubAccountByEmail?email=' + data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据手机获取用户信息
  checkSubAccountMsgByPhone(data) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsSubAccountInfo/checkSubAccountMsgByPhone?param=' + data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 若公司用户添加子账户根据邮箱有返回数据则更新状态
  updateStatus(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsSubAccountInfo/updateStatus', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 个人查询已关联企业
  personalApplyAssociationOne(data) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationOne?param=' + data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
