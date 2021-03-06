import { enterprisesInviteCustomerApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
import { $helper } from '@/scripts/project/utils';
export default {
  namespaced: true,
  state: {
    getinvit: [],
    getcustomer: [],
    getallcustomer: [],
    getallemail: [],
    getcustomerdetail: {},
    getinvitdetail: [],
    addcustomer: {},
    updatecustomer: {},
    deletecustomer: {},
    addinvit: {},
    updateinvit: {},
    getcontact: {},
    deleteinvit: {},
    updatemail: {},
    addmail: {},
    deletemail: {},
    getmail: [],
    getmaildetail: {},
    cusmail: {}
  },
  getters: {
    getinvit: state => state.getinvit,
    cusmail: state => state.cusmail,
    getinvitdetail: state => state.getinvitdetail,
    getcustomer: state => state.getcustomer,
    getcontact: state => state.getcontact,
    getcustomerdetail: state => state.getcustomerdetail,
    getmail: state => state.getmail,
    getmaildetail: state => state.getmaildetail,
    addcustomer: state => state.addcustomer,
    getallcustomer: state => state.getallcustomer,
    getallemail: state => state.getallemail,
    updatecustomer: state => state.updatecustomer,
    deletecustomer: state => state.deletecustomer,
    addinvit: state => state.addinvit,
    updateinvit: state => state.updateinvit,
    deleteinvit: state => state.deleteinvit,
    addmail: state => state.addmail,
    updatemail: state => state.updatemail,
    deletemail: state => state.deletemail
  },
  mutations: {
    GET_CUSTOMER(state, payload) {
      state.getcustomer = payload;
    },
    GET_ALLCUS(state, payload) {
      state.getallcustomer = payload;
    },
    GET_CONTACT(state, payload) {
      state.getcontact = payload;
    },
    GET_ALLEMAIL(state, payload) {
      state.getallemail = payload;
    },
    GET_CUSTOMERDETAIL(state, payload) {
      state.getcustomerdetail = payload;
    },
    ADD_CUSTOMER(state, payload) {
      state.addcustomer = payload;
    },
    UPDATE_CUSTOMER(state, payload) {
      state.updatecustomer = payload;
    },
    DELETE_CUSTOMER(state, payload) {
      state.deleteinvit = payload;
    },
    ADD_INVITATION(state, payload) {
      state.addinvit = payload;
    },
    UPDATE_INVITATION(state, payload) {
      state.updateinvit = payload;
    },
    DELETE_INVITATION(state, payload) {
      state.deletecustomer = payload;
    },
    GET_INVITATION(state, payload) {
      state.getinvit = payload;
    },
    GET_INVITATION_DETAIL(state, payload) {
      state.getinvitdetail = payload;
    },
    ADD_MAIL(state, payload) {
      state.addmail = payload;
    },
    UPDATE_MAIL(state, payload) {
      state.updatemail = payload;
    },
    DELETE_MAIL(state, payload) {
      state.deletemail = payload;
    },
    GET_MAIL(state, payload) {
      state.getmail = payload;
    },
    GET_MAILDETAIL(state, payload) {
      state.getmaildetail = payload;
    },
    CUS_MAIL(state, payload) {
      state.cusmail = payload;
    }
  },
  actions: {
    // ??????????????????
    addCustomerInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.addCustomer(params).then(res => {
          commit('ADD_CUSTOMER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    updateCustomerInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.updateCustomer(params).then(res => {
          commit('UPDATE_CUSTOMER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    deleteCustomerInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.deleteCustomer(params).then(res => {
          commit('DELETE_CUSTOMER', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????????????????
    getCustomerDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getCustomerDetail(utility.urlEncode(params));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            commit('GET_CUSTOMERDETAIL', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getCustomerInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getCustomerList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let dicData = JSON.parse(localStorage.getItem('dictData'));
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              let newcountoryRegion = '';
              if (value.country) {
                newcountoryRegion = $helper.getDicText(dicData.countryDic, value.country);
              } else {
                newcountoryRegion = '';
              }
              value.country = newcountoryRegion;
            });
          }
          commit('GET_CUSTOMER', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getInvitationDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getInvitationDetail(utility.urlEncode(params));
        promises.then(res => {
          commit('GET_INVITATION_DETAIL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getInvitationListInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getInvitationList(utility.urlEncode(JSON.stringify(params.json)), params.date);
        promises.then(res => {
          if (res.records.length > 0) {
            commit('GET_INVITATION', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getCustomerAllListInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getCustomerAllList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.length > 0) {
            commit('GET_ALLCUS', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????????????????
    getEmailModelAllListInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getEmailModelAllList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.length > 0) {
            commit('GET_ALLEMAIL', res);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ?????????????????????????????????
    getCompanyContactInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getCompanyContact(utility.urlEncode(params));
        promises.then(res => {
          commit('GET_CONTACT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    addInvitationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.addInvitation(params).then(res => {
          commit('ADD_INVITATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    updateInvitationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.updateInvitation(params).then(res => {
          commit('UPDATE_INVITATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    deleteInvitationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.deleteInvitation(params).then(res => {
          commit('DELETE_INVITATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    addEmailModelInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.addEmailModel(params).then(res => {
          commit('ADD_MAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    updateEmailModelInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.updateEmailModel(params).then(res => {
          commit('UPDATE_MAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    deleteEmailModelInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterprisesInviteCustomerApi.deleteEmailModel(params).then(res => {
          commit('DELETE_MAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ????????????
    getEmailModelListInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getEmailModelList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_MAIL', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    getCustomerEmailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getCustomerEmail(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('CUS_MAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // ??????????????????
    getEmailModelDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterprisesInviteCustomerApi.getEmailModelDetail(utility.urlEncode(params));
        promises.then(res => {
          commit('GET_MAILDETAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};

