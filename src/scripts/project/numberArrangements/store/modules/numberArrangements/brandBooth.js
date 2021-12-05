import { brandBoothApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getlistSchedule: [],
    addSchedule: [],
    updateConf: [],
    deleteByid: [],
    updateSchedule: [],
    addFeed: [],
    delBif: [],
    dowFeed: [],
    getLpf: [],
    updateBif: [],
    pubSpb: [],
    pbsSpb: [],
    rPbsSpb: [],
    downPbs: [],
    getLpb: [],
    getReLpb: [],
    downRes: [],
    getPrd: [],
    updateRpfc: [],
    updateSpl: []
  },
  getters: {
    getlistSchedule: state => state.getlistSchedule,
    addSchedule: state => state.addSchedule,
    updateConf: state => state.updateConf,
    deleteByid: state => state.deleteByid,
    updateSchedule: state => state.updateSchedule,
    addFeed: state => state.addFeed,
    delBif: state => state.delBif,
    dowFeed: state => state.dowFeed,
    getLpf: state => state.getLpf,
    updateBif: state => state.updateBif,
    pubSpb: state => state.pubSpb,
    pbsSpb: state => state.pbsSpb,
    rPbsSpb: state => state.rPbsSpb,
    downPbs: state => state.downPbs,
    getLpb: state => state.getLpb,
    getReLpb: state => state.getReLpb,
    downRes: state => state.downRes,
    getPrd: state => state.getPrd,
    updateRpfc: state => state.updateRpfc,
    updateSpl: state => state.updateSpl
  },
  mutations: {
    GETLIST_SCHEDULE(state, payload) {
      state.getlistSchedule = payload;
    },
    ADD_SCHEDULE(state, payload) {
      state.addSchedule = payload;
    },
    UPDATE_CONFIRM(state, payload) {
      state.updateConf = payload;
    },
    DELETE_BYID(state, payload) {
      state.deleteByid = payload;
    },
    UPDATE_SCHEDULE(state, payload) {
      state.updateSchedule = payload;
    },
    ADD_FEED(state, payload) {
      state.addFeed = payload;
    },
    DEL_BIF(state, payload) {
      state.delBif = payload;
    },
    DOW_FEED(state, payload) {
      state.dowFeed = payload;
    },
    GET_LPF(state, payload) {
      state.getLpf = payload;
    },
    UPDATE_BIF(state, payload) {
      state.updateBif = payload;
    },
    PUB_SPB(state, payload) {
      state.pubSpb = payload;
    },
    PBS_SPB(state, payload) {
      state.pbsSpb = payload;
    },
    RPBS_SPB(state, payload) {
      state.rPbsSpb = payload;
    },
    DOWN_PBS(state, payload) {
      state.downPbs = payload;
    },
    GET_LPB(state, payload) {
      state.getLpb = payload;
    },
    GET_RELPB(state, payload) {
      state.getReLpb = payload;
    },
    DOWN_RES(state, payload) {
      state.downRes = payload;
    },
    GET_PRD(state, payload) {
      state.getPrd = payload;
    },
    UPDATE_RPFC(state, payload) {
      state.updateRpfc = payload;
    },
    UPDATE_SPL(state, payload) {
      state.updateSpl = payload;
    }
  },
  actions: {
    // 查询各类型数量安排阶段的时间点
    getlistScheduleConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.getListScheduleConfig(Object).then(res => {
          commit('GETLIST_SCHEDULE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增时间点
    addscheduleConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.addScheduleConfig(Object).then(res => {
          commit('ADD_SCHEDULE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 确认按钮
    updateconfirm({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.updateConfirm(Object).then(res => {
          commit('UPDATE_CONFIRM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除
    deletebyIdScheduleConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.deleteByIdScheduleConfig(Object).then(res => {
          commit('DELETE_BYID', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改
    updatescheduleConfig({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.updateScheduleConfig(Object).then(res => {
          commit('UPDATE_SCHEDULE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 这里是品牌的分割
    // 品牌展位常规安排
    // 交易团新增反馈意见
    addfeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.addFeedback(Object).then(res => {
          commit('ADD_FEED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团删除反馈意见
    deletebyIdFeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.deleteByIdFeedback(Object).then(res => {
          commit('DEL_BIF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 下载交易团反馈意见
    downloadfeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.downloadFeedback(Object).then(res => {
          commit('DOW_FEED', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看交易团反馈意见
    getlistPageFeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.getListPageFeedback(Object).then(res => {
          commit('GET_LPF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团更新反馈意见
    updatebyIdFeedback({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.updateByIdFeedback(Object).then(res => {
          commit('UPDATE_BIF', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司公示调整安排方安排
    publicityschemePublicity({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.publicitySchemePublicity(Object).then(res => {
          commit('PUB_SPB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司公布调整安排方案
    publishschemePublicity({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.publishSchemePublicity(Object).then(res => {
          commit('PBS_SPB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司公布调整安排方案(非评审期)
    rePublishschemePublicity({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.rePublishSchemePublicity(Object).then(res => {
          commit('RPBS_SPB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 下载公布查看调整安排方案
    downloadpublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.downloadPublish(Object).then(res => {
          commit('DOWN_PBS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 品牌展位调整安排方案公布
    getListpagePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.getListPagePublish(Object).then(res => {
          commit('GET_LPB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 品牌展位调整安排方案公布(非评审期)
    getListpageRePublish({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.getListPageRePublish(Object).then(res => {
          commit('GET_RELPB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 下载公示查看调整安排方案
    downloadreschedule({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.downloadReschedule(Object).then(res => {
          commit('DOWN_RES', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看调整安排方案
    getlistPageReschedule({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.getListPageReschedule(Object).then(res => {
          commit('GET_PRD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司返还方案商协会重新提交方案
    updatereturnPlanForCoceral({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.updateReturnPlanForCoceral(Object).then(res => {
          commit('UPDATE_RPFC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司处理交易团反馈意见
    updateschemePublicityLog({ commit }, Object) {
      return new Promise((resolve, reject) => {
        brandBoothApi.updateSchemePublicityLog(Object).then(res => {
          commit('UPDATE_SPL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
