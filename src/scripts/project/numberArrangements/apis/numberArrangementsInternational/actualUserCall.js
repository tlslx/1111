import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 汇总实际使用者名单(分页)
  getListOrdinary(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/ordinaryUser/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 商协会复核分页条件查询
  getListDealCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/coceralGradeCondition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 外贸中心汇总实际使用名单的查询
  getListDealConditionft(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/condition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 外贸司审核查询条件
  getForeignTradeCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignTradeCondition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 外贸中心、交易团查看复核结果查询条件
  getForeignCenterCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignCenterCondition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 外贸中心汇总使用者参展资格审核情况表查询条件
  getForeignCheckCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignCheckCondition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 外贸司查看同步至一般性展位数量安排查询条件
  getForeignTradeSyncCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignTradeSyncCondition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询条件的接口 condition/get 交易团审核参展资格查询条件
  getListDealConditionjyt(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/dealGradeCondition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发送状态的接口 sendData/add
  addSendData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryUser/sendData/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核参展资格(分页)
  getListDealGrade(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/dealGrade/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会复核(分页)
  getListCoceralGrade(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/coceralGrade/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取分页查询条件
  getListCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/condition/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 点击“通过、不通过或者未审核”按钮，交易团提交审核参展资格
  addDealGrade(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryUser/dealGrade/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 点击“通过、不通过或者未审核”按钮，商协会提交审核参展资格
  addCoceralGrade(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryUser/coceralGrade/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司审核(分页)
  getListfOreignTrade(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignTrade/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸中心、交易团查看复核结果(分页)
  getListForeignCenter(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignCenter/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸中心汇总使用者参展资格审核情况表(分页)
  getListForeignCheck(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignCheck/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司查看同步至一般性展位数量安排(分页)
  getForeignTradeSync(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryUser/foreignTradeSync/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司审核(通过/不通过)
  addForeignTradeSync(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryUser/foreignTradeConfirmBase/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
