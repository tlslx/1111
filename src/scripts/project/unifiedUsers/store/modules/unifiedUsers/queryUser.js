import { accountInfoApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    getUserInfo: [],
    verifyCodeInfo: [],
    verifyCode: [],
    updateEmail: []
  },
  getters: {
    getUserInfo: state => state.getUserInfo,
    verifyCodeInfo: state => state.verifyCodeInfo,
    verifyCode: state => state.verifyCode,
    updateEmail: state => state.updateEmail
  },
  mutations: {
    GET_USERINFO_DATA(state, payload) {
      state.getUserInfo = payload;
    },
    VERIFYCODE_INFO_DATA(state, payload) {
      state.verifyCodeInfo = payload;
    },
    VERIFY_CODE_DATA(state, payload) {
      state.verifyCode = payload;
    },
    UPDATE_EMAIL_DATA(state, payload) {
      state.updateEmail = payload;
    }
  },
  actions: {
    // 查询账号信息
    getqueryUserInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        accountInfoApi.getQueryUserInfo(obj).then(res => {
          commit('GET_USERINFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 发送手机验证码
    getSendVerifyCodeInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        accountInfoApi.getSendMobileVerifyCode(obj).then(res => {
          commit('VERIFYCODE_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 发送手机验证码-不校验用户
    getSendMobileCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        accountInfoApi.getSendMobileCode(obj).then(res => {
          commit('VERIFYCODE_INFO_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 验证手机验证码
    getvalidMobileVerifyCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        accountInfoApi.getValidMobileVerifyCode(obj).then(res => {
          commit('VERIFY_CODE_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 修改邮箱
    getupdateEmail({ commit }, obj) {
      return new Promise((resolve, reject) => {
        accountInfoApi.getUpdateEmail(obj).then(res => {
          commit('UPDATE_EMAIL_DATA', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
