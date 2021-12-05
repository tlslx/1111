import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
import utility from '@/scripts/framework/utility';
export default {
  // 申请展位接口查询
  getApplicationBoothData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/standApplication/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 申请展位黑名单接口查询
  getBlackCompanyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoCpBlacklist/checkIsBlackCompany?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位新增提交校验
  getCheckIsAppliedData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/standApplication/checkIsApplied?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位新增组件中 专区接口
  getExhibitionRegionData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoExhibitionRegion/selectRegionsOfArea?exhibitionAreaCode=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位新增组件中 主要展品接口
  getProductsOfCompanyData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/applicationForExhibits/getProductsOfCompany?' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展位新增组件中 提交按钮接口
  getApplicationExhibitsAddData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/standApplication/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询上届是否有达成订单
  getCheckHasLastOrderData() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/standApplication/checkHasLastOrder').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 申请展位列表 编辑
  getApplyInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/standApplication/getApplyInfo?applyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下载展位申请表模板
  getDownLoadApplyFileData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/standApplication/downloadApplyFile?boothApplyId=' + param.boothApplyId + '&boothNum=' + param.boothNum
       + '&companyId=' + param.companyId + '&exhibitionAreaCode=' + param.exhibitionAreaCode + '&exhibitionNum=' + param.exhibitionNum
       + '&exhibitionRegionId=' + param.exhibitionRegionId + '&exhibitionSession=' + param.exhibitionSession
       + '&layout=' + param.layout + '&productIds=' + utility.urlEncode(param.productIds)).then(res => {
         resolve(res);
       }).catch(e => {
         reject(e);
       });
    });
  },
  // 申请展位列表 编辑 上传
  getUploadApplySheetAndArticleData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/standApplication/uploadApplySheetAndArticle', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核企业展位申请
  getCheckCompanyBoothList({ current, size }) {
    return $req.get(API_POT_URL
      + `/api/standApplication/getListPage?current=${current}&size=${size}&isAsc=false&orderByField=apply.create_date`);
  }
};
