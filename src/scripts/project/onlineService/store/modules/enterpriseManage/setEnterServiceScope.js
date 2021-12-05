import { setEnterServiceScopeApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    addServiceScope: null,
    vipEnterServiceScopes: {},
    vipEnterCertifiIndicators: [],
    setSingleVipEnter: null,
    setVipEnter: null
  },
  getters: {
    addServiceScope: state => state.addServiceScope,
    vipEnterServiceScopes: state => state.vipEnterServiceScopes,
    vipEnterCertifiIndicators: state => state.vipEnterCertifiIndicators,
    setSingleVipEnter: state => state.setSingleVipEnter,
    setVipEnter: state => state.setVipEnter
  },
  mutations: {
    ADD_VIP_ENTER_SERVICE_SCOPE(state, payload) {
      state.addServiceScope = payload;
    },
    VIP_ENTER_SERVICE_SCOPE(state, payload) {
      state.vipEnterServiceScopes = payload;
    },
    VIP_ENTER_CERTIFI_INDICATORS(state, payload) {
      state.vipEnterCertifiIndicators = payload;
    },
    SET_SINGLE_VIP_ENTER(state, payload) {
      state.setSingleVipEnter = payload;
    },
    SET_VIP_ENTER(state, payload) {
      state.setVipEnter = payload;
    }
  },
  actions: {
    // 设置vip企业服务范围
    addVIPEnterServiceScope({ commit }, params) {
      params.creatorId = this.getters.userInfo.userId;
      params.creatorName = this.getters.userInfo.userName;
      return new Promise((resolve, reject) => {
        setEnterServiceScopeApi.addVipCompanyService(params).then(res => {
          commit('ADD_VIP_ENTER_SERVICE_SCOPE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看vip企业服务范围
    selectVIPEnterServiceScope({ commit }, session) {
      return new Promise((resolve, reject) => {
        setEnterServiceScopeApi.getVipCompanyService(session).then(res => {
          commit('VIP_ENTER_SERVICE_SCOPE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取vip企业证件标准列表
    getVIPEnterCertifiIndicators({ commit }, params) {
      return new Promise((resolve, reject) => {
        setEnterServiceScopeApi.getVipCertificateList(utility.urlEncode(JSON.stringify(params))).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('VIP_ENTER_CERTIFI_INDICATORS', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 设置单个vip企业证件标准
    setSingleVipEnterCertifi({ commit }, params) {
      params.creatorId = this.getters.userInfo.userId;
      params.creatorName = this.getters.userInfo.userName;
      for (let key in params) {
        if (key === 'exhibitionCert' || key === 'rebackExhibitionCert' || key === 'receptionCert' || key === 'parkingCert') {
          if (params[key] === '') {
            params[key] = '0';
          }
        }
        if (key === 'modifyDate') {
          params[key] = null;
        }
      }
      return new Promise((resolve, reject) => {
        setEnterServiceScopeApi.updateVipCertificate(params).then(res => {
          commit('SET_SINGLE_VIP_ENTER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 设置VIP企业证件指标
    setVipEnterCertificateIndicators({ commit }, params) {
      for (let key in params) {
        if (key !== 'session') {
          if (params[key] === '') {
            params[key] = '0';
          }
        }
        if (key === 'modifyDate') {
          params[key] = null;
        }
      }
      return new Promise((resolve, reject) => {
        setEnterServiceScopeApi.updateVipCertificateIndexs(params).then(res => {
          commit('SET_VIP_ENTER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
