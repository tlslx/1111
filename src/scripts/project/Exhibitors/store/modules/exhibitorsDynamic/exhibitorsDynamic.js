// 进口展招展-发布展商动态
import { exhibitorsDynamicApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
const API_POT_URL = process.env.API_POT_URL; // 获取图片url用
export default {
  namespaced: true,
  state: {
    exhibitorsListData: {},
    exhibitorsDetailsData: {},
    exhibitNum: 0
  },
  getters: {
    exhibitorsListData: state => state.exhibitorsListData,
    exhibitorsDetailsData: state => state.exhibitorsDetailsData,
    exhibitNum: state => state.exhibitNum
  },
  actions: {
    // 展商动态列表查询 let srcUrl = this.API_POT_URL + '/api/ifoFile/getImg?fileId=' + preFileId;
    getExhibitorsList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorsDynamicApi.exhibitorsList(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          let records = res.records;
          records.forEach(ele => { // 遍历records
            let picUrl = '';
            if (ele.imageEnclosure) {
              let imageEnclosure = ele.imageEnclosure;
              picUrl = API_POT_URL + '/api/ifoFile/getImg?fileId=' + imageEnclosure;
            }
            ele.picUrl = picUrl;
          });
          commit('EXHIBITORS_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看已发布
    getExhibitNum({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorsDynamicApi.exhibitNum(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('EXHIBIT_NUM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看单条-编辑用
    getExhibitorsDetails({ commit }, id) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorsDynamicApi.exhibitorsDetails(id);
        promises.then(data => {
          let fileList = []; // upload展示
          let fileIdList = []; // 提交用
          if (data.fileInfos.length > 0) {
            data.fileInfos.forEach(ele => {
              let item = {
                name: ele.fileName || '',
                url: ele.fileId ? API_POT_URL + '/api/ifoFile/getImg?fileId=' + ele.fileId : ''
              };
              fileList.push(item);
              fileIdList.push(ele.fileId);
            });
          }
          data.fileList = fileList;
          data.fileIdList = fileIdList;
          commit('EXHIBITORS_DETAILS', data);
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 编辑
    postEditExhibitors({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorsDynamicApi.editExhibitors(params);
        promises.then(data => {
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除
    postDeleteExhibitors({ commit }, id) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorsDynamicApi.deleteExhibitors(id);
        promises.then(data => {
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增
    postAddExhibitors({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = exhibitorsDynamicApi.addExhibitors(params);
        promises.then(data => {
          resolve(data);
        }).catch(e => {
          reject(e);
        });
      });
    }
  },
  mutations: {
    EXHIBITORS_LIST(state, payload) {
      state.exhibitorsListData = payload;
    },
    EXHIBIT_NUM(state, payload) {
      state.exhibitNum = payload;
    },
    EXHIBITORS_DETAILS(state, payload) {
      state.exhibitorsDetailsData = payload;
    }
  }
};
