/*
 * added by zhangwenqi
 * 常用正则验证
 * -------------------------------------------------
 * updated by zhangwenqi
 * 挂载 element ui form validate
 */

// 声明可用 pattern
let pattern = {
  // url 验证
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,

  // number 验证, 包括正负整数
  number: /^[-+]?[0-9]*$/,

  // numerical 验证, 包括整数、浮点数、正、负数
  numerical: /^[-+]?[0-9]+(\.[0-9]+)?$/,

  // numerical 验证, 包括整数、浮点数、正、负数
  pNumerical: /^[0-9]+(\.[0-9]+)?$/,

  // integer 验证, 验证整数
  integer: /^[0-9]*$/,

  // pInteger 验证, 验证正整数
  pInterger: /^\d+$/,

  // nInterger 验证, 验证负整数及0
  nInterger: /^((-\d+)|(0+))$/,

  // mobile 验证, 验证手机号码
  mobile: /^1[345789]\d{9}$/,

  // 国际固话验证
  intMobile: /^(\+\d{2}-)?0\d{2,3}-\d{7,8}$/,

  //通用号码(手机号码+国际固话验证)
  globalMobile: /^(\+)?(\d{7,16})$/,

  // 带国际区号的手机号码
  iMobile: /^\+?[0-9]{1,20}$/,

  // telephone 验证,验证电话号码
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,

  // 带分机号的电话号码
  iTelephone: /^([0-9]{1,5})(-?[0-9]{1,10}){1,2}$/,

  // idCard 验证,验证身份证号
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  // email 验证,验证邮箱
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,

  // 百分数验证，数字在1-99之间，保留一位小数
  percente: /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/,

  // 银行卡号
  bankCard: /^[0-9]{1,30}$/,

  // 税号
  taxNum: /^[A-Za-z0-9]{1,30}$/,

  // 信用证编码
  creditLetterCode: /^[A-Za-z0-9]{1,30}$/,

  // 验证内容是否英文数字以及下划线,且不以下划线开头
  isPassword: /^([a-zA-Z0-9])([_a-zA-Z0-9]*)$/,

  // 机构编码
  agencyCode: /^[A-Za-z0-9]{1,32}$/,

  dictDataCode: /^([a-zA-Z0-9])([._a-zA-Z0-9]*)$/,

  // 统一社会信用代码
  unifiedSocialCreditCode: /^[A-Za-z0-9]{1,18}$/,

  //验证正整数，且长度不超过9位
  fixedInteger: /^\d{0,9}$/,

  //证件费用比率，整数部位5位数以内,小数位不能超过2位
  badgeFee: /^(?:0\.\d{0,2}|0|[1-9][0-9]{0,4}|[1-9]{1,5}\.\d{0,2})$/,

  //早鸟折扣比率，不大于1且最多2位小数
  earlyBirdDiscountRate: /^(?:0\.\d{0,2}|0|1|)$/,

  //证件申请截止时间 0-24的整数
  badgeDeadline: /^([0-9]{1}|1[0-9]{1}|2[0-4]{1})$/,

  //固定电话 区号3-4位加7-8位数字,分机号3位数字
  fixedTelephone: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
};

const isEn = () => kindo.cache.get('language') === 'en';
// 声明可用验证方法
let validate = {
  // 包含常用 pattern
  pattern,

  /*
   * 包含特殊字符 正则验证
   */
  containSpecialChars: param => {
    var patternExp = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？\\s]");
    return patternExp.test(param);
  },

  /*
   * 非空验证 正则验证
   * @param   paraming  : 验证非空
   * ex             : kindo.validate.isEmpty('1.json') => false
   */
  isEmpty: param => {
    return param == null || typeof param === 'undefined' || param === '';
  },

  /*
   * 长度 正则验证
   * @param   paraming  : 验证长度
   * ex             : kindo.validate.length('1.json', 30) => true
   */
  length: (param, length) => {
    return param.toString().length() <= length;
  },

  /*
   * 长度 正则验证（1个双字节=3个单字节）
   * @param   paraming  : 验证长度
   * ex             : kindo.validate.lengthForByte('你好1',4) => false
   */
  lengthForByte: (param, length) => {
    // 1个中文字符占3个字节，其他字符占1个字节
    let len = param.toString().replace(/[^\x00-\xff]/g, 'aaa').length;

    if (len > length) {
      return false;
    } else {
      return true;
    }
  },

  /*
   * 区间 正则验证
   * @param   paraming  : 验证长度
   * @iMin   paraming  : 最小值
   * @iMax   paraming  : 最大值
   * ex             : kindo.validate.range('36.5', 1, 100) => false
   */
  range: (param, iMin, iMax) => {
    let re = /(\d+)/g;

    while (re.exec(param)) {
      let int = parseInt(RegExp.$1);
      if (int < iMin || int > iMax) {
        return false;
      } else {
        return true;
      }
    }
  },

  /*
   * url 正则验证
   * @param   paraming  : 验证字符串
   * ex             : kindo.validate.url('1.json') => true
   */
  url: param => {
    return pattern.url.test(param);
  },

  /*
   * 数字 正则验证（正负整数）
   * @param   paraming  : 验证数字
   * ex             : kindo.validate.number(123) => true
   */
  number: param => {
    return pattern.number.test(param);
  },

  /*
   * 数值 正则验证（包括整数、浮点数、正、负数）
   * @param   paraming  : 验证数字
   * ex             : kindo.validate.number(123) => true
   */
  numerical: param => {
    return pattern.numerical.test(param);
  },

  /*
   * 数值 正则验证（包括整数、浮点数、正数）
   * @param   paraming  : 验证数字
   * ex             : kindo.validate.number(123) => true
   */
  pNumerical: param => {
    return pattern.pNumerical.test(param);
  },

  /*
   * 整数 正则验证
   * @param   paraming  : 验证整数
   * ex             : kindo.validate.integer(-123) => true
   */
  integer: param => {
    return pattern.integer.test(param);
  },

  /*
   * 正整数及0 正则验证
   * @param   paraming  : 验证正整数
   * ex             : kindo.validate.pInterger(123) => true
   */
  pInterger: param => {
    return pattern.pInterger.test(param);
  },

  /*
   * 负整数及0 正则验证
   * @param   paraming  : 验证负整数及0
   * ex             : kindo.validate.nInterger(-123) => true
   */
  nInterger: param => {
    return pattern.nInterger.test(param);
  },

  /*
   * 手机号码 正则验证
   * @param   paraming  : 验证手机号码
   * ex             : kindo.validate.mobile('13011111111') => true
   */
  mobile: param => {
    return pattern.mobile.test(param);
  },

  /*
   * 电话号码 正则验证
   * @param   paraming  : 验证电话号码
   * ex             : kindo.validate.telephone('13011111111') => true
   */
  telephone: param => {
    return pattern.telephone.test(param);
  },

  /*
   * 身份证 正则验证
   * @param   paraming  : 验证身份证
   * ex             : kindo.validate.idCard('400210188801011010') => true
   */
  idCard: param => {
    return pattern.idCard.test(param);
  },

  /*
   * 邮箱 正则验证
   * @param   paraming  : 验证邮箱
   * ex             : kindo.validate.email('aa@qq.com') => true
   */
  email: param => {
    return pattern.email.test(param);
  },

  /*
   * 信用证编码 正则验证
   * @param   paraming  : 验证信用证编码
   * ex             : kindo.validate.creditLetterCode('abc123') => true
   */
  creditLetterCode: param => {
    return pattern.creditLetterCode.test(param);
  },

  /*
   * 机构编码 正则验证
   * @param   paraming  : 验证机构编码
   * ex             : kindo.validate.agencyCode('abc123') => true
   */
  agencyCode: param => {
    return pattern.agencyCode.test(param);
  },

  /*
   * 统一社会信用代码 正则验证
   * @param   paraming  : 验证统一社会信用代码
   * ex             : kindo.validate.unifiedSocialCreditCode('abc123') => true
   */
  unifiedSocialCreditCode: param => {
    return pattern.unifiedSocialCreditCode.test(param);
  },

  /*
   * 表单验证 密码 正则验证
   * ex             : kindo.validate.checkPassword
   */
  checkPassword: (rule, value, callback) => {
    if (value && !pattern.isPassword.test(value)) {
      let tips = '必须由英文字母、数字以及_组成，并且不能以_开头';
      if (isEn()) {
        tips = 'Must consist of English letters, numbers, and _, and cannot begin with _';
      }
      callback(new Error(tips));
      return;
    } else {
      callback();
      return;
    }
  },

  /*
   * 字典编码 正则验证
   * ex             : kindo.validate.checkPassword
   */
  checkdictDataCode: (rule, value, callback) => {
    if (value && !pattern.dictDataCode.test(value)) {
      let tips = '必须由英文字母、数字、.符号以及_组成，并且不能以.符号或_开头';
      if (isEn()) {
        tips = 'Must consist of English letters, numbers, symbols, and _, and cannot begin with a . or _';
      }
      callback(new Error(tips));
      return;
    } else {
      callback();
      return;
    }
  },

  /*
   * 表单验
   * ex             证 手机正则验证: kindo.validate.checkMobile
   */
  checkMobile: (rule, value, callback) => {
    if (value && !pattern.mobile.test(value)) {
      let tips = '请输入正确的电话号码';
      if (isEn()) {
        tips = 'Please enter the correct phone number';
      }
      callback(new Error(tips));
      return;
    } else {
      callback();
      return;
    }
  },

  /*
   * 正整数 正则验证
   * @param   paraming  : 验证9位正整数
   * ex             : kindo.validate.fixedInteger(123) => true
   */
  fixedInteger: param => {
    return pattern.fixedInteger.test(param);
  },

  /*
   * 证件费用比率 正则验证
   * @param   paraming  : 验证整数部位5位数以内,小数位不能超过2位
   * ex             : kindo.validate.badgeFee(123.12) => true
   */
  badgeFee: param => {
    return pattern.badgeFee.test(param);
  },

  /*
   * 早鸟折扣比率 正则验证
   * @param   paraming  : 验证不大于1且最多2位小数
   * ex             : kindo.validate.badgeFee(0.12) => true
   */
  earlyBirdDiscountRate: param => {
    return pattern.earlyBirdDiscountRate.test(param);
  },

  /*
   * 证件截止时间 正则验证
   * @param   paraming  : 验证0-24的整数
   * ex             : kindo.validate.badgeDeadline(23) => true
   */
  badgeDeadline: param => {
    return pattern.badgeDeadline.test(param);
  },

  /*
   * 固定电话 正则验证
   * @param   paraming  : 验证固定电话(区号3-4位加7-8位数字,分机号3位数字)
   * ex             : kindo.validate.fixedTelephone(010-66669999) => true
   */
  fixedTelephone: param => {
    return pattern.fixedTelephone.test(param);
  },
  /*
   * 密码 正则验证
   * @param   paraming  : 验证密码 英文数字以及下划线,且不以下划线开头
   * ex             : kindo.validate.isPassword(123abc) => true
   */
  isPassword: param => {
    return !pattern.isPassword.test(param);
  }
};

export default validate;
