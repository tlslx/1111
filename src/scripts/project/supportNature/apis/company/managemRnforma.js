import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 获取所有招展代理列表
  agentManagement(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoExhibitionAgent/getAgentList', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有招展代理下拉
  recruiAgentsDrop(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoExhibitionAgent/getAllAgentsWithoutStraight', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 管理员查看招展代理信息
  administratorExhibi(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoExhibitionAgent/getAgentInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询国家（编辑新增）
  searchCountries (params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/potentialCustomerEnquiry/getAllCountry', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 管理员新增招展代理，填写基本信息
  exhibitRnformat (params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ifoExhibitionAgent/addAgent', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增招展代理联系人
  agentContactPerson (params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ifoExhibitionAgent/addContact', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 管理员新增代理规模
  administratorAgent (params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ifoExhibitionAgent/manageAgentBoothInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除代理联系人
  deleteProxyContact (params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ifoExhibitionAgent/deleteContact', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取代理联系人列表
  getProxyContact (params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoExhibitionAgent/getAgentContacts', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 保存代理联系人
  saveProxyContact (params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ifoExhibitionAgent/updateContact', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 管理员查看代理规模
  administratorsAgent  (params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoExhibitionAgent/getAgentBoothInfo?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取届数
  dataHuenumber (params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/exp/exhibitions/getListAll', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
