import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
// ----------审核企业展位申请-----------
  // 审核企业列表
  getReserveCompanyList(param) {
    return $req.getParams(API_POT_URL
    + `/api/ifoApproveInfo/getBoothApplyList?current=${param.current}&size=${param.size}&isAsc=${param.isAsc}&orderByField=${param.orderByField}&reApprove=${param.reApprove}&exhibitionAreaCode=${param.exhibitionAreaCode}&companyNameEn=${param.companyNameEn}&exhibitionSession=${param.exhibitionSession}&exhibitionNum=${param.exhibitionNum}`);
  },
  //审核功能
  checkStateCompany(param) {
    return $req.postJson(API_POT_URL + '/api/standApplication/review', param);
  },
// ----------首页-----------
  //证件审核进度
  getPapersPlan(param) {
    return $req.getParams(API_POT_URL + `/api/personnelBadgeApply/getApplyInfoListPage?current=${param.current}&size=${param.size}&orderByField=${param.orderByField}&isAsc=${param.isAsc}`);
  }
};
