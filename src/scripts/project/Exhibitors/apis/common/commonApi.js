// 获取一些公共的数据，字典表
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;

export default {
  //获取所有届数
  getExhibitionNum() {
    return $req.getParams(API_POT_URL + "/api/exp/exhibitions/getListAll");
  },
  //获取当前的届数
  getCurrentExhibitionNum() {
    return $req.getParams(API_POT_URL + "/api/exp/exhibitions/current");
  },
  //获取所有展区 1级菜单
  getBooth() {
    return $req.getParams(API_POT_URL + "/api/ifoExhibitsCatalog/getAllRootCatalog");
  },
  //根据展区来获取子目录 2级菜单
  getBoothChild(params) {
    return $req.getParams(API_POT_URL + `/api/ifoExhibitsCatalog/getChildCatalog?level=${params.level}&parentId=${params.parentId}`);
  },
  //获取展区
  getExhibitionPlace({ exhibitionNum, periodCode, exhibitionAreaCode }) {
    return $req.getParams(API_POT_URL
      + `/api/ifoExhibitionRegion/getAreas?exhibitionNum=${exhibitionNum}&periodCode=${periodCode}&exhibitionAreaCode=${exhibitionAreaCode}`);
  },
  //获取展位类型
  getBoothApplyType() {
    return $req.getParams(API_POT_URL + "/api/dataDictItem/findDicItemListByIfoBoothApplyType");
  },

  //下载文件
  downFileMethods(url) {
    return kindo.util.getdown(API_POT_URL + url);
  },

  //获取企业列表
  getCompanyList({ current, size }) {
    return $req.getParams(API_POT_URL
      + `/api/manageCompanyInformation/getCompanyList?current=${current}&size=${size}&isAsc=false&orderByField=ic.create_date`);
  },
  // 获取展区
  exhibitionschemesGetAreas() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/exp/exhibitionschemes/getAreas').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
