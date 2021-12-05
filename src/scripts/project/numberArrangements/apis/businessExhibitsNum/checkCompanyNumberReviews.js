import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 商会查看展位数量调整申请列表查询
  getOrdinaryAdjustCompanyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ordinaryAdjustCompany/coceral/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会审核申请
  postCheckByDelegationData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/checkByCoceral`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看展位数量调整申请列表查询
  getDepartmentApplyListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ordinaryAdjustCompany/department/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部审核企业展位数量调整申请
  postCheckByDepartmentData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryAdjustCompany/checkByDepartment`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
