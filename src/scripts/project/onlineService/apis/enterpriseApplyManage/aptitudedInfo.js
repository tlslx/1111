import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
// const WH_URL = process.env.API_WH_URL;
export default {
  // 品牌展位申请列表-企业资质
  getAptitudedData(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/efBnAptitudeIntellectual/getAptitudes?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增海关编码
  addCustom(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesCustom/addCustomInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除海关编码
  deleteCustom(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesCustom/deleteCustomInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新海关编码
  updateCustom(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesCustom/updateCustomInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增登记境外注册商标
  addBrandOutside(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesOutside/addOutsideInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除登记境外注册商标
  deleteBrandOutside(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesOutside/deleteOutsideInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新登记境外注册商标
  updateBrandOutside(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesOutside/updateOutsideInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增登记境内注册商标
  addTerritory(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesTerritory/addTerritoryInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除登记境内注册商标
  deleteTerritory(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesTerritory/deleteTerritoryInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新登记境内注册商标
  updateTerritory(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesTerritory/updateTerritoryInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增登记品牌建设内容
  addBuildContent(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesBuildContent/addBuildContentInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除登记品牌建设内容
  deleteBuildContent(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesBuildContent/deleteBuildContentInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新登录品牌建设内容
  updateBuildContent(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesBuildContent/updateBuildContentInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增登记国际通行认证
  addInternational(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesInternational/addInternationalInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除登记国际通行认证
  deleteInternational(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesInternational/deleteInternationalInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新登记国际通行认证
  updateInternational(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesInternational/updateInternationalInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增登记研发创新和自主知识产权
  addIntellectual(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudeIntellectual/addIntellectualInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除登记研发创新和自主知识产权
  deleteIntellectual(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudeIntellectual/deleteIntellectualInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新登记研发创新和自主知识产权
  updateIntellectual(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudeIntellectual/updateIntellectualInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增行业自律登记
  addUtonomy(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesAutonomy/addAutonomyInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除行业自律登记
  deleteUtonomy(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesAutonomy/deleteAutonomyInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新行业自律登记
  updateUtonomy(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesAutonomy/updateAutonomyInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增广交会参展表现等级内容
  addAptitudes(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesPresentation/addPresentationInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除广交会参展表现等级内容
  deleteAptitudes(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesPresentation/deletePresentationInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新广交会参展表现等级内容
  updateAptitudes(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnAptitudesPresentation/updatePresentationInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增登记国家或行业标准
  addStandard(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnNationalStandard/addNationalStandardInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除登记国家或行业标准
  deleteStandard(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnNationalStandard/deleteNationalStandardInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新登记国家或行业标准
  updateStandard(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnNationalStandard/updateNationalStandardInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增近两年参加国际专业展
  addActorProjectInfos(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnActorProject/addActorProjectInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除近两年参加国际专业展
  deleteActorProjectInfos(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnActorProject/deleteActorProjectInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新近两年参加国际专业展
  updateActorProjectInfos(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnActorProject/updateActorProjectInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增参与商务部组织对外经济合作、援助项目
  addExhibitHistoryInfos(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnExhibitHistory/addExhibitHistoryInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除参与商务部组织对外经济合作、援助项目
  deleteExhibitHistoryInfos(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnExhibitHistory/deleteExhibitHistoryInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新参与商务部组织对外经济合作、援助项目
  updateExhibitHistoryInfos(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efBnExhibitHistory/updateExhibitHistoryInfos', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
