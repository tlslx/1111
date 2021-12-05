import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 工作部审核展位使用条件列表
  getBoothUseCheckByWorkData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/boothUseCheckByWorkDepartment`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取企业基本信息
  getCompanyBaseInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/companyBaseInfo/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业基本信息审核
  postcheckCompanyBaseInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/check`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取单条企业展位申请信息
  getOneDemandData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/getOneDemand`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业展品信息审核
  postcheckCompanyProductData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/checkCompanyProduct`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部审核国内销售额列表（新题材）
  getDomesticSalesData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkDomesticSalesList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部审核国内销售额（新题材）
  postcheckDomesticSalesData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkDomesticSales`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部海关编码审核（新题材）
  postCheckCustomsCodeData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkCustomsCode`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部境外注册商标审核列表（新题材）
  getTradeMarkRegistOutData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkTradeMarkRegistOutList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部境外注册商标审核（新题材）
  postCheckTradeMarkRegistOutData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkTradeMarkRegistOut`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部境内注册商标审核（新题材）
  postCheckTradeMarkRegistInData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkTradeMarkRegistIn`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部专利版权列表（新题材）
  getInnovatePropertyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkInnovatePropertyList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部专利版权审核（新题材）
  postCheckInnovatePropertyData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkInnovateProperty`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部国家或行业标准列表（新题材）
  getPropertyStandardData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkPropertyStandardList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部国家或行业标准审核（新题材）
  postCheckPropertyStandardData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkPropertyStandard`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部国际通行认证列表（新题材）
  getIntelPassCertifiedData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkIntelPassCertifiedList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部国际通行认证审核（新题材）
  postCheckIntelPassCertifiedData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkIntelPassCertified`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部国际专业展列表（新题材）
  getAssistanceProjectData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkAssistanceProjectList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部国际专业展审核（新题材）
  postCheckAssistanceProjectData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkAssistanceProject`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部援助项目列表（新题材）
  getActorProjectData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkActorProjectList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部援助项目审核（新题材）
  postCheckActorProjectData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkActorProject`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 营业执照列表
  getEnterpriseLegalData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkEnterpriseLegalList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 营业执照审核
  postCheckEnterpriseLegalData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkEnterpriseLegal`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸经营资质证明列表
  getForeignCertificateData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkForeignCertificateList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸经营资质证明审核
  postCheckForeignCertificateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkForeignCertificate`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 产品简介列表
  getProductBriefData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkProductBriefList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 产品简介审核
  postCheckProductBriefData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/checkProductBrief`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部审核是否符合展位使用条件（新题材）
  postCheckBoothUsedByWorkDepartData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/boothUseCheckByWorkDepartment/post`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部资质复核列表（新题材）
  getAptitudeCheckByWorkDepartmentData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/aptitudeCheckByWorkDepartment/getList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部存入资质复核信息（新题材）
  postAptitudeCheckByWorkDepartmentAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/aptitudeCheckByWorkDepartment/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部编辑资质复核信息（新题材）
  postAptitudeCheckByWorkDepartmentUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/aptitudeCheckByWorkDepartment/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取附件图片
  getFileData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/file/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部复核上传
  postDepartCheckFileUploadData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/aptitudeCheckByWorkDepartment/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
