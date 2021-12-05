import { $req } from '../../../utils';
const BASE_URL = process.env.API_OS_URL;
export default {
  // 新增客户信息
  addCustomer(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/addCustomerInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新客户信息
  updateCustomer(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/updateCustomerInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除客户信息
  deleteCustomer(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/deleteCustomerInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 查看维护客户信息
  getCustomerList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getCustomerList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看维护客户信息详情
  getCustomerDetail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getCustomerDetail?customerId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增邀请查询客户
  getCustomerAllList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getCustomerAllList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增邀请查询邮件
  getEmailModelAllList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getEmailModelAllList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增邀请查询企业联系人
  getCompanyContact(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getCompanyContactInfo?companyId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看邀请情况列表
  getInvitationList(json, date) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getInvitationList?json=' + json + '&date=' + date).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看邀请情况详情
  getInvitationDetail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getInvitationDetail?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增邀请
  addInvitation(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/addInvitationInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新邀请
  updateInvitation(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/updateInvitationInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除邀请
  deleteInvitation(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/deleteInvitationInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },


  // 查看邮件
  getEmailModelList(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getEmailModelList?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 校验邮箱重复
  getCustomerEmail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getCustomerEmail?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看邮件详情
  getEmailModelDetail(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/efOS/efOsCustomerInvitationInfo/getEmailModel?emailModelId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增邮件
  addEmailModel(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/addEmailModel', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新邮件
  updateEmailModel(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/updateEmailModel', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除邮件
  deleteEmailModel(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/efOS/efOsCustomerInvitationInfo/deleteEmailModel', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
