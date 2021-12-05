<template>
  <el-page ref="sysMessageServiceConfig">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons @view-change="onViewChange" @del="onDel" @add="onAdd" @edit="onEdit()" @view="onEdit(null,true)"
        @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="id" data-url="/api/sysMessageServiceConfig/getListPage"
          delete-url="/api/sysMessageServiceConfig/deleteBatchIds">
          <el-table-column prop="configName" label="配置名称" fit sortable="custom"></el-table-column>
          <el-table-column prop="configType" label="类型" width="100" sortable="custom">
            <template slot-scope="scope">{{ getDictionaryText('messageType', scope.row.configType) }} </template>
          </el-table-column>
          <el-table-column prop="isValid" label="状态" width="100" sortable="custom">
            <template slot-scope="scope">{{ getDictionaryText('state', scope.row.isValid) }} </template>
          </el-table-column>
          <el-table-column prop="creatorName" label="创建人" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="100" :formatter="date" sortable="custom"></el-table-column>
          <el-table-column prop="modifierName" label="修改人" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="modifyDate" label="修改时间" width="100"  :formatter="date" sortable="custom"></el-table-column>
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
  import editPage from '@/pages/manager/sysMessageServiceConfigEdit';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: 'SysMessageServiceConfig',
    mixins: [listPageBase],
    data() {
      return {
        pageId: 'sysMessageServiceConfigPage',
        submitType: "json",
        editPage,
        dataView: '',
        queryParams: [],
        queryOptions: []
      };
    },
    methods: {
    }
  };

</script>
