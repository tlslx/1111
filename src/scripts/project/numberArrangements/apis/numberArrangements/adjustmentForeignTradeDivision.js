import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 外贸司批复经外贸中心复核的展位数量调整安排方案中提交重新安排(分页)查询条件
  getRescheduleListQueryPageData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/condition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司批复经外贸中心复核的展位数量调整安排方案中提交重新安排(分页)
  getRescheduleListPageData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交批复结果
  postRescheduleUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //外贸司审批并公示安排结果(分页)查询条件
  getExamineResultQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/examineCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //外贸司审批并公示安排结果(分页)
  getExamineResultData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/examine/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司编辑保存公布方案
  postExamineUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/examine/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 点击公示，选择发布平台并确认
  postPublicityAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/publicity/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司汇总并公示意见表(分页)查询条件
  getForeignSummaryQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/foreignSummaryCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司汇总并公示意见表(分页)
  getForeignSummaryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/foreignSummary/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 返还商协会
  postReturnAssoUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/returnAsso/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司公布方案查询条件
  getPublishConditionQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/publishCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司公布方案
  getPublishConditionData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/publish/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司编辑保存公布方案
  postPublishUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/publish/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 点击公示，选择发布平台并确认
  postPublishAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/publish/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 登记反馈意见查询条件
  getDealFeedbackConditionQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/dealFeedbackCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 登记反馈意见查询
  getDealFeedbackConditionData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/dealFeedback/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增反馈意见
  postDealFeedbackAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/dealFeedback/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑反馈意见
  postDealFeedbackUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/dealFeedback/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除反馈意见
  postDealFeedbackDeleteData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/dealFeedback/delete`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司审批并公示安排结果(公式接口)
  getpublicityDate(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/publicity/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 外贸司审批并公示安排结果(公布方案)
  getpublishAdd(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/publish/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
