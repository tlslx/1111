import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 审核退回申请列表
  postReviewListData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/getReviewList`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除-退回申请列表
  boothreturnedDelete(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/delete`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 通过or不通过
  postRefundApplyOperData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/refundApplicationOperation`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取退回详情
  postApplicationDetailData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/getApplicationDetail`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增申请---根据企业、展区获取品牌确认信息
  getAffirmCompanyInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/boothreturned/getAffirmCompany`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 企业确认退回申请书上传
  postConfirmDetailUploadData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/upload`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增申请提交
  postAddApplySubmitData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/addRefundApplication`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部查看汇总
  postSummaryListData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/getSummaryList`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团/工作部审核
  postBackBookCheckSubmitData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/boothreturned/dealCluster/update`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团发起申请(企业名称)
  getenterprisename(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/common/companyInfoByDeleId/get?delegationId=` + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //交易团发起申请(联想展区)
  getexhibitionname(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/common/exhibitionArea/getListAll?exhibitionSession=` + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
