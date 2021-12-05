import { commonApi } from "../../../apis";

//获取公共的数据
export default {
  namespaced: true,
  state: {
    currentExhibition: 0,
    exhibitionNum: null,
    boothArray: null,
    layoutArray: null,
    exhibitionsAreas: []
  },
  getters: {
    exhibitionNum: state => state.exhibitionNum,
    boothArray: state => state.boothArray,
    currentExhibition: state => state.currentExhibition,
    layoutArray: state => state.layoutArray,
    exhibitionsAreas: state => state.exhibitionsAreas
  },
  actions: {
    //获取全部届数
    getExhibitionNum() {
      return commonApi.getExhibitionNum();
    },
    //获取当前的届数
    getCurrentExhibitionNum() {
      return commonApi.getCurrentExhibitionNum();
    },
    //获取所有展区 1级菜单
    getBooth() {
      return commonApi.getBooth();
    },
    //根据展区来获取子目录 2级菜单
    getBoothChild({ commit }, params) {
      return commonApi.getBoothChild(params);
    },
    //获取展区
    getExhibitionPlace({ commit }, params) {
      return commonApi.getExhibitionPlace(params);
    },
    //获取展位类型
    getBoothApplyType({ commit }) {
      return commonApi.getBoothApplyType();
    },
    //下载模板
    downFileMethods({ commit }, parmas) {
      return commonApi.downFileMethods(parmas);
    },
    //企业列表
    getCompanyList({ commit }, params) {
      return commonApi.getCompanyList(params);
    },
    // 获取展区
    getExhibitionschemesGetAreas({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = commonApi.exhibitionschemesGetAreas();
        promises.then(res => {
          commit('EXHIBIT_AREA_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    EXHIBITION_CURRENT(state, payload) {
      state.currentExhibition = payload;
    },
    EXHIBITION_NUM(state, payload) {
      state.exhibitionNum = payload;
    },
    BOOTH_ARRAY(state, payload) {
      state.boothArray = payload;
    },
    EXHIBITION_PLAC(state, payload) {
      state.exhibitionPlace = payload;
    },
    LAYOUT_TYPE(state, payload) {
      state.layoutArray = payload;
    },
    EXHIBIT_AREA_LIST(state, payload) {
      state.exhibitionsAreas = payload;
    }
  }
};
