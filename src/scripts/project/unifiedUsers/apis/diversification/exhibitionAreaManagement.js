import { $req } from '../../../utils';
const BASE_URL = process.env.API_CF_URL;
export default {
   //展区管理列表
  getListExhibitionArea(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/customservice/cf/listExhibitionArea?current=' + params.current + '&size=' + params.size + '&activityCode=' + params.activityCode).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //展区管理删除
  deleteExhibitionArea(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/customservice/cf/deleteExhibitionArea?exhibitionAreaId=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
    //展区管理新增
  saveExhibitionArea(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/customservice/cf/saveExhibitionArea', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //展区管理修改
  updateExhibitionArea(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/customservice/cf/updateExhibitionArea', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //展区管理一键导入
  saveExhibitionAreaByLastest(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/customservice/cf/saveExhibitionAreaByLastest?activityCode=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
