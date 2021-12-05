<template>
  <el-page ref="sysusermgr">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid" :args="roleTypeOptions" :closeButtonText='language.commonLang.close' :saveButtonText='language.commonLang.save' :saveCloseButtonText='language.commonLang.saveAndClose' :title='language.commonLang.detaiInfo' @refresh="onRefresh"></el-page-dialog>
      <!--搜索框按钮栏-->
      <kindo-box :title="language.commonLang.userManagment">
        <el-form :model="queryParams" size="small" inline label-width="110px">
          <el-form-item :label="language.userLang.name">
            <el-input v-model="queryParams.userName" :placeholder="language.commonLang.input + language.userLang.name"></el-input>
          </el-form-item>
          <el-form-item :label="language.userLang.account">
            <el-input v-model="queryParams.account" :placeholder="language.commonLang.input + language.userLang.account"></el-input>
          </el-form-item>
          <el-form-item :label="language.userLang.roleName">
            <el-select v-model="queryParams.roleId" clearable filterable class="user-input-content" :placeholder="language.commonLang.select">
              <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{language.commonLang.query}}</el-button>
            <el-button v-if="right('add')" type="primary" @click="onAddExt">{{language.commonLang.add}}</el-button>
            <el-button v-if="right('delete')" type="primary" @click="onDelBatch">{{language.commonLang.delete}}</el-button>
            <el-button v-if="right('resetPwd')" type="info" @click="resetPwd">{{language.userLang.resetPassword}}</el-button>
            <el-button type="info" @click="onReset">{{language.commonLang.reset}}</el-button>
            <!-- <el-button type="primary" @click="onExp" class="sys-buttons">导出</el-button> -->
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="sysuser-data-tree" :style="treeStyle">
                <el-tree-view ref="tree" class="el-datagrid-picker-tree" iconCls="glyphicon glyphicon-folder-close" highlightCurrent :url="api.getTree" :custom-params="treeforms" :root-id="rootId" sort="orderNo" text-field="deptName" value-field="deptId" parent-field="parentId" :expand-on-click-node="false" @node-click="onTreeNodeClick" @handle-params="handleParams">
                </el-tree-view>
              </div>
            </el-col>
            <el-col :span="18">
              <kindo-table ref="sysTable" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="55" align="center"></el-table-column>
                <el-table-column prop="userName" :label="language.userLang.name" min-width="100" align="center"></el-table-column>
                <el-table-column prop="account" :label="language.userLang.account" min-width="100" align="center"></el-table-column>
                <el-table-column prop="workDeptName" :label="language.userLang.workDept" min-width="150" align="center"></el-table-column>
                <el-table-column prop="state" :label="language.userLang.effective" min-width="100" :formatter="getUserStatus" align="center"></el-table-column>
                <el-table-column prop="creatorName" :label="language.commonLang.creatorName" min-width="100" align="center"></el-table-column>
                <el-table-column prop="createDate" :label="language.commonLang.creatorDate" min-width="180" align="center"></el-table-column>
                <el-table-column prop="modifierName" :label="language.commonLang.modifierName" :min-width="currentLanguage==='zh'?100:80" align="center"></el-table-column>
                <el-table-column prop="modifyDate" :label="language.commonLang.modifyDate" min-width="180" align="center"></el-table-column>
                <el-table-column :min-width="currentLanguage==='zh'?230:300" :label="language.commonLang.operation" fixed="right" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" v-if="right('edit')" @click="onSysEdit(scope.row)" :title="language.commonLang.edit" class="sys-operation">{{language.commonLang.edit}}</el-button>
                    <el-button type="text" v-if="right('view')" @click="onSysEdit(scope.row, true)" :title="language.commonLang.view" class="sys-operation">{{language.commonLang.view}}</el-button>
                    <el-button type="text" v-if="right('edit')" @click="activation(scope.row)" :class="{'a-disabled':isActivation(scope.row)}" :disbaled="isActivation(scope.row)" :title="language.commonLang.activation" class="sys-operation">{{language.commonLang.activation}}</el-button>
                    <el-button type="text" v-if="right('delete')" @click="onDel(scope.row)" :title="language.commonLang.delete" class="sys-operation">{{language.commonLang.delete}}</el-button>
                  </template>
                </el-table-column>
              </kindo-table>
            </el-col>
          </el-row>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>

</template>

<script>
import editPage from "./sysuserEdit";
import sysPageBase from "@/components/project/mixins/sysPageBase";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "sysusermgr",
  mixins: [listPageBase, sysPageBase],
  inject: ['reload'],
  data() {
    return {
      pageId: 'sysmgr/sysusermgr',
      api: {
        getTree: kindo.config.api.upms + "/api/sysDepartment/getListAll",
        get: kindo.config.api.upms + "/api/sysUser/getUserList",
        delete: kindo.config.api.upms + "/api/sysUser/deleteBatchIds",
        reset: kindo.config.api.baseUrl + "/api/sysUser/resetPwd",
        role: kindo.config.api.upms + "/api/sysRole/getRoleNameByKeyWords",
        getRoles: kindo.config.api.upms + "/api/sysRole/getListAll",
        activation: kindo.config.api.upms + "/api/sysUser/activation"
      },
      language: {
        commonLang: {},
        userLang: {}
      },
      editPage,
      mainHeight: 500,
      selectedDeptOptions: [],
      userTypeOptions: [],
      delSysSelection: [],
      treeforms: [
        {
          JoinType: "And",
          Name: "state",
          FindType: "EQ",
          Values: ["1"]
        }
      ],
      rootId: "-1",
      isTreeClick: false,
      sysDeptId: "",
      deptId: "",
      deptName: "",
      deptCode: "",
      deptParentId: "",
      queryParams: {
        userName: "",
        account: "",
        roleId: "",
        deptId: "",
        levelCode: "",
        currentUserId: ""
      },
      currentLanguage: 'zh'
    };
  },
  computed: {
    isActivation: function () {
      return function (row) {
        let title = true;
        if (Number(row.state) === 0) {
          title = false;
        }
        // 用户状态暂时与有效时间无关
        // else {
        //   if (row.startDate && row.endDate) {
        //     if (new Date().getTime() < new Date(row.startDate).getTime() || new Date().getTime() > new Date(row.endDate).getTime()) {
        //       title = false;
        //     }
        //   }
        //   if (row.startDate && !row.endDate) {
        //     if (new Date().getTime() < new Date(row.startDate).getTime()) {
        //       title = false;
        //     }
        //   }
        //   if (!row.startDate && row.endDate) {
        //     if (new Date().getTime() > new Date(row.endDate).getTime()) {
        //       title = false;
        //     }
        //   }
        // }
        return title;
      };
    },
    roleTypeOptions: function () {
      return this.userTypeOptions;
    },
    form: function () {
      return {
        queryParams: this.queryParams
      };
    },
    treeStyle() {
      return {
        height: `${this.mainHeight}px`
      };
    }
  },
  async created() {
    let userSource = this.$store.getters.userInfo.source;
    let levelCode = this.$store.getters.userInfo.org.levelCode;
    let deptId = this.$store.getters.userInfo.org.deptId;
    // rootId为-1时，不按parentId查询
    if (userSource === "2") {
      this.treeforms.push({ JoinType: "And", Name: "DEPT_ID", FindType: "EQ", Values: [deptId] });
      this.queryParams.levelCode = levelCode;
    } else {
      this.queryParams.levelCode = "";
      this.rootId = "0";
    }
    this.queryParams.currentUserId = this.$store.getters.userInfo.userId;
    //获取国际化
    this.language.commonLang = kindo.util.getLanguage('CommonLang');
    this.language.userLang = kindo.util.getLanguage('UserLang');
    //当前系统的语言版本
    this.currentLanguage = kindo.cache.get('language');
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
      this.queryUsertype();
    });
    this.$root.$on("reloadTable", isReload => {
      if (isReload) {
        this.$refs.sysTable.reloadData();
      }
    });
  },
  methods: {
    onRefresh() {
      this.$refs.sysTable.reloadData();
    },
    getUserStatus(row, colums) {
      let title = this.language.commonLang.yes;
      if (row.state === 0) {
        title = this.language.commonLang.no;
      }
      // 用户状态暂时与有效时间无关
      //   else {
      //     if (row.startDate && row.endDate) {
      //       if (new Date().getTime() < new Date(row.startDate).getTime() || new Date().getTime() > new Date(row.endDate).getTime()) {
      //         title = this.language.commonLang.no;
      //       }
      //     }
      //     if (row.startDate && !row.endDate) {
      //       if (new Date().getTime() < new Date(row.startDate).getTime()) {
      //         title = this.language.commonLang.no;
      //       }
      //     }
      //     if (!row.startDate && row.endDate) {
      //       if (new Date().getTime() > new Date(row.endDate).getTime()) {
      //         title = this.language.commonLang.no;
      //       }
      //     }
      //   }
      return title;
    },
    onAddExt() {
      this.$refs[this.editpageName].open({
        params: {
          workDeptCode: this.deptCode,
          workDeptId: this.deptId,
          workDeptName: this.deptName,
          oauthInfo: process.env.IASID,
          roleIds: [],
          roles: []
        },
        isEdit: false,
        isView: false
      });
    },
    dynamicHeight() {
      // 获取 header 高度
      this.mainHeight = document.querySelector(
        ".el-layout-item.center"
      ).clientHeight;
      this.mainHeight = this.mainHeight - 270;
    },
    resetPwd() {
      let _this = this;
      let rowData;
      let sysResetSelection = _this.delSysSelection;
      if (sysResetSelection.length === 0) {
        _this.$message({
          message: _this.language.commonLang.selectData,
          type: "warning"
        });
        return;
      } else if (sysResetSelection.length > 1) {
        _this.$message({
          message: _this.language.commonLang.selectOneData,
          type: "warning"
        });
        return;
      } else {
        rowData = sysResetSelection[0];
      }
      _this.$http
        .post(_this.api.reset, {
          account: rowData["account"],
          newPwd: "123456"
        })
        .then(resultData => {
          _this.$message(_this.language.commonLang.operationSuccess);
        })
        .catch(msg => {
          // 错误捕捉
          _this.$message.error(msg);
        });
    },
    handleChange(value) {
      this.queryParams.deptId = value[0];
    },
    onReset() {
      this.reload();
    },
    onQuery() {
      this.$refs.sysTable.loadData();
    },
    dealElement(obj) {
      var param = {};
      var key = "";
      if (obj == null || obj === undefined || obj === "") {
        return param;
      }
      for (key in obj) {
        if (obj[key] != null && obj[key] !== undefined && obj[key] !== "") {
          param[key] = obj[key];
        }
      }
      return param;
    },
    activation(row) {
      let _this = this;
      // let rowData = _this.dealElement(row);
      _this.$http.post(_this.api.activation, { userId: row.userId }).then(res => {
        _this.$refs.sysTable.reloadData();
        _this.$message({
          type: "success",
          message: _this.language.commonLang.activationSuccess
        });
      })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.language.commonLang.activationFail
          });
        });
    },
    onDelBatch() {
      let _this = this;
      let sysSelectedData = _this.delSysSelection;
      let userIdData = [];

      if (sysSelectedData.length === 0 && !delUserId) {
        _this.$message({
          message: _this.language.commonLang.selectOneData,
          type: "warning"
        });
        return;
      }
      for (let i = 0; i < sysSelectedData.length; i++) {
        if (sysSelectedData[i].userId) {
          userIdData.push(sysSelectedData[i].userId);
        }
      }
      let delPara = {
        json: JSON.stringify(userIdData)
      };
      _this.$confirm(_this.language.commonLang.confirmDeletionAllSelect, _this.language.commonLang.tips, {
        confirmButtonText: _this.language.commonLang.confirm,
        cancelButtonText: _this.language.commonLang.cancel,
        type: "warning"
      })
        .then(() => {
          _this.$http.post(_this.api.delete, delPara).then(res => {
            _this.$refs.sysTable.reloadData();
            _this.$message({
              type: "success",
              message: _this.language.commonLang.deleteSuccess
            });
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.language.commonLang.cancelDelete
          });
        });
    },
    onDel(row) {
      let _this = this;
      let userIdData = [];
      if (row.userId) {
        userIdData.push(row.userId);
      }

      let delPara = {
        json: JSON.stringify(userIdData)
      };
      _this.$confirm(_this.language.commonLang.confirmDeletionAllSelect, _this.language.commonLang.tips, {
        confirmButtonText: _this.language.commonLang.confirm,
        cancelButtonText: _this.language.commonLang.cancel,
        type: "warning"
      })
        .then(() => {
          _this.$http.post(_this.api.delete, delPara).then(res => {
            _this.$refs.sysTable.reloadData();
            _this.$message({
              type: "success",
              message: _this.language.commonLang.deleteSuccess
            });
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.language.commonLang.cancelDelete
          });
        });
    },
    onTreeNodeClick(data, node, component) {
      var deptIds = data["deptId"];
      this.isTreeClick = true;
      this.sysDeptId = data.deptId;
      this.deptId = deptIds;
      this.deptName = data.deptName;
      this.deptCode = data.deptCode;
      this.deptParentId = data.parentId;
      this.queryParams.deptId = deptIds;
      this.onQuery();
    },
    handleSelectionChange(val) {
      this.delSysSelection = val;
    },
    queryUsertype() {
      let _this = this;
      let userSource = _this.$store.getters.userInfo.source;
      let queryParams = {
        OrderModelField: [
          {
            OrderByField: "ORDER_NO",
            asc: true
          }
        ],
        CustomQueryParams: userSource === '1' ? [{ Name: "CREATOR_DEPT_LEVELCODE", FindType: "LIKE", Values: ['0!'] }] : [{ Name: "CREATOR_DEPT_LEVELCODE", FindType: "LIKE", Values: [this.$store.getters.userInfo.org.levelCode] }]
      };
      _this.$http.get(_this.api.getRoles, { json: queryParams }).then(res => {
        //可支配角色为用户所属机构拥有的角色与当前用户拥有角色的并集（客户要求）
        let userTypeData = res.records;
        let userRoles = _this.$store.getters.userInfo.role;
        let temp = {};
        let dataset = [];
        let obj = userTypeData.concat(userRoles);
        obj.map((item, index) => {
          if (!temp[item.roleId]) {
            dataset.push({
              label: item.roleName,
              value: item.roleId,
              disabled: false
            });
            temp[item.roleId] = true;
          }
        });

        _this.userTypeOptions = dataset;
      });
    },
    // 树组件展开
    handleParams(data) {
      this.treeforms = this.treeforms.filter(item => item.Name !== 'DEPT_ID');
    }
  }
};
</script>
<style scoped>
.sysuser-data-tree {
  width: 96%;
  border: 1px solid #ebeff5;
  padding: 2%;
  max-height: 590px;
  overflow: auto;
  margin-top: 6px;
}
.sys-search {
  display: -webkit-flex;
  display: flex;
  width: 100%;
  overflow: auto;
}
.sys-search .sys-user-label {
  display: -webkit-inline-flex;
  display: inline-flex;
  margin: auto 9px;
  width: 100%;
}
.sys-search .syslabel {
  width: 70px;
}
.sys-search .sys-user-search {
  display: -webkit-inline-flex;
  display: inline-flex;
  margin: auto 9px;
  height: 40px;
}
.sys-search .sys-user-select {
  margin: auto 9px;
  display: -webkit-inline-flex;
  display: inline-flex;
  width: 100%;
}
.sys-search .sys-user-select .sys-user-selectlabel {
  display: -webkit-inline-flex;
  display: inline-flex;
  margin: auto 5px;
}
.sys-search .sys-user-select .syslabel {
  width: 70px;
}
.sys-search .user-input-content {
  width: 200px;
  margin: 10px 0px 10px;
}
.sys-buttons {
  width: 100px;
  margin-left: 15px;
  background-color: #2b57a4;
  border-color: #2b57a4;
}
.sysuser-add-button {
  background-color: #f60 !important;
  border-color: #f60 !important;
}
.sysform {
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  margin-top: 15px;
}
.sysform .sysform-item {
  width: 45%;
  margin-right: 30px;
  margin-top: 8px;
}
.sys-operation {
  /* cursor: pointer;
  color: #3381ff;
  margin-left: 10px; */
  text-decoration: underline;
}
.el-dialog__footer .dialog-footer .sysform-buttons {
  width: 100px;
}
.el-select,
.el-date-editor.el-input {
  width: 200px;
}
.a-disabled {
  pointer-events: none;
  opacity: 0.2;
}
</style>
