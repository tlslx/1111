import { receiverApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listByCondition: [],
    listByExh: [],
    list: [],
    addworkAcceptor: [],
    addBatch: [],
    deleteWorkAcceptor: [],
    updateWorkAcceptor: []
  },
  getters: {
    listByCondition: state => state.listByCondition,
    listByExh: state => state.listByExh,
    list: state => state.list,
    addworkAcceptor: state => state.addworkAcceptor,
    addBatch: state => state.addBatch,
    deleteWorkAcceptor: state => state.deleteWorkAcceptor,
    updateWorkAcceptor: state => state.updateWorkAcceptor
  },
  mutations: {
    LIST_BY_CONDITION(state, payload) {
      state.listByCondition = payload;
    },
    LIST_BY_EXH(state, payload) {
      state.listByExh = payload;
    },
    LIST(state, payload) {
      state.list = payload;
    },
    ADD_WORK_ACCEPTOR(state, payload) {
      state.addworkAcceptor = payload;
    },
    ADD_BATCH(state, payload) {
      state.addBatch = payload;
    },
    DELETE_WORK_ACCEPTOR(state, payload) {
      state.deleteWorkAcceptor = payload;
    },
    UPDATE_WORK_ACCEPTOR(state, payload) {
      state.updateWorkAcceptor = payload;
    }
  },
  actions: {
    // 查看接单员列表信息
    selectListByCondition({ commit }, params) {
      return new Promise((resolve, reject) => {
        receiverApi.queryListByCondition(params).then(res => {
          commit('LIST_BY_CONDITION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看接单人员列表（按展览）
    selectListByExh({ commit }, params) {
      return new Promise((resolve, reject) => {
        receiverApi.queryListByExh(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_BY_EXH', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看接单人员列表（按展览）
    selectList({ commit }) {
      return new Promise((resolve, reject) => {
        receiverApi.queryList().then(res => {
          // if (res.records && res.records.length > 0) {
          //   res.records.forEach((value, index, array) => {
          //     value.sequenceNum = res.size * (res.current - 1) + (index + 1);
          //   });
          // }
          commit('LIST', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加接单员信息
    addworkAcceptorInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = receiverApi.addworkAcceptor(params);
        promises.then(res => {
          commit('ADD_WORK_ACCEPTOR', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 复制接单员人员信息
    addBatchInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = receiverApi.addBatch(params);
        promises.then(res => {
          commit('ADD_BATCH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除接单员人员信息
    deleteWorkAcceptorInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = receiverApi.deleteWorkAcceptor(params);
        promises.then(res => {
          commit('DELETE_WORK_ACCEPTOR', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改接单员人员信息
    updateWorkAcceptorInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = receiverApi.updateWorkAcceptor(params);
        promises.then(res => {
          commit('UPDATE_WORK_ACCEPTOR', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
