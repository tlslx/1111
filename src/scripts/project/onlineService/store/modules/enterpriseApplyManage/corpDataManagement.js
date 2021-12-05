import { corpDataManagementApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    getreview: {},
    getbasic: {},
    getcompany: [],
    getBatchAuditImportInfo: [],
    getEnterImportCompany: [],
    getWorkImportCompany: [],
    importDocReviewProgress: [],
    getBrands: []
  },
  getters: {
    getreview: state => state.getreview,
    getbasic: state => state.getbasic,
    getcompany: state => state.getcompany,
    getBatchAuditImportInfo: state => state.getBatchAuditImportInfo,
    getEnterImportCompany: state => state.getEnterImportCompany,
    getWorkImportCompany: state => state.getWorkImportCompany,
    importDocReviewProgress: state => state.importDocReviewProgress,
    getBrands: state => state.getBrands
  },
  mutations: {
    GET_REVIEW(state, payload) {
      state.getreview = payload;
    },
    GET_BASIC(state, payload) {
      state.getbasic = payload;
    },
    GET_COMPANY(state, payload) {
      state.getcompany = payload;
    },
    GET_BATCH_AUDIT_IMPORT_INFO(state, payload) {
      state.getBatchAuditImportInfo = payload;
    },
    GET_ENTER_IMPORTCOMPANY(state, payload) {
      state.getEnterImportCompany = payload;
    },
    GET_WORK_IMPORTCOMPANY(state, payload) {
      state.getWorkImportCompany = payload;
    },
    GET_IMPORT_DOC_PREVIEW_PROGRESS(state, payload) {
      state.importDocReviewProgress = payload;
    },
    GET_BRANDS(state, payload) {
      state.getBrands = payload;
    }
  },
  actions: {
    // 审核修改重要资料
    getreviewCompanyImportInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        corpDataManagementApi.getreviewCompanyImport(params).then(res => {
          commit('GET_REVIEW', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量查询企业中文名称和企业简称的数据
    getBatchImportCompanyInfo({ commit }, param) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.selectCompanyNameAndAbbreviation(param);
        promises.then(res => {
          if (res && res.length > 0) {
            res.forEach((value, index) => {
              if (String(value.deleApproveResult) === 'null') {
                value.approveResult = '待审核';
              } else if (value.deleApproveResult === '1') {
                value.approveResult = '通过';
              } else if (value.deleApproveResult === '0') {
                value.approveResult = '不通过';
              } else {
                value.approveResult = '';
              }
              if (String(value.ifdeal) === 'null') {
                value.ifdeal = '待审核';
              } else if (value.ifdeal === '0') {
                value.ifdeal = '不通过';
              } else if (value.ifdeal === '1') {
                value.ifdeal = '通过';
              } else if (value.ifdeal === '2') {
                value.ifdeal = '交易团通过立即生效';
              } else {
                value.ifdeal = '';
              }
            });
            commit('GET_BATCH_AUDIT_IMPORT_INFO', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量审核企业中文名称和企业简称的数据
    batchAuditCompanyNameAndAbbreviation({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.updateCompanyNameAndAbbreviation(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团查询审核公司重要资料
    getEnterImportCompanyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.getEnterImportCompany(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index) => {
              if (String(value.deleApproveResult) === 'null') {
                value.approveResult = '待审核';
              } else if (value.deleApproveResult === '1') {
                value.approveResult = '通过';
              } else if (value.deleApproveResult === '0') {
                value.approveResult = '不通过';
              } else {
                value.approveResult = '';
              }
              if (String(value.ifdeal) === 'null') {
                value.ifdeal = '待审核';
              } else if (value.ifdeal === '0') {
                value.ifdeal = '不通过';
              } else if (value.ifdeal === '1') {
                value.ifdeal = '通过';
              } else if (value.ifdeal === '2') {
                value.ifdeal = '交易团通过立即生效';
              } else {
                value.ifdeal = '';
              }
            });
            commit('GET_ENTER_IMPORTCOMPANY', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查询审核公司重要资料
    getWorkImportCompanyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.getWorkImportCompany(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index) => {
              if (String(value.deleApproveResult) === 'null') {
                value.deleApproveResult = '未审核';
              } else if (value.deleApproveResult === '1') {
                value.deleApproveResult = '通过';
              } else if (value.deleApproveResult === '0') {
                value.deleApproveResult = '不通过';
              } else {
                value.deleApproveResult = '';
              }
              if (String(value.ifdeal) === 'null') {
                value.approveResult = '待审核';
              } else if (value.ifdeal === '0') {
                value.approveResult = '不通过';
              } else if (value.ifdeal === '1') {
                value.approveResult = '通过';
              } else if (value.ifdeal === '2') {
                value.approveResult = '交易团通过立即生效';
              } else {
                value.approveResult = '';
              }
            });
            commit('GET_WORK_IMPORTCOMPANY', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询审核企业列表
    getCompanyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.getCompany(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            commit('GET_COMPANY', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新企业基本信息
    reviewCompanyDocs({ commit }, params) {
      let currentObject = {};
      currentObject.updateCompanyInfoSession = [];
      // 处理部分checkbox-group的数据，将数组转成字符串
      let currentParams = JSON.parse(JSON.stringify(params));
      // 处理贸易形式
      currentParams.tradeForm = Array.isArray(currentParams.tradeForm) ? $helper.getValueString(currentParams.tradeForm, kindo.dictionary.get('tradeForm')) : currentParams.tradeForm;
      // 处理国际/行业通行（个) 管理体系认证的数量罗列
      currentParams.internationallytCertification = Array.isArray(currentParams.internationallytCertification) ? $helper.getValueString(currentParams.internationallytCertification, kindo.dictionary.get('manageQuantity')) : currentParams.internationallytCertification;
      // 处理面向企业的（个）行业认证数量罗列
      currentParams.industryCertification = Array.isArray(currentParams.industryCertification) ? $helper.getValueString(currentParams.industryCertification, kindo.dictionary.get('industryNum')) : currentParams.industryCertification;
      // 面向产品/生产线的（个）行业认证数量罗列
      currentParams.productCertification = Array.isArray(currentParams.productCertification) ? $helper.getValueString(currentParams.productCertification, kindo.dictionary.get('exhibitCert')) : currentParams.productCertification;
      // 处理参展目的
      currentParams.participationGoal = Array.isArray(currentParams.participationGoal) ? $helper.getValueString(currentParams.participationGoal, kindo.dictionary.get('participationGoal')) : currentParams.participationGoal;
      // 处理主要目标市场
      currentParams.mainTargetMarket = Array.isArray(currentParams.mainTargetMarket) ? $helper.getValueString(currentParams.mainTargetMarket, kindo.dictionary.get('mainMarket')) : currentParams.mainTargetMarket;
      // 处理主要目标客户类型
      currentParams.mainCustomersType = Array.isArray(currentParams.mainCustomersType) ? $helper.getValueString(currentParams.mainCustomersType, kindo.dictionary.get('mainType')) : currentParams.mainCustomersType;
      currentObject.updateCompanyInfoSession.push(currentParams);
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.updateCompanyInfo(currentObject);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业重要修改信息插入记录表
    modifyImportCompanyInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.modifyImportCompanyInfo(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业重要修改信息审核不通过的状态下直接更新
    modifyUnPassImportCompanyInfos({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.updateAuditResults(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核公司资料
    modifyCompanyInfos({ commit }, params) {
      let currentObject = {};
      currentObject.updateCompanyInfoSession = JSON.parse(JSON.stringify(params));
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.modifyCompanyInfo(currentObject);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 重要资料审核进度
    getImportantReviewProgress({ commit }, params) {
      let param = {
        "importCompanyInfoReviewProgressSession": {
          "companyId": params
        }
      };
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.selectImportCompanyInfoReviewProgress(utility.urlEncode(JSON.stringify(param)));
        promises.then(res => {
          commit('GET_IMPORT_DOC_PREVIEW_PROGRESS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询企业基本信息
    getBasicInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.getBasic(utility.urlEncode(params));
        promises.then(res => {
          if (res) {
            commit('GET_BASIC', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据公司ID查询品牌
    getBrandByCompanyID({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.selectBrandByCompanyId(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.length > 0) {
            res.forEach((value, index, array) => {
              value.sequence = index + 1;
              // value.imageUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.brandLogo;
              value.imageUrl = process.env.API_OS_URL + "/efOS/file/getLogoImg?fileId=" + value.brandLogo;
              value.ownBrandStatus = $helper.getDicText(this.state.dataDictionary.data.yesOrNo, value.ownBrandStatus);
              value.useBrandStatus = $helper.getDicText(this.state.dataDictionary.data.yesOrNo, value.useBrandStatus);
            });
          }
          commit('GET_BRANDS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加品牌
    addBrands({ commit }, params) {
      let temp = {};
      temp.addBrandSession = params;
      temp.addBrandSession.creatorId = this.getters.userInfo.userId ? this.getters.userInfo.userId : "";
      temp.addBrandSession.creatorName = this.getters.userInfo.userName ? this.getters.userInfo.userName : "";
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.addBrand(temp);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除品牌
    deleteBrands({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = corpDataManagementApi.deleteBrand(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};

