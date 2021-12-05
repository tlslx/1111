import { $req } from '../../../utils';
// import { $reqUtil } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
export default {
  // 查看企业信息修改记录
  getIfoAddedValueInvoice(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoProformaInvoice/get?current=' + param.current + "&isAsc=" + param.isAsc + "&type=" + param.type
      + "&orderByField=" + param.orderByField + "&orgId=" + param.orgId + "&orgType=" + param.orgType + "&size=" + param.size
      + "&exhibitionSession=" + param.exhibitionSession + "&exhibitionNum=" + param.exhibitionNum).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取增值税发票信息
  ifoAddedValueInvoiceData(param) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoAddedValueInvoice/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 更新增值税发票信息 保存按钮接口
  updateAddedInvoiceInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoAddedValueInvoice/updateAddedInvoiceInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
