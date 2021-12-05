<template>
  <el-page ref="sysMessageTemplate">
    <template slot="header">
      <!--页面对话框，内容编辑页面-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid" size="95%"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons @view-change="onViewChange" @del="onDel" @add="onAdd" @edit="onEdit()" @view="onEdit(null,true)" @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="gridQueryParams" row-key="id"
          data-url="/api/sysMessageTemplate/getListPage" delete-url="/api/sysMessageTemplate/deleteBatchIds" @load-success="onLoadSuccess">
          <el-table-column prop="templateCode" label="模板编码" min-width="100" sortable="custom"></el-table-column>
          <el-table-column prop="templateName" label="模板名称" sortable="custom" fit="true"></el-table-column>
          <el-table-column prop="isValid" label="是否有效" sortable="custom" >     
            <template slot-scope="scope">{{ getDictionaryText('state', scope.row.isValid) }} </template>
          </el-table-column>
          <el-table-column prop="templateSysName" label="所属系统" sortable="custom"></el-table-column>
          <el-table-column prop="templateType" label="类型" min-width="100" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" min-width="100" sortable="custom" :formatter="date"></el-table-column>
          <el-table-column prop="creatorName" label="创建人" min-width="100" sortable="custom"></el-table-column>
          <el-table-column prop="modifierName" label="修改人" min-width="100" sortable="custom"></el-table-column>
          <el-table-column prop="modifyDate" label="修改时间" min-width="100" sortable="custom" :formatter="date"></el-table-column>
          <el-table-column width="180" label="操作" fixed="right">
          <template slot-scope="scope">
              <el-button type="text" v-right.edit @click="onEdit(scope.row)">编辑</el-button>
              <el-button type="text" v-right.delete @click="onDel(scope.row)">删除</el-button>
              <el-button type="text" v-right.view @click="onEdit(scope.row,true)">查看</el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from '@/pages/manager/sysMessageTemplateEdit';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'SysMessageTemplate',
  mixins: [listPageBase],
  data () {
    return {
      pageId: 'sysMessageTemplatePage',
      dataView: '',
      editPage,
      queryParams: [],
      queryOptions: [
      ]
    };
  },
  methods: {
    onLoadSuccess () {
    },
    // onAdd () {
    //   this.$refs['editpage'].open();
    // },
    // onEdit (_row, isView = false) {
    //   var row = _row;
    //   if (!row) {
    //     let gridSelection = this.$refs['datagrid'].getSelection();
    //     if (gridSelection.length === 0) {
    //       this.$message({ message: '请选择数据', type: 'warning' });
    //       return;
    //     } else if (gridSelection.length > 1) {
    //       this.$message({ message: '只能选择一条数据', type: 'warning' });
    //       return;
    //     } else {
    //       row = gridSelection[0];
    //     }
    //   }
    //   this.$refs['editpage'].open({
    //     params: { id: row['id'] },
    //     isEdit: true,
    //     isView: isView
    //   });
    // },
    // onQuery (queryParams) {
    //   this.queryParams = queryParams;
    // },
    // onDel (row) {
    //   this.$refs['datagrid'].delete(row);
    // },
    // onExp () {
    //   this.$message('导出按钮点击');
    // },
    onGo (page) {
      this.$router.push({ path: page });
    },
    onViewChange (value) {
      this.dataView = value;
    }
  },
  computed: {
    gridQueryParams () {
      let viewParam = [];
      // if (!String.isNullOrEmpty(this.dataView)) {
      // }
      return [].concat(this.queryParams, viewParam);
    }
  }
};
</script>
