import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 展商动态列表查询
  getPublishExhibition(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/selectPublishExhibition?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取发布数量
  reviewExhibition(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/reviewPublishExhibition?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //发布新动态
  getpublishNewStatusAndSave(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/publishNewStatusAndSave', {
        "publishAndSaveSession": {
          "companyId": params.companyId,
          "imageEnclosure": params.imageEnclosure,
          "contentText": params.contentText,
          "creatorId": params.creatorId,
          "contentTextEn": params.contentTextEn,
          "contentTitle": params.contentTitle,
          "contentTitleEn": params.contentTitleEn,
          "companyName": params.companyName,
          "operateType": params.operateType,
          "releaseStatus": "1",
          "numberSessions": "1"
        }
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //展商动态列表删除
  deleteDynamicTrade(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/deleteDynamicTrade', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核动态列表
  reviewExpoDynamic(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/reviewExpoDynamic', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 移除动态列表
  removeExcellentArticleMark(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/removeExcellentArticleMark', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //修改新动态
  modificationDynamicTrade(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsExhibitorDynamicInfo/modificationDynamicTrade', {
        "modifySession": [params]
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
