import { personalRegisterApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
// import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    getStatus: [],
    associatedCompanyUser: {
      id: null,
      data: [],
      summaryArray: []
    },
    applyForAssociationData: [],
    checkPersonalEmailInfo: []
  },
  getters: {
    getStatus: state => state.getStatus,
    associatedCompanyUser: state => state.associatedCompanyUser,
    applyForAssociationData: state => state.applyForAssociationData,
    checkPersonalEmailInfo: state => state.checkPersonalEmailInfo,
    getPersonalApply: state => state.getPersonalApply
  },
  mutations: {
    GET_STATUS(state, payload) {
      state.getStatus = payload;
    },
    ASSOCIATED_COMPANY_USER(state, payload) {
      state.associatedCompanyUser.data = JSON.parse(JSON.stringify(payload));
    },
    APPLY_ASSOCIATION_DATA(state, payload) {
      state.applyForAssociationData = payload;
    },
    CHECK_PERSONAL_EMAIL(state, payload) {
      state.checkPersonalEmailInfo = payload;
    },
    GET_REGIST_INFO(state, payload) {
      state.getRegistInfo = payload;
    },
    UPDATE_STATUS(state, payload) {
      state.updateStatus = payload;
    },
    GET_PERSONAL_APPLY(state, payload) {
      state.getPersonalApply = JSON.parse(JSON.stringify(payload));
    },
    GET_REGIST_INFO_BYMB(state, payload) {
      state.getRegistInfoByMb = JSON.parse(JSON.stringify(payload));
    }
  },
  actions: {
    // 个人用户注册
    personalRegistration({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.personalRegister(params).then(res => {
          commit('GET_STATUS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询关联公司用户
    queryAssociatedCompanyUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.queryCompanyUser(utility.urlEncode(JSON.stringify(params))).then(res => {
          // let dicData = JSON.parse(localStorage.getItem('dictData')).tradingGroup;
          // if (res.records && res.records.length > 0) {
          //   res.records.forEach((value, index) => {
          //     // 所属交易团
          //     let newBusiness = "";
          //     if (value.businessDelegationId) {
          //       newBusiness = $helper.getDicText(dicData, value.businessDelegationId);
          //     }
          //     value.businessDelegationId = newBusiness;
          //   });
          // }
          commit('ASSOCIATED_COMPANY_USER', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 申请关联
    applyForAssociationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.applyForAssociation(params).then(res => {
          commit('APPLY_ASSOCIATION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据邮箱去重
    checkPersonalInfoEmail({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.checkPersonalEmail(utility.urlEncode(JSON.stringify(params))).then(res => {
          commit('CHECK_PERSONAL_EMAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据邮箱获取用户信息
    companyAddSubAccountByEmailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.companyAddSubAccountByEmail(params).then(res => {
          commit('GET_REGIST_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据手机获取用户信息
    checkSubAccountMsgByPhoneInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.checkSubAccountMsgByPhone(params).then(res => {
          commit('GET_REGIST_INFO_BYMB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 若公司用户添加子账户根据邮箱有返回数据则更新状态
    updateStatusInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.updateStatus(params).then(res => {
          commit('UPDATE_STATUS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 个人查询已关联企业
    personalApplyAssociationOneInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        personalRegisterApi.personalApplyAssociationOne(utility.urlEncode(JSON.stringify(params))).then(res => {
          commit('GET_PERSONAL_APPLY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
