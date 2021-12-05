/**
 * @file 处罚通知管理
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
.el-table th > .cell,
.el-table .cell {
  font-size: 12px;
}
</style>

<template>
  <el-container>
    <el-header>
      <span>处罚通知管理</span>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="18">
          <div class="grid-content">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="届数：">
                <el-select v-model="val" placeholder="请选择" style="width:150px">
                  <el-option v-for="item in options" :key="item.code" :label="item.label" :value="item.code"></el-option>
                </el-select>
                <span style="margin-left:30px">处罚通知管理名称：</span>
                <el-input v-model="name" style="width:195px"></el-input>
                <el-button type="primary" @click="searchNotice" style="margin-left:15px">查询</el-button>
                <el-button @click="clearOpinion" style="margin-left:15px">清空</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <span>
              <el-button @click="exportExcel" type="text">下载XLS</el-button>
            </span>
          </div>
        </el-col>
      </el-row>
      <template>
        <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
        <el-table :data="tableData" border :header-cell-style="tableHeaderColor" style="width: 100%" id="out-table">
          <el-table-column fixed="left" prop="name" label="处罚通知管理名称" align="center">
          </el-table-column>
          <el-table-column prop="modelFileName" label="模板" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="downloadFile(scope.row.fileId)">下载</el-button>
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
      form: {},
      options: [],
      name: '',
      val: 126,
      tableData: [],
      temp: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      baseApi: process.env.API_SN_URL
    };
  },
  created() {
    this.getDictionary();
    //获取展届
    if (this.$route.query.sessionValue) {
      this.val = this.$route.query.sessionValue.toString();
    }
  },
  computed: {
    ...mapGetters("rpRuleDictionary", ["rpRuleDictionaryData"]),
    downloadParams() {
      return {
        exhibitionNum: this.val
      };
    }
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getPunishNotificatonExport', 'getPunishNotificatonTemplateExport']), // 下载
    //获取字典
    getDictionary() {
      // 获取所有展届
      http.get(this.baseApi + "/api/exp/exhibitions/getListAll").then(data => {
        data.forEach(element => {
          this.options.push({
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
    getNotice() {
      let params = {
        current: this.pageInfo.currentPage,
        exhibitionNum: this.val,
        name: this.name,
        size: this.pageInfo.pageSize
      };
      http.get(this.baseApi + "/api/punishNotificaton/list", params).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
      }).catch(error => { });
    },
    searchNotice() {
      this.pageInfo.currentPage = 1;
      this.getNotice();
    },
    // 清空
    clearOpinion() {
      this.val = '';
      this.name = '';
      this.getNotice();
    },
    //下载文件
    downloadFile(_fileId) {
      this.getPunishNotificatonTemplateExport({ fileId: _fileId });
    },
    //翻页
    handleCurrentChange(current) {
      this.pageInfo.currentPage = current;
      this.getNotice();
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
      this.getPunishNotificatonExport(this.downloadParams);
    }

  },
  mounted() {
    this.getNotice();
  }
};
</script>

