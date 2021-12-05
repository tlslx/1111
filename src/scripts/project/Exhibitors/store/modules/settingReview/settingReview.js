// 进口展招展-审核企业修改记录
import { settingReviewApi } from '../../../apis';
// const API_POT_URL = process.env.API_POT_URL;
export default {
  namespaced: true,
  state: {
    coHistoryListData: {},
    historyModifyDetailData: {}
  },
  getters: {
    coHistoryListData: state => state.coHistoryListData,
    historyModifyDetailData: state => state.historyModifyDetailData
  },
  actions: {
    // 审核企业重要列表
    getCoHistoryList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = settingReviewApi.coHistoryList(params);
        promises.then(res => {
          let records = res.records;
          records.forEach(value => {
            let approveStatus = value.approveStatus;
            let finalApproveStatus = value.finalApproveStatus;
            value.status = '';
            if (approveStatus === '0' || approveStatus === '1') {
              switch (approveStatus) {
                case '0':
                  value.status = '未审核';
                  return;
                case '1':
                  value.status = '不通过';
                  return;
                default: '';
              }
            } else if (approveStatus === '2') {
              switch (finalApproveStatus) {
                case '0':
                  value.status = '初审审核';
                  return;
                case '1':
                  value.status = '不通过';
                  return;
                case '2':
                  value.status = '审核通过';
                  return;
                default: '';
              }
            } else {
              value.status = '';
            }
          });
          commit('REVIEW_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核企业修改记录详情
    getHistoryModifyDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = settingReviewApi.historyModifyDetail(params);
        promises.then(res => {
          let obj = {};
          let colnameChOpt = [];
          if (res.length > 0) {
            res.forEach(ele => {
              colnameChOpt.push({ value: ele.colname, label: ele.colnameCh });
            });
          }
          obj.colnameChOpt = colnameChOpt;
          obj.res = res;
          commit('MOD_RECORDS_DETIAL_LIST', obj);
          resolve(obj);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核企业重要列表
    postApproveCoModify({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = settingReviewApi.approveCoModify(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    REVIEW_LIST(state, payload) {
      state.coHistoryListData = payload;
    },
    MOD_RECORDS_DETIAL_LIST(state, payload) {
      state.historyModifyDetailData = payload;
    }
  }
};
