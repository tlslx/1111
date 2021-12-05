import { JointVentureManagementApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getInfo: [],
    getPro: [],
    getStatus: {},
    getopinion: {},
    addPro: {},
    deletePro: {},
    updatePro: {},
    getCom: {},
    updatePros: {},
    judgeInfo: {}
  },
  getters: {
    getInfo: state => state.getInfo,
    getPro: state => state.getPro,
    getStatus: state => state.getStatus,
    addPro: state => state.addPro,
    getCom: state => state.getCom,
    deletePro: state => state.deletePro,
    updatePro: state => state.updatePro,
    updatePros: state => state.updatePros,
    getopinion: state => state.getopinion,
    judgeInfo: state => state.judgeInfo
  },
  mutations: {
    GET_INFO(state, payload) {
      state.getInfo = payload;
    },
    GET_PRODUCT(state, payload) {
      state.getPro = payload;
    },
    GET_STATUS(state, payload) {
      state.getStatus = payload;
    },
    ADD_PRODUCT(state, payload) {
      state.addPro = payload;
    },
    DELETE_PRODUCT(state, payload) {
      state.deletePro = payload;
    },
    UPDATE_PRODUCT(state, payload) {
      state.updatePro = payload;
    },
    UPDATE_PRODUCTS(state, payload) {
      state.updatePros = payload;
    },
    GET_COMPANY(state, payload) {
      state.getCom = payload;
    },
    GET_OPTION(state, payload) {
      state.getopinion = payload;
    },
    JUDGE_INFO(state, payload) {
      state.judgeInfo = payload;
    }
  },
  actions: {
    // 审核企业
    approveAssociateEnterprisesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        JointVentureManagementApi.approveAssociateEnterprises(params).then(res => {
          commit('GET_OPTION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增企业
    addAssociateEnterprisesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        JointVentureManagementApi.addAssociateEnterprises(params).then(res => {
          commit('ADD_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除企业
    deleteAssociateEnterprisesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        JointVentureManagementApi.deleteAssociateEnterprises(params).then(res => {
          commit('DELETE_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新企业
    updateAssociateEnterprisesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        JointVentureManagementApi.updateAssociateEnterprises(params).then(res => {
          commit('UPDATE_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //  获取企业信息详情
    getAssociateEnterprisesDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        JointVentureManagementApi.getAssociateEnterprisesDetail(params).then(res => {
          commit('UPDATE_PRODUCTS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取企业信息
    getAssociateEnterprisesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = JointVentureManagementApi.getAssociateEnterprises(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            commit('GET_INFO', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 判重联营企业
    judgeAssociateEnterprisesInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = JointVentureManagementApi.judgeAssociateEnterprises(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('JUDGE_INFO', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};

