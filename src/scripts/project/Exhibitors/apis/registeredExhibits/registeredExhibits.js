// 登记展品 展品列表
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  //新增展品时新增企业
  getCompanyListAddExhibits() {
    return $req.getParams(API_POT_URL + "/api/manageCompanyInformation/getAllCompanyOfAgent");
  },
  // 查看展品列表
  exhibitionsList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/applicationForExhibits/getListPage', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
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
  // 删除展品
  deleteExhibitionsList(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/applicationForExhibits/deleteProduct', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 展品设为本届
  currentSessionExhibitionsList(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/applicationForExhibits/current_session/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增列表
  addExhibitionsList(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/applicationForExhibits/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑列表
  editExhibitionsList(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/applicationForExhibits/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 单文件上传删除-没有返回值
  deleteycdFile(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/applicationForExhibits/deleteProductFile', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 多文件上传删除-有返回值
  deleteMoreFile(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/applicationForExhibits/deleteProductFileLk', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
