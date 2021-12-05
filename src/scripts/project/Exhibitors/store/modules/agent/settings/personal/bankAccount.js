/* eslint-disable no-shadow */
import { agentApi } from '@/scripts/project/Exhibitors/apis';

const state = {
  editable: false,
  bankAccount: {
    openBank: null,
    openAccount: null,
    openAddr: null,
    swifcode: null,
    exhibitionAgentId: null,
    agentCh: null
  },
  cacheform: {},
  // 填充可以为getters提供有效数据的信息
  loading: false
};

const getters = {
  // 加载
  loading: state => state.loading,
  bankAccount: state => state.bankAccount,
  editable: state => state.editable
};

const mutations = {
  CACHEFORM(state, payload) {
    state.cacheform = payload;
  },
  LOADING(state) {
    state.loading = true;
  },
  LOADED(state) {
    state.loading = false;
  },
  SAVE(state, payload) {
    state.bankAccount = payload;
  },
  EDIT(state, payload) {
    state.editable = payload;
    if (payload === false) {
      state.bankAccount = state.cacheform;
    }
  }
};

const actions = {
  getBankAccount({ commit }) {
    commit("LOADING");
    return agentApi
      .getBaseInfo()
      .then(res => {
        commit("LOADED");
        commit("SAVE", res);
        commit("CACHEFORM", { ...res });
      })
      .catch(err => {
        commit("LOADED");
        throw err;
      });
  },
  saveBankAccount({ commit, state }) {
    commit("LOADING");
    return agentApi
      .updateBaseInfo(state.bankAccount)
      .then(res => {
        commit("LOADED");
        commit("CACHEFORM", { ...state.cacheform, ...state.bankAccount });
        commit("EDIT", false);
      })
      .catch(err => {
        commit("LOADED");
        throw err;
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
