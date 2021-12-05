import { vipEnterCertificateApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    addVipEnterInfo: null
  },
  getters: {
    addVipEnterInfo: state => state.addVipEnterInfo
  },
  mutations: {
    ADD_VIP_ENTER_INFO(state, payload) {
      state.addVipEnterInfo = payload;
    }
  },
  actions: {
    // 设置vip企业服务范围
    addVIPEnterCertificate({ commit }, params) {
      let currentObject = {};
      currentObject.vipContactInfo = Object.assign(params, {});
      currentObject.vipContactInfo.creatorId = this.getters.userInfo.userId;
      currentObject.vipContactInfo.creatorName = this.getters.userInfo.userName;
      return new Promise((resolve, reject) => {
        vipEnterCertificateApi.addVipContactInfo(currentObject).then(res => {
          commit('ADD_VIP_ENTER_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
