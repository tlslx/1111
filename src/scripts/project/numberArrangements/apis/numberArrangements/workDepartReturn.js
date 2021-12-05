import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 统计生成退回展位企业列表清单
  getReturnBoothData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getReturnCompanyInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各展区重新安排展位数清单
  getBoothReorderData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getBoothReorderInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看待安排展位数
  getSelectNumberArrangedListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/selectNumberArrangedList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部生成统计汇总表
  getReturnBoothSummaryInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getReturnBoothSummaryInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 重新安排方案查询
  getRescheduleInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getRescheduleInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 拟定企业信息查询
  getCompanyInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getCompanyInformation`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取可安排展位数
  getArrangableBoothData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getArrangableBooth`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 重新安排方案添加
  postAddRescheduleInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/backArrange/addRescheduleInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改安排方案
  postUpdateRescheduleInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/backArrange/updateRescheduleInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除安排方案
  getDelRescheduleInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/delRescheduleInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交重新安排方案
  postSubmitRescheduleInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/backArrange/submitRescheduleInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展区查询重新安排展位数量信息
  getBoothArrangeNumberData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getBoothArrangeNumber`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 待安排展区数数量查询
  getSelectNumberAffirmList(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/selectNumberAffirmList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询各展区品牌候选企业排序表
  postCandidateSortInfoData(data) {
    return new Promise((resolve, reject) => {
      // console.log(data);
      $req.postJson(`${BASE_URL}/api/backArrange/getCandidateSortInfo?current=${data.current}&size=${data.size}`,
        {
          exhibitionArea: data.exhibitionArea,
          dealClusterId: data.dealClusterId,
          companyName: data.companyName,
          exhibitionSession: data.exhibitionSession
        }).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
    });
  },
  // 未安排企业评分比对表
  getScoreComparisonInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getScoreComparisonInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 当届调整安排表信息
  getAdjustmentArrangeInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getAdjustmentArrangeInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部复核品牌展位调整安排方案
  getCheckBrandBoothPlanData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/reschedule/checkByWork/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 复核
  postCheckBrandBoothPlanData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/checkByWork/check`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部发外贸司审定
  postSendTradeCheckData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/checkByWork/postToForeignTrade`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 返回前台页面需要的展届数
  getExhibitionSession(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/backArrange/getExhibitionSession`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司审定查询
  getSelectRescheduleListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/foreignTradeApprove/selectRescheduleListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司审定提交
  postSelectRescheduleListData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/reschedule/batchUpdate`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
