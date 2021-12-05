import { workDepartReturnApi } from "../../../apis";
import { $helper } from '../../../../utils';
export default {
  namespaced: true,
  state: {
    returnBoothData: {},
    boothReorderData: {},
    arrangedBoothReorder: {},
    selectNumberArrangedList: {},
    rescheduleInfoData: {},
    companyInfoData: {},
    arrangableBoothData: {},
    boothSumData: {},
    boothArrangeNum: {},
    candiSortData: {},
    scoreComparData: {},
    adjustmentArrangeInfoData: {},
    checkBrandBoothPlan: {},
    selectRescheduleList: {}
  },
  getters: {
    returnBoothData: state => state.returnBoothData,
    boothReorderData: state => state.boothReorderData,
    arrangedBoothReorder: state => state.arrangedBoothReorder,
    rescheduleInfoData: state => state.rescheduleInfoData,
    selectNumberArrangedList: state => state.selectNumberArrangedList,
    companyInfoData: state => state.companyInfoData,
    arrangableBoothData: state => state.arrangableBoothData,
    boothSumData: state => state.boothSumData,
    boothArrangeNum: state => state.boothArrangeNum,
    candiSortData: state => state.candiSortData,
    scoreComparData: state => state.scoreComparData,
    adjustmentArrangeInfoData: state => state.adjustmentArrangeInfoData,
    checkBrandBoothPlan: state => state.checkBrandBoothPlan,
    selectRescheduleList: state => state.selectRescheduleList
  },
  mutations: {
    RETURN_BOOTH_DATA(state, payload) {
      state.returnBoothData = payload;
    },
    BOOTH_REORDER_DATA(state, payload) {
      state.boothReorderData = payload;
    },
    ARRANGED_BOOTH_REORDER_DATA(state, payload) {
      state.arrangedBoothReorder = payload;
    },
    SELECT_NUMBER_ARRANGED_LIST_DATA(state, payload) {
      state.selectNumberArrangedList = payload;
    },

    RESCHEDULE_INFO_DATA(state, payload) {
      state.rescheduleInfoData = payload;
    },
    COMPANY_INFO_DATA(state, payload) {
      state.companyInfoData = payload;
    },
    ARRANGABLE_BOOTH_DATA(state, payload) {
      state.arrangableBoothData = payload;
    },
    BOOTH_SUM_DATA(state, payload) {
      state.boothSumData = payload;
    },
    BOOTH_ARRANGE_NUM(state, payload) {
      state.boothArrangeNum = payload;
    },
    CANDI_SORT_DATA(state, payload) {
      state.candiSortData = payload;
    },
    SCORE_COMPAR_DATA(state, payload) {
      state.scoreComparData = payload;
    },
    ADJUSTMENT_ARRANGE_INFO_DATA(state, payload) {
      state.adjustmentArrangeInfoData = payload;
    },
    CHECK_BRAND_BOOTH_PLAN(state, payload) {
      state.checkBrandBoothPlan = payload;
    },
    SELECT_RESCHEDULE_LIST(state, payload) {
      state.selectRescheduleList = payload;
    }
  },
  actions: {
    // 外贸司查看商协会评审
    getReturnBooth({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getReturnBoothData(Object).then(res => {
          commit('RETURN_BOOTH_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 各展区重新安排展位数清单
    getBoothReorder({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getBoothReorderData(Object).then(res => {
          commit('BOOTH_REORDER_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          // 获取商协会选择数据
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //查看待安排展位数
    getSelectNumberArrangedList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getSelectNumberArrangedListData(Object).then(res => {
          commit('SELECT_NUMBER_ARRANGED_LIST_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 各展区待安排展位数清单
    getArrangedBoothReorder({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getSelectNumberAffirmList(Object).then(res => {
          commit('ARRANGED_BOOTH_REORDER_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // 获取展期选择数据
          res.exhibitionPeriodOpts = $helper.filterDataToSelect(res.records, 'exhibitionPeriod', 'exhibitionPeriod');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部生成统计汇总表
    getReturnBoothSumInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getReturnBoothSummaryInfoData(Object).then(res => {
          commit('BOOTH_SUM_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // 获取展期选择数据
          res.exhibitionPeriodOpts = $helper.filterDataToSelect(res.records, 'exhibitionPeriod', 'exhibitionPeriod');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          // 获取商协会选择数据
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 重新安排方案查询
    getRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getRescheduleInfoData(Object).then(res => {
          commit('RESCHEDULE_INFO_DATA', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          // 获取交易团选择数据
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 拟定企业信息查询
    getCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getCompanyInfoData(Object).then(res => {
          commit('COMPANY_INFO_DATA', res);
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res, 'companyId', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取可安排展位数
    getArrangableBooth({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getArrangableBoothData(Object).then(res => {
          commit('ARRANGABLE_BOOTH_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 重新安排方案添加
    postAddRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postAddRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改重新安排方案
    postUpdateRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postUpdateRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除安排方案
    getDelRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getDelRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 提交重新安排方案
    postSubmitRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postSubmitRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据展区查询重新安排展位数量信息
    getBoothArrangeNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getBoothArrangeNumberData(Object).then(res => {
          commit('BOOTH_ARRANGE_NUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询各展区品牌候选企业排序表
    postCandidateSortInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postCandidateSortInfoData(Object).then(res => {
          commit('CANDI_SORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 未安排企业评分比对表
    getScoreComparisonInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getScoreComparisonInfoData(Object).then(res => {
          commit('SCORE_COMPAR_DATA', res);
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 当届调整安排表信息
    getAdjustmentArrangeInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getAdjustmentArrangeInfoData(Object).then(res => {
          commit('ADJUSTMENT_ARRANGE_INFO_DATA', res);
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部复核品牌展位调整安排方案
    getCheckBrandBoothPlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getCheckBrandBoothPlanData(Object).then(res => {
          commit('CHECK_BRAND_BOOTH_PLAN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 复核
    postCheckBrandBoothPlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postCheckBrandBoothPlanData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部发外贸司审定
    postSendTradeCheck({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postSendTradeCheckData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 返回前台页面需要的展届数
    getexhibitionSession({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getExhibitionSession(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司审定查询
    getSelectRescheduleList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getSelectRescheduleListData(Object).then(res => {
          commit('SELECT_RESCHEDULE_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司审定提交
    postSelectRescheduleList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postSelectRescheduleList(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
