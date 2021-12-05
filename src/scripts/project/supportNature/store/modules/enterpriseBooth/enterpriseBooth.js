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
    // 查询展位申请情况
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
    // 展位申请不合格原因查询
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
    // 品牌申请情况汇总
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
    // 本届各团展位申请情况与上届对比查询
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
    // 各展区企业申请情况统计
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
    // 各交易团初审情况统计
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
    // 各团各展区申请企业不合格原因查询
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
    // 获取当届展会展期信息
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
    // 根据展届展期获取展区和专区的信息
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
    // 获取交易团
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
    // 获取所有展会信息
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
    // 获取当届展会展期信息
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
    // 各交易团各展区申请情况汇总
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
    // 产品大类
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
    // 获取交易团所属地区
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
    // 当届工作总结,开展调研情况
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
    // 获取标准值
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
    // 设置标准值
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
    // 修改标准值
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
    // 违规使用或空置展位 查询
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
    // 违规使用或空置展位 设置标准值
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
    // 违规使用或空置展位 修改标准值
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
    // 专业化宣传工作情况 查询
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
    // 专业化宣传工作情况 获取标准值
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
    // 专业化宣传工作情况 设置标准值
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
    // 专业化宣传工作情况 修改标准值
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
    // 展品质量监督工作执行情况 查询
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
    // 展品质量监督工作执行情况 获取标准值
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
    // 展品质量监督工作执行情况 设置标准值
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
    // 展品质量监督工作执行情况 修改
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
    // 31号表格获取列表
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
    // 企业一般性特装展位数调整情况达标 查询
    efSupChangeStaSearch({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.efSupChangeStaSearchData(Object).then(res => {
          // 百分比
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
    // 企业一般性特装展位数调整情况达标 获取标准值
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
    // 企业一般性特装展位数调整情况达标 设置标准值
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
    // 企业一般性特装展位数调整情况达标 修改
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
    // 退展位情况 查询
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
    // 退展位情况 获取标准值
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
    // 退展位情况 设置标准值
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
    // 退展位情况 修改
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
    // 分团列表 查询
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
    // 分团列表 设置开或关
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
    // 展位数量 获取调研方案列表
    getWorkPage({ commit }, Object) {
      return new Promise((resolve, reject) => {
        enterpriseBoothApi.getWorkPageData(Object).then(res => {
          // 交易团
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
    // 展位数量 设定需求申报类型 新增
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
    // 展位数量 设定需求申报类型(不限制数量) 新增
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
    // 根据字典获取展区
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
    // 交易团特定展位需求申报 查询
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
    // 调研结果查询统计-展区维度（工作部管理员）
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
    // 调研结果查询统计-交易团维度（工作部管理员）
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
    // 调研结果查询统计-详细（工作部管理员）
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
