import { $req } from '../../../utils';
const BASE_URL = process.env.API_BASE_URL;
const CF_URL = process.env.API_CF_URL;
export default {
  // 用户新增
  getAddUser(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysUser/add', {
        json: JSON.stringify({
          formData: JSON.stringify(params),
          subTables: [JSON.stringify([])],
          subTableNames: [],
          subTableLength: 0
        }) }).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
    });
  },
    // 专家新增
  saveExpert(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CF_URL + '/api/customservice/cf/saveExpert', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 用户修改
  updateById(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysUser/updateById', {
        json: JSON.stringify({
          formData: JSON.stringify(params),
          subTables: [JSON.stringify([])],
          subTableNames: [],
          subTableLength: 0
        }) }).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
    });
  },
  // 获取部门
  getListAll(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysDepartment/getListAll?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专家修改
  updateExpert(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CF_URL + '/api/customservice/cf/updateExpert', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 按ID查询专家
  getExpertById(params) {
    return new Promise((resolve, reject) => {
      $req.get(CF_URL + '/api/customservice/cf/getExpertById?userId=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
