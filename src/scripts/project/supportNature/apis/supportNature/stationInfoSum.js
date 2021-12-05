import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 商协会、交易团驻地信息统计
  tradingGroupStationStatistics(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupStation/statistics', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 商协会、交易团秘书长以上参会人员信息统计
  aboveSecretaryGeneralStatistics(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupAboveSecretaryGeneral/statistics', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 各单位填报人员信息统计
  tradingGroupAssociationStatistics(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupTradingGroupAssociation/statistics', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 大会领导委员会任职名单信息统计
  leadershipListStatistics(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupLeadershipList/statistics', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
