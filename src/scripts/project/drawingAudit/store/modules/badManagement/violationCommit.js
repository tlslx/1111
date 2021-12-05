import { violationCommitApi } from "../../../apis";
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    violationCommitList: [],
    violationCommitCol: {}
  },
  getters: {
    // 违规报告表格集合
    violationCommitList: state => state.violationCommitList,
    // 单行违规报告数据
    violationCommitCol: state => state.violationCommitCol
  },
  mutations: {
    // 违规报告表格集合
    VIOLATION_COMMIT_LIST(state, payload) {
      state.violationCommitList = payload;
    },
    // 单行违规报告数据
    VIOLATION_COMMIT_COL(state, payload) {
      state.violationCommitCol = payload;
    }
  },
  actions: {
    // 获取违规报告表格集合
    getViolationCommitList({ commit }, params) {
      return new Promise((resolve, reject) => {
        violationCommitApi
          .getViolationRecordPage(utility.urlEncode(JSON.stringify(params)))
          .then(res => {
            if (res && res.records.length > 0) {
              res.records.forEach((value, index) => {
                value.sequenceNum = res.current + index;
              });
              commit("VIOLATION_COMMIT_LIST", res.records);
            }
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 获取单行违规报告数据
    getOneLineViolationCommit({ commit }, params) {
      return new Promise((resolve, reject) => {
        violationCommitApi
          .getViolationRecordById(params)
          .then(res => {
            if (res) {
              commit("VIOLATION_COMMIT_COL", res);
            }
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    // 新增违规报告
    addViolationCommit({ commit }, params) {
      return new Promise((resolve, reject) => {
        violationCommitApi
          .addViolationRecord(params)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
