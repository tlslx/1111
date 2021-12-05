import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看库存增减信息
  getListAll(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/stockModify/getListAll?area=' + param.area + '&issueNum=' + param.issueNum + '&warmNum=' + param.warmNum + '&sessionNum=' + param.sessionNum;
      if (param.area === "" & param.issueNum === "" & param.warmNum === "" & param.sessionNum === "") {
        params = '/api/stockModify/getListAll';
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 根据id删除库存预警信息
  deleteById(stockModifyId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/stockModify/deleteById?stockModifyId=' + stockModifyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据id获取库存预警信息
  getById(stockModifyId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/stockModify/getById?stockModifyId················看·饿·4iiiiiiiiiiiiiiiiiiiiii=' + stockModifyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加库存增减信息
  addStockWarm(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/stockModify/addstockWarm', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据id更新库存
  updateById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/stockModify/updateById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
