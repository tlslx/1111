import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 外贸司公布方案结果查询
  getSchemeForeignTradeData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/SchemePublish/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司公布品牌数量安排方案截止时间
  getDeadlineDateData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/SchemePublish/getDeadline`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 保存品牌企业展位数
  postBrandNumEditData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/SchemePublish/edit?` + data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 公布方案结果
  postSchemePublishAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/SchemePublish/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团收取企业定金情况列表
  getDepositInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/SchemePublish/depositInfo/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团提交收取企业定金情况
  postDepositInfoEditData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/SchemePublish/depositInfo/edit${data}`).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团获取退回确认书
  postBackConfirmData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/SchemePublish/dealCluster/get`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取注意书注意事项
  getExplainSetData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backConfirmation/explainSet/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团提交退回确认书
  postAddBackConfirmData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/SchemePublish/dealCluster/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团查看退回展位列表
  getSeeBackBoothsListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/SchemePublish/dealCluster/getBackListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 附件上传
  postFileUploadData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
