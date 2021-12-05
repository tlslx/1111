import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 设置vip企业服务范围
  addVipCompanyService(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/addVipCompanyService', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看vip企业服务范围
  getVipCompanyService(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getVipCompanyService?session=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取vip企业证件标准列表
  getVipCertificateList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getVipCertificateList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 设置单个vip企业证件标准
  updateVipCertificate(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/updateVipCertificate', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 设置vip企业证件标准
  updateVipCertificateIndexs(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/updateVipCertificateIndexs', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
