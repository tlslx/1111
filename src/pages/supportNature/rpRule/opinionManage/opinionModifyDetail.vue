/**
 * @file 查看修改详情
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
      <span>修改详情</span>
      <el-button @click="goBack" style="float: right; margin-top: 15px;">返回</el-button>
    </el-header>
    <el-main>
      <el-row style="margin-bottom:20px">
        <el-col :span="12">
          <div class="grid-content">
            <el-form label-width="80px">
              {{tableData.companyId}}修改详情
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>
              <!-- <a href="javascript:void(0)">下载XLS</a> -->
              <el-button @click="exportExcel" type="text">下载XLS</el-button>
            </span>
            <!-- <span>
              <a href="javascript:void(0)">打印</a>
            </span> -->
          </div>
        </el-col>
      </el-row>

      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" height="520" style="width: 100%" id="out-table">
          <el-table-column fixed="left" prop="modifyDate" label="修改时间" align="center">
          </el-table-column>
          <el-table-column prop="modifierName" label="修改人" align="center"></el-table-column>
        </el-table>
      </template>
    </el-main>
  </el-container>
</template>

<script>
// import http from "@/scripts/framework/http";
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      baseApi: process.env.API_SN_URL
    };
  },
  created() {
    this.tableData = this.$route.query.data;   //接收参数
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
      let opinionId = '';
      if (this.tableData.length > 0) {
        opinionId = this.tableData[0].opinionId;
      }
      kindo.util.getdown(`${process.env.API_SN_URL}/api/opinion/exportOpinion?opinionId=` + opinionId, "修改详情.xls");
    }

  },
  updated() {
  },
  mounted() {
    this.loading = false;
  }
};
</script>

