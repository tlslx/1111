import { findPwdApi } from '../../../apis';
import utility from '@/scripts/framework/utility';
export default {
  namespaced: true,
  state: {
    validMobileVerifyCode: [],
    testMobileVerifyCode: [],
    testVerifyCodeImg: [],
    testCheckVerifyCodeImg: [],
    sendEmailVerifyCode: [],
    testEmailVerifyCode: [],
    checkMobileCode: []
  },
  getters: {
    //查询手机验证码
    validMobileVerifyCode: state => state.validMobileVerifyCode,
    //验证手机验证码
    testMobileVerifyCode: state => state.testMobileVerifyCode,
    //获取图像验证码
    testVerifyCodeImg: state => state.testVerifyCodeImg,
    //验证图像验证码
    testCheckVerifyCodeImg: state => state.testCheckVerifyCodeImg,
    //发送邮箱验证码
    sendEmailVerifyCode: state => state.sendEmailVerifyCode,
    //验证邮箱验证码
    testEmailVerifyCode: state => state.testEmailVerifyCode,
    //验证手机验证码(新)
    checkMobileCode: state => state.checkMobileCode

  },
  mutations: {
    VALID_MOBILE_CODE(state, payload) {
      state.validMobileVerifyCode = payload;
    },
    TEST_MOBILE_CODE(state, payload) {
      state.testMobileVerifyCode = payload;
    },
    TEST_IMG_CODE(state, payload) {
      state.testVerifyCodeImg = payload;
    },
    CHECK_IMG_CODE(state, payload) {
      state.testCheckVerifyCodeImg = payload;
    },
    SEND_EMAIL_CODE(state, payload) {
      state.sendEmailVerifyCode = payload;
    },
    TEST_EMAIL_CODE(state, payload) {
      state.testEmailVerifyCode = payload;
    },
    CHECK_MOBILE_CODE(state, payload) {
      state.checkMobileCode = payload;
    },
    GET_COMPANY_INFO(state, payload) {
      state.getCompanyInfo = payload;
    },
    SEND_VERIFY_CODE(state, payload) {
      state.sendVerifyCode = payload;
    },
    VALID_VERIFY_CODE(state, payload) {
      state.validVerifyCode = payload;
    }

  },
  actions: {
    // 发送邮箱验证码
    getsendEmailVerifyCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getsendEmailVerifyCode(obj).then(res => {
          commit('SEND_EMAIL_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 发送邮箱验证码-不校验用户
    getsendEmailVCNoUser({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getsendEmailVCNoUser(obj).then(res => {
          commit('SEND_EMAIL_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //验证邮箱验证码
    getvalidEmailVerifyCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getvalidEmailVerifyCode(obj).then(res => {
          commit('TEST_EMAIL_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询手机验证码
    getvalidMobileVerifyCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getValidMobileVerifyCode(obj).then(res => {
          commit('VALID_MOBILE_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 验证手机验证码
    getTestVerifyCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getTestMobileVerifyCode(obj).then(res => {
          commit('TEST_MOBILE_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询手机验证码
    sendVerifyCodeInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.sendVerifyCode(obj).then(res => {
          commit('SEND_VERIFY_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 验证手机验证码
    validVerifyCodeInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.validVerifyCode(obj).then(res => {
          commit('VALID_VERIFY_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取图像验证码
    getverifyCodeImg({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getImgCode(obj).then(res => {
          commit('TEST_IMG_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 验证图像验证码
    getCheckVerifyCodeImg({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getCheckImgCode(obj).then(res => {
          commit('CHECK_IMG_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 验证图像验证码&账号
    getCheckVerifyCodeAccountImg({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getCheckImgCodeAccount(obj).then(res => {
          commit('CHECK_IMG_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
     // 验证手机验证码（新）
    getcheckMobileVerifyCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getMobileVerifyCode(obj).then(res => {
          commit('CHECK_MOBILE_CODE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 获取企业信息
    getCompanyInfoOuterTwoInfo({ commit }, obj) {
      return new Promise((resolve, reject) => {
        findPwdApi.getCompanyInfoOuterTwo(utility.urlEncode(JSON.stringify(obj))).then(res => {
          commit('GET_COMPANY_INFO', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
