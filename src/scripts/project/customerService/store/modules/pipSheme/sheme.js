import { shemeApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listByPage: [],
    byId: [],
    addEquipmentConfiguration: [],
    updateById: []
  },
  getters: {
    listByPage: state => state.listByPage,
    byId: state => state.byId,
    addEquipmentConfiguration: state => state.addEquipmentConfiguration,
    updateById: state => state.updateById
  },
  mutations: {
    LIST_BY_PAGE(state, payload) {
      state.listByPage = payload;
    },
    BY_ID(state, payload) {
      state.byId = payload;
    },
    ADD_EQUIPMENT_CONFIGURATION(state, payload) {
      state.addEquipmentConfiguration = payload;
    },
    UPDATE_BY_ID(state, payload) {
      state.updateById = payload;
    }
  },
  actions: {
    // 查询标准展位展具配置管理列表
    selectListByPage({ commit }, params) {
      return new Promise((resolve, reject) => {
        shemeApi.getListByPage(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_BY_PAGE', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id查看标准展具管理信息
    selectById({ commit }, params) {
      return new Promise((resolve, reject) => {
        shemeApi.getById(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('BY_ID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加展具二级分类信息
    addEquipmentConfigurationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = shemeApi.addEquipmentConfiguration(params);
        promises.then(res => {
          commit('ADD_EQUIPMENT_CONFIGURATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id更新标准展具管理信息
    updateByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = shemeApi.updateById(params);
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
