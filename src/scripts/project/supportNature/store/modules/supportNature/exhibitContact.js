import { exhibitContactApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    userDeptInfoData: {},
    liaisonContactsListData: {},
    groupExhibitContractsListData: {},
    contractListData: {},
    leaderListData: {}, // tab1
    associationListData: {}, // tab2
    stationListData: {}, // tab3
    generalListData: {},
    withdrawStatus: '',
    withdrawListData: {}, // 撤回页面list
    summaryListData: {}, // 加入总表页面list
    smsListData: {} // 短信联系人
  },
  getters: {
    userDeptInfoData: state => state.userDeptInfoData,
    liaisonContactsListData: state => state.liaisonContactsListData,
    groupExhibitContractsListData: state => state.groupExhibitContractsListData,
    contractListData: state => state.contractListData,
    leaderListData: state => state.leaderListData, // tab1
    associationListData: state => state.associationListData,
    stationListData: state => state.stationListData,
    generalListData: state => state.generalListData,
    withdrawStatus: state => state.withdrawStatus, // 审核状态
    withdrawListData: state => state.withdrawListData, // 撤回页面list
    summaryListData: state => state.summaryListData, // 加入总表页面list
    smsListData: state => state.smsListData // 短信联系人
  },
  mutations: {
    USER_DATA(state, payload) {
      state.userDeptInfoData = payload;
    },
    LIAISON_LIST(state, payload) {
      state.liaisonContactsListData = payload;
    },
    GROUPEXHIBIT_LIST(state, payload) {
      state.groupExhibitContractsListData = payload;
    },
    CONTRACT_LIST(state, payload) {
      state.contractListData = payload;
    },
    LEADER_LIST(state, payload) { // lab1
      state.leaderListData = payload;
    },
    ASSO_LIST(state, payload) { // lab2
      state.associationListData = payload;
    },
    STAT_LIST(state, payload) { // lab3
      state.stationListData = payload;
    },
    GENERAL_LIST(state, payload) { // lab3
      state.generalListData = payload;
    },
    WITHDRAW_STATUS(state, payload) { // lab3
      state.withdrawStatus = payload;
    },
    WITHDRAW_LIST(state, payload) { // 撤回页面列表
      state.withdrawListData = payload;
    },
    SUMMARY_LIST(state, payload) {
      state.summaryListData = payload;
    },
    SMS_LIST(state, payload) { // 短信联系人
      state.smsListData = payload;
    }
  },
  actions: {
    // 获得企业名称
    getUserDeptData({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.userDeptData(params);
        promises.then(res => {
          let arr = [{ value: res.userDeptId, label: res.userDeptName }];
          commit('USER_DATA', arr);
          resolve(arr);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 筹车展期间联络人列表
    getLiaisonContactsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.liaisonContactsList(params);
        promises.then(res => {
          commit('LIAISON_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 筹车展期间联络人 新增
    postAddLiaisonContactsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.addLiaisonContactsList(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 筹车展期间联络人 编辑
    postEditLiaisonContactsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.editLiaisonContactsList(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 组展单位联络人列表
    getGroupExhibitContractsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.groupExhibitContractsList(params);
        promises.then(res => {
          let data = res;
          data.records.forEach(ele => {
            ele.departAreaNum = ele.departmentalFixedTelephone.split('-')[0] || '';
            ele.departTelNum = ele.departmentalFixedTelephone.split('-')[1] || ele.departmentalFixedTelephone;
          });
          commit('GROUPEXHIBIT_LIST', data);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增 组展单位联络人
    postAddGroupExhibitContracts({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.addGroupExhibitContracts(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑 组展单位联络人
    postEditGroupExhibitContracts({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.editGroupExhibitContracts(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增 第三方联络人
    postAddContracts({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.addContracts(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑 第三方联络人
    postEditContracts({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.editContracts(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 第三方职能 获得
    getThirdPartyWork({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.thirdPartyWork();
        promises.then(res => {
          // commit('THIRD_PARTY_WORK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 第三方职能 更新
    postUpdateThirdPartyWork({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.updateThirdPartyWork(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增 短信人
    postaddSms({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.addSms(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 短信联系人列表
    getListSms({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.listSms(params);
        promises.then(res => {
          commit('SMS_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑 短信人
    postupdateSms({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.updateSms(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 组展单位联络人列表
    getContractsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.contractsList(params);
        promises.then(res => { // 页面中处理区号和号码
          let data = res;
          data.records.forEach(ele => {
            ele.thirdPartyTelephonNumberA = ele.thirdPartyTelephonNumber ? ele.thirdPartyTelephonNumber.split('-')[0] || '' : '';
            ele.thirdPartyTelephonNumberB = ele.thirdPartyTelephonNumber ? ele.thirdPartyTelephonNumber.split('-')[1] || '' : '';
          });
          commit('CONTRACT_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 大会领导委员会委员任职名单 tab1
    getLeadershipList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.leadershipList(params);
        promises.then(res => {
          commit('LEADER_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 报送人员信息 tab2
    getAssociationList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.associationList(params);
        promises.then(res => {
          commit('ASSO_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 驻地信息 tab3
    getStationList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.stationList(params);
        promises.then(res => {
          commit('STAT_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团秘书长以上参会人员信息 tab4
    getGeneralList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.generalList(params);
        promises.then(res => {
          commit('GENERAL_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 大会领导委员会 edit
    postLeadershipListEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.leadershipListEdit(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 报送人员信息 edit
    postTradingGroupAssociationEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.tradingGroupAssociationEdit(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 驻地信息 edit
    postTradingGroupStationEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.tradingGroupStationEdit(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团秘书长以上参会人员信息 edit
    postSecretaryGeneralEdit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.secretaryGeneralEdit(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 申请撤回接口
    postWithdraw({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.withdraw();
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 提交大会秘书处接口
    postSubmitSecretary({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.submitSecretary();
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 申请撤回状态
    getWithdrawStatus({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.withdrawStatus();
        promises.then(res => {
          commit('WITHDRAW_STATUS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 申请撤回状态
    getWithdrawList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.withdrawList(params);
        promises.then(res => {
          commit('WITHDRAW_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 申请撤回状态
    postSubmitWithdraw({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.submitWithdraw(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 申请撤回状态
    getSummaryList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.summaryList(params);
        promises.then(res => {
          commit('SUMMARY_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑页面 加入总表页面
    postSubmitSummary({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitContactApi.submitSummary(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
