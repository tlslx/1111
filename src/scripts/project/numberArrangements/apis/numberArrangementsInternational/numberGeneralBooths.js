import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 基数不重核一般性展位数量安排
  recheckGeneral(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/OrdinaryDemandQuantity/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  numberArrangementPost(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDemandQuantity/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 基数不重核一般性展位数量安排(编辑) 
  numberArrangementEdit(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDemandQuantity/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导入中央通道安排数量
  channeArrangements(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/OrdinaryDemandQuantity/boothNumber/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导入中央通道安排数量(编辑)
  channeCopyreader(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDemandQuantity/boothNumber/update', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导入中央通道安排数量(导入)
  channeGuideInto(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDemandQuantity/importCenterNumber/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查看安排方案
  ViewArrangement(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryAdjustApplyDelegation/boothNumber/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 导入中央通道安排数量(公示)
  publishSendInternalLetter(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/OrdinaryDemandQuantity/sendInternalLetter/publish', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
