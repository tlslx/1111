<template>
  <el-page>
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid" :table-name="tableName" :primary-key="primaryKey"
        :edit-columns="editColumns" :before-submit="beforeSubmit" :after-submit="afterSubmit"
        :after-add="afterAdd" :after-edit="afterEdit">
      </el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons @view-change="onViewChange" @del="onDel" @add="onAdd" @edit="onEdit()" @view="onEdit(null,true)" @exp="onExp">
        <el-button v-for="button in customButtons" :type="button.theme || 'primary'"
          @click="button.handler" :key="button.text" v-right="button.action">
          {{button.text}}
        </el-button>
      </el-page-buttons>
      <!--查询条件-->
      <el-page-query :options="queryColumns" @query="onQuery"></el-page-query>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" :row-key="primaryKey"
          :data-url="apiUrl.query" :delete-url="apiUrl.del" @delete-success="onDeleteSuccess">
          <el-table-column width="118">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" type="primary" @click="onEdit(scope.row)"></el-button>
              <el-button v-right.delete icon="el-icon-delete" type="danger" @click="onDel(scope.row)"></el-button>
              <el-button v-right.view icon="el-icon-view" type="success" @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column>
          <el-table-column v-for="item in tableColumns" :key="item.field" :prop="item.field"
            :label="item.title" :width="item.width" :sortable="item.sortable" :formatter="item.formatter">
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from '@/components/framework/pageTemplate/singleTableForm';
import listPageBase from '@/components/framework/mixins/listPageBase';
import listPageTemplateBase from '@/components/framework/mixins/listPageTemplateBase';
export default {
  name: 'SingleTablePage',
  mixins: [listPageBase, listPageTemplateBase],
  data () {
    return {
      pageId: this.id,
      editPage
    };
  },
  methods: {
    onAdd () {
      if (this.$utility.isFunction(this.beforeAdd) && this.beforeAdd() === false) {
        return;
      }
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
      if (!isView && this.$utility.isFunction(this.beforeEdit) && this.beforeEdit(_row) === false) {
        return;
      }
      this.$refs['editpage'].open({
        params: { id: row['detailTableId'] },
        isEdit: true,
        isView: isView
      });
    },
    onQuery (queryParams) {
      this.queryParams = queryParams;
    },
    onDel (row) {
      if (this.$utility.isFunction(this.beforeDelete) && this.beforeDelete(row) === false) {
        return;
      }
      this.$refs['datagrid'].delete(row);
    },
    onExp () {
      this.$message('点击导出');
    },
    onViewChange (command) {
      // this.queryParams.view = command
      this.onQuery();
    },
    onDeleteSuccess (data) {
      if (this.$utility.isFunction(this.afterDelete)) {
        this.afterDelete(data);
      }
    }
  }
};
</script>
