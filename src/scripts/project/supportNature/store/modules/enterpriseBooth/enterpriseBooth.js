import { enterpriseBoothApi } from "../../../apis";
export default {
  namespaced: true,
  state: {
    editData: {},
    currentData: {},
    getAreasData: {},
    efSupWorkData: {},
    brandApplyData: {},
    getRecordsData: {},
    getCurrentData: {},
    getListAllData: {},
    getWorkPageData: {},
    efEditStandData: {},
    updateStandData: {},
    getStandingData: {},
    getListPageData: {},
    companyApplyData: {},
    efUpdateStandData: {},
    efGetStandingData: {},
    applyContrastData: {},
    proGetStandingData: {},
    surveySchemeAddData: {},
    delegationApplyData: {},
    sysDataDictItemData: {},
    getDetailStaticsData: {},
    getBusinessPlaceData: {},
    getDelegationPageData: {},
    getSubgroupSwitchData: {},
    setSubgroupSwitchData: {},
    efSupBoothStaEditData: {},
    efSupBoothStaPageData: {},
    exhibitionApplyNoData: {},
    efSupChangeStaEditData: {},
    proUpdateStandEditData: {},
    efSupSurveyInfoStaData: {},
    proUpdateStandStandData: {},
    supWorkSuperviseEditData: {},
    superviseGetStandingData: {},
    superviseUpdateStandData: {},
    efSupChangeStaSearchData: {},
    efSupBoothStaStandingData: {},
    getStaticsOfDelegationData: {},
    efSupPropagandaInfoStaData: {},
    illegalRemainBoothEditData: {},
    exhibitionApplyNoReasonData: {},
    surveySchemeAddTypeZeroData: {},
    searchBusinessDelegationData: {},
    businessDelegationAndAreaData: {},
    getStaticsOfExhibitionAreaData: {},
    efSupIllegalRemainBoothStaData: {},
    findDicItemListByExhibiAreaData: {},
    illegalRemainBoothUpdateStandData: {},
    applyInfoByExhibitionArea: {}
  },
  getters: {
    editData: state => state.editData,
    currentData: state => state.currentData,
    getAreasData: state => state.getAreasData,
    efSupWorkData: state => state.efSupWorkData,
    brandApplyData: state => state.brandApplyData,
    getCurrentData: state => state.getCurrentData,
    getRecordsData: state => state.getRecordsData,
    getListAllData: state => state.getListAllData,
    getWorkPageData: state => state.getWorkPageData,
    efEditStandData: state => state.efEditStandData,
    updateStandData: state => state.updateStandData,
    getStandingData: state => state.getStandingData,
    getListPageData: state => state.getListPageData,
    companyApplyData: state => state.companyApplyData,
    efUpdateStandData: state => state.efUpdateStandData,
    efGetStandingData: state => state.efGetStandingData,
    applyContrastData: state => state.applyContrastData,
    proGetStandingData: state => state.proGetStandingData,
    surveySchemeAddData: state => state.surveySchemeAddData,
    sysDataDictItemData: state => state.sysDataDictItemData,
    getDetailStaticsData: state => state.getDetailStaticsData,
    delegationApplyData: state => state.delegationApplyData,
    getBusinessPlaceData: state => state.getBusinessPlaceData,
    getDelegationPageData: state => state.getDelegationPageData,
    getSubgroupSwitchData: state => state.getSubgroupSwitchData,
    setSubgroupSwitchData: state => state.setSubgroupSwitchData,
    efSupBoothStaEditData: state => state.efSupBoothStaEditData,
    efSupBoothStaPageData: state => state.efSupBoothStaPageData,
    exhibitionApplyNoData: state => state.exhibitionApplyNoData,
    efSupChangeStaEditData: state => state.efSupChangeStaEditData,
    proUpdateStandEditData: state => state.proUpdateStandEditData,
    efSupSurveyInfoStaData: state => state.efSupSurveyInfoStaData,
    proUpdateStandStandData: state => state.proUpdateStandStandData,
    supWorkSuperviseEditData: state => state.supWorkSuperviseEditData,
    superviseGetStandingData: state => state.superviseGetStandingData,
    superviseUpdateStandData: state => state.superviseUpdateStandData,
    efSupChangeStaSearchData: state => state.efSupChangeStaSearchData,
    efSupBoothStaStandingData: state => state.efSupBoothStaStandingData,
    getStaticsOfDelegationData: state => state.getStaticsOfDelegationData,
    efSupPropagandaInfoStaData: state => state.efSupPropagandaInfoStaData,
    illegalRemainBoothEditData: state => state.illegalRemainBoothEditData,
    exhibitionApplyNoReasonData: state => state.exhibitionApplyNoReasonData,
    surveySchemeAddTypeZeroData: state => state.surveySchemeAddTypeZeroData,
    searchBusinessDelegationData: state => state.searchBusinessDelegationData,
    businessDelegationAndAreaData: state => state.businessDelegationAndAreaData,
    getStaticsOfExhibitionAreaData: state => state.getStaticsOfExhibitionAreaData,
    efSupIllegalRemainBoothStaData: state => state.efSupIllegalRemainBoothStaData,
    findDicItemListByExhibiAreaData: state => state.findDicItemListByExhibiAreaData,
    illegalRemainBoothUpdateStandData: state => state.illegalRemainBoothUpdateStandData,
    applyInfoByExhibitionArea: state => state.applyInfoByExhibitionArea
  },
  mutations: {
    EDIT_DATA(state, payload) {
      state.editData = payload;
    },
    CURRENT_DATA(state, payload) {
      state.currentData = payload;
    },
    GET_AREAS_DATA(state, payload) {
      state.getAreasData = payload;
    },
    EF_SUP_WPRK_DATA(state, payload) {
      state.efSupWorkData = payload;
    },
    BRAND_APPLY_DATA(state, payload) {
      state.brandApplyData = payload;
    },
    GET_CURRENT_DATA(state, payload) {
      state.getCurrentData = payload;
    },
    GET_RECORDS_DATA(state, payload) {
      state.getRecordsData = payload;
    },
    UPDATE_STAND_DATA(state, payload) {
      state.updateStandData = payload;
    },
    GET_LIST_ALL_DATA(state, payload) {
      state.getListAllData = payload;
    },
    GET_WORK_PAGE_DATA(state, payload) {
      state.getWorkPageData = payload;
    },
    EF_EDIT_STAND_DATA(state, payload) {
      state.efEditStandData = payload;
    },
    GET_STANDING_DATA(state, payload) {
      state.getStandingData = payload;
    },
    GET_LIST_PAGE_DATA(state, payload) {
      state.getListPageData = payload;
    },
    COMPANY_APPLY_DATA(state, payload) {
      state.companyApplyData = payload;
    },
    EF_UIDATE_STAND_DATA(state, payload) {
      state.efUpdateStandData = payload;
    },
    EF_GET_STANDING_DATA(state, payload) {
      state.efGetStandingData = payload;
    },
    PRO_GET_STANDING_DATA(state, payload) {
      state.proGetStandingData = payload;
    },
    SURVEY_SCHEME_ADD_DATA(state, payload) {
      state.surveySchemeAddData = payload;
    },
    APPLY_CONTRAST_DATA(state, payload) {
      state.applyContrastData = payload;
    },
    SYS_DATA_DICT_ITEM_DATA(state, payload) {
      state.sysDataDictItemData = payload;
    },
    GET_DETAILS_STATICS_DATA(state, payload) {
      state.getDetailStaticsData = payload;
    },
    GET_BUSINESS_PLACE_DATA(state, payload) {
      state.getBusinessPlaceData = payload;
    },
    GET_DELEGATION_PAGE_DATA(state, payload) {
      state.getDelegationPageData = payload;
    },
    GET_SUBGROUP_SWITCH_DATA(state, payload) {
      state.getSubgroupSwitchData = payload;
    },
    SET_SUBGROUP_SWITCH_DATA(state, payload) {
      state.setSubgroupSwitchData = payload;
    },
    EF_SUP_BOOTH_STA_EDIT_DATA(state, payload) {
      state.efSupBoothStaEditData = payload;
    },
    DELEGATION_APPLY_DATA(state, payload) {
      state.delegationApplyData = payload;
    },
    EF_SUP_BOOTH_STA_PAGE_DATA(state, payload) {
      state.efSupBoothStaPageData = payload;
    },
    EXHIBITION_APPLY_NO_DATA(state, payload) {
      state.exhibitionApplyNoData = payload;
    },
    EF_SUP_CHANGE_STA_EDIT_DATA(state, payload) {
      state.efSupChangeStaEditData = payload;
    },
    PRO_UPDATE_STAND_EDIT_DATA(state, payload) {
      state.proUpdateStandEditData = payload;
    },
    EF_SUP_SURVEY_INFO_STA_DATA(state, payload) {
      state.efSupSurveyInfoStaData = payload;
    },
    PRO_UPDATE_STAND_STAND_DATA(state, payload) {
      state.proUpdateStandStandData = payload;
    },
    SUP_WORK_SUPERVISE_EDIT_DATA(state, payload) {
      state.supWorkSuperviseEditData = payload;
    },
    SURERVISE_GET_STANDING_DATA(state, payload) {
      state.superviseGetStandingData = payload;
    },
    SURERVISE_UPDATE_STAND_DATA(state, payload) {
      state.superviseUpdateStandData = payload;
    },
    EF_SUP_CHANGE_STA_SEARCH_DATA(state, payload) {
      state.efSupChangeStaSearchData = payload;
    },
    EF_SUP_BOOTH_STA_STANDING_DATA(state, payload) {
      state.efSupBoothStaStandingData = payload;
    },
    GET_STATICS_OF_DELEGATION_DATA(state, payload) {
      state.getStaticsOfDelegationData = payload;
    },
    GET_STATICS_OF_EXHIBITION_AREA_DATA(state, payload) {
      state.getStaticsOfExhibitionAreaData = payload;
    },
    EF_SUP_PROPAGANDA_INFO_STA_DATA(state, payload) {
      state.efSupPropagandaInfoStaData = payload;
    },
    ILLEGAL_REMAIN_BOOTH_EDIT_DATA(state, payload) {
      state.illegalRemainBoothEditData = payload;
    },
    EXHIBITION_APPLY_NO_REASON_DATA(state, payload) {
      state.exhibitionApplyNoReasonData = payload;
    },
    SURVEY_SCHEME_ADD_TYPE_ZERO_DATA(state, payload) {
      state.surveySchemeAddTypeZeroData = payload;
    },
    SEARCH_BUSINESS_DELEGATION_DATA(state, payload) {
      state.searchBusinessDelegationData = payload;
    },
    BUSINESS_DELEGATION_AND_AREA_DATA(state, payload) {
      state.businessDelegationAndAreaData = payload;
    },
    EF_SUP_ILLEGAL_REMAIN_BOOTH_STA_DATA(state, payload) {
      state.efSupIllegalRemainBoothStaData = payload;
    },
    FIND_DIC_ITEM_LIST_BY_EXHIBI_AREA_DATA(state, payload) {
      state.findDicItemListByExhibiAreaData = payload;
    },
    ILLEGAL_REMAIN_BOOTH_UPDATES_STAND_DATA(state, payload) {
      state.illegalRemainBoothUpdateStandData = payload;
    },
    EXHIBIT_AREA_TABLE(state, payload) {
      state.applyInfoByExhibitionArea = payload;
    }
  },
  actions: {
    // ????????????????????????
    getListPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getListPageData(Object).then(res => {
          commit('GET_LIST_PAGE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    exhibitionApplyNo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.exhibitionApplyNoData(Object).then(res => {
          commit('EXHIBITION_APPLY_NO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    brandApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.brandApplyData(Object).then(res => {
          commit('BRAND_APPLY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????????
    applyContrast({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.applyContrastData(Object).then(res => {
          commit('APPLY_CONTRAST_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    companyApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.companyApplyData(Object).then(res => {
          commit('COMPANY_APPLY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    delegationApply({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.delegationApplyData(Object).then(res => {
          commit('DELEGATION_APPLY_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????
    exhibitionApplyNoReason({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.exhibitionApplyNoReasonData(Object).then(res => {
          commit('EXHIBITION_APPLY_NO_REASON_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    getCurrent({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getCurrentData(Object).then(res => {
          commit('GET_CURRENT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????????????????????
    getAreas({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getAreasData(Object).then(res => {
          commit('GET_AREAS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    searchBusinessDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.searchBusinessDelegationData(Object).then(res => {
          commit('SEARCH_BUSINESS_DELEGATION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getListAll({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getListAllData(Object).then(res => {
          commit('GET_LIST_ALL_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    current({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.currentData(Object).then(res => {
          commit('CURRENT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????
    businessDelegationAndArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.businessDelegationAndAreaData(Object).then(res => {
          commit('BUSINESS_DELEGATION_AND_AREA_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    sysDataDictItem({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.sysDataDictItemData(Object).then(res => {
          commit('SYS_DATA_DICT_ITEM_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????
    getBusinessPlace({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getBusinessPlaceData(Object).then(res => {
          commit('GET_BUSINESS_PLACE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????,??????????????????
    efSupSurveyInfoSta({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupSurveyInfoStaData(Object).then(res => {
          commit('EF_SUP_SURVEY_INFO_STA_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    getStanding({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getStandingData(Object).then(res => {
          commit('GET_STANDING_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    updateStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.updateStandData(Object).then(res => {
          commit('UPDATE_STAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????
    edit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.editData(Object).then(res => {
          commit('EDIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ??????
    efSupIllegalRemainBoothSta({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupIllegalRemainBoothStaData(Object).then(res => {
          commit('EF_SUP_ILLEGAL_REMAIN_BOOTH_STA_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ???????????????
    illegalRemainBoothUpdateStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.illegalRemainBoothUpdateStandData(Object).then(res => {
          commit('ILLEGAL_REMAIN_BOOTH_UPDATES_STAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ???????????????
    illegalRemainBoothEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.illegalRemainBoothEditData(Object).then(res => {
          commit('ILLEGAL_REMAIN_BOOTH_EDIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ??????
    efSupPropagandaInfoSta({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupPropagandaInfoStaData(Object).then(res => {
          commit('EF_SUP_PROPAGANDA_INFO_STA_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ???????????????
    proGetStanding({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.proGetStandingData(Object).then(res => {
          commit('PRO_GET_STANDING_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ???????????????
    proUpdateStandStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.proUpdateStandStandData(Object).then(res => {
          commit('PRO_UPDATE_STAND_STAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????? ???????????????
    proUpdateStandEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.proUpdateStandEditData(Object).then(res => {
          commit('PRO_UPDATE_STAND_EDIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????? ??????
    efSupWork({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupWorkData(Object).then(res => {
          commit('EF_SUP_WPRK_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????? ???????????????
    superviseGetStanding({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.superviseGetStandingData(Object).then(res => {
          commit('SURERVISE_GET_STANDING_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????? ???????????????
    superviseUpdateStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.superviseUpdateStandData(Object).then(res => {
          commit('SURERVISE_UPDATE_STAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????? ??????
    supWorkSuperviseEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.supWorkSuperviseEditData(Object).then(res => {
          commit('SUP_WORK_SUPERVISE_EDIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 31?????????????????????
    getQueryApplyInfoByExhibitionArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.queryApplyInfoByExhibitionArea(Object).then(res => {
          commit('EXHIBIT_AREA_TABLE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????? ??????
    efSupChangeStaSearch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupChangeStaSearchData(Object).then(res => {
          // ?????????
          res.records.forEach(item => {
            let str = Number(item.changeRate * 100).toFixed(2);
            str += "%";
            item.changeRate = str;
          });

          commit('EF_SUP_CHANGE_STA_SEARCH_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????? ???????????????
    efGetStanding({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efGetStandingData(Object).then(res => {
          commit('EF_GET_STANDING_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????? ???????????????
    efEditStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efEditStandData(Object).then(res => {
          commit('EF_EDIT_STAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????????????????????????????????????????? ??????
    efSupChangeStaEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupChangeStaEditData(Object).then(res => {
          commit('EF_SUP_CHANGE_STA_EDIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????? ??????
    efSupBoothStaPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupBoothStaPageData(Object).then(res => {
          commit('EF_SUP_BOOTH_STA_PAGE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????? ???????????????
    efSupBoothStaStanding({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupBoothStaStandingData(Object).then(res => {
          commit('EF_SUP_BOOTH_STA_STANDING_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????? ???????????????
    efUpdateStand({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efUpdateStandData(Object).then(res => {
          commit('EF_UIDATE_STAND_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????? ??????
    efSupBoothStaEdit({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupBoothStaEditData(Object).then(res => {
          commit('EF_SUP_BOOTH_STA_EDIT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????? ??????
    getSubgroupSwitch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getSubgroupSwitchData(Object).then(res => {
          commit('GET_SUBGROUP_SWITCH_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????? ???????????????
    setSubgroupSwitch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.setSubgroupSwitchData(Object).then(res => {
          commit('SET_SUBGROUP_SWITCH_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????? ????????????????????????
    getWorkPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getWorkPageData(Object).then(res => {
          // ?????????
          for (let i = 0; i < res.records.length; i++) {
            let delegationNameArr = [];
            for (let j = 0; j < res.records[i].schemeLks.length; j++) {
              delegationNameArr.push(res.records[i].schemeLks[j].delegationName);
            }
            res.records[i].delegationName = delegationNameArr.join(',');
          }

          commit('GET_WORK_PAGE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????? ???????????????????????? ??????
    surveySchemeAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.surveySchemeAddData(Object).then(res => {
          commit('SURVEY_SCHEME_ADD_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ???????????? ????????????????????????(???????????????) ??????
    surveySchemeAddTypeZero({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.surveySchemeAddTypeZeroData(Object).then(res => {
          commit('SURVEY_SCHEME_ADD_TYPE_ZERO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    findDicItemListByExhibiArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.findDicItemListByExhibiAreaData(Object).then(res => {
          commit('FIND_DIC_ITEM_LIST_BY_EXHIBI_AREA_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????????????? ??????
    getDelegationPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getDelegationPageData(Object).then(res => {
          commit('GET_DELEGATION_PAGE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????-????????????????????????????????????
    getStaticsOfExhibitionArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getStaticsOfExhibitionAreaData(Object).then(res => {
          commit('GET_STATICS_OF_EXHIBITION_AREA_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????-???????????????????????????????????????
    getStaticsOfDelegation({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getStaticsOfDelegationData(Object).then(res => {
          commit('GET_STATICS_OF_DELEGATION_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????-??????????????????????????????
    getDetailStatics({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getDetailStaticsData(Object).then(res => {
          commit('GET_DETAILS_STATICS_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }


  }
};
