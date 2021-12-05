import { feedbackBrandApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getFeed: [],
    addObject: [],
    cancelObject: [],
    downloadTrads: [],
    commitStatus: []
  },
  getters: {
    getFeed: state => state.getFeed,
    addObject: state => state.addObject,
    cancelObject: state => state.cancelObject,
    downloadTrads: state => state.downloadTrads,
    commitStatus: state => state.commitStatus
  },
  mutations: {
    GET_FEED(state, payload) {
      state.getFeed = payload;
    },
    ADD_OBJCT(state, payload) {
      state.addObject = payload;
    },
    CANCEL_OBJCT(state, payload) {
      state.cancelObject = payload;
    },
    DOWNLOAD_TRAD(state, payload) {
      state.downloadTrads = payload;
    },
    COMMIT_STATUS(state, payload) {
      state.commitStatus = payload;
    }
  },
  actions: {
    // 获取反馈意见列表
    getfeedBackList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        feedbackBrandApi.getFeedBackList(Object).then(res => {
          commit('GET_FEED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加异议内容
    addobjectionTrad({ commit }, Object) {
      return new Promise((resolve, reject) => {
        feedbackBrandApi.addObjectionTrad(Object).then(res => {
          commit('ADD_OBJCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 取消异议内容
    cancelobjectionTrad({ commit }, Object) {
      return new Promise((resolve, reject) => {
        feedbackBrandApi.cancelObjectionTrad(Object).then(res => {
          commit('CANCEL_OBJCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 下载反馈意见汇总
    downloadtrad({ commit }, Object) {
      return new Promise((resolve, reject) => {
        feedbackBrandApi.downloadTrad(Object).then(res => {
          commit('DOWNLOAD_TRAD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 提交外贸司
    commitstatusTrad({ commit }, Object) {
      return new Promise((resolve, reject) => {
        feedbackBrandApi.commitStatusTrad(Object).then(res => {
          commit('COMMIT_STATUS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
