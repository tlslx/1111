import { stockAlertApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listAll: [],
    listAllInfomation: [],
    deleteById: [],
    byId: [],
    addStockWarm: [],
    updateById: []
  },
  getters: {
    listAll: state => state.listAll,
    listAllInfomation: state => state.listAllInfomation,
    deleteById: state => state.deleteById,
    byId: state => state.byId,
    addStockWarm: state => state.addStockWarm,
    updateById: state => state.updateById
  },
  mutations: {
    LIST_ALL(state, payload) {
      state.listAll = payload;
    },
    LIST_ALL_INFOMATION(state, payload) {
      state.listAllInfomation = payload;
    },
    DELETE_BY_ID(state, payload) {
      state.deleteById = payload;
    },
    BY_ID(state, payload) {
      state.byId = payload;
    },
    ADD_STOCK_WARM(state, payload) {
      state.addStockWarm = payload;
    },
    UPDATE_BY_ID(state, payload) {
      state.updateById = payload;
    }
  },
  actions: {
    // 查看库存预警信息
    selectListAll({ commit }, params) {
      return new Promise((resolve, reject) => {
        stockAlertApi.getListAll(params).then(res => {
          commit('LIST_ALL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看库存预警信息
    selectListAllInfomation({ commit }) {
      return new Promise((resolve, reject) => {
        stockAlertApi.getListAllInfomation().then(res => {
          commit('LIST_ALL_INFOMATION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id删除库存预警信息
    deleteById({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stockAlertApi.deleteById(params);
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
        stockAlertApi.getById(params).then(res => {
          commit('BY_ID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加库存预警信息
    addStockWarmInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = stockAlertApi.addStockWarm(params);
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
        const promises = stockAlertApi.updateById(params);
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
