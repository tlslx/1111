import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 待交易团品牌评审信息列表
  getReviewInfoListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/dealGrade/dealClusterBrandReview/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 待交易团品牌评审在线打分(添加)
  postOnlineAddScoreData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/dealGrade/dealClusterBrandReview/add`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 待交易团品牌评审在线打分(更新)
  postOnlineScoreData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/dealGrade/dealClusterBrandReview/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团推荐品牌企业筛选条件配置查询
  getReviewFilterListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/efBnConditionConfig/getList`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团推荐品牌企业筛选条件配置 -- 编辑保存
  postReviewFilterUpdateData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/efBnConditionConfig/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团提交推荐方案获取配置项
  getConfigItemData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/efBnConditionConfig/get`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团提交推荐方案获取商协会与展区
  getBusinessListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/dealGrade/dealGradeUnRecommend/getListPage`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团提交推荐方案 提交推荐方案
  postSubmitRecommendData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/applyNumber/dealGradeUnRecommend/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
