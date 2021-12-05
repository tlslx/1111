import { companyApplyUnionExhibitionApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    companyApplyUnionExhibitionList: [],
    deleteByApplyCodeInfo: [],
    getUnionExhibition: {
      id: null,
      data: [],
      summaryArray: []
    },
    reviewUnionExhibitionInfo: [],
    reviewUnionExhibitionByCantonInfo: [],
    updateUnionExhibitionInfo: [],
    selectCompany: [],
    queryBusiness: {
      id: null,
      data: [],
      summaryArray: []
    },
    querycantonSession: {
      id: null,
      data: [],
      summaryArray: []
    },
    queryTradeSession: {
      id: null,
      data: [],
      summaryArray: []
    }
  },
  getters: {
    companyApplyUnionExhibitionList: state => state.companyApplyUnionExhibitionList,
    deleteByApplyCodeInfo: state => state.deleteByApplyCodeInfo,
    getUnionExhibition: state => state.getUnionExhibition,
    reviewUnionExhibitionInfo: state => state.reviewUnionExhibitionInfo,
    reviewUnionExhibitionByCantonInfo: state => state.reviewUnionExhibitionByCantonInfo,
    updateUnionExhibitionInfo: state => state.updateUnionExhibitionInfo,
    selectCompany: state => state.selectCompany,
    queryBusiness: state => state.queryBusiness,
    querycantonSession: state => state.querycantonSession,
    queryTradeSession: state => state.queryTradeSession
  },
  mutations: {
    COMPANYAPPLY_UNION_LIST(state, payload) {
      state.companyApplyUnionExhibitionList = payload;
    },
    DELETE_BYAPPLY_INFO(state, payload) {
      state.deleteByApplyCodeInfo = payload;
    },
    UNION_EXHIBITION_DATA(state, payload) {
      state.getUnionExhibition.data = payload;
    },
    REVIEW_UNION_EXHIBITION_INFO(state, payload) {
      state.reviewUnionExhibitionInfo = payload;
    },
    UNION_EXHCANTON_INFO(state, payload) {
      state.reviewUnionExhibitionByCantonInfo = payload;
    },
    UPDATE_UNION_EXHIBITION_INFO(state, payload) {
      state.updateUnionExhibitionInfo = payload;
    },
    SELECT_COMPANY_INFO(state, payload) {
      state.selectCompany = payload;
    },
    QUERY_BUSINESS(state, payload) {
      state.queryBusiness = payload;
    },
    QUERY_CANTONSESSION(state, payload) {
      state.querycantonSession = payload;
    },
    QUERY_TRADESESSION(state, payload) {
      state.queryTradeSession = payload;
    }
  },
  actions: {
    // 企业申请联合布展
    getCompanyApplyList({ commit }, params) {
      let currentParams = {};
      let newArray = JSON.parse(JSON.stringify(params));
      currentParams.insertUnionExhibitionInfoSession = newArray;
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.getCompanyApplyUnionExhibition(currentParams).then(res => {
          commit('COMPANYAPPLY_UNION_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据申请企业ID删除申请方以及联合方
    deleteByApplyCodeData({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.deleteByApplyCode(params).then(res => {
          commit('DELETE_BYAPPLY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据条件查询联合布展信息
    getUnionExhibitionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.getUnionExhibitions(utility.urlEncode(JSON.stringify(params))).then(res => {
          // 排序实现申请方在上部
          res.records.sort((a, b) => {
            return a.type - b.type;
          });
          let dicData = JSON.parse(localStorage.getItem("dictData"));
          res.records.forEach((value, index) => {
            let _this = this;
            value.phase = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.phase, value.phase);
            value.companyId = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.companyId, value.companyId);
            value.exhibitionArea = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
            value.boothNo = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothNo, value.boothNo);
            value.boothKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothKind, value.boothKind);
            value.exhibitionKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionKind, value.exhibitionKind);
            value.businessAssociation = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
            value.affiliatedTradingGroup = $helper.getDicText(dicData.tradingGroup, value.affiliatedTradingGroup);
            if (value.otherCompanyOpinion === "0") {
              value.otherCompanyOpinion = "有企业不同意";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "都已确认";
            }
            if (value.type === "1") {
              value.type = "申请方";
            } else if (value.type === "2") {
              value.type = "联合方";
            }
          });
          commit('UNION_EXHIBITION_DATA', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核联合发布交易团、商协会
    reviewUnionExhibitionData({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.reviewUnionExhibition(params).then(res => {
          commit('REVIEW_UNION_EXHIBITION_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核联合发布广交会
    reviewUnionExhibitionByCantonData({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.reviewUnionExhibitionByCanton(params).then(res => {
          commit('UNION_EXHCANTON_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    updateUnionExhibitionData({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.updateUnionExhibition(params).then(res => {
          commit('UPDATE_UNION_EXHIBITION_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据公司Id获取公司名称
    selectCompanyNameByCompanyId({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.selectCompanyName(utility.urlEncode(JSON.stringify(params))).then(res => {
          commit('SELECT_COMPANY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会查询
    queryBusinessInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.queryBusinessData(utility.urlEncode(JSON.stringify(params))).then(res => {
          // 排序实现申请方在上部
          res.records.sort((a, b) => {
            return a.type - b.type;
          });
          let dicData = JSON.parse(localStorage.getItem("dictData"));
          res.records.forEach((value, index) => {
            let _this = this;
            value.phase = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.phase, value.phase);
            value.companyId = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.companyId, value.companyId);
            value.exhibitionArea = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
            value.boothNo = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothNo, value.boothNo);
            value.boothKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothKind, value.boothKind);
            value.exhibitionKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionKind, value.exhibitionKind);
            value.businessAssociation = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
            value.affiliatedTradingGroup = $helper.getDicText(dicData.tradingGroup, value.affiliatedTradingGroup);
            value.approveResult = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.approveResult, value.approveResult);
            if (value.otherCompanyOpinion === "0") {
              value.otherCompanyOpinion = "有企业不同意";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "都已确认";
            }
            if (value.type === "1") {
              value.type = "申请方";
            } else if (value.type === "2") {
              value.type = "联合方";
            }
          });
          commit('QUERY_BUSINESS', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 广交会查询
    querycantonSessionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.querycantonSessionData(utility.urlEncode(JSON.stringify(params))).then(res => {
          // 排序实现申请方在上部
          res.records.sort((a, b) => {
            return a.type - b.type;
          });
          let dicData = JSON.parse(localStorage.getItem("dictData"));
          res.records.forEach((value, index) => {
            let _this = this;
            value.phase = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.phase, value.phase);
            value.companyId = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.companyId, value.companyId);
            value.exhibitionArea = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
            value.boothNo = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothNo, value.boothNo);
            value.boothKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothKind, value.boothKind);
            value.exhibitionKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionKind, value.exhibitionKind);
            value.businessAssociation = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
            value.affiliatedTradingGroup = $helper.getDicText(dicData.tradingGroup, value.affiliatedTradingGroup);
            value.approveResult = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.approveResult, value.approveResult);
            if (value.otherCompanyOpinion === "0") {
              value.otherCompanyOpinion = "有企业不同意";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "都已确认";
            }
            if (value.type === "1") {
              value.type = "申请方";
            } else if (value.type === "2") {
              value.type = "联合方";
            }
          });
          commit('QUERY_CANTONSESSION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团查询
    queryTradeSessionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.queryTradeSessionData(utility.urlEncode(JSON.stringify(params))).then(res => {
          // 排序实现申请方在上部
          res.records.sort((a, b) => {
            return a.type - b.type;
          });
          let dicData = JSON.parse(localStorage.getItem("dictData"));
          res.records.forEach((value, index) => {
            let _this = this;
            value.phase = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.phase, value.phase);
            value.companyId = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.companyId, value.companyId);
            value.exhibitionArea = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionArea, value.exhibitionArea);
            value.boothNo = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothNo, value.boothNo);
            value.boothKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.boothKind, value.boothKind);
            value.exhibitionKind = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.exhibitionKind, value.exhibitionKind);
            value.businessAssociation = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.businessAssociation, value.businessAssociation);
            value.affiliatedTradingGroup = $helper.getDicText(dicData.tradingGroup, value.affiliatedTradingGroup);
            value.approveResult = $helper.getDicLabel(_this.state.dictionary.osDictionaryData.approveResult, value.approveResult);
            if (value.otherCompanyOpinion === "0") {
              value.otherCompanyOpinion = "有企业不同意";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "都已确认";
            }
            if (value.type === "1") {
              value.type = "申请方";
            } else if (value.type === "2") {
              value.type = "联合方";
            }
          });
          commit('QUERY_TRADESESSION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
