import { boothNumAdjustDateApi } from '../../../apis';
// import { $helper } from '../../../../utils';
export default {
  namespaced: true,
  state: {
    // 展位数量
    getNumBer: {},
    postMended: {},
    postAddedBooth: {},
    postDeleteBooths: {},
    postNewMoed: {}
  },
  getters: {
    // 展位数量
    getNumBer: state => state.getNumBer,
    postMended: state => state.postMended,
    postAddedBooth: state => state.postAddedBooth,
    postDeleteBooths: state => state.postDeleteBooths,
    postNewMoed: state => state.postNewMoed
  },
  mutations: {
    // 展位数量
    GET_NUMBER_BOOTH(state, payload) {
      state.getNumBer = payload;
    },
    POST_NUMBER_BOOTH(state, payload) {
      state.postMended = payload;
    },
    // 新增展位数量
    POST_NUMBER_NEW(state, payload) {
      state.postAddedBooth = payload;
    },
    POST_NUMBER_DATA(state, payload) {
      state.postDeleteBooths = payload;
    },
    POST_NUMBER_ATION(state, payload) {
      state.postNewMoed = payload;
    }
  },
  actions: {
    // 展位数量
    getNumberBoothData({ commit }, obj) {
      return new Promise((resolve, reject) => {
        boothNumAdjustDateApi.numberBoothData(obj).then(res => {
          for (let key in res.records) {
            if (res.records[key].checkStatus === '0') {
              res.records[key].checkStatus = '未审核';
            } else if (res.records[key].checkStatus === '1') {
              res.records[key].checkStatus = '审核通过';
            } else if (res.records[key].checkStatus === '2') {
              res.records[key].checkStatus = '审核不通过';
            } else if (res.records[key].checkStatus === '3') {
              res.records[key].checkStatus = '审核中';
            } else {
              res.records[key].checkStatus = '';
            }
          }
          for (let inde in res.records) {
            if (res.records[inde].exhibitionType === 'SPECIAL_BOOTH') {
              res.records[inde].exhibitionType = '特装';
            } else if (res.records[inde].exhibitionType === 'STANDARD_BOOTH') {
              res.records[inde].exhibitionType = '标摊';
            } else if (res.records[inde].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res.records[inde].exhibitionType = '中央通道';
            } else if (res.records[inde].exhibitionType === 'UNIFICATION_BOOTH') {
              res.records[inde].exhibitionType = '统一布展';
            } else {
              res.records[inde].exhibitionType = '';
            }
          }
          commit('GET_NUMBER_BOOTH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增展位数量
    postNewlyAddedBooths({ commit }, obj) {
      return new Promise((resolve, reject) => {
        boothNumAdjustDateApi.newlyAddedBooths(obj).then(res => {
          commit('POST_NUMBER_NEW', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改提交
    postNewModification({ commit }, obj) {
      return new Promise((resolve, reject) => {
        boothNumAdjustDateApi.newlyAddedSubmitted(obj).then(res => {
          commit('POST_NUMBER_ATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除展位数量
    postDeleteAddedBooths({ commit }, obj) {
      return new Promise((resolve, reject) => {
        boothNumAdjustDateApi.deleteAddedBooths(obj).then(res => {
          commit('POST_NUMBER_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 根据企业id和展区获取原推荐数量
    postRecommended({ commit }, obj) {
      return new Promise((resolve, reject) => {
        boothNumAdjustDateApi.originalRecommended(obj).then(res => {
          commit('POST_NUMBER_BOOTH', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
