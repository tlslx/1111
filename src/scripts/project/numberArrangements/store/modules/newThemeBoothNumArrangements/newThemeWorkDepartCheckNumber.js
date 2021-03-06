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
    // ???????????????????????????????????????
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
    // ????????????????????????
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
    // ????????????????????????
    postcheckCompanyBaseInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postcheckCompanyBaseInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
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
    // ????????????????????????
    postcheckCompanyProduct({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postcheckCompanyProductData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/???????????????????????????????????????????????????
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
    // ?????????/?????????????????????????????????????????????
    postcheckDomesticSales({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postcheckDomesticSalesData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
    postCheckCustomsCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckCustomsCodeData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/??????????????????????????????????????????????????????
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
    // ?????????/????????????????????????????????????????????????
    postCheckTradeMarkRegistOut({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckTradeMarkRegistOutData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/????????????????????????????????????????????????
    postCheckTradeMarkRegistIn({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckTradeMarkRegistInData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/??????????????????????????????????????????
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
    // ?????????/??????????????????????????????????????????
    postCheckInnovateProperty({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckInnovatePropertyData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/???????????????????????????????????????????????????
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
    // ?????????/???????????????????????????????????????????????????
    postCheckPropertyStandard({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckPropertyStandardData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/????????????????????????????????????????????????
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
    // ?????????/????????????????????????????????????????????????
    postCheckIntelPassCertified({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckIntelPassCertifiedData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/?????????????????????????????????????????????
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
    // ?????????/?????????????????????????????????????????????
    postCheckAssistanceProject({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckAssistanceProjectData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????/??????????????????????????????????????????
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
    // ?????????/??????????????????????????????????????????
    postCheckActorProject({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckActorProjectData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
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
    // ??????????????????
    postCheckEnterpriseLegal({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckEnterpriseLegalData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
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
    // ??????????????????????????????
    postCheckForeignCertificate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckForeignCertificateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
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
    // ??????????????????
    postCheckProductBrief({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckProductBriefData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????????????????
    postCheckBoothUsedByWorkDepart({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postCheckBoothUsedByWorkDepartData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????????????????
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
    // ????????????????????????????????????????????????
    postAptitudeCheckByWorkDepartmentAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postAptitudeCheckByWorkDepartmentAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????
    postAptitudeCheckByWorkDepartmentUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        newThemeWorkDepartCheckNumberApi.postAptitudeCheckByWorkDepartmentUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
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
    // ?????????????????????
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
