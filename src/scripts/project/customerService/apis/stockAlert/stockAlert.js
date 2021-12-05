import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看库存预警信息
  getListAll(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/stockWarmSetting/getListAll?area=' + param.area + '&issueNum=' + param.issueNum + '&warmNum=' + param.warmNum + '&sessionNum=' + param.sessionNum;
      if (param.area === "" & param.issueNum === "" & param.warmNum === "" & param.sessionNum === "") {
        params = '/api/stockWarmSetting/getListAll';
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 查看预警消息列表
  getListAllInfomation() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/warmInfomation/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 根据id删除库存预警信息
  deleteById(stockWarmId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/stockWarmSetting/deleteById?stockWarmId=' + stockWarmId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据id获取库存预警信息
  getById(warmInfomationId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/warmInfomation/getById?warmInfomationId=' + warmInfomationId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加库存预警信息
  addStockWarm(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/stockWarmSetting/addstockWarm', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据id更新库存
  updateById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/stockWarmSetting/updateById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
