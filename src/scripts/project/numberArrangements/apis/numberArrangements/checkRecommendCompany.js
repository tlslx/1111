import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 审核申请企业信息查询
  getConfirmCompanyInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/confirmCompanyInfo/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会审核交易团通过的申请企业信息列表的搜索条件信息
  getQueryConditionData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/confirmCompanyInfoCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核通过或不通过企业申请
  postConCompanyScoreUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/businessAssociation/confirmCompanyScore/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看企业资料
  getCompanyInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/companyInfo/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核企业资质列表
  postConCompanyAptitudeQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/confirmCompanyAptitude/getListAll`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会登记企业母子关系及类别表获取查询条件
  getMotherChildRelationConditionData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/motherChildRelationship/motherChildRelationCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会登记企业母子关系及类别表（分页）
  getMotherChildRelationListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/motherChildRelationship/motherChildRelation/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会登记
  postMotherChildRelationshipAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/motherChildRelationship/coceralGrade/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会编辑
  postMotherChildRelationshipUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/motherChildRelationship/coceralGrade/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会删除
  postMotherChildRelationshipDeleteData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/motherChildRelationship/coceralGrade/delete`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会公示或撤回公示登记企业母子关系及类别
  postCoceralGradeUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/motherChildRelationship/coceralGrade/updateById`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会提交企业评分结果查询条件
  getSubmitEvaluationResultQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/confirmCompanyResultCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会提交企业评分结果
  getSubmitEvaluationResultData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/confirmCompanyResult/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交企业评分结果
  postSubmitScoreResultData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/businessAssociation/confirmCompanyResult/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看商协会提交方案（分页）查询条件
  getSeeSubmitPlanQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/workDeptCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看商协会提交方案（分页）
  getSeeSubmitPlanData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/workDept/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取上次保存时间
  getLastSaveTimeData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/lastSaveTime/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部保存方案
  postWorkDeptSaveData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/businessAssociation/workDept/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看商协会方案对比差异（分页）查询条件
  getContrastDiffRatioQueryData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/workDeptDiffCondition/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看商协会方案对比差异（分页）
  getContrastDiffRatioData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/businessAssociation/workDeptDiff/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核申请企业信息 上传
  uploadConfirmCompanyInfo(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/businessAssociation/confirmCompanyInfo/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 登记企业母子关系及类别表 上传
  uploadMotherChildRelation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/motherChildRelationship/motherChildRelation/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交企业评分结果 上传
  uploadConfirmCompanyResult(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/businessAssociation/confirmCompanyResult/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
