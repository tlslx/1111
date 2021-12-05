import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 企业申请信息设置查询
  getCompanyApplySetInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyApplyInfoSet/listPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业申请信息设置新增
  postCompanyApplySetInfoAddData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyApplyInfoSet/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业申请信息设置修改
  postCompanyApplySetInfoEditData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyApplyInfoSet/edit`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业申请信息设置删除
  postCompanyApplySetInfoDeleteData(data) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyApplyInfoSet/delete`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业申请情况查询
  getTradeCenterApplyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ordinaryCompanyDemandRecord/tradeCenter/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸中心标注
  postTradeCenterLabelData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ordinaryCompanyDemandRecord/tradeCenter/post`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
