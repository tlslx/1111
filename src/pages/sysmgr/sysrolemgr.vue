<template>
  <el-page ref="sysrolemgr">
    <template slot="header">
      <!--页面对话框-->
      <el-page-dialog ref="editpage" :page="editPage" datagrid="datagrid" :closeButtonText='language.commonLang.close' :saveButtonText='language.commonLang.save' :saveCloseButtonText='language.commonLang.saveAndClose' :title='language.commonLang.detaiInfo' @refresh="onRefresh"></el-page-dialog>
      <!--搜索栏-->
      <kindo-box :title="language.roleLang.manage">
        <el-form :model="queryParams" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="language.roleLang.name" prop="schemeGraphName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.roleName" :placeholder="language.commonLang.input + language.roleLang.name" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{language.commonLang.query}}</el-button>
            <el-button @click="onReset">{{language.commonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>

      <!-- <div class="sys-search">
        <div class="sys-user-label">
          <label class="sys-user-label syslabel">{{language.roleLang.name}}</label>
          <el-input v-model="queryParams.roleName" class="user-input-content" :placeholder="language.commonLang.input + language.roleLang.name"></el-input>
        </div>
        <div class="sys-user-search">
          <el-button type="primary" @click="onQuery" class="sys-buttons">{{language.commonLang.query}}</el-button>
          <el-button type="info" @click="onReset" class="sys-buttons">{{language.commonLang.reset}}</el-button>
        </div>
      </div>
      <div>
        <el-button v-if="right('add')" type="primary" @click="onAdd" class="sys-buttons sysuser-add-button">{{language.commonLang.add}}</el-button>
        <el-button v-if="right('delete')" type="primary" @click="onDelBatch" class="sys-buttons">{{language.commonLang.delete}}</el-button>
      </div> -->
    </template>

    <template slot="body" slot-scope="scope">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="sysRoleTable" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="roleId" label="ID" min-width="200" v-if="false"></el-table-column>
            <el-table-column prop="roleName" :label="language.roleLang.name" min-width="200"></el-table-column>
            <el-table-column prop="creatorName" :label="language.commonLang.creatorName" min-width="200"></el-table-column>
            <el-table-column prop="modifierName" :label="language.commonLang.modifierName" min-width="200"></el-table-column>
            <el-table-column prop="modifyDate" :label="language.commonLang.modifyDate" min-width="200"></el-table-column>
            <el-table-column min-width="250" :label="language.commonLang.operation" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" v-if="right('edit')" @click="onSysEdit(scope.row)" :title="language.commonLang.edit" class="sys-operation">{{language.commonLang.edit}}</el-button>
                <el-button type="text" v-if="right('view')" @click="onSysEdit(scope.row,true)" :title="language.commonLang.view" class="sys-operation">{{language.commonLang.view}}</el-button>
                <el-button type="text" v-if="right('delete')" @click="onDel(scope.row)" :title="language.commonLang.delete" class="sys-operation">{{language.commonLang.delete}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button type="primary" icon="el-icon-plus" v-if="right('add')" @click="onAdd">{{language.commonLang.add}}</el-button>
              <el-button type="primary" icon="el-icon-delete" v-if="right('delete')" @click="onDelBatch">{{language.commonLang.delete}}</el-button>
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>

</template>

<script>
import editPage from "@/pages/sysmgr/sysroleEdit";
import sysPageBase from "@/components/project/mixins/sysPageBase";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "sysrolemgr",
  mixins: [listPageBase, sysPageBase],
  inject: ['reload'],
  data() {
    return {
      pageId: "sysmgr/sysrolemgr",
      api: {
        get: kindo.config.api.upms + "/api/sysRole/getListPage",
        delete: kindo.config.api.upms + "/api/sysRole/deleteBatchIds",
        role: kindo.config.api.upms + "/api/sysRole/getRoleNameByKeyWords",
        insert: kindo.config.api.upms + "/api/sysRole/add",
        update: kindo.config.api.upms + "/api/sysRole/updateById"
      },
      language: {
        commonLang: {},
        roleLang: {}
      },
      editPage,
      queryParams: {
        roleId: "",
        roleName: "",
        account: "",
        deptId: "",
        creatorDeptLevelCode: ""
      },
      selectedDeptOptions: [],
      delSysSelection: [],
      userTypeOptions: []
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.queryParams
      };
    }
  },
  async created() {
    this.language.roleLang = kindo.util.getLanguage('RoleLang');
    this.language.commonLang = kindo.util.getLanguage('CommonLang');
    let userSource = this.$store.getters.userInfo.source;
    if (userSource === "2") {
      this.queryParams.creatorDeptLevelCode = this.$store.getters.userInfo.org.levelCode;
    } else {
      //内部用户创建角色归属根部门
      this.queryParams.creatorDeptLevelCode = "";
    }
  },
  mounted() {
    //进入页面时首先判断当前用户是否包含工作部特定角色，特对特殊场景
    //内部用户查所有，外部用户查当前所属机构下的所有子角色
    //this.isDepartment = this.isDepartment(this.departmentRoleId);
    // if (!this.isDepartment()) {
    //   this.queryParams.deptId = this.$store.getters.userInfo.dept.id;
    // }

    this.$nextTick(function () {
      this.onQuery();
      // this.queryUsertype();
    });
    this.$root.$on("reloadTable", isReload => {
      if (isReload) {
        this.$refs.sysRoleTable.reloadData();
      }
    });

  },
  methods: {
    onRefresh() {
      this.$refs.sysRoleTable.reloadData();
    },
    isDepartment() {
      let roles = this.$store.getters.userInfo.role;
      let role = kindo.config.departmentRoleId;
      let flag = false;
      roles.forEach((temp, index) => {
        if (temp.roleId === role) {
          flag = true;
          return;
        }
      });
      return flag;
    },
    onReset() {
      this.reload();
    },
    onQuery() {
      this.$refs.sysRoleTable.loadData();
    },
    onDel(row) {
      let _this = this;
      let roleIdData = [];
      if (row.roleId) {
        roleIdData.push(row.roleId);
      }

      let delPara = {
        json: JSON.stringify(roleIdData)
      };
      _this.$confirm(_this.language.commonLang.confirmDelete, _this.language.commonLang.tips, {
        confirmButtonText: _this.language.commonLang.confirm,
        cancelButtonText: _this.language.commonLang.cancel,
        type: "warning"
      })
        .then(() => {
          _this.$http.post(_this.api.delete, delPara).then(res => {
            _this.$refs.sysRoleTable.reloadData();
            _this.$message({
              type: "success",
              message: _this.language.commonLang.deleteSuccess
            });
          }, err => {
            _this.$message.error(err);
          });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: _this.language.commonLang.cancelDelete
          });
        });
    },
    onDelBatch() {
      let _this = this;
      let sysSelectedData = _this.delSysSelection;
      let roleIdData = [];

      if (sysSelectedData.length === 0 && !delUserId) {
        _this.$message({
          message: _this.language.commonLang.selectData,
          type: "warning"
        });
        return;
      }
      for (let i = 0; i < sysSelectedData.length; i++) {
        if (sysSelectedData[i].roleId) {
          roleIdData.push(sysSelectedData[i].roleId);
        }
      }
      let delPara = {
        json: JSON.stringify(roleIdData)
      };
      _this.$confirm(_this.language.commonLang.confirmDelete, _this.language.commonLang.tips, {
        confirmButtonText: _this.language.commonLang.confirm,
        cancelButtonText: _this.language.commonLang.cancel,
        type: "warning"
      })
        .then(() => {
          _this.$http.post(_this.api.delete, delPara).then(res => {
            _this.$refs.sysRoleTable.reloadData();
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
    handleSelectionChange(val) {
      this.delSysSelection = val;
    },
    queryUsertype() {
      this.$http.get(this.api.role).then(res => {
        let userTypeData = res.records;
        let dataset = [];
        for (let i = 0; i < userTypeData.length; i++) {
          dataset.push({
            label: userTypeData[i].roleName,
            value: userTypeData[i].roleId
          });
        }
        this.userTypeOptions = dataset;
      });
    },
    onDeptChange(value) {
      this.queryParams.deptId = value[0];
    }
  }
};
</script>
<style>
.sys-search {
  display: -webkit-flex;
  display: flex;
  width: 80%;
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
.sys-search .sys-user-select {
  display: -webkit-inline-flex;
  display: inline-flex;
  margin: auto 9px;
  width: 100%;
}
.sys-search .sys-user-select .sys-user-selectlabel {
  display: -webkit-inline-flex;
  display: inline-flex;
  margin: auto 15px;
}
.sys-search .sys-user-select .syslabel {
  width: 70px;
}
.sys-search .sys-user-search {
  display: -webkit-inline-flex;
  display: inline-flex;
  margin: auto 9px;
  height: 40px;
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
  cursor: pointer;
  color: #3381ff;
  margin-left: 10px;
}
.el-dialog__footer .dialog-footer .sysform-buttons {
  width: 100px;
}
.sysRole-checkbox {
  margin-left: 15px;
}
.el-select,
.el-date-editor.el-input {
  width: 200px;
}
</style>
