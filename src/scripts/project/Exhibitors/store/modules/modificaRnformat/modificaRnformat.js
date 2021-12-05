import { modificaRnformatApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    // 查看审核企业重要信息修改列表
    getEnterpModifica: {},
    // 查看重要信息修改详情
    getViewModDetail: {},
    // 审核重要修改信息
    postRmportant: {},
    // 企业列表查询
    getEnterpQuery: {},
    // 获取所有招展代理
    getRectdAgent: {},
    // 查看展品列表
    getViewExhit: {}
  },
  getters: {
    // 查看审核企业重要信息修改列表
    getEnterpModifica: state => state.getEnterpModifica,
    // 查看重要信息修改详情
    getViewModDetail: state => state.getViewModDetail,
    // 审核重要修改信息
    postRmportant: state => state.postRmportant,
    // 企业列表查询
    getEnterpQuery: state => state.getEnterpQuery,
    // 获取所有招展代理
    getRectdAgent: state => state.getRectdAgent,
    // 查看展品列表
    getViewExhit: state => state.getViewExhit
  },
  mutations: {
    // 查看审核企业重要信息修改列表
    GET_ENTERPRISE_MODIFICA(state, payload) {
      state.getEnterpModifica = payload;
    },
    // 查看重要信息修改详情
    GET_ENTERPRISE_DETAIL(state, payload) {
      state.getViewModDetail = payload;
    },
    // 审核重要修改信息
    POST_ENTERPRISE_RMPORTANT(state, payload) {
      state.postRmportant = payload;
    },
    // 企业列表查询
    GET_ENTERPRISE_QUERY(state, payload) {
      state.getEnterpQuery = payload;
    },
    // 获取所有招展代理
    GET_ENTERPRISE_AGENTS(state, payload) {
      state.getRectdAgent = payload;
    },
    // 查看展品列表
    GET_VIEW_EXHILIST(state, payload) {
      state.getViewExhit = payload;
    }
  },
  actions: {
    // 查看审核企业重要信息修改列表
    getEnterpriseRnformaModifica({ commit }, Object) {
      return new Promise((resolve, reject) => {
        modificaRnformatApi.enterpriseRnformaModifica(Object).then(res => {
          commit('GET_ENTERPRISE_MODIFICA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看重要信息修改详情
    getViewModificaDetail({ commit }, Object) {
      return new Promise((resolve, reject) => {
        modificaRnformatApi.viewModificaDetail(Object).then(res => {
          commit('GET_ENTERPRISE_DETAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核重要修改信息
    postReviewRmportant({ commit }, Object) {
      return new Promise((resolve, reject) => {
        modificaRnformatApi.ieviewRmportant(Object).then(res => {
          commit('POST_ENTERPRISE_RMPORTANT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业列表查询
    getEnterpriseQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        modificaRnformatApi.enterpriseQuery(Object).then(res => {
          commit('GET_ENTERPRISE_QUERY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有招展代理
    getRecruitAgents({ commit }, Object) {
      return new Promise((resolve, reject) => {
        modificaRnformatApi.recruitAgents(Object).then(res => {
          commit('GET_ENTERPRISE_AGENTS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看展品列表
    getViewExhitList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        modificaRnformatApi.viewExhitList(Object).then(res => {
          commit('GET_VIEW_EXHILIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
