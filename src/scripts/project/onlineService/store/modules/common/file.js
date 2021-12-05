import { fileApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    addFileData: {},
    delFileData: null,
    selectFileData: {},
    selectFileDatas: []
  },
  getters: {
    addFileData: state => state.addFileData,
    delFileData: state => state.delFileData,
    selectFileData: state => state.selectFileData,
    selectFileDatas: state => state.selectFileDatas
  },
  mutations: {
    ADD_FILE_DATA(state, payload) {
      state.addFileData = payload;
    },
    DEL_FILE_DATA(state, payload) {
      state.delFileData = payload;
    },
    SELECT_FILE_DATA(state, payload) {
      state.selectFileData = payload;
    },
    SELECT_FILE_DATAS(state, payload) {
      state.selectFileDatas = payload;
    }
  },
  actions: {
    // 新增文件
    addFileInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        const promises = fileApi.addFile(data);
        promises.then(res => {
          commit('ADD_FILE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除文件
    delFileInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        const promises = fileApi.deleteFile(data);
        promises.then(res => {
          commit('DEL_FILE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业基本信息删除文件
    delBasicFileInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        const promises = fileApi.deleteBasicInfoFile(data);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看文件
    selectFileInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        const promises = fileApi.queryFile(data);
        promises.then(res => {
          commit('SELECT_FILE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 批量查看文件
    selectFileInfos({ commit }, data) {
      return new Promise((resolve, reject) => {
        const promises = fileApi.queryFiles(data);
        promises.then(res => {
          commit('SELECT_FILE_DATAS', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 下载文件
    downloadFileInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        const promises = fileApi.downloadFile(data);
        promises.then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
