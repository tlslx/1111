import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
  // 查看工单服务项目管理信息
  queryByArea(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/workAcceptorHall/queryByArea?current=' + param.current + '&area=' + param.area + '&chargeName=' + param.chargeName + '&projectName=' + param.projectName + '&size=' + param.size;
      if (param.area === "" & param.chargeName === "" & param.projectName === "") {
        params = '/api/workAcceptorHall/queryByArea?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除工单服务项目管理信息
  deleteAcceptorHall(projectId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workAcceptorHall/delete?projectId=' + projectId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看工单服务项目管理详情
  queryWorkProject(projectId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workAcceptorHall/queryWorkProject?projectId=' + projectId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改工单服务项目管理信息
  updateAcceptorHall(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workAcceptorHall/update', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看施工组信息
  queryListGroup(param) {
    return new Promise((resolve, reject) => {
      let params = '/api/workGroup/queryList?current=' + param.current + '&area=' + param.area + '&constructionGroup=' + param.constructionGroup + '&constructionGroupName=' + param.constructionGroupName + '&size=' + param.size;
      if (param.area === "" & param.constructionGroup === "" & param.constructionGroupName === "") {
        params = '/api/workGroup/queryList?current=' + param.current + '&size=' + param.size;
      }
      $req.get(CYMT_URL + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看施工组详情
  queryListGroupDetails(constructionGroupId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workGroup/query?constructionGroupId=' + constructionGroupId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加工单服务项目信息
  add(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workAcceptorHall/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加施工组信息
  addGroup(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(CYMT_URL + '/api/workGroup/add', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除施工组信息
  deleteGroup(constructionGroupId) {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workGroup/delete?constructionGroupId=' + constructionGroupId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
