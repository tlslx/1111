import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
const OS_URL = process.env.API_OS_URL;
export default {
  // 保存设置企业审核结果公布批次时间
  getsetuptime(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询设置企业审核结果公布批次时间
  getquerytime() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/publish/BatchDate/get').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团审核企业申请列表（汇总查询）
  getapplicationList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //查看企业资料
  getenterpriseinformation(param) {
    return new Promise((resolve, reject) => {
      // $req.get(BASE_URL + '/api/ordinaryCompany/companyInfo/get?companyId=' + param).then(res => {
      $req.get(BASE_URL + '/api/ordinaryCompany/companyInfo/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //获取审核结果的公布批次时间
  getbatchtime(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/speciaAreaExternal/time/get?subKey=' + param.subKey).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业资质审核（交易团和交易团分团分别审核）
  getqualificationaudit(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/companyInfo/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业进出口经营权
  getexportOperating(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/management/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业进出口经营权审核
  getbusinessaudit(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/management/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展位申请列表
  getenterpriseapplication(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/applyBooth/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展位申请列表(主要产品)
  getenterpriseProducts(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/companyProductList/get?exhibitionArea=' + param.exhibitionArea + '&companyId=' + param.companyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展位申请列表(追加申请)
  getsupplementaryapplication(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/appendBoothApply/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //审核企业展位申请
  getauditenterpriseBooth(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/applyBooth/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展品信息列表
  getexhibitsinformation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/product/getPageList?companyId=' + param.companyId + '&current=' + param.current + '&size=' + param.size + '&exhibitionSession' + param.exhibitionSession).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //审核企业展品信息
  getproductcheck(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/product/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //查询企业联营企业列表
  getjointventure(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/jointOperation/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //审核联营企业
  getauditjoint(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/jointOperation/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询
  getbusinessreview(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompanyReview/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询(a类地址)
  getbusinesscategoryA(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/management/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询(B类地址)
  getbusinesscategoryB(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/amountExportStandard/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询(C类地址)
  getbusinesscategoryC(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/companyProduct/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询(D类地址)
  getbusinesscategoryD(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/companyCredit/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询(E类地址)
  getbusinesscategoryE(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/companyEnvironmentalProtection/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会复核查询(总体审核)
  getbusinesscategoryALL(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/overallRating/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //商协会通知企业(通知企业按钮)
  getinformEnterprises(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompanyReview/notice/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //获取图片地址
  getphotourl(param) {
    return new Promise((resolve, reject) => {
      $req.get(OS_URL + '/efOS/comment/getProvinceCityMap').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //修改广交会编码
  getsetCantonCode(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/external/setCantonCode/update', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业海关编码列表
  getcustomCode (param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/customCode/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //海关编码审核
  getcustomcheck(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/customCode/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //海关编码删除
  getcustomRemove(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/customCode/delete', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //海关编码新增
  getcustomadd (param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/customCode/add', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //海关编码出口额是否达标审核
  getamountcheck (param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/amountExportStandard/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //海关编码出口额是否达标
  getamountasult (param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/amountExportStandard/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //广交会编码判重
  getcheckCantonCode (param) {
    return new Promise((resolve, reject) => {
      $req.get(OS_URL + '/efOS/efOsCompanyInfo/checkCantonCode?param=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展品信息批量审核
  getallproduct (param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/product/checkList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //交易团审核企业信息(展区信息)
  getexhibitionDate (param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionAreaByAssociationId/get?associationId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团审核企业信息(列表城市信息)
  getprovinceDate (param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/getProvinceCityMap?city=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展品信息文字审核
  getcompanyProductExplain (param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/product/companyProductExplain/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业展品信息文字审核结果
  getcompanyresult (param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryCompany/product/companyProductExplain/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核接口   李康  添加于 5/20
  checkCompanyInfoForbidJoin(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/companyInfoForbidJoin/check', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //公布批次时间的接口 李康  添加于 5/22
  getTime(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/speciaAreaExternal/time/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 设置企业资料公布批次时间   李康  添加于 5/22
  publishTimeCheckCompany(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/checkCompany/publishTime', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核通过  jcrao   添加于  5/22
  postCompanyCheckPassData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryCompany/companyInfo/batchCheck', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
