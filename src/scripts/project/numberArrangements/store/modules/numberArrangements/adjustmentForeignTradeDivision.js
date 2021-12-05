import { adjustmentForeignTradeDivisionApi } from "../../../apis";
import { $helper } from '../../../../utils';

export default {
  namespaced: true,
  state: {
    rescheduleListQuery: {},
    rescheduleList: {},
    examineResultQueryData: {},
    examineResultData: {},
    foreignSummaryQueryData: {},
    foreignSummaryData: {},
    publishConditionQueryData: {},
    publishConditionData: {},
    dealFeedbackQuery: {},
    dealFeedback: {},
    publicityDate: {},
    publicityAdd: {}
  },
  getters: {
    rescheduleListQuery: state => state.rescheduleListQuery,
    rescheduleList: state => state.rescheduleList,
    examineResultQueryData: state => state.examineResultQueryData,
    examineResultData: state => state.examineResultData,
    foreignSummaryQueryData: state => state.foreignSummaryQueryData,
    foreignSummaryData: state => state.foreignSummaryData,
    publishConditionQueryData: state => state.publishConditionQueryData,
    publishConditionData: state => state.publishConditionData,
    dealFeedbackQuery: state => state.dealFeedbackQuery,
    dealFeedback: state => state.dealFeedback,
    publicityDate: state => state.publicityDate,
    publicityAdd: state => state.publicityAdd
  },
  mutations: {
    RESCHEDULE_LIST(state, payload) {
      state.rescheduleList = payload;
    },
    RESCHEDULE_LIST_QUERY(state, payload) {
      state.rescheduleListQuery = payload;
    },
    EXAMINE_RESULT_QUERY_DATA(state, payload) {
      state.examineResultQueryData = payload;
    },
    EXAMINE_RESULT_DATA(state, payload) {
      state.examineResultData = payload;
    },
    FOREIGN_SUMMARY_QUERY_DATA(state, payload) {
      state.foreignSummaryQueryData = payload;
    },
    FOREIGN_SUMMARY_DATA(state, payload) {
      state.foreignSummaryData = payload;
    },
    PUBLISH_CONDITION_QUERY_DATA(state, payload) {
      state.publishConditionQueryData = payload;
    },
    PUBLISH_CONDITION_DATA(state, payload) {
      state.publishConditionData = payload;
    },
    DEAL_FEEDBACK_QUERY(state, payload) {
      state.dealFeedbackQuery = payload;
    },
    DEAL_FEEDBACK(state, payload) {
      state.dealFeedback = payload;
    },
    PUBLICITYDATE(state, payload) {
      state.publicityDate = payload;
    },
    PUBLICITYADD(state, payload) {
      state.publicityAdd = payload;
    }
  },
  actions: {
    // 外贸司批复经外贸中心复核的展位数量调整安排方案中提交重新安排(分页)查询条件
    getRescheduleListQueryPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getRescheduleListQueryPageData(Object).then(res => {
          commit('RESCHEDULE_LIST_QUERY', res);
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          res.companyOpts = $helper.filterDataToSelect(res, 'companyCode', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司批复经外贸中心复核的展位数量调整安排方案中提交重新安排(分页)
    getRescheduleListPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getRescheduleListPageData(Object).then(res => {
          commit('RESCHEDULE_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 提交批复结果
    postRescheduleUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postRescheduleUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //外贸司审批并公示安排结果(分页)查询条件
    getExamineResultQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getExamineResultQueryData(Object).then(res => {
          commit('EXAMINE_RESULT_QUERY_DATA', res);
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          res.coceralOpts = $helper.filterDataToSelect(res, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //外贸司审批并公示安排结果(分页)
    getExamineResult({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getExamineResultData(Object).then(res => {
          commit('EXAMINE_RESULT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司编辑保存公布方案
    postExamineUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postExamineUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 点击公示，选择发布平台并确认
    postPublicityAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postPublicityAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司汇总并公示意见表(分页)查询条件
    getForeignSummaryQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getForeignSummaryQueryData(Object).then(res => {
          commit('FOREIGN_SUMMARY_QUERY_DATA', res);
          res.exhibitionAreaOptsT = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOptsT = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          res.coceralOptsT = $helper.filterDataToSelect(res, 'coceralId', 'coceralName');
          res.companyOptsT = $helper.filterDataToSelect(res, 'companyCode', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司汇总并公示意见表(分页)
    getForeignSummary({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getForeignSummaryData(Object).then(res => {
          commit('FOREIGN_SUMMARY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 返还商协会
    postReturnAssoUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postReturnAssoUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司公布方案查询条件
    getPublishConditionQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getPublishConditionQueryData(Object).then(res => {
          commit('PUBLISH_CONDITION_QUERY_DATA', res);
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          res.coceralOpts = $helper.filterDataToSelect(res, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司公布方案
    getPublishCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getPublishConditionData(Object).then(res => {
          commit('PUBLISH_CONDITION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司编辑保存公布方案
    postPublishUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postPublishUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 点击公示，选择发布平台并确认
    postPublishAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postPublishAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 登记反馈意见查询条件
    getDealFeedbackConditionQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getDealFeedbackConditionQueryData(Object).then(res => {
          commit('DEAL_FEEDBACK_QUERY', res);
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          res.coceralOpts = $helper.filterDataToSelect(res, 'coceralId', 'coceralName');
          res.companyOpts = $helper.filterDataToSelect(res, 'companyCode', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 登记反馈意见查询
    getDealFeedbackCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getDealFeedbackConditionData(Object).then(res => {
          commit('DEAL_FEEDBACK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增反馈意见
    postDealFeedbackAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postDealFeedbackAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑反馈意见
    postDealFeedbackUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postDealFeedbackUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除反馈意见
    postDealFeedbackDelete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.postDealFeedbackDeleteData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 外贸司审批并公示安排结果(公式接口)
    getPublicityDate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getpublicityDate(Object).then(res => {
          commit('PUBLICITYDATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 外贸司审批并公示安排结果(公式接口)
    getPublishAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        adjustmentForeignTradeDivisionApi.getpublishAdd(Object).then(res => {
          commit('PUBLICITYADD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
