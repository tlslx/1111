import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
   // 查看材料统计信息
  getListAll(param) {
    let params = '/api/compositionMaterialExt/getListAll?current=' + param.current + '&issueNum=' + param.issueNum + '&exhibitionName=' + param.exhibitionName + '&place=' + param.place + '&sessionNum=' + param.sessionNum + '&size=' + param.size;
    if (param.issueNum === "" & param.place === "" & param.sessionNum === "" & param.exhibitionName === "") {
      params = '/api/compositionMaterialExt/getListAll?current=' + param.current + '&size=' + param.size;
    }
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
