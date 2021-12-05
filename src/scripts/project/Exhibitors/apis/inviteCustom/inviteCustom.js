// 邀请参展商采购商
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 获取邀请列表
  inviteList(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(API_POT_URL + '/api/ifoInvite/getInviteList', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增或修改邀请列表
  updateOrAddInvite(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoInvite/updateOrAddInvite', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取历史展届
  exhibitionNumList() {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/exp/exhibitions/getListAll').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
