import { categoryManagementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    listAll: [],
    listByPage: [],
    listAllTwo: [],
    listByPageTwo: [],
    listAllTool: [],
    listAllRule: [],
    listAllRuleTwo: [],
    addExhibitionClass: [],
    addExhibitionClassTwo: [],
    addExhibition: []
  },
  getters: {
    listAll: state => state.listAll,
    listByPage: state => state.listByPage,
    listAllTwo: state => state.listAllTwo,
    listByPageTwo: state => state.listByPageTwo,
    listAllTool: state => state.listAllTool,
    listAllRule: state => state.listAllRule,
    listAllRuleTwo: state => state.listAllRuleTwo,
    addExhibitionClass: state => state.addExhibitionClass,
    addExhibitionClassTwo: state => state.addExhibitionClassTwo,
    addExhibition: state => state.addExhibition
  },
  mutations: {
    LIST_ALL(state, payload) {
      state.listAll = payload;
    },
    LIST_BYPAGE(state, payload) {
      state.listByPage = payload;
    },
    LIST_ALL_TWO(state, payload) {
      state.listAllTwo = payload;
    },
    LIST_BYPAGE_TWO(state, payload) {
      state.listByPageTwo = payload;
    },
    LIST_ALL_TOOL(state, payload) {
      state.listAllTool = payload;
    },
    LIST_ALL_RULE(state, payload) {
      state.listAllRule = payload;
    },
    LIST_ALL_RULE_TWO(state, payload) {
      state.listAllRuleTwo = payload;
    },
    ADD_EXHIBITION_CLASS(state, payload) {
      state.addExhibitionClass = payload;
    },
    ADD_EXHIBITION_CLASS_TWO(state, payload) {
      state.addExhibitionClassTwo = payload;
    },
    ADD_EXHIBITION(state, payload) {
      state.addExhibition = payload;
    }
  },
  actions: {
    // 查询展具一级分类列表
    selectListAll({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListAll(params).then(res => {
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
    // 查询展具一级分页分类列表
    selectListByPage({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListByPage(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_BYPAGE', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询展具二级分类列表
    selectListAllTwo({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListAllTwo(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_ALL_TWO', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询展具二级分页分类列表
    selectListByPageTwo({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListByPageTwo(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_BYPAGE_TWO', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询展具/组成展材信息
    selectListAllTool({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListAllTool(params).then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.sequenceNum = res.size * (res.current - 1) + (index + 1);
            });
          }
          commit('LIST_ALL_TOOL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看约束一级分类信息
    selectListAllRule({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListAllRule(params).then(res => {
          commit('LIST_ALL_RULE', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看约束二级分类信息
    selectListAllRuleTwo({ commit }, params) {
      return new Promise((resolve, reject) => {
        categoryManagementApi.getListAllRuleTwo(params).then(res => {
          commit('LIST_ALL_RULE_TWO', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加展具一级分类信息
    addExhibitionClassInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = categoryManagementApi.addExhibitionClass(params);
        promises.then(res => {
          commit('ADD_EXHIBITION_CLASS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加展具二级分类信息
    addExhibitionClassTwoInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = categoryManagementApi.addExhibitionClassTwo(params);
        promises.then(res => {
          commit('ADD_EXHIBITION_CLASS_TWO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加展具/组成展材信息
    addExhibitionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = categoryManagementApi.addExhibition(params);
        promises.then(res => {
          commit('ADD_EXHIBITION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
