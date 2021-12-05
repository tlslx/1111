<template>
  <el-page ref="sysRole">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid" @refresh="onRefresh"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons 
        @refresh="onRefresh"
        @del="onDel" 
        @add="onAdd" 
        @edit="onEdit()" 
        @view="onEdit(null,true)" 
        @exp="onExp"
        >
      </el-page-buttons>
      <el-page-query :options="queryOptions" @query="onQuery" :width="300"></el-page-query>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" 
          :query-params="queryParams" 
          row-key="roleId"
          data-url="/api/sysRole/getListPage" 
          delete-url="/api/sysRole/deleteBatchIds"
          :default-sort="gridDefaultSort"
          @delete-success="deleteSuccess"
          >
          <el-table-column prop="roleName" label="角色名称" fit sortable="custom"></el-table-column>
          <!-- <el-table-column prop="roleType" label="角色类型" width="150" sortable="custom"></el-table-column> -->
          <el-table-column prop="remark" label="备注" fit sortable="custom"></el-table-column>
          <!-- <el-table-column prop="roleId" label="" width="100" sortable="custom"></el-table-column> -->
          <!-- <el-table-column prop="roleLevel" label="" width="100" sortable="custom"></el-table-column> -->
          <el-table-column prop="orderNo" label="排序" min-width="100" sortable="custom" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" min-width="100" sortable="custom" align="center" :formatter="dataDict"></el-table-column>
          <!-- <el-table-column prop="systemId" label="SYS_SYSTEM_INFO/SYSTEM_ID" width="100" sortable="custom"></el-table-column> -->
          <el-table-column width="150" align="center" label="操作"  fixed="right">
            <template slot-scope="scope">
              <el-button type="text" v-right.edit @click="onEdit(scope.row)" title="编辑">编辑</el-button>
              <el-button type="text" v-right.delete @click="onDel(scope.row)" title="删除">删除</el-button>
              <el-button type="text" v-right.view @click="onEdit(scope.row,true)" title="查看">查看</el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/unifiedUser/systemManagement/roleInfoEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysRole",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "roleId",
      pageId: "5f4facc378ee4de48f992bfcb07aef8d",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: [
        {
          field: "roleName",
          title: "角色名称",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "remark",
          title: "备注",
          findType: "LIKE",
          component: "ElInput"
        }
      ]
    };
  },
  computed: {
    gridDefaultSort() {
      return { prop: "orderNo", order: "ascending" };
    }
  },
  methods: {
    deleteSuccess() {
      this.$message.success("删除成功！");
    }
  }
};
</script>
