import { tradeGroupAuditApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    // 这里放置的是静态参数
    // dataValue: [],
    reportData: [],
    resultData: [],
    preAuditEnterprise: [],
    queryIdCustoms: [],
    auditCustoms: [],
    addCustoms: [],
    updateApply: [],
    deletCustoms: [],
    checkBrandBooth: [],
    updateCheckBrand: [],
    addMotherChild: [],
    getMotherChild: [],
    updateMotherChild: [],
    deleteMotherChild: [],
    byidMotherChild: [],
    dealClusterCheck: [],
    updateBatchMother: [],
    getDealCluster: []
  },
  getters: {
    // 类似计算属性
    // dataValue: state => state.dataValue,
    reportData: state => state.reportData,
    resultData: state => state.resultData,
    preAuditEnterprise: state => state.preAuditEnterprise,
    queryIdCustoms: state => state.queryIdCustoms,
    auditCustoms: state => state.auditCustoms,
    addCustoms: state => state.addCustoms,
    updateApply: state => state.updateApply,
    deletCustoms: state => state.deletCustoms,
    checkBrandBooth: state => state.checkBrandBooth,
    updateCheckBrand: state => state.updateCheckBrand,
    addMotherChild: state => state.addMotherChild,
    getMotherChild: state => state.getMotherChild,
    updateMotherChild: state => state.updateMotherChild,
    deleteMotherChild: state => state.deleteMotherChild,
    byidMotherChild: state => state.byidMotherChild,
    dealClusterCheck: state => state.dealClusterCheck,
    updateBatchMother: state => state.updateBatchMother,
    getDealCluster: state => state.getDealCluster
  },
  mutations: {
    REPORT_DATA(state, payload) {
      state.reportData = payload;
    },
    AUDIT_RESULTS(state, payload) {
      state.resultData = payload;
    },
    PRE_AUDIT_ENTERPRISE(state, payload) {
      state.preAuditEnterprise = payload;
    },
    QUERY_ID_CUSTOMS(state, payload) {
      state.queryIdCustoms = payload;
    },
    AUDIT_CUSTOMS(state, payload) {
      state.auditCustoms = payload;
    },
    ADD_CUSTOMS(state, payload) {
      state.addCustoms = payload;
    },
    UPDATE_APPLY(state, payload) {
      state.updateApply = payload;
    },
    DELET_CUSTOMS(state, payload) {
      state.deletCustoms = payload;
    },
    CHECK_BRAND_BOOTH(state, payload) {
      state.checkBrandBooth = payload;
    },
    UPDATE_CHECK_BRAND(state, payload) {
      state.updateCheckBrand = payload;
    },
    ADD_MOTHER_CHILD(state, payload) {
      state.addMotherChild = payload;
    },
    GET_MOTHER_CHILD(state, payload) {
      state.getMotherChild = payload;
    },
    UPDATE_MOTHER_CHILD(state, payload) {
      state.updateMotherChild = payload;
    },
    DELETE_MOTHER_CHILD(state, payload) {
      state.deleteMotherChild = payload;
    },
    BYID_MOTHER_CHILD(state, payload) {
      state.byidMotherChild = payload;
    },
    DEAL_CLUSTER_CHECK(state, payload) {
      state.dealClusterCheck = payload;
    },
    UPDATE_BATCH_MOTHER(state, payload) {
      state.updateBatchMother = payload;
    },
    GET_DEAL_CLUSTER(state, payload) {
      state.getDealCluster = payload;
    }
  },
  actions: {
    // 查询企业品牌展位数量申请
    getqueryEnterpriseBrand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getQueryEnterpriseBrand(Object).then(res => {
          commit('REPORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据企业id查询企业信息（调用网上服务接口 待完成）

    // 查询交易团预审企业核结果（待确认）
    getenterpriseAuditResults({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getEnterpriseAuditResults(Object).then(res => {
          commit('AUDIT_RESULTS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团预审企业基本信息
    preauditEnterpriseInfor({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.preAuditEnterpriseInfor(Object).then(res => {
          commit('PRE_AUDIT_ENTERPRISE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据申请id查询用于该展区的海关编码列表
    getqueryIdCustomsCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getQueryIdCustomsCode(Object).then(res => {
          commit('QUERY_ID_CUSTOMS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核企业海关编码
    getauditCustomsCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getAuditCustomsCode(Object).then(res => {
          commit('AUDIT_CUSTOMS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有展区列表(展览策划，未完成)

    // 交易团添加海关编码
    addcustomsCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.addCustomsCode(Object).then(res => {
          commit('ADD_CUSTOMS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团修改海关编码（需同步网上服务接口）
    updateapplyCustomCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.updateApplyCustomCode(Object).then(res => {
          commit('UPDATE_APPLY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团删除海关编码
    deletcustomsCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.deletCustomsCode(Object).then(res => {
          commit('DELET_CUSTOMS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团查询企业品牌展位条件列表
    getcheckBrandBoothUseCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getCheckBrandBoothUseCondition(Object).then(res => {
          commit('CHECK_BRAND_BOOTH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核企业品牌展位使用条件
    updatecheckBrandBoothUseCondition({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.updateCheckBrandBoothUseCondition(Object).then(res => {
          commit('UPDATE_CHECK_BRAND', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增母子关系
    addmotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.addMotherChildRelationship(Object).then(res => {
          commit('ADD_MOTHER_CHILD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量新增母子关系表(上传接口，待完成)

    // 母子关系excel下载模板（待完成）

    // 获取母子关系列表（分页）
    getmotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getMotherChildRelationship(Object).then(res => {
          commit('GET_MOTHER_CHILD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据id更新母子关系
    updatemotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.updateMotherChildRelationship(Object).then(res => {
          commit('UPDATE_MOTHER_CHILD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据主键id删除母子关系
    deletemotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.deleteMotherChildRelationship(Object).then(res => {
          commit('DELETE_MOTHER_CHILD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据主键id获取企业母子关系
    getbyIdMotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getByIdMotherChildRelationship(Object).then(res => {
          commit('BYID_MOTHER_CHILD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核企业母子关系（单个）
    dealclusterCheckMotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.dealClusterCheckMotherChildRelationship(Object).then(res => {
          commit('DEAL_CLUSTER_CHECK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团审核企业母子关系（批量）
    updatebatchMotherChildRelationship({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.updateBatchMotherChildRelationship(Object).then(res => {
          commit('UPDATE_BATCH_MOTHER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团管理查询企业申请情况
    getdealClusterQueryApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        tradeGroupAuditApi.getDealClusterQueryApply(Object).then(res => {
          commit('GET_DEAL_CLUSTER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
