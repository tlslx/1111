import { enterpriseRegisterApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    getStatus: null,
    affcompanyadd: {},
    checkname: {},
    companyaddsub: {},
    affcompany: [],
    isagree: {},
    areacancel: {},
    asscompanyList: [],
    assiciationList: []
  },
  getters: {
    getStatus: state => state.getStatus,
    checkname: state => state.checkname,
    affcompany: state => state.affcompany,
    affcompanyadd: state => state.affcompanyadd,
    isagree: state => state.isagree,
    companyaddsub: state => state.companyaddsub,
    assiciationList: state => state.assiciationList,
    areacancel: state => state.areacancel,
    asscompanyList: state => state.asscompanyList
  },
  mutations: {
    GET_STATUS(state, payload) {
      state.getStatus = payload;
    },
    AFF_COMPANY(state, payload) {
      state.affcompany = payload;
    },
    ASSOCIATION_LIST(state, payload) {
      state.assiciationList = payload;
    },
    ASSOCIATION_COMPANY_LIST(state, payload) {
      state.asscompanyList = payload;
    },
    IS_AGREE(state, payload) {
      state.isagree = payload;
    },
    AFF_COMPANY_ADD(state, payload) {
      state.affcompanyadd = payload;
    },
    CHECK_NAME(state, payload) {
      state.checkname = payload;
    },
    COMPANY_ADD_SUB(state, payload) {
      state.companyaddsub = payload;
    },
    AREA_CANCEL(state, payload) {
      state.areacancel = payload;
    },
    POST_IS_AGREE(state, payload) {
      state.postIsAgree = payload;
    },
    GRANT_EXH_INFO(state, payload) {
      state.grantExh = payload;
    },
    GET_SINGLE(state, payload) {
      state.getSingle = payload;
    }
  },
  actions: {
    // 获取交易团和省市信息
    getDelegationAndProAndCityInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.getProvinceCity(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业统一注册代码是否重复
    checkCompanyInfoByBusinessLicenceNoInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.checkCompanyInfoByBusinessLicenceNo(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 用户注册（选择企业）
    enterpriseRegistration({ commit }, params) {
      let currentObject = {};
      currentObject.insertCompanyInfoSession = Object.assign(params, {}).insertCompanyInfoSession;
      currentObject.insertCompanyOtherInfoSession = Object.assign(params, {}).insertCompanyOtherInfoSession;
      currentObject.insertCompanyInfoSession.companyLocated = Object.assign(params, {}).insertCompanyInfoSession.provinces + Object.assign(params, {}).insertCompanyInfoSession.city;
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.enterpriseRegister(currentObject).then(res => {
          commit('GET_STATUS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 关联公司用户查询
    affiliateCompanyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterpriseRegisterApi.affiliateCompany(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              let newgender = '';
              if (value.gender) {
                newgender = $helper.getDicText(dicData.gender, value.gender);
              } else {
                newgender = '';
              }
              value.gender = newgender;
            });
          }
          commit('AFF_COMPANY', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公司注册名称判重
    checkCompanyInfoByNameInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterpriseRegisterApi.checkCompanyInfoByName(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('CHECK_NAME', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 个人用户申请关联列表
    personalApplyAssociationListInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterpriseRegisterApi.personalApplyAssociationList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              // 性别转换
              let newgender = '';
              if (value.gender) {
                newgender = $helper.getDicText(dicData.gender, value.gender);
              } else {
                newgender = '';
              }
              value.gender = newgender;
              // 职务转换
              let newpost = '';
              if (value.post) {
                newpost = $helper.getDicText(dicData.post, value.post);
              } else {
                newpost = '';
              }
              value.post = newpost;
            });
          }
          commit('ASSOCIATION_LIST', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业关联用户
    personalApplyAssociationListCompanyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterpriseRegisterApi.personalApplyAssociationListCompany(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              // 展区转换
              value.allowAreaT = value.allowArea;
              let newallowArea = [];
              if (value.allowArea) {
                newallowArea = value.allowArea.split(",");
                for (let i = 0; i < newallowArea.length; i++) {
                  newallowArea[i] = $helper.getDictLabel(kindo.dictionary.get('exhibitionArea'), newallowArea[i]);
                }
              } else {
                newallowArea = [];
              }
              value.allowArea = newallowArea.join(",");

              // 性别转换
              let newgender = '';
              if (value.gender) {
                newgender = $helper.getDicText(dicData.gender, value.gender);
              } else {
                newgender = '';
              }
              value.gender = newgender;
              // 职务转换
              let newpost = '';
              if (value.post) {
                newpost = $helper.getDicText(dicData.post, value.post);
              } else {
                newpost = '';
              }
              value.post = newpost;
            });
          }
          commit('ASSOCIATION_COMPANY_LIST', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 申请关联同意不同意、取消关联
    personalIsAgreeInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.personalIsAgree(params).then(res => {
          commit('IS_AGREE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 关联公司用户添加
    affiliateCompanyUserAddInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.affiliateCompanyUserAdd(params).then(res => {
          commit('AFF_COMPANY_ADD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公司用户添加子账户
    companyAddSubAccountInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.companyAddSubAccount(params).then(res => {
          commit('COMPANY_ADD_SUB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 移除关联、修改展区
    AllowAreaCancelInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.AllowAreaCancel(params).then(res => {
          commit('AREA_CANCEL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 解除关联
    postDeassociation({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.deassociation(params).then(res => {
          commit('POST_IS_AGREE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 授权展区
    grantExhInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.grantExh(params).then(res => {
          commit('GRANT_EXH_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询交易团信息
    getSingleByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterpriseRegisterApi.getSingleById(params).then(res => {
          commit('GET_SINGLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
