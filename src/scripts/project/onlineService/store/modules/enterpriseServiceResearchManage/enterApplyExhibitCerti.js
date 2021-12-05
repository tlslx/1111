import { enterApplyExhibitCertiApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
// import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    loading: true,
    exhibitorCardList: [],
    exhibitorCardTotal: 0,
    addLoading: true,
    userResourceList: []
  },
  getters: {
    exhibitorCardList: state => state.exhibitorCardList,
    loading: state => state.loading,
    exhibitorCardTotal: state => state.exhibitorCardTotal,
    addLoading: state => state.addLoading,
    userResourceList: state => state.userResourceList
  },
  mutations: {
    GET_EXHIBITOR_LIST(state, payload) {
      state.exhibitorCardList = payload;
    },
    GET_LOADING_STATUS(state, payload) {
      state.loading = payload;
    },
    GET_EXHIBITOR_CARD_TOTAL(state, payload) {
      state.exhibitorCardTotal = payload;
    },
    GET_ADD_LOADING(state, payload) {
      state.addLoading = payload;
    },
    GET_USER_RESOURCE_LIST(state, payload) {
      state.userResourceList = payload;
    }
  },
  actions: {
    // 获取企业参展证件列表
    getExhibitorCardList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterApplyExhibitCertiApi.getEnterApplyCardInfo(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_LOADING_STATUS', false);
          if (res && res.records) {
            if (res.records.length > 0) {
              let osExhibitionPeriod = kindo.dictionary.get('exhibitionPeriodNum');
              let osSex = kindo.dictionary.get('gender');
              let osStatus = kindo.dictionary.get('badge_audit_status');
              let osHandleModes = kindo.dictionary.get('BADGE_APPLY_HANDLE_MODE');
              res.records.forEach((value) => {
                // 处理展期
                if (osExhibitionPeriod.length > 0) {
                  let exhibitionPeriodObj = osExhibitionPeriod.find(elem => elem.value === value.exhibitionPeriod);
                  value.exhibitionPeriod = exhibitionPeriodObj ? exhibitionPeriodObj.label : value.exhibitionPeriod;
                }
                // 处理性别
                if (osSex.length > 0) {
                  let sexObj = osSex.find(elem => elem.value === value.sex);
                  value.sex = sexObj ? sexObj.label : value.sex;
                }
                // 处理审核状态
                if (osStatus.length > 0) {
                  let statusObj = osStatus.find(elem => elem.value === value.status);
                  value.status = statusObj ? statusObj.label : value.status;
                }
                // 处理证件状态
                if (osHandleModes.length > 0) {
                  let handleModesObj = osHandleModes.find(elem => elem.value === value.handleMode);
                  value.handleMode = handleModesObj ? handleModesObj.label : value.handleMode;
                }
              });
            }
            commit('GET_EXHIBITOR_LIST', res.records);
            commit('GET_EXHIBITOR_CARD_TOTAL', res.total);
          }
          resolve(res);
        }).catch(e => {
          commit('GET_LOADING_STATUS', false);
          reject(e);
        });
      });
    },
    // 修改新增办证信息页面加载状态
    editAddLoading({ commit }, param) {
      commit('GET_ADD_LOADING', param);
    },
    // 新增办证信息
    addExhibitCardInfo({ commit }, params) {
      let currentParams = {};
      for (let key in params) {
        currentParams[key] = params[key];
      }
      return new Promise((resolve, reject) => {
        enterApplyExhibitCertiApi.add(currentParams).then(res => {
          commit('GET_ADD_LOADING', false);
          resolve(res);
        }).catch(e => {
          commit('GET_ADD_LOADING', false);
          reject(e);
        });
      });
    },
    // 修改办证信息
    editExhibitCardInfo({ commit }, params) {
      let currentParams = {};
      for (let key in params) {
        currentParams[key] = params[key];
      }
      return new Promise((resolve, reject) => {
        enterApplyExhibitCertiApi.updateById(currentParams).then(res => {
          commit('GET_ADD_LOADING', false);
          resolve(res);
        }).catch(e => {
          commit('GET_ADD_LOADING', false);
          reject(e);
        });
      });
    },
    // 删除办证信息
    deleteExhibitCardInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyExhibitCertiApi.deleteById(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取人员资料信息
    getUserResourceInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterApplyExhibitCertiApi.getResourceListPage(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res && res.records) {
            if (res.records.length > 0) {
              let osSex = kindo.dictionary.get('gender');
              res.records.forEach((value) => {
                // 处理性别
                if (osSex.length > 0) {
                  let sexObj = osSex.find(elem => elem.value === value.sexTypeCode);
                  value.sexTypeCode = sexObj ? sexObj.label : value.sexTypeCode;
                }
              });
            }
            commit('GET_USER_RESOURCE_LIST', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增人员资料信息
    addUserDocInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyExhibitCertiApi.insertUserInfo(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改人员资料信息
    editUserDocInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyExhibitCertiApi.updateBatch(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除人员资料信息
    deleteUserDocInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyExhibitCertiApi.deleteSysUserInfoByBatch(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
