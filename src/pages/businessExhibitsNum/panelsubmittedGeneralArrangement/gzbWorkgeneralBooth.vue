<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工作部查看修改安排方案" name="first">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="交易团">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="formData"></el-input>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="交易团" prop></el-table-column>
        <el-table-column align="center" label="广交会编码" prop></el-table-column>
        <el-table-column align="center" label="企业中文名称" prop></el-table-column>
        <el-table-column align="center" label="期数" prop></el-table-column>
        <el-table-column align="center" label="展区" prop></el-table-column>
        <el-table-column align="center" label="申请数量" prop></el-table-column>
        <el-table-column align="center" label="布展类型" prop></el-table-column>
        <el-table-column align="center" label="是否统一布展" prop></el-table-column>
        <el-table-column align="center" label="上届是否绿色特装" prop></el-table-column>
        <el-table-column align="center" label="所属贫困县" prop></el-table-column>
        <el-table-column align="center" label="产品类别" prop></el-table-column>
        <el-table-column align="center" label="交易团安排特装数" prop></el-table-column>
        <el-table-column align="center" label="交易团安排标摊数" prop></el-table-column>
        <el-table-column align="center" label="卡车通道安排数" prop></el-table-column>
        <el-table-column align="center" label="交易团安排总数" prop></el-table-column>
        <el-table-column align="center" label="粘连展位数量" prop></el-table-column>
        <el-table-column align="center" label="品牌粘连审核" prop></el-table-column>
        <el-table-column align="center" label="粘连数量审核" prop></el-table-column>
        <el-table-column align="center" label="操作" prop>
          <el-table-column align="center" label="操作">
            <el-button type="text">编辑</el-button>
            <el-button type="text">粘连性</el-button>
            <el-button type="text">贫困地区</el-button>
          </el-table-column>
        </el-table-column>
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
