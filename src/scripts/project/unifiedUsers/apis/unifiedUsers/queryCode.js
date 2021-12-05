import { $req } from '../../../utils';
// import { $mornAxios } from '@/utils/';
const BASE_URL = process.env.API_BASE_URL;
const API_OS_URL = process.env.API_OS_URL;
export default {
  //发送邮箱验证码
  getsendEmailVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/sendEmailVerifyCode', {
        "email": obj.account
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //发送邮箱验证码-不校验用户
  getsendEmailVCNoUser(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/sendEmailVCNoUser', {
        "email": obj.account
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //验证邮箱验证码
  getvalidEmailVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/validEmailVerifyCode', {
        "email": obj.email,
        "tag": '',
        "verifyCode": obj.verifyCode
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取手机验证码
  getValidMobileVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/account/resetPwdRequest', {
        "account": obj.account,
        "type": obj.type
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },

  // 验证手机验证码
  getTestMobileVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/account/doResetPwd', {
        "account": obj.account,
        "code": obj.code,
        "newPwd": obj.newPwd,
        "newPwd2": obj.newPwd2,
        "type": obj.type,
        "loginAccount": obj.loginAccount
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取手机验证码
  sendVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/sendVerifyCode', {
        "toUser": obj.toUser,
        "type": obj.type
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 验证手机验证码
  validVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/validVerifyCode', {
        "toUser": obj.toUser,
        "verifyCode": obj.verifyCode
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //获取图像验证码
  getImgCode(obj) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/openapi/common/verify').then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //验证图像验证码
  getCheckImgCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/verifyCheck', {
        "verifyCode": obj.verifyCode,
        "verifyUUID": obj.verifyUUID
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //验证图像验证码&账号
  getCheckImgCodeAccount(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/verifyCheckAndAcct', {
        "verifyCode": obj.verifyCode,
        "verifyUUID": obj.verifyUUID,
        "mobile": obj.mobile,
        "email": obj.email,
        "account": obj.account
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  //验证手机验证码（新）
  getMobileVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/validMobileVerifyCode', {
        "verifyCode": obj.verifyCode,
        "mobile": obj.mobile
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 获取企业信息
  getCompanyInfoOuterTwo(obj) {
    return new Promise((resolve, reject) => {
      $req.get(API_OS_URL + '/efOS/efOsCompanyInfo/getCompanyInfoOuterTwo?param=' + obj).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};

