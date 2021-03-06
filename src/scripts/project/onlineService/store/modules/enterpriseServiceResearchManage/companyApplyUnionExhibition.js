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
    // ????????????????????????
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
    // ??????????????????ID??????????????????????????????
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
    // ????????????????????????????????????
    getUnionExhibitionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.getUnionExhibitions(utility.urlEncode(JSON.stringify(params))).then(res => {
          // ??????????????????????????????
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
              value.otherCompanyOpinion = "??????????????????";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "????????????";
            }
            if (value.type === "1") {
              value.type = "?????????";
            } else if (value.type === "2") {
              value.type = "?????????";
            }
          });
          commit('UNION_EXHIBITION_DATA', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
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
    // ???????????????????????????
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
    // ????????????Id??????????????????
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
    // ???????????????
    queryBusinessInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.queryBusinessData(utility.urlEncode(JSON.stringify(params))).then(res => {
          // ??????????????????????????????
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
              value.otherCompanyOpinion = "??????????????????";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "????????????";
            }
            if (value.type === "1") {
              value.type = "?????????";
            } else if (value.type === "2") {
              value.type = "?????????";
            }
          });
          commit('QUERY_BUSINESS', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    querycantonSessionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.querycantonSessionData(utility.urlEncode(JSON.stringify(params))).then(res => {
          // ??????????????????????????????
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
              value.otherCompanyOpinion = "??????????????????";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "????????????";
            }
            if (value.type === "1") {
              value.type = "?????????";
            } else if (value.type === "2") {
              value.type = "?????????";
            }
          });
          commit('QUERY_CANTONSESSION', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    queryTradeSessionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        companyApplyUnionExhibitionApi.queryTradeSessionData(utility.urlEncode(JSON.stringify(params))).then(res => {
          // ??????????????????????????????
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
              value.otherCompanyOpinion = "??????????????????";
            } else if (value.otherCompanyOpinion === "1") {
              value.otherCompanyOpinion = "????????????";
            }
            if (value.type === "1") {
              value.type = "?????????";
            } else if (value.type === "2") {
              value.type = "?????????";
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
