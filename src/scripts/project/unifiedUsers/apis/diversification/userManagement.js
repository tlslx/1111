import { $req } from '../../../utils';
const BASE_URL = process.env.API_BASE_URL;
const CF_URL = process.env.API_CF_URL;
export default {
  // 用户查询
  getListPage(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysUser/getListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
    // 用户删除
  deleteBatchIds(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysUser/deleteBatchIds', { "json": JSON.stringify(params) }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 用户修改页面赋值
  getSingleById(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysUser/getSingleById?id=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 用户分配大类查询
  listExpertProductCategory(params) {
    return new Promise((resolve, reject) => {
      $req.get(CF_URL + '/api/customservice/cf/listExpertProductCategory?userId=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 用户重置密码
  resetPwd(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysUser/resetPwd', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 用户分配大类保存
  saveExpertProductCategory(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CF_URL + '/api/customservice/cf/saveExpertProductCategory?userId=' + params.userId, params.productCategoryIdList).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专家删除
  deleteExpert(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CF_URL + '/api/customservice/cf/deleteExpert', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
