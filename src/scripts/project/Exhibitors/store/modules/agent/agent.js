import { agentApi } from '../../../apis';

import settings from './settings';

// 下载管理模块
export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  actions: {
  // ----------审核企业展位申请-----------
    // 审核企业列表
    getReserveCompanyList({ commit }, param) {
      return agentApi.getReserveCompanyList(param);
    },
    //审核功能
    checkStateCompany({ commit }, param) {
      return agentApi.checkStateCompany(param);
    },
  // ----------首页-----------
    //证件审核进度
    getPapersPlan({ commit }, param) {
      return agentApi.getPapersPlan(param);
    }
  },
  mutations: {

  },
  modules: {
    settings
  }
};
