import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 新增vip企业参数
  addVipStands(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/EfOsVipStands/addVipStands', data);
    });
  },

  // 生成vip企业参数
  generatVipCompany() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/EfOsVipStands/generatVipCompany').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 查看vip企业参数
  getVipStands(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/EfOsVipStands/getVipStands?session=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 修改vip企业参数
  updateVipStands(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/EfOsVipStands/updateVipStands', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 查看vip企业名单
  getVipCompanyInfoList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getVipCompanyInfoList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 获取vip企业证件标准
  getVipCertificate(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOs/efOsVipCertificateIndex/getVipCertificate?data=' + param);
    });
  },

  // vip企业申请会议室
  applyMeetingRoom(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/applyMeetingRoom', data);
    });
  },

  // 查看vip企业会议室列表
  applyMeetingRoomList(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/applyMeetingRoomList', data);
    });
  },

  // vip企业证件申请
  applyVipCertificateInfo(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/applyVipCertificateInfo', data);
    });
  },

  // 查看vip企业证件申请列表
  applyVipCertificateInfoList(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/applyVipCertificateInfoList', data);
    });
  },

  // 工作部删除vip企业信息
  deleteVipCompanyInfo(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/deleteVipCompanyInfo', data);
    });
  },

  // 查看vip企业详细信息
  getVipCompanyInfoDetail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsVipCompanyInfo/getVipCompanyInfoDetail?data=' + param);
    });
  },

  // 审核单个vip企业
  updateVipCompanyInfo(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsVipCompanyInfo/updateVipCompanyInfo', data);
    });
  }
};
