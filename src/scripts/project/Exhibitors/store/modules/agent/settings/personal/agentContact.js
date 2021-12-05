/* eslint-disable no-shadow */
import { agentApi } from "@/scripts/project/Exhibitors/apis";

const state = {
  qryForm: {
    name: "",
    department: ""
  },
  records: [],
  pageInfo: {
    current: 1,
    size: 10,
    total: 0
  },
  loading: false,
  addForm: {},
  updateForm: {},
  addFlag: false
};

const getters = {
  loading: state => state.loading,
  qryForm: state => state.qryForm,
  records: state => state.records,
  addForm: state => state.addForm,
  updateForm: state => state.updateForm,
  pageInfo: state => state.pageInfo,
  addFlag: state => state.addFlag
};

const mutations = {
  LOAD_RECORDS(state, records) {
    state.records = records;
  },
  LOADING(state) {
    state.loading = true;
  },
  LOADED(state) {
    state.loading = false;
  },
  LOAD_PAGE_INFO(state, pageInfo) {
    state.pageInfo.total = pageInfo.total;
  },
  SET_CURRENT(state, current) {
    state.pageInfo.current = current;
  },
  SET_SIZE(state, size) {
    state.pageInfo.size = size;
  },
  SLECT_ITEM(state, record) {
    state.updateForm = record;
  },
  CLOSE_ADD_DIALOG(state) {
    state.addFlag = false;
  },
  OPEN_ADD_DIALOG(state) {
    state.addFlag = true;
  },
  CLEAR_UPDATE_FORM(state) {
    state.updateForm = {};
  },
  CLEAR_ADD_FORM(state) {
    state.addForm = {};
  }
};
const actions = {
  getContactData({ commit, state }) {
    commit("LOADING");
    return agentApi
      .getAgentContacts(Object.assign(state.qryForm, state.pageInfo))
      .then(res => {
        commit("LOADED");
        const pageInfo = {
          total: res.total
        };
        commit("LOAD_PAGE_INFO", pageInfo);
        commit("LOAD_RECORDS", res.records);
      })
      .catch(err => {
        commit("LOADED");
        throw err;
      });
  },
  deleteContact(store, { contactId }) {
    return agentApi
      .deleteContact({ contactId: contactId })
      .then(res => {
        store.dispatch("getContactData");
      })
      .catch(err => {
        store.commit("LOADED");
        throw err;
      });
  },
  addContact({ dispatch, commit, state }) {
    commit("LOADING");
    return agentApi
      .addAgentContacts({
        ...state.addForm,
        ifoExhibitionAgentId: null
      })
      .then(res => {
        commit("CLEAR_ADD_FORM");
        commit("CLOSE_ADD_DIALOG");
        dispatch("getContactData");
      })
      .catch(err => {
        commit("LOADED");
        throw err;
      });
  },
  updateContact({ dispatch, commit, state }) {
    commit("LOADING");
    return agentApi
      .updateContact(state.updateForm)
      .then(res => {
        commit("CLEAR_UPDATE_FORM");
        dispatch("getContactData");
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
