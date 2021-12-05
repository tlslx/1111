import { searchForBoothApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    addRecordData: {},
    getRecordsData: {},
    removeRecordData: {},
    updateRecordData: {},
    getLoginInfoData: {}
  },
  getters: {
    addRecordData: state => state.addRecordData,
    getRecordsData: state => state.getRecordsData,
    removeRecordData: state => state.removeRecordData,
    updateRecordData: state => state.updateRecordData,
    getLoginInfoData: state => state.getLoginInfoData
  },
  mutations: {
    ADD_RECORD_DATA(state, payload) {
      state.addRecordData = payload;
    },
    GET_RECORDS_DATA(state, payload) {
      state.getRecordsData = payload;
    },
    REMOVE_RECORD_DATA(state, payload) {
      state.removeRecordData = payload;
    },
    UPDATE_RECORD_DATA(state, payload) {
      state.updateRecordData = payload;
    },
    GET_LOGIN_INFO_DATA(state, payload) {
      state.getLoginInfoData = payload;
    }
  },
  actions: {
    // 查看付款通知书
    getRecords({ commit }, Object) {
      return new Promise((resolve, reject) => {
        searchForBoothApi.getRecordsData(Object).then(res => {
          commit('GET_RECORDS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增展品运输备案
    addRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        searchForBoothApi.addRecordData(Object).then(res => {
          commit('ADD_RECORD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除展品运输备案
    removeRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        searchForBoothApi.removeRecordData(Object).then(res => {
          commit('REMOVE_RECORD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑展品运输备案
    updateRecord({ commit }, Object) {
      return new Promise((resolve, reject) => {
        searchForBoothApi.updateRecordData(Object).then(res => {
          commit('UPDATE_RECORD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 点击新增时显示当前登录的企业的名称，原产地和国别地区
    getLoginInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        searchForBoothApi.getLoginInfoData(Object).then(res => {
          commit('GET_LOGIN_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }


  }
};
