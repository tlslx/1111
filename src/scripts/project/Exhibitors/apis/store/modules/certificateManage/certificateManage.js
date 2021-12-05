// 进口展招展-人证管理
import { certificateManageApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    managePeopleInfoData: {}
  },
  getters: {
    managePeopleInfoData: state => state.managePeopleInfoData
  },
  actions: {
    // 获取管理人员列表
    getManagePeopleInfoList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.managePeopleInfo(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let records = res.records;
          records.forEach(value => {
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
    // 更新或新增管理人员
    postUpdateOrAddPeople({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = certificateManageApi.postUpdateOrAddPeople(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    MANG_PEO_LIST(state, payload) {
      state.managePeopleInfoData = payload;
    }
  }
};
