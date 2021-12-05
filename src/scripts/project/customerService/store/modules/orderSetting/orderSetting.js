import { orderSettingApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    byArea: [],
    deleteAcceptorHall: [],
    workProject: {},
    updateAcceptorHall: [],
    listGroup: [],
    listGroupDetails: [],
    add: [],
    addGroup: [],
    deleteGroup: []
  },
  getters: {
    byArea: state => state.byArea,
    deleteAcceptorHall: state => state.deleteAcceptorHall,
    workProject: state => state.workProject,
    updateAcceptorHall: state => state.updateAcceptorHall,
    listGroup: state => state.listGroup,
    listGroupDetails: state => state.listGroupDetails,
    add: state => state.add,
    addGroup: state => state.addGroup,
    deleteGroup: state => state.deleteGroup
  },
  mutations: {
    BY_AREA(state, payload) {
      state.byArea = payload;
    },
    DELETE_ACCEPTOR_HALL(state, payload) {
      state.deleteAcceptorHall = payload;
    },
    WORK_PROJECT(state, payload) {
      state.workProject = payload;
    },
    UPDATE_ACCEPTOR_HALL(state, payload) {
      state.updateAcceptorHall = payload;
    },
    LIST_GROUP(state, payload) {
      state.listGroup = payload;
    },
    LIST_GROUP_DETAILS(state, payload) {
      state.listGroupDetails = payload;
    },
    ADD(state, payload) {
      state.add = payload;
    },
    ADD_GROUP(state, payload) {
      state.addGroup = payload;
    },
    DELETE_GROUP(state, payload) {
      state.deleteGroup = payload;
    }
  },
  actions: {
    // 查看工单服务项目管理信息
    selectByArea({ commit }, params) {
      return new Promise((resolve, reject) => {
        orderSettingApi.queryByArea(params).then(res => {
          commit('BY_AREA', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除工单服务项目管理信息
    deleteAcceptorHallInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = orderSettingApi.deleteAcceptorHall(params);
        promises.then(res => {
          commit('DELETE_ACCEPTOR_HALL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看工单服务项目管理详情
    selectWorkProject({ commit }, params) {
      return new Promise((resolve, reject) => {
        orderSettingApi.queryWorkProject(params).then(res => {
          value.sequenceNum = "1";
          commit('WORK_PROJECT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 修改工单服务项目管理信息
    updateAcceptorHallInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = orderSettingApi.updateAcceptorHall(params);
        promises.then(res => {
          commit('UPDATE_ACCEPTOR_HALL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看施工组信息
    selectListGroup({ commit }, params) {
      return new Promise((resolve, reject) => {
        orderSettingApi.queryListGroup(params).then(res => {
          commit('LIST_GROUP', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看施工组详情
    selectListGroupDetails({ commit }, params) {
      return new Promise((resolve, reject) => {
        orderSettingApi.queryListGroupDetails(params).then(res => {
          commit('LIST_GROUP_DETAILS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加工单服务项目信息
    addInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = orderSettingApi.add(params);
        promises.then(res => {
          commit('ADD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 添加施工组信息
    addGroupInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = orderSettingApi.addGroup(params);
        promises.then(res => {
          commit('ADD_GROUP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除施工组信息
    deleteGroupInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = orderSettingApi.deleteGroup(params);
        promises.then(res => {
          commit('DELETE_GROUP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
