export default {
  curDate() {
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    return start;
  },
  beforeDate(num) {
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);
    start.setMilliseconds(0);
    return start;
  },
  addDate(date, num) {
    const start = new Date(date);
    start.setTime(start.getTime() + 3600 * 1000 * 24 * num);
    return start;
  },
  addMinute(date, num) {
    const start = new Date(date);
    start.setTime(start.getTime() + 60 * 1000 * num);
    return start;
  },
  addSecond(date, num) {
    const start = new Date(date);
    start.setTime(start.getTime() + 1000 * num);
    return start;
  },
  format(date, _fmt) {
    let fmt = _fmt;
    if (!fmt) {
      fmt = "yyyy-MM-dd hh:mm:ss";
    }
    const o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }

    return fmt;
  },
  // 获取当前月的第一天
  getCurrentMonthFirst() {
    let date = new Date();
    date.setDate(1);
    return date;
  },
  // 获取当前月的最后一天
  getCurrentMonthLast() {
    let date = new Date();
    let currentMonth = date.getMonth();
    let nextMonth = ++currentMonth;
    let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    let oneDay = 1000 * 60 * 60 * 24;
    return new Date(nextMonthFirstDay - oneDay);
  },
  // 获取当年第一天
  getFirstDayOfYear() {
    let date = new Date();
    date.setDate(1);
    date.setMonth(0);
    return date;
  },

  getDateRangeArr(startDate, endDate) {
    let resultArr = [];
    let oneUnit = 1000 * 60 * 60 * 24;
    let endDateObj = new Date(endDate.replace(/-/g, '/'));

    let tmpDate = new Date(startDate.replace(/-/g, '/')).getTime();
    while (endDateObj.getTime() !== tmpDate) {
      resultArr.push(this.format(new Date(tmpDate), 'yyyy-MM-dd'));
      tmpDate = tmpDate + oneUnit;
    }
    resultArr.push(this.format(new Date(tmpDate), 'yyyy-MM-dd'));

    return resultArr;
  },

  getNowWeek() {
    let now = new Date();
    let nowDay = now.getDay();
    let nowTime = now.getTime();
    let result = [0, 1, 2, 3, 4, 5, 6];
    return result.map(i => (new Date(nowTime + 24 * 60 * 60 * 1000 * (i - nowDay))).getDate());
  },
  // 获取当日所在下周的数组
  getNextWeek() {
    const week = [];
    let dateArray = [];
    for (let i = 0; i < 7; i++) {
      let stamp = new Date();
      let num = 7 - stamp.getDay() + 1 + i;
      stamp.setDate(stamp.getDate() + num);
      // let year = stamp.getFullYear();
      // let month = stamp.getMonth() + 1;
      // let date = stamp.getDate();
      week[i] = stamp;
      // week[i] = (year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date));
      dateArray.push(week[i]);
    }
    return dateArray;
  },
  // 时间戳格式化
  dateformatter(time) {
    let time2 = time - 0;
    let date = new Date(time2);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
  },
  // 获取毫秒 日期时间格式为yyyy-mm-dd hh:mm:ss
  milliseconds(date) {
    let startDate = date;
    startDate = date.replace(new RegExp("-", "gm"), "/");
    let startDateM = (new Date(startDate)).getTime();
    return startDateM;
  }
};
