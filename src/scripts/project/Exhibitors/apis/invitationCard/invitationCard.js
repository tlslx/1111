import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 申请付款通知书
  getInvitationsData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoInviteCard/getInvitations?size=' + param.size + '&isAsc=' + param.isAsc
      + '&current=' + param.current + '&orderByField=' + param.orderByField + '&exhibitionNum=' + param.exhibitionNum
      + '&exhibitionSession=' + param.exhibitionSession + '&personName=' + param.personName).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 可新增邀请函列表
  addableListData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoInviteCard/addableList?size=' + param.size + '&isAsc=' + param.isAsc
      + '&current=' + param.current + '&orderByField=' + param.orderByField + '&exhibitionNum=' + param.exhibitionNum
      + '&exhibitionSession=' + param.exhibitionSession + '&companyId=' + param.companyId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 显示额度
  getLimitData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoInviteCard/getLimit?companyId=' + param.companyId
      + '&exhibitionNum=' + param.exhibitionNum + '&exhibitionSession=' + param.exhibitionSession).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确定新增
  createInvitationCardData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoInviteCard/createInvitationCard', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改打印状态
  updatePrintStatusData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoInviteCard/updatePrintStatus?inviteCardId=' + param.inviteCardId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 撤回邀请函
  deleteData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoInviteCard/delete?inviteCardId=' + param.inviteCardId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};
