<template>
  <el-page ref="sysSsoOnlineInfo">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" data-grid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons
        @view-change="onViewChange"
        @del="onDel"
        @add="onAdd"
        @edit="onEdit()"
        @view="onEdit(null,true)"
        @exp="onExp"
        @refresh="onRefresh"
        :add="false"
        :edit="false"
        :del="false"
        :view="false"
        :exp="false"
      ></el-page-buttons>
      <el-page-query :options="queryOptions" @query="onQuery" :width="300"></el-page-query>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid
          ref="datagrid"
          :height="scope.height-8"
          :query-params="queryParams"
          :show-checkbox="false"
          :default-query-params="defaultQueryParams"
          :default-sort="gridDefaultSort"
          row-key="infoId"
          data-url="/api/sysSsoOnlineInfo/getListPage"
          delete-url="/api/sysSsoOnlineInfo/deleteBatchIds"
        >

          <el-table-column width="100" label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <!-- <el-button v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button> -->
              <!-- <el-button v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button> -->
              <el-button type="text" v-right.view @click="onEdit(scope.row,true)">查看</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="" label="序号" width="80" sortable="custom"></el-table-column> -->
          <el-table-column prop="account" label="账号" min-width="180" sortable="custom"></el-table-column>
          <el-table-column prop="userName" label="用户名称" min-width="180"></el-table-column>
          <el-table-column prop="loginIp" label="用户IP" min-width="180"></el-table-column>
          <el-table-column prop="loginOs" label="用户操作系统" min-width="200"></el-table-column>
          <el-table-column prop="createDate" label="登录时间" min-width="180" sortable="custom"></el-table-column>
          <el-table-column prop="loginExpires" label="登录到期" min-width="180" sortable="custom"></el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/unifiedUser/onlineQuery/sysSsoOnlineInfoEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysSsoOnlineInfo",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "infoId",
      pageId: "sysSsoOnlineInfoPage",
      editPage,
      dataView: "",
      queryParams: [],
      defaultQueryParams: [{
        Name: "loginExpires",
        FindType: "GTE",
        Values: [Date.format(new Date(), "yyyy-MM-dd")]
      }],
      queryOptions: [
        {
          field: "account",
          title: "账号",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "userName",
          title: "用户名称",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "loginExpires",
          title: "登录到期",
          findType: "EQ",
          component: "ElDatePicker"
        }
      ]
    };
  },
  methods: {},
  computed: {
    gridDefaultSort() {
      return { prop: "userName,createDate", order: "desc" };
    }
  }
};
</script>
