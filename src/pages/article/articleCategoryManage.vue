<template>
  <el-page ref="articleCategoryManage">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" size="80%" :page="editPage" datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons @view-change="onViewChange" @del="onDel" @add="onAdd" @edit="onEdit()" @view="onEdit(null,true)" @exp="onExp">
      </el-page-buttons>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="categoryId"
          data-url="/api/article/category/getListPage" delete-url="/api/article/category/deleteBatchIds" >
          <el-table-column prop="category" label="分类" sortable="custom"></el-table-column>
          <el-table-column prop="department" label="部门" sortable="custom"></el-table-column>
          <el-table-column prop="creatorName" label="创建者" sortable="custom"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" sortable="custom"></el-table-column>
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
import editPage from '@/pages/article/articleCategoryEdit';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'articleCategoryManage',
  mixins: [listPageBase],
  data () {
    return {
      primaryKey: "categoryId",
      pageId: 'categoryPage',
      editPage,
      dataView: '',
      queryParams: [],
      queryOptions: [
      ]
    };
  },
  methods: {
  }
};
</script>
