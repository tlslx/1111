/*
 * updated by zhangwenqi
 * -------------------------------------------------
 * 工具类:
 * 提供 string 处理, date 处理, 常用方法处理
 * -------------------------------------------------
 * getLanguage   : 获取国际化语言
 * closeWin      : 关闭当前窗口
 * queryUrlParam : 获取 url 参数
 * notify        : 系统 notify 提示
 * alert         : 系统 alert 提示
 * confirm       : 系统 confirm 提示
 * promise       : 系统 promise 简单封装
 * setUri        : 统一 uri
 * exportUrl     : 拼接导出的url
 * toTree        : 数组对象转化 tree 结构
 * formatNum     : 格式化数字
 * formatDate    : 格式化日期
 * formatTime    : 格式化时间
 * toPercent     : 将数字转化指定单位的字符串
 * downloadFile  : 下载文件
 */

/*
 * 工具类常用方法实现
 */
import axios from 'axios';
import { saveAs } from 'file-saver';

let util = {
  /**
   * 获取国际化语言
   * @name   string  : 参数名称
   * ex: kindo.util.getLanguage('name')
   */

  getLanguage(name) {
    try {
      let langtype = kindo.cache.get('language');
      if (langtype) {
        return kindo['lang' + langtype][name];
      } else {
        kindo.cache.set('language', kindo.config.language, 'local');
        return kindo['lang' + kindo.config.language][name];
      }
    } catch (e) {
      kindo.cache.set('language', 'zh', 'local');
      return kindo['langzh'][name];
    }
  },

  /**
   * 关闭当前tab窗口
   * ex: kindo.util.closeWin()
   */

  closeWin() {
    window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();
  },

    /**
   * 打开当前tab窗口
   * ex: kindo.util.closeWin()
   */

  clickWin() {
    window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].click();
  },

  /**
   * 获取 url 参数
   * @name   string  : 参数名称
   * @url    string  : 原始资源地址
   * ex: kindo.util.queryUrlParam('name')
   */

  queryUrlParam(name, url) {
    let newname = name;
    let newurl = url;
    if (!newurl) {
      newurl = window.location.href;
    }
    newname = newname.replace(/[[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + newname + '(=([^&#]*)|&|#|$)');
    let results = regex.exec(newurl);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  /**
   * ex: kindo.util.notify('提示', '提示', 'error')
   */

  notify: (msg = '提示', title = '提示', type = 'success') => {
    kindo.$bus.$emit('notify', msg, title, type);
  },

  /**
   * ex: kindo.util.alert('提示', '提示', 'error')
   */

  alert: (msg = '提示', title = '提示', type = 'success') => {
    kindo.$bus.$emit('message', msg, title, type);
  },

  /**
   * ex: kindo.util.confirm('提示', '提示', 'error', ()=>{}, ()=>{})
   */

  confirm: (msg = '提示', title = '提示', type = 'info', successCallBack = () => {}, errorCallBack = () => {}) => {
    kindo.$bus.$emit('confirm', msg, title, type, successCallBack, errorCallBack);
  },

  /**
   * promise 对象简单实现
   * ex: kindo.util.promise().then().then() ...
   */

  promise: (fn = () => {}, timeout = 0) => {
    setTimeout(fn, timeout);

    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, timeout);
    });
  },

  /*
   * 统一请求资源
   * xxxxSYS/xx/get
   * 给请求资源加上配置的动态资源, 默认以 xxxxSYS 为匹配资源地址
   * 当 uri 为 url 或者 .json后缀时, 则忽略
   * @strUri   string  : 原始资源地址
   * @type     string  : 匹配资源地址
   * ex                : kindo.util.setUri('api', 'webUrl') => kindo.const.URI.webUrl + 'api'
   */

  setUri: (strUri, type) => {
    if (kindo.validate.url(strUri) || strUri.substr(strUri.indexOf('.')) === '.json') {
      return strUri;
    }

    let uriType = type || strUri.split('/')[0];
    let uriPath = kindo.config[uriType] || '';
    return uriPath + strUri;
  },

  /**
   * 拼接导出的url
   * @baseUrl   string    :   需要拼接的 url
   * @paramsObj {}        :   url 参数
   * @token     bool      :   是否传递 token
   * ex: kindo.util.exportUrl(baseUrl, paramsObj, false)
   * ex: kindo.util.exportUrl(baseUrl, paramsObj, true)
   */

  exportUrl: (baseUrl, paramsObj, token = false) => {
    let temp = Object.assign({}, paramsObj);
    let paras = '';
    let idx = 0;
    for (let o in temp) {
      paras += (idx === 0 ? '?' : '&') + o + '=' + (temp[o] || '');
      if (idx === 0) {
        idx = 1;
      }
    }
    if (token) {
      return kindo.util.setUri(baseUrl) + paras + '&token=' + kindo.cache.get(kindo.constant.USER_TOKEN, 'session');
    } else {
      return kindo.util.setUri(baseUrl) + paras;
    }
  },

  /*
   * 数组对象转化 tree 结构
   * @nodes   [{}]          :   数据对象
   * @idKey   string        :   唯一键
   * @pIdKey  string        :   父项唯一键
   * @childrenKey  string   :   children key
   * ex                     :   kindo.util.toTree([]) => []
   */

  toTree: (nodes, idKey = 'id', pIdKey = 'pId', childrenKey = 'children') => {
    let map = {};
    let node;
    let roots = [];

    nodes.forEach((item, index) => {
      map[item[idKey]] = index;
    });
    for (let i = 0; i < nodes.length; i += 1) {
      node = nodes[i];
      if (node[pIdKey] !== '-1' && node[pIdKey] !== '' && nodes[map[node[pIdKey]]]) {
        if (!nodes[map[node[pIdKey]]][childrenKey]) {
          nodes[map[node[pIdKey]]][childrenKey] = [];
          nodes[map[node[pIdKey]]][childrenKey].push(node);
        } else {
          nodes[map[node[pIdKey]]][childrenKey].push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return roots;
  },

  /**
   * 数字格式化
   * @num : 数字字符串
   * @precision : 精确小数位数
   * @separator : 分隔符
   * return : 格式化后的数字字符串
   * ex: kindo.util.formatNumber(10000) => "10, 000"
   *     kindo.util.formatNumber(10000, 2) => "10, 000.00"
   *     kindo.util.formatNumber(.123456, 2, ' ') => "0.12"
   *     kindo.util.formatNumber(56., 0, ' ') => "56"
   *     kindo.util.formatNumber('56.a') => 56.a
   */

  formatNum: (num, precision, separator) => {
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      let parts;
      let newnum;
      newnum = Number(num);
      newnum = (typeof precision !== 'undefined' ? newnum.toFixed(precision) : newnum).toString();
      parts = newnum.split('.');
      parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ', '));
      return parts.join('.');
    }
    return num;
  },

  /**
   * 格式化日期对象
   * @date  any : 可转换为 Date 类型的任意参数
   * @format  string  : 格式化字符串
   * return string  : 格式化后的日期字符串
   * ex : kindo.util.formatDate(new Date()) =>  '2016-01-10'
   */

  formatDate: (date, format = 'yyyy-MM-dd') => {
    let formatdate = format;
    if (kindo.validate.isEmpty(date)) {
      return;
    }
    if (typeof formatdate !== 'string') {
      formatdate = 'yyyy-MM-dd';
    }

    if (date instanceof Date) {
      return date.formatDate(formatdate);
    } else {
      return date.toDate().formatDate(formatdate);
    }
  },

  /**
   * 格式化时间对象
   * @date  any : 可转换为 Date 类型的任意参数
   * @format  string  : 格式化字符串
   * return string  : 格式化后的时间字符串
   * ex : kindo.util.formatTime(new Date()) =>  '2016-01-10 21:01:01'
   */

  formatTime: (date, format = 'yyyy-MM-dd HH:mm:ss') => {
    return kindo.util.formatDate(date, format);
  },

  /**
   * 数字格式化
   * @num     any           :   可转换 float 的字符串或小数
   * @fixed   number        :   保留的小数位数
   * @symbol  string        :   单位
   * ex: kindo.util.toPercent(2.3333) => 2.33
   * ex: kindo.util.toPercent(0.3333, 2, '%') => 33.33%
   */

  toPercent: (num, fixed = 2, symbol = null) => {
    let parseNum = parseFloat(num);
    let returnStr = '';
    if (parseNum.toString() === '0') {
      returnStr = parseNum.toFixed(fixed);
    } else if (parseNum) {
      if (parseNum > 1) {
        returnStr = parseNum.toFixed(fixed);
      } else {
        returnStr = (parseNum * 100).toFixed(fixed);
      }
    } else {
      returnStr = '--';
    }
    if (returnStr === '--') {
      return '--';
    } else {
      if (symbol) {
        return returnStr + symbol.toString();
      }
      if (!symbol) {
        return returnStr;
      }
    }
  },

  /**
   * 跨页面跳转（菜单必须有）
   * @url  string        :   链接地址
   */

  jumpTo: (url) => {
    if (url) {
      let x = window.parent.document.getElementsByClassName("el-menu-item");
      for (let i = 0; i < x.length; i++) {
        if (x[i].getAttribute('path') === url) {
          if (x[i].parentNode.parentNode.previousSibling) {
            x[i].parentNode.parentNode.previousSibling.click();
          }
          x[i].click();
        }
      }
    } else {
      window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].click();
    }
  },

  /**
   * 下载文件
   *
   * @export
   * @param {*} [param={}]
   * @param {string} [type='']
   */

  downloadFile(rowdata, type = '') {
    const qs = require('qs');
    let downloadPath = "";
    let downonePath = kindo.config.api.upms + "/api/fs/download/";
    let downmorePath = `${kindo.config.api.upms + "/api/fs/downloads"}?`;
    if (rowdata instanceof Array) {
      let dwgFileIds = [];
      let pdfFileIds = [];
      let svgFileIds = [];
      let pngFileIds = [];
      rowdata.forEach(el => {
        dwgFileIds.push(el.dwgFileId);
        pdfFileIds.push(el.pdfFileId);
        svgFileIds.push(el.svgFileId);
        pngFileIds.push(el.pngFileId);
      });
      type === "dwg" ? downloadPath = downmorePath + `${qs.stringify({ ids: dwgFileIds.join(',') })}` : type === "pdf" ? downloadPath = downmorePath + `${qs.stringify({ ids: pdfFileIds.join(',') })}` : type === "png" ? downloadPath = downmorePath + `${qs.stringify({ ids: pngFileIds.join(',') })}` : downloadPath = downmorePath + `${qs.stringify({ ids: svgFileIds.join(',') })}`;
      this.getdown(downloadPath + '&gridBucket=BOOTH_CAD');
    } else {
      type === "dwg" ? downloadPath = downonePath + rowdata.dwgFileId : type === "pdf" ? downloadPath = downonePath + rowdata.pdfFileId : type === "png" ? downloadPath = downonePath + rowdata.pngFileId : downloadPath = downonePath + rowdata.svgFileId;
      this.getdown(downloadPath + '?gridBucket=BOOTH_CAD');
    }
    // window.open(downloadPath, "_blank");
    // window.location.href = downloadPath;
    // this.getdown(downonePath + '5c98b97a4cedfd000103d83b');
  },
  getdown(downPath, fname) {
    const axiosInstance = axios.create({
      responseType: 'blob',
      headers: { 'token': localStorage.getItem("USER_TOKEN") }
    });

    axiosInstance({
      url: downPath,
      method: 'get'
      // headers: { 'Token': localStorage.getItem("USER_TOKEN") },
      // responseType: 'blob'
    }).then(res => {
      if (res) {
        // console.log("fanhui", res);
        let fileName = fname;
        if (!fname) {
          if (res.headers['content-disposition']) {
            fileName = decodeURIComponent(res.headers['content-disposition'].split('filename=')[1]);
          } else {
            fileName = this.formatTime(new Date(), "yyyyMMddHHmmss") + '.zip';
          }
        }
        // let url = window.URL.createObjectURL(res.data);
        // let link = document.createElement('a');
        // link.style.display = 'none';
        // link.href = url;
        // link.setAttribute('download', fileName);
        // document.body.appendChild(link);
        // link.click();
        saveAs(res.data, fileName);
      }
    }).catch((result) => {
      if (result.response) {
        if (result.response.status === 401) {
          result.message = result.response.data.message;
          kindo.util.alert('401错误,请联系管理员', '401', 'warning');
        } else {
          result.message = result.response.data.message;
          kindo.util.alert('下载失败,请联系管理员', '404', 'error');
        }
      } else {
        result.message = '服务器错误,请联系管理员';
      }
    });
  },
  download(fileId) {
    const downloadPath = kindo.config.api.upms + "/api/fs/download/" + fileId;
    // window.open(downloadPath, "_blank");
    this.getdown(downloadPath);
  },
  downloads(fileIds = {}) {
    const qs = require('qs');
    const fileIdStr = fileIds.join(',');
    const param = { ids: fileIdStr };
    const downloadPath = `${kindo.config.api.upms + "/api/fs/downloads"}?${qs.stringify(param, { arrayFormat: 'repeat' })}`;
    this.getdown(downloadPath);
    // window.open(downloadPath, "_blank");
  },
  checkuserAgent() {
    const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    //判断是否Opera浏览器
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    if (userAgent.indexOf("Opera") > -1) {
      return "Opera";
    } else if (userAgent.indexOf("Firefox") > -1) {
      return "FF";
    } else if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
      return "IE";
    } else {
      return "IE";
    }
  }
};

export default util;
