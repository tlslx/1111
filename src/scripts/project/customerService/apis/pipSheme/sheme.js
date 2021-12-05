import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看标准展具管理信息
  getListByPage(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/ExhibitionEquipmentConfiguration/getListByPage?current=' + param.current + '&exhibitionAreaName=' + param.exhibitionAreaName + '&exhibitionAreaNumber=' + param.exhibitionAreaNumber + '&issueNum=' + param.issueNum + '&sessionNum=' + param.sessionNum + '&size=' + param.size;
      if (param.exhibitionAreaName === "" & param.exhibitionAreaNumber === "" & param.issueNum === "" & param.sessionNum === "") {
        params = '/api/ExhibitionEquipmentConfiguration/getListByPage?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 根据id查看标准展具管理信息
  getById(id) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/ExhibitionEquipmentConfiguration/getById?id=' + id).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加展材管理信息
  addEquipmentConfiguration(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/ExhibitionEquipmentConfiguration/addEquipmentConfiguration', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据id更新标准展具管理信息
  updateById(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/ExhibitionEquipmentConfiguration/updateById', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
