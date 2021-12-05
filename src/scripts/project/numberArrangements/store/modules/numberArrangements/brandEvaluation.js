import { brandEvaluationApi } from '../../../apis';
import { $helper } from '../../../../utils';

export default {
  namespaced: true,
  state: {
    reviewInfoList: {}, // 待交易团品牌评审信息列表
    filterList: {}, // 筛选条件配置
    configItem: {}, // 获取配置项
    businessList: {} // 获取商协会与展区
  },
  getters: {
    reviewInfoList: state => state.reviewInfoList, // 待交易团品牌评审信息列表
    filterList: state => state.filterList, // 筛选条件配置
    configItem: state => state.configItem, // 获取配置项
    businessList: state => state.businessList // 获取商协会与展区
  },
  mutations: {
    REVIEW_INFO_LIST(state, payload) {
      state.reviewInfoList = payload;
    },
    FILTER_LIST(state, payload) {
      state.filterList = payload;
    },
    CONFIG_ITEM(state, payload) {
      state.configItem = payload;
    },
    BUSINESS_LIST(state, payload) {
      state.businessList = payload;
    }
  },
  actions: {
    // 待交易团品牌评审信息列表
    getReviewInfoList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.getReviewInfoListData(Object).then(res => {
          commit('REVIEW_INFO_LIST', res);
          res.companyList = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 待交易团品牌评审在线打分(添加)
    postOnlineAddScore({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.postOnlineAddScoreData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 待交易团品牌评审在线打分(更新)
    postOnlineScore({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.postOnlineScoreData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团推荐品牌企业筛选条件配置查询
    getReviewFilterList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.getReviewFilterListData(Object).then(res => {
          commit('FILTER_LIST', res);
          let queryArr = [];
          for (let i = 0; i < res.records.length; i++) {
            let queryData = {};
            queryData.value = res.records[i].configId;
            queryData.label = res.records[i].itemName;
            queryArr.push(queryData);
          }
          res.configIdList = queryArr;
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团推荐品牌企业筛选条件配置 -- 编辑保存
    postReviewFilterUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.postReviewFilterUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团提交推荐方案获取配置项
    getConfigItem({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.getConfigItemData(Object).then(res => {
          commit('CONFIG_ITEM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团提交推荐方案查询
    getBusinessList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.getBusinessListData(Object).then(res => {
          commit('BUSINESS_LIST', res);
          res.businessList = $helper.filterDataToSelect(res.records, 'coceralId', 'coceralName');
          res.areaList = $helper.filterDataToSelect(res.records, 'exhibitionArea', 'exhibitionAreaName');
          res.companyOpts = $helper.filterDataToSelect(res.records, 'companyId', 'companyName');
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团提交推荐方案 提交推荐方案
    postSubmitRecommend({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandEvaluationApi.postSubmitRecommendData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
