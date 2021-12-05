import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 查询工作部设置的规则
  getListAdjustDemand(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustDemand/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部设置的规则相关的展区
  getListAreaCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustDemand/selectexhibitionAreaCode/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部设置的规则相关的交易团
  getListDelegation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustDemand/selectdelegationCode/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 设置规则
  addAdjustDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustDemand/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改规则
  updateAdjustDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustDemand/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询交易团一般性展位调整需求
  getListIntent(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryExchangeIntent/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团添加一般性展位调整需求
  addIntent(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryExchangeIntent/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团发布一般性展位调整需求
  updateSchedueRequest(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryExchangeIntent/publishSchedueRequest/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询跟本交易团发布一般性展位调整需求相匹配的其他交易团
  getListExchangeIntent(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryExchangeIntent/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 系统匹配完后，向符合要求的交易团发送调整请求
  addSendScheduleRequest(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryExchangeIntent/sendScheduleRequest/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑交易团调整需求
  updateOrdinaryExchangeIntent(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryExchangeIntent/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除交易团调整需求
  deleteOrdinaryExchangeIntent(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryExchangeIntent/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量删除交易团调整需求
  deleteBatchOrdinaryExchangeIntent(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryExchangeIntent/deleteBatch', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发布调整需求时，查询需要处理的调整需求
  getListSendScheduleRequest(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryExchangeIntent/sendScheduleRequest/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发布调整需求时，处理展位调整需求
  updateSendScheduleRequest(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryExchangeIntent/sendScheduleRequest/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询填写的一般性调整申请
  getListAdjustApplyDelegation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 填写一般性调整申请
  addAdjustApplyDelegation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑一般性调整申请
  updateAdjustApplyDelegation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除一般性调整申请
  deleteAdjustApplyDelegation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 填写一般性调整申请时，查询需要处理的展位调整请求
  getListPostScheduleApply(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/postScheduleApply/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 填写一般性调整申请时，处理展位调整需求
  updatePostScheduleApply(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/postScheduleApply/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询还原调整
  getListRestoreScheduleApply(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/restoreScheduleApply/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 进行还原调整
  addRestoreScheduleApply(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/restoreScheduleApply/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 线上记录查询
  getListAllScheduleApply(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/allScheduleApply/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询商协会审核交易团展位调整申请
  getListCoceralScheduleApply(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/coceralScheduleApply/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会审核交易团展位调整申请
  updateCheckScheduleApplyByCoceral(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/checkScheduleApplyByCoceral/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部审核交易团展位调整申请
  getListWorkScheduleApply(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/workScheduleApply/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部审核商协会审核通过的一般性交易团展位申请调整，审核通过的话，同时生成调整记录
  updateCheckScheduleApplyByWork(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/checkScheduleApplyByWork/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询生成的调整记录
  getAdjustRecord(param) {
    return new Promise((resolve, reject) => {
      let par = encodeURI(JSON.stringify(param));
      $req.get(BASE_URL + '/api/ordinaryAdjustRecord/getListPage?json=' + par).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 撤回调整记录
  addReturnScheduleRecord(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/returnScheduleRecord/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位数量查询
  getListBoothNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/boothNumber/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团查看安排方案
  getListSchedulePlan(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/getSchedulePlan/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询录入的展位调整
  getListEntryBoothAdjustment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/entryBoothAdjustment/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增录入展位调整
  addEntryBoothAdjustment(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/entryBoothAdjustment/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改录入展位调整调换记录
  updateEntryBoothAdjustment(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/entryBoothAdjustment/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除录入展位调整调换记录
  deletEntryBoothAdjustment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/entryBoothAdjustment/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量删除录入展位调整调换记录
  deletBatchEntryBoothAdjustment(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryAdjustApplyDelegation/entryBoothAdjustment/deleteBatch', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部人工录入还原调整时,获取可还原列表
  getEntryBoothAdjustment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/entryBoothAdjustment/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
