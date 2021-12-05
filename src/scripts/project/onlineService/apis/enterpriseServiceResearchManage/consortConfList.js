import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  //获取联合布展方企业信息
  getUnionExhibitionInfo(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/getUnionExhibitionInfo?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //联合布展确认
  getconfirmUnionExhibition(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsUnionExhibitionApplyInfo/confirmUnionExhibition', {
        "confirmUnionExhibitionSession": {
          "applyCode": params.applyCode,
          "companyId": params.companyId,
          "applyCompanyId": params.applyCompanyId,
          "otherCompanyOpinion": params.otherCompanyOpinion
        }
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
