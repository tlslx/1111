<template>
  <div>
    <!-- 表头 -->
    <header style="padding-left: 50px;">
      <span>排序：</span>
      <el-button size="small" type="danger">展品名称</el-button>
      <el-button size="small">展品类别</el-button>
      <el-button size="small">更新时间</el-button>
      <el-button type="danger" style="float: right; margin-right: 100px;" @click="handelAdd">+新增展品</el-button>
    </header>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label=""
        width="30">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="展品名称">
        <template slot-scope="scope">
          <div style="width: 100px;">
            <div style="width: 100px; height: 100px; background: pink;">
              Logo
            </div>
            <p style="text-align: center;"><a href="#">{{scope.row.name}}</a></p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="category"
        label="展品类别">
      </el-table-column>
      <el-table-column
        prop="status"
        label="审核状态">
      </el-table-column>
      <el-table-column
        prop="result"
        label="展商展品查询系统显示结果">
      </el-table-column>
      <el-table-column
        prop="updated"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="">
          <el-button>修改</el-button>
          <el-button>删除</el-button>
          <el-button><span style="color: #00f">设为本届</span></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-form :inline="true">
      <el-form-item>
        <el-checkbox v-model="checked"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button>删除</el-button>
      </el-form-item>
      <el-form-item style="margin-left: 24%;">
        <el-pagination
          style="margin-top: 5px;"
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="paginationData.pageSize">
        </el-pagination>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="masked">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: "",
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 100
      },
      tableData: [
        {
          checked: true,
          name: "美菱变频空调",
          category: "家电/智能家居用品",
          status: "审核通过",
          result: "正常",
          updated: "2008-08-07 20:18:22"
        },
        {
          checked: true,
          name: "美菱变频空调",
          category: "家电/智能家居用品",
          status: "审核通过",
          result: "正常",
          updated: "2008-08-07 20:18:22"
        },
        {
          checked: false,
          name: "美菱变频空调",
          category: "家电/智能家居用品",
          status: "审核通过",
          result: "正常",
          updated: "2008-08-07 20:18:22"
        }
      ]
    };
  },
  methods: {
    masked() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handelAdd() {
      this.$emit('onChildTwo', false);
    }
  }
};
</script>


