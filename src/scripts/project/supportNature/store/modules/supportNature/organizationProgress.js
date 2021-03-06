import { organizationProgressApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    queryTag: [],
    addTag: {},
    deletTag: {},
    modifyTag: {},
    queryunitTag: [],
    querynum: [],
    currentsession: {},
    addunitTag: {},
    deletunitTag: {},
    modifyunitTag: {},
    modifybeforepublish: {},
    modifyafterpublish: {},
    publishinfo: {},
    workinfo: {},
    queryplan: [],
    tradecenter: [],
    organinfo: [],
    organwatch: [],
    queryorg: [],
    queryextra: {},
    getextra: {},
    addextra: {},
    removextra: {},
    modifyextra: {}
  },
  getters: {
    queryTag: state => state.queryTag,
    addTag: state => state.addTag,
    deletTag: state => state.deletTag,
    modifyTag: state => state.modifyTag,
    queryunitTag: state => state.queryunitTag,
    addunitTag: state => state.addunitTag,
    deletunitTag: state => state.deletunitTag,
    modifyunitTag: state => state.modifyunitTag,
    querynum: state => state.querynum,
    currentsession: state => state.currentsession,
    queryplan: state => state.queryplan,
    publishinfo: state => state.publishinfo,
    modifyafterpublish: state => state.modifyafterpublish,
    workinfo: state => state.workinfo,
    modifybeforepublish: state => state.modifybeforepublish,
    queryextra: state => state.queryextra,
    addextra: state => state.addextra,
    getextra: state => state.getextra,
    removextra: state => state.removextra,
    modifyextra: state => state.modifyextra,
    tradecenter: state => state.tradecenter,
    organinfo: state => state.organinfo,
    organwatch: state => state.organwatch,
    queryorg: state => state.queryorg
  },
  mutations: {
    QUERY_EXAREA_TAG(state, payload) {
      state.queryTag = payload;
    },
    ADD_EXAREA_TAG(state, payload) {
      state.addTag = payload;
    },
    DELET_EXAREA_TAG(state, payload) {
      state.deletTag = payload;
    },
    MODIFY_EXAREA_TAG(state, payload) {
      state.modifyTag = payload;
    },
    QUERY_UNIT_TAG(state, payload) {
      state.queryunitTag = payload;
    },
    ADD_UNIT_TAG(state, payload) {
      state.addunitTag = payload;
    },
    DELET_UNIT_TAG(state, payload) {
      state.deletunitTag = payload;
    },
    MODIFY_UNIT_TAG(state, payload) {
      state.modifyunitTag = payload;
    },
    QUERY_NUM(state, payload) {
      state.querynum = payload;
    },
    CURRENT_SESSION(state, payload) {
      state.currentsession = payload;
    },
    QUERY_PLAN(state, payload) {
      state.queryplan = payload;
    },
    MODIFY_BEFORE_PUBLISH(state, payload) {
      state.modifybeforepublish = payload;
    },
    MODIFY_AFTER_PUBLISH(state, payload) {
      state.modifyafterpublish = payload;
    },
    PUBLISH_INFO(state, payload) {
      state.publishinfo = payload;
    },
    WORKDAY_INFO(state, payload) {
      state.workinfo = payload;
    },
    QUERY_EXTRA(state, payload) {
      state.queryextra = payload;
    },
    GET_EXTRA(state, payload) {
      state.getextra = payload;
    },
    ADD_EXTRA(state, payload) {
      state.addextra = payload;
    },
    REMOVE_EXTRA(state, payload) {
      state.removextra = payload;
    },
    MODIFY_EXTRA(state, payload) {
      state.modifyextra = payload;
    },
    TRADE_CENTER(state, payload) {
      state.tradecenter = payload;
    },
    ORGAN_INFO(state, payload) {
      state.organinfo = payload;
    },
    ORGAN_WATCH(state, payload) {
      state.organwatch = payload;
    },
    QUERY_ORG(state, payload) {
      state.queryorg = payload;
    }
  },
  actions: {
    // ??????????????????
    queryExhAreaTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryExhAreaTag(params.current, params.size);
        promises.then(res => {
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              let newcodes = '';
              if (value.exhibitionAreaCodes) {
                newcodes = $helper.getDicTextInfo(dicData.exhibitionArea, value.exhibitionAreaCodes);
              } else {
                newcodes = '';
              }
              value.exhibitionAreaCodeDetail = newcodes;
              if (value.referredByRule === true) {
                value.canOpration = false;
              } else {
                value.canOpration = true;
              }
            });
          }
          commit('QUERY_EXAREA_TAG', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    addExhAreaTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.addExhAreaTag(params);
        promises.then(res => {
          commit('ADD_EXAREA_TAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    deletExhAreaTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.deletExhAreaTag(params);
        promises.then(res => {
          commit('DELET_EXAREA_TAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    modifyExhAreaTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.modifyExhAreaTag(params);
        promises.then(res => {
          commit('MODIFY_EXAREA_TAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    queryUnitTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryUnitTag(params.current, params.size);
        promises.then(res => {
          // ???????????????
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          let tradeData = [
            {
              value: 'TC1',
              text: '????????????'
            },
            {
              value: 'TD1',
              text: '?????????'
            }
          ];
          let bigData = dicData.companyData.concat(dicData.delegation, dicData.coceral, tradeData);
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              let newIds = '';
              if (value.orgIds) {
                newIds = $helper.getDicTextInfo(bigData, value.orgIds);
              }
              value.orgId = newIds;
              if (value.referredByRule === true) {
                value.canOpration = false;
              } else {
                value.canOpration = true;
              }
            });
          }
          commit('QUERY_UNIT_TAG', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    addUnitTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.addUnitTag(params);
        promises.then(res => {
          commit('ADD_UNIT_TAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    deleteUnitTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.deletUnitTag(params);
        promises.then(res => {
          commit('DELET_UNIT_TAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    modifyUnitTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.modifyUnitTag(params);
        promises.then(res => {
          commit('MODIFY_UNIT_TAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    modifyBeforePublishInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.modifyBeforePublish(params);
        promises.then(res => {
          commit('MODIFY_BEFORE_PUBLISH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    modifyAfterPublishInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.modifyAfterPublish(params);
        promises.then(res => {
          commit('MODIFY_AFTER_PUBLISH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    submithPlanInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.sublishPlan(params);
        promises.then(res => {
          commit('PUBLISH_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    publishPlanInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.publishPlan(params);
        promises.then(res => {
          commit('PUBLISH_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    worksAndDaysInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.worksAndDays(params);
        promises.then(res => {
          commit('WORKDAY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    queryPlanInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryPlan(params.current, params.exhibitionNum, params.size);
        promises.then(res => {
          commit('QUERY_PLAN', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
    query4PlanInfosub({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.query4Plan(params.current, params.exhibitionNum, params.size, params.publishStatus);
        promises.then(res => {
          commit('QUERY_PLAN', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    queryPlanInfoLook({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryPlanLook(params.current, params.exhibitionNum, params.size);
        promises.then(res => {
          commit('QUERY_PLAN', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    queryPlanInfoLookEx({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryPlanLookEx(params.current, params.exhibitionNum, params.size);
        promises.then(res => {
          commit('QUERY_PLAN', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    queryExhibitionNumInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryExhibitionNum();
        promises.then(res => {
          commit('QUERY_NUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    currentSessionInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.currentSession();
        promises.then(res => {
          commit('CURRENT_SESSION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    queryExtraInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryExtra(params.current, params.progressRuleId, params.size);
        promises.then(res => {
          commit('QUERY_EXTRA', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    getExtraInfo({ commit }, progressRuleExtraId) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.getExtra(progressRuleExtraId);
        promises.then(res => {
          commit('GET_EXTRA', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    queryOrgIdByTagInfo({ commit }, unitTag) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryOrgIdByTag(unitTag);
        promises.then(res => {
          commit('QUERY_ORG', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    addExtraInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.addExtra(params);
        promises.then(res => {
          commit('ADD_EXTRA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    removeExtraInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.removeExtra(params);
        promises.then(res => {
          commit('REMOVE_EXTRA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    modifyExtraInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.modifyExtra(params);
        promises.then(res => {
          commit('MODIFY_EXTRA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????-????????????????????????
    queryTradeCenterInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryTradeCenter(params.current, params.exhibitionNum, params.size);
        promises.then(res => {
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          let bigData = dicData.companyData.concat(dicData.delegation, dicData.coceral);
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              let newIds = '';
              if (value.orgId) {
                newIds = $helper.getDicText(bigData, value.orgId);
              } else {
                newIds = '';
              }
              // ??????????????????????????????????????????????????????????????????????????????
              if (value.orgId === 'TD1') {
                newIds = '?????????';
              }
              if (value.orgId === 'TC1') {
                newIds = '????????????';
              }
              value.orgName = newIds;
              value.progressValue = value.progressValue + '%';
            });
          }
          commit('TRADE_CENTER', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????-????????????????????????
    queryOrganizerWatchInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryOrganizerWatch(params.current, params.exhibitionNum, params.orgId, params.size, params.isOnly);
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.progressValue = value.progressValue;
            });
          }
          commit('ORGAN_WATCH', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????-????????????????????????
    queryOrganizerInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryOrganizer(params.current, params.exhibitionNum, params.orgId, params.size);
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.progressValue = value.progressValue + '%';
            });
          }
          commit('ORGAN_INFO', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
