import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 查询交易团收集企业申请
  postIronStoneApplyInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/getIronStoneApplyInfo?current=${data.current}&size=${data.size}`, {
        productType: data.productType,
        delegationId: data.delegationId,
        companyName: data.companyName
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增交易团收集企业申请
  postAddIronStoneApplyInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/addIronStoneApplyInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 编辑交易团收集企业申请
  postUpdateIronStoneApplyInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/updateIronStoneApplyInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除交易团收集企业申请
  getDelIronStoneApplyInfoData(param) {
    return new Promise((resolve, reject) => {
      $req.get(`${BASE_URL}/api/ironStoneHydrotherapy/delIronStoneApplyInfo`, param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 交易团收集企业申请汇总提交
  postHydrotherapyStatusData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/updateIronStoneHydrotherapyStatus`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部汇总数据并安排展位数量
  postSummaryIronStoneInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/getSummaryIronStoneInfo?current=${data.current}&size=${data.size}`, {
        productType: data.productType,
        delegationId: data.delegationId
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部申报铁石水疗展位数
  postUpdateBaseBoothNumberInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/updateBaseBoothNumberInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 外贸司查看汇总表
  postIronStoneReorderInfoData(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(`${BASE_URL}/api/ironStoneHydrotherapy/getIronStoneReorderInfo`, data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
