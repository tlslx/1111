import axios from 'axios';
import JSONP from 'jsonp';
import { Message } from 'element-ui';
import store from './store/';
import utility from './utility';
import './prototype';
const qs = require('qs');
const http = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 60000
});
http.interceptors.request.use(
  config => {
    if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['Token'] = store.getters.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// 新增错误拦截器
http.interceptors.response.use(
  response => {
    const code = response.status;
    if (code === 200 || code === '200') {
      return response.data;
    } else {
      switch (code) {
        case 731:
          kindo.util.alert(response.data.message, code, 'warning');
          break;
        case 753:
          kindo.util.alert(response.data.message, code, 'warning');
          break;
        case 740:
          kindo.util.alert('不能添加重复数据', code, 'warning');
          break;
        case 792:
          kindo.util.alert('关联子表还有已审核数据，不能删除', code, 'warning');
          break;
        default:
          kindo.util.alert(response.data.message || '未知错误', code, 'warning');
          break;
      }
      return Promise.reject(response.data);
    }
  },
  error => {
    if (error.response) {
      // console.log(error.response);
      if (error.response.status === 401) {
        error.message = error.response.data.message;
        // 401错误时候直接退出
        kindo.cache.remove(kindo.constant.USER_TOKEN);
        location.href = '/';
        kindo.util.alert('401错误,请联系管理员', '401', 'warning');
      } else {
        error.message = error.response.data.message;
        kindo.util.alert('404错误,请联系管理员', '404', 'error');
      }
    } else {
      error.message = '服务器错误,请联系管理员';
    }
    return Promise.reject(error);
  }
);

let handleResponse = (response, resolve, reject) => {
  let data = ((typeof response.data === 'undefined' || response.data == null) ? response : response.data);
  if (typeof data.flag === 'undefined') {
    resolve(data);
  } else if (data.flag === '1') {
    resolve(data.data);
  } else {
    Message.error(data.message);
    reject(data.message);
  }
};

export default {
  get(url, params = {}) {
    return new Promise(function (resolve, reject) {
      http.get(url, {
        params: Object.assign(params, { r: (new Date()).getTime() })
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  postJson(url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'POST',
        url: url,
        data: data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  put(url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'PUT',
        url: url,
        data: data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  putFile(url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'PUT',
        url: url,
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  post(url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'POST',
        url: url,
        data: qs.stringify(data),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  postFormData(url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'post',
        url: url,
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  jsonp(url, params = {}) {
    let _url = url;
    _url = utility.getUrl(_url, params, true);
    return new Promise((resolve, reject) => {
      JSONP(_url, {
        param: 'jsonp_callback',
        name: 'jsonp_callback' + (new Date()).getTime()
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          handleResponse(result, resolve, reject);
        }
      });
    });
  }
};
