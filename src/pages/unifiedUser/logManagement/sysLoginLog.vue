<template>
  <el-page ref="sysLoginLog">
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
          :default-sort="gridDefaultSort"
          :show-checkbox="false"
          sortable="custom"
          row-key="id"
          data-url="/api/sysLoginLog/getListPage"
          delete-url="/api/sysLoginLog/deleteBatchIds"
        >
          <el-table-column width="100" label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <!-- <el-button v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button> -->
              <!-- <el-button v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button> -->
              <el-button type="text" v-right.view @click="onEdit(scope.row,true)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="登录账号" min-width="100" sortable="custom"></el-table-column>
          <el-table-column prop="userName" label="用户名称" min-width="100" sortable="custom"></el-table-column>
          <el-table-column prop="loginTime" label="操作时间" min-width="200" sortable="custom" align="center"></el-table-column>
          <el-table-column prop="state" label="登录状态" min-width="120" sortable="custom" align="center" :formatter="isSuccessFormater"></el-table-column>
          <el-table-column prop="broswer" label="浏览器类型" min-width="120"></el-table-column>
          <!-- <el-table-column prop="id" label="主键" width="100" sortable="custom"></el-table-column> -->
          <el-table-column prop="ip" label="IP地址" min-width="120" ></el-table-column>
          <el-table-column prop="remark" label="备注" min-width="300"></el-table-column>
          <!-- <el-table-column prop="userId" label="登录用户ID" width="100" sortable="custom"></el-table-column> -->
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/unifiedUser/logManagement/sysLoginLogEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysLoginLog",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "sysLoginLogPage",
      primaryKey: "id",
      editPage,
      dataView: "",
      queryParams: [],
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
          field: "loginTime",
          title: "操作时间",
          findType: "EQ",
          component: "ElDatePicker"
        }
      ]
    };
  },
  methods: {
    isSuccessFormater(row, column, val) {
      if (val === "1") {
        return "成功";
      } else {
        return "失败";
      }
      // return this.$formatter.dataDictionary(row, column, "IsSuccess", null);
    }
  },
  computed: {
    gridDefaultSort() {
      return { prop: "loginTime", order: "desc" };
    }
  }
};
</script>
