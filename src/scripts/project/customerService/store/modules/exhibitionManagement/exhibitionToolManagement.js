import { exhibitionToolManagementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listByPage: [],
    listAll: [],
    addCompositionMaterial: []
  },
  getters: {
    listByPage: state => state.listByPage,
    listAll: state => state.listAll,
    addCompositionMaterial: state => state.addCompositionMaterial
  },
  mutations: {
    LIST_BY_PAGE(state, payload) {
      state.listByPage = payload;
    },
    LIST_ALL(state, payload) {
      state.listAll = payload;
    },
    ADD_COMPOSITION_MATERIAL(state, payload) {
      state.addCompositionMaterial = payload;
    }
  },
  actions: {
    // 查看展材管理信息
    selectListByPage({ commit }, params) {
      return new Promise((resolve, reject) => {
        exhibitionToolManagementApi.getListByPage(params).then(res => {
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
    // 根据一级分类查询二级分类信息
    selectListAll({ commit }, params) {
      return new Promise((resolve, reject) => {
        exhibitionToolManagementApi.getListAll(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_ALL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加展具二级分类信息
    addCompositionMaterialInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitionToolManagementApi.addCompositionMaterial(params);
        promises.then(res => {
          commit('ADD_COMPOSITION_MATERIAL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
