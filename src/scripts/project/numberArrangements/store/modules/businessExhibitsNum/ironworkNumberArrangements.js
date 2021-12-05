import { ironworkNumberArrangementsApi } from "../../../apis";

export default {
  namespaced: true,
  state: {
    ironStoneApplyData: {},
    summaryIronStoneData: {},
    ironStoneReorderData: {}
  },
  getters: {
    ironStoneApplyData: state => state.ironStoneApplyData,
    summaryIronStoneData: state => state.summaryIronStoneData,
    ironStoneReorderData: state => state.ironStoneReorderData
  },
  mutations: {
    IRON_STONE_APPLY_DATA(state, payload) {
      state.ironStoneApplyData = payload;
    },
    SUMMARY_IRON_STONE_DATA(state, payload) {
      state.summaryIronStoneData = payload;
    },
    IRON_STONE_REORDER_DATA(state, payload) {
      state.ironStoneReorderData = payload;
    }
  },
  actions: {
    // 查询交易团收集企业申请
    postIronStoneApplyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postIronStoneApplyInfoData(Object).then(res => {
          res.total = res.ironStoneApplyInfoPage.total;
          res.records = res.ironStoneApplyInfoPage.records;
          commit('IRON_STONE_APPLY_DATA', res);
          let data = {};
          data.records = res.ironStoneApplyInfoPage.records;
          data.res = res;
          data.total = res.ironStoneApplyInfoPage.total;
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增交易团收集企业申请
    postAddIronStoneApplyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postAddIronStoneApplyInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑交易团收集企业申请
    postUpdateIronStoneApplyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postUpdateIronStoneApplyInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除交易团收集企业申请
    getDelIronStoneApplyInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.getDelIronStoneApplyInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团收集企业申请汇总提交
    postHydrotherapyStatus({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postHydrotherapyStatusData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询工作部汇总数据并安排展位数量
    postSummaryIronStoneInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postSummaryIronStoneInfoData(Object).then(res => {
          commit('SUMMARY_IRON_STONE_DATA', res);
          let recordsList = [];
          let listOne = [];
          let listTwo = [];
          if (res.records.length > 0) {
            for (let i = 0; i < res.records.length; i++) {
              if (res.records[i].productType === '1') { // 户外水疗
                listOne.push(res.records[i]);
              } else if (res.records[i].productType === '2') { // 铁石
                listTwo.push(res.records[i]);
              } else {
                recordsList.push(res.records[i]);
              }
            }
            recordsList.unshift(listOne);
            recordsList.unshift(listTwo);
          } else {
            recordsList = [];
          }
          res.recordsList = recordsList;
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 工作部申报铁石水疗展位数
    postUpdateBaseBoothNumberInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postUpdateBaseBoothNumberInfoData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司查看汇总表
    postIronStoneReorderInfo({ commit }, Object) {
      return new Promise((resolve, reject) => {
        ironworkNumberArrangementsApi.postIronStoneReorderInfoData(Object).then(res => {
          commit('IRON_STONE_REORDER_DATA', res);
          let ironStone = {};
          let recordsList = [];
          let listOne = [];
          let listTwo = [];
          if (res.length > 0) {
            for (let i = 0; i < res.length; i++) {
              if (res[i].productType === '1') { // 户外水疗
                listOne.push(res[i]);
              } else if (res[i].productType === '2') { // 铁石
                listTwo.push(res[i]);
              } else {
                recordsList.push(res[i]);
              }
            }
            recordsList.unshift(listOne);
            recordsList.unshift(listTwo);
          } else {
            recordsList = [];
          }
          ironStone.recordsList = recordsList;
          resolve(ironStone);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
