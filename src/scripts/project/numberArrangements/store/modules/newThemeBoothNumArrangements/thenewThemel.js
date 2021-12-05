import { thenewThemelApi } from '../../../apis';

export default {
  namespaced: true,
  state: {
    getNtp: [],
    updateNtp: [],
    updateNtf: [],
    getlistNtp: [],
    updateCnf: [],
    getPtp: [],
    addNtp: [],
    addNac: [],
    addCac: [],
    getNac: [],
    getLnac: [],
    updateNac: [],
    getPntp: [],
    addPntp: [],
    updateCpnp: [],
    getNwsn: [],
    updateNwsn: [],
    addNwsn: [],
    updatePwsn: [],
    getFt: [],
    updateFt: [],
    getCwsn: [],
    getPcwsn: [],
    updatePsn: [],
    getPwsn: [],
    updatePswn: [],
    downloadBna: [],
    uploadNac: [],
    downloadNac: [],
    boothArrangePlanData: {},
    exhibitionInfoData: {},
    boothArrangeDetail: {},
    exhibitionAreaGet: {}
  },
  getters: {
    getNtp: state => state.getNtp,
    updateNtp: state => state.updateNtp,
    updateNtf: state => state.updateNtf,
    getlistNtp: state => state.getlistNtp,
    updateCnf: state => state.updateCnf,
    getPtp: state => state.getPtp,
    addNtp: state => state.addNtp,
    addNac: state => state.addNac,
    addCac: state => state.addCac,
    getNac: state => state.getNac,
    getLnac: state => state.getLnac,
    updateNac: state => state.updateNac,
    getPntp: state => state.getPntp,
    addPntp: state => state.addPntp,
    updateCpnp: state => state.updateCpnp,
    getNwsn: state => state.getNwsn,
    updateNwsn: state => state.updateNwsn,
    addNwsn: state => state.addNwsn,
    updatePwsn: state => state.updatePwsn,
    getFt: state => state.getFt,
    updateFt: state => state.updateFt,
    getCwsn: state => state.getCwsn,
    getPcwsn: state => state.getPcwsn,
    updatePsn: state => state.updatePsn,
    getPwsn: state => state.getPwsn,
    updatePswn: state => state.updatePswn,
    downloadBna: state => state.downloadBna,
    uploadNac: state => state.uploadNac,
    downloadNac: state => state.downloadNac,
    boothArrangePlanData: state => state.boothArrangePlanData,
    exhibitionInfoData: state => state.exhibitionInfoData,
    boothArrangeDetail: state => state.boothArrangeDetail,
    exhibitionAreaGet: state => state.exhibitionAreaGet
  },
  mutations: {
    GET_NTP(state, payload) {
      state.getNtp = payload;
    },
    UPDATE_NTP(state, payload) {
      state.updateNtp = payload;
    },
    UPDATE_NTF(state, payload) {
      state.updateNtf = payload;
    },
    GETLIST_NTP(state, payload) {
      state.getlistNtp = payload;
    },
    UPDATE_CNF(state, payload) {
      state.updateCnf = payload;
    },
    GET_PTP(state, payload) {
      state.getPtp = payload;
    },
    ADD_NTP(state, payload) {
      state.addNtp = payload;
    },
    ADD_NAC(state, payload) {
      state.addNac = payload;
    },
    ADD_CAC(state, payload) {
      state.addCac = payload;
    },
    GET_NAC(state, payload) {
      state.getNac = payload;
    },
    GET_LNAC(state, payload) {
      state.getLnac = payload;
    },
    UPDATE_NAC(state, payload) {
      state.updateNac = payload;
    },
    GET_PNTP(state, payload) {
      state.getPntp = payload;
    },
    ADD_PNTP(state, payload) {
      state.addPntp = payload;
    },
    UPDATE_CPNP(state, payload) {
      state.updateCpnp = payload;
    },
    GET_NWSN(state, payload) {
      state.getNwsn = payload;
    },
    UPDATE_NWSN(state, payload) {
      state.updateNwsn = payload;
    },
    ADD_NWSN(state, payload) {
      state.addNwsn = payload;
    },
    UPDATE_PWSN(state, payload) {
      state.updatePwsn = payload;
    },
    GET_FT(state, payload) {
      state.getFt = payload;
    },
    UPDATE_FT(state, payload) {
      state.updateFt = payload;
    },
    GET_CWSN(state, payload) {
      state.getCwsn = payload;
    },
    GET_PCWSN(state, payload) {
      state.getPcwsn = payload;
    },
    UPDATE_PSN(state, payload) {
      state.updatePsn = payload;
    },
    GET_PWSN(state, payload) {
      state.getPwsn = payload;
    },
    UPDATE_PSWN(state, payload) {
      state.updatePswn = payload;
    },
    DOWNLOAD_BNA(state, payload) {
      state.downloadBna = payload;
    },
    UPLOAD_NAC(state, payload) {
      state.uploadNac = payload;
    },
    DOWNLOAD_NAC(state, payload) {
      state.downloadNac = payload;
    },
    BOOTH_ARRANGE_PLAN_DATA(state, payload) {
      state.boothArrangePlanData = payload;
    },
    EXHIBITION_INFO_DATA(state, payload) {
      state.exhibitionInfoData = payload;
    },
    BOOTH_ARRANGE_DETAIL(state, payload) {
      state.boothArrangeDetail = payload;
    },
    EXHIBITION_AREA_GET(state, payload) {
      state.exhibitionAreaGet = payload;
    }
  },
  actions: {
    // 5.1 商协会查询新题材工作部根据规则生成或上传的企业申请记录(商协会复核展位数量安排通过的企业申请记录)
    getnewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getNewthemePublish(Object).then(res => {
          commit('GET_NTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.2 商协会复核展位数量安排通过的企业申请记录
    updatenewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateNewthemePublish(Object).then(res => {
          commit('UPDATE_NTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.3 商协会复核完成反馈工作部
    updatenewthemeFeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateNewthemeFeedback(Object).then(res => {
          commit('UPDATE_NTF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.4 查询新题材商协会复核展位数量安排通过的企业申请记录
    getlistNewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getListNewthemePublish(Object).then(res => {
          commit('GETLIST_NTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.5 外贸司审定展位数量安排方案
    updatecheckNewthemeFeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateCheckNewthemeFeedback(Object).then(res => {
          commit('UPDATE_CNF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.11 外贸中心审核调整重新安排方案
    updatecheckPlanNewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateCheckPlanNewthemePublish(Object).then(res => {
          commit('UPDATE_CPNP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.12 外贸中心调整重新安排方案
    getnewthemeWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getNewthemeWorkScheduleNumber(Object).then(res => {
          commit('GET_NWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.13 外贸中心提交审核结果
    updatenewthemeWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateNewthemeWorkScheduleNumber(Object).then(res => {
          commit('UPDATE_NWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.14 外贸中心发商协会查看
    addnewthemeWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.addNewthemeWorkScheduleNumber(Object).then(res => {
          commit('ADD_NWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.15 外贸中心调整方案
    updatepnewthemeWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updatePnewthemeWorkScheduleNumber(Object).then(res => {
          commit('UPDATE_PWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.21 外贸司查看审核展位安排调整方案
    getforeignTrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getForeignTrade(Object).then(res => {
          commit('GET_FT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.22 外贸司审核重新安排方案
    updateforeignTrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateForeignTrade(Object).then(res => {
          commit('UPDATE_FT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.31 商协会查看新题材展位安排结果(展位数量调整)
    getcoceralWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getCoceralWorkScheduleNumber(Object).then(res => {
          commit('GET_CWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.41 企业/交易团申请新题材展位调整
    addnewthemeAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.addNewthemeAdjustCompany(Object).then(res => {
          commit('ADD_NAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.42 交易团审核企业调整申请
    addcheckAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.addCheckAdjustCompany(Object).then(res => {
          commit('ADD_CAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.43 交易团根据企业名称、展区、产品专区获取企业的展位申请数
    getnewthemeAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getNewthemeAdjustCompany(Object).then(res => {
          commit('GET_NAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.44 企业/交易团查询新题材展位安排
    getlistNewthemeAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getListNewthemeAdjustCompany(Object).then(res => {
          commit('GET_LNAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.45 企业/交易团编辑新题材展位调整
    updatenewthemeAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updateNewthemeAdjustCompany(Object).then(res => {
          commit('UPDATE_NAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.000 新题材企业展位数量调整下载
    downloadboothNumberAdjust({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.downloadBoothNumberAdjust(Object).then(res => {
          commit('DOWNLOAD_BNA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.46 上传调整函
    uploadnewthemeAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.uploadNewthemeAdjustCompany(Object).then(res => {
          commit('UPLOAD_NAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 6.47 下载调整函
    downloadnewthemeAdjustCompany({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.downloadNewthemeAdjustCompany(Object).then(res => {
          commit('DOWNLOAD_NAC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.10 外贸司页面 整体  查询外贸司审核查看公示新题材展位安排结果后的即将公示数据
    getpublicityThemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getPublicityThemePublish(Object).then(res => {
          commit('GET_PTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.11 外贸司审定展位数量安排方案
    addnewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.addNewthemePublish(Object).then(res => {
          commit('ADD_NTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 8.10 外贸司页面 整体  查询公布的展位數量
    getpublishNewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getPublishNewthemePublish(Object).then(res => {
          commit('GET_PNTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 8.11 外贸司公示后,进行公布
    addpublishNewthemePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.addPublishNewthemePublish(Object).then(res => {
          commit('ADD_PNTP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.234 公布后调整方案公示(展位数量公示管理)get获取
    getpublicityWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getPublicityWorkScheduleNumber(Object).then(res => {
          commit('GET_PCWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.234 公布后调整方案公示(展位数量公示管理)post公示
    updatepublicityWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updatePublicityWorkScheduleNumber(Object).then(res => {
          commit('UPDATE_PSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 8.234 公布后调整方案公布(展位数量公布管理)get获取
    getpublishWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getPublishWorkScheduleNumber(Object).then(res => {
          commit('GET_PWSN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 8.234 公布后调整方案公布(展位数量公布管理)post公布
    updatepublishWorkScheduleNumber({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.updatePublishWorkScheduleNumber(Object).then(res => {
          commit('UPDATE_PSWN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.6 工作部设置展位安排方案列表（新题材）
    getBoothArrangePlanList({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getBoothArrangePlanListData(Object).then(res => {
          commit('BOOTH_ARRANGE_PLAN_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.61 工作部新增展位安排方案（新题材）
    postBoothArrangePlanListAdd({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postBoothArrangePlanListAddData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据展区查询展品专区
    getExhibitionInfoByCode({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getExhibitionInfoByCodeData(Object).then(res => {
          commit('EXHIBITION_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.62 工作部编辑展位安排方案（新题材）
    postBoothArrangePlanListUpdate({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postBoothArrangePlanListUpdateData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.63 工作部删除展位安排方案（新题材）
    postBoothArrangePlanListDelete({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postBoothArrangePlanListDeleteData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.64 工作部按规则生成数量安排方案（新题材）
    postAddByRuleArrangementPlan({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postAddByRuleArrangementPlanData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.71 企业展位数量安排明细表（新题材）
    getBoothArrangeDetailTable({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getBoothArrangeDetailTableData(Object).then(res => {
          commit('BOOTH_ARRANGE_DETAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业展位数量安排明细表（新题材）上传
    postBoothArrangeDetailTableUpload({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postBoothArrangeDetailTableUploadData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.72 工作部保存或提交当届拟安排展位数（新题材）
    postBoothArrangeDetailSave({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postBoothArrangeDetailSaveData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.73 工作部发商协会核对（新题材）
    postBoothArrangeDetailCheckCoceral({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postBoothArrangeDetailCheckCoceralData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 5.74 工作部发外贸司审定
    postboothArrangeDetailCheckForeignTrade({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.postboothArrangeDetailCheckForeignTradeData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展区查询
    getExhibitionArea({ commit }, Object) {
      return new Promise((resolve, reject) => {
        thenewThemelApi.getExhibitionAreaData(Object).then(res => {
          commit('EXHIBITION_AREA_GET', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
