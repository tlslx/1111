<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="设置规则" name="first">
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
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          <el-button class="formStyle" type="primary">导入贫困县数据</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="交易团范围" prop></el-table-column>
        <el-table-column align="center" label="展区类别范围" prop></el-table-column>
        <el-table-column align="center" label="特装展位数量范围" prop>
          <template slot-scope>
            <el-input v-model="tableData"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="特装截至录入时间" prop>
          <template slot-scope>
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标摊展位数量范围" prop>
          <template slot-scope>
            <el-input v-model="tableData"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标摊截至录入时间" prop>
          <template slot-scope>
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" label="统一布展展位数量范围" prop>
          <template slot-scope>
            <el-input v-model="tableData"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="统一布展截至录入时间" prop>
          <template slot-scope>
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" label="中央通道展位数量范围" prop>
          <template slot-scope>
            <el-input v-model="tableData"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="中央通道截至录入时间" prop>
          <template slot-scope>
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
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
        <el-form :model="addForm" :rules="rules" :inline="true" ref="ruleForm" label-width="120px">
          <el-form-item label="交易团范围">
            <el-select v-model="addForm" multiple filterable allow-create default-first-option clearable class="wid">
              <el-option label value></el-option>
            </el-select>
            <!-- <el-select v-model="addForm.exhibitionArea" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="展区类别范围">
            <el-select v-model="addForm" multiple filterable allow-create default-first-option clearable class="wid">
              <el-option label value></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特装展位数量范围">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="0-12" value="0-12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特装截至录入时间">
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="标摊展位数量范围">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="0-12" value="0-12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标摊截至录入时间">
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="统一布展展位数量范围">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="0-12" value="0-12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统一布展截至录入时间">
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="中央通道展位数量范围">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="0-12" value="0-12"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中央通道截至录入时间">
            <el-date-picker v-model="tableData" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <div class="divp">
            <el-button type="primary" @click="isExhibit = false">保存</el-button>
            <el-button @click="isExhibit = false">取消</el-button>
          </div>
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
.wid {
  width: 300px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
