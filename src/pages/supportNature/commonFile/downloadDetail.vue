/**
 * @file 查看下载明细
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
</style>

<template>
  <el-container>
    <el-header>
      <span>查看下载明细</span>
      <el-button
        @click="goBack"
        style="float: right; margin-top: 15px;"
      >返回</el-button>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <el-form
              label-width="80px"
            >
              {{tableData.orgId}}  
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>
              <el-button
                @click="exportExcel"
                type="text"
              >下载XLS</el-button>
            </span>
            <!-- <span>
              <a href="javascript:void(0)">打印</a>
            </span> -->
          </div>
        </el-col>
      </el-row>

      <template>
        <el-table
          border
          :header-cell-style="tableHeaderColor"
          :data="tableData"
          height="520"
          style="width: 100%"
          id="out-table"
        >
          <el-table-column
            fixed="left"
            prop="downloadDate"
            label="下载时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="downloadPersonName"
            label="下载人"
            align="center"
          ></el-table-column>
        </el-table>
      </template>
    </el-main>
  </el-container>
</template>


<script>
// import http from "@/scripts/framework/http";
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import http from "@/scripts/framework/http";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [],
      baseApi: process.env.API_SN_URL
    };
  },
  created() {
   //接收参数
    let params = {
      fileExId: this.$route.query.fileExId
    };
    http.get(this.baseApi + "/api/fileManage/getDownloadInfo", params).then(data => {
      this.tableData = data;
    }).catch(error => { });
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f2f2f2;';
      }
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        // if (typeof console !== "undefined") {
        // }
      }
      return wbout;
    }
  },
  mounted() {

  }
};
</script>

