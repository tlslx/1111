<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会一般性展位数量方案汇总查看" name="first">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="展期">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类别">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="非100%提交">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="交易团" prop></el-table-column>
        <el-table-column align="center" label="展期" prop></el-table-column>
        <el-table-column align="center" label="展位类别" prop></el-table-column>
        <el-table-column align="center" label="展位数（不含卡车通道展位）" prop></el-table-column>
        <el-table-column align="center" label="卡车通道展位数" prop></el-table-column>
        <el-table-column align="center" label="最终展位数" prop></el-table-column>
        <el-table-column align="center" label="交易团推荐特装数" prop></el-table-column>
        <el-table-column align="center" label="交易团推荐标摊数" prop></el-table-column>
        <el-table-column align="center" label="交易团推荐卡车通道数" prop></el-table-column>
        <el-table-column align="center" label="推荐总数" prop></el-table-column>
        <el-table-column align="center" label="交易团未推荐数" prop></el-table-column>
        <el-table-column align="center" label="交易团推荐百分比" prop></el-table-column>
        <el-table-column align="center" label="展位位置安排进度（以预置到交易团为准）" prop></el-table-column>
        <el-table-column align="center" label="企业展位位置安排进度（以预置到企业为准）" prop></el-table-column>
        <el-table-column align="center" label="已预置展位数（以预置到企业为准）" prop></el-table-column>
        <el-table-column align="center" label="剩余展位数（指未预置到企业为准）" prop></el-table-column>
        <el-table-column align="center" label="实际安排特装数" prop></el-table-column>
        <el-table-column align="center" label="实际安排标摊数" prop></el-table-column>
        <el-table-column align="center" label="实际安排卡车通道数" prop></el-table-column>
        <el-table-column align="center" label="100%提交" prop></el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" @click="isExhibit = true">下载</el-button>
      </div>
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="paginationData.total"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      tableData: [],
      isExhibit: false,
      addForm: {},
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      activeName: "first"
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 300px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
