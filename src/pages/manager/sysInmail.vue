<template>
  <el-page ref="sysInmail">
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
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="inmailId"
          data-url="/api/sysInmail/getListPage" delete-url="/api/sysInmail/deleteBatchIds"
          :showCheckbox=false :clickRowToSelect=true :singleSelect=true :highlightCurrentRow=true>
          <el-table-column prop="title" label="标题"  sortable="custom"></el-table-column>
          <el-table-column prop="inmailClassifier" label="类型" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="operatelink" label="链接" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="postTime" label="发送日期" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="endTime" label="失效日期" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="source" label="来源" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="startTime" label="生效日期" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="Status" label="状态" width="100" sortable="custom"></el-table-column>
          <el-table-column width="108" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button  v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button>
                <el-button  v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button>
                <el-button  v-right.view icon="el-icon-view" @click="onEdit(scope.row,true)"></el-button>
              </template>
            </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from '@/pages/manager/sysInmailEdit';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'SysInmail',
  mixins: [listPageBase],
  data () {
    return {
      primaryKey: "inmailId",
      pageId: 'sysInmailPage',
      editPage,
      dataView: '',
      queryParams: [],
      queryOptions: [
      ]
    };
  }
};
</script>
