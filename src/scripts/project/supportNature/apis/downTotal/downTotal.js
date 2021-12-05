import { $req } from '../../../utils';
const API_REPORT_URL = process.env.API_REPORT_URL;
// 下载管理模块
export default {
  getDownList({ current, size, saveStatus, fileName }) {
    return $req.getParams(API_REPORT_URL 
    + `/api/queryExportFile/list?current=${current}&size=${size}&saveStatus=${saveStatus}&fileName=${fileName}`);
  },
  //添加到下载管理的模块中-11
  addDownMangeList() {
    return $req.getParams(API_REPORT_URL + "/api/report/boothApplyOfDelegation/down");
  },
  //添加到下载管理的模块中-02
  add2DownMangeList(param) {
    return $req.getParams(API_REPORT_URL + `/api/report/businessDelegationAndArea/down?${param}`);
  },
  //添加到下载管理的模块中-31
  add3DownMangeList() {
    return $req.getParams(API_REPORT_URL + "/api/report/queryApplyInfoByExhibitionArea/down");
  }
};
