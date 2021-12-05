import { managemenApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    // 展品数据审核页面（展示审核数据）
    getExhibitPage: [],
    // 审核
    getExhibitAudit: [],
    // 获取审核不通过原因列表
    getApproved: [],
    // 新增审核不通过原因
    postAuditoved: [],
    // 获取修改详情页面
    getModifica: [],
    // 获取修改详情页面(提交)
    postModificaSubmit: [],
    // 审核统计查询
    getStatistics: [],
    // 检查敏感词
    getSensitive: []
  },
  getters: {
    // 展品数据审核页面（展示审核数据）
    getExhibitPage: state => state.getExhibitPage,
    // 审核
    getExhibitAudit: state => state.getExhibitAudit,
    // 获取审核不通过原因列表
    getApproved: state => state.getApproved,
    // 新增审核不通过原因
    postAuditoved: state => state.postAuditoved,
    // 获取修改详情页面
    getModifica: state => state.getModifica,
    // 获取修改详情页面(提交)
    postModificaSubmit: state => state.postModificaSubmit,
    // 审核统计查询
    getStatistics: state => state.getStatistics,
    // 检查敏感词
    getSensitive: state => state.getSensitive
  },
  mutations: {
    // 展品数据审核页面（展示审核数据）
    EXHIBIT_PAGE(state, payload) {
      state.getExhibitPage = payload;
    },
    // 审核
    EXHIBIT_AUDIT(state, payload) {
      state.getExhibitAudit = payload;
    },
    // 获取审核不通过原因列表
    EXHIBIT_APPROVED(state, payload) {
      state.getApproved = payload;
    },
    // 新增审核不通过原因
    AUDIT_APPROVED(state, payload) {
      state.postAuditoved = payload;
    },
    // 获取修改详情页面
    AUDIT_DETAILS(state, payload) {
      state.getModifica = payload;
    },
    // 获取修改详情页面(提交)
    AUDIT_SUBMIT(state, payload) {
      state.postModificaSubmit = payload;
    },
    // 审核统计查询
    AUDIT_STICS(state, payload) {
      state.getStatistics = payload;
    },
    // 检查敏感词
    AUDIT_SITIVE(state, payload) {
      state.getSensitive = payload;
    }
  },
  actions: {
    // 展品数据审核页面（展示审核数据）
    getExhibitAuditPage({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.exhibitAuditPage(params);
        promises.then(res => {
          commit('EXHIBIT_PAGE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核
    getExhibitAuditAudit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.exhibitAuditAudit(params);
        promises.then(res => {
          commit('EXHIBIT_AUDIT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取审核不通过原因列表
    getReasonsApproved({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.reasonsApproved(params);
        promises.then(res => {
          commit('EXHIBIT_APPROVED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增审核不通过原因
    postAuditApproved({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.auditApproved(params);
        promises.then(res => {
          commit('AUDIT_APPROVED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取修改详情页面
    getModificaDetails({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.modificaDetails(params);
        promises.then(res => {
          commit('AUDIT_DETAILS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取修改详情页面(提交)
    postModificaDetailsSubmit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.modificaDetailsSubmit(params);
        promises.then(res => {
          commit('AUDIT_SUBMIT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核统计查询
    getAuditStatistics({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.auditStatistics(params);
        promises.then(res => {
          commit('AUDIT_STICS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 检查敏感词
    getCheckSensitive({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.checkSensitive(params);
        promises.then(res => {
          commit('AUDIT_SITIVE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除图片
    postDeleteImgag({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = managemenApi.deleteImgag(params);
        promises.then(res => {
          commit('AUDIT_DELETEIMAG', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
