import { onlineServiceHomePageApi } from '../../apis';
export default {
  namespaced: true,
  state: {
    reviewResults: {},
    boothApplyAndAuditData: [],
    numAndBoothRangeData: []
  },
  getters: {
    reviewResults: state => state.reviewResults,
    boothApplyAndAuditData: state => state.boothApplyAndAuditData,
    numAndBoothRangeData: state => state.numAndBoothRangeData
  },
  mutations: {
    GET_REVIEW_RESULTS(state, payload) {
      state.reviewResults = payload;
    },
    GET_BOOTH_AND_AUDIT_INFO(state, payload) {
      state.boothApplyAndAuditData = payload;
    },
    GET_NUM_AND_BOOTH_ARRANGE(state, payload) {
      state.numAndBoothRangeData = payload;
    }
  },
  actions: {
    // 交易团审核企业资料状态
    getReviewResultInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = onlineServiceHomePageApi.selectReviewResult(params);
        promises.then(res => {
          if (res.reviewResult === '1') {
            res.reviewResult = '通过';
          } else if (res.reviewResult === '0') {
            res.reviewResult = '不通过';
          } else if (res.reviewResult === '3') {
            res.reviewResult = '资料未更新';
          } else if (res.reviewResult == null || res.reviewResult === 'null') {
            res.reviewResult = '可审核';
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位申请、审核
    getBoothAndAuditInfo({ commit }, params) {
      let currentParams = { companyId: params };
      return new Promise((resolve, reject) => {
        const promises = onlineServiceHomePageApi.getOrdinaryArrangeCompanyRecord(currentParams);
        promises.then(res => {
          if (res && res.length > 0) {
            res.forEach((value) => {
              // 处理展位申请审核状态
              if (value.checkExamineStatus === '0') {
                value.checkExamineStatus = '未审核';
              } else if (value.checkExamineStatus === '1') {
                value.checkExamineStatus = '审核通过';
              } else if (value.checkExamineStatus === '2') {
                value.checkExamineStatus = '审核不通过';
              } else if (value.checkExamineStatus === '3') {
                value.checkExamineStatus = '审核中';
              }
              // 联营企业名称（状态）转换
              let unionExamineStatus = [];
              if (value.ordinaryCompanyUnionList && value.ordinaryCompanyUnionList.length > 0) {
                let status = '';
                for (let i = 0; i < value.ordinaryCompanyUnionList.length; i++) {
                  if (value.ordinaryCompanyUnionList[i].examineStatus === "0") {
                    status = '未审核';
                  } else if (value.ordinaryCompanyUnionList[i].examineStatus === "1") {
                    status = '通过';
                  } else if (value.ordinaryCompanyUnionList[i].examineStatus === "2") {
                    status = '不通过';
                  }
                  unionExamineStatus.push(value.ordinaryCompanyUnionList[i].unionName + '(' + status + ')');
                }
              }
              value.unionExamineStatus = unionExamineStatus;
            });
          }
          commit('GET_BOOTH_AND_AUDIT_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展位申请、审核
    getNumAndBoothArrangeInfo({ commit }, params) {
      let currentParams = { companyId: params };
      return new Promise((resolve, reject) => {
        const promises = onlineServiceHomePageApi.getOrdinaryArrangeCompanyResult(currentParams);
        promises.then(res => {
          if (res && res.length > 0) {
            commit('GET_NUM_AND_BOOTH_ARRANGE', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
