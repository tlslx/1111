<template>
  <el-page>
    <template slot="header">
      <!-- 授权弹框 -->
      <authorize-dialog ref="authorizeDialog" :api="api" :language="source.language" @reload="onResetQuery" />
      <!-- 意见征询部门弹框 -->
      <consult-dialog ref="consultDialog" :api="api" :language="source.language" @reload="onResetQuery" />
      <!-- 下载弹框 -->
      <down-dialog ref="downDialog" :api="api" :language="source.language" />
      <!-- 模板图查看弹框 -->
      <view-dialog ref="viewDialog" :api="api" :language="source.language" @down-click="onDownload" />
      <!--查询按钮栏-->
      <kindo-box :title="source.language.manage" icon="fa-search">
        <el-form :model="queryParams" ref="queryParams" label-position="right" inline label-width="100px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.mapname">
            <el-input v-model="queryParams.templateGraphName" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.version">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="queryParams.version" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.staff">
            <el-input v-model="queryParams.creatorName" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="queryParams" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.state">
            <el-select v-model="queryParams.status" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.status" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.isshow">
            <el-checkbox v-model="isshow" @change="onHistory"></el-checkbox>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">

      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <el-row :gutter="20">
            <el-col :span="4">
              <div class="sysdict-data-tree" :style="treeStyle">
                <el-tree ref="tree" :data="treedata" class="el-datagrid-picker-tree" :render-content="renderContent" highlightCurrent :props="defaultProps" @node-click="onTreeNodeClick"></el-tree>
              </div>
            </el-col>
            <el-col :span="20">
              <kindo-table :cell-style="isCenter" :url="api.get" ref="tempateTable" :queryParam="form"
                @selection-change="handleSelectionChange">
                <el-table-column width="50" type="selection" header-align="center">
                </el-table-column>
                <el-table-column prop="templateGraphName" :label="source.language.mapname" header-align="center" min-width="160" show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <el-button @click="onAction('view', scope.row)" type="text">{{scope.row.templateGraphName}}</el-button>
                  </template> -->
                </el-table-column>
                <el-table-column prop="status" :label="source.language.approvalStatus" min-width="120" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{
                      kindo.dictionary.getLabel(source.status, scope.row.status) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="creatorName" :label="source.language.staff" min-width="160"
                  show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="exhibitionHallCode" :label="source.language.exphall" header-align="center" min-width="100">
                </el-table-column> -->
                <el-table-column prop="standardBoothScale" :label="source.language.statistical" header-align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="boothNum" :label="source.language.boothNum" header-align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="isHasSpecialStandardBooths" :label="source.language.hasDiverse" header-align="center" min-width="180" show-overflow-tooltip
                  :formatter="(row) => row.isHasSpecialStandardBooths === '0' ? source.language.no : source.language.have">
                </el-table-column>
                <el-table-column prop="mainChannelWidth" :label="source.language.main" header-align="center" min-width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="accessoryChannelsNumber" :label="source.language.subsidiary" header-align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="isHasIslandType" :label="source.language.island" header-align="center" min-width="100" show-overflow-tooltip
                  :formatter="(row) => row.isHasIslandType === '0' ? source.language.no : source.language.have">
                </el-table-column>
                <el-table-column prop="version" :label="source.language.version" header-align="center" min-width="80" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createDate" :label="source.language.time" min-width="160" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''"
                  show-overflow-tooltip></el-table-column>
                <el-table-column prop="buttomGraphName" :label="source.language.buttomGraphName" header-align="center" min-width="160" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="buttomGraphStatus" :label="source.language.buttomGraphStatus" min-width="120" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.buttomGraphStatus === '0' || scope.row.buttomGraphStatus === '1' ? '#909399' : scope.row.buttomGraphStatus === '3' ? '#67C23A' : '#F56C6C' }">
                      {{kindo.dictionary.getLabel(source.status, scope.row.buttomGraphStatus)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="buttomGraphVersion" :label="source.language.buttomGraphVersion" header-align="center" min-width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column :label="source.language.operation" fixed='right' min-width="160" align="center">
                  <template slot-scope="scope">
                    <el-button v-if="right('view')"  @click="onAction('view', scope.row)" type="text">{{source.language.review}}</el-button>
                    <el-button v-if="right('recall')" type="text" @click="onRedo(scope.row)" v-show="scope.row.status =='1'">{{source.language.recall}}</el-button>
                    <el-button v-if="right('submit')" type="text" @click="onSubmit(scope.row)" v-show="scope.row.status =='0'">{{source.language.submit}}</el-button>
                    <el-button v-if="right('download')" type="text" @click="onAction('down',scope.row)">{{source.language.download}}</el-button>
                  </template>
                </el-table-column>
                <div slot="control">
                  <el-button v-if="right('authorize')" type="primary" icon="el-icon-setting" @click="onAction('authorize')">{{source.language.accredit}}</el-button>
                  <el-button v-if="right('consult')" type="primary" icon="el-icon-service" @click="onAction('consult')"> {{source.language.consult}}</el-button>
                  <el-button v-if="right('batchDownload')" type="primary" icon="el-icon-download" @click="onAction('down',selectedData)">{{source.language.batchDownload}}</el-button>
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
  import common from '@/components/project/mixins/common';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: 'management',
    mixins: [common, listPageBase],
    data() {
      return {
        pageId: 'management',
        api: {
          getTree: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getHallTree",
          get: kindo.config.api.expUrl + "/api/exp/templategraph/getListPage",
          getById: kindo.config.api.expUrl + "/api/exp/templategraph/getById",
          // getcoms: kindo.config.api.comsUrl + "/api/sysRole/getListPage",  // 角色远程搜索查询
          getdept: kindo.config.api.baseUrl + "/api/sysDepartment/getListAll", // 部门远程搜索查询
          getAuth: kindo.config.api.expUrl + "/api/exp/exphallprivilege/getListAllByType", // 获取授权表格数据
          updateTemplate: kindo.config.api.expUrl + "/api/exp/exphallprivilege/updateTemplateGraph", //授权更新
          restart: kindo.config.api.expUrl + "/api/exp/templategraph/startTemplateGraph", // 提交
          cancel: kindo.config.api.expUrl + "/api/exp/templategraph/workFlowCancel",  // 撤回
          askAdvice: kindo.config.api.expUrl + "/api/exp/templategraph/askAdvice",  // 意见征询提交
          viewpic: kindo.config.api.comsUrl + "/api/fs/view/"    // 查询图片
        },
        isTreeClick: false,
        selectedData: [],
        dictName: "",
        exhibitionHallCode: "",
        dataDictParentId: "",
        treedata: [],
        defaultProps: {
          children: 'child',
          label: 'label'
        },
        iconCls: "glyphicon glyphicon-folder-close",
        isshow: false,
        queryParams: {
          templateGraphName: '',
          versioNum: '',
          creatorName: '',
          status: '',
          isHistory: '0'
        },
        mainHeight: 500,
        treeforms: []
        // source: {
        //   language: {}
        // }
      };
    },
    async created() {
      this.dynamicHeight();
      this._queryParams = Object.assign({}, this.queryParams);
      // // 读取数据字典
      //   this.source.languageSelection = await kindo.dictionary.get('languageType');
      // 读取国际化
      // this.source.language = kindo.util.getLanguage('TemplateMapLang');
    },
    components: {
      'downDialog': () => import('../components/downDialog'),
      'authorizeDialog': () => import('./components/authorizeDialog'),
      'consultDialog': () => import('./components/consultDialog'),
      'viewDialog': () => import('./components/viewDialog')
    },
    mounted() {
      this.$nextTick(function () {
        this.onQuery();
        this.onTree();
      });
    },
    methods: {
      dynamicHeight() {
        // 获取 header 高度
        this.mainHeight = document.querySelector(
          ".el-layout-item.center"
        ).clientHeight;
        this.mainHeight = this.mainHeight - 270;
      },
      onQuery() {
        this.$refs.tempateTable.reloadData();
      },
      // 重置
      onResetQuery() {
        this.isshow = false;
        this.queryParams = Object.assign({}, this._queryParams);
        this.$nextTick(function () {
          this.$refs.tempateTable.reloadData();
          this.onTree();
        });
      },
      onHistory(val) {
        val ? this.queryParams.isHistory = '1' : this.queryParams.isHistory = '0';
        this.onQuery();
      },
      handleSelectionChange(val) {
        this.selectedData = val;
      },
      onTree() {
        let jsonData = {
          userId: "",
          type: "2"
        };
        this.$http.get(this.api.getTree, jsonData).then(res => {
          if (res.records) {
            this.treedata = res.records;
          }
        });
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
      onTreeNodeClick(data, node, component) {
        if (!data.child) {
          let dictIds = data["id"];
          this.isTreeClick = true;
          this.queryParams.exhibitionHallCode = dictIds;
          this.onQuery();
        }
      },
      // 公用触发方法
      onAction(form, row) {
        this.$refs[form + 'Dialog']['action'] = '';
        if (form === 'consult') {
          if (this.selectedData.length) {
            let isTrue = false;
            this.selectedData.some(el => {
              if (el.status !== '3') {
                this.$message({
                  type: 'warning',
                  message: this.source.language.onlySelectedSuccess
                });
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
            kindo.util.alert(this.source.language.pleaseSelectedSuccess, this.source.language.tips, 'warning');
            return false;
          }
        } else if (form === 'down') {
          if (!(row instanceof Array) || this.selectedData.length > 0) {
            this.$refs[form + 'Dialog'][form + 'Visible'] = true;
            this.$refs[form + 'Dialog']['rowData'] = row;
          } else {
            this.$message({
              type: 'warning',
              message: this.source.language.selectedNeedData
            });
            return false;
          }
        } else {
          this.$refs[form + 'Dialog'][form + 'Visible'] = true;
        } 
        this.$nextTick(function () {
          this.$refs[form + 'Dialog']['action'] = form;
          if (row) {
            this.$refs[form + 'Dialog']['rowData'] = row;
          }
        });
        
      },
      // 撤回
      onRedo(row) {
        this.$confirm(this.source.language.retractData, this.source.language.tips, {
          confirmButtonText: this.source.language.confirm,
          cancelButtonText: this.source.language.cancel,
          type: 'warning'
        }).then(() => {
          this.$http.postJson(this.api.cancel, row.templateGraphId).then(data => {
            this.onResetQuery();
            kindo.util.alert(this.source.language.withdrawSuccessfully, this.source.language.tips, 'success');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.source.language.cancelledWithdrawal
          });
        });
      },
      // 提交
      onSubmit(row) {
        this.$confirm(this.source.language.submitSelectedData, this.source.language.tips, {
          confirmButtonText: this.source.language.confirm,
          cancelButtonText: this.source.language.cancel,
          type: 'warning'
        }).then(() => {
          this.$http.postJson(this.api.restart, row.templateGraphId).then(res => {
            this.onResetQuery();
            kindo.util.alert(this.source.language.submittedSuccessfully, this.source.language.tips, 'success');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.source.language.cancelledSubmission
          });
        });
      },
      // 下载
      onDownload(val) {
        this.$refs.downDialog.downVisible = true;
        this.$nextTick(function () {
          this.$refs.downDialog.rowData = val;
        });
      }
    },
    computed: {
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
    }
  };
</script>
<style lang="scss" scope>
  .el-page {
    .sysdict-data-tree {
      width: 96%;
      border: 1px solid #ebeff5;
      padding: 2%;
      max-height: 590px;
      overflow: auto;
      margin-top: 6px;
    }

    /deep/ .el-tree-node__label .el-tree-node__label-icon {
      top: -1px;
      margin-right: 5px;
      color: orange;
    }

    /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      background-color: #eff1da;
    }
  }
</style>