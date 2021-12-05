// 进口展招展-邀请供应商
import { inviteCustomApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    inviteListData: {},
    exhibitonNumListAll: []
  },
  getters: {
    inviteListData: state => state.inviteListData,
    exhibitonNumListAll: state => state.exhibitonNumListAll
  },
  actions: {
    // 获取列表
    getInviteList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = inviteCustomApi.inviteList(params);
        promises.then(res => {
          commit("TABLE_LIST", res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增或修改邀请列表
    getUpdateOrAddInvite({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = inviteCustomApi.updateOrAddInvite(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取历史展届 全部展届
    getExhibitionNumListAll({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = inviteCustomApi.exhibitionNumList();
        promises.then(res => {
          let data = res.map(item => {
            return { exhibitionNum: item.exhibitionNum, current: item.current, exhibitionPeriodNum: item.exhibitionPeriodNum };
          });
          commit('EXHIBIT_NUM_LIST_ALL', data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    TABLE_LIST(state, payload) {
      state.inviteListData = payload;
    },
    EXHIBIT_NUM_LIST_ALL(state, payload) { // 历史展届数
      state.exhibitonNumListAll = payload;
    }
  }
};

