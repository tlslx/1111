import { registerConstructionCompanyApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    registerData: []
  },
  getters: {
    // 施工企业注册
    registerData: state => state.registerData
  },
  mutations: {
    // 施工企业注册
    REGISTER_DATA(state, payload) {
      state.registerData = payload;
    }
  },
  actions: {
    // 施工企业注册
    registerConstructionCompany({ commit }, params) {
      return new Promise((resolve, reject) => {
        registerConstructionCompanyApi
          .registerConstructionCompany(params)
          .then(res => {
            commit("REGISTER_DATA", res);
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
