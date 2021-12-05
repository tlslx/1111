import axios from 'axios';
import JSONP from 'jsonp';
import { Message } from 'element-ui';
import store from '@/scripts/framework/store/';
import utility from '@/scripts/framework/utility';
import '@/scripts/framework/prototype';
const qs = require('qs');
const http = axios.create({
  baseURL: process.env.API_BASE_URL
  // timeout: 10000
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
let handleResponse = (response, resolve, reject) => {
  let data = response.data === undefined ? response : response.data;
  if (data.flag === undefined) {
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
  // get方法拼字符串
  getParams(url, params = {}) {
    let _params = params;
    let _dataArr = [];
    for (let key in _params) {
      _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
    }
    let _url = url + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
    return new Promise(function (resolve, reject) {
      http.get(_url).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },
  // get下载
  getDownload(url, params = {}) {
    let _params = params;
    let _dataArr = [];
    for (let key in _params) {
      _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_params[key]));
    }
    let _url = url + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : "");
    return new Promise(function (resolve, reject) {
      http.get(_url, { responseType: 'arraybuffer' }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((result) => {
        Message.error(result.message);
        reject(result.message);
      });
    });
  },


  // custGet(contextName, url, data, headers) {
  //   let _data = data || {};
  //   let _headers = Object.assign({
  //     "Accept": "application/json",
  //   }, headers);
  //   // get方法拼字符串
  //   let _dataArr = [];
  //   for (let key in _data) {
  //     _dataArr.push(encodeURIComponent(key) + "=" + encodeURIComponent(_data[key]));
  //   }
  //   // 参数拼接在url后面
  //   return axios({
  //     method: "get",
  //     url: contextName + url + (_dataArr.length > 0 ? ("?" + _dataArr.join("&")) : ""),
  //     headers: _headers,
  //     data: _data,
  //     withCredentials: true // 默认的
  //   });
  // },
  // getParams(url, data, headers) {
  //   return this.custGet(global.CONTEXT_NAME, url, data, headers);
  // },

  postJson(url, data = {}) {
    return new Promise(function (resolve, reject) {
      http({
        method: 'POST',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
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
