<template>
  <el-page ref="articleManage">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" size="80%" :page="editPage" datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons @view-change="onViewChange" @del="onDel" @add="onAdd" @edit="onEdit()" @view="onEdit(null,true)" @exp="onExp">
      </el-page-buttons>
       <el-page-query :options="queryOptions" @query="onQuery" :width="200"></el-page-query>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" :query-params="queryParams" row-key="articleId"
          data-url="/api/article/getListPage" delete-url="/api/article/deleteBatchIds"
          :showCheckbox=false :clickRowToSelect=true :singleSelect=true :highlightCurrentRow=true >
          <el-table-column prop="category" label="分类" sortable="custom"></el-table-column>
          <el-table-column prop="title" label="标题" sortable="custom"></el-table-column>
          <el-table-column prop="author" label="作者" sortable="custom"></el-table-column>
          <el-table-column prop="top" label="置顶" sortable="custom"></el-table-column>
          <el-table-column prop="original" label="原创" sortable="custom"></el-table-column>
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
import editPage from "@/pages/article/articleEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "Article",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "articleId",
      pageId: "articlePage",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: [
        {
          field: "title",
          title: "标题",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "author",
          title: "作者",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "category",
          title: "分类",
          findType: "LIKE",
          component: "ElInput"
        }
      ]
    };
  }
};
</script>
