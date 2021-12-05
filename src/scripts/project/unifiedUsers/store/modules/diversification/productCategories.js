import { getLastActivityCodeInfoApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    getLastCode: [],
    getListCategory: [],
    getcfCode: [],
    delProductCat: [],
    productSave: [],
    productUpdate: [],
    proCatLast: []

  },
  getters: {
    getLastCode: state => state.getLastCode,
    getListCategory: state => state.getListCategory,
    getcfCode: state => state.getcfCode,
    delProductCat: state => state.delProductCat,
    productSave: state => state.productSave,
    productUpdate: state => state.productUpdate,
    proCatLast: state => state.proCatLast
  },
  mutations: {
    GET_LASTCODE(state, payload) {
      state.getLastCode = payload;
    },
    GET_LISTCATEGORY(state, payload) {
      state.getListCategory = payload;
    },
    GET_CFCODE(state, payload) {
      state.getcfCode = payload;
    },
    DEL_PRODUCTCAT(state, payload) {
      state.delProductCat = payload;
    },
    GET_PRODUCTSAVE(state, payload) {
      state.productSave = payload;
    },
    GET_PRODUCTUPDATE(state, payload) {
      state.productUpdate = payload;
    },
    SAVE_PROCATLAST(state, payload) {
      state.proCatLast = payload;
    }
  },
  actions: {
    //获取最新活动编号
    getLastActivityCodeInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.getLastActivityCode();
        promises.then(res => {
          commit('GET_LASTCODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //获取活动编号
    getCfActivityCodeInfo({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.getCfActivityCode();
        promises.then(res => {
          commit('GET_CFCODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 产品大类列表
    getListProductCategoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.getListProductCategory(params);
        promises.then(res => {
          commit('GET_LISTCATEGORY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     //产品大类删除
    deleteProductCategoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.deleteProductCategory(params);
        promises.then(res => {
          commit('DEL_PRODUCTCAT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     //产品类别新增
    saveProductCategoryInfo({ commit }, params) {
      let currentObject = {
        "": "",
        "activityCode": params.activityCode,
        "productCategoryNameCn": params.productCategoryNameCn,
        "productCategoryNameEn": params.productCategoryNameEn,
        "infoCsTicketSet": {
          "activityCode": params.activityCode,
          "firstUpLimit": params.firstUpLimit,
          "firstDownLimit": params.firstDownLimit,
          "finalUpLimit": params.finalUpLimit,
          "finalDownLimit": params.finalDownLimit,
          "firstPassRate": params.firstPassRate
        }
      };
      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.saveProductCategory(currentObject);
        promises.then(res => {
          commit('GET_PRODUCTSAVE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //产品类别修改
    updateProductCategoryInfo({ commit }, params) {
      let currentObject = {
        "": "",
        "productCategoryNameCn": params.productCategoryNameCn,
        "productCategoryNameEn": params.productCategoryNameEn,
        "productCategoryId": params.productCategoryId,
        "activityCode": params.activityCode,
        "productCategoryCode": params.productCategoryCode,
        "infoCsTicketSet": {
          "activityCode": params.activityCode,
          "ticketSetId": params.ticketSetId,
          "firstUpLimit": params.firstUpLimit,
          "firstDownLimit": params.firstDownLimit,
          "finalUpLimit": params.finalUpLimit,
          "finalDownLimit": params.finalDownLimit,
          "firstPassRate": params.firstPassRate
        }

      };

      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.updateProductCategory(currentObject);
        promises.then(res => {
          commit('GET_PRODUCTUPDATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //产品类别一键导入
    saveProductCategoryByLastestInfo({ commit }, params) {
      let currentObject = {
        activityCode: params
      };
      return new Promise((resolve, reject) => {
        const promises = getLastActivityCodeInfoApi.saveProductCategoryByLastest(currentObject);
        promises.then(res => {
          commit('SAVE_PROCATLAST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
