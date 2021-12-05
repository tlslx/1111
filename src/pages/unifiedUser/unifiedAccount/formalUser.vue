<template>
  <el-page ref="sysUser" :leftWidth="300">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid" @refresh="onRefresh"></el-page-dialog>
      <el-dialog
        title="导入文件"
        :visible.sync="excelImportShow"
        width="30%">
        <!-- :action是执行上传动作的后台接口
        :limit是最多上传的文件数量
        :before-upload是上传时再次校验，择需要在这个钩子绑定相应的方法来校验
        :file-list是显示已上传文件列表
        :data上传时提交数据-->
        <el-upload
          :action="uploadUrl"
          :on-success="uploadSuccess"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
          <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="excelImportShow = false">取消</el-button>
          <el-button type="primary" @click.native="submitUpload">提交</el-button>
        </div>
      </el-dialog>
      <!--按钮栏-->
      <el-page-buttons
        :data-view=true
        :view-options="viewOptions"
        @refresh="onRefresh"
        @view-change="onViewChange"
        @del="onDel"
        @add="onAdd" @edit="onEdit()"
        @view="onEdit(null,true)"
        @exp="onExp">
      <!--  <el-button @click="importUsers" v-right.import type="primary">导入</el-button> -->
        <el-button @click="resetPwd" v-right.resetpswd type="primary">重置密码</el-button>
      </el-page-buttons>
      <el-page-query :options="queryOptions" @query="onQuery" :width="300"></el-page-query>
      <!-- <Dialog :title="title" :dialogVisible="excelImportShow" @change-dialog-show="changeShow"></Dialog> -->
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
          :default-query-params="defaultQueryParams"
          :default-sort="gridDefaultSort"
          @delete-success="deleteSuccess"
          data-url="/api/sysUser/getListPage" delete-url="/api/sysUser/deleteBatchIds">
          <el-table-column prop="userName" label="用户名" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="account" label="账号" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="sex" label="性别" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="birthdate" label="出生年月" width="150" sortable="custom"></el-table-column>
          <el-table-column prop="nationality" label="国籍" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="workDeptName" label="所属部门" width="150" sortable="custom"></el-table-column>
          <el-table-column prop="userType" label="用户类型" width="100" sortable="custom" :formatter="dataDict"></el-table-column>
          <el-table-column prop="startDate" label="开始时间" width="100" sortable="custom" :formatter="date"></el-table-column>
          <el-table-column prop="endDate" label="结束时间" width="100" sortable="custom" :formatter="date"></el-table-column>
          <el-table-column prop="state" label="状态" width="80" sortable="custom" :formatter="dataDict"></el-table-column>
          <el-table-column prop="job" label="职务" width="200" sortable="custom"></el-table-column>
          <el-table-column prop="positionType" label="职位类型" width="120" sortable="custom"></el-table-column>
          <el-table-column prop="position" label="职位" width="100" sortable="custom"></el-table-column>
          <el-table-column prop="orderNo" label="排序号" width="100" sortable="custom"></el-table-column>
          <el-table-column width="150" label="操作" align="center" fixed="right">
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
import editPage from "@/pages/unifiedUser/unifiedAccount/formalUserEdit";
import listPageBase from "@/components/framework/mixins/listPageBase";
// import Dialog from "@/components/project/plugins/dialog";
export default {
  name: "SysUser",
  mixins: [listPageBase],
  data() {
    return {
      primaryKey: "userId",
      pageId: "5303d289177c487f89a64a9716ac3722",
      editPage,
      // // 上传时提交数据
      // uploadData: {
      //   dataType: "0",
      //   oldFilePath:""
      // },
      // 数据视图显示内容
      viewOptions: [
        {
          text: "正式用户",
          command: "formalUser"
        },
        {
          text: "临时用户",
          command: "temporaryUser"
        },
        {
          text: "全部",
          command: "allUser"
        }
      ],
      // 默认显示正式用户
      defaultQueryParams: [
        {
          FindType: "EQ",
          Name: "userType",
          Values: ["1"]
        }
      ],
      queryParams: [],
      queryOptions: [
        {
          field: "userName",
          title: "用户名",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "mobile",
          title: "手机",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "email",
          title: "邮箱",
          findType: "LIKE",
          component: "ElInput"
        },
        {
          field: "account",
          title: "账号",
          findType: "LIKE",
          component: "ElInput"
        }
      ],
      orgUrl: "/api/sysDepartment/getListAll",
      treeQueryParams: [
        { JoinType: "And", Name: "State", FindType: "EQ", Values: ["1"] }
      ],
      defaultExpandKeys: [
        "cd08bdeb2bd84091901da4f39637c94d",
        "8a706d0898954e4c910fb73769bd4ae9"
      ],
      fileName: "",
      excelImportShow: false,
      fileList: []
    };
  },
  computed: {
    gridDefaultSort() {
      return { prop: "workDeptCode", order: "ascending" };
    },
    //执行上传动作的后台接口
    uploadUrl() {
      // return `${this.$ajax.defaults.baseURL}todos/upload`;
    }
  },
  methods: {
    // 验证上传文件格式
    beforeUpload(file) {
      this.files = file;
      const extension = file.name.split('.')[1] === 'xls';
      const extension2 = file.name.split('.')[1] === 'xlsx';
      if (!extension && !extension2) {
        this.$message.warning('上传文档只能是 xls、xlsx格式!');
        return;
      }
      this.fileName = file.name;
      return false; // 返回false不会自动上传
    },
    // 上传文件不能为空
    submitUpload() {
      alert("导入成功！");
      // if (this.fileName === "") {
      //   this.$message.warning('请选择要上传的文件！');
      //   return false;
      // }
      // let fileFormData = new FormData();
      // fileFormData.append('file', this.files);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      // importBdDeptdoc(fileFormData).then((res) => {
      //   // this.addLoading = false;
      //   this.$message({
      //     message: '导入成功',
      //     type: 'success'
      //   });
      //   this.getUsers(); // 重新请求一次页面数据
      // });
    },
    uploadSuccess(res) {
      this.$notify({
        type: 'success',
        message: res
      });
      this.update();
      this.uploadShow = false;
    },
    // addLoading() {},
    importBdDeptdoc(data) {
      return request2({
        // url: '',
        // method: '',
        // data,
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
      });
    },
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
      console.info(this.queryParams);
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
    },
    onViewChange(selectView) {
      switch (selectView) {
        case "formalUser":
          this.defaultQueryParams = [
            {
              FindType: "EQ",
              Name: "userType",
              Values: ["1"]
            }
          ];
          break;
        case "temporaryUser":
          this.defaultQueryParams = [
            {
              FindType: "EQ",
              Name: "userType",
              Values: ["0"]
            }
          ];
          break;
        case "allUser":
          this.defaultQueryParams = [];
          break;
        default:
          break;
      }
    },
    importUsers() {
      // alert("导入用户！");
      this.excelImportShow = true;
    },
    deleteSuccess() {
      this.$message.success("删除成功！");
    }
  }
};
</script>
<style lang="scss" scoped>
.el-layout > .el-layout-item.left {
  background-color: #fff;
}
/deep/ .el-button--primary {
  padding: 0 20px!important;
  height: 40px;
}
</style>
