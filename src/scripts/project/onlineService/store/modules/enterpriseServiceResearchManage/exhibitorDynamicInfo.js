import { exhibitorDynamicInfoApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getPubExh: [],
    getPubStas: [],
    delDynTrd: [],
    modDynTra: [],
    reviewnum: {},
    removemark: {},
    auditexpo: {}

  },
  getters: {
    getPubExh: state => state.getPubExh,
    getPubStas: state => state.getPubStas,
    delDynTrd: state => state.delDynTrd,
    modDynTra: state => state.modDynTra,
    reviewnum: state => state.reviewnum,
    removemark: state => state.removemark,
    auditexpo: state => state.auditexpo
  },
  mutations: {
    GET_PUBEXH(state, payload) {
      state.getPubExh = payload;
    },
    GET_PUBSTAS(state, payload) {
      state.getPubStas = payload;
    },
    DEL_DYNTRD(state, payload) {
      state.delDynTrd = payload;
    },
    MOD_DYNTRA(state, payload) {
      state.modDynTra = payload;
    },
    REVIEW_NUM(state, payload) {
      state.reviewnum = payload;
    },
    AUDIT_EXPO(state, payload) {
      state.auditexpo = payload;
    },
    REMOVE_MARK(state, payload) {
      state.removemark = payload;
    }
  },
  actions: {
    // 展商动态列表查询
    getPublishExhibition({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.getPublishExhibition(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              value.approverResult = value.approverResult === "1" ? '审核通过' : value.approverResult === "0" ? '不通过' : '待审核';
              value.releaseStatus = value.releaseStatus === "1" ? '已发布' : '待发布';
              if (value.excellentArticleMark === "1") {
                value.contentTitle = value.contentTitle + "(优秀文章)";
              }
              let currentImages = value.imageEnclosure.split(','); // 后台的字符串转换成数组
              let imageUrls = [];
              currentImages.forEach((currentVal) => {
                imageUrls.push(process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + currentVal);
              });
              value.imageUrl = imageUrls;
              // value.imageUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.imageEnclosure;
            });
          }
          commit('GET_PUBEXH', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取发布数量
    reviewExhibitionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.reviewExhibition(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('REVIEW_NUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //发布新动态
    getpublishNewStatusAndSave({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.getpublishNewStatusAndSave(params);
        promises.then(res => {
          commit('GET_PUBSTAS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //展商动态列表删除
    deleteDynamicTrade({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.deleteDynamicTrade(params);
        promises.then(res => {
          commit('DEL_DYNTRD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核动态列表
    reviewExpoDynamicInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.reviewExpoDynamic(params);
        promises.then(res => {
          commit('AUDIT_EXPO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 移除动态列表
    removeExcellentArticleMarkInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.removeExcellentArticleMark(params);
        promises.then(res => {
          commit('REMOVE_MARK', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //修改新动态
    modificationDynamicTrade({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorDynamicInfoApi.modificationDynamicTrade(params);
        promises.then(res => {
          commit('MOD_DYNTRA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }

  }
};
