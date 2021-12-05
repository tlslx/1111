import { getExhibitionAreaManagementApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getExhibitionAreaList: [],
    delExhArea: [],
    saveExhArea: [],
    exhAreaUpdate: [],
    exhAreaLast: []

  },
  getters: {
    getExhibitionAreaList: state => state.getExhibitionAreaList,
    delExhArea: state => state.delExhArea,
    saveExhArea: state => state.saveExhArea,
    exhAreaUpdate: state => state.exhAreaUpdate,
    exhAreaLast: state => state.exhAreaLast
  },
  mutations: {
    GET_LISTEXHIBITION(state, payload) {
      state.getExhibitionAreaList = payload;
    },
    DEL_EXHAREA(state, payload) {
      state.delExhArea = payload;
    },
    GET_SAVEEXHAREA(state, payload) {
      state.saveExhArea = payload;
    },
    GET_EXHAREAUPDATE(state, payload) {
      state.exhAreaUpdate = payload;
    },
    SAVE_EXHAREALAST(state, payload) {
      state.exhAreaLast = payload;
    }
  },
  actions: {
    // 展区管理列表
    getListExhibitionAreaInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getExhibitionAreaManagementApi.getListExhibitionArea(params);
        promises.then(res => {
          commit('GET_LISTEXHIBITION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     //展区管理删除
    deleteExhibitionAreaInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getExhibitionAreaManagementApi.deleteExhibitionArea(params);
        promises.then(res => {
          commit('DEL_EXHAREA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     //展区管理新增
    saveExhibitionAreaInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getExhibitionAreaManagementApi.saveExhibitionArea(params);
        promises.then(res => {
          commit('GET_SAVEEXHAREA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //展区管理修改
    updateExhibitionAreaInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getExhibitionAreaManagementApi.updateExhibitionArea(params);
        promises.then(res => {
          commit('GET_EXHAREAUPDATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //展区管理一键导入
    saveExhibitionAreaByLastestInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getExhibitionAreaManagementApi.saveExhibitionAreaByLastest(params);
        promises.then(res => {
          commit('SAVE_EXHAREALAST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
