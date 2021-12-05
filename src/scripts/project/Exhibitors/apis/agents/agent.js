import { $req } from '../../../utils';
const API_POT_URL = process.env.API_SN_URL;
export default {
// ----------审核企业展位申请-----------
  getBooths() {
    return $req.getParams(API_POT_URL + "/api/ifoExhibitsCatalog/getAllRootCatalog");
  },
  // 产看展品列表详情
  exhibitionsDetails(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/applicationForExhibits/getProductDetail', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核企业列表
  getReserveCompanyList(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/ifoApproveInfo/getBoothApplyList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
    // return $req.getParams(API_POT_URL
    // + `/api/ifoApproveInfo/getBoothApplyList?current=${param.current}&size=${param.size}&reApprove=${param.reApprove}&arrangeStatus=${param.arrangeStatus}&firstApprove=${param.firstApprove}&companyNameEn=${param.companyNameEn}&exhibitionSession=${param.exhibitionSession}&exhibitionNum=${param.exhibitionNum}&isOldCompany=${param.isOldCompany}&agentId=${param.agentId}`);
  },
  // 为企业分配广交会编码
  cantonCodesEnterprises(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/standApplication/distributeCantonCode', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 管理员审核展位申请
  administratorReviews(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/standApplication/review', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
    // return $req.getParams(API_POT_URL
    // + `/api/ifoApproveInfo/getBoothApplyList?current=${param.current}&size=${param.size}&reApprove=${param.reApprove}&arrangeStatus=${param.arrangeStatus}&firstApprove=${param.firstApprove}&companyNameEn=${param.companyNameEn}&exhibitionSession=${param.exhibitionSession}&exhibitionNum=${param.exhibitionNum}&isOldCompany=${param.isOldCompany}&agentId=${param.agentId}`);
  },
  //审核功能
  checkStateCompany(param) {
    return $req.postJson(API_POT_URL + '/api/standApplication/review', param);
  }
};
