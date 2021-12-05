/* eslint-disable no-param-reassign */
let ucpUtil = {
  rechargeMethods: () => {
    return [{ value: '1', label: '网上支付' }, { value: '2', label: '线下支付' }];
  },

  currencyOptions: () => {
    return [{ value: '1', label: '人民币' }];
  },

  payStates: () => {
    return [{ value: '1', label: '待支付' }, { value: '2', label: '未支付' }, { value: '3', label: '已支付' }];
  },

  approveStates: () => {
    return [{ value: '1', label: '审批中' }, { value: '2', label: '已审批' }, { value: '3', label: '已驳回' }];
  },

  invoiceStates: () => {
    return [{ value: '1', label: '已开' }, { value: '0', label: '未开' }];
  },

  refundTypes: () => {
    return [{ value: '1', label: '网上退款' }, { value: '2', label: '现场退款' }];
  },

  refundMethods: () => {
    return [{ value: '1', label: '现金' }, { value: '2', label: '网银' }];
  },

  orderStates: () => {
    return [{ value: '10', label: '失败' }, { value: '20', label: '成功' }];
  },

  accountTypes: () => {
    return [{ value: '11', label: '个人账户' }, { value: '12', label: '企业账户' }];
  },

  collectMethods: () => {
    return [{ value: '1', label: '网上收款' }, { value: '2', label: '现场收款' }];
  },

  transTypes: () => {
    return [{ value: '1', label: '支付' }, { value: '2', label: '退款' }];
  },

  transStates: () => {
    return [{ value: '1', label: '待支付' }, { value: '2', label: '未支付' }, { value: '3', label: '已支付' }, { value: '4', label: '待退款' }, { value: '5', label: '未退款' }, { value: '6', label: '已退款' }];
  },

  formatRechargeMethod: (row, column) => {
    return kindo.ucpUtil.commonFormat(row, column, kindo.ucpUtil.rechargeMethods());
  },

  formatCurrency: (row, column) => {
    return kindo.ucpUtil.commonFormat(row, column, kindo.ucpUtil.currencyOptions());
  },

  formatInvoiceState: (row, column) => {
    return kindo.ucpUtil.commonFormat(row, column, kindo.ucpUtil.invoiceStates());
  },

  formatRefundMethod(row, column) {
    return kindo.ucpUtil.commonFormat(row, column, kindo.ucpUtil.refundMethods());
  },

  formatRefundType: (row, column) => {
    return kindo.ucpUtil.commonFormat(row, column, kindo.ucpUtil.refundTypes());
  },

  formatApproveState: (row, column) => {
    return kindo.ucpUtil.commonFormat(row, column, kindo.ucpUtil.approveStates());
  },

  commonFormat(row, column, values) {
    let value = row[column.property];
    for (let i = 0; i < values.length; i++) {
      let tmp = values[i];
      if (tmp.value === value) {
        return tmp.label;
      }
    }
  },

  // 返回数字
  removeFormatMoney(s) {
    return parseFloat(s.replace(/[^\d\.-]/g, ''));
  },

  /*
   * formatMoney(s)
   * 功能：金额按千位逗号分隔
   * 参数：s，需要格式化的金额数值.
   * 返回：返回格式化后的数值字符串.
   */
  formatMoney(s) {
    if (/[^0-9\.]/.test(s)) {
      return '0.00';
    }
    if (s == null || s === 'null' || s === '') {
      return '0.00';
    }
    s = s.toString().replace(/^(\d*)$/, '$1.');
    s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1');
    s = s.replace('.', ',');
    let re = /(\d)(\d{3},)/;
    while (re.test(s)) {
      s = s.replace(re, '$1,$2');
    }
    s = s.replace(/,(\d\d)$/, '.$1');
    let a = s.split('.');
    if (a[1] === '00') {
      s = a[0];
    }
    return s;
  },

  convertCurrency(money) {
    //汉字的数字
    var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    //基本单位
    var cnIntRadice = ['', '拾', '佰', '仟'];
    //对应整数部分扩展单位
    var cnIntUnits = ['', '万', '亿', '兆'];
    //对应小数部分单位
    var cnDecUnits = ['角', '分', '毫', '厘'];
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money === '') {
      //不能用==
      return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') === -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      let zeroCount = 0;
      let IntLen = integerNum.length;
      for (let i = 0; i < IntLen; i++) {
        let n = integerNum.substr(i, 1);
        let p = IntLen - i - 1;
        let q = p / 4;
        let m = p % 4;
        if (n === '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum !== '') {
      let decLen = decimalNum.length;
      for (let i = 0; i < decLen; i++) {
        let n = decimalNum.substr(i, 1);
        if (n !== '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr === '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  }
};

export default ucpUtil;
