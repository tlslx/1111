<template>
  <el-page ref="operatorGroupManage">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" size="80%" :page="editPage" data-grid="datagrid"></el-page-dialog>
      <!--条件查询栏-->
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="id" data-url="/api/infoIfiPersonUser/getListPage" :showCheckbox="true" :clickRowToSelect="true" :highlightCurrentRow="false">
          <el-table-column prop="name" label="申请人" sortable="custom"></el-table-column>
          <el-table-column prop="idCardNo" label="身份证号码" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="申请时间" sortable="custom"></el-table-column>
          <el-table-column prop="status" label="状态" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="申请内容" sortable="custom"></el-table-column>
          <el-table-column prop="creatorName" label="审核人" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="审核时间" sortable="custom"></el-table-column>
          <el-table-column width="150" label="操作" fixed="right">
            <template>
              <el-button v-right.edit icon="el-icon-success">通过</el-button>
              <el-button v-right.delete icon="el-icon-error">拒绝</el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "infoIfiPersonUser",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "id",
      pageId: "infoIfiPersonUserPage",
      dataView: "",
      queryParams: [],
      queryOptions: [
        {
          field: "name",
          title: "姓名",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "idCardNo",
          title: "身份证号码",
          findType: "LIKE",
          component: "ElInput"
        }
      ]
    };
  }
};
</script>
