import axios from 'axios';
import JSONP from 'jsonp';
import { Message } from 'element-ui';
import store from '@/scripts/framework/store/';
import utility from '@/scripts/framework/utility';
import '@/scripts/framework/prototype';
const qs = require('qs');
const mornAxios = axios.create({
  baseURL: process.env.API_BASE_URL
  // transformResponse: [function(data) {
  //   // data.flag = 666;
  //   //   this.temp = JSON.stringify(this.dictionary);
  //   //   this.temp = JSON.parse(this.temp);
  //   let olddata = JSON.parse(data);
  //   console.log(olddata.flag);
  //   let newdata = {
  //     type: olddata.flag,
  //     error: olddata.errorCode,
  //     success: olddata.message,
  //     data: olddata.data
  //   };
  //   console.log(newdata);
  //   let asdata = JSON.stringify(newdata);
  //   console.log(asdata);
  //   return asdata;
  // }]
  // transformRequest: [function (data) {
  //   // 对 data 进行任意转换处理,用于post
  //   console.log(data);
  //   return data;
  // }]
  // timeout: 10000
});
mornAxios.interceptors.request.use(
  config => {
    if (store.getters.token) { // 判断是否存在token，如果存在的话，则每个mornAxios header都加上token
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
// 状态码错误信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: 'Web 服务器找不到您所请求的文件或脚本。请检查URL以确保路径正确。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

export default {
  get(url, params = {}) {
    return new Promise(function (resolve, reject) {
      mornAxios.get(url, {
        params: Object.assign(params, { r: (new Date()).getTime() })
      }).then((response) => {
        handleResponse(response, resolve, reject);
      }).catch((error) => {

          // 请求配置发生的错误
        if (!error.response) {
          return console.log('Error', error.message);
        }

        // 响应时状态码处理 
        const status = error.response.status;
        const errortext = codeMessage[status] || error.response.statusText;
        // notification.error({
        //   message: `请求错误 ${status}`,
        //   description: errortext,
        // });
        Message.error(errortext);
        reject(errortext);
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
      mornAxios.get(_url).then((response) => {
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
      mornAxios.get(_url, { responseType: 'arraybuffer' }).then((response) => {
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
      mornAxios({
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
      mornAxios({
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
