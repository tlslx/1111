import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看展材管理信息
  getListByPage(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/compositionMaterial/getListByPage?current=' + param.current + '&issueNum=' + param.issueNum + '&place=' + param.place + '&sessionNum=' + param.sessionNum + '&size=' + param.size;
      if (param.issueNum === "" & param.place === "" & param.sessionNum === "") {
        params = '/api/compositionMaterial/getListByPage?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据一级分类查询二级分类信息
  getListAll() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/compositionMaterial/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加展材管理信息
  addCompositionMaterial(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/compositionMaterial/addCompositionMaterial', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
