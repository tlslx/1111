import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
// ----------展品管理-----------
  // 获取列表数据
  getTableDataInformationBusiness(param) {
    return $req.getParams(API_POT_URL
    + `/api/applicationForExhibits/getListPage?${param}`);
  },
  //审核展品
  checkExhibitionInformationBusiness() {
    return $req.postJson(API_POT_URL + `/api/applicationForExhibits/approve`, param);
  },
// ----------展品管理-----------
  // 审核展商动态
  checkExhibitionApplyInformationBusiness() {
    return $req.postJson(API_POT_URL + `/api/ifoExhibitorDynamicInfo/approve`, param);
  }
};
