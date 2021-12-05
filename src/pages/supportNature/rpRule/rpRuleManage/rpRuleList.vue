
/**
 * @file 奖惩规则管理
 */
<style>
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-header > span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  height: 58px;
  line-height: 58px;
  display: block;
  float: left;
  border-bottom: 2px solid #2b579a;
}
.yelColor {
  background: #fff4df;
}
.conditionUl {
  list-style: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
}
.conditionUl li {
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  line-height: 40px;
  box-sizing: border-box;
  padding: 0 10px;
}
.conditionUl li:last-child {
  border-bottom: none;
}
.el-table th > .cell,
.el-table .cell {
  font-size: 12px;
}
</style>

<template>
  <el-container>
    <el-header>
      <span>奖惩规则管理</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <span>
              <el-button @click="exportExcel" type="text">下载XLS</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
      <template>
        <el-table :data="tableData" :cell-class-name="colClass" height="520" style="width: 100%" v-loading="loading" id="out-table">
          <el-table-column fixed="left" prop="typeCode" label="处理类型" align="center" width="100">
          </el-table-column>
          <el-table-column prop="ruleCode" label="事件类别" align="center" width="150"></el-table-column>
          <el-table-column label="认定条件" align="center" width="385">
            <template slot-scope="scope">
              <ul class="conditionUl">
                <li v-for="(item, index) in scope.row.rpConCodes" :key="index">
                  {{item.text}}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column prop="companyOpCodes" label="面向企业的措施" align="center" width="260"></el-table-column>
          <el-table-column prop="companyBSTeamOpCodes" label="面向企业所属交易团的措施" align="center" width="210"></el-table-column>
          <el-table-column label="需系统执行的操作" align="center">
            <el-table-column prop="boothApplyCode" label="企业展位申请" align="center" width="110"></el-table-column>
            <el-table-column prop="boothNumberCode" label="安排企业展位数量" align="center" width="140"></el-table-column>
            <el-table-column prop="boothPositionCode" label="安排企业展位位置" align="center" width="140"></el-table-column>
            <el-table-column prop="btoCode" label="交易团" align="center" width="85"></el-table-column>
          </el-table-column>
          <el-table-column prop="limit" label="处理期限" align="center" width="105"></el-table-column>
          <el-table-column prop="processingProgram" label="处理程序" align="center" width="310"></el-table-column>
          <el-table-column prop="cognizanceBasis" label="认定依据" align="center" width="120"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="rpRuleModify(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination style="float:right; margin-top:20px;" @current-change="handleCurrentChange" background layout="prev, pager, next, jumper" :page-size="pageInfo.pageSize" :current-page="pageInfo.currentPage" :total="pageInfo.total">
        </el-pagination>
      </template>
    </el-main>
  </el-container>
</template>
<script>
import http from "@/scripts/framework/http";
import { mapGetters, mapActions } from "vuex";
// 引入导出Excel表格依赖
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
export default {
  data() {
    return {
      //字典数组
      dictArray: {
        eventType: [],    //事件类别
        confirmCondition: [],   //认定条件
        companyOp: [],          //面向企业的措施
        companyBSteamOp: [],    //面向企业的交易团的措施
        boothApply: [],      //展位申请
        boothNumber: [],     //展位数量
        boothPosition: [],   //展位位置
        businessTeamOperation: []    //交易团
      },
      maplist: [],
      copList: [],
      cbsList: [],
      baList: [],
      bnList: [],
      bootpList: [],
      businList: [],
      eventCodes: '',
      form: {},
      loading: true,
      options: [],
      sessionValue: "126",
      tableData: [],
      temp: [],
      spanArr: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      rpConContent: [],   //认定条件
      baseApi: process.env.API_SN_URL
    };
  },
  async beforeCreate() {
    //获取字典
    // let dicListArray = await kindo.dictionary.get('rp_event_type');
  },
  created() {
    this.getDictionary();
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"])
  },
  updated() {
    this.loading = false;
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getRpRuleExport']), // 下载

    getAllByTypeOne() {
      let dictArray = [];

      // 事件类别
      let params = {
        type: 1
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getAllByTypeTwo() {
      let dictArray = [];

      // 事件类别
      let params2 = {
        type: 2
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params2).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getAllByTypeThree() {
      let dictArray = [];

      // 获取面向企业的交易团的措施的数据
      let params3 = {
        type: 3
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params3).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getAllByTypeFour() {
      let dictArray = [];

      // 获取企业展位数据
      let params4 = {
        type: 4
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params4).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getAllByTypeFive() {
      let dictArray = [];

      // 获取展位数量数据
      let params5 = {
        type: 5
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params5).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getAllByTypeSix() {
      let dictArray = [];

      // 获取展位数量数据
      let params6 = {
        type: 6
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params6).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getAllByTypeSeven() {
      let dictArray = [];

      // 获取交易团数据
      let params7 = {
        type: 7
      };

      return http.get(this.baseApi + "/api/efSupEventType/getAllByType", params7).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getEventType(eventCodes) {
      //获取事件类别
      let dictArray = [];

      let paramsEvent = {
        codes: eventCodes
      };

      return http.get(this.baseApi + "/api/efSupEventType/getEventTypes", paramsEvent).then(data => {
        data.forEach(element => {
          dictArray.push({
            code: element.code,
            label: element.value
          });
        });
        return dictArray;
      }).catch(error => { });
    },

    getDictionary() {
      Promise.all([this.getAllByTypeOne(), this.getAllByTypeTwo(), this.getAllByTypeThree(),
        this.getAllByTypeFour(), this.getAllByTypeFive(), this.getAllByTypeSix(),
        this.getAllByTypeSeven()]).then(([one, two, three, four, five, six, seven]) => {
          this.dictArray.confirmCondition = one;
          this.dictArray.companyOp = two;
          this.dictArray.companyBSteamOp = three;
          this.dictArray.boothApply = four;
          this.dictArray.boothNumber = five;
          this.dictArray.boothPosition = six;
          this.dictArray.businessTeamOperation = seven;

          Promise.all([this.getData()]).then(([temp]) => {
            Promise.all([this.getEventType(temp.eventCodes)]).then(([newTemp]) => {
              this.dictArray.eventType = newTemp;
              this.tackleData(temp);
            });
          });
        }).catch(e => {
        });
    },
    tackleData(temp) {
      //获取字典label
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        // element.typeCode = this.getDataLabel(element.typeCode, "handleType");   //处理类型
        if (element.typeCode === '1') {
          element.typeCode = "惩罚";
        } else {
          element.typeCode = "奖励";
        }
        element.ruleCodeValue = element.ruleCode;
        element.ruleCode = this.getDataLabel(element.ruleCode, "eventType");    //事件类别

        element.rpConCodesValues = element.rpConCodes;

        //认定条件
        if (element.rpConCodes != null) {
          let codeNum = element.rpConCodes.indexOf(",");
          if (codeNum > -1) {
            let lsArr = element.rpConCodes.split(",");
            let flArr = [];
            for (let j = 0; j < lsArr.length; j++) {
              const thisObj = lsArr[j];
              let fVal = this.getDataLabel(thisObj, "confirmCondition");
              flArr.push(
                {
                  "text": fVal
                });
            }
            // this.rpConContent = flArr;
            element.rpConCodes = flArr;
            //element.rpConCodes = flArr.join("\n");
          } else {
            element.rpConCodes = [
              {
                "text": this.getDataLabel(element.rpConCodes, "confirmCondition")
              }
            ];
          }
        } else {
          // element.rpConCodes = '-';
          element.rpConCodes = [
            {
              "text": '-'
            }
          ];
        }

        //面向企业措施
        if (element.companyOpCodes != null) {
          element.companyOpCodesLabel = [];

          element.companyOpCodesValue = element.companyOpCodes.split(',');
          let codeNum = element.companyOpCodes.indexOf(",");
          if (codeNum > -1) {
            let flag = 0;
            let lsArr = element.companyOpCodes.split(",");
            let flArr = [];

            for (let j = 0; j < lsArr.length; j++) {
              const thisObj = lsArr[j];
              let fVal = this.getDataLabel(thisObj, "companyOp");
              if (thisObj === '10001') {
                flag = 1;
                continue;
              }
              flArr.push(fVal);
              element.companyOpCodesLabel.push(this.deepClone(fVal));
            }

            if (flag) {
              flArr.push("其他:" + (element.companyOpOther == null ? "" : element.companyOpOther));
              element.companyOpOtherVal = (element.companyOpOther == null ? "" : element.companyOpOther);
              element.companyOpCodesLabel.push("其他");
            }
            element.companyOpCodes = flArr.join("\n");

          } else {
            element.companyOpCodes = this.getDataLabel(element.companyOpCodes, "companyOp");
            element.companyOpCodesLabel = this.getDataLabel(element.companyOpCodes, "companyOp");
          }
        } else {
          element.companyOpCodes = '-';
          element.companyOpCodesLabel = [];
        }

        //面向企业所属交易团的措施
        if (element.companyBSTeamOpCodes != null) {
          element.companyBSTeamOpCodesLabel = [];

          element.companyBSTeamOpCodesValue = element.companyBSTeamOpCodes.split(',');

          let codeNum = element.companyBSTeamOpCodes.indexOf(",");
          if (codeNum > -1) {
            let flag = 0;
            let lsArr = element.companyBSTeamOpCodes.split(",");
            let flArr = [];
            for (let j = 0; j < lsArr.length; j++) {
              const thisObj = lsArr[j];

              if (thisObj === '10001') {
                flag = 1;
                continue;
              }

              let fVal = this.getDataLabel(thisObj, "companyBSteamOp");
              flArr.push(fVal);
              element.companyBSTeamOpCodesLabel.push(this.deepClone(fVal));
            }

            if (flag) {
              flArr.push("其他:" + (element.companyBsTeamOpOther == null ? "" : element.companyBsTeamOpOther));
              element.companyBsOpOtherVal = (element.companyBsTeamOpOther == null ? "" : element.companyBsTeamOpOther);
              element.companyBSTeamOpCodesLabel.push("其他");
            }
            element.companyBSTeamOpCodes = flArr.join("\n");

          } else {
            element.companyBSTeamOpCodes = this.getDataLabel(element.companyBSTeamOpCodes, "companyBSteamOp");
            element.companyBSTeamOpCodesLabel = this.getDataLabel(element.companyBSTeamOpCodes, "companyBSteamOp");
          }
        } else {
          element.companyBSTeamOpCodes = '-';
          element.companyBSTeamOpCodesLabel = [];
        }
        //企业展位申请
        element.boothApplyCodeValue = this.deepClone(element.boothApplyCode);
        if (element.boothApplyCode != null) {
          element.boothApplyCode = this.getDataLabel(element.boothApplyCode, "boothApply");
        } else {
          element.boothApplyCode = '-';
        }
        //企业展位数量
        element.boothNumberCodeValue = this.deepClone(element.boothNumberCode);
        if (element.boothNumberCode != null) {
          element.boothNumberCode = this.getDataLabel(element.boothNumberCode, "boothNumber");
        } else {
          element.boothNumberCode = '-';
        }
        //安排企业展位位置
        element.boothPositionCodeValue = this.deepClone(element.boothPositionCode);
        if (element.boothPositionCode != null) {
          element.boothPositionCode = this.getDataLabel(element.boothPositionCode, "boothPosition");
        } else {
          element.boothPositionCode = '-';
        }

        //交易团
        element.btoCodeValue = this.deepClone(element.btoCode);
        if (element.btoCode != null) {
          element.btoCode = this.getDataLabel(element.btoCode, "businessTeamOperation");
        } else {
          element.btoCode = '-';
        }
      }
      this.tableData = temp;
    },
    //读取数据
    getData() {
      let params = {
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize,
        exhibitionNum: 0
      };
      return http.get(this.baseApi + "/api/rpRule/list", params).then(data => {
        let temp = data.records;
        temp.eventCodes = '';
        this.pageInfo.total = data.total;

        // 获取事件code
        temp.forEach(element => {
          temp.eventCodes += ',' + element.ruleCode;
        });
        temp.eventCodes = temp.eventCodes.substring(1);
        return temp;
        // this.getSpanArr(this.tableData);
      }).catch(error => { });
    },

    //改变背景色
    colClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'yelColor';
      }
      // if (parseFloat(row.applies) > 0 && columnIndex == 0) {
      //   return 'yelColor';
      // }
    },
    //深拷贝
    copyArray(arr) {
      return arr.map((e) => {
        if (typeof e === 'object') {
          return Object.assign({}, e);
        } else {
          return e;
        }
      });
    },
    deepClone(obj) { // 深拷贝
      let _obj = JSON.stringify(obj);
      let objClone = JSON.parse(_obj);
      return objClone;
    },
    //查询奖惩规则
    searchRule() {
      this.getData();
    },
    //修改规则
    rpRuleModify(row) {
      this.$router.push({
        path: '/rpRuleModify',
        query: row
      });
    },
    //获取label   code为编码，  key为字典字段
    getDataLabel(code, key) {
      let currentArr = this.dictArray[key];
      let thisVal = '';
      currentArr.forEach(function (value) {
        if (code === value.code) {
          thisVal = value.label;
        }
      });
      return thisVal;
    },
    // getSpanArr(data) {
    //   for (let i = 0; i < data.length; i++) {
    //     if (i === 0) {
    //       this.spanArr.push(1);
    //       this.pos = 0;
    //     } else if (data[i].typeCode === data[i - 1].typeCode) {
    //       // 判断当前元素与上一个元素是否相同
    //       this.spanArr[this.pos] += 1;
    //       this.spanArr.push(0);
    //     } else {
    //       this.spanArr.push(1);
    //       this.pos = i;
    //     }
    //   }
    // },
    cellMerge({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      // var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      // /* 获取二进制字符串作为输出 */
      // var wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array"
      // });
      // try {
      //   FileSaver.saveAs(
      //     //Blob 对象表示一个不可变、原始数据的类文件对象。
      //     //Blob 表示的不一定是JavaScript原生格式的数据。
      //     //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
      //     //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     //设置导出文件名称
      //     "sheetjs.xlsx"
      //   );
      // } catch (e) {
      //   // if (typeof console !== "undefined") {
      //   // }
      // }
      // return wbout;
      this.getRpRuleExport(this.downloadParams);
    },
    //翻页
    handleCurrentChange(current) {
      this.pageInfo.currentPage = current;
      Promise.all([this.getData()]).then(([temp]) => {
        Promise.all([this.getEventType(temp.eventCodes)]).then(([newTemp]) => {
          this.dictArray.eventType = newTemp;
          this.tackleData(temp);
        });
      });
    }
  }
};
</script>

