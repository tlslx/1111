import { $req } from '../../../utils';
const BASE_URL = process.env.API_BASE_URL;
export default {
  // 角色列表查询
  getRoleList(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysRole/getListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 角色列表删除
  delRole(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysRole/deleteBatchIds', { "json": JSON.stringify(params) }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 角色创建
  getroleSave(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysRole/add', {
        json: JSON.stringify({
          formData: JSON.stringify(params.baseInfo),
          subTables: [JSON.stringify(params.subTables)],
          subTableNames: params.subTableNames,
          subTableLength: params.subTableLength
        }) }).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
    });
  },
  // 查询用户
  getUserList(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysUserRole/getListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增用户列表
  getListPage(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysUser/getListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改列表 赋值
  getSingleById(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysUserRole/getListPage?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 权限列表
  getListAll(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/sysRole/getSingleById?id=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 角色修改
  updateById(params) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/api/sysRole/updateById', {
        json: JSON.stringify({
          formData: JSON.stringify(params.baseInfo),
          subTables: [JSON.stringify(params.subTables)],
          subTableNames: params.subTableNames,
          subTableLength: params.subTableLength
        }) }).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
    });
  }

};
