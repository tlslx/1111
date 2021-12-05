import { $req } from '../../../utils';
const BASE_URL = process.env.API_NA_URL;
export default {
  // 展位数量及范围列表和查询
  getListAllOrdinary(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getCommendBoothInfo?current=' + param.current + '&size=' + param.size, {
        exhibitionAreaCode: param.exhibitionArea,
        exhibitionSession: param.exhibitionSession
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 新增展位数量及范围
  getaddNumregister(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/addCommendBoothInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除展位数量及范围
  getdeleNumregister(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/delCommendBoothInfo?areaRewardId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改展位数量及范围
  geteditNumregister(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/updateCommendBoothInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确认表彰交易团列表查询
  getboothNum(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getCommendDelegationInfo?current=' + param.current + '&size=' + param.size, {
        exhibitionSession: param.exhibitionSession,
        delegationId: param.delegationId
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取放开申请的展位类别信息
  getopenApplication() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/commendArrange/getCommendAreaRewardInfo?current=0&size=0').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确认表彰交易团列表编辑操作
  getaddOpenApplication(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/editDelegationBoothInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 确认表彰交易团列表删除操作
  getremoveApplication(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/deleteDelegationBoothInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 确认表彰交易团列表放开申请
  getconfirmationopenApplication(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/updateDelegationBoothInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 确认表彰交易团列表新增
  getaddApplication(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/addCommendDelegationInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   // 保存测算调和系数
  getsaveReconcileInfo(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/saveReconcileInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取确认表彰交易团列表信息
  getlistOpenApplication(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/obtainCommendDelegationInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 生成测算展位数列表
  getboothArrange(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getEstimateInfo?current=' + param.current + '&size=' + param.size, {
        delegationId: param.delegationId,
        boothNumber: param.boothNumber,
        exportVolume: param.exportVolume
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询填写申报需求
  getdeclareDemand(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getDeclaredDemandInfo?current=0&size=0', {
        delegationId: param.delegationId
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询填写申报需求
  getpreservationDemand(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/updateDeclaredDemandSequenceIndex', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部审核交易团申请
  getdeclaredDemand(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getDelegationApplyInfo?current=' + param.current + '&size=' + param.size, {
        examineStatus: param.examineStatus,
        delegationId: param.delegationId
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改表彰展位申报需求审批信息
  getupdateCommend(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/updateCommendExamineInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询工作部制定用于表彰安排展位的安排方案
  getarrangementplan(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getCommendApplyPlanInfo?current=' + param.current + '&size=' + param.size, {
        delegationId: param.delegationId
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 工作部制定用于表彰安排展位的安排方案表头
  getscheduleheader() {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/commendArrange/getCommendExhibitionAreaInfo').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 保存工作部制定用于表彰安排展位的安排方案
  getpreservation(param) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/api/commendArrange/saveCommendBoothInfo?delegationId=' + param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //修改表彰展位申报需求审批信息
  geteditingplan(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/saveDeclaredDemandInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //查询生成展位安排表全部
  getprintAll(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getBoothArrangeAllInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询生成展位安排表
  getgeneratebooth(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/getBoothArrangeInfo?current=' + param.current + '&size=' + param.size, {
        delegationId: param.delegationId,
        boothNumber: param.boothNumber,
        exhibitionAreaCode: param.exhibitionAreaCode
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 查询公布获表彰交易团奖励的展位类别及数量安排结果
  getarrangementresult(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/publishCommendBoothResult?current=' + param.current + '&size=' + param.size, {
        delegationId: param.delegationId,
        exhibitionPeriod: param.exhibitionPeriod,
        exhibitionAreaCode: param.exhibitionAreaCode,
        associatioId: param.associatioId,
        boothType: param.boothType
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 生成测算
  getcommendBoothCalculation(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/commendBoothCalculation', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
   //外贸司审批展位安排表(通过不通过按钮)
  getcheckBoothInfo(param) {
    return new Promise((resolve, reject) => {
      $req.postJson(BASE_URL + '/api/commendArrange/checkBoothArrangeInfo', param).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }
};
