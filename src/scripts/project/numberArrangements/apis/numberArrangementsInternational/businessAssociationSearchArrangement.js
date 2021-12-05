import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  //商协会审核安排方案(查询)
  getordinaryArrangement(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/getOrdinaryArrangement?current=' + param.current + '&size=' + param.size, {
        companyCecfCode: param.companyCecfCode,
        exhibitionPeriod: param.exhibitionPeriod,
        exhibitionType: param.exhibitionType,
        exhibitionAreaName: param.exhibitionAreaName,
        exhibitionArea: param.exhibitionArea,
        exhibitionAreaCode: param.exhibitionArea,
        delegationName: param.delegationName,
        delegationId: param.delegationId,
        companyName: param.companyName,
        city: param.city,
        // coeralId: param.coeralId,
        coceralId: param.coceralId,
        isCoceralVip: param.isCoceralVip,
        isBrandCompany: param.isBrandCompany,
        schedulePlan: param.schedulePlan
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会审核品牌粘连
  getcoceralBrandAdhesionCheck(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/coceralBrandAdhesionCheck', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会审核品牌粘连数量
  getcoceralBrandAdhesionNumberCheck(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/coceralBrandAdhesionNumberCheck', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会建议更换
  getsuggestChange(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/suggestChange', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团查询公布批次
  getarrangePublish(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/getOrdinaryArrangePublish', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团设置公布批次
  getupdateOrdinary(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/updateOrdinaryArrangePublish', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会审核按钮
  getcoceralAdhesion (param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryArrange/coceralAdhesionNumberCheck', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
