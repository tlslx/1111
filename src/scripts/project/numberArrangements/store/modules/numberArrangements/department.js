import { departmentApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getSepar: [],
    postAepar: [],
    postAcity: []
  },
  getters: {
    getSepar: state => state.getSepar,
    postAepar: state => state.postAepar,
    postAcity: state => state.postAcity
  },
  mutations: {
    REPORT_PBATA(state, payload) {
      state.postAcity = payload;
    },
    REPORT_AATA(state, payload) {
      state.getSepar = payload;
    },
    REPORT_BATA(state, payload) {
      state.postAepar = payload;
    }
  },
  actions: {
    // 公示意见汇总
    getSepartment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        departmentApi.getDepartment(obj).then(res => {
          commit('REPORT_AATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    postAepartment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        departmentApi.postDepartment(obj).then(res => {
          commit('REPORT_BATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 返回处理意见
    postDepartmentAcity({ commit }, obj) {
      return new Promise((resolve, reject) => {
        departmentApi.departmentAcity(obj).then(res => {
          commit('REPORT_PBATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }     
  }
};
