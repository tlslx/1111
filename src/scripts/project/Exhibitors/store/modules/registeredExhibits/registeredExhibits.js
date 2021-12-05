// 进口展招展-登记展品
import { registeredExhibitsApi } from '../../../apis';
// import utility from '@/scripts/framework/utility';
const API_POT_URL = process.env.API_POT_URL;
export default {
  namespaced: true,
  state: {
    exhibitionsListData: {},
    exhibitionsDetailsData: {},
    afterDeleteFileList: []
  },
  getters: {
    exhibitionsListData: state => state.exhibitionsListData,
    exhibitionsDetailsData: state => state.exhibitionsDetailsData,
    afterDeleteFileList: state => state.afterDeleteFileList
  },
  actions: {
    //新增展品时新增企业
    getCompanyListAddExhibits() {
      return registeredExhibitsApi.getCompanyListAddExhibits();
    },
    // 展品列表
    getExhibitionsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.exhibitionsList(params);
        promises.then(res => {
          let records = res.records;
          if (records.length > 0) {
            records.forEach(ele => {
              ele.picUrl = ele.preFileId ? API_POT_URL + '/api/ifoFile/getImg?fileId=' + ele.preFileId : '';
            });
          }
          commit('EXHIBIT_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 展品详情
    getExhibitionsDetails({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.exhibitionsDetails(params);
        promises.then(res => {
          let _res = res; // 先复制
          // 原产地图片
          let ycdList = [];
          if (res.productSourcePic) {
            ycdList = [{ name: res.productSourcePic.fileName, url: API_POT_URL + '/api/ifoFile/getImg?fileId=' + res.productSourcePic.fileId }];
          }
          _res.ycdList = ycdList;

          // productPics
          // 展品图片
          let tpList = [];
          let tpFileIdsList = [];
          if (res.productPics.length > 0) {
            let productPics = res.productPics;
            productPics.forEach(ele => {
              let item = { name: ele.fileName, url: API_POT_URL + '/api/ifoFile/getImg?fileId=' + ele.fileId };
              tpList.push(item);
              tpFileIdsList.push(ele.fileId);
            });
          }
          _res.tpList = tpList;
          _res.tpFileIdsList = tpFileIdsList;

          // 展示视频
          let spList = [];
          let spFileIdsList = [];
          if (res.productVideos.length > 0) {
            let productVideos = res.productVideos;
            productVideos.forEach(ele => {
              let item = { name: ele.fileName, url: API_POT_URL + '/api/ifoFile/getImg?fileId=' + ele.fileId };
              spList.push(item);
              spFileIdsList.push(ele.fileId);
            });
          }
          _res.spList = spList;
          _res.spFileIdsList = spFileIdsList;

          // 展示获奖
          let hjList = [];
          let hjFileIdsList = [];
          if (res.productAwards.length > 0) {
            let productAwards = res.productAwards;
            productAwards.forEach(ele => {
              let item = { name: ele.fileName, url: API_POT_URL + '/api/ifoFile/getImg?fileId=' + ele.fileId };
              hjList.push(item);
              hjFileIdsList.push(ele.fileId);
            });
          }
          _res.hjList = hjList;
          _res.hjFileIdsList = hjFileIdsList;

          // 展示产权
          let cqList = [];
          let cqFileIdsList = [];
          if (res.productAwards.length > 0) {
            let productPropers = res.productPropers;
            productPropers.forEach(ele => {
              let item = { name: ele.fileName, url: API_POT_URL + '/api/ifoFile/getImg?fileId=' + ele.fileId };
              cqList.push(item);
              cqFileIdsList.push(ele.fileId);
            });
          }
          _res.cqList = cqList;
          _res.cqFileIdsList = cqFileIdsList;

          commit('EXHIBIT_DETAILS', _res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除展品
    postDeleteExhibitionsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.deleteExhibitionsList(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 设置为当届展品
    postCurrentSessionExhibitionsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.currentSessionExhibitionsList(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增列表
    postAddExhibitionsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.addExhibitionsList(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑列表 editExhibitionsList
    postEditExhibitionsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.editExhibitionsList(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 单文件上传删除-没有返回值
    postDeleteycdFile({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.deleteycdFile(params);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 多文件上传删除-有返回值
    postDeleteMoreFile({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = registeredExhibitsApi.deleteMoreFile(params);
        promises.then(res => {
          commit('AFTER_DELETE_FILELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    EXHIBIT_LIST(state, payload) {
      state.exhibitionsListData = payload;
    },
    EXHIBIT_DETAILS(state, payload) {
      state.exhibitionsDetailsData = payload;
    },
    AFTER_DELETE_FILELIST(state, payload) { // 多文件上传删除-有返回值
      state.afterDeleteFileList = payload;
    }
  }
};
