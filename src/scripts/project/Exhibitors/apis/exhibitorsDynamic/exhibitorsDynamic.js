// 进口展招展-发布展商动态
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 展商动态列表查询 /api/ifoExhibitorDynamicInfo/selectPublishExhibition
  exhibitorsList(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoExhibitorDynamicInfo/selectPublishExhibition?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看已发布
  exhibitNum(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoExhibitorDynamicInfo/getPublishExhibitionCount?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看单条-编辑用 /api/ifoExhibitorDynamicInfo/getPublishInfo
  exhibitorsDetails(id) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoExhibitorDynamicInfo/getPublishInfo?exhibitorDynamicId=' + id).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑
  editExhibitors(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoExhibitorDynamicInfo/modificationDynamicTrade', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除
  deleteExhibitors(id) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoExhibitorDynamicInfo/deleteDynamicTrade', id).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增
  addExhibitors(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoExhibitorDynamicInfo/publishNewStatusAndSave', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
