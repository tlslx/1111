import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 商协会推荐列表（新题材）查询
  getRecommendByCoceralData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/recommendByCoceral/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会推荐列表（新题材）推荐
  postRecommendCoceralData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/recommendByCoceral/recommend`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取单条企业展位申请信息
  getOneDemandData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/checkByDelegation/getOneDemand`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取企业基本信息
  getCompanyBaseInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/external/companyInfo/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部获取商协会查看范围（新题材）
  getRangeWorkDepartData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/rangeSetByWorkDepartment/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部设置商协会查看范围（新题材）
  postRangeSetByWorkDepartmentData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/newthemeCompanyCheck/rangeSetByWorkDepartment`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看审核推荐情况（新题材）查询
  getRecommendCheckWorkDepartmentData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/newthemeCompanyCheck/recommendStationCheckByWorkDepartment`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
