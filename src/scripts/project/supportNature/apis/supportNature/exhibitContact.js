import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 获得企业名称
  userDeptData(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupContact/getUserDeptData', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 筹车展期间联络人列表
  liaisonContactsList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupGroupContactMain/list', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增 筹车展期间联络人
  addLiaisonContactsList(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupGroupContactMain/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑 筹车展期间联络人
  editLiaisonContactsList(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupGroupContactMain/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 组展单位联络人列表
  groupExhibitContractsList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupContact/list', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增 组展单位联系人
  addGroupExhibitContracts(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupContact/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑 组展单位联系人
  editGroupExhibitContracts(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupContact/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增 第三方单位联系人
  addContracts(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupThirdPartyContact/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑 第三方单位联系人
  editContracts(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupThirdPartyContact/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  contractsList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupThirdPartyContact/list', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增 短信联系人
  addSms(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupSmsReceiving/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // list 短信联系人
  listSms(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupSmsReceiving/list', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // update 短信联系人
  updateSms(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupSmsReceiving/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 第三方职能
  thirdPartyWork() {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupThirdPartyWork/getThirdPartyWork').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改 第三方职能
  updateThirdPartyWork(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupThirdPartyWork/updateThirdPartyWork', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 大会领导委员会委员任职名单 tab1
  leadershipList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupLeadershipList/getLeadership', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 报送人员信息
  associationList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupAssociation/getAssociation', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 驻地信息
  stationList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupStation/getStation', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团秘书长以上参会人员信息
  generalList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupAboveSecretaryGeneral/getGeneral', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 大会领导委员会 edit
  leadershipListEdit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupLeadershipList/edit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 报送人员信息 edit
  tradingGroupAssociationEdit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupTradingGroupAssociation/edit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 驻地信息 edit
  tradingGroupStationEdit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupTradingGroupStation/edit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团秘书长以上参会人员信息 edit
  secretaryGeneralEdit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupAboveSecretaryGeneral/edit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑页面 申请撤回接口
  withdraw() {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupAboveSecretaryGeneral/withdraw').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑页面 提交大会秘书处接口
  submitSecretary() {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupAboveSecretaryGeneral/send').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑页面 申请撤回状态
  withdrawStatus() {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupAssociation/getStatus').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 撤回页面list
  withdrawList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupStation/pageBack', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 撤回页面 - 确认撤回
  submitWithdraw(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupTradingGroupStation/updateOutStatus', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 加入总表页面 list
  summaryList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupStation/pageCheck', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 加入总表页面 - 确认
  submitSummary(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupTradingGroupStation/updateInStatus', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
