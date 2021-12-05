<template>
  <el-page ref="sysFeedbackRate">
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
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="feedbackRateId"
          data-url="/api/sysFeedbackRate/getListPage" delete-url="/api/sysFeedbackRate/deleteBatchIds" >
          <el-table-column prop="sysName" label="系统名称"  width="100" sortable="custom"></el-table-column>
          <el-table-column prop="moduleName" label="模块路径" sortable="custom"></el-table-column>
          <el-table-column prop="modulePath" label="模块路径"  sortable="custom"></el-table-column>
          <el-table-column prop="score" label="评分" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="remark" label="备注" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="评价日期"  sortable="custom"></el-table-column>
          <el-table-column prop="creatorName" label="评价者"  sortable="custom"></el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from '@/pages/manager/sysFeedbackRateEdit';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'SysFeedbackRate',
  mixins: [listPageBase],
  data () {
    return {
      primaryKey: "feedbackRateId",
      pageId: 'sysFeedbackRatePage',
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
