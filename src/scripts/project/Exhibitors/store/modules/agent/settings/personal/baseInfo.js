/* eslint-disable no-shadow */
import { agentApi } from "@/scripts/project/Exhibitors/apis";

const state = {
  editable: false,
  baseInfo: {
    city: null,
    address: null,
    postalCode: null,
    url: null,
    orgType: null,
    agentShort: null,
    licenseNo: null,
    taxNo: null,
    agentIntroduce: null,
    exhibitionAgentId: null,
    agentCh: null
  },
  orgTypeArray: [],
  cacheform: {},
  // 填充可以为getters提供有效数据的信息
  loading: false
};

const getters = {
  // 加载
  loading: state => state.loading,
  baseInfo: state => state.baseInfo,
  editable: state => state.editable,
  orgTypeArray: state => state.orgTypeArray
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
    state.baseInfo = payload;
  },
  EDIT(state, payload) {
    state.editable = payload;
    if (payload === false) {
      state.baseInfo = state.cacheform;
    }
  },
  INIT_ORG_TYPE_ARR(state, payload) {
    state.orgTypeArray = payload;
  }
};

const actions = {
  getBaseInfo({ commit }) {
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
  saveBaseInfo({ commit, state }) {
    commit("LOADING");
    return agentApi
      .updateBaseInfo(state.baseInfo)
      .then(res => {
        commit("LOADED");
        commit("CACHEFORM", { ...state.cacheform, ...state.baseInfo });
        commit("EDIT", false);
      })
      .catch(err => {
        commit("LOADED");
        throw err;
      });
  },
  getOrgTypeArray({ commit }) {
    commit("LOADING");
    return agentApi
      .getOrgTypeArray()
      .then(res => {
        const ret = (res.records || []).map(item => {
          return { itemCode: item.itemCode, itemText: item.itemText };
        });
        commit("LOADED");
        commit(
          "INIT_ORG_TYPE_ARR",
          ret
        );
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
