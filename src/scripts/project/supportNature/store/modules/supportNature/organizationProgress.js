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
    // 查询展区标签
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
    // 新增展区标签
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
    // 删除展区标签
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
    // 修改展区标签
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
    // 查询组展标签
    queryUnitTagInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = organizationProgressApi.queryUnitTag(params.current, params.size);
        promises.then(res => {
          // 字典假数据
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          let tradeData = [
            {
              value: 'TC1',
              text: '外贸中心'
            },
            {
              value: 'TD1',
              text: '外贸司'
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
    // 新增组展标签
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
    // 删除组展标签
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
    // 修改组展标签
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
    // 发布前修改进度计划规则
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
    // 发布后修改进度计划规则
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
    // 提交进度计划规则
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
    // 发布进度计划规则
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
    // 计算工作日和自然日
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
    // 查询进度计划
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
    // 查询已提交计划
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
    // 查询进度计划查看
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
    // 查询特例进度计划查看
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
    // 查询进度计划规则的届数
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
    // 查询进度计划规则的届数
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
    // 查询特例列表
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
    // 查询特例详情
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
    // 查询特例组展标签
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
    // 新增特例
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
    // 删除特例
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
    // 修改特例
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
    // 外贸中心-查看组展进度计划
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
              // 外贸中心外贸司的值暂时没有具体规定，后期可与后台商议
              if (value.orgId === 'TD1') {
                newIds = '外贸司';
              }
              if (value.orgId === 'TC1') {
                newIds = '外贸中心';
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
    // 组展单位-查看组展进度计划
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
    // 组展单位-查看当前进度计划
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
