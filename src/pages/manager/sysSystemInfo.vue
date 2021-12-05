<template>
  <el-page ref="sysSystemInfo">
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
        <el-datagrid ref="datagrid" :height="scope.height-8" 
          :query-params="queryParams" 
          :default-sort="gridDefaultSort"
          row-key="systemId"
          data-url="/api/sysSystemInfo/getListPage" 
          delete-url="/api/sysSystemInfo/deleteBatchIds">
          <el-table-column prop="systemName" label="系统名称" min-width="250" sortable="custom"></el-table-column>
          <el-table-column prop="systemCode" label="系统编码" min-width="100" sortable="custom" align="center"></el-table-column>
          <el-table-column prop="systemType" label="系统类型" min-width="100" sortable="custom" align="center" :formatter="dataDict"></el-table-column>
          <el-table-column prop="systemUrl" label="系统链接" min-width="200" sortable="custom"></el-table-column>
          <el-table-column prop="state" label="状态" min-width="100" sortable="custom" align="center" :formatter="dataDict"></el-table-column>
          <el-table-column prop="orderNo" label="排序" min-width="100" sortable="custom" align="center"></el-table-column> 
          <!-- <el-table-column prop="systemId" label="IASID" width="300" sortable="custom" align="center"></el-table-column>  -->
          <!-- <el-table-column prop="remark" label="备注" sortable="custom"></el-table-column> -->
          <el-table-column width="200" align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" v-right.edit @click="onEdit(scope.row)">编辑</el-button>
              <el-button type="text" v-right.delete @click="onDel(scope.row)">删除</el-button>
              <el-button type="text" v-right.view @click="onEdit(scope.row,true)">查看</el-button>
              <el-button type="text" v-right.view @click="onViewIASID(scope.row)">信息</el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/manager/sysSystemInfoEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysSystemInfo",
  mixins: [listPageBase],
  props: ["name", "path"],
  data() {
    return {
      primaryKey: "systemId",
      pageId: "sysSystemInfoPage",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: []
    };
  },
  created() {},
  methods: {
    onViewIASID(row) {
      let msg = "";
      msg += "系统ID：" + row.systemId + " ";
      msg += "系统编码：" + row.systemCode;
      // this.$message.info(msg);
      this.$alert(msg);
    }
  },
  computed: {
    gridDefaultSort() {
      return { prop: "orderNo", order: "ascending" };
    }
  }
};
</script>
