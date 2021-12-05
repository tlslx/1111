import { confirmEnterListApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    deleteVipEnterList: null
  },
  getters: {
    deleteVipEnterList: state => state.deleteVipEnterList
  },
  mutations: {
    DELETE_VIP_ENTER_LIST(state, payload) {
      state.deleteVipEnterList = payload;
    }
  },
  actions: {
    // 工作部删除vip企业信息(一键删除)
    deleteVIPEnterList({ commit }, params) {
      let str = '';
      params.forEach((value, index, array) => {
        str += index !== (params.length - 1) ? value.vipCompanyId + ',' : value.vipCompanyId;
      });
      let currentObject = {};
      currentObject.vipCompanyIds = str;
      return new Promise((resolve, reject) => {
        confirmEnterListApi.deleteVipCompanyInfos(currentObject).then(res => {
          commit('DELETE_VIP_ENTER_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
