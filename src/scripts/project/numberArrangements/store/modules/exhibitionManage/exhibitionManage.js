import { exhibitionManageApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    addRecordLkData: {},
    getRecordLksData: {},
    updateRecordLkData: {},
    removeRecordLkData: {}
  },
  getters: {
    addRecordLkData: state => state.addRecordLkData,
    getRecordLksData: state => state.getRecordLksData,
    updateRecordLkData: state => state.updateRecordLkData,
    removeRecordLkData: state => state.removeRecordLkData
  },
  mutations: {
    ADD_RECORD_LK_DATA(state, payload) {
      state.addRecordLkData = payload;
    },
    GET_RECORD_LKS_DATA(state, payload) {
      state.getRecordLksData = payload;
    },
    UPDATE_RECORD_LK_DATA(state, payload) {
      state.updateRecordLkData = payload;
    },
    REMOVE_RECORD_LK_DATA(state, payload) {
      state.removeRecordLkData = payload;
    }
  },
  actions: {
    // 查看付款通知书
    getRecordLks({ commit }, Object) {
      return new Promise((resolve, reject) => {
        exhibitionManageApi.getRecordLksData(Object).then(res => {
          commit('GET_RECORD_LKS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增展品运输备案关联
    addRecordLk({ commit }, Object) {
      return new Promise((resolve, reject) => {
        exhibitionManageApi.addRecordLkData(Object).then(res => {
          commit('ADD_RECORD_LK_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑展品运输备案关联
    updateRecordLk({ commit }, Object) {
      return new Promise((resolve, reject) => {
        exhibitionManageApi.updateRecordLkData(Object).then(res => {
          commit('UPDATE_RECORD_LK_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除展品运输备案关联
    removeRecordLk({ commit }, Object) {
      return new Promise((resolve, reject) => {
        exhibitionManageApi.removeRecordLkData(Object).then(res => {
          commit('REMOVE_RECORD_LK_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }


  }
};
