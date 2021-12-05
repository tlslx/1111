import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 商协会查询数量安排方案列表
  getBusinessAssociation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/businessAssociation/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会填写保存安排品牌展位数量方案（单个方案保存）
  saveBusinessAssociation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/businessAssociation/save', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会填写保存安排品牌展位数量方案（批量方案保存）
  saveBatchBusinessAssociation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/businessAssociation/saveBatch', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会品牌展位数量安排方案提交（批量）
  saveSubmitQuantityPlan(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/businessAssociation/submitQuantityPlan/save', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会品牌展位数量安排excel下载模板（待完成）
  downloadTemplate(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/businessAssociation/template/download', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会品牌展位数量安排方案上传（待完成）
  addBatchUploadExcel(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/businessAssociation/uploadExcel/addBatch', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
