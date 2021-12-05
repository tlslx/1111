import { dictionaryComplaintReportingMainItemApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listMainProjectDictionary: [],
    mainProjectDictionary: [],
    deleteMainProjectDictionary: [],
    updateMainProjectDictionary: [],
    addMainProjectDictionary: [],
    listBarriersDictionary: [],
    BarriersDictionary: [],
    deleteBarriersDictionary: [],
    updateBarriersDictionary: [],
    addBarriersDictionary: []
  },
  getters: {
    listMainProjectDictionary: state => state.listMainProjectDictionary,
    mainProjectDictionary: state => state.mainProjectDictionary,
    deleteMainProjectDictionary: state => state.deleteMainProjectDictionary,
    updateMainProjectDictionary: state => state.updateMainProjectDictionary,
    addMainProjectDictionary: state => state.addMainProjectDictionary,
    listBarriersDictionary: state => state.listBarriersDictionary,
    BarriersDictionary: state => state.BarriersDictionary,
    deleteBarriersDictionary: state => state.deleteBarriersDictionary,
    updateBarriersDictionary: state => state.updateBarriersDictionary,
    addBarriersDictionary: state => state.addBarriersDictionary
  },
  mutations: {
    LIST_MAIN_PROJECT_DICTIONARY(state, payload) {
      state.listMainProjectDictionary = payload;
    },
    MAIN_PROJECT_DICTIONARY(state, payload) {
      state.mainProjectDictionary = payload;
    },
    DELETE_MAIN_PROJECT_DICTIONARY(state, payload) {
      state.deleteMainProjectDictionary = payload;
    },
    UPDATE_MAIN_PROJECT_DICTIONARY(state, payload) {
      state.updateMainProjectDictionary = payload;
    },
    ADD_MAIN_PROJECT_DICTIONARY(state, payload) {
      state.addMainProjectDictionary = payload;
    },
    LIST_BARRIERS_DICTIONARY(state, payload) {
      state.listBarriersDictionary = payload;
    },
    BARRIERS_DICTIONARY(state, payload) {
      state.BarriersDictionary = payload;
    },
    DELETE_BARRIERS_DICTIONARY(state, payload) {
      state.deleteBarriersDictionary = payload;
    },
    UPDATE_BARRIERS_DICTIONARY(state, payload) {
      state.updateBarriersDictionary = payload;
    },
    ADD_BARRIERS_DICTIONARY(state, payload) {
      state.addBarrierstDictionary = payload;
    }
  },
  actions: {
    // 查看主项目字典列表
    selectListMainProjectDictionary({ commit }) {
      return new Promise((resolve, reject) => {
        dictionaryComplaintReportingMainItemApi.queryListMainProjectDictionary().then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_MAIN_PROJECT_DICTIONARY', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看主项目字典
    selectMainProjectDictionary({ commit }, params) {
      return new Promise((resolve, reject) => {
        dictionaryComplaintReportingMainItemApi.queryMainProjectDictionary(params).then(res => {
          commit('MAIN_PROJECT_DICTIONARY', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除主项目字典
    deleteMainProjectDictionaryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        dictionaryComplaintReportingMainItemApi.deleteMainProjectDictionary(params).then(res => {
          commit('DELETE_MAIN_PROJECT_DICTIONARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改主项目字典
    updateMainProjectDictionaryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = dictionaryComplaintReportingMainItemApi.updateMainProjectDictionary(params);
        promises.then(res => {
          commit('UPDATE_MAIN_PROJECT_DICTIONARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增主项目字典
    addMainProjectDictionaryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = dictionaryComplaintReportingMainItemApi.addMainProjectDictionary(params);
        promises.then(res => {
          commit('ADD_MAIN_PROJECT_DICTIONARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看二级项目字典列表
    selectListBarriersDictionary({ commit }) {
      return new Promise((resolve, reject) => {
        dictionaryComplaintReportingMainItemApi.queryLisBarriersDictionary().then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_BARRIERS_DICTIONARY', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看二级项目字典
    selectBarriersDictionary({ commit }, params) {
      return new Promise((resolve, reject) => {
        dictionaryComplaintReportingMainItemApi.queryBarriersDictionary(params).then(res => {
          commit('BARRIERS_DICTIONARY', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除二级项目字典
    deleteBarriersDictionaryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        dictionaryComplaintReportingMainItemApi.deleteBarriersDictionary(params).then(res => {
          commit('DELETE_BARRIERS_DICTIONARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改二级项目字典
    updateBarriersDictionaryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = dictionaryComplaintReportingMainItemApi.updateBarriersDictionary(params);
        promises.then(res => {
          commit('UPDATE_BARRIERS_DICTIONARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增二级项目字典
    addBarriersDictionaryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = dictionaryComplaintReportingMainItemApi.addBarriersDictionary(params);
        promises.then(res => {
          commit('ADD_BARRIERS_DICTIONARY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
