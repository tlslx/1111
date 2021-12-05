import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 查询展区标签
  queryExhAreaTag(current, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/tag/queryExhAreaTag?current=' + current + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 新增展区标签
  addExhAreaTag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/tag/addExhAreaTag', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除展区标签
  deletExhAreaTag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/tag/deleteExhAreaTag', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 修改展区标签
  modifyExhAreaTag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/tag/modifyExhAreaTag', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 查询组展标签
  queryUnitTag(current, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/tag/queryUnitTag?current=' + current + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 新增组展标签
  addUnitTag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/tag/addUnitTag', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除组展标签
  deletUnitTag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/tag/deleteUnitTag', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }, 

  // 修改组展标签
  modifyUnitTag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/tag/modifyUnitTag', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询进度计划设置
  queryPlan(current, exhibitionNum, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/rule/query4set?current=' + current + '&exhibitionNum=' + exhibitionNum + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询已提交的计划
  query4Plan(current, exhibitionNum, size, publishStatus) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/rule/query4submit?current=' + current + '&exhibitionNum=' + exhibitionNum + '&size=' + size + '&publishStatus=' + publishStatus).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询进度计划查看
  queryPlanLook(current, exhibitionNum, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/rule/query?current=' + current + '&exhibitionNum=' + exhibitionNum + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询特例进度计划查看
  queryPlanLookEx(current, exhibitionNum, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/rule/query4submit?current=' + current + '&exhibitionNum=' + exhibitionNum + '&size=' + size + '&publishStatus=-1').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发布前修改进度计划规则
  modifyBeforePublish(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/rule/modifyBeforePublish', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发布后修改进度计划规则
  modifyAfterPublish(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/rule/modifyAfterPublish', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交进度计划规则
  sublishPlan(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/rule/submit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发布进度计划规则
  publishPlan(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/rule/publish', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 计算工作日和自然日
  worksAndDays(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/rule/worksAndDays', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询进度计划规则的届数
  queryExhibitionNum() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exp/exhibitions/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询进度计划规则的最新届数
  currentSession() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exp/exhibitions/current').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询特例列表
  queryExtra(current, progressRuleId, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/extra/query?current=' + current + '&progressRuleId=' + progressRuleId + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询特例详情
  getExtra(progressRuleExtraId) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/extra/get?progressRuleExtraId=' + progressRuleExtraId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询特例组展标签
  queryOrgIdByTag(unitTag) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/tag/queryOrgIdByTag?unitTag=' + unitTag).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增特例
  addExtra(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/extra/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除特例
  removeExtra(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/extra/remove', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 修改特例
  modifyExtra(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/progress/extra/modify', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸中心-查看组展进度计划
  queryTradeCenter(current, exhibitionNum, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/see/ftc/query?current=' + current + '&exhibitionNum=' + exhibitionNum + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 组展单位-查看组展进度计划
  queryOrganizerWatch(current, exhibitionNum, orgId, size, isOnly) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/see/org/query?current=' + current + '&exhibitionNum=' + exhibitionNum + '&orgId=' + orgId + '&size=' + size + '&isOnly=' + isOnly).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 组展单位-查看当前进度计划
  queryOrganizer(current, exhibitionNum, orgId, size) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/progress/see/cur/query?current=' + current + '&exhibitionNum=' + exhibitionNum + '&orgId=' + orgId + '&size=' + size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
