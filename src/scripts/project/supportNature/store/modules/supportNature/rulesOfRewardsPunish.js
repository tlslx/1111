import { rulesOfRewardsPunishApi } from '../../../apis';
// import { $locals } from "@/utils"; // getToken();
export default {
  namespaced: true,
  state: {
    selectDictByCodesData: []
  },
  getters: {
    selectDictByCodesData: state => state.selectDictByCodesData
  },
  actions: {
    // 奖惩规则列表
    getRpRuleExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.rpRuleExport(params, '奖惩规则管理列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '奖惩规则管理列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导出常用文件管理列列表
    getFileManageExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.fileManageExport(params, '常用文件管理列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '常用文件管理列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导出处罚管理列表
    getPunishNotificatonExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.punishNotificatonExport(params, '处罚通知管理列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '处罚通知管理列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 导出展位违规处理列表
    getExhibitPositionOpinionExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.exhibitPositionOpinionExport(params, '展位违规处理列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '展位违规处理列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 业务办展位违规处理
    getBusinessExhibitPositionOpinionExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.exhibitPositionOpinionExport(params, '业务办展位违规处理列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '业务办展位违规处理列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 处罚通知管理模板下载
    getPunishNotificatonTemplateExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.punishNotificatonTemplateExport(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 政工办展位违规处理模板下载
    getPunishNotificatonTempExport({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.punishNotificatonTemplateExport(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 业务办展位违规处理模板下载
    // getPunishNotificatonYWBExport({ commit }, params) {
    //   return new Promise((resolve, reject) => {
    //     const promises = rulesOfRewardsPunishApi.punishNotificatonTemplateExport(params, '业务办展位违规处理.zip');
    //     promises.then(res => {
    //       resolve(res);
    //     }).catch(e => {
    //       reject(e);
    //     });
    //   });
    // },
    // 文件管理列表中的单行文件下载 , '常用文件管理详情.doc'
    getFileManageTableRow({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.fileManageTableRow(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取事件类别
    getSelectDictByCodes({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = rulesOfRewardsPunishApi.selectDictByCodes();
        promises.then(res => {
          let data = [];
          res.forEach(ele => {
            let item = {};
            item.code = ele.code;
            item.label = ele.value;
            data.push(item);
          });
          commit('THING_TYPE', data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //依据届数，期数，展区，展位号来获取企业信息，奖惩的
    getMsgCompany({ commit }, param) {
      return rulesOfRewardsPunishApi.getMsgCompany(param);
    }
  },
  mutations: {
    THING_TYPE(state, payload) {
      state.selectDictByCodesData = payload;
    }
  }
};
