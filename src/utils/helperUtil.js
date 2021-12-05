export default {
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
    const isSafe = function (val) {
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
    if (value.length < 6) {
      result.msg = "密码长度过短（6-20位，且必须包含1位字母、1位数字及1位特殊符号）";
      result.ok = false;
    } else if (value.length > 20) {
      result.msg = "密码长度过长（6-20位，且必须包含1位字母、1位数字及1位特殊符号）";
      result.ok = false;
    } else if (!isSafe(value)) {
      result.msg = "密码安全性低（6-20位，且必须包含1位字母、1位数字及1位特殊符号）";
      result.ok = false;
    } else if (/[\u4e00-\u9fa5\uFF00-\uFFFF]/.test(value)) {
      result.msg = "不能包含中文或全角字符";
      result.ok = false;
    }
    return result;
  },
  checkPasswordTwo(value, strength) {
    // 1是低级 2 3 是中级 4 5 是高级
    // 根据stength来校验密码强度
    const isSafe = function (val, checkStrenth) {
      let result = {
        msg: "",
        ok: true
      };
      // eslint-disable-next-line no-empty
      if (checkStrenth === 1) {

      } else if (checkStrenth < 4 && checkStrenth > 1) {
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,18}$/i;
        if (!reg.test(val)) {
          result.msg = "密码安全性低(6-18位且必须包含1位字母1位数字)";
          result.ok = false;
          return result;
        }
      } else if (checkStrenth >= 4) {
        const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i;
        if (!reg.test(val)) {
          result.msg = "密码安全性低(6-18位且必须包含1位字母1位数字及1位特殊符号";
          result.ok = false;
        }
      }
      return result;
    };
    let result = isSafe(value, strength);
    return result;
  },
  //返回不同的密码强度的提示
  backTip(val) {
    let value = val - 0;
    switch (value) {
      case 2:
      case 3:
        return "密码安全性低(6-18位，且必须包含1位字母、1位数字)";
      case 5:
      case 4:
        return "密码安全性低(6-18位且必须包含1位字母1位数字及1位特殊符号)";
      default:
        return "";
    }
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
  }
};
