import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 工作部查询计算规则
  getListAllOrdinary(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBaseRule/getListAll?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部编辑计算规则
  updateOrdinaryBase(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBaseRule/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 核算交易团一般展位基数
  addOrdinaryBase(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询切块支持数
  getListOrdinary(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBaseCount/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 清空切块支持数
  deleteOrdinaryBase(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBaseCount/delete', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部根据规则计算一般性展位基数
  getOrdinaryBase(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBase/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部根据规则计算一般性展位基数
  addBase(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑工作部根据规则计算一般性展位基数
  updateBase(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交一般性展位基数给外贸司
  updateBaseNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/postBaseNumber/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询提交到外贸司的一般性展位核算基数
  getCheckBaseNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBase/getCheckBaseNumber/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司审核一般性展位基数
  updateCheckNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/checkBaseNumber/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导入切块支持数
  addImportSupportNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBaseCount/importSupportNumber/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导入展位基数
  postScheduleApply(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/importBaseNumber/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位基数下载
  downloadBaseNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBase/baseNumber/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查询交易团申请展区范围
  getDelegationApplyRangeData(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBase/baseRecord/getTemplateListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部交易团申请展区范围新增
  postDelegationApplyRangeAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/template/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部交易团申请展区范围编辑
  postDelegationApplyRangeEditData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/template/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部交易团申请展区范围删除
  postDelegationApplyRangeDeleteData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/template/delete', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确认本团的各期一般性展位数量查询 
  getBoothNumberQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBase/getOrdinaryNumber', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确认本团的各期一般性展位数量
  postBoothNumberCheckData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/confirmBaseNumber/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各团各期各展区展位需求申报
  getEveryBoothNeedApplyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryBase/getNumberInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各团各期各展区展位需求申报提交
  postEveryBoothNeedApplySubmitData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/postDemandNumber/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询交易团需求申报结果
  postDelegationNeedApplyData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryBase/selectDemandRecord', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
