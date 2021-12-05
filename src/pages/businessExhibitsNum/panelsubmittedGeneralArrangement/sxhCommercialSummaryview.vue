<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会一般性展位数量方案汇总查看" name="first">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="交易团">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formData"></el-input>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布展类型">
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
        <el-table-column align="center" label="广交会编码" prop></el-table-column>
        <el-table-column align="center" label="企业中文名称" prop></el-table-column>
        <el-table-column align="center" label="海关编码" prop></el-table-column>
        <el-table-column align="center" label="联系人" prop></el-table-column>
        <el-table-column align="center" label="展区" prop></el-table-column>
        <el-table-column align="center" label="申请数量" prop></el-table-column>
        <el-table-column align="center" label="安排特装数" prop></el-table-column>
        <el-table-column align="center" label="安排标摊数" prop></el-table-column>
        <el-table-column align="center" label="安排统一布展数" prop></el-table-column>
        <el-table-column align="center" label="安排卡车通道数" prop></el-table-column>
        <el-table-column align="center" label="安排总数" prop></el-table-column>
        <el-table-column align="center" label="申请粘连展位数量" prop></el-table-column>
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
