<template>
  <el-page ref="sysDataDictItem">
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
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="dataDictItemId"
          data-url="/api/sysDataDictItem/getListPage" delete-url="/api/sysDataDictItem/deleteBatchIds">
          <el-table-column width="118">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" type="primary" @click="onEdit(scope.row)"></el-button>
              <el-button v-right.delete icon="el-icon-delete" type="danger" @click="onDel(scope.row)"></el-button>
              <el-button v-right.view icon="el-icon-view" type="success" @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="dataDictId" label="SYS_DICTIONARIES/DICTIONARY_ID" width="100" sortable="custom"></el-table-column> -->
          <!-- <el-table-column prop="dataDictItemId" label="主键（取公共框架生成的GUID）" width="100" sortable="custom"></el-table-column> -->
          <el-table-column prop="itemCode" label="字典项编码" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="itemRgb" label="字典项RGB" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="itemText" label="字典项文本" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="orderNo" label="排序" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="remark" label="备注" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="state" label="状态：1=有效/0=无效" width="100" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="systemId" label="SYS_SYSTEM_INFO/SYSTEM_CODE" width="100" sortable="custom"></el-table-column> -->
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from '@/pages/manager/sysDataDictItemEdit';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'SysDataDictItem',
  mixins: [listPageBase],
  data () {
    return {
      pageId: 'sysDataDictItemPage',
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
