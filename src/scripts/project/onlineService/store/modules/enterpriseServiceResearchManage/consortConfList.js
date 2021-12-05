import { enterpriseServiceResearchManageApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    getExhCom: [],  //获取联合布展方企业信息
    getConfExhCom: [],  //联合布展确认
    getRevExh: []  //交易团、商协会、广交会审核
  },
  getters: {
    getExhCom: state => state.getExhCom,  //获取联合布展方企业信息
    getConfExhCom: state => state.getConfExhCom,  //联合布展确认
    getRevExh: state => state.getRevExh  //交易团、商协会、广交会审核
  },
  mutations: {
    GET_EXHCOM(state, payload) {
      state.getExhCom = payload;
    },  //获取联合布展方企业信息
    GET_CONFEXHCOM(state, payload) {
      state.getConfExhCom = payload;
    },  //联合布展确认
    GET_REVEXH(state, payload) {
      state.getRevExh = payload;
    }  //交易团、商协会、广交会审核
  },
  actions: {
     //获取联合布展方企业信息
    getUnionExhibitionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterpriseServiceResearchManageApi.getUnionExhibitionInfo(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
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
            if (value.type === "1") {
              value.type = '申请方';
            } else if (value.type === "2") {
              value.type = '联合方';
            }
          });
          commit('GET_EXHCOM', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //联合布展确认
    getconfirmUnionExhibitionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterpriseServiceResearchManageApi.getconfirmUnionExhibition(params);
        promises.then(res => {
          commit('GET_CONFEXHCOM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
