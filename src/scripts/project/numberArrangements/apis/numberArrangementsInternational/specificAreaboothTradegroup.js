import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 1.1新增工作部设置模板
  addOrdinaryDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemand/template/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 1.2获取工作部设置模板列表
  getListOrdinaryDemand(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryDemand/template/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 1.3编辑工作部设置模板
  editOrdinaryDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemand/template/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 1.4删除工作部设置模板
  deleOrdinaryDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemand/template/delete', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2.1获取各交易团各展区已申报基数内展位数
  getInitialOrdinaryDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemandRecord/getInitialNum', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2.2交易团特定展位申报
  addOrdinaryDemandRecord(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemandRecord/specialBooth/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2.3获取交易团申报特定展位列表
  getListOrdinaryDemandRecord(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinaryDemandRecord/specialBooth/getListPage', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2.4编辑交易团申报特定展位信息
  editOrdinaryDemandRecord(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemandRecord/specialBooth/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2.5删除交易团申报的特定展位信息
  deleOrdinaryDemandRecord(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemandRecord/specialBooth/delete', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 3.1获取特定范围展位申请-按需求数安排汇总列表
  getListOrdinarySpecialRangeDemand(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinarySpecialRangeDemand/getList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 3.2编辑特定范围展位申请-按需求数安排汇总列表
  editOrdinarySpecialRangeDemand(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeDemand/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 4.1获取特定范围展位申请-展区出口额占比安排汇总列表
  getListOrdinarySpecialRangeExport(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinarySpecialRangeExport/getList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 4.2编辑特定范围展位申请-展区出口额占比安排信息
  editOrdinarySpecialRangeExport(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeExport/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.1获取特定范围展位申请-安排汇总列表 
  getListOrdinarySpecialRangeTotal(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinarySpecialRangeTotal/getList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.2编辑特定范围展位申请-安排汇总信息 同 7.3工作部修改各交易团各展区展位数量安排方案
  editOrdinarySpecialRangeTotal(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeTotal/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.3删除特定范围展位申请-安排汇总信息 同 7.4工作部删除各交易团各展区展位数量安排方案
  deleOrdinarySpecialRangeTotal(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeTotal/delete', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 5.4提交汇总安排至外贸司审核 
  addOrdinaryPostArrangeTotal(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeTotal/postArrangeTotal/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.1获取外贸司审核安排列表
  getListPostArrangeTotal(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinarySpecialRangeTotal/postArrangeTotal/getList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 6.2外贸司审核 /api/ordinarySpecialRangeTotal/postArrangeTotal/edit
  editOrdinaryPostArrangeTotal(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeTotal/postArrangeTotal/edit', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.1获取工作部待公布方案列表 /api/ordinarySpecialRangeTotal/getUnPublishList
  getUnPublishOrdinarySpecialRangeTotal(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinarySpecialRangeTotal/getUnPublishList', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 7.2工作部公布各交易团各展区展位数量安排方案
  addOrdinaryPostUnPublish(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeTotal/postUnPublishList/add', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 8.1交易团方案查看 /api/ordinarySpecialRangeTotal/getPublishListByDelegation
  getPublishListByDelegation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/ordinarySpecialRangeTotal/getPublishListByDelegation', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 专区的数据字典
  getExhibitionInfoByCode(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/common/exhibitionInfoByCode/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 根据交易团Id查询交易团下属企业id，名称，广交会编码
  getCompanyInfoByDeleId(param) {
    return new Promise((resolve, reject) => {
      // let pam = encodeURI(JSON.stringify(param));
      $req.get(BASE_URL + '/api/common/companyInfoByDeleId/get', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 2根据交易团Id查询模板
  getOneTemplate(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinaryDemand/template/getOne', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 提交信息至安排汇总表
  addTotalPostArrangeTotal(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/ordinarySpecialRangeTotal/postArrangeTotal/addTotal', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 上传的接口
  uploadFile(data) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/file/upload', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除附件
  deleteFile(data) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/file/delete', data).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
