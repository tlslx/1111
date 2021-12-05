import { newThemeWorkDepartCheckNumberApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    boothUseCheckData: {},
    aptitudeCheckData: {},
    companyBaseInfoData: {},
    oneDemandData: {},
    domesticSales: {},
    tradeMarkRegistOut: [],
    innovateProperty: [],
    propertyStandard: [],
    intelPassCertified: [],
    assistanceProject: [],
    actorProject: [],
    fileData: {},
    enterpriseLegal: {},
    foreignCertificate: {},
    productBrief: {}
  },
  getters: {
    boothUseCheckData: state => state.boothUseCheckData,
    aptitudeCheckData: state => state.aptitudeCheckData,
    companyBaseInfoData: state => state.companyBaseInfoData,
    oneDemandData: state => state.oneDemandData,
    domesticSales: state => state.domesticSales,
    tradeMarkRegistOut: state => state.tradeMarkRegistOut,
    innovateProperty: state => state.innovateProperty,
    propertyStandard: state => state.propertyStandard,
    intelPassCertified: state => state.intelPassCertified,
    assistanceProject: state => state.assistanceProject,
    actorProject: state => state.actorProject,
    fileData: state => state.fileData,
    enterpriseLegal: state => state.enterpriseLegal,
    foreignCertificate: state => state.foreignCertificate,
    productBrief: state => state.productBrief
  },
  mutations: {
    BOOTH_USE_CHECK_DATA(state, payload) {
      state.boothUseCheckData = payload;
    },
    APTITUDE_CHECK_DATA(state, payload) {
      state.aptitudeCheckData = payload;
    },
    COMPANY_BASE_INFO_DATA(state, payload) {
      state.companyBaseInfoData = payload;
    },
    ONE_DEMAND_DATA(state, payload) {
      state.oneDemandData = payload;
    },
    DOMESTIC_SALES(state, payload) {
      state.domesticSales = payload;
    },
    TRADE_MARK_REGIST_OUT(state, payload) {
      state.tradeMarkRegistOut = payload;
    },
    INNOVATE_PROPERTY(state, payload) {
      state.innovateProperty = payload;
    },
    PROPERTY_STANDARD(state, payload) {
      state.propertyStandard = payload;
    },
    INTEL_PASS_CERTIFIED(state, payload) {
      state.intelPassCertified = payload;
    },
    ASSISTANCE_PROJECT(state, payload) {
      state.assistanceProject = payload;
    },
    ACTOR_PROJECT(state, payload) {
      state.actorProject = payload;
    },
    FILE_DATA(state, payload) {
      state.fileData = payload;
    },
    ENTERPRISE_LEGAL(state, payload) {
      state.enterpriseLegal = payload;
    },
    FOREIGN_CERTIFICATE(state, payload) {
      state.foreignCertificate = payload;
    },
    PRODUCT_BRIEF(state, payload) {
      state.productBrief = payload;
    }
  },
  actions: {
    // 工作部审核展位使用条件列表
    getBoothUseCheckByWork({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getBoothUseCheckByWorkData(Object).then(res => {
          commit('BOOTH_USE_CHECK_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取企业基本信息
    getCompanyBaseInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getCompanyBaseInfoData(Object).then(res => {
          commit('COMPANY_BASE_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业基本信息审核
    postcheckCompanyBaseInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postcheckCompanyBaseInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取单条企业展位申请信息
    getOneDemand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getOneDemandData(Object).then(res => {
          commit('ONE_DEMAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业展品信息审核
    postcheckCompanyProduct({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postcheckCompanyProductData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部审核国内销售额列表（新题材）
    getDomesticSales({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getDomesticSalesData(Object).then(res => {
          let list = [];
          for (let i = 0, l = res.length; i < l; i++) {
            if (res[i].insideSale !== '') {
              list.push(res[i]);
            }
          }
          res.list = list;
          commit('DOMESTIC_SALES', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部审核国内销售额（新题材）
    postcheckDomesticSales({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postcheckDomesticSalesData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部海关编码审核（新题材）
    postCheckCustomsCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckCustomsCodeData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部境外注册商标审核列表（新题材）
    getTradeMarkRegistOut({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getTradeMarkRegistOutData(Object).then(res => {
          commit('TRADE_MARK_REGIST_OUT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部境外注册商标审核（新题材）
    postCheckTradeMarkRegistOut({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckTradeMarkRegistOutData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部境内注册商标审核（新题材）
    postCheckTradeMarkRegistIn({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckTradeMarkRegistInData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部专利版权列表（新题材）
    getInnovateProperty({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getInnovatePropertyData(Object).then(res => {
          let listOne = [];
          let listTwo = [];
          for (let i = 0, l = res.length; i < l; i++) {
            if (res[i].category === '03') {
              listOne.push(res[i]);
            } else if (res[i].category === '01') {
              listTwo.push(res[i]);
            }
          }
          res.countrySkill = listOne;
          res.innovateProve = listTwo;
          commit('INNOVATE_PROPERTY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部专利版权审核（新题材）
    postCheckInnovateProperty({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckInnovatePropertyData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部国家或行业标准列表（新题材）
    getPropertyStandard({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getPropertyStandardData(Object).then(res => {
          commit('PROPERTY_STANDARD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部国家或行业标准审核（新题材）
    postCheckPropertyStandard({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckPropertyStandardData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部国际通行认证列表（新题材）
    getIntelPassCertified({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getIntelPassCertifiedData(Object).then(res => {
          commit('INTEL_PASS_CERTIFIED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部国际通行认证审核（新题材）
    postCheckIntelPassCertified({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckIntelPassCertifiedData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部国际专业展列表（新题材）
    getAssistanceProject({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getAssistanceProjectData(Object).then(res => {
          commit('ASSISTANCE_PROJECT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部国际专业展审核（新题材）
    postCheckAssistanceProject({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckAssistanceProjectData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部援助项目列表（新题材）
    getActorProject({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getActorProjectData(Object).then(res => {
          commit('ACTOR_PROJECT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团/工作部援助项目审核（新题材）
    postCheckActorProject({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckActorProjectData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 营业执照列表
    getEnterpriseLegal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getEnterpriseLegalData(Object).then(res => {
          let list = [];
          for (let i = 0, l = res.length; i < l; i++) {
            if (res[i].enterpriseLegalId !== '') {
              list.push(res[i]);
            }
          }
          res.list = list;
          commit('ENTERPRISE_LEGAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 营业执照审核
    postCheckEnterpriseLegal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckEnterpriseLegalData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸经营资质证明列表
    getForeignCertificate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getForeignCertificateData(Object).then(res => {
          let list = [];
          for (let i = 0, l = res.length; i < l; i++) {
            if (res[i].certificateId !== '') {
              list.push(res[i]);
            }
          }
          res.list = list;
          commit('FOREIGN_CERTIFICATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸经营资质证明审核
    postCheckForeignCertificate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckForeignCertificateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 产品简介列表
    getProductBrief({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getProductBriefData(Object).then(res => {
          let list = [];
          for (let i = 0, l = res.length; i < l; i++) {
            if (res[i].productBriefId !== '') {
              list.push(res[i]);
            }
          }
          res.list = list;
          commit('PRODUCT_BRIEF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 产品简介审核
    postCheckProductBrief({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckProductBriefData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部审核是否符合展位使用条件（新题材）
    postCheckBoothUsedByWorkDepart({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckBoothUsedByWorkDepartData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部资质复核列表（新题材）
    getAptitudeCheckByWorkDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getAptitudeCheckByWorkDepartmentData(Object).then(res => {
          commit('APTITUDE_CHECK_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部存入资质复核信息（新题材）
    postAptitudeCheckByWorkDepartmentAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postAptitudeCheckByWorkDepartmentAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部编辑资质复核信息（新题材）
    postAptitudeCheckByWorkDepartmentUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postAptitudeCheckByWorkDepartmentUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取附件图片
    getFile({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.getFileData(Object).then(res => {
          commit('FILE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部复核上传
    postDepartCheckFileUpload({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postDepartCheckFileUploadData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
