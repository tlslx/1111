import { enterApplyDriverApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    driverList: [],
    driverCertificateList: []
  },
  getters: {
    driverList: state => state.driverList,
    driverCertificateList: state => state.driverCertificateList
  },
  mutations: {
    GET_DRIVER_LIST(state, payload) {
      state.driverList = payload;
    },
    GET_DRIVER_CERTIFICATE_LIST(state, payload) {
      state.driverCertificateList = payload;
    }
  },
  actions: {
    // 获取司机人员信息列表
    getDriverList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterApplyDriverApi.getDriverListPage(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res && res.records) {
            if (res.records.length > 0) {
              let osSex = kindo.dictionary.get('gender');
              res.records.forEach((value) => {
                // 处理性别
                if (osSex.length > 0) {
                  let sexObj = osSex.find(elem => elem.value === value.sexTypeCode);
                  value.sexTypeCode = sexObj ? sexObj.label : value.sexTypeCode;
                }
                // 处理头像
                value.badgePhotoUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.badgePhotoUrl;
              });
            }
            commit('GET_DRIVER_LIST', res.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增司机信息
    addDriverInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyDriverApi.insertDriverAndAttach(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改司机信息
    editDriverInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyDriverApi.updateDriverById(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除司机信息
    deleteDriverInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyDriverApi.deleteDriverById(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取司机人员证件列表
    getDriverCertificateList({ commit }, params) {
      return new Promise((resolve, reject) => {
        const promises = enterApplyDriverApi.getInfoAndDetailListPage(utility.urlEncode(JSON.stringify(params)));
        promises.then(res => {
          if (res && res.applyInfo && res.applyInfo.records) {
            if (res.applyInfo.records.length > 0) {
              let osExhibitionPeriod = kindo.dictionary.get('exhibitionPeriodNum');
              let osVehicleBadgeType = kindo.dictionary.get('vehicleBadgeType');
              let osStatus = kindo.dictionary.get('badge_audit_status');
              res.applyInfo.records.forEach((value) => {
                // 处理展期
                if (osExhibitionPeriod.length > 0) {
                  let exhibitionPeriodObj = osExhibitionPeriod.find(elem => elem.value === value.exhibitionPeriod);
                  value.exhibitionPeriod = exhibitionPeriodObj ? exhibitionPeriodObj.label : value.exhibitionPeriod;
                }
                // 处理证件类型
                if (osVehicleBadgeType.length > 0) {
                  let badgeTypeNameObj = osVehicleBadgeType.find(elem => elem.value === value.badgeTypeName);
                  value.badgeTypeName = badgeTypeNameObj ? badgeTypeNameObj.label : value.badgeTypeName;
                }
                // 处理审核状态
                if (osStatus.length > 0) {
                  let statusObj = osStatus.find(elem => elem.value === value.status);
                  value.status = statusObj ? statusObj.label : value.status;
                }
                // 处理证件照
                value.badgePhotoUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + value.badgePhotoUrl;
              });
            }
            commit('GET_DRIVER_CERTIFICATE_LIST', res.applyInfo.records);
          }
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 新增司机人员证件信息
    addDriverCertificateInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyDriverApi.submitApplyByGroup(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改司机人员证件信息
    editDriverCertificateInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyDriverApi.updateOne(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 删除司机人员证件信息
    delApplyInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        enterApplyDriverApi.deleteDriverById(params).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
