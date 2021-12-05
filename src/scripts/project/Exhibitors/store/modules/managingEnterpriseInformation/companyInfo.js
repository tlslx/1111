import { companyInfoApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
const API_POT_URL = process.env.API_POT_URL; // 获取图片url用
export default {
  namespaced: true,
  state: {
    getComInfo: {},
    getCompany: [],
    getCompanyDetail: [],
    targetConstomSelectData: [],
    companyListData: {}
  },
  getters: {
    getComInfo: state => state.getComInfo,
    getCompany: state => state.getCompany,
    getCompanyDetail: state => state.getCompanyDetail,
    targetConstomSelectData: state => state.targetConstomSelectData,
    companyListData: state => state.companyListData
  },
  mutations: {
    GET_COMINFO(state, payload) {
      state.getComInfo = payload;
    },
    // UPDATE(state, payload) {
    //   state.update = payload;
    // },
    GET_COMPANY(state, payload) {
      state.getCompany = payload;
    },
    GET_COMPANYDETAIL(state, payload) {
      state.getCompanyDetail = payload;
    },
    // REMOVE_CPFILE(state, payload) {
    //   state.removeCpFile = payload;
    // },
    TARGET_CONSTOM(state, payload) {
      state.targetConstomSelectData = payload;
    },
    COMPANY_LIST(state, payload) {
      state.companyListData = payload;
    }
  },
  actions: {
    // 获取企业基本信息
    getCompanyInformationInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.getCompanyInformation(params);
        promises.then(res => {
          let licenseFileList = []; // 营业执照
          if (res.licenseFile) {
            let licenseFile = res.licenseFile;
            let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + licenseFile.fileId;
            licenseFileList = [{ name: licenseFile.fileName, url: fileId }];
          }
          res.licenseFileList = licenseFileList;

          let sourceFileList = []; // 原产地
          if (res.sourceFile) {
            let sourceFile = res.sourceFile;
            let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + sourceFile.fileId;
            sourceFileList = [{ name: sourceFile.fileName, url: fileId }];
          }
          res.sourceFileList = sourceFileList;

          let logoFileList = []; // logo
          if (res.logoFile) {
            let logoFile = res.logoFile;
            let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + logoFile.fileId;
            logoFileList = [{ name: logoFile.fileName, url: fileId }];
          }
          res.logoFileList = logoFileList;

          let renzheng = []; let zhishi = []; let huojiang = []; let zhanhui = []; let fiveh = []; // filelist
          let havezhishi = []; let havehuojiang = []; let havefiveh = []; // 增删原有数组-只有多选有
          let haverenzheng = []; let havezhanhui = [];
          if (res.filesOfTypes) {
            res.filesOfTypes.forEach(ele => {
              res.ifoCompany.interWitnessNum = 0;
              if (ele.type === "0" && ele.filesInfo.length > 0) { // 认证 note
                ele.filesInfo.forEach(_ele => {
                  let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + _ele.fileId;
                  let item = { name: _ele.note || _ele.fileName, url: fileId };
                  renzheng.push(item);
                  haverenzheng.push(_ele.fileId);
                });
                res.ifoCompany.interWitnessNum = ele.filesInfo.length;
              }
              res.renzheng = renzheng;
              res.haverenzheng = haverenzheng;

              res.ifoCompany.propertyNum = 0;
              if (ele.type === "1" && ele.filesInfo.length > 0) { // 知识
                ele.filesInfo.forEach(_ele => {
                  let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + _ele.fileId;
                  let item = { name: _ele.fileName, url: fileId };
                  zhishi.push(item);
                  havezhishi.push(_ele.fileId);
                });
                res.ifoCompany.propertyNum = ele.filesInfo.length;
              }
              res.zhishi = zhishi; // fileList
              res.havezhishi = havezhishi; // 原数组

              res.ifoCompany.prizeNum = 0;
              if (ele.type === "2" && ele.filesInfo.length > 0) { // 获奖
                ele.filesInfo.forEach(_ele => {
                  let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + _ele.fileId;
                  let item = { name: _ele.fileName, url: fileId };
                  huojiang.push(item);
                  havehuojiang.push(_ele.fileId);
                });
                res.ifoCompany.prizeNum = ele.filesInfo.length;
              }
              res.huojiang = huojiang; // fileList
              res.havehuojiang = havehuojiang; // 原数组

              if (ele.type === "3" && ele.filesInfo.length > 0) { // 展会 note
                ele.filesInfo.forEach(_ele => {
                  let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + _ele.fileId;
                  let item = { name: _ele.note || _ele.fileName, url: fileId };
                  zhanhui.push(item);
                  havezhanhui.push(_ele.fileId);
                });
              }
              res.zhanhui = zhanhui;
              res.havezhanhui = havezhanhui;

              if (ele.type === "4" && ele.filesInfo.length > 0) { // 500强
                ele.filesInfo.forEach(_ele => {
                  let fileId = API_POT_URL + '/api/ifoFile/getImg?fileId=' + _ele.fileId;
                  let item = { name: _ele.fileName, url: fileId };
                  fiveh.push(item);
                  havefiveh.push(_ele.fileId);
                });
              }
              res.fiveh = fiveh;
              res.havefiveh = havefiveh; // 原数组
            });
          }

          if (res.countryRegions) { // 国家地区
            res.countryRegionsF = res.countryRegions[0] || '';
            res.countryRegionsS = res.countryRegions[1] || '';
            res.countryRegionsT = res.countryRegions[2] || '';
          }
          commit('GET_COMINFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 企业信息修改
    updateInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.update(params);
        promises.then(res => {
          // commit('UPDATE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业信息修改记录
    getCompanyUpdateHistoryInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.getCompanyUpdateHistory(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_COMPANY', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查看企业信息修改记录详情
    getCompanyUpdateHistoryDetailInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.getCompanyUpdateHistoryDetail(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          commit('GET_COMPANYDETAIL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除多选文件
    removeCpFileLkInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.removeCpFileLk(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          // commit('REMOVE_CPFILE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 目标客户下拉框
    getTargetConstomSelect({ commit }) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.targetConstomSelect();
        promises.then(res => {
          let data = res.records;
          let _data = [];
          data.forEach(ele => {
            _data.push({ value: ele.itemCode, label: ele.itemText });
          });
          commit('TARGET_CONSTOM', _data);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // agent 企业列表
    getCompanyList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = companyInfoApi.companyList(params);
        promises.then(res => {
          commit('COMPANY_LIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
