import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
 // 添加工作部品牌评审规则设置
  addWorkDepartmentBrand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/reviewRuleSetting/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据主键ID查询工作部评审规则设置
  getQueryReviewRuleSettings(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/reviewRuleSetting/getById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部品牌评审规则列表
  getBrandEvaluationRules(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/reviewRuleSetting/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据主键Id删除评审规则
  deleteReviewRules(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/reviewRuleSetting/deleteById', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据主键ID更新
  updateBasedPrimaryKey(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/reviewRuleSetting/updateById', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
