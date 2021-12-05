import { supplementEnterpriseApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    openaccessList: [],
    applicationList: [],
    perservationList: [],
    perservationremoveList: [],
    weightList: [],
    addCompanyinfoList: {},
    taskCloseList: [],
    unioncompanyList: {},
    unioncheckList: {},
    unionidsList: []
  },
  getters: {
    openaccessList: state => state.openaccessList,
    applicationList: state => state.applicationList,
    perservationList: state => state.perservationList,
    perservationremoveList: state => state.perservationremoveList,
    weightList: state => state.weightList,
    addCompanyinfoList: state => state.addCompanyinfoList,
    taskCloseList: state => state.taskCloseList,
    unioncompanyList: state => state.unioncompanyList,
    unioncheckList: state => state.unioncheckList,
    unionidsList: state => state.unionidsList
  },
  mutations: {
    OPENACCESSLIST(state, payload) {
      state.openaccessList = payload;
    },
    APPLICATIONLIST(state, payload) {
      state.applicationList = payload;
    },
    PRESERVATIONLIST(state, payload) {
      state.perservationList = payload;
    },
    PRESERVATIONREMOVELIST(state, payload) {
      state.perservationremoveList = payload;
    },
    WEIGHTLIST(state, payload) {
      state.weightList = payload;
    },
    ADDCOMPANYINFOLIST(state, payload) {
      state.addCompanyinfoList = payload;
    },
    TASKCLOSELIST(state, payload) {
      state.taskCloseList = payload;
    },
    UNIONCOMPANYLIST(state, payload) {
      state.unioncompanyList = payload;
    },
    UNIONCHECKLIST(state, payload) {
      state.unioncheckList = payload;
    },
    UNIONIDSLIST(state, payload) {
      state.unionidsList = payload;
    }
  },
  actions: {
    // 基数不重核一般性展位数量安排
    getOpenAccess({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getopenAccess(obj).then(res => {
          for (let key in res.records) {
            res.records[key].operating = true;
            if (res.records[key].processCloseStatus === '0') {
              res.records[key].processCloseStatus = '未完成';
            } else if (res.records[key].processCloseStatus === '1') {
              res.records[key].processCloseStatus = '已完成';
            } else if (res.records[key].processCloseStatus === '2') {
              res.records[key].processCloseStatus = '未提交审批';
            }
            if (res.records[key].checkStatus === '0') {
              res.records[key].checkStatus = '未审核';
            } else if (res.records[key].checkStatus === '1') {
              res.records[key].checkStatus = '已通过';
            } else if (res.records[key].checkStatus === '2') {
              res.records[key].checkStatus = '审核不通过';
            }
          }
          commit('OPENACCESSLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
      // 2.	获取企业申请联营企业列表
    getApplicationJointventure({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getapplicationJointventure(obj).then(res => {
          for (let key in res) {
            res[key].operating = true;
          }
          commit('APPLICATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 5.	交易团保存追加联营企业并提交申请
    getPreservationApplicationventures({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getpreservationApplicationventures(obj).then(res => {
          commit('PRESERVATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     //  4.	撤销联营企业
    getPreservationApplicationRemove({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getpreservationApplicationRemove(obj).then(res => {
          commit('PRESERVATIONREMOVELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 联营企业中英文名称判重
    getWeightDetermination({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getweightDetermination(obj).then(res => {
          commit('WEIGHTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 新增企业联营企业
    getAddCompanyInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getaddCompanyInfo(obj).then(res => {
          commit('ADDCOMPANYINFOLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //6.	外贸中心审核交易团追加联营企业申请列表
    getTaskClosestatus({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.gettaskClosestatus(obj).then(res => {
          for (let key in res.records) {
            res.records[key].newArry = [];
            res.records[key].newArryids = [];
            res.records[key].newNames = [];
            res.records[key].newIds = [];
            res.records[key].operating = true;
            if (res.records[key].checkStatus === '0') {
              res.records[key].checkStatus = '未审核';
            } else if (res.records[key].checkStatus === '1') {
              res.records[key].checkStatus = '通过';
            } else if (res.records[key].checkStatus === '2') {
              res.records[key].checkStatus = '不通过';
            }
            if (res.records[key].boothType === '01') {
              res.records[key].boothType = '一般性';
            } else if (res.records[key].boothType === '02') {
              res.records[key].boothType = '品牌';
            }
            if (res.records[key].unionNames) {
              res.records[key].newunionNames = res.records[key].unionNames.split(',');
              for (let i in res.records[key].newunionNames) {
                res.records[key].newNames.push(res.records[key].newunionNames[i].split(':'));
              }
              for (let newi in res.records[key].newNames) {
                res.records[key].newArry.push(res.records[key].newNames[newi][0]);
                res.records[key].newArryids.push(res.records[key].newNames[newi][1]);
              }
              res.records[key].lastArry = res.records[key].newArry.join(',');
              res.records[key].lastName = res.records[key].newArryids.join(',');
            }
          }
          commit('TASKCLOSELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 7.	外贸中心审核交易团追加联营申请（审核）
    getUnionCompanyApply({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getunionCompanyApply(obj).then(res => {
          commit('UNIONCOMPANYLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 11.	根据联营企业ids查询明细
    getUnionIds({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getunionIds(obj).then(res => {
          let dicData = JSON.parse(localStorage.getItem('companyInfo'));
          for (let key in res) {
            for (let i in dicData.companyAttribute) {
              if (res[key].companyAttribute === dicData.companyAttribute[i].value) {
                res[key].companyAttributeName = dicData.companyAttribute[i].label;
              }
            }
            for (let i in dicData.companyType) {
              if (res[key].companyType === dicData.companyType[i].value) {
                res[key].companyTypeName = dicData.companyType[i].label;
              }
            }
          }
          commit('UNIONIDSLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 8.	工作部查看追加申请记录
    getUnioncheck({ commit }, obj) {
      return new Promise((resolve, reject) => {
        supplementEnterpriseApi.getunioncheck(obj).then(res => {
          for (let key in res.records) {
            if (res.records[key].appendType === 'ADD') {
              res.records[key].appendType = '新增';
            } else if (res.records[key].appendType === 'REMOVE') {
              res.records[key].appendType = '撤销';
            } else if (res.records[key].appendType === 'MODIFY') {
              res.records[key].appendType = '修改';
            }
            if (res.records[key].associateEnterprisesInfo) {
              res.records[key].address = res.records[key].associateEnterprisesInfo.addressCh;
            } else {
              res.records[key].address = res.records[key].addressCh;
            }
          }
          commit('UNIONCHECKLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
