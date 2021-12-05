import { stockFluApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listAll: [],
    deleteById: [],
    getById: [],
    addStockWarm: [],
    updateById: []
  },
  getters: {
    listAll: state => state.listAll,
    deleteById: state => state.deleteById,
    getById: state => state.getById,
    addStockWarm: state => state.addStockWarm,
    updateById: state => state.updateById
  },
  mutations: {
    LIST_ALL(state, payload) {
      state.listAll = payload;
    },
    DELETE_BY_ID(state, payload) {
      state.deleteById = payload;
    },
    GET_BY_ID(state, payload) {
      state.getById = payload;
    },
    ADD_STOCK_WARM(state, payload) {
      state.addStockWarm = payload;
    },
    UPDATE_BY_ID(state, payload) {
      state.updateById = payload;
    }
  },
  actions: {
    // 查看库存增减信息
    selectListAll({ commit }, params) {
      return new Promise((resolve, reject) => {
        stockFluApi.getListAll(params).then(res => {
          commit('LIST_ALL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id删除库存预警信息
    deleteById({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stockFluApi.deleteById(params);
        promises.then(res => {
          commit('DELETE_BY_ID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id获取库存预警信息
    getById({ commit }, params) {
      return new Promise((resolve, reject) => {
        stockFluApi.getById(params).then(res => {
          commit('GET_BY_ID', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加库存增减信息
    addStockWarmInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stockFluApi.addStockWarm(params);
        promises.then(res => {
          commit('ADD_STOCK_WARM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id更新库存
    updateByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stockFluApi.updateById(params);
        promises.then(res => {
          commit('UPDATE_BY_ID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
