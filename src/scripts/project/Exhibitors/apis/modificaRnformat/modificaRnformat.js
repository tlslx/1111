import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 查看审核企业重要信息修改列表
  enterpriseRnformaModifica(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoApproveInfo/getCoHistoryList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看重要信息修改详情
  viewModificaDetail(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoApproveInfo/getHistoryModifyDetail', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核重要修改信息
  ieviewRmportant(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ifoApproveInfo/approveCoModify', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业列表查询
  enterpriseQuery(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/manageCompanyInformation/getCompanyList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取所有招展代理
  recruitAgents(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/ifoExhibitionAgent/getAllAgentsWithoutStraight', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看展品列表
  viewExhitList(param) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/applicationForExhibits/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
