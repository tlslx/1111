<template>
  <el-page ref="modelmgr">
    <template slot="header">
    </template>

    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box :title="language.workflow.processTitle">
          <kindo-table ref="mldelTable" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange">
            <el-table-column prop="name" :label="language.workflow.processName" min-width="220"></el-table-column>
            <el-table-column prop="key" :label="language.workflow.processKey" width="200"></el-table-column>
            <el-table-column prop="suspensionState" :label="language.workflow.suspensionState" width="100">
              <template slot-scope="scope">
                {{parseInt(scope.row.suspensionState) === 1 ?language.workflow.activation : language.workflow.suspend}}
              </template>
            </el-table-column>
            <el-table-column prop="version" :label="language.workflow.version" width="100"></el-table-column>
            <el-table-column prop="userName" :label="language.workflow.deployUser" width="130"></el-table-column>
            <el-table-column prop="deployTime" :label="language.workflow.deployDate" width="160"></el-table-column>
            <el-table-column width="200" :label="language.commonLang.operation" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button type="text" v-if="right('edit')" :disabled="scope.row.suspensionState === '1'" @click="changeState(scope.row,'2')" class="btnUnderline">{{language.workflow.suspend}}</el-button>
                <el-button type="text" v-if="right('view')" :disabled="scope.row.suspensionState === '2'" @click="changeState(scope.row,'1')" class="btnUnderline">{{language.workflow.activation}}</el-button> -->
                <el-button type="text" v-if="scope.row.suspensionState === '1'&&right('edit')" @click="changeState(scope.row,'2')" class="btnUnderline">{{language.workflow.suspend}}</el-button>
                <el-button type="text" v-if="scope.row.suspensionState === '2'&&right('view')" @click="changeState(scope.row,'1')" class="btnUnderline">{{language.workflow.activation}}</el-button>
                <el-button v-if="right('delete')" type="text" @click="processDelete(scope.row)" class="btnUnderline">{{language.commonLang.delete}}</el-button>
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
  name: "modelmgr",
  mixins: [listPageBase],
  data() {
    return {
      pageId: 'workflow/workflowPublish',
      api: {
        get: kindo.config.api.workflowUrl + "/api/workflow/getProcDef",
        changeState: kindo.config.api.workflowUrl + "/api/workflow/setState",
        delete: kindo.config.api.workflowUrl + "/api/workflow/delProcDef"
      },
      queryParams: {
        // modelName: ""
      },
      delSysSelection: [],
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
  created() {
    // 读取国际化
    this.language.workflow = kindo.util.getLanguage('Workflow');
    this.language.commonLang = kindo.util.getLanguage('CommonLang');
    //当前系统的语言版本
    this.currentLanguage = kindo.cache.get('language');
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
    //激活、挂起流程
    changeState(row, state) {
      this.$http.get(this.api.changeState, {
        procDefId: row.id,
        stateFlag: state
      }).then((res) => {
        if (res === "ok") {
          row.suspensionState = state;
          if (state === "2") {
            this.$message({
              //流程挂起成功
              message: this.language.commonLang.operationSuccess,
              type: "success"
            });
          } else {
            this.$message({
              //流程激活成功
              message: this.language.commonLang.operationSuccess,
              type: "success"
            });
          }

        } else {
          this.$message({
            message: this.language.commonLang.operationFail,
            type: "error"
          });
        }
      });
    },
    //删除流程定义
    processDelete(row) {
      //此操作将删除该流程定义, 是否继续
      this.$confirm(this.language.workflow.processDelete, this.language.commonLang.tips, {
        confirmButtonText: this.language.commonLang.confirm,
        cancelButtonText: this.language.commonLang.cancel,
        type: "warning"
      }).then(() => {
        this.$http.get(this.api.delete, {
          procDefId: row.id
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
.sys-search {
  display: -webkit-flex;
  display: flex;
}
.sys-search .sys-user-label {
  margin-left: 15px;
}
.sys-search .user-input-content {
  width: 200px;
  margin: 10px 10px;
}
.sys-buttons {
  width: 100px;
  margin-left: 15px;
}
/* .el-dialog__footer .dialog-footer {
  margin-right: 33%;
}
.el-dialog__footer .dialog-footer .sysform-buttons {
  width: 100px;
} */
.btnUnderline {
  text-decoration: underline;
}
</style>
