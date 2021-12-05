import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 5.1 商协会查询新题材工作部根据规则生成或上传的企业申请记录(商协会复核展位数量安排通过的企业申请记录)
  getNewthemePublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemePublish/coceral/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.2 商协会复核展位数量安排通过的企业申请记录
  updateNewthemePublish(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemePublish/check/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.3 商协会复核完成反馈工作部
  updateNewthemeFeedback(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemePublish/feedback/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.4 查询新题材商协会复核展位数量安排通过的企业申请记录
  getListNewthemePublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemePublish/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.5 外贸司审定展位数量安排方案
  updateCheckNewthemeFeedback(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemePublish/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.11 外贸中心审核调整重新安排方案
  updateCheckPlanNewthemePublish(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/checkPlan/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.12 外贸中心查询安排方案
  getNewthemeWorkScheduleNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeWorkScheduleNumber/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.13 外贸中心提交审核结果
  updateNewthemeWorkScheduleNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/postPlan/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.14 外贸中心发商协会查看
  addNewthemeWorkScheduleNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/sendToCoceral/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.15 外贸中心调整方案
  updatePnewthemeWorkScheduleNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.21 外贸司查看审核展位安排调整方案
  getForeignTrade(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeWorkScheduleNumber/foreignTrade/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.22 外贸司审核重新安排方案
  updateForeignTrade(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/foreignTrade/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.31 商协会查看新题材展位安排结果(展位数量调整)
  getCoceralWorkScheduleNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeWorkScheduleNumber/coceral/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.41 企业/交易团申请新题材展位调整
  addNewthemeAdjustCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeAdjustCompany/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.42 交易团审核企业调整申请
  addCheckAdjustCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeAdjustCompany/checkAdjust/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.43 交易团根据企业名称、展区、产品专区获取企业的展位申请数
  getNewthemeAdjustCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeAdjustCompany/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.44 企业/交易团查询新题材展位安排 
  getListNewthemeAdjustCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeAdjustCompany/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.45 企业/交易团编辑新题材展位调整
  updateNewthemeAdjustCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeAdjustCompany/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.000 新题材企业展位数量调整下载
  downloadBoothNumberAdjust(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeAdjustCompany/boothNumberAdjust/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.46 上传调整函
  uploadNewthemeAdjustCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeAdjustCompany/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.47 下载调整函
  downloadNewthemeAdjustCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeAdjustCompany/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.10 外贸司页面 整体 查询外贸司审核查看公示新题材展位安排结果后的即将公示数据
  getPublicityThemePublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemePublish/publicity/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.11 外贸司审定展位数量安排方案
  addNewthemePublish(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemePublish/publicity/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.234 公布后调整方案公示(展位数量公示管理)get 获取
  getPublicityWorkScheduleNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeWorkScheduleNumber/publicity/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.234 公布后调整方案公示(展位数量公示管理)post 公示
  updatePublicityWorkScheduleNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/publicity/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 8.10 外贸司页面 整体 查询公布的展位數量
  getPublishNewthemePublish(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemePublish/publish/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 8.11 外贸司公示后,进行公布
  addPublishNewthemePublish(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemePublish/publish/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 8.234 公布后调整方案公布(展位数量公布管理)get 获取
  getPublishWorkScheduleNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/newthemeWorkScheduleNumber/publish/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 8.234 公布后调整方案公布(展位数量公布管理)post 公布
  updatePublishWorkScheduleNumber(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/newthemeWorkScheduleNumber/publish/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.6 工作部设置展位安排方案列表（新题材）
  getBoothArrangePlanListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeRoleConfig/boothArrange/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.61 工作部新增展位安排方案（新题材）
  postBoothArrangePlanListAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrange/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展区查询展品专区
  getExhibitionInfoByCodeData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/common/exhibitionInfoByCode/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.62 工作部编辑展位安排方案（新题材）
  postBoothArrangePlanListUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrange/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.63 工作部删除展位安排方案（新题材）
  postBoothArrangePlanListDeleteData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrange/delete`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.64 工作部按规则生成数量安排方案（新题材）
  postAddByRuleArrangementPlanData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrange/addByRule`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.71 企业展位数量安排明细表（新题材）
  getBoothArrangeDetailTableData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeRoleConfig/boothArrangeDetail/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业展位数量安排明细表（新题材）上传
  postBoothArrangeDetailTableUploadData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrange/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.72 工作部保存或提交当届拟安排展位数（新题材）
  postBoothArrangeDetailSaveData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrangeDetail/postProposeNum`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.73 工作部发商协会核对（新题材）
  postBoothArrangeDetailCheckCoceralData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrangeDetail/checkByCoceral`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.74 工作部发外贸司审定
  postboothArrangeDetailCheckForeignTradeData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeRoleConfig/boothArrangeDetail/checkByForeignTrade`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展区查询
  getExhibitionAreaData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/common/exhibitionArea/getListAll`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
