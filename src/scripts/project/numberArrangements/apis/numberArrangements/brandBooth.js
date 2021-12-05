import { $req } from "../../../utils";
const BASE_URL = process.env.API_NA_URL;
export default {
  // 查询各类型数量安排阶段的时间点
  getListScheduleConfig(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ScheduleConfig/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增时间点
  addScheduleConfig(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ScheduleConfig/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确认按钮
  updateConfirm(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ScheduleConfig/confirm/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除
  deleteByIdScheduleConfig(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ScheduleConfig/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改
  updateScheduleConfig(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ScheduleConfig/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 这里是品牌的分割
  // 品牌展位常规安排
  // 交易团新增反馈意见
  addFeedback(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/SchemePublicity/feedback/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团删除反馈意见
  deleteByIdFeedback(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/SchemePublicity/feedback/deleteById', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下载交易团反馈意见
  downloadFeedback(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/feedback/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看交易团反馈意见
  getListPageFeedback(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/feedback/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团更新反馈意见
  updateByIdFeedback(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/SchemePublicity/feedback/updateById', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司公示调整安排方安排
  publicitySchemePublicity(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/SchemePublicity/publicity', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司公布调整安排方案
  publishSchemePublicity(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/SchemePublicity/publish', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司公布调整安排方案(非评审期)
  rePublishSchemePublicity(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/SchemePublicity/rePublish', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下载公布查看调整安排方案
  downloadPublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/publish/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 品牌展位调整安排方案公布
  getListPagePublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/publish/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 品牌展位调整安排方案公布(非评审期)
  getListPageRePublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/rePublish/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下载公示查看调整安排方案
  downloadReschedule(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/reschedule/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看调整安排方案
  getListPageReschedule(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/SchemePublicity/reschedule/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司返还方案商协会重新提交方案
  updateReturnPlanForCoceral(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/schemePublicityLog/returnPlanForCoceral/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司处理交易团反馈意见
  updateSchemePublicityLog(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/schemePublicityLog/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
