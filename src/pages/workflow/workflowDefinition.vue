<template>
  <el-page ref="mldelmgr">
    <template slot="header">
      <kindo-box :title="language.workflow.flowModel" icon="fa-search">
        <el-button v-if="right('add')" type="primary" @click="showDialog" class="model-buttons mldel-add-button">{{language.commonLang.add}}</el-button>

        <!--新增 -->
        <el-dialog :title="language.commonLang.add+language.workflow.flowModel" :visible.sync="dialogVisible" width="50%">
          <el-form :model="model" :rules="rules" ref="model" label-position="right" label-width="80px">
            <div class="sysform">
              <div class="sysform-item">
                <el-form-item :label="language.workflow.modelName" prop="modelName">
                  <el-input v-model="model.modelName"></el-input>
                </el-form-item>
              </div>
              <div class="sysform-item">
                <el-form-item :label="language.workflow.childSys" prop="category">
                  <el-select v-model="model.category" :placeholder="language.commonLang.select">
                    <el-option v-for="item in source.subsystem" :key="item.id" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" class="sysform-buttons">{{language.commonLang.close}}</el-button>
            <el-button type="primary" class="sysform-buttons" @click="onWorkflowDefAdd">{{language.commonLang.confirm}}</el-button>
          </span>
        </el-dialog>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <!-- <kindo-table ref="mldelTable" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange"> -->
          <kindo-table ref="mldelTable" :url="api.get" :queryParam="form">
            <el-table-column type="selection" width="1" class-name='hideColumn' align="center"></el-table-column>
            <el-table-column prop="modelName" :label="language.workflow.modelName" min-width="220" align="center"></el-table-column>
            <el-table-column prop="deployState" :label="language.workflow.deployState" width="120" align="center">
              <template slot-scope="scope">
                {{parseInt(scope.row.deployState) === 1 ? language.workflow.published : language.workflow.unpublish}}
              </template>
            </el-table-column>
            <el-table-column prop="category" :label="language.workflow.childSys" min-width="100" align="center">
              <template slot-scope="scope">
                {{ kindo.dictionary.getLabel(source.subsystem, scope.row.category) }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" :label="language.commonLang.modifierName" min-width="100" align="center"></el-table-column>
            <el-table-column prop="updateTime" :label="language.commonLang.modifyDate" min-width="170" align="center"></el-table-column>
            <el-table-column width="270" :label="language.commonLang.operation" fixed="right" align="center">
              <template slot-scope="scope">
                <el-button v-if="right('edit')" type="text" class="btnUnderline" @click="modelEdit(scope.row)">{{language.commonLang.edit1}}</el-button>
                <el-button type="text" v-if="right('view')" class="btnUnderline" @click="modelPublish(scope.row)">{{language.workflow.publish}}</el-button>
                <el-button v-if="right('delete')" type="text" class="btnUnderline" @click="modelDelete(scope.row)">{{language.commonLang.delete}}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "mldelmgr",
  mixins: [listPageBase],
  data() {
    return {
      pageId: 'workflow/workflowDefinition',
      modelId: "",
      iframeShow: false,
      api: {
        get: kindo.config.api.workflowUrl + "/api/workflow/getModel",
        add: kindo.config.api.workflowUrl + "/api/workflow/createModel",
        publish: kindo.config.api.workflowUrl + "/api/workflow/deployByModelId",
        delete: kindo.config.api.workflowUrl + "/api/workflow/delModel",
        activiti: kindo.config.api.activitiUrl
      },
      queryParams: {
        modelName: ""
      },
      dialogVisible: false,
      delSysSelection: [],
      model: {
        modelName: "",
        category: ""
      },
      source: {},
      rules: {},
      language: {
        commonLang: '',
        workflow: ''
      },
      currentLanguage: 'zh'
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
    this.source.subsystem = await kindo.dictionary.get('subsystem');
    // 读取国际化
    this.language.workflow = kindo.util.getLanguage('Workflow');
    this.language.commonLang = kindo.util.getLanguage('CommonLang');
    //当前系统的语言版本
    this.currentLanguage = kindo.cache.get('language');

    this.rules = {
      modelName: [
        //请输入流程模板名称
        { required: true, message: this.language.workflow.inputFlowName, trigger: "blur" },
        //长度在 3 到 35 个字符
        { min: 3, max: 35, message: this.language.commonLang.lengthIn + ' 3 ' + this.language.commonLang.between + ' 35 ' + this.language.commonLang.character, trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (!value) {
              return callback();
            }
            const regex = new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5]*$/);
            if (regex.test(value)) {
              return callback();
            } else {
              //名称只能包含字母、数字、下划线、汉字,不能包含特殊字符
              return callback(new Error(this.language.commonLang.nameValidator2));
            }
          }, trigger: "blur"
        }
      ],
      category: [
        //请选择子系统
        { required: true, message: this.language.commonLang.select + this.language.workflow.childSys, trigger: "change" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.mldelTable.loadData();
    },
    showDialog() {
      let _this = this;
      this.dialogVisible = true;
      setTimeout(function () {
        _this.$refs.model.resetFields();
      }, 10);
    },
    openWorkFlowEdit(url) {
      const workflow = window.open(url, "_blank");
      const _this = this;
      window.addEventListener('message', function (event) {
        if (event.data === 1) {
          workflow.postMessage(localStorage.getItem('USER_TOKEN'), '*');
        } else {
          _this.onQuery();
        }

      }, false);
    },
    //新增流程模板
    onWorkflowDefAdd() {
      this.$refs.model.validate((valid) => {
        if (!valid) {
          return false;
        } else {
          this.$http.postJson(this.api.add, {
            userId: this.$store.getters.userInfo.userId,
            modelName: this.model.modelName,
            category: this.model.category
          }).then((res) => {
            if (res && res.id) {
              this.$message({
                message: this.language.commonLang.operationSuccess,
                type: "success"
              });
              this.dialogVisible = false;
              this.$refs.mldelTable.reloadData();
              let activiUrl = this.api.activiti + "?modelId=" + res.id + "&userId=" + this.$store.getters.userInfo.userId;
              this.openWorkFlowEdit(activiUrl);
            } else {
              this.$message({
                message: this.language.commonLang.operationFail,
                type: "error"
              });
            }
          }).catch((result) => {
            // if (result !== 'ok') {
            // }
          });
        }
      });
    },
    //编辑流程模板
    modelEdit(row) {
      let modelId = row.id;
      let activiUrl = this.api.activiti + "?modelId=" + modelId + "&userId=" + this.$store.getters.userInfo.userId;
      this.openWorkFlowEdit(activiUrl);
    },
    //部署流程
    modelPublish(row) {
      this.$http.get(this.api.publish, {
        userId: this.$store.getters.userInfo.userId,
        modelId: row.id
      }).then((res) => {
        if (res) {
          row.deployState = "1";
          this.$message({
            message: this.language.commonLang.operationSuccess,
            type: "success"
          });
        } else {
          this.$message({
            message: this.language.commonLang.operationFail,
            type: "error"
          });
        }
      });
    },
    modelDelete(row) {
      // this.$confirm("此操作将删除该流程模板, 是否继续?", "提示", {
      this.$confirm(this.language.workflow.confirmWarn, this.language.commonLang.tips, {
        confirmButtonText: this.language.commonLang.confirm,
        cancelButtonText: this.language.commonLang.cancel,
        type: "warning"
      }).then(() => {
        this.$http.get(this.api.delete, {
          modelId: row.id
        }).then((res) => {
          if (res === "ok") {
            this.$refs.mldelTable.reloadData();
            this.$message({
              message: this.language.commonLang.deleteSuccess,
              type: "success"
            });
          } else {
            this.$message({
              message: this.language.commonLang.operationFail,
              type: "error"
            });
          }
        });
      });
    },
    handleSelectionChange(val) {
      this.delSysSelection = val;
    }
  }
};
</script>

<style>
.model-search {
  display: -webkit-flex;
  display: flex;
}
.model-search .model-user-label {
  margin-left: 15px;
}
.model-search .user-input-content {
  width: 200px;
  margin: 10px 10px;
}
.model-buttons {
  width: 100px;
  margin-left: 15px;
}
.mldel-add-button {
  background-color: orangered !important;
  border-color: transparent !important;
}
.mldel-del-button {
  background-color: #fff;
}
.modelform {
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  margin-top: 15px;
}
.modelform .modelform-item {
  width: 45%;
  margin-right: 30px;
  margin-top: 8px;
}
/* .el-dialog__footer .dialog-footer {
  margin-right: 33%;
}
.el-dialog__footer .dialog-footer .modelform-buttons {
  width: 100px;
} */
.sysform-item {
  margin-bottom: 22px;
}
.activiti-footer {
  display: none !important;
}
.btnUnderline {
  text-decoration: underline;
}
.hideColumn .cell {
  display: none !important;
}
</style>
