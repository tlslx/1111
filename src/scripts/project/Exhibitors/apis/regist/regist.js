import { $req } from '../../../utils';
// import { $reqUtil } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 根据企业英文名称模糊查询
  getSearchByCompanyName(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/potentialCustomerEnquiry/fuzzySearchByCompanyNameEn?current=' + params.current + '&isAsc=' + params.isAsc + '&name=' + params.name + '&orderByField=' + params.orderByField + '&size=' + params.size).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 验证企业是否已经注册
  getConfirmIsRepeat(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/potentialCustomerEnquiry/confirmIsRepeat?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取国家
  getAllCountry() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/potentialCustomerEnquiry/getAllCountry').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业询盘注册
  add(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/potentialCustomerEnquiry/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有招展代理
  getAllAgents() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoExhibitionAgent/getAllAgentsWithStraight').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有企业类型
  companyTypeOptions() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/dataDictItem/findDicItemListByIfoCompanyType').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有企业所属行业
  industryTypeOptions() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/dataDictItem/findDicItemListByIfoIndustry').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有展会信息
  exhibitListAll() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/exp/exhibitions/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取登录信息-招展代理下拉框
  loginInfo() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoExhibitionAgent/getLoginInfo').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
