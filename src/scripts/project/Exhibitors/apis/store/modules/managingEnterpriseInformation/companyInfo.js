import { companyInfoApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getComInfo: []
  },
  getters: {
    getComInfo: state => state.getComInfo

  },
  mutations: {
    GET_COMINFO(state, payload) {
      state.getComInfo = payload;
    },
    UPDATE(state, payload) {
      state.update = payload;
    },
    GET_COMPANY(state, payload) {
      state.getCompany = payload;
    },
    GET_COMPANYDETAIL(state, payload) {
      state.getCompanyDetail = payload;
    },
    REMOVE_CPFILE(state, payload) {
      state.removeCpFile = payload;
    }
  },
  actions: {

    // 获取企业基本信息
    getCompanyInformationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.getCompanyInformation(params);
        promises.then(res => {
          commit('GET_COMINFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业信息修改
    updateInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.update(params);
        promises.then(res => {
          commit('UPDATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业信息修改记录
    getCompanyUpdateHistoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.getCompanyUpdateHistory(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_COMPANY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业信息修改记录详情
    getCompanyUpdateHistoryDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.getCompanyUpdateHistoryDetail(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_COMPANYDETAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除多选文件
    removeCpFileLkInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.removeCpFileLk(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('REMOVE_CPFILE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
