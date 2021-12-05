import { $req } from '../../../utils';
const CYMT_URL = process.env.API_KHFW_URL;
export default {
  // 查看指标管理信息
  IndicatorManagement() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/IndicatorManagement').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看作业指标信息
  JodIndicator() {
    return new Promise((resolve, reject) => {
      $req.get(CYMT_URL + '/api/workOrder/JobIndicator').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
