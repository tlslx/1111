import { $req } from "../../../utils";
const BASER_URL = process.env.API_NA_URL;
export default {
  //交易团查看企业退回申请书
  enterpriseReturn(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/backConfirmation/getListPage?json=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //审核企业资料详情页
  eviewBusiness(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/numberAffirm/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //企业提交品牌展位退回确认书
  enterprisesSubmit(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/backConfirmation/explainSet/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  enterprisesAubmit(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASER_URL + '/api/backConfirmation/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  enterprisesBubmit(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/backConfirmation/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团汇总退回展位数
  summarized(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/numberAffirm/notPaySubscription/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //上传确认书
  addBackConfirmation(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASER_URL + '/api/backConfirmation/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};

