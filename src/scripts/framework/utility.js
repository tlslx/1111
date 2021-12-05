var utility = {
  operationType: { add: 'ADD', edit: 'EDIT', delete: 'DEL', normal: 'NONE' },
  isJson: function (obj) {
    var isjson = typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]' && !obj.length;
    return isjson;
  },
  urlEncode: function (str) {
    let temp = str;
    temp = (temp + '').toString();
    return encodeURIComponent(temp).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  genServiceUrl: function (baseUrl, serviceUrl) {
    if (this.isEmpty(serviceUrl) || this.isEmpty(baseUrl)) {
      return serviceUrl;
    }
    if (serviceUrl.indexOf('http') === 0 || serviceUrl.indexOf('https') === 0) {
      return serviceUrl;
    }
    return baseUrl + serviceUrl;
  },
  getUrl: function (url, params, addRandom) {
    var strParams = '';
    if (params != null && utility.isJson(params)) {
      for (let key in params) {
        if (!String.isNullOrEmpty(strParams)) {
          strParams += '&' + key + '=' + utility.urlEncode(params[key]);
        } else {
          strParams = key + '=' + utility.urlEncode(params[key]);
        }
      }
    }

    if (addRandom !== false) {
      if (!String.isNullOrEmpty(strParams)) {
        strParams += '&r=' + (new Date()).getTime();
      } else {
        strParams += 'r=' + (new Date()).getTime();
      }
    }

    if (!String.isNullOrEmpty(strParams)) {
      if (url.indexOf('?') > -1) {
        return url + '&' + strParams;
      } else {
        return url + '?' + strParams;
      }
    } else {
      return url;
    }
  },
  newGuid: function () {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
  },
  isFunction(fn) {
    return typeof fn !== 'undefined' && typeof fn === 'function';
  },
  getFieldTypeComponent(fieldType) {
    switch (fieldType) {
      case 'select':
        return 'ElDropdownList';
      case 'date':
        return 'ElDatePicker';
      case 'radio':
        return 'ElRadioList';
      case 'checkbox':
        return 'ElCheckboxList';
      case 'text':
      case 'textarea':
      default:
        return 'ElInput';
    }
  },
  getFieldTypeFind(fieldType) {
    switch (fieldType) {
      case 'select':
        return 'EQ';
      case 'date':
        return 'EQ';
      case 'radio':
        return 'EQ';
      case 'checkbox':
        return 'EQ';
      case 'text':
      case 'textarea':
      default:
        return 'LIKE';
    }
  },
  getCookie(name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    var arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  removeClass($el, name) {
    if ($el.className.indexOf(name) > -1) {
      let className = $el.className.split(' ');
      for (let i = 0, len = className.length; i < len; i++) {
        if (className[i] === name) {
          className.splice(i, 1);
        }
      }
      $el.className = className.join(' ');
    }
  },
  addClass($el, name) {
    if ($el.className.indexOf(name) === -1) {
      $el.className += ' ' + name;
    }
  },
  getUrlParam(paraName) {
    let url = document.location.toString();
    url = decodeURIComponent(url);
    url = this.escape2Html(url);
    let arrObj = url.split("?");
    if (arrObj.length > 1) {
      let index = 1;
      if (arrObj.length > 2) {
        index = arrObj.length - 1;
      }
      let arrPara = arrObj[index].split("&");
      let arr;
      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] === paraName) {
          return arr[1];
        }
      }
      return "";
    } else {
      return "";
    }
  },
  html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g, function (c) { 
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; 
    });
  },
  escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { 
      return arrEntities[t]; 
    });
  },
  isEmpty(obj) {
    // 本身为空直接返回true
    if (obj == null) {
      return true;
    }

    // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
    if (obj.length > 0) {
      return false;
    }
    if (obj.length === 0) {
      return true;
    }

    // 最后通过属性长度判断。
    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  },
  isNotEmpty(obj) {
    return this.isEmpty(obj) === false;
  },
  isContains(array, obj, separator) {
    if (this.isEmpty(array) || this.isEmpty(obj)) {
      return false;
    }
    if (this.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        // console.info(array[i] === obj, array[i], obj)
        if (array[i] === obj) {
          return true;
        }
      }
      return false;
    } else if (!this.isArray(array)) {
      if (this.isEmpty(separator)) {
        return array.indexOf(obj) >= 0;
      } else {
        let arr = array.split(separator);
        return this.isContains(arr, obj);
      }
    }
  },
  isNotContains(array, obj, separator) {
    return this.isContains(array, obj, separator) === false;
  },
  isArray(obj) {
    if (obj instanceof Array) { 
      return true;
    } else { 
      return false; 
    }
  },
  isInArray(array, value) {
    if (this.indexArray(array, value) !== -1) {
      return true;
    }
    return false;
  },
  indexArray(array, value) {
    var index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        index = i;
      }
    }
    return index;
  },
  removeArrayItem(array, value) {
    var index = this.indexArray(array, value);
    if (index !== -1) {
      array.splice(index, 1);
    }
  },
  DateFormat(date, format) {
    let _format = format;
    if (date == null || typeof date === 'undefined') {
      return null;
    }
    let o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(_format)) {
      _format = _format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(_format)) {
        _format = _format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return _format;
  },
  formatDate(date) {
    return this.DateFormat(date, "yyyy-MM-dd");
  },
  formatTime(date) {
    return this.DateFormat(date, "yyyy-MM-dd hh:mm:ss");
  },
  /* 获取指定颜色的更亮颜色或是更暗颜色
  // Lighten
  var NewColor = LightenDarkenColor("#F06D06", 20)
  // Darken
  var NewColor = LightenDarkenColor("#F06D06", -20)
  */
  colorLightenDarken(col, amt) {
    var usePound = false;
    let _col = col;
    if (col[0] === "#") {
      _col = _col.slice(1);
      usePound = true;
    }
    let num = parseInt(_col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    let g = (num & 0x0000FF) + amt;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  },
  isHttp(url) {
    if (this.isEmpty(url)) {
      return false;
    } else if (url.indexOf("http://") === 0 
    || url.indexOf("https://") === 0) {
      return true;
    } else {
      return false;
    }
  }
};

export default utility;
