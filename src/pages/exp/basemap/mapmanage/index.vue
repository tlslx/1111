<template>
  <el-page ref="mapmanage">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :api="config.api" :language="source.language" :parentDictOptions="source.parentDictOptions" :submitTypeOptions="source.submitTypeOptions" @reload="onChild" @down-click="onDownload" ref="childDialog"/>
      <author-dialog :api="config.api" :language="source.language" @reload="onChild" ref="authorDialog"/>
      <consult-dialog :api="config.api" :language="source.language" @reload="onChild" ref="consultDialog"/>
      <down-dialog :api="config.api" :language="source.language" @reload="onChild" ref="downDialog"/>
      <!--按钮栏-->
      <kindo-box :title="source.language.manage" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.mapname" prop="buttomGraphName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.buttomGraphName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.version" prop="version">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.version" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.staff" prop="creatorName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.creatorName" class="inputclass"></el-input>
            <!-- <el-date-picker v-model="forms.creatorName" placeholder="" class="inputclass" :editable="false" type="date"></el-date-picker> -->
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <!-- <el-form-item :label="source.language.time" prop="creatorDate">
            <el-date-picker v-model="forms.creatorDate" placeholder="" class="inputclass" :editable="false" type="date"></el-date-picker>
          </el-form-item> -->
          <el-form-item :label="source.language.state" prop="status">
            <el-select v-model="forms.status" :placeholder="source.language.common.select" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.parentDictOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.isshow" prop="isHistory">
            <el-checkbox @change="onChange" v-model="checked"></el-checkbox>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <!--左侧字典树-->
        <kindo-box>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="sysdict-data-tree" :style="treeStyle">
                <el-tree ref="tree" :data="treedata" class="el-datagrid-picker-tree" :render-content="renderContent" highlightCurrent :props="defaultProps" @node-click="onTreeNodeClick"></el-tree>
                <!-- <el-tree-view ref="tree" class="el-datagrid-picker-tree" iconCls="glyphicon glyphicon-folder-close" highlightCurrent :url="config.api.getTree" :custom-params="treeforms" root-id="0" text-field="pavilionCode" value-field="exhibitionHallCode" parent-field="dataDictParentId" :expand-on-click-node="false" @node-click="onTreeNodeClick">
                </el-tree-view> -->
              </div>
            </el-col>
            <el-col :span="20">
              <kindo-table ref="table" :cell-style="isCenter" :url="config.api.get" :queryParam="form" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column :label="source.language.mapname" min-width="200" prop="buttomGraphName" align="center" show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <el-button @click="onAction('view','child',scope.row)" type="text">{{scope.row.buttomGraphName}}</el-button>
                  </template> -->
                </el-table-column>
                <el-table-column prop="status" :label="source.language.state" min-width="200" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{ kindo.dictionary.getLabel(source.parentDictOptions, scope.row.status) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="creatorName" :label="source.language.staff" min-width="200" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="pavilionCode" :label="source.language.hall" min-width="200" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="floorNum" :label="source.language.floor" min-width="200" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="exhibitionHallCode" :label="source.language.exphall" min-width="200" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="pillarNum" :label="source.language.posts" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="isDefault" :label="source.language.default" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="isSpecial" :label="source.language.special" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="version" :label="source.language.version" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createDate" :label="source.language.time" min-width="200" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
                <el-table-column :label="source.language.operation" width="180" align="center" fixed='right'>
                  <template slot-scope="scope">
                    <el-button v-if="right('view')" type="text" :title="source.language.viewmore" @click="onAction('view','child',scope.row)">{{source.language.viewmore}}</el-button>
                    <el-button v-if="right('submit')&&scope.row.status==='0'&&scope.row.isHistory==='0'" type="text" :title="source.language.submit" @click="onStart(scope.row)">{{source.language.submit}}</el-button>
                    <el-button v-if="right('recall')&&scope.row.status==='1'&&scope.row.isHistory==='0'" type="text" :title="source.language.recall" @click="onRedo(scope.row)">{{source.language.recall}}</el-button>
                    <!-- <el-button v-if="right('submit')&&scope.row.status==='2'&&scope.row.isHistory==='0'&&scope.row.creatorId===$store.getters.userInfo.userId" type="text" :title="source.language.submit" @click="onSubmit(scope.row)">{{source.language.submit}}</el-button> -->
                    <el-button v-if="right('down')" type="text" :title="source.language.download" @click="onAction('down','down',scope.row)">{{source.language.download}}</el-button>
                  </template>
                </el-table-column>
                <div slot="control">
                  <el-button type="primary" icon="el-icon-setting" v-if="right('author')" @click="onAction('add','author')">{{source.language.accredit}}</el-button>
                  <el-button type="primary" icon="el-icon-service" v-if="right('consult')" @click="onAction('select','consult')">{{source.language.consult}}</el-button>
                  <el-button type="primary" icon="el-icon-download" v-if="right('down')" @click="onAction('down','down',selectedData)">{{source.language.downfiles}}</el-button>
                </div>
              </kindo-table>
            </el-col>
          </el-row>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from "@/components/framework/mixins/listPageBase";
import config from './components';
export default {
  inject: ['reload'],
  name: "mapmanage",
  mixins: [tableMixIn, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'authorDialog': () => import('./components/authorDialog'),
    'consultDialog': () => import('./components/consultDialog'),
    'downDialog': () => import('./components/downDialog')
  },
  data() {
    return {
      pageId: "mapmanage",
      config,
      action: "",
      isTreeClick: false,
      dictName: "",
      exhibitionHallCode: "",
      dataDictParentId: "",
      mainHeight: 500,
      checked: false,
      selectedData: [],
      iconCls: "glyphicon glyphicon-folder-close",
      treedata: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      forms: {
        buttomGraphName: "",
        version: "",
        status: "",
        isHistory: 0,
        creatorName: ""
      },
      source: {
        parentDictOptions: [],
        submitTypeOptions: [],
        language: {
          common: {}
        }
      },
      treeforms: []
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    },
    treeStyle() {
      return {
        height: `${this.mainHeight}px`
      };
    }
  },
  async beforeCreate() {
  },
  created() {
    this.dynamicHeight();
    this._forms = Object.assign({}, this.forms);
    
    // 读取国际化
    this.source.language = kindo.util.getLanguage('BaseMapLang');
    this.source.language.common = kindo.util.getLanguage('CommonLang');
    const sessions = [this.source.language.unaudited, this.source.language.beaudited, this.source.language.auditfail, this.source.language.auditpass, this.source.language.withdrawn];
    sessions.forEach((s, i) => {
      this.source.parentDictOptions.push({ value: i.toString(), label: s });
    });
    const submittype = [this.source.language.recall, this.source.language.falgredo, this.source.language.falgpass, this.source.language.submit];
    submittype.forEach((s, i) => {
      this.source.submitTypeOptions.push({ value: (i - 1).toString(), label: s });
    });
  },

  mounted() {
    this.$nextTick(function () {
      this.onTree();
      this.onQuery();
    });
  },

  methods: {
    onQuery() {
      // console.log(this.$store.getters.userInfo.userId);
      // this.reload();
      this.$refs.table.reloadData();
    },
    // 重置条件为空查询
    onResetQuery() {
      this.reload();
      // this.checked = false;
      // this.forms = Object.assign({}, this._forms);
      // this.$nextTick(function () {
      //   this.$refs.table.reloadData();
      // });
    },
    onChild() {
      this.reload();
      // this.$refs.table.reloadData();
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    onTree() {
      let jsonData = {
        userId: "",
        type: "1"
      };
      this.$http
      .get(this.config.api.getTree, jsonData)
      .then(res => {
        if (res.records) {
          this.treedata = res.records;
        }
      });
    },
    onTreeNodeClick(data, node, component) {
      if (!data.child) {
        let dictIds = data["id"];
        this.isTreeClick = true;
        this.forms.exhibitionHallCode = dictIds;
        this.onQuery();
      }
    },
    renderContent(h, { node, data, store }) {
      if (!String.isNullOrEmpty(this.iconCls)) {
        return (
          <span class='el-tree-node__label'>
            <i class={"el-tree-node__label-icon " + this.iconCls} />
            {data["label"]}
          </span>
        );
      } else {
        return (
          <span class='el-tree-node__label'>{data["label"]}</span>
        );
      }
    },
    dynamicHeight() {
      // 获取 header 高度
      this.mainHeight = document.querySelector(
        ".el-layout-item.center"
      ).clientHeight;
      this.mainHeight = this.mainHeight - 270;
    },
    // 开启
    onStart(row) {
      kindo.util.confirm(this.source.language.common.istrue, this.source.language.common.tips, "warning", async () => {
        let param = {
          buttomGraphId: row.buttomGraphId,
          processDefinitionKey: "",
          userId: "",
          variables: 
          {
            passFlag: ""
          }
        };
        this.$http
        .postJson(this.config.api.start, param)
        .then(data => {
          this.onQuery();
          kindo.util.alert(this.source.language.common.successfully, 'success');
        });
      });
    },
    // 撤回
    onRedo(row) {
      kindo.util.confirm(this.source.language.common.isredo, this.source.language.common.tips, "warning", async () => {
        let param = {
          buttomGraphId: row.buttomGraphId,
          id: row.taskId,
          userId: "",
          variables: 
          {
            passFlag: "0",
            reviewComment: "",
            nonCheckPermission: "true"
          }
        };
        this.$http
        .postJson(this.config.api.redo, param)
        .then(data => {
          this.onQuery();
          kindo.util.alert(this.source.language.common.recallfully, 'success');
        });
      });
    },
    // 重新提交
    onSubmit(row) {
      kindo.util.confirm(this.source.language.common.istrue, this.source.language.common.tips, "warning", async () => {
        let param = {
          buttomGraphId: row.buttomGraphId,
          businessKey: row.workflowId,
          actId: row.actId,
          userId: "",
          id: row.taskId,
          variables: 
          {
            passFlag: "",
            reviewComment: ""
          }
        };
        this.$http
        .postJson(this.config.api.start, param)
        .then(data => {
          this.onQuery();
          kindo.util.alert(this.source.language.common.successfully, 'success');
        });
      });
    },
    // 下载
    onDownload(val) {
      this.$refs.downDialog.downVisible = true;
      this.$refs.downDialog.action = '';
      this.$nextTick(function () {
        this.$refs.downDialog.action = "add";
        this.$refs.downDialog.rowdata = val;
      });
    },
    onChange(val) {
      if (val) {
        this.forms.isHistory = 1;
      } else {
        this.forms.isHistory = 0;
      }
      this.onQuery();
    },
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    // 公用触发方法
    onAction(action, form, row) {
      this.$refs[form + 'Dialog']['action'] = '';
      if (action === 'select') {
        if (this.selectedData.length) {
          let isTrue = false;
          this.selectedData.some(el => {
            if (el.status !== '3') {
              kindo.util.alert(this.source.language.common.mustselect, this.source.language.common.tips, 'warning');
              isTrue = true;
            }
          });
          if (isTrue) {
            return;
          } else {
            this.$refs[form + 'Dialog'][form + 'Visible'] = true;
            this.$refs[form + 'Dialog']['rowData'] = this.selectedData;
          }
        } else {
          kindo.util.alert(this.source.language.common.warnselect, this.source.language.common.tips, 'warning');
          return false;
        }
      } else if (action === 'down') {
        if (!row || row.length === 0) {
          kindo.util.alert(this.source.language.common.selectData, this.source.language.common.tips, 'warning');
          return false;
        } else {
          this.$refs[form + 'Dialog'][form + 'Visible'] = true;
          this.$refs[form + 'Dialog']['rowData'] = row;
        }
      } else {
        this.$refs[form + 'Dialog'][form + 'Visible'] = true;
      }
      this.$nextTick(function () {
        this.$refs[form + 'Dialog']['action'] = action;
        if (this.selectedData) {
          this.$refs[form + 'Dialog']['rowselect'] = this.selectedData;
        }
        if (row) {
          this.$refs[form + 'Dialog']['rowdata'] = row;
        }
      });
    }
  },
  watch: {
    "forms.creatorDate"(v) {
      this.forms.creatorDate = kindo.util.formatDate(v, "yyyy-MM-dd");
    }
  }
};
</script>
<style lang="scss" scoped>
  .sysdict-data-tree {
    width: 96%;
    border: 1px solid #ebeff5;
    padding: 2%;
    max-height: 590px;
    overflow: auto;
    margin-top: 0px;
  }
  /deep/ .el-tree-node__label .el-tree-node__label-icon {
    top: -1px;
    margin-right: 5px;
    color: orange;
  }
  /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #eff1da;
  }
</style>