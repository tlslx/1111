<template>
  <el-page ref="sysRole">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons @view-change="onViewChange" @del="onDel" @add="onAdd" @edit="onEdit()" @view="onEdit(null,true)" @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="roleId"
          data-url="/api/sysRole/getListPage" delete-url="/api/sysRole/deleteBatchIds">
          
          <el-table-column prop="roleName" label="角色名称" width="200" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="roleType" label="角色类型" width="150" sortable="custom"></el-table-column> -->
          <el-table-column prop="remark" label="备注" width="200" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="roleId" label="" width="100" sortable="custom"></el-table-column> -->
          <!-- <el-table-column prop="roleLevel" label="" width="100" sortable="custom"></el-table-column> -->
          <el-table-column prop="orderNo" label="排序" width="100" sortable="custom" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" width="100" sortable="custom" align="center" :formatter="dataDict"></el-table-column>
          <!-- <el-table-column prop="systemId" label="SYS_SYSTEM_INFO/SYSTEM_ID" width="100" sortable="custom"></el-table-column> -->
          <el-table-column width="160" label="操作">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)" title="编辑"></el-button>
              <el-button v-right.delete icon="el-icon-delete" @click="onDel(scope.row)" title="删除"></el-button>
              <el-button v-right.view icon="el-icon-view" @click="onEdit(scope.row,true)" title="查看"></el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/manager/sysRoleEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysRole",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "roleId",
      pageId: "sysRolePage",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: []
    };
  },
  methods: {}
};
</script>
