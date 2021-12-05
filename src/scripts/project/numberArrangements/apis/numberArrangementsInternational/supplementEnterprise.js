import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 1.	交易团提交追加撤销联营企业申请列表
  getopenAccess(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/appendBooth/apply/getListPage?current=' + param.current + '&size=' + param.size, {
        companyName: param.companyName,
        exhibitionAreaName: param.exhibitionAreaName,
        exhibitionArea: param.exhibitionArea,
        exhibitionPeriod: param.exhibitionPeriod,
        productTypeName: param.productTypeName,
        processCloseStatus: param.processCloseStatus,
        checkStatus: param.checkStatus
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2.	获取企业申请联营企业列表
  getapplicationJointventure(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/appendBooth/apply/companyApplyUnion/getListAll?demandRecordId=' + param.demandRecordId + '&companyId=' + param.companyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.	交易团保存追加联营企业并提交申请
  getpreservationApplicationventures(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/appendBooth/apply/unionCompany/save', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 4.	撤销联营企业
  getpreservationApplicationRemove(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/appendBooth/apply/unionCompany/remove', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 12.	联营企业中英文名称判重
  getweightDetermination(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/external/existUnionCompany/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //3.	新增企业联营企业
  getaddCompanyInfo(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/appendBooth/apply/unionCompanyInfo/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.	外贸中心审核交易团追加联营企业申请列表
  gettaskClosestatus(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/appendBooth/apply/unionCompanyApplyCheck/getListPage?taskCloseStatus=0&current=' + param.current + '&size=' + param.size, {
        companyName: param.companyName,
        exhibitionPeriod: param.exhibitionPeriod,
        exhibitionAreaName: param.exhibitionAreaName,
        exhibitionArea: param.exhibitionArea,
        productTypeName: param.productTypeName, 
        processCloseStatus: param.processCloseStatus,
        checkStatus: param.checkStatus
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.	外贸中心审核交易团追加联营申请（审核）
  getunionCompanyApply(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/appendBooth/apply/unionCompanyApply/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //11.	根据联营企业ids查询明细
  getunionIds(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/external/unionCompanyInfos/get?unionIds=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 8.	工作部查看追加申请记录
  getunioncheck(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/appendBooth/apply/unionCompanyApplyRecord/getListPage?current=' + param.current + '&size=' + param.size, {
        companyName: param.companyName,
        appendType: param.appendType,
        delegationName: param.delegationName,
        delegationId: param.delegationId
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
