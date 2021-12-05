import { reviewVipEnterListApi } from '../../../apis';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    reviewVipEnter: null,
    approveDateInfo: {}
  },
  getters: {
    reviewVipEnter: state => state.reviewVipEnter,
    approveDateInfo: state => state.approveDateInfo
  },
  mutations: {
    REVIEW_VIP_ENTER(state, payload) {
      state.reviewVipEnter = payload;
    },
    APPROVE_DATE_INFO(state, payload) {
      state.approveDateInfo = payload;
    }
  },
  actions: {
    // 审核通过VIP企业信息
    reviewVipEnterInfo({ commit }, params) {
      let currentParams = JSON.parse(JSON.stringify(params));
      if (currentParams.efOsVipCompanyInfos.length > 0) {
        currentParams.efOsVipCompanyInfos.forEach((value, index, array) => {
          value.creatorId = this.getters.userInfo.userId;
          value.creatorName = this.getters.userInfo.userName;
          value.exhibitionArea = $helper.getDicCode(this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
          value.businessAssociation = $helper.getDicCode(this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
          value.businessDelegation = $helper.getDicCode(this.state.dictionary.osDictionaryData.businessDelegation, value.businessDelegation);
        });
      }
      return new Promise((resolve, reject) => {
        reviewVipEnterListApi.approveVipCompanyInfos(currentParams).then(res => {
          commit('REVIEW_VIP_ENTER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取商协会审核时间
    getApproveDateInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        reviewVipEnterListApi.getApproveDate(params).then(res => {
          commit('APPROVE_DATE_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
