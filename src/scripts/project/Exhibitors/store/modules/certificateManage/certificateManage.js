// 进口展招展-人证管理
import { certificateManageApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
const API_POT_URL = process.env.API_POT_URL; // 获取图片url用
export default {
  namespaced: true,
  state: {
    managePeopleInfoData: {},
    peopleInfoDetailsData: {},
    peopleTypeSelectData: {}
  },
  getters: {
    managePeopleInfoData: state => state.managePeopleInfoData,
    peopleInfoDetailsData: state => state.peopleInfoDetailsData,
    peopleTypeSelectData: state => state.peopleTypeSelectData
  },
  actions: {
    // 获取管理人员列表
    getManagePeopleInfoList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.managePeopleInfo(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let records = res.records;
          records.forEach(value => {
            // 展示图片
            let imgUrl = '';
            if (value.cardPic) {
              imgUrl = API_POT_URL + '/api/ifoFile/getImg?fileId=' + value.cardPic;
            }
            value.imgUrl = imgUrl;
            // 状态写后面 会return
            let reviewStatusOne = value.reviewStatusOne;
            let reviewStatusTwo = value.reviewStatusTwo;
            value.status = '';
            if (reviewStatusOne === '0' || reviewStatusOne === '1') {
              switch (reviewStatusOne) {
                case '0':
                  value.status = '未审核';
                  return;
                case '1':
                  value.status = '不通过';
                  return;
                default: '';
              }
            } else if (reviewStatusOne === '2') {
              switch (reviewStatusTwo) {
                case '0':
                  value.status = '初审审核';
                  return;
                case '1':
                  value.status = '不通过';
                  return;
                case '2':
                  value.status = '审核通过';
                  return;
                default: '';
              }
            } else {
              value.status = '';
            }
          });
          commit('MANG_PEO_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 单行详情
    getPeopleInfoDetails({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.peopleInfoDetails(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let zjFileList = [{ name: '个人证件照', url: res.cardPic ? API_POT_URL + '/api/ifoFile/getImg?fileId=' + res.cardPic : '' }];
          res.zjFileList = zjFileList;
          let sfzFileList = [{ name: '身份证扫描件', url: res.idScan ? API_POT_URL + '/api/ifoFile/getImg?fileId=' + res.idScan : '' }];
          res.sfzFileList = sfzFileList;
          commit('PEO_DETAILS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新或新增管理人员
    postUpdateOrAddPeople({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.updateOrAddPeople(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除
    postDeletePeopleInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.deletePeopleInfo(id);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 下拉框-人员类型
    getPeopleTypeSelect({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.peopleTypeSelect();
        promises.then(res => {
          let data = res.records;
          let _data = [];
          data.forEach(ele => {
            _data.push({ value: ele.itemCode, label: ele.itemText });
          });
          commit('PEO_TYPE_SELECT', _data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
  
  //初审证件
    // 获取列表
    getFirstCheckPapersList({ commit }, param) {
      return certificateManageApi.getFirstCheckPapersList(param);
    },
  //人员管理---我的证件
    //获取人证指标统计表
    getStatisticsTable({ commit }, param) {
      return certificateManageApi.getStatisticsTable(param);
    },
    //查看详情
    getPeoplePapersDetail({ commit }, param) {
      return certificateManageApi.getPeoplePapersDetail(param);
    },
    //新增人证
    addPersonalPapers({ commit }, param) {
      return certificateManageApi.addPersonalPapers(param);
    },
    // 证件审核进度
    badgeApplyPlan({ commit }, param) {
      return certificateManageApi.badgeApplyPlan(param);
    },

  //车证管理
    // 人所在企业的车证额度--列表
    getLimitTable({ commit }, param) {
      return certificateManageApi.getLimitTable(param);
    }
  },
  mutations: {
    MANG_PEO_LIST(state, payload) {
      state.managePeopleInfoData = payload;
    },
    PEO_DETAILS(state, payload) {
      state.peopleInfoDetailsData = payload;
    },
    PEO_TYPE_SELECT(state, payload) {
      state.peopleTypeSelectData = payload;
    }
  }
};
