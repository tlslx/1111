<template>
  <el-page ref="sysUserRole">
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
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="userRoleId"
          data-url="/api/sysUserRole/getListPage" delete-url="/api/sysUserRole/deleteBatchIds">
          <el-table-column width="118">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" type="primary" @click="onEdit(scope.row)"></el-button>
              <el-button v-right.delete icon="el-icon-delete" type="danger" @click="onDel(scope.row)"></el-button>
              <el-button v-right.view icon="el-icon-view" type="success" @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="creatorId" label="" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="creatorName" label="" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="roleId" label="" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="userId" label="" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="userRoleId" label="" width="100" sortable="custom"></el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from '@/pages/manager/sysUserRoleEdit';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'SysUserRole',
  mixins: [listPageBase],
  data () {
    return {
      pageId: 'sysUserRolePage',
      editPage,
      dataView: '',
      queryParams: [],
      queryOptions: [
      ]
    };
  },
  methods: {
    onAdd () {
      this.$refs['editpage'].open();
    },
    onEdit (row, isView = false) {
      let _row = row;
      if (!_row) {
        let gridSelection = this.$refs['datagrid'].getSelection();
        if (gridSelection.length === 0) {
          this.$message({
            message: '请选择数据',
            type: 'warning'
          });
          return;
        } else if (gridSelection.length > 1) {
          this.$message({
            message: '只能选择一条数据',
            type: 'warning'
          });
          return;
        } else {
          _row = gridSelection[0];
        }
      }
      this.$refs['editpage'].open({
        params: { id: _row['detailTableId'] },
        isEdit: true,
        isView: isView
      });
    },
    onQuery (queryParams) {
      this.queryParams = queryParams;
    },
    onDel (row) {
      this.$refs['datagrid'].delete(row);
    },
    onExp () {
      this.$message('导出按钮点击');
    },
    onViewChange (value) {
      this.dataView = value;
    }
  }
};
</script>
