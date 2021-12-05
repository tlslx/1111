import { foreignDepartmentApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getArr: [],
    getDepar: [],
    postSche: [],
    getFor: {},
    getEpar: [],
    getPubl: [],
    postPubl: [],
    postSave: [],
    getUpload: []
  },
  getters: {
    getArr: state => state.getArr,
    getDepar: state => state.getDepar,
    postSche: state => state.postSche,
    getFor: state => state.getFor,
    getEpar: state => state.getEpar,
    getPubl: state => state.getPubl,
    postPubl: state => state.postPubl,
    postSave: state => state.postSave,
    getUpload: state => state.getUpload
  },
  mutations: {
    REPORT_PCATA(state, payload) {
      state.getUpload = payload;
    },
    REPORT_DATA(state, payload) {
      state.getArr = payload;
    },
    REPORT_BATA(state, payload) {
      state.getDepar = payload;
    },
    REPORT_CATA(state, payload) {
      state.postSche = payload;
    },
    REPORT_ZATA(state, payload) {
      state.getFor = payload;
    },
    REPORT_PATA(state, payload) {
      state.getEpar = payload;
    },
    REPORT_PBATA(state, payload) {
      state.getPubl = payload;
    },
    REPORT_POATA(state, payload) {
      state.postPubl = payload;
    },
    REPORT_PDATA(state, payload) {
      state.postSave = payload;
    } 
  },
  actions: {
     // 查看安排方案
    getArrangement ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.arrangement(obj).then(res => {
          commit('REPORT_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司方案确定
    postDepartmentProgram ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.departmentProgram(obj).then(res => {
          commit('REPORT_BATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看安排方案保存
    postScheduleSaved ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.scheduleSaved(obj).then(res => {
          commit('REPORT_CATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司查看地区汇总表
    getForeignDepartment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.foreignDepart(obj).then(res => {
          // let res = res.getFor.toString();
          // res.tostring();
          // console.log(res);
          // res.lastReviewExhibitionSession.toString();
          commit('REPORT_ZATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 外贸司查看展区汇总表
    getForeignEpartment({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.ForeignEpartment(obj).then(res => {
          commit('REPORT_PATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }, 
    // 发布公示公告
    getPublicNotices({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.publicNotices(obj).then(res => {
          commit('REPORT_PBATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公示post
    postPublicPotices({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.publicPotices(obj).then(res => {
          commit('REPORT_POATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公示保存
    postPublicSave({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.publicSave(obj).then(res => {
          commit('REPORT_PDATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公示上传
    getPublicUpload({ commit }, obj) {
      return new Promise((resolve, reject) => {
        foreignDepartmentApi.publicUpload(obj).then(res => {
          commit('REPORT_PCATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
