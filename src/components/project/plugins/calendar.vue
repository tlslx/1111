<template>
  <div id="calendar">
    <div class="head">
      <div class="month-switch">
        <i class="el-icon-date" style="font-size: larger;float:left" />
        <i class="el-icon-caret-left" @click="switchMonth('prev')" style="font-size: larger" />
        {{currentYear}} - {{currentMonth}}
        <i class="el-icon-caret-right" @click="switchMonth('next')" style="font-size: larger" />
      </div>
    </div>
    <div class="date">
      <ul class="week">
        <li v-for="(day,index) in week" :key="index">{{day}}</li>
      </ul>
      <ul class="month">
        <li v-for="(item,index) in days" :key="index" @click="chooseDay(item,index)" @dblclick="addTodoTask" :class="[item.className, {'choose-day': item.date === chooseDate,
            'other-month': item.day > 7 && index < 7 || item.day < 7 && index > 28}
            ]">
          <span>{{item.day}}</span>
        </li>
      </ul>
    </div>
    <div class="todolist">
      <el-row v-for="(item, index) in todoList" :key="item.id" class="list-row" :gutter="5">
        <el-col :span="3" class="check" :class="{ red: !todoList[index].done, green: todoList[index].done }">
          <el-checkbox size="mini" v-model="item.done" :disabled="todoList[index].edit" @change="onDoneTask(item.id,item.done)"></el-checkbox>
        </el-col>
        <el-col :span="18">
          <input type="text" v-model="item.content" placeholder="填写任务..." class="ipcont" @change="onTodoInputChange(index)"
            :disabled="todoList[index].done" :class="{done: todoList[index].done}">
        </el-col>
        <el-col :span="3" class="close">
          <i class="el-icon-close" @click="onDelTask(index, item.id)" v-show="!todoList[index].edit"></i>
          <i class="el-icon-check" @click="onSaveTask(index, item.id)" v-show="todoList[index].edit"></i>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        minMonths: [4, 6, 9, 11],
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth() + 1,
        week: ["日", "一", "二", "三", "四", "五", "六"],
        days: null,
        chooseDate: null,
        todayDate: null,
        // todoList: [],
        todoListAll: [],
        markers: [],
        queriedMonth: [],
        fullMonth: this.currentYear + "-" + this.currentMonth,
        taskDaysInMonth: []
      };
    },
    created() {
      this.getTodayDate();
      this.initMonth(this.currentYear, this.currentMonth);
      // this.getTaskDateInMonth(this.currentYear, this.currentMonth);
      // this.getTaskInMonth(this.currentYear, this.currentMonth);
      // this.getTodayTask(this.todayDate);
    },
    methods: {
      getTodayDate() {
        const date = new Date();
        var today = date.getDate();
        if (today < 10) {
          today = "0" + today;
        }
        this.todayDate = `${this.currentYear}-${this.currentMonth}-${today}`;
      },
      isLeapYear(year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      },
      initMonth(year, month) {
        let temp = month;
        const currentMonthDays = this.getDaysOfMonth(year, temp);
        const prevMonthDays = this.getDaysOfMonth(
          year,
          temp === 1 ? 12 : temp - 1
        );
        const nextMonthDays = this.getDaysOfMonth(
          year,
          temp === 12 ? 1 : temp + 1
        );

        // get the first day and the last day of the month is the day of the week
        const firstDay = new Date(this.NewDate(currentMonthDays[0].date)).getDay();
        const lastDay = new Date(
          this.NewDate(currentMonthDays[currentMonthDays.length - 1].date)
        ).getDay();

        // concat prev month and next month
        const prevMonthSpliceDays = prevMonthDays.splice(
          prevMonthDays.length - firstDay,
          prevMonthDays.length - 1
        );
        const nextMonthSpliceDays = nextMonthDays.splice(0, 7 - (lastDay + 1));

        this.days = [
          ...prevMonthSpliceDays,
          ...currentMonthDays,
          ...nextMonthSpliceDays
        ];
        // console.log(JSON.stringify(this.days));
        // 获取任务日期和本月的任务
        this.getTaskInMonth(this.currentYear, this.currentMonth);
        this.chooseDate = null;
      },
      getDaysOfMonth(year, month) {
        let totalDay;
        let days = [];
        if (month === 2) {
          totalDay = this.isLeapYear(year) ? 29 : 28;
        } else {
          totalDay = this.minMonths.includes(month) ? 30 : 31;
        }
        for (let i = 0; i < totalDay; i++) {
          let day = {
            day: i + 1,
            isFutureDay: false,
            // 转换成通mysql一致的日期格式
            date: this.$utility.formatDate(
              new Date(this.NewDate(`${year}-${month}-${i + 1}`)),
              "yyyy-mm-dd"
            )
          };
          // 设置日期未来属性
          if (new Date(this.NewDate(this.todayDate)).getTime() < new Date(this.NewDate(day.date)).getTime()) {
            day.isFutureDay = true;
          }
          // 设置当天的日期样式
          if (day.date === this.todayDate) {
            day.className = "today";
          }
          days.push(day);
        }
        return days;
      },
      // 处理IE时间兼容性
      NewDate(str) {
        if (kindo.util.checkuserAgent() === "IE") {
          // 首先将日期分隔，获取到日期部分和时间部分
          let newstr = kindo.util.formatTime(str);
          let day = newstr.split(' ');
          // 获取日期部分的年月日
          let days = day[0].split('-');
          // 获取时间部分的时分秒
          let mi = day[day.length - 1].split(':');
          // 获取当前date类型日期
          let date = new Date();
          // 给date赋值年月日
          date.setUTCFullYear(days[0], days[1] - 1, days[2]);
          // 给date赋值时分秒首先转换utc时区+8
          date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
          return date;
        } else {
          return str;
        }
      },
      /**
       * @description switch month
       * @param {String} type prev or next
       */
      switchMonth(type) {
        // prev month
        if (type === "prev") {
          if (this.currentMonth > 1) {
            this.currentMonth--;
          } else {
            this.currentYear--;
            this.currentMonth = 12;
          }
        }
        // next month
        if (type === "next") {
          if (this.currentMonth < 12) {
            this.currentMonth++;
          } else {
            this.currentYear++;
            this.currentMonth = 1;
          }
        }
        // const date = `${this.currentYear}-${this.currentMonth}-${this.today}`;
        this.initMonth(this.currentYear, this.currentMonth);
      },
      /**
       * @description choose one day
       * @param {Number} item one day
       * @param {Number} index
       */
      chooseDay(item, index) {
        // const date = `${this.currentYear}-${this.currentMonth}-${item.day}`;
        // switch to prev month
        if (item.day > 7 && index < 7) {
          this.switchMonth("prev");
        }
        // switch to next month
        if (item.day < 7 && index > 28) {
          this.switchMonth("next");
        }
        this.chooseDate = item.date;
      },
      onDelTask(index, id) {
        var _this = this;
        var _taskDate = _this.todoList[index].date;
        var _index = -1;
        // 如果当天只有一条事项了，需要取消日期上的标志
        if (_this.todoList.length === 1) {
          _index = _this.days.find(function (x) {
            return x.date === _taskDate;
          });
          // 日期标志
          delete _index.className;
          // 删除taskDayInMonth里面的日期
          _index = _this.taskDaysInMonth.findIndex(function (x) {
            return x === _taskDate;
          });
          _this.taskDaysInMonth.splice(_index, 1);
        }
        // 删除todoListAll里面相应数据
        _index = _this.todoListAll.findIndex(function (x) {
          return x.id === id;
        });
        _this.todoListAll.splice(_index, 1);
        let paramData = {
          userId: _this.$store.getters.userInfo.userId,
          calendarId: id
        };
        this.$http
          .post("/api/calendar/deleteCalendarTask", paramData)
          .then(function (resultData) {
            // console.log("已经删除当前任务！");
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log("删除当前任务失败，失败原因：" + msg);
          });
      },
      onDoneTask(id, status) {
        var _this = this;
        var paramData = {
          userId: _this.$store.getters.userInfo.userId,
          calendarId: id,
          doneFlag: status
        };
        this.$http
          .post("/api/calendar/doneCalendarTask", paramData)
          .then(function (resultData) {
            // console.log("ok");
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log(msg);
          });
      },
      onTodoInputChange(index) {
        this.todoList[index].edit = true;
      },
      addTodoTask() {
        var item = {
          id: this.todoList.length + 1,
          content: "",
          done: false,
          edit: true,
          date: this.chooseDate
        };
        this.todoListAll.push(item);
      },
      onSaveTask(index) {
        var _this = this;
        var _index = -1;
        _this.todoList[index].edit = false;
        // 如果当天没有事项，需要加上日期上的标志
        if (_this.todoList.length === 1) {
          _index = _this.days.find(function (x) {
            return x.date === _this.todoList[index].date;
          });
          // 日期标志
          _this.$set(_index, "className", "love");
          // 将日期加入taskDayInMonth
          _this.taskDaysInMonth.push(_this.todoList[index].date);
        }
        // 保存当天事项
        let paramData = {
          userId: _this.$store.getters.userInfo.userId,
          taskDate: _this.chooseDate,
          content: _this.todoList[index].content
        };
        this.$http
          .post("/api/calendar/addTask", paramData)
          .then(function (resultData) {
            // console.log('新增任务成功');
            _this.todoList[index].id = resultData.calendarId;
            _this.todoList[index].date = resultData.taskDate.substring(0, 10);
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log(msg);
          });
      },
      getTaskDateInMonth(currentYear, currentMonth) {
        var _days = [];
        var _month = "";
        if (this.currentMonth < 10) {
          _month = "0" + this.currentMonth;
        } else {
          _month = this.currentMonth;
        }
        _days = this.taskDaysInMonth.filter(
          item => item.substring(0, 7) === currentYear + "-" + _month
        );
        _days.map(x => {
          var _index = -1;
          _index = this.days.find(function (n) {
            return n.date === x;
          });
          // 日期标志
          this.$set(_index, "className", "love");
        });
      },
      getTaskInMonth(currentYear, currentMonth) {
        var _this = this;
        var paramData = {
          userId: _this.$store.getters.userInfo.userId,
          queryDate: currentYear + "-" + currentMonth
        };
        // _this.todoListALL = [];
        // 判断是否已经获取过该月的任务，如果获取过了就不再获取，直接过滤当前分类数据
        var _index = -1;
        _index = this.queriedMonth.findIndex(function (x) {
          return x === paramData.queryDate;
        });
        if (_index > -1) {
          this.getTaskDateInMonth(this.currentYear, this.currentMonth);
          return;
        }
        // console.log("查询" + currentYear + "年" + currentMonth + "月" + "任务！");
        this.$http
          .post("/api/calendar/getMonthTask", paramData)
          .then(function (resultData) {
            // 判断是否有数据
            if (resultData.total > 0) {
              resultData.records.map(x => {
                var _item = {
                  id: "",
                  content: "",
                  done: false,
                  edit: false,
                  date: ""
                };
                _item.id = x.calendarId;
                _item.content = x.content;
                _item.date = x.taskDate.substring(0, 10);
                if (x.done === 1) {
                  _item.done = true;
                } else {
                  _item.done = false;
                }
                _this.todoListAll.push(_item);
                // 将日期记录到taskDaysInMonth中，下次不用再计算
                _index = _this.taskDaysInMonth.findIndex(function (_x) {
                  return _x === _item.taskDate;
                });
                if (_index < 0) {
                  _this.taskDaysInMonth.push(_item.date);
                }
              });
              _this.getTaskDateInMonth(_this.currentYear, _this.currentMonth);
            }
            _this.queriedMonth.push(paramData.queryDate);
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log(msg);
          });
      }
    },
    computed: {
      todoList() {
        return this.todoListAll.filter(
          item => item.date === this.chooseDate
        );
      }
    }
  };

</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  ul {
    padding-left: 0;
  }

  li {
    list-style: none;
    text-align: center;
  }

  #calendar {
    min-width: 200px;
    color: #214202;
    background-color: #f9faf8;
    /*
  BORDER-TOP-LEFT-RADIUS: 10PX;
  BORDER-TOP-RIGHT-RADIUS: 10PX;
  */
    border-bottom: 1px solid #539a0e;
  }

  .month-switch {
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 1px;
    padding: 8px 23px 5px 2px;
    color: #638617;
    background-color: #fcfbfb;
    font-size: medium;
    border-bottom: 1px solid #59a016;
  }

  .month-switch .disabled-switch {
    color: #333;
  }

  .week {
    display: flex;
  }

  .week li {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }

  .month {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  .month li {
    width: 14.28%;
    margin-bottom: 8px;
  }

  .month span {
    display: inline-block;
    width: 25px;
    height: 25px;
    line-height: 22px;
    border-radius: 40%;
    text-align: center;
    cursor: pointer;
  }

  #calendar .choose-day span {
    border: 2px solid lightpink;
  }

  #calendar .other-month span {
    color: #878a89;
  }

  #calendar .disabled-day span {
    color: #e9ec0a;
    background-color: transparent;
  }

  #calendar /deep/ .love span {
    background-color: #b9eec2;
    padding-top: 1px;
  }

  #calendar /deep/ .miss span {
    background-color: #85a58a;
  }

  #calendar /deep/ .today span {
    color: #fc060e;
    font-size: x-large;
  }

  .todolist {
    margin-right: 2.5px;
    margin-bottom: 2px;
  }

  .todolist .check {
    text-align: center;
    line-height: 24px;
  }

  .todolist .red {
    border-left: #ef5f65 2px solid;
  }

  .todolist .todolist .green {
    border-left: #b9e1dc 2px solid;
  }

  .todolist .ipcont {
    width: 98%;
    border: 0;
    line-height: 22px;
    margin-bottom: 2px;
    background-color: transparent;
    font-size: 14px;
    color: #756c83;
  }

  .todolist .close {
    text-align: center;
    margin-bottom: 8px;
    line-height: 24px;
  }

  .todolist .el-icon-close {
    cursor: pointer;
  }

  .todolist .el-icon-close:hover {
    color: #ef5f65;
  }

  .todolist .done {
    text-decoration: line-through;
  }

</style>
