<template>
  <el-page ref="infoIfiPersonUser">
    <template slot="header">
      <!--页面对话框-->
      <el-tabs>
        <el-tab-pane label="个人信息 > 审核记录"></el-tab-pane>
      </el-tabs>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data class="top-one">
        <el-datagrid
          ref="datagrid"
          :height="scope.height-8"
          row-key="userId"
          data-url="/api/infoIfiPersonUser/getListPage"
          delete-url="/api/infoIfiPersonUser/deleteBatchIds"
        >
          <el-table-column prop="createDate" label="审核时间:" sortable="custom"></el-table-column>
          <el-table-column prop="creatorName" label="审核进度:" sortable="custom"></el-table-column>
          <el-table-column prop="modifierName" label="审核结果:" sortable="custom"></el-table-column>
          <el-table-column prop="modifyDate" label="审核意见:" sortable="custom"></el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
export default {
  data() {
    return {
      pageId: "infoIfiPersonUserPage",
      dataView: "",
      queryParams: [],
      queryOptions: []
    };
  },
  methods: {}
};
</script>

<style scoped>
.top-one {
  margin-top: 1cm;
}
</style>
