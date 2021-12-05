import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 根据展区code查询商协会名称
  getCoceralByExhibitionArea(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/coceralByExhibitionArea/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据交易团id查询交易团下属企业id，名称，广交会编码
  getCompanyInfoByDeleId(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/companyInfoByDeleId/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据企业ID查询企业信息
  getCompanyInfoById(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/companyInfoById/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展区查询企业的展品
  getCompanyProductList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/companyProductList/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据当届展区查询展期
  getCurrentExhibitionPeriod(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/currentExhibitionPeriod/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取当前的展届
  getCurrentExhibitionSession(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/currentExhibitionSession/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取展区列表
  getExhibitionArea(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionArea/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据商会机构id查询展区列表
  getExhibitionAreaByAssociationId(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionAreaByAssociationId/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展区code获取标准展区面积
  getExhibitionAreaByCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionAreaByCode/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展区查询企业的展品(getListAll)
  getExhibitionAreaByPeriod(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionAreaByPeriod/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据展区code查询专区信息
  getExhibitionInfoByCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionInfoByCode/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 搜索组织机构-所有交易团
  getDelegationDepartment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/delegationDepartment/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 搜索组织机构-所有商会
  getAssociationDepartment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/associationDepartment/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取交易团下分团的数据
  getSubCluster(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/subCluster/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据组织机构类型和父id查询机构列表 
  getSysDepartment(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/sysDepartment/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据组织机构Code和类型查询明细 
  getSysDepartmentByCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/sysDepartmentByCode/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据组织机构id查询明细 
  getSysDepartmentById(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/sysDepartmentById/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看本届申请参展的企业 
  getCompany(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ScheduleConfig/company/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据分团code获取交易团信息 
  getDelegationBySubGroup(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/subGroup/getDelegationBySubGroup', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据组织机构id查询明细 
  getSysDepartById(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/sysDepartmentById/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有展届信息 
  getSysExhibitions(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitions/getListAll', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询展区和展区 新题材专用
  getExhibitionAreaDTOList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionAreaDTOList/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取企业黑名单信息
  getBlackInfo(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/rewardPunish/getBlackInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
