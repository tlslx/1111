import { $req } from '../../../utils';
const CF_URL = process.env.API_CF_URL;
export default {
  //获取最新活动编号
  getLastActivityCode() {
    return new Promise((resolve, reject) => {
      $req.get(CF_URL + '/api/customservice/cf/getLastActivityCode').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
    //获取所有活动编号
  getCfActivityCode() {
    return new Promise((resolve, reject) => {
      $req.get(CF_URL + '/api/customservice/cf/getCfActivityCode').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //产品大类列表
  getListProductCategory(params) {
    return new Promise((resolve, reject) => {
      $req.get(CF_URL + '/api/customservice/cf/listProductCategory?activityCode=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //产品大类删除
  deleteProductCategory(params) {
    return new Promise((resolve, reject) => {
      $req.get(CF_URL + '/api/customservice/cf/deleteProductCategory?productCategoryId=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
    //产品类别新增
  saveProductCategory(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CF_URL + '/api/customservice/cf/saveProductCategory', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //产品类别修改
  updateProductCategory(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CF_URL + '/api/customservice/cf/updateProductCategory', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //产品类别一键导入
  saveProductCategoryByLastest(params) {
    return new Promise((resolve, reject) => {
      $req.post(CF_URL + '/api/customservice/cf/saveProductCategoryByLastest', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
