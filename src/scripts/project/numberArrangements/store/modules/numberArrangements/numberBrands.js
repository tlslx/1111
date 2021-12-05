import { numberBrandsApi } from "../../../apis";
import { $helper } from '../../../../utils';
export default {
  namespaced: true,
  state: {
    foreignTradeData: {},
    deadlineDate: {},
    depositInfo: {},
    getBackConfirm: {},
    seeBackBoothsList: {},
    getExplainSetText: {},
    fileUploadId: {}
  },
  getters: {
    foreignTradeData: state => state.foreignTradeData,
    deadlineDate: state => state.deadlineDate,
    depositInfo: state => state.depositInfo,
    getBackConfirm: state => state.getBackConfirm,
    seeBackBoothsList: state => state.seeBackBoothsList,
    getExplainSetText: state => state.getExplainSetText,
    fileUploadId: state => state.fileUploadId
  },
  mutations: {
    FOREIGN_TRADE_DATA(state, payload) {
      state.foreignTradeData = payload;
    },
    DEADLINE_DATE(state, payload) {
      state.deadlineDate = payload;
    },
    DEPOSIT_INFO(state, payload) {
      state.depositInfo = payload;
    },
    GET_BACK_CONFIRM(state, payload) {
      state.getBackConfirm = payload;
    },
    SEE_BACK_BOOTHS_LIST(state, payload) {
      state.seeBackBoothsList = payload;
    },
    GET_EXPLAIN_SET_TEXT(state, payload) {
      state.getExplainSetText = payload;
    },
    FILE_UPLOAD_ID(state, payload) {
      state.fileUploadId = payload;
    }
  },
  actions: {
    // 外贸司查看商协会评审
    getSchemeForeignTrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.getSchemeForeignTradeData(Object).then(res => {
          commit('FOREIGN_TRADE_DATA', res);
          // 获取商协会选择数据
          res.coceralOpts = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
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
    // 外贸司公布品牌数量安排方案截止时间
    getDeadlineDate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.getDeadlineDateData(Object).then(res => {
          commit('DEADLINE_DATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 保存品牌企业展位数
    postBrandNumEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.postBrandNumEditData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公布方案结果
    postSchemePublishAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.postSchemePublishAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团收取企业定金情况列表
    getDepositInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.getDepositInfoData(Object).then(res => {
          commit('DEPOSIT_INFO', res);
          // 获取广交会编码选择数据
          res.cantonFairCodeOpts = $helper.filterDataToSelect(res.records, 'cantonFairCode', 'cantonFairCode');
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
    // 交易团提交收取企业定金情况
    postDepositInfoEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.postDepositInfoEditData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团获取退回确认书
    postBackConfirm({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.postBackConfirmData(Object).then(res => {
          commit('GET_BACK_CONFIRM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取注意书注意事项
    getExplainSet({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.getExplainSetData(Object).then(res => {
          commit('GET_EXPLAIN_SET_TEXT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团提交退回确认书
    postAddBackConfirm({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.postAddBackConfirmData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团查看退回展位列表
    getSeeBackBoothsList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.getSeeBackBoothsListData(Object).then(res => {
          commit('SEE_BACK_BOOTHS_LIST', res);
          // 获取展区选择数据
          res.exhibitionAreaOpts = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          // 获取广交会编码选择数据
          res.cantonFairCodeOpts = $helper.filterDataToSelect(res.records, 'cantonFairCode', 'cantonFairCode');
          // 获取企业选择数据
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 附件上传
    postFileUpload({ commit }, Object) {
      return new Promise((resolve, reject) => {
        numberBrandsApi.postFileUploadData(Object).then(res => {
          commit('FILE_UPLOAD_ID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
