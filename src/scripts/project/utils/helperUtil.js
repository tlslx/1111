export default {
  // 过滤数据 过滤成select--option需要的数据格式
  filterDataToSelect(arr, val, lab) {
    let queryArr = [];
    for (let i = 0; i < arr.length; i++) {
      let queryData = {};
      queryData.value = arr[i][val];
      queryData.label = arr[i][lab];
      queryArr.push(queryData);
    }
    // 数组对象去重
    let queryObj = {};
    const queryArray = queryArr.reduceRight((item, next) => {
      queryObj[next.value] ? '' : queryObj[next.value] = true && item.push(next);
      return item;
    }, []);
    return queryArray.reverse();
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} targetArray 后台返回的是code数组
   */
  // getDicText(dicArray, targetArray) {
  //   let str = '';
  //   for (let i = 0; i < targetArray.length; i++) {
  //     for (let j = 0; j < dicArray.length; j++) {
  //       if (dicArray[j].value === targetArray[i]) {
  //         str += i === (targetArray.length - 1) ? dicArray[j].text : dicArray[j].text + ',';
  //       }
  //     }
  //   }
  //   return str;
  // },
  trim(val) {
    if (typeof val === "object") {
      let tmp = {};
      for (const key in val) {
        if (typeof val[key] === "string") {
          tmp[key] = val[key].replace(/(^\s*)|(\s*$)/g, "");
        } else {
          tmp[key] = val[key];
        }
      }
      return tmp;
    } else if (typeof val === "string") {
      return val ? val.replace(/(^\s*)|(\s*$)/g, "") : val;
    } else {
      return val;
    }
  },
  checkPassword(value) {
    let result = {
      msg: "",
      ok: true
    };
    const isSafe = function(val) {
      const hasNum = /\d/.test(val);
      const hasUpCase = /[A-Z]/.test(val);
      const hasLowCase = /[a-z]/.test(val);
      const hasSpecChar = /[\~\!\@\#\$\%\^\&\*\(\)_\+\`\-\{\}\|\:\"\<\>\?\[\]\;\'\,\.\/\=\\\s]/.test(val);
      let count = 0;
      count = count + (hasNum ? 1 : 0);
      count = count + (hasUpCase ? 1 : 0);
      count = count + (hasLowCase ? 1 : 0);
      count = count + (hasSpecChar ? 1 : 0);
      return count >= 3;
    };
    if (value.length < 8) {
      result.msg = "密码长度过短（8-20位，且必须包含1位字母、1位数字及1位特殊符号）";
      result.ok = false;
    } else if (value.length > 20) {
      result.msg = "密码长度过长（8-20位，且必须包含1位字母、1位数字及1位特殊符号）";
      result.ok = false;
    } else if (!isSafe(value)) {
      result.msg = "密码安全性低（8-20位，且必须包含1位字母、1位数字及1位特殊符号）";
      result.ok = false;
    } else if (/[\u4e00-\u9fa5\uFF00-\uFFFF]/.test(value)) {
      result.msg = "不能包含中文或全角字符";
      result.ok = false;
    }
    return result;
  },
  buildPagerDataReqParam(params) {
    let condition = null;
    let page = 1;
    let rp = window.PAGE_SIZE;
    if (params) {
      page = params.page ? params.page : 1;
      rp = params.rp ? params.rp : global.PAGE_SIZE;
      if (params.condition) {
        condition = this.trim(params.condition);
      }
    }
    return { condition, page, rp };
  },
  buildPageDataInfo(resData, dataList) {
    let totalNum = 0;
    let curPage = 1;
    let perPage = window.PAGE_SIZE;
    let data = [];
    if (resData) {
      totalNum = resData.total;
      curPage = resData.page;
    }
    if (dataList) {
      data = dataList;
    }
    return {
      pageInfo: {
        totalNum: totalNum,
        curPage: curPage,
        perPage: perPage
      },
      data: data
    };
  },
  url2Blob(dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  downloadBlob(base64Uri, downloadName) {
    if (navigator.userAgent.indexOf("Trident") > -1) {
      window.navigator.msSaveBlob(
        this.url2Blob(base64Uri),
        downloadName);
    } else if (navigator.userAgent.indexOf("Firefox") > -1) {
      window.open(base64Uri);
    } else {
      let outputLink = document.createElement('a');
      outputLink.download = downloadName;
      outputLink.href = base64Uri;
      outputLink.click();
    }
  },
  /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
  numberFormat(_number, decimals, decPoint, thousandsSep) {

    let number = (_number + '').replace(/[^0-9+-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number;
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
    let s = '';
    let toFixedFix = function (_n, _prec) {
      let k = Math.pow(10, _prec);
      return '' + Math.ceil(_n * k) / k;
    };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    let re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  },
  // 数组比较
  mergeObjArr(arr1, arr2, _byKey) {
    let byKey = _byKey;
    if (!byKey) {
      byKey = "name";
    }
    let result = arr1.map((val, index, arr) => val);
    let keyCache = arr1.map((val) => val[byKey]);
    result = arr2.reduce((pre, val, index, arr) => {
      let temp = pre;
      if (keyCache.indexOf(val[byKey]) === -1) {
        temp.push(val);
      }
      return temp;
    }, result);
    return result;
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} dicCode 字典指定code码
   */
  getDicLabel(dicArray, dicCode) {
    let label = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].code === dicCode) {
        label = dicArray[i].label;
      }
    }
    return label;
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} dicValue 字典指定code码
   */
  getDicText(dicArray, dicValue) {
    let text = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].value === dicValue) {
        text = dicArray[i].text;
      }
    }
    return text;
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} targetArray 后台返回的是code数组
   */
  getDicTextInfo(dicArray, targetArray) {
    let str = '';
    for (let i = 0; i < targetArray.length; i++) {
      for (let j = 0; j < dicArray.length; j++) {
        if (dicArray[j].value === targetArray[i]) {
          str += i === (targetArray.length - 1) ? dicArray[j].text : dicArray[j].text + ',';
        }
      }
    }
    return str;
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} targetArray 后台返回的是code数组
   * 支撑性用来返回已使用的标签数组方法
   */
  getArrayInfo(dicArray, targetArray) {
    let arr = [];
    for (let i = 0; i < targetArray.length; i++) {
      for (let j = 0; j < dicArray.length; j++) {
        if (dicArray[j].value === targetArray[i]) {
          arr.push({
            label: dicArray[j].label,
            value: dicArray[j].value
          });
        }
      }
    }
    return arr;
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} dicText 字典指定文本
   */
  getDicValue(dicArray, dicText) {
    let value = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].text === dicText) {
        value = dicArray[i].value;
      }
    }
    return value;
  },
  /*
   *
   * @param {*} dicArray 字典数组
   * @param {*} dicLabel 字典指定label
   */
  getDicCode(dicArray, dicLabel) {
    let code = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].label === dicLabel) {
        code = dicArray[i].code;
      }
    }
    return code;
  },
  /**
   * @param {*} str 将指定内容添加到字符串中，且用逗号分隔
   * @param {*} targetString 指定字符串
   * @returns {string} 新增后的字符串
   */
  addStringElement(str, targetString) {
    return targetString + ',' + str;
  },
  /**
   * @param {*} str 将指定内容从字符串中删除，且删除相应的符号
   * @param {*} targetString 指定字符串
   * @returns {string} 切割后的字符串
   */
  delStringElement(str, targetString) {
    let currentArray = targetString.split(',');
    let index = null;
    currentArray.map((item) => {
      if (item === str) {
        index = currentArray.indexOf(item);
      }
    });
    if (index > -1) {
      currentArray.split(index, 1);
    }
    return currentArray;
  },
  /**
   * @param {*} prevStr 源code码字符串，如A,B,C
   * @param {*} currArray 字典数组
   * @returns {string} 字典code字符串，如01,02,03
   */
  // getCodeString(prevStr, currArray) {
  //   let rightArr = [];
  //   let prevArray = [];
  //   if (prevStr && prevStr !== '') {
  //     prevArray = prevStr.split(',');
  //     if (currArray.length > 0) {
  //       prevArray.forEach((value) => {
  //         let dicCode = this.getDicValue(currArray, value);
  //         rightArr.push(dicCode);
  //       });
  //     }
  //   }
  //   let str = '';
  //   if (rightArr.length > 0) {
  //     str = rightArr.join(',');
  //   }
  //   return str;
  // },
  /**
  * @param {*} prevArray 源数组
  * @param {*} currArray 字典数组
  * @returns {string} 切割后的字符串
  */
  getCodeString(prevArray, currArray) {
    let rightArr = [];
    if (currArray.length > 0) {
      prevArray.forEach((value) => {
        if (prevArray.length > 0) {
          let dicCode = this.getDicValue(currArray, value);
          rightArr.push(dicCode);
        }
      });
    }
    let str = '';
    if (rightArr.length > 0) {
      str = rightArr.join(',');
    }
    return str;
  },
  /**
   * @param {*} prevStr 源字典字符串，如01,02,03
   * @param {*} currArray 字典数组
   * @returns {string} 字典text字符串，如A,B,C
   */
  getTextString(prevStr, currArray) {
    let rightArr = [];
    let prevArray = [];
    if (prevStr && prevStr !== '') {
      prevArray = prevStr.split(',');
      if (currArray.length > 0) {
        prevArray.forEach((value) => {
          let dicText = this.getDicText(currArray, value);
          rightArr.push(dicText);
        });
      }
    }
    let str = '';
    if (rightArr.length > 0) {
      str = rightArr.join(',');
    }
    return str;
  },
  /**
   *
   * @param {*} prevStr 源字典字符串，如01,02,03
   * @param {*} currArray 字典数组
   * @returns {array} 字典array数组，如[A,B,C]
   */
  getTextArray(prevStr, currArray) {
    let rightArr = [];
    let prevArray = [];
    if (prevStr && prevStr !== '') {
      prevArray = prevStr.split(',');
      if (currArray.length > 0) {
        prevArray.forEach((value) => {
          let dicText = this.getDicText(currArray, value);
          rightArr.push(dicText);
        });
      }
    }
    return rightArr;
  },
  /*
   * --新版
   * @param {*} dicArray 字典数组
   * @param {*} value 字典指定value
   */
  getDictValue(dicArray, dicLabel) {
    let value = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].label === dicLabel) {
        value = dicArray[i].value;
      }
    }
    return value;
  },
  /*
   * --新版
   * @param {*} dicArray 字典数组
   * @param {*} label 字典指定label
   */
  getDictLabel(dicArray, dicValue) {
    let label = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].value === dicValue) {
        label = dicArray[i].label;
      }
    }
    return label;
  },
  /*
  * --新版
  * @param {*} dicArray 交易团字典数组
  * @param {*} dicLabel 交易团字典指定dicLabel
  */
  getDeleValue(dicArray, dicLabel) {
    let value = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].enterprisesName === dicLabel) {
        value = dicArray[i].enterprisesId;
      }
    }
    return value;
  },
  /*
   * --新版
   * @param {*} dicArray 交易团字典数组
   * @param {*} dicValue 交易团字典指定dicValue
   */
  getDeleLabel(dicArray, dicValue) {
    let label = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].enterprisesId === dicValue) {
        label = dicArray[i].enterprisesName;
      }
    }
    return label;
  },
  /*
  * --新版
  * @param {*} dicArray city字典数组
  * @param {*} dicLabel city字典指定dicLabel
  */
  getCityValue(dicArray, dicLabel) {
    let value = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].provinceCityName === dicLabel) {
        value = dicArray[i].provinceCityId;
      }
    }
    return value;
  },
  /*
   * --新版
   * @param {*} dicArray city字典数组
   * @param {*} dicValue city字典指定dicValue
   */
  getCityLabel(dicArray, dicValue) {
    let label = '';
    for (let i = 0; i < dicArray.length; i++) {
      if (dicArray[i].provinceCityId === dicValue) {
        label = dicArray[i].provinceCityName;
      }
    }
    return label;
  },
  /**
   * --新版
   * @param {*} prevStr 源字典字符串，如01,02,03
   * @param {*} currArray 字典数组
   * @returns {array} 字典array数组，如[A,B,C]
   */
  getLabelArray(prevStr, currArray) {
    let rightArr = [];
    let prevArray = [];
    if (prevStr && prevStr !== '') {
      prevArray = prevStr.split(',');
      if (currArray.length > 0) {
        prevArray.forEach((value) => {
          let dicLabel = this.getDictLabel(currArray, value);
          rightArr.push(dicLabel);
        });
      }
    }
    return rightArr;
  },
  /** --新版
  * @param {*} prevArray 源数组
  * @param {*} currArray 字典数组
  * @returns {string} 切割后的字符串
  */
  getValueString(prevArray, currArray) {
    let rightArr = [];
    if (currArray.length > 0) {
      prevArray.forEach((value) => {
        if (prevArray.length > 0) {
          let dicValue = this.getDictValue(currArray, value);
          rightArr.push(dicValue);
        }
      });
    }
    let str = '';
    if (rightArr.length > 0) {
      str = rightArr.join(',');
    }
    return str;
  },
  /** --新版
  * @param {*} targetStr 现输入文字
  * @param {*} compareStr 源文字
  * @returns {Boolean} 判断targetStr是否有部分内容不来源于compareStr
  */ 
  hasDiffPartByTwoStr(targetStr, compareStr) {
    let flag = false;
    let currentTargetArr = targetStr.split('');
    let currentCompareArr = compareStr.split('');
    if (currentTargetArr.length > 0) {
      for (let i = 0; i <= currentTargetArr.length; i++) {
        if (currentTargetArr[i] && (currentCompareArr.indexOf(currentTargetArr[i]) < 0)) {
          flag = true;
        }
      }
    }
    return flag;
  },
  /**
   * 参数验证
   * @param {*} params 对象
   * @returns {Boolean} 判断对象所有属性是否为空,true则所有属性为空
   */
  paramsValidate(params) {
    let flag = true;
    for (let key in params) {
      if (params[key] !== '' && params[key]) {
        return false; // 终止程序
      }
    }
    return flag;
  }
};
