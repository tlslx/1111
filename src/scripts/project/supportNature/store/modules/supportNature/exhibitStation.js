import { exhibitStationApi } from '../../../apis';
export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    // 驻地信息填报
    postExhibitFillSubmit({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitStationApi.exhibitFillSubmit(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};

