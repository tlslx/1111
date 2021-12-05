import { registApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getListAll: [],
    getConFirmRep: "",
    getCountry: {},
    getAdd: {},
    getAllAgents: {},
    companyTypeOptionsData: [],
    industryTypeOptionsData: [],
    exhibitListAllData: [],
    loginInfoData: []
  },
  getters: {
    getListAll: state => state.getListAll,
    getConFirmRep: state => state.getConFirmRep,
    getCountry: state => state.getCountry,
    getAdd: state => state.getAdd,
    getAllAgents: state => state.getAllAgents,
    companyTypeOptionsData: state => state.companyTypeOptionsData,
    industryTypeOptionsData: state => state.industryTypeOptionsData,
    exhibitListAllData: state => state.exhibitListAllData,
    loginInfoData: state => state.loginInfoData
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
    },
    COMP_TYPE(state, payload) {
      state.companyTypeOptionsData = payload;
    },
    INDUSTRY_TYPE(state, payload) {
      state.industryTypeOptionsData = payload;
    },
    EXHIBIT_LIST_ALL(state, payload) {
      state.exhibitListAllData = payload;
    },
    LOGIN_INFO_DATA(state, payload) {
      state.loginInfoData = payload;
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
    },
    // 获取所有企业类型
    getCompanyTypeOptions({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = registApi.companyTypeOptions();
        promises.then(res => {
          let data = [];
          res.forEach(ele => {
            data.push({ value: ele.itemCode, label: ele.itemText });
          });
          commit('COMP_TYPE', data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有企业类型
    getIndustryTypeOptions({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = registApi.industryTypeOptions();
        promises.then(res => {
          let data = [];
          res.forEach(ele => {
            data.push({ value: ele.itemCode, label: ele.itemText });
          });
          commit('INDUSTRY_TYPE', data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有展会信息
    getExhibitListAll({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = registApi.exhibitListAll();
        promises.then(res => {
          let data = [];
          res.forEach(ele => {
            data.push({ value: ele.exhibitionNum, label: ele.exhibitionNum });
          });
          commit('EXHIBIT_LIST_ALL', data);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取登录信息-招展代理下拉框
    getLoginInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = registApi.loginInfo();
        promises.then(res => {
          commit('LOGIN_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
