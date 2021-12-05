import { recomVipEnterListApi } from '../../../apis';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    recommendVipEnter: null
  },
  getters: {
    recommendVipEnter: state => state.recommendVipEnter
  },
  mutations: {
    RECOMMEND_VIP_ENTER(state, payload) {
      state.recommendVipEnter = payload;
    }
  },
  actions: {
    // 推荐VIP企业信息
    recommendVipEnterInfo({ commit }, params) {
      let currentParams = JSON.parse(JSON.stringify(params));
      if (currentParams.efOsVipCompanyInfos.length > 0) {
        currentParams.efOsVipCompanyInfos.forEach((value, index, array) => {
          value.creatorId = this.getters.userInfo.userId;
          value.creatorName = this.getters.userInfo.userName;
          value.exhibitionArea = $helper.getDicCode(this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
          value.businessAssociation = $helper.getDicCode(this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
          value.businessDelegation = $helper.getDicCode(this.state.dictionary.osDictionaryData.businessDelegation, value.businessDelegation);
          if (value.recommendStatus === '未推荐') {
            value.recommendStatus = '01';
          } else {
            value.recommendStatus = '02';
          }
        });
      }
      return new Promise((resolve, reject) => {
        recomVipEnterListApi.updateVipCompanyInfos(currentParams).then(res => {
          commit('RECOMMEND_VIP_ENTER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
