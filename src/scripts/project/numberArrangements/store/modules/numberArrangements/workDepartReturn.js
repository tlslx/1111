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
    // ??????????????????????????????
    getReturnBooth({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getReturnBoothData(Object).then(res => {
          commit('RETURN_BOOTH_DATA', res);
          // ????????????????????????
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // ????????????????????????
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          // ???????????????????????????
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    getBoothReorder({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getBoothReorderData(Object).then(res => {
          commit('BOOTH_REORDER_DATA', res);
          // ????????????????????????
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // ????????????????????????
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          // ???????????????????????????
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          // ???????????????????????????
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //????????????????????????
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
    // ?????????????????????????????????
    getArrangedBoothReorder({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getSelectNumberAffirmList(Object).then(res => {
          commit('ARRANGED_BOOTH_REORDER_DATA', res);
          // ????????????????????????
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // ????????????????????????
          res.exhibitionPeriodOpts = $helper.filterDataToSelect(res.records, 'exhibitionPeriod', 'exhibitionPeriod');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    getReturnBoothSumInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getReturnBoothSummaryInfoData(Object).then(res => {
          commit('BOOTH_SUM_DATA', res);
          // ????????????????????????
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // ????????????????????????
          res.exhibitionPeriodOpts = $helper.filterDataToSelect(res.records, 'exhibitionPeriod', 'exhibitionPeriod');
          // ???????????????????????????
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          // ???????????????????????????
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getRescheduleInfoData(Object).then(res => {
          commit('RESCHEDULE_INFO_DATA', res);
          // ????????????????????????
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // ????????????????????????
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          // ???????????????????????????
          res.dealClusterOpts = $helper.filterDataToSelect(res.records, 'dealClusterId', 'dealClusterName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getCompanyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getCompanyInfoData(Object).then(res => {
          commit('COMPANY_INFO_DATA', res);
          // ????????????????????????
          res.companyOpts = $helper.filterDataToSelect(res, 'companyId', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
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
    // ????????????????????????
    postAddRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postAddRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    postUpdateRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postUpdateRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    getDelRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getDelRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    postSubmitRescheduleInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postSubmitRescheduleInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????
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
    // ??????????????????????????????????????????
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
    // ??????????????????????????????
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
    // ???????????????????????????
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
    // ?????????????????????????????????????????????
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
    // ??????
    postCheckBrandBoothPlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postCheckBrandBoothPlanData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    postSendTradeCheck({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.postSendTradeCheckData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????
    getexhibitionSession({ commit }, Object) {
      return new Promise((resolve, reject) => {
        workDepartReturnApi.getExhibitionSession(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????
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
    // ?????????????????????
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
