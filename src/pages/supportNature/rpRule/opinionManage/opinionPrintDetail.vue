/**
 * @file 处理意见打印详情
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
      <span>打印详情</span>
      <el-button @click="goBack" style="float: right; margin-top: 15px;">返回</el-button>
    </el-header>
    <el-main>
      <template>
        <el-table border :header-cell-style="tableHeaderColor" :data="tableData" style="width: 100%" v-loading="loading">
          <el-table-column fixed="left" prop="operateTime" label="打印时间" align="center">
          </el-table-column>
          <el-table-column fixed="left" prop="operater" label="打印人" align="center">
          </el-table-column>
        </el-table>
      </template>
    </el-main>
  </el-container>
</template>
<script>
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
    }
  },
  updated() {
  },
  mounted() {
    this.loading = false;
  }
};
</script>


