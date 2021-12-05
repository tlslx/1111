import { ruRuleSummaryApi } from '../../../apis';
// import { $locals } from "@/utils"; // getToken();
export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  actions: {
    // 获取 奖罚信息审核管理 下载
    getDownloadListjf({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = ruRuleSummaryApi.downloadListjf(params, '奖罚信息审核列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '奖罚信息审核列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取 奖罚信息汇总管理 下载
    getDownloadListjfhz({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = ruRuleSummaryApi.downloadListjf(params, '奖罚信息汇总列表.xls');
        promises.then(res => {
          // let element = document.createElement('a');
          // let file = new Blob([res], { type: 'application/vnd.ms-excel' });
          // let href = URL.createObjectURL(file);
          // element.href = href;
          // element.download = '奖罚信息汇总列表.xls';
          // element.click();
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {

  }
};
