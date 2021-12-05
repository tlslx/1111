import { leaderGroupApi } from '../../../apis';
export default { // 领导小组
  namespaced: true,
  state: {
    pageLeaderData: {},
    pageByConditionData: {},
    noticeWorkPageData: {},
    checStatusListData: {},
    feedbackListData: {},
    contactByNameData: {},
    pageBySubList: {},
    centerDeptOptData: {},
    deleNoticeManageData: {},
    deleTopicNoticeManageData: {},
    checkTopicListData: {}
  },
  getters: {
    pageLeaderData: state => state.pageLeaderData,
    pageByConditionData: state => state.pageByConditionData,
    noticeWorkPageData: state => state.noticeWorkPageData,
    checStatusListData: state => state.checStatusListData,
    feedbackListData: state => state.feedbackListData,
    contactByNameData: state => state.contactByNameData,
    pageBySubList: state => state.pageBySubList,
    centerDeptOptData: state => state.centerDeptOptData,
    deleNoticeManageData: state => state.deleNoticeManageData,
    deleTopicNoticeManageData: state => state.deleTopicNoticeManageData,
    checkTopicListData: state => state.checkTopicListData
  },
  mutations: {
    LEADER_COMP_LIST(state, payload) {
      state.pageLeaderData = payload;
    },
    LEADER_CONTACT_LIST(state, payload) {
      state.pageByConditionData = payload;
    },
    NOTICE_LIST(state, payload) {
      state.noticeWorkPageData = payload;
    },
    RECEIPT_STATE_LIST(state, payload) {
      state.checStatusListData = payload;
    },
    FEEDBACK_LIST(state, payload) {
      state.feedbackListData = payload;
    },
    COMPANY_NAME_OPTION(state, payload) {
      state.contactByNameData = payload;
    },
    FEEDBACK_DETAILS_LIST(state, payload) {
      state.pageBySubList = payload;
    },
    CENTER_DEPT_OPT(state, payload) {
      state.centerDeptOptData = payload;
    },
    DELE_NOTICE_LIST(state, payload) {
      state.deleNoticeManageData = payload;
    },
    DELE_TOPIC_NOTICE_LIST(state, payload) {
      state.deleTopicNoticeManageData = payload;
    },
    CHECK_TOPIC_LIST(state, payload) {
      state.checkTopicListData = payload;
    }
  },
  actions: {
    // 工作领导小组成员单位管理
    getPageLeader({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.pageLeader(params);
        promises.then(res => {
          commit('LEADER_COMP_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 选择成员名单
    postSelectMember({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.selectMember(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 手动录入
    postAddByAuto({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.addByAuto(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除单条
    postDeleteById({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.deleteById(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 报送单条
    postSendStatus({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.sendStatus(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量删除
    postDeleteByIds({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.deleteByIds(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 全部成员名单报送
    postUpdateByIds({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.updateByIds(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },

    // 通讯录页面 列表
    getPageByCondition({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.pageByCondition(params);
        promises.then(res => {
          commit('LEADER_CONTACT_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 通讯录页面 新增
    postAddContact({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.addContact(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 通讯录页面 编辑
    postEditContact({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.editContact(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 通讯录页面 删除
    postContactDeleteById({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.contactDeleteById(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 通讯录页面 批量删除
    postContactDeleteByIds({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.contactDeleteByIds(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },

    // 通知事件管理
    getNoticeWorkPage({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.noticeWorkPage(params);
        promises.then(res => {
          commit('NOTICE_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看回执状态
    getChecStatusList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.checStatusList(params);
        promises.then(res => {
          commit('RECEIPT_STATE_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看议题反馈 列表
    getTopicFeedbackList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.topicFeedbackList(params);
        promises.then(res => {
          commit('FEEDBACK_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 模糊查询 企业名称
    getContactByName({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.contactByName(params);
        promises.then(res => {
          commit('COMPANY_NAME_OPTION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 议题详情
    getPageBySubList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.pageBySubList(params);
        promises.then(res => {
          commit('FEEDBACK_DETAILS_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 议题详情 单行保存
    postPageBySubRowSave({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.pageBySubRowSave(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },

    // 领导小组 通知报送-提交
    postSendNotice({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.sendNotice(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 中心部门下拉框
    postCenterDeptOpt({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.centerDeptOpt();
        promises.then(res => {
          commit('CENTER_DEPT_OPT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团 通知管理
    getDeleNoticeManage({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.deleNoticeManage(params);
        promises.then(res => {
          commit('DELE_NOTICE_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团 通知议题管理
    getDeleTopicNoticeManage({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.deleTopicNoticeManage(params);
        promises.then(res => {
          commit('DELE_TOPIC_NOTICE_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团 通知议题管理
    getCheckTopicList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.checkTopicList(params);
        promises.then(res => {
          commit('CHECK_TOPIC_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 交易团 查看议题-保存
    postCheckTopicSave({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = leaderGroupApi.checkTopicSave(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
