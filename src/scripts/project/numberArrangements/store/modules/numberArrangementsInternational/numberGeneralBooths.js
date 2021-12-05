import { numberGeneralBoothsApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getRech: {},
    postEdit: {},
    postGements: {},
    getChanne: {},
    postCopyre: {},
    postGuide: {},
    getView: {},
    getSil: []
  },
  getters: {
    getRech: state => state.getRech,
    postEdit: state => state.postEdit,
    postGements: state => state.postGements,
    getChanne: state => state.getChanne,
    postCopyre: state => state.postCopyre,
    postGuide: state => state.postGuide,
    getView: state => state.getView,
    getSil: state => state.getSil
  },
  mutations: {
    GET_ATOA(state, payload) {
      state.getRech = payload;
    },
    POST_ATOA(state, payload) {
      state.postEdit = payload;
    },
    POST_ATOB(state, payload) {
      state.postGements = payload;
    },
    GET_ATOC(state, payload) {
      state.getChanne = payload;
    },
    POST_ATOC(state, payload) {
      state.postCopyre = payload;
    },
    POST_ATOD(state, payload) {
      state.postGuide = payload;
    },
    GET_ATOD(state, payload) {
      state.getView = payload;
    },
    GET_SIL(state, payload) {
      state.getSil = payload;
    }
  },
  actions: {
    // 基数不重核一般性展位数量安排
    getRecheckGeneral({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.recheckGeneral(obj).then(res => {
          commit('GET_ATOA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    postNumberArrangementPost({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.numberArrangementPost(obj).then(res => {
          commit('POST_ATOB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 基数不重核一般性展位数量安排(编辑)
    postNumberArrangementEdit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.numberArrangementEdit(obj).then(res => {
          commit('POST_ATOA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导入中央通道安排数量
    getChanneArrangements({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.channeArrangements(obj).then(res => {
          commit('GET_ATOC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导入中央通道安排数量(编辑)
    postChanneCopyreader({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.channeCopyreader(obj).then(res => {
          commit('POST_ATOC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导入中央通道安排数量(导入)
    postChanneGuideInto({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.channeGuideInto(obj).then(res => {
          commit('POST_ATOD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看安排方案 
    getViewArrangement({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.ViewArrangement(obj).then(res => {
          commit('GET_ATOD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导入中央通道安排数量(公示)
    publishsendInternalLetter({ commit }, obj) {
      return new Promise((resolve, reject) => {
        numberGeneralBoothsApi.publishSendInternalLetter(obj).then(res => {
          commit('GET_SIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
