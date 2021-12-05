import { companyInfomationApi } from '../../../apis';
export default{
  namespaced: true,
  state: {
    
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {
    postReturnBooth({ commit }, Object) {
      return new Promise((resolve, reject) => {
        companyInfomationApi.postReturnBoothData(Object).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
