import { $req } from '../../../utils';
const BASE_URL = process.env.API_SN_URL;
export default {
  // 展品数据审核页面（展示审核数据）
  exhibitAuditPage(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupExhManage/getExhibitInfo', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核
  exhibitAuditAudit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupExhManage/reviewExhibit', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取审核不通过原因列表
  reasonsApproved(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupReviewFailedReason/getReviewFailedReason', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增审核不通过原因
  auditApproved(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupReviewFailedReason/insetReviewFailedReason', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取修改详情页面
  modificaDetails(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupExhManage/getExhInformationDetail', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取修改详情页面(提交)
  modificaDetailsSubmit(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupExhManage/updateExhInformation', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 审核统计查询
  auditStatistics(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/efSupExhManage/AuditStatisticsQuery', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 检查敏感词
  checkSensitive(params) {
    return new Promise((resolve, reject) => {
      $req.getParams(BASE_URL + '/api/EfSupSensitiveWord/checkSensitiveWord', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除图片
  deleteImgag(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/efSupExhManage/delete', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
  
};
