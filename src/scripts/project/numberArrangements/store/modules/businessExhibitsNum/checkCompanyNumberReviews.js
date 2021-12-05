import { checkCompanyNumberReviewsApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    ordinaryAdjustData: {},
    departmentApplyData: {}
  },
  getters: {
    ordinaryAdjustData: state => state.ordinaryAdjustData,
    departmentApplyData: state => state.departmentApplyData
  },
  mutations: {
    ORDINARY_ADJUST_DATA(state, payload) {
      state.ordinaryAdjustData = payload;
    },
    DEPARTMENT_APPLY_DATA(state, payload) {
      state.departmentApplyData = payload;
    }
  },
  actions: {
    // 商会查看展位数量调整申请列表查询
    getOrdinaryAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkCompanyNumberReviewsApi.getOrdinaryAdjustCompanyData(Object).then(res => {
          commit('ORDINARY_ADJUST_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会审核申请
    postCheckByDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkCompanyNumberReviewsApi.postCheckByDelegationData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部查看展位数量调整申请列表查询
    getDepartmentApplyList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkCompanyNumberReviewsApi.getDepartmentApplyListData(Object).then(res => {
          commit('DEPARTMENT_APPLY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部审核企业展位数量调整申请
    postCheckByDepartment({ commit }, Object) {
      return new Promise((resolve, reject) => {
        checkCompanyNumberReviewsApi.postCheckByDepartmentData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
