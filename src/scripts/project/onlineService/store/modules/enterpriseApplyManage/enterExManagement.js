import { enterExManagementApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getAudit: [],
    getPro: {},
    getStatus: {},
    getopinion: {},
    addPro: {},
    deletePro: {},
    updatePro: {},
    getCom: {},
    updatePros: {}
  },
  getters: {
    getAudit: state => state.getAudit,
    getPro: state => state.getPro,
    getStatus: state => state.getStatus,
    addPro: state => state.addPro,
    getCom: state => state.getCom,
    deletePro: state => state.deletePro,
    updatePro: state => state.updatePro,
    updatePros: state => state.updatePros,
    getopinion: state => state.getopinion
  },
  mutations: {
    GET_AUDIT(state, payload) {
      state.getAudit = payload;
    },
    GET_PRODUCT(state, payload) {
      state.getPro = payload;
    },
    GET_STATUS(state, payload) {
      state.getStatus = payload;
    },
    ADD_PRODUCT(state, payload) {
      state.addPro = payload;
    },
    DELETE_PRODUCT(state, payload) {
      state.deletePro = payload;
    },
    UPDATE_PRODUCT(state, payload) {
      state.updatePro = payload;
    },
    UPDATE_PRODUCTS(state, payload) {
      state.updatePros = payload;
    },
    GET_COMPANY(state, payload) {
      state.getCom = payload;
    },
    GET_OPTION(state, payload) {
      state.getopinion = payload;
    },
    GET_EXH_CATE(state, payload) {
      state.getExhCate = payload;
    },
    GET_EXHSHOWCOUNT(state, payload) {
      state.getExhShowCount = payload;
    },
    GET_EXHCATE(state, payload) {
      state.getExhCate = payload;
    }
  },
  actions: {
    // 审核产品
    getOpinionInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterExManagementApi.getOpinion(params).then(res => {
          commit('GET_OPTION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增产品
    addProductInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterExManagementApi.addProduct(params).then(res => {
          commit('ADD_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除产品
    deleteProductInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterExManagementApi.deleteProduct(params).then(res => {
          commit('DELETE_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 更新产品
    updateProductInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterExManagementApi.updateProduct(params).then(res => {
          commit('UPDATE_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量更新产品
    updateProductsInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterExManagementApi.updateProducts(params).then(res => {
          commit('UPDATE_PRODUCTS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询产品详情
    getProductDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getProductDetail(utility.urlEncode(params));
        promises.then(res => {
          commit('GET_PRODUCT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取产品状态
    getExhibitStatusInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getExhibitStatus(utility.urlEncode(params));
        promises.then(res => {
          commit('GET_STATUS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取公司法人信息
    getCompanyLegalInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getCompanyLegal(utility.urlEncode(params));
        promises.then(res => {
          // if (res.records && res.records.length > 0) {
          commit('GET_COMPANY', res.records);
          // }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询审核企业产品
    getAuditEnterProductInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getAuditEnterProduct(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res.records && res.records.length > 0) {
            res.records.forEach((value, index, array) => {
              if (value.exhibitImageId) {
                value.imageUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.exhibitImageId.split(",")[0];
              }
            });
          }
          commit('GET_AUDIT', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取产品类别
    getExhibitCategorysInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getExhibitCategorys();
        promises.then(res => {
          commit('GET_EXH_CATE', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取已标注现场展示产品数
    getExhibitShowCountInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getExhibitShowCount(utility.urlEncode(params));
        promises.then(res => {
          // if (res.records && res.records.length > 0) {
          commit('GET_EXHSHOWCOUNT', res.records);
          // }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 转换展区类别CODE
    getExhibitCategoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterExManagementApi.getExhibitCategory(utility.urlEncode(params));
        promises.then(res => {
          commit('GET_EXHCATE', res.records);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};

