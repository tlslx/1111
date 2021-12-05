import { registApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getListAll: []
  },
  getters: {
    getListAll: state => state.getListAll

  },
  mutations: {
    GET_LISTALL(state, payload) {
      state.getListAll = payload;
    },
    CONFIRMREP(state, payload) {
      state.getConFirmRep = payload;
    },
    GET_COUNTRY(state, payload) {
      state.getCountry = payload;
    },
    GET_ADD(state, payload) {
      state.getAdd = payload;
    },
    GET_ALLAGENTS(state, payload) {
      state.getAllAgents = payload;
    }
  },
  actions: {

    // 根据企业英文名称模糊查询
    getListAllInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registApi.getSearchByCompanyName(params);
        promises.then(res => {
          commit('GET_LISTALL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 验证企业是否已经注册
    getConfirmIsRepeatInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registApi.getConfirmIsRepeat(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('CONFIRMREP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 获取国家
    getAllCountryInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = registApi.getAllCountry();
        promises.then(res => {
          commit('GET_COUNTRY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业询盘注册
    addInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registApi.add(params);
        promises.then(res => {
          commit('GET_ADD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有招展代理
    getAllAgentsInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = registApi.getAllAgents();
        promises.then(res => {
          commit('GET_ALLAGENTS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
