import { $req } from '../../../utils';
const BASE_URL = process.env.API_DA_URL;
export default {
  // 查询违规报告信息—分页
  getViolationRecordPage(params) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/daViolationRecord/getViolationRecordPage?param=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 表格当行查看违规报告数据
  getViolationRecordById(violationId) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/daViolationRecord/getViolationRecordById?param=' + violationId).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增违规报告
  addViolationRecord(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/daViolationRecord/addViolationRecord', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
