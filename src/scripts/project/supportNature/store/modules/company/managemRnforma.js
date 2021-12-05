import { agentManagemeApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    // 获取所有招展代理列表
    getManagement: {},
    // 获取所有招展代理下拉
    getAgentsDrop: {},
    // 管理员查看招展代理信息
    getAdmiExhibi: {},
    // 查询国家（编辑新增）
    getCountries: {},
    // 管理员新增招展代理，填写基本信息
    postExhibit: {},
    // 管理员新增代理规模
    postAdminiAgent: {},
    // 获取届数
    getDateNumber: {},
    // 获取代理联系人列表
    getContactList: {},
    // 管理员查看代理规模
    getAdminiAgent: {},
    // 保存代理联系人
    postSaveContact: {}
  },
  getters: {
    // 获取所有招展代理列表
    getManagement: state => state.getManagement,
    // 获取所有招展代理下拉
    getAgentsDrop: state => state.getAgentsDrop,
    // 管理员查看招展代理信息
    getAdmiExhibi: state => state.getAdmiExhibi,
    // 查询国家（编辑新增）
    getCountries: state => state.getCountries,
    // 管理员新增招展代理，填写基本信息
    postExhibit: state => state.postExhibit,
    // 新增招展代理联系人
    postAdminiAgent: state => state.postAdminiAgent,
    // 管理员新增代理规模
    postAgentPerson: state => state.postAgentPerson,
    // 删除代理联系人
    postDeleteContact: state => state.postDeleteContact,
    // 获取届数
    getDateNumber: state => state.getDateNumber,
    // 获取代理联系人列表
    getContactList: state => state.getContactList,
    // 管理员查看代理规模
    getAdminiAgent: state => state.getAdminiAgent,
    // 保存代理联系人
    postSaveContact: state => state.postSaveContact
  },
  mutations: {
    // 获取所有招展代理列表
    AUDIT_MANAGEMENT(state, payload) {
      state.getManagement = payload;
    },
    // 获取所有招展代理下拉
    AUDIT_AGENTSDROP(state, payload) {
      state.getAgentsDrop = payload;
    },
    // 管理员查看招展代理信息
    AUDIT_ADMINIS_EXHIBI(state, payload) {
      state.getAdmiExhibi = payload;
    },
    // 查询国家（编辑新增）
    AUDIT_COUNTRIES(state, payload) {
      state.getCountries = payload;
    },
    // 管理员新增招展代理，填写基本信息
    AUDIT_RNFORMAT(state, payload) {
      state.postExhibit = payload;
    },
    // 新增招展代理联系人
    AUDIT_RNFORMAT_PERSON(state, payload) {
      state.postAgentPerson = payload;
    },
    // 管理员新增代理规模
    POST_RNFORMAT_AGENT(state, payload) {
      state.postAdminiAgent = payload;
    },
    // 删除代理联系人
    AUDIT_RNFORMAT_CONTACT(state, payload) {
      state.postDeleteContact = payload;
    },
    // 获取代理联系人列表
    AUDIT_RNFORMAT_LIST(state, payload) {
      state.getContactList = payload;
    },
    // 保存代理联系人
    POST_RNFORMAT_CONTACT(state, payload) {
      state.postSaveContact = payload;
    },
    // 获取届数
    GET_RNFORMAT_NUMBER(state, payload) {
      state.getDateNumber = payload;
    },
    // 管理员查看代理规模
    GET_RNFORMAT_AGENT(state, payload) {
      state.getAdminiAgent = payload;
    }
  },
  actions: {
    // 获取所有招展代理列表
    getAgentManagement({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.agentManagement(params);
        promises.then(res => {
          res.records.forEach(function(el, index) {
            res.records[index]['operating'] = true;
            if (el.isEnabled === 1) {
              res.records[index].isEnabled = '启用';
            } else {
              res.records[index].isEnabled = '停用';
            }
          });
          commit('AUDIT_MANAGEMENT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取所有招展代理下拉
    getRecruiAgentsDrop({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.recruiAgentsDrop(params);
        promises.then(res => {
          commit('AUDIT_AGENTSDROP', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 管理员查看招展代理信息
    getAdministratorExhibi({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.administratorExhibi(params);
        promises.then(res => {
          commit('AUDIT_ADMINIS_EXHIBI', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询国家（编辑新增）
    getsearchCountries({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.searchCountries(params);
        promises.then(res => {
          commit('AUDIT_COUNTRIES', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 管理员新增招展代理，填写基本信息
    postExhibitRnformat({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.exhibitRnformat(params);
        promises.then(res => {
          commit('AUDIT_RNFORMAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增招展代理联系人
    postAgentContactPerson({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.agentContactPerson(params);
        promises.then(res => {
          commit('AUDIT_RNFORMAT_PERSON', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 管理员新增代理规模
    postAdministratorAgent({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.administratorAgent(params);
        promises.then(res => {
          commit('POST_RNFORMAT_AGENT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除代理联系人
    postDeleteProxyContact({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.deleteProxyContact(params);
        promises.then(res => {
          commit('AUDIT_RNFORMAT_CONTACT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取代理联系人列表
    getProxyContactList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.getProxyContact(params);
        promises.then(res => {
          commit('AUDIT_RNFORMAT_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 保存代理联系人
    postSaveProxyContact({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.saveProxyContact(params);
        promises.then(res => {
          commit('POST_RNFORMAT_CONTACT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 管理员查看代理规模
    getAdministratorsAgent({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.administratorsAgent(params);
        promises.then(res => {
          commit('GET_RNFORMAT_AGENT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取届数
    getDataHuenumber({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentManagemeApi.dataHuenumber(params);
        promises.then(res => {
          commit('GET_RNFORMAT_NUMBER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
