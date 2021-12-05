import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
const OS_URL = process.env.API_OS_URL;
export default { // 交易团分团企业管理
  // 获取 区域-交易团-分团 三级联动列表
  areaDelegationSubLink(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/areaDelegationSubGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团列表-左侧table
  delegationListLeft(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/delegationList', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团列表-新-左侧table
  delegationMenuListLeft(params, tokenObj) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/delegationMenuList?current='
      + params.current + '&size=' + params.size, tokenObj).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团列表-主区域
  delegationListMain(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/subGroup/list', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增交易团列表-主区域
  addSubGroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroup/addSubGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团区域列表-左侧
  delegationAreaListSelectLeft(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/delegationAreaList', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新交易团分团
  updateSubGroupMain(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroup/updateSubGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新交易团区域
  updateDelegationArea(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroup/updateDelegationArea', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除区域分团关系
  deleteSubGroup(subGroupCode) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroup/deleteSubGroup?subGroupCode=' + subGroupCode).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团分团-下载列表
  saveExcel(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/subGroup/saveExcel' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/subGroup/saveExcel', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  },

  // 2. 企业分团关系表维护
  // 获取企业名称-网上服务url的接口
  companyInfoOuterTwo(params) {
    return new Promise((resolve, reject) => {
      $req.get(OS_URL + '/efOS/efOsCompanyInfo/getCompanyInfoOuterTwo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业分团列表
  subGroupCompanyList(params, tokenObj) {
    return new Promise((resolve, reject) => {
      // $req.get(BASE_URL + '/api/subGroupCompany/list?current=' + params.current + '&size=' + params.size
      // + '&exhibitionNum=' + params.exhibitionNum, tokenObj).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
      $req.get(BASE_URL + '/api/subGroupCompany/list', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新企业分团关系
  updateCompanySubGroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroupCompany/updateCompanySubGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增企业分团关系 - 改成指派
  addCompanySubGroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroupCompany/addCompanySubGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除企业分团关系
  deleteCompanySubGroup(cecfCode) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroupCompany/deleteCompanySubGroup?cecfCode=' + cecfCode).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取历史展届
  exhibitionNumList() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/exp/exhibitions/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 保存历史
  // 区域及地方分团-保存记录
  saveResult(exhibitionNum) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/saveResult?exhibitionNum=' + exhibitionNum).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 区域及地方分团-获取已保存届数列表
  savedExhibitionNumList(id) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/getSavedExhibitionNumList?delegationId=' + id).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 保存企业分团记录
  saveCompanyResult(exhibitionNum) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroupCompany/saveResult?exhibitionNum=' + exhibitionNum).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取已保存届数列表
  savedCompanyExhibitionNumList() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroupCompany/getSavedExhibitionNumList').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团分团-下载列表
  saveCompanyExcel(params, fname) {
    return new Promise((resolve, reject) => {
      let _params = params;
      let _dataArr = [];
      for (let key in _params) {
        _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
      }
      let _url = BASE_URL + '/api/subGroupCompany/saveExcel' + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
      kindo.util.getdown(_url, fname);
      // $req.getDownload(BASE_URL + '/api/subGroupCompany/saveExcel', params).then(res => {
      //   resolve(res);
      // }).catch(e => {
      //   reject(e);
      // });
    });
  },
  // SSO_BASE_URL - SSO根路径
  // 交易团-区域-左侧 /api/sysDepartment/search
  // sysDepartmentSearch(params) {
  //   return new Promise((resolve, reject) => {
  //     $req.getParams(SSO_BASE_URL + '/api/sysDepartment/search', params).then(res => {
  //       resolve(res);
  //     }).catch(e => {
  //       reject(e);
  //     });
  //   });
  // }
  // 交易团分团二级联动
  delegationAndSubGroup() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/subGroup/getDelegationAndSubGroup').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 指派-修改所属分团
  assignCityToSubgroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroup/assignCityToSubgroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 指派-取消修改所属分团
  cancelAssignCityToSubgroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroup/cancelAssignCityToSubgroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 指派-取消修改企业所属分团
  cancelAssignCompanyToSubgroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/subGroupCompany/cancelAssignCompanySubGroup', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
