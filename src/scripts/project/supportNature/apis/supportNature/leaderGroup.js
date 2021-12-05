import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 工作领导小组成员单位管理
  pageLeader(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupMemberOrg/getPageLeader', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 选择成员名单
  selectMember(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberOrg/selectMember', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 手动录入
  addByAuto(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberOrg/addByAuto', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除单条
  deleteById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberOrg/deleteById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 报送单条
  sendStatus(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberOrg/sendStatus', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量删除
  deleteByIds(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberOrg/deleteByIds', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 全部成员名单报送
  updateByIds(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberOrg/updateByIds', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 通讯录页面 列表
  pageByCondition(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupMemberContact/getPageByCondition', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 通讯录页面 新增
  addContact(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberContact/addContact', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 通讯录页面 编辑
  editContact(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberContact/edit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 通讯录页面 删除
  contactDeleteById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberContact/deleteById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 通讯录页面 批量删除
  contactDeleteByIds(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupMemberContact/deleteByIds', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 通知事件管理
  noticeWorkPage(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupEvent/getPage', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看回执状态列表
  checStatusList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupSendMemberEvent/checStatus', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看议题反馈 列表
  topicFeedbackList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupSubject/getPageDto', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 模糊查询 企业名称
  contactByName(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupMemberOrg/getContactByName', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 议题详情
  pageBySubList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupFeedback/getPageBySub', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 议题详情 单行保存
  pageBySubRowSave(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupFeedback/editByManual', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 领导小组 通知报送
  sendNotice(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupEvent/sendNotice', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 中心部门下拉框
  centerDeptOpt() {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupEvent/getDept').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团 通知管理
  deleNoticeManage(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupSendMemberEvent/getPage', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团 通知议题管理
  deleTopicNoticeManage(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupSubject/getPage', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团 通知议题管理
  checkTopicList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupFeedback/getPage', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团 查看议题-保存
  checkTopicSave(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupFeedback/edit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
