<template>
  <el-page ref="sysUser" :leftWidth="300">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid"></el-page-dialog>
      <!--按钮栏-->
      <el-page-buttons 
        @refresh="onRefresh"
        @view-change="onViewChange" 
        @del="onDel" 
        @add="onAdd" @edit="onEdit()" 
        @view="onEdit(null,true)" 
        @exp="onExp">
        <el-button @click="resetPwd" type="primary">重置密码</el-button> 
      </el-page-buttons>
      <el-page-query :options="queryOptions" @query="onQuery" :width="200"></el-page-query>
    </template>
    <template slot="lefter">
      <el-tree-view ref="tree" class="el-datagrid-picker-tree"
          iconCls="glyphicon glyphicon-folder-close" highlightCurrent 
          :url="orgUrl" 
          :custom-params="treeQueryParams"
          :default-expand-keys="defaultExpandKeys"
          root-id="0" 
          sort="orderNo"
          text-field="deptName" 
          value-field="deptId" 
          parent-field="parentId"
          :expand-on-click-node="false"
          @node-click="onTreeNodeClick">
        </el-tree-view>
    </template>
    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <el-datagrid ref="datagrid" :height="scope.height-8" 
          :query-params="queryParams" row-key="userId"
          :default-sort="gridDefaultSort"
          data-url="/api/sysUser/getListPage" delete-url="/api/sysUser/deleteBatchIds">
          <el-table-column prop="userName" label="用户名" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="workDeptName" label="所属部门" width="150" sortable="custom"></el-table-column>
          <!-- <el-table-column prop="workDeptCode" label="部门编码" width="120" sortable="custom"></el-table-column> -->
          <el-table-column prop="userType" label="用户类型" width="100" sortable="custom" :formatter="dataDict"></el-table-column>
          <el-table-column prop="startDate" label="开始时间" width="100" sortable="custom" :formatter="date"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" width="100" sortable="custom" :formatter="date"></el-table-column>
          <!-- <el-table-column prop="remark" label="备注" width="200" sortable="custom"></el-table-column> -->
          <el-table-column prop="state" label="状态" width="80" sortable="custom" :formatter="dataDict"></el-table-column>
          <el-table-column prop="job" label="职务" width="200" sortable="custom"></el-table-column>
          <el-table-column prop="positionType" label="职位类型" width="120" sortable="custom"></el-table-column>
          <el-table-column prop="position" label="职位" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="orderNo" label="排序号" width="100" sortable="custom"></el-table-column>
          <el-table-column width="118" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button v-right.edit icon="el-icon-edit" @click="onEdit(scope.row)"></el-button>
              <el-button v-right.delete icon="el-icon-delete" @click="onDel(scope.row)"></el-button>
              <el-button v-right.view icon="el-icon-view" @click="onEdit(scope.row,true)"></el-button>
            </template>
          </el-table-column>
        </el-datagrid>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import editPage from "@/pages/manager/sysUserEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "SysUser",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "userId",
      pageId: "sysUserPage",
      editPage,
      dataView: "",
      queryParams: [],
      queryOptions: [
        {
          field: "userName",
          title: "用户名",
          findType: "LIKE",
          component: "ElInput"
        }
      ],
      // orgUrl: process.env.API_COMS_URL + "/api/common/sysOrg/getListAll",
      orgUrl: "/api/sysDepartment/getListAll",
      treeQueryParams: [
        { JoinType: "And", Name: "State", FindType: "EQ", Values: ["1"] }
      ],
      defaultExpandKeys: [
        "cd08bdeb2bd84091901da4f39637c94d",
        "8a706d0898954e4c910fb73769bd4ae9"
      ]
    };
  },
  computed: {
    gridDefaultSort() {
      return { prop: "workDeptCode", order: "ascending" };
    }
  },
  methods: {
    fnGetChildNodesId(pNode) {
      var resultNodes = [];
      if (!this.$utils.isEmpty(pNode)) {
        resultNodes.push(pNode.data["deptId"]);
        if (pNode.childNodes.length > 0) {
          pNode.childNodes.forEach(node => {
            var rNodes = this.fnGetChildNodesId(node);
            resultNodes = resultNodes.concat(rNodes);
          });
        }
      }
      return resultNodes;
    },
    onTreeNodeClick(data, node, component) {
      // var deptIds = this.fnGetChildNodesId(node);
      var deptIds = [data["deptId"]];
      this.customQueryParams = {
        // Name: "workDeptId",
        Name: "TopDeptId",
        FindType: "IN",
        Values: deptIds
      };
      let tempQueryParams = [];
      tempQueryParams = tempQueryParams.concat(this.pageQueryParams);
      tempQueryParams = tempQueryParams.concat(this.customQueryParams);
      // console.info(this.queryParams);
      this.queryParams = tempQueryParams;
    },
    resetPwd() {
      let row;
      let gridSelection = this.$refs[this.datagridName].getSelection();
      if (gridSelection.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
        return;
      } else if (gridSelection.length > 1) {
        this.$message({
          message: "只能选择一条数据",
          type: "warning"
        });
        return;
      } else {
        row = gridSelection[0];
      }
      this.$http
        .post("/api/sysUser/resetPwd", {
          account: row["account"],
          newPwd: "123456"
        })
        .then(resultData => {
          this.$message("操作成功！");
        })
        .catch(msg => {
          // 错误捕捉
          this.$message.error(msg);
        });
    }
  }
};
</script>
<style>
.el-layout > .el-layout-item.left {
  background-color: #fff;
}
</style>
