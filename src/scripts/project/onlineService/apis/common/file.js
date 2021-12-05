import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 新增图片
  addFile(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/file/addFile', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除图片
  deleteFile(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/file/deleteFile', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业基本信息删除图片
  deleteBasicInfoFile(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/file/deleteLogoImageFile', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询单张图片
  queryFile(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/file/queryFile?fileId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 批量查询
  queryFiles(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/file/queryFiles?fileId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下载文件
  downloadFile(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/file/downloadFile?fileId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
