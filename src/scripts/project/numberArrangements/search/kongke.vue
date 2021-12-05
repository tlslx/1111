<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="设置规则" name="first">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="">
          <el-select v-model="formData" clearable>
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="" prop=""></el-table-column>
        <el-table-column align="center" label="" prop=""></el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" @click="isExhibit = true">新增</el-button>
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
      <!-- 新增 -->
      <el-dialog title="新增" :visible.sync="isExhibit" width="950px">
        <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item label="">
            <el-select v-model="addForm" clearable>
              <el-option label="" value=""></el-option>
            </el-select>
            <!-- <el-select v-model="addForm.exhibitionArea" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label>
            <el-button type="primary" @click="isExhibit = false">保存</el-button>
            <el-button @click="handcancle">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
</style>
