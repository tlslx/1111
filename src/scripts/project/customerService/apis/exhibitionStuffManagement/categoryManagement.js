import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
  // 查看展具一级分类信息
  getListAll() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/exhibitionClass/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看展具一级分页分类信息
  getListByPage(param) {
    let params = '/api/exhibitionClass/getListByPage?current=' + param.current + '&typeNumber=' + param.typeNumber + '&size=' + param.size;
    if (param.typeNumber === "") {
      params = '/api/exhibitionClass/getListByPage?current=' + param.current + '&size=' + param.size;
    }
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看展具二级分类信息
  getListAllTwo() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/exhibitionClassTwo/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看展具二级分页分类信息
  getListByPageTwo(param) {
    let params = '/api/exhibitionClassTwo/getListByPage?current=' + param.current + '&typeNumber=' + param.typeNumber + '&secondTypeCode=' + param.secondTypeCode + '&size=' + param.size;
    if (param.typeNumber === "" & param.secondTypeCode === "") {
      params = '/api/exhibitionClassTwo/getListByPage?current=' + param.current + '&size=' + param.size;
    }
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看展具/组成展材信息
  getListAllTool(param) {
    let params = '/api/exhibition/getListAll?current=' + param.current + '&exhibitionNumber=' + param.exhibitionNumber + '&isMixture=' + param.isMixture + '&exhibitionName=' + param.exhibitionName + '&size=' + param.size;
    if (param.exhibitionNumber === "" & param.isMixture === "" & param.exhibitionName === "") {
      params = '/api/exhibition/getListAll?current=' + param.current + '&size=' + param.size;
    }
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看约束一级分类信息
  getListAllRule() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/constraintRule/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看约束二级分类信息
  getListAllRuleTwo(constraintRuleId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/constraintRuleTwo/getListAll?constraintRuleId=' + constraintRuleId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加展具一级分类信息
  addExhibitionClass(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/exhibitionClass/addExhibitionClass', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加展具二级分类信息
  addExhibitionClassTwo(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/exhibitionClassTwo/addExhibitionClassTwo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加展具/组成展材信息
  addExhibition(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/exhibition/addExhibition', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
