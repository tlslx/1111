import { $req } from '../../../utils';
const BASE_URL = process.env.API_BASE_URL;
export default {
  // 查询账号信息
  getQueryUserInfo(obj) {
    return new Promise((resolve, reject) => {
      $req.get(BASE_URL + '/openapi/common/account/get', {
        "id": obj.id
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发送手机验证码
  getSendMobileVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/sendMobileVerifyCode', {
        "mobile": obj.mobile
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 发送手机验证码-不校验用户
  getSendMobileCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/sendMobileCode', {
        "mobile": obj.mobile
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 验证手机验证码
  getValidMobileVerifyCode(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/validMobileVerifyCode', {
        "mobile": obj.mobile,
        "verifyCode": obj.verifyCode 
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  },
  // 修改邮箱
  getUpdateEmail(obj) {
    return new Promise((resolve, reject) => {
      $req.post(BASE_URL + '/openapi/common/account/update', {
        "userId": obj.userId,
        "email": obj.email
      }).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      });
    });
  }

};

