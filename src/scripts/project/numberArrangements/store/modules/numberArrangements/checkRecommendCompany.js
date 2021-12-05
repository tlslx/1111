import { checkRecommendCompanyApi } from "../../../apis";
import { $helper } from '../../../../utils';
export default {
  namespaced: true,
  state: {
    confirmCompanyInfoData: {},
    queryCondition: {},
    companyAptitudeData: {},
    companyInfoData: {},
    motherChildRelationData: {},
    motherChildRelationList: {},
    evaluationResultQueryData: {},
    evaluationResultData: {},
    submitPlanQueryData: {},
    submitPlanData: {},
    lastSaveDate: {},
    diffRatioQueryData: {},
    diffRatioData: {},
    uploadCci: [],
    uploadMcr: [],
    uploadCcr: []
  },
  getters: {
    confirmCompanyInfoData: state => state.confirmCompanyInfoData,
    queryCondition: state => state.queryCondition,
    companyAptitudeData: state => state.companyAptitudeData,
    companyInfoData: state => state.companyInfoData,
    motherChildRelationData: state => state.motherChildRelationData,
    motherChildRelationList: state => state.motherChildRelationList,
    evaluationResultQueryData: state => state.evaluationResultQueryData,
    evaluationResultData: state => state.evaluationResultData,
    submitPlanQueryData: state => state.submitPlanQueryData,
    submitPlanData: state => state.submitPlanData,
    lastSaveDate: state => state.lastSaveDate,
    diffRatioQueryData: state => state.diffRatioQueryData,
    diffRatioData: state => state.diffRatioData,
    uploadCci: state => state.uploadCci,
    uploadMcr: state => state.uploadMcr,
    uploadCcr: state => state.uploadCcr
  },
  mutations: {
    CONFIRM_COMPANY_INFO_DATA(state, payload) {
      state.confirmCompanyInfoData = payload;
    },
    QUERY_CONDITION(state, payload) {
      state.queryCondition = payload;
    },
    COMPANY_APTITUDE_DATA(state, payload) {
      state.companyAptitudeData = payload;
    },
    COMPANY_INFO_DATA(state, payload) {
      state.companyInfoData = payload;
    },
    MOTHER_CHILD_RELATION_DATA(state, payload) {
      state.motherChildRelationData = payload;
    },
    MOTHER_CHILD_RELATION_LIST(state, payload) {
      state.motherChildRelationList = payload;
    },
    EVALUATION_RESULT_QUERY_DATA(state, payload) {
      state.evaluationResultQueryData = payload;
    },
    EVALUATION_RESULT_DATA(state, payload) {
      state.evaluationResultData = payload;
    },
    SUBMIT_PLAN_QUERY_DATA(state, payload) {
      state.submitPlanQueryData = payload;
    },
    SUBMIT_PLAN_DATA(state, payload) {
      state.submitPlanData = payload;
    },
    LAST_SAVE_DATE(state, payload) {
      state.lastSaveDate = payload;
    },
    DIFF_RATIO_QUERY_DATA(state, payload) {
      state.diffRatioQueryData = payload;
    },
    DIFF_RATIO_DATA(state, payload) {
      state.diffRatioData = payload;
    },
    UPLOAD_CCI(state, payload) {
      state.uploadCci = payload;
    },
    UPLOAD_MCR(state, payload) {
      state.uploadMcr = payload;
    },
    UPLOAD_CCR(state, payload) {
      state.uploadCcr = payload;
    }
  },
  actions: {
    // 外贸司查看商协会评审
    getConfirmCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getConfirmCompanyInfoData(Object).then(res => {
          commit('CONFIRM_COMPANY_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会审核交易团通过的申请企业信息列表的搜索条件信息
    getQueryCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getQueryConditionData(Object).then(res => {
          commit('QUERY_CONDITION', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.companyInfoCondition, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res.companyInfoCondition, 'companyCode', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res.companyInfoCondition, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核通过或不通过企业申请
    postConCompanyScoreUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postConCompanyScoreUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业资料
    getCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getCompanyInfoData(Object).then(res => {
          commit('COMPANY_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核企业资质列表
    postConCompanyAptitudeQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postConCompanyAptitudeQueryData(Object).then(res => {
          commit('COMPANY_APTITUDE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会登记企业母子关系及类别表获取查询条件
    getMotherChildRelationCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getMotherChildRelationConditionData(Object).then(res => {
          commit('MOTHER_CHILD_RELATION_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionArea');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res, 'companyName', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会登记企业母子关系及类别表（分页）
    getMotherChildRelationList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getMotherChildRelationListData(Object).then(res => {
          commit('MOTHER_CHILD_RELATION_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会登记
    postMotherChildRelationshipAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postMotherChildRelationshipAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会编辑
    postMotherChildRelationshipUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postMotherChildRelationshipUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会删除
    postMotherChildRelationshipDelete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postMotherChildRelationshipDeleteData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会公示或撤回公示登记企业母子关系及类别
    postCoceralGradeUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postCoceralGradeUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会提交企业评分结果查询条件
    getSubmitEvaluationResultQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getSubmitEvaluationResultQueryData(Object).then(res => {
          commit('EVALUATION_RESULT_QUERY_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res, 'companyCode', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会提交企业评分结果
    getSubmitEvaluationResult({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getSubmitEvaluationResultData(Object).then(res => {
          commit('EVALUATION_RESULT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 提交企业评分结果
    postSubmitScoreResult({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postSubmitScoreResultData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看商协会提交方案（分页）查询条件
    getSeeSubmitPlanQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getSeeSubmitPlanQueryData(Object).then(res => {
          commit('SUBMIT_PLAN_QUERY_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res, 'companyCode', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          // 获取商协会选择数据
          res.coceralOpts = $helper.filterDataToSelect(res, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看商协会提交方案（分页）
    getSeeSubmitPlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getSeeSubmitPlanData(Object).then(res => {
          commit('SUBMIT_PLAN_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取上次保存时间
    getLastSaveTime({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getLastSaveTimeData(Object).then(res => {
          commit('LAST_SAVE_DATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部保存方案
    postWorkDeptSave({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.postWorkDeptSaveData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看商协会方案对比差异（分页）查询条件
    getContrastDiffRatioQuery({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getContrastDiffRatioQueryData(Object).then(res => {
          commit('DIFF_RATIO_QUERY_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res, 'companyCode', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res, 'dealClusterId', 'dealClusterName');
          // 获取商协会选择数据
          res.coceralOpts = $helper.filterDataToSelect(res, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看商协会方案对比差异（分页）
    getContrastDiffRatio({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.getContrastDiffRatioData(Object).then(res => {
          commit('DIFF_RATIO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核申请企业信息 上传
    uploadconfirmCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.uploadConfirmCompanyInfo(Object).then(res => {
          commit('UPLOAD_CCI', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 登记企业母子关系及类别表 上传
    uploadmotherChildRelation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.uploadMotherChildRelation(Object).then(res => {
          commit('UPLOAD_MCR', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 提交企业评分结果 上传
    uploadconfirmCompanyResult({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkRecommendCompanyApi.uploadConfirmCompanyResult(Object).then(res => {
          commit('UPLOAD_CCR', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
