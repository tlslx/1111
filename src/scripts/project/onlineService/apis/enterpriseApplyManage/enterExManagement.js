import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 审核产品
  getOpinion(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitInfo/approveExhibitInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增产品
  addProduct(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitInfo/addExhibitInfoListNew', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除产品
  deleteProduct(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitInfo/deleteExhibitInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新产品
  updateProduct(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitInfo/updateExhibitInfoNew', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量更新产品
  updateProducts(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitInfo/updateExhibitInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询产品详情
  getProductDetail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfo/getExhibitInfoDetailNew?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取产品状态
  getExhibitStatus(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfo/getExhibitStatus?companyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取公司法人信息
  getCompanyLegal(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfo/getCompanyLegalInfo?companyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询审核企业产品
  getAuditEnterProduct(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfo/getExhibitInfoListNew?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取产品类别
  getExhibitCategorys() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitCategory/getExhibitCategorys').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取已标注现场展示产品数
  getExhibitShowCount(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfo/getExhibitShowCount?companyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 转换展区类别CODE
  getExhibitCategory(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitInfo/getExhibitCategory?exhibitTypeOne=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
