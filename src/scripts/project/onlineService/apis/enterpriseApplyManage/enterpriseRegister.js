import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
const API_DICT_URL = process.env.API_DICT_URL;
export default {
  // 查看企业统一社会信用代码是否重复
  checkCompanyInfoByBusinessLicenceNo(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/checkCompanyInfoByBusinessLicenceNo?businessLicenceNo=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团和省市信息
  getProvinceCity(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/comment/getProvinceCity?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 用户注册（选择企业）
  enterpriseRegister(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/insertCompanyInfo', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 关联公司用户添加
  affiliateCompanyUserAdd(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/affiliateCompanyUserAdd', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 关联公司用户查询
  affiliateCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/affiliateCompanyUserQuery?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 公司注册名称判重
  checkCompanyInfoByName(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/checkCompanyInfoByName?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看企业关联用户
  personalApplyAssociationListCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationListCompany?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 个人用户申请关联列表
  personalApplyAssociationList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationList?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 申请关联同意不同意、取消关联
  personalIsAgree(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationIsAgree', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 公司用户添加子账户
  companyAddSubAccount(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/companyAddSubAccount', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 移除关联、修改展区
  AllowAreaCancel(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationAllowAreaCancel', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 解除关联
  deassociation(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationIsUnbind', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 授权展区
  grantExh(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/personalApplyAssociationAllowAreaCancel', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团信息
  getSingleById(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_DICT_URL + '/api/sysDepartment/getSingleById?id=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
