import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 查询企业品牌展位数量申请
  getQueryEnterpriseBrand(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/dealClusterCheckApply/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据企业id查询企业信息（调用网上服务接口 待完成）

  // 查询交易团预审企业核结果（待确认）
  getEnterpriseAuditResults(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/applyCheckLog/getCompanyCheckLog', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团预审企业基本信息
  preAuditEnterpriseInfor(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/applyCheckLog/companyInfoCheck/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据申请id查询用于该展区的海关编码列表
  getQueryIdCustomsCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/applyCustomCode/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核企业海关编码
  getAuditCustomsCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/applyCustomCode/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有展区列表(展览策划，未完成)

  // 交易团添加海关编码
  addCustomsCode(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/applyCustomCode/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团修改海关编码（需同步网上服务接口）
  updateApplyCustomCode(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/applyCustomCode/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团删除海关编码
  deletCustomsCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/applyCustomCode/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团查询企业品牌展位条件列表
  getCheckBrandBoothUseCondition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/applyNumber/checkBrandBoothUseCondition/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核企业品牌展位使用条件
  updateCheckBrandBoothUseCondition(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/applyNumber/checkBrandBoothUseCondition/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增母子关系
  addMotherChildRelationship(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/motherChildRelationship/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量新增母子关系表(上传接口，待完成)

  // 母子关系excel下载模板（待完成）

  // 获取母子关系列表（分页）
  getMotherChildRelationship(param) {
    return new Promise((resolve, reject) => {
      // const interfaceUrl = BASE_URL + '/api/motherChildRelationship/getListPage?json=' + param;
      // console.info(interfaceUrl);
      // let params = "json=" + param;
      $req.get(BASE_URL + '/api/motherChildRelationship/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取母子关系列表（不分页）
  // getAllMotherChildRelationship(param) {
  //   return new Promise((resolve, reject) => {
  //     $req.get(BASE_URL + '/api/motherChildRelationship/getListAll', param).then(res => {
  //       resolve(res);
  //     }).catch(e => {
  //       reject(e);
  //     });
  //   });
  // },
  // 根据id更新母子关系
  updateMotherChildRelationship(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/motherChildRelationship/updateById', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据主键id删除母子关系
  deleteMotherChildRelationship(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/motherChildRelationship/deleteById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据主键id获取企业母子关系
  getByIdMotherChildRelationship(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/motherChildRelationship/getById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核企业母子关系（单个）
  dealClusterCheckMotherChildRelationship(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/motherChildRelationship/dealClusterCheck/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核企业母子关系（批量）
  updateBatchMotherChildRelationship(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/motherChildRelationship/dealClusterCheck/updateBatch', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团管理查询企业申请情况
  getDealClusterQueryApply(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/applyNumber/dealClusterQueryApply/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
