import { invitationCardApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    deleteData: {},
    getLimitData: {},
    invitationsData: {},
    addableListData: {},
    updatePrintStatusData: {},
    createInvitationCardData: {}
  },
  getters: {
    deleteData: state => state.deleteData,
    getLimitData: state => state.getLimitData,
    invitationsData: state => state.invitationsData,
    addableListData: state => state.addableListData,
    updatePrintStatusData: state => state.updatePrintStatusData,
    createInvitationCardData: state => state.createInvitationCardData
  },
  mutations: {
    DELETE_DATA(state, payload) {
      state.deleteData = payload;
    },
    GET_LIMIT_DATA(state, payload) {
      state.getLimitData = payload;
    },
    INVITATIONS_DATA(state, payload) {
      state.invitationsData = payload;
    },
    ADD_ABLE_LIST_DATA(state, payload) {
      state.addableListData = payload;
    },
    UPDATE_PRINT_STATUS_DATA(state, payload) {
      state.updatePrintStatusData = payload;
    },
    CREATE_INVITATION_CARD_DATA(state, payload) {
      state.createInvitationCardData = payload;
    }
  },
  actions: {
    // 查看付款通知书
    getInvitations({ commit }, Object) {
      return new Promise((resolve, reject) => {
        invitationCardApi.getInvitationsData(Object).then(res => {
          commit('INVITATIONS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 可新增邀请函列表
    addableList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        invitationCardApi.addableListData(Object).then(res => {
          commit('ADD_ABLE_LIST_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 显示额度
    getLimit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        invitationCardApi.getLimitData(Object).then(res => {
          commit('GET_LIMIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 确定新增
    createInvitationCard({ commit }, Object) {
      return new Promise((resolve, reject) => {
        invitationCardApi.createInvitationCardData(JSON.stringify(Object)).then(res => {
          commit('CREATE_INVITATION_CARD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 确定新增
    updatePrintStatus({ commit }, Object) {
      return new Promise((resolve, reject) => {
        invitationCardApi.updatePrintStatusData(Object).then(res => {
          commit('UPDATE_PRINT_STATUS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 撤回邀请函
    delete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        invitationCardApi.deleteData(Object).then(res => {
          commit('DELETE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }


  }
};
