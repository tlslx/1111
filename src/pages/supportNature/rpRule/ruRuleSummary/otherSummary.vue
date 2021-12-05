/**
 * @file 其他部门奖惩汇总
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
.el-table__body .el-table__row .el-button {
  padding: 4px 6px;
}
.el-table th > .cell,
.el-table .cell {
  font-size: 12px;
}
</style>

<template>
  <el-container>
    <el-header>
      <span>其他部门奖惩汇总</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col>
          <div class="grid-content">
            <el-form ref="form" label-width="120px" :inline="true">
              <el-form-item label="届数：">
                <el-select v-model="value" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in exhibitionSession" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属事件类别：">
                <el-select v-model="eveTypeVal" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in eveType" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="起始届数：">
                <el-select v-model="startTime" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in exhibitionSession" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="结束届数：">
                <el-select v-model="endTime" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in exhibitionSession" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属交易团：">
                <el-select v-model="businessDelegationVal" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in businessDelegation" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="颁布单位：">
                <el-select v-model="issueIdListVal" placeholder="请选择" style="width:150px" clearable>
                  <el-option v-for="item in issueIdList" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchRule" style="margin-left:15px">查询</el-button>
                <el-button @click="clearOpinion" style="margin-left:15px">清空</el-button>
                <el-button @click="exportExcel" type="text">下载XLS</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <!-- <el-col :span="12">
          <div class="grid-content">
            <span>
              <el-button @click="exportExcel" type="text">下载XLS</el-button>
            </span>
          </div>
        </el-col> -->
      </el-row>
      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" v-loading="loading" height="490" style="width: 100%" id="out-table">
          <el-table-column fixed="left" align="center" width="50">
            <template>
              <el-checkbox></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="rpTypeCode" label="事件类别" align="center" width="150"></el-table-column>
          <el-table-column prop="companyName" label="企业" align="center" width="90"></el-table-column>
          <el-table-column prop="businessDelegationText" label="所属交易团" align="center" width="90"></el-table-column>
          <el-table-column prop="limit" label="处理期限" align="center" width="115"></el-table-column>
          <el-table-column prop="cognizanceBasis" label="依据" align="center" width="385"></el-table-column>
          <el-table-column prop="issueText" label="颁布单位" align="center" width="85"></el-table-column>
          <el-table-column prop="deptText" label="中心联络部门" align="center" width="85"></el-table-column>
          <el-table-column prop="exhibitionNum" label="届别" align="center" width="85"></el-table-column>
          <el-table-column prop="start" label="起始届数" align="center" width="85"></el-table-column>
          <el-table-column label="结束届数" align="center" width="85">
            <template slot-scope="scope">
              {{scope.row.start-1+scope.row.limit}}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center" width="120">
             <template slot-scope="scope">
              <span v-if="scope.row.status === 0">待审核</span>
              <span v-else-if="scope.row.status === 1">审核通过</span>
              <span v-else>审核不通过</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="220">
            <template slot-scope="scope">
              <el-button type="primary" size="medium" @click="seeRule(scope.row)">查看</el-button>
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
import { $helper } from "@/scripts/project/utils";
// 引入导出Excel表格依赖
// import FileSaver from "file-saver";
// import XLSX from "xlsx";
export default {
  data() {
    return {
      //字典数组
      dictArray: {
        eventType: []   //事件类别
      },
      loading: true,
      exhibitionSession: [],
      value: "126",
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      agreeIndex: -1,
      disagreeIndex: -1,
      reasonForm: {
        reason: ''
      },
      eveTypeVal: '',
      eveType: [],
      issueIdList: [],   //颁布单位
      issueIdListVal: '',
      businessDelegation: [],   //交易团(所属交易团)
      businessDelegationVal: '',
      startTime: '', //起始时间
      endTime: '',  //届数时间
      baseApi: process.env.API_SN_URL,
      baseApL: process.env.API_BASE_URL,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    this.getDictionary();
    this.getBusinesslist(); // 获取全部所属交易团
    this.getissueIdList(); // 获取所属部门
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"]),
    downloadParams() {
      return {
        approveStatus: 1, // 已审核
        exhibitionNum: this.value,
        start: this.startTime,
        end: this.endTime,
        issueId: this.issueIdListVal,
        unitId: this.businessDelegationVal,
        typeCode: this.eveTypeVal
      };
    }
  },
  methods: {
    ...mapActions("ruRuleSummary", ["getDownloadListjfhz"]),
    // 获取所属部门
    getissueIdList() {
       // 获取事件类别
      let paramsL = {
        dictCodes: '',
        eventCode: '',
        type: ''
      };
      http.get(this.baseApi + "/api/efSupEventType/selectDictByCodes", paramsL).then(data => {
        data.forEach(element => {
          this.eveType.push({
            code: element.code,
            label: element.value
          });
        });
      }).catch(error => { });
      this.dictArray.eventType = this.eveType;
       // 获取颁布单位和中心单位
      let params3 = {
        CustomQueryParams: [
          {
            FindType: "EQ",
            Name: "parentId",
            Values: [
              "8a706d0898954e4c910fb73769bd4ae9"
            ]
          },
          {
            FindType: "EQ",
            Name: "state",
            Values: [
              "1"
            ]
          }
        ],
        OrderModelField: [
          {
            OrderByField: "deptCode",
            asc: true
          }
        ]
      };
      params3 = encodeURI(JSON.stringify(params3));
      http.get(this.baseApL + "/api/sysDepartment/getListAll?json=" + params3).then(data => {
        data.records.forEach(element => {
          this.issueIdList.push({
            code: element.deptId,
            label: element.deptName
          });
        });
      }).catch(error => { });
    },
    // 获取全部所属交易团
    getBusinesslist() {
      let quers = {
        current: '1',
        size: '10000'
      };
      http.get(this.baseApi + "/api/sysDepartment/searchBusinessDelegation", quers).then(data => {
        data.records.forEach(element => {
          this.businessDelegation.push({
            code: element.deptId,
            label: element.deptName
          });
        });
      }).catch(error => { });
    },
     //获取事件类别字典
    getDictionary() {
      // 获取所有展届
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.exhibitionSession.push({
            code: element.exhibitionNum,
            label: element.exhibitionNum
          });
        });
      }).catch(error => { });
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //获取数据列表
    getData(val, type, unit, issue, start, end) {
      let params = {
        current: this.pageInfo.currentPage,
        exhibitionNum: this.value,
        size: this.pageInfo.pageSize,
        typeCode: type, //事件类别
        unitId: unit,   //参展单位
        issueId: issue,  //颁布单位
        start: start,    //起始届数
        end: end,
        approveStatus: 1
      };
      http.get(this.baseApi + "/api/rpRecord/list", params).then(data => {
        this.tableData = data.records || [];
        this.pageInfo.total = data.total || 0;
        if (this.tableData.length > 0) {
          //转变code为label
          for (let index = 0; index < this.tableData.length; index++) {
            const element = this.tableData[index];
            element.areaCode = element.exhibitionAreaCode;
          //事件类别
            if (element.rpTypeCode != null) {
              element.rpTypeCode = $helper.getDicLabel(this.dictArray.eventType, element.rpTypeCode);
            } else {
              element.rpTypeCode = '-';
            }
            //处理期限
            element.limit = element.limit;  // + "届";
            //届别
            element.exhibitionNum = element.exhibitionNum; // + "届";
            //起始届数
            // element.start = element.start + "届";
          }
        }
      }).catch(error => { });
    },
    searchRule() {
      this.pageInfo.currentPage = 1;
      this.getData(this.value, this.eveTypeVal, this.businessDelegationVal, this.issueIdListVal, this.startTime, this.endTime);
    },
    clearOpinion() {
      this.value = '';
      this.eveTypeVal = '';
      this.businessDelegationVal = '';
      this.issueIdListVal = '';
      this.startTime = '';
      this.endTime = '';
      this.getData(this.value, this.eveTypeVal, this.businessDelegationVal, this.issueIdListVal, this.startTime, this.endTime);
    },
    seeRule(row) {
      this.$router.push({
        path: '/seeDetail',
        query: row
      });
    },

    //翻页
    handleCurrentChange(current) {
      this.pageInfo.currentPage = current;
      this.getData(this.value, this.eveTypeVal, this.businessDelegationVal, this.issueIdListVal, this.startTime, this.endTime);
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
      this.downloadParams.exhibitionNum = (this.downloadParams.exhibitionNum == null ? '' : this.downloadParams.exhibitionNum);
      this.getDownloadListjfhz(this.downloadParams);
    }
  },
  updated() {
    this.loading = false;
  },
  mounted() {
    this.getData(this.value, this.eveTypeVal, this.businessDelegationVal, this.issueIdListVal, this.startTime, this.endTime);
  }
};
</script>

