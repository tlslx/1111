import { informationBusinessApi } from '../../../apis';

export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  actions: {
  // ----------展品管理-----------
    // 获取列表数据
    getTableDataInformationBusiness({ commit }, param) {
      return informationBusinessApi.getTableDataInformationBusiness(param);
    },
    //审核展品
    checkExhibitionInformationBusiness({ commit }, param) {
      return informationBusinessApi.checkExhibitionInformationBusiness(param);
    },
  // ----------展品管理-----------
    // 审核展商动态
    checkExhibitionApplyInformationBusiness({ commit }, param) {
      return informationBusinessApi.checkExhibitionApplyInformationBusiness(param);
    }
  },
  mutations: {

  }
};
