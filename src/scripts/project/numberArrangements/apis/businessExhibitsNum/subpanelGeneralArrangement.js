import { $req } from "../../../utils";
const BASE_URL = process.env.API_NA_URL;
export default {
  // 导入贫困县数据(暂时没做)
  addPoorData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDeadlineConfig/importPoorData/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部设置的规则
  getListDeadlineConfig(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/OrdinaryDeadlineConfig/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部设置规则
  addDeadlineConfig(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDeadlineConfig/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部编辑规则
  updateDeadlineConfig(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDeadlineConfig/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部删除规则
  deleteDeadlineConfig(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/OrdinaryDeadlineConfig/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询交易团设置的一般性展位安排
  getListRecommendCompanyjyt(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/company/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询交易团分团设置的一般性展位安排
  getListRecommendCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendBranch/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团根据企业名和展区查询企业一般性展位申请数据
  getListAllCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/company/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团新增获取上届数据
  getListLastNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/lastNumber/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团提交一般性展位数量安排时，获取分团提交的安排
  getRecommendCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团新增设置的一般性展位安排
  addRecommendCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendCompany/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团编辑设置的一般性展位安排
  updateRecommendCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendCompany/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/分团设置粘连性
  getAdjoinRecommendCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/adjoin/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/分团设置贫困地区
  getPoorRecommendCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/poor/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团删除设置的一般性展位安排
  deleteByIdRecommendCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/deleteById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会一般性展位数量方案汇总查看
  getListPageRecommendCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/coceral/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会审核粘连数界面
  updateCoceralCheck(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendCompany/coceralCheck/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看安排方案
  addOrdinaryDeadlineConfig(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/coceralCheck/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询交易团授权信息
  getListPageAuthorizeLog(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/authorizeLog/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询交易团分团信息
  getListPageDelegationSub(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/authorizeLog/delegationSub/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团授权/取消授权
  updateAuthorizeLog(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/authorizeLog/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团新增授权信息
  addAuthorizeLog(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/authorizeLog/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询分团提交的一般性展位安排
  getListPageRecommendBranch(param) {
    return new Promise((resolve, reject) => {
      //$req.get(BASE_URL + '/api/ordinaryRecommendBranch/getListPage', param).then(res => {
      $req.get(BASE_URL + '/api/ordinaryRecommendBranch/getDelegationSubListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团新增获取上届数据
  getLastNumber(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendBranch/lastNumber/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团编辑设置的一般性展位安排
  updateRecommendBranch(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendBranch/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团填写一般性展位安排
  addRecommendBranch(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendBranch/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团删除设置的一般性展位安排
  deleteByIdBranch(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendBranch/deleteById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团审核分团提交的申请
  addCheckApply(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendBranch/checkApply/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 一般性展位安排展区查询
  getListAllExhibitionArea(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/exhibitionAreaByDelegation/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 一般性展位安排企业名查询
  getListAllCompanyDemand(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/companyByDelegation/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团设置的一般性展位安排 的 上传
  uploadOrdinaryRecommendCompany(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendCompany/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团填写一般性展位数量安排 上传
  uploadOrdinaryRecommendBranch(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryRecommendBranch/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 产品类别
  getListAllProduct(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryRecommendCompany/product/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 分团 固定 deptType = 30;
  getSysDepartment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/sysDepartment/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
