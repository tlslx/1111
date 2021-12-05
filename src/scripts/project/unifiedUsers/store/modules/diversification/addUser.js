import { addUserApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getUserSave: [],
    getSaveexpert: [],
    updateById: [],
    getDeptList: [],
    updateExpert: [],
    getExpertById: []

  },
  getters: {
    getUserSave: state => state.getUserSave,
    getSaveexpert: state => state.getSaveexpert,
    updateById: state => state.updateById,
    getDeptList: state => state.getDeptList,
    updateExpert: state => state.updateExpert,
    getExpertById: state => state.getExpertById
  },
  mutations: {
    GET_USERSAVE(state, payload) {
      state.getUserSave = payload;
    },
    GET_SAVEEXPERT(state, payload) {
      state.getSaveexpert = payload;
    },
    UPDATE_BYID(state, payload) {
      state.updateById = payload;
    },
    GET_DEPTLIST(state, payload) {
      state.getDeptList = payload;
    },
    UPDATE_EXPERT(state, payload) {
      state.updateExpert = payload;
    },
    GET_EXPERTLIST(state, payload) {
      state.getExpertById = payload;
    }
  },
  actions: {
    // 用户创建
    getAddUserInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = addUserApi.getAddUser(params);
        promises.then(res => {
          commit('GET_USERSAVE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 专家新增
    saveExpertInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = addUserApi.saveExpert(params);
        promises.then(res => {
          commit('GET_SAVEEXPERT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 用户修改
    updateByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = addUserApi.updateById(params);
        promises.then(res => {
          commit('UPDATE_BYID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取部门
    getListAllInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = addUserApi.getListAll(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_DEPTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 专家修改
    updateExpertInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = addUserApi.updateExpert(params);
        promises.then(res => {
          commit('UPDATE_EXPERT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 按ID查询专家
    getExpertByIdInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = addUserApi.getExpertById(params);
        promises.then(res => {
          commit('GET_EXPERTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }

  }
};
