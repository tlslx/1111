import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 审核修改重要资料
  getreviewCompanyImport(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/reviewCompanyImportInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量查询企业中文名称和企业简称数据
  selectCompanyNameAndAbbreviation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/selectCompanyNameAndAbbreviation?createDate=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量审核企业中文名称和企业简称数据
  updateCompanyNameAndAbbreviation(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/updateCompanyNameAndAbbreviation', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团查询审核公司重要资料
  getEnterImportCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/getImportCompanyInfoReviewProgress?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查询审核公司重要资料
  getWorkImportCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/getImportCompanyInfoReviewProgressSelect?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 重要资料审核进度
  selectImportCompanyInfoReviewProgress(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/selectImportCompanyInfoReviewProgress?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询审核企业列表
  getCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/reviewCompanyInfo?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新企业基本信息
  updateCompanyInfo(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/updateCompanyInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核公司资料
  modifyCompanyInfo(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/modifyCompanyInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业重要修改信息插入记录表
  modifyImportCompanyInfo(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/modifyImportCompanyInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核不通过后直接更新
  updateAuditResults(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyInfo/updateAuditResults', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询企业基本信息
  getBasic(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyInfo/getCompanyInfo?companyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据公司ID查询品牌
  selectBrandByCompanyId(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCompanyBrand/selectBrandByCompanyId?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加品牌
  addBrand(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyBrand/addBrand', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除品牌
  deleteBrand(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCompanyBrand/deleteBrand', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
