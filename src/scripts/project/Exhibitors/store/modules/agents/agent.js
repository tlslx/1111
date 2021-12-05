import { agentsApi } from '../../../apis';
const API_POT_URL = process.env.API_SN_URL;
// 下载管理模块
export default {
  namespaced: true,
  state: {
    // 审核企业列表
    getCompanyList: {},
    // 管理员审核展位申请
    postAdministrator: {},
    // 为企业分配广交会编码
    postEnterprises: {},
    getExhibitDetail: {}
  },
  getters: {
    // 审核企业列表
    getCompanyList: state => state.getCompanyList,
    // 管理员审核展位申请
    postAdministrator: state => state.postAdministrator,
    // 为企业分配广交会编码
    postEnterprises: state => state.postEnterprises,
    getExhibitDetail: state => getExhibitDetail
  },
  mutations: {
    // 审核企业列表
    GET_RECORDS_COMPANY(state, payload) {
      state.getCompanyList = payload;
    },
    // 管理员审核展位申请
    GET_RECORDS_REVIEWS(state, payload) {
      state.postAdministrator = payload;
    },
    // 为企业分配广交会编码
    POST_RECORDS_PRISES(state, payload) {
      state.postEnterprises = payload;
    },
    EXHIBIT_DETAILS(state, payload) {
      state.getExhibitDetail = payload;
    }
  },
  actions: {
  // ----------审核企业展位申请-----------
    getBoothList() {
      return agentsApi.getBooths();
    },
    getExhibitionsDetail({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = agentsApi.exhibitionsDetails(params);
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
    // 审核企业列表
    getReserveCompanyList({ commit }, param) {
      return new Promise((resolve, reject) => {
        agentsApi.getReserveCompanyList(param).then(res => {
          commit('GET_RECORDS_COMPANY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 管理员审核展位申请
    postAdministratorReviews({ commit }, param) {
      return new Promise((resolve, reject) => {
        agentsApi.administratorReviews(param).then(res => {
          commit('GET_RECORDS_REVIEWS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 为企业分配广交会编码
    postCantonCodesEnterprises({ commit }, param) {
      return new Promise((resolve, reject) => {
        agentsApi.cantonCodesEnterprises(param).then(res => {
          commit('POST_RECORDS_PRISES', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //审核功能
    checkStateCompany({ commit }, param) {
      return agentsApi.checkStateCompany(param);
    }
  }
  
};
