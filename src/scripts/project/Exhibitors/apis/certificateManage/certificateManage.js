// 进口展招展-人证管理
import { $req } from '../../../utils';
const API_POT_URL = process.env.API_POT_URL;
// const SHUAI = "http://10.40.143.225:8052";
export default {
  // 管理人员信息
  managePeopleInfo(params) {
    return new Promise((resolve, reject) => {
      // API_POT_URL
      $req.get(API_POT_URL + '/api/ifoPerson/getPeopleList?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 单行详情
  peopleInfoDetails(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/ifoPerson/getPeopleDetail?json=' + params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 添加或更新人员信息
  updateOrAddPeople(params) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoPerson/updateOrAddPeople', params).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 删除
  deletePeopleInfo(id) {
    return new Promise((resolve, reject) => {
      $req.postJson(API_POT_URL + '/api/ifoPerson/deletePerson?ifoPersonId=' + id).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 下拉框-人员类型
  peopleTypeSelect(params) {
    return new Promise((resolve, reject) => {
      $req.get(API_POT_URL + '/api/dataDictItem/findDicItemListByIfoPeopleType').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
//初审证件
  // 获取列表
  getFirstCheckPapersList(param) {
    return $req.get();
  },

//人员管理
  //获取人证额度--列表
  getStatisticsTable(param) {
    return $req.get(API_POT_URL + `/api/personnelBadgeApply/getPersonnelBadgeSumList?current=${param.current}&size=${param.size}`);
  },
  //查看详情
  getPeoplePapersDetail(param) {
    return $req.get(API_POT_URL + `/api/personnelBadgeApply/getSingleApplyInfoByApplyId?applyId=${param}`);
  },
  //新增人证
  addPersonalPapers(param) {
    return $req.postJson(API_POT_URL + `/api/personnelBadgeApply/addApplyInfo`, param);
  },
  // 证件审核进度
  badgeApplyPlan(param) {
    return $req.get(API_POT_URL + `/api/personnelBadgeApply/getApplyInfoListPage?current=${param.current}&size=${param.size}&isAsc=${param.isAsc}&orderByField=${param.orderByField}`);
  },

//车证管理
  // 人所在企业的车证额度--列表
  getLimitTable(param) {
    return $req.get(API_POT_URL + `/api/personnelBadgeApply/getVehiclelBadgeSumList?current=${param.current}&size=${param.size}`);
  }
};
