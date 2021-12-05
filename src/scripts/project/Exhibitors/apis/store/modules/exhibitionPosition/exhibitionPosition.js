// 进口展招展-查看展位
import { exhibitionPositionApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    exhibitionPositionPlanData: {}
  },
  getters: {
    exhibitionPositionPlanData: state => state.exhibitionPositionPlanData
  },
  actions: {
    // 查看看展位安排
    getExhibitionPositionPlan({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitionPositionApi.exhibitionPositionPlan(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let records = res.records;
          records.forEach(element => {
            element.applyProductNames = element.applyProductNames.join(',');
          });
          commit('EXHB_POSI_PLAN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    EXHB_POSI_PLAN(state, payload) {
      state.exhibitionPositionPlanData = payload;
    }
  }
};
