<template>
  <el-page ref="planmanage">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :api="config.api" :language="source.language" :parentDictOptions="source.parentDictOptions" :submitTypeOptions="source.submitTypeOptions" @reload="onChild" @down-click="onDownload" ref="childDialog"/>
      <author-dialog :api="config.api" :language="source.language" @reload="onChild" ref="authorDialog"/>
      <consult-dialog :api="config.api" :language="source.language" @reload="onChild" ref="consultDialog"/>
      <down-dialog :api="config.api" :language="source.language" @reload="onChild" ref="downDialog"/>
      <choose-dialog :api="config.api" :language="source.language" @reload="onChild" @showchoose="onShow" ref="chooseDialog"/>
      <!--按钮栏-->
      <kindo-box :title="source.language.manage" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.mapname" prop="schemeGraphName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.schemeGraphName" class="inputclass"></el-input>
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
        <el-form slot="more" :model="forms" label-width="110px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <!-- <el-form-item :label="source.language.time" prop="creatorDate">
            <el-date-picker v-model="forms.creatorDate" placeholder="" class="inputclass" :editable="false" type="date"></el-date-picker>
          </el-form-item> -->
          <el-form-item :label="source.language.state" prop="status">
            <el-select v-model="forms.status" :placeholder="source.language.inputPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.parentDictOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.areacode" prop="exhibitionAreaName">
            <el-autocomplete v-model="exhibitionAreaName" :fetch-suggestions="SearchAsyncName" :placeholder="source.language.inputarea" @select="(item)=>{handleSelect(item)}" class="inputclass"></el-autocomplete>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionPeriodCode" prop="exhibitionPeriodCode">
            <el-select v-model="forms.exhibitionPeriodCode" :placeholder="source.language.inputPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.explist" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.isselect" prop="isSelected">
            <el-select v-model="forms.isSelected" :placeholder="source.language.inputPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.dictSelect" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item :label="source.language.areacode" prop="exhibitionAreaCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.exhibitionAreaCode" class="inputclass"></el-input>
          </el-form-item> -->
          <el-form-item :label="source.language.isshow" prop="isShowHistory">
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
                <el-table-column :label="source.language.mapname" min-width="200" prop="schemeGraphName" align="center" show-overflow-tooltip>
                  <!-- <template slot-scope="scope">
                    <el-button @click="onAction('view','child',scope.row)" type="text">{{scope.row.schemeGraphName}}</el-button>
                  </template> -->
                </el-table-column>
                <el-table-column prop="status" :label="source.language.state" min-width="200" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.status === '0' || scope.row.status === '1' ? '#909399' : scope.row.status === '3' ? '#67C23A' : '#F56C6C' }">{{ kindo.dictionary.getLabel(source.parentDictOptions, scope.row.status) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="isSelected" :label="source.language.isselect" min-width="200" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.isSelected === '0' ? '#909399' : '#67C23A' }">{{ kindo.dictionary.getLabel(source.dictSelect, scope.row.isSelected) }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="creatorName" :label="source.language.staff" min-width="200" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="exhibitionHallCode" :label="source.language.exphall" min-width="200" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="exhibitionAreaCode" :label="source.language.areacode" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.areas, value)" min-width="200" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="exhibitionNum" :label="source.language.expnum" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="exhibitionPeriodCode" :label="source.language.expcode" min-width="200" show-overflow-tooltip :formatter="(row, column, value) => kindo.dictionary.getLabel(source.explist, row.exhibitionPeriodCode)"></el-table-column>
                <el-table-column prop="standardBoothSize" :label="source.language.stand" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="boothsNumber" :label="source.language.boothnum" min-width="200" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="isHasProfiledStandardBooth" :label="source.language.isprostand" min-width="200" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="mainChannelWidth" :label="source.language.mainwidth" min-width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mainViceChannelNum" :label="source.language.mainnum" min-width="200" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="isHasIslandType" :label="source.language.island" min-width="200" show-overflow-tooltip></el-table-column> -->
                <!-- <el-table-column prop="isUseBaseMap" :label="source.language.isbase" min-width="200" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.mapSelect, value)" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="isUseTemplateMap" :label="source.language.istemp" min-width="200" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.mapSelect, value)" show-overflow-tooltip></el-table-column>
                <el-table-column prop="baseMapStatus" :label="source.language.basestate" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.baseMapStatus)}" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="templateStatus" :label="source.language.tempstate" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.templateStatus)}" align="center" show-overflow-tooltip></el-table-column>
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
                  <el-button type="primary" icon="el-icon-service" v-if="right('consult')" @click="onAction('selectcon','consult')">{{source.language.consult}}</el-button>
                  <el-button type="primary" icon="el-icon-menu" v-if="right('choose')" @click="onAction('select','choose')">{{source.language.choose}}</el-button>
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
  name: "planmanage",
  mixins: [tableMixIn, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'authorDialog': () => import('./components/authorDialog'),
    'consultDialog': () => import('./components/consultDialog'),
    'downDialog': () => import('./components/downDialog'),
    'chooseDialog': () => import('./components/chooseDialog')
  },
  data() {
    return {
      pageId: "planmanage",
      config,
      action: "",
      exhibitionAreaName: "",
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
        schemeGraphName: "",
        version: "",
        status: "",
        exhibitionAreaCode: "",
        exhibitionPeriodCode: "",
        isShowHistory: "0",
        isSelected: "",
        creatorName: ""
      },
      source: {
        parentDictOptions: [],
        submitTypeOptions: [],
        dictSelect: [],
        mapSelect: [],
        areas: [],
        explist: [],
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
  async created() {
     // 读取国际化
    this.source.language = kindo.util.getLanguage('PlanMapLang');
      // 读取数据字典
    this.source.explist = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    this.dynamicHeight();
    this._forms = Object.assign({}, this.forms);
    this.source.areas = await kindo.dictionary.get('areaOfExhibits'); // 展区
    this.source.language.common = kindo.util.getLanguage('CommonLang');
    const sessions = [this.source.language.unaudited, this.source.language.beaudited, this.source.language.auditfail, this.source.language.auditpass, this.source.language.withdrawn, this.source.language.waitaudit];
    sessions.forEach((s, i) => {
      this.source.parentDictOptions.push({ value: i.toString(), label: s });
    });
    const submittype = [this.source.language.recall, this.source.language.falgredo, this.source.language.falgpass, this.source.language.submit];
    submittype.forEach((s, i) => {
      this.source.submitTypeOptions.push({ value: (i - 1).toString(), label: s });
    });
    const dictlist = [this.source.language.unchoose, this.source.language.haschoose];
    dictlist.forEach((s, i) => {
      this.source.dictSelect.push({ value: i.toString(), label: s });
    });
    const maplist = [this.source.language.mapfalse, this.source.language.maptrue];
    maplist.forEach((s, i) => {
      this.source.mapSelect.push({ value: i.toString(), label: s });
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
    onShow(data) {
      this.$refs['chooseDialog']['chooseVisible'] = true;
      this.$nextTick(function () {
        this.$refs['chooseDialog']['action'] = 'showchoose';
        if (data) {
          // console.log(data);
          this.$refs['chooseDialog']['rowselect'] = data;
          // this.$refs['chooseDialog']['rowsdata'] = this.selectedData;
        }
      });
      // this.reload();
    },
    // 可远程模糊可手填input框(名称)
    SearchAsyncName(queryString, callback) {
      if (queryString) {
        let params = {
          dataDictId: 'b2b795bcb356424495e4cb276315d7f2', // 查询展区数据字典
          itemText: queryString
        };
        let param = {
          json: {
            customQueryParams: params,
            page: {
              current: 1,
              size: 10
            }
          }
        };

        this.$http.get(kindo.config.api.upms + '/api/sysDataDictItem/getDicItemPage', param).then(res => {
          this.diclist = res.records.map(item => { 
            return { value: item.itemText, code: item.itemCode }; 
          }) || [];
          callback(this.diclist);
        });
      } else {
        // callback(arr);
      }
    },
    onTree() {
      let jsonData = {
        userId: "",
        type: "3"
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
          schemeGraphId: row.schemeGraphId
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
          schemeGraphId: row.schemeGraphId
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
          schemeGraphId: row.schemeGraphId
        };
        this.$http
        .postJson(this.config.api.restart, param)
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
        this.forms.isShowHistory = "1";
      } else {
        this.forms.isShowHistory = "0";
      }
      this.onQuery();
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    handleSelect(item) {
      this.forms.exhibitionAreaCode = item.code;
    },
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    // 公用触发方法
    onAction(action, form, row) {
      this.$refs[form + 'Dialog']['action'] = '';
      if (action === 'selectcon') {
        if (this.selectedData.length) {
          let isTrue = false;
          this.selectedData.some(el => {
            if (el.status !== '3' && el.status !== '5') {
              kindo.util.alert(this.source.language.common.mustselect, this.source.language.common.tips, "warning");
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
        // if (this.selectedData.length > 0) {
        //   let hasEditInfo = false;
        //   // console.log(this.selectedData);
        //   // console.log(this.$refs.table.internalData);
        //   this.selectedData.forEach((item, index) => {
        //     if (item.status === '1') {
        //       hasEditInfo = true;
        //       return true;
        //     }
        //   });
        //   if (hasEditInfo) {
        //     kindo.util.alert("请确认没有待审核数据", "提示", "warning");
        //     return;
        //   }
        //   this.$refs[form + 'Dialog'][form + 'Visible'] = true;
        // } else {
        //   kindo.util.alert('请先勾选一项', '提示', 'warning');
        //   return false;
        // }
      } else if (action === 'select') {
        if (this.selectedData.length) {
          let isTrue = false;
          this.selectedData.some(el => {
            if (el.status !== '1' && el.status !== '3' && el.status !== '5') {
              kindo.util.alert(this.source.language.common.moreselect, this.source.language.common.tips, "warning");
              isTrue = true;
            }
          });
          if (isTrue) {
            return;
          } else {
            // this.$refs[form + 'Dialog'][form + 'Visible'] = true;
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
          row.imageList = null;
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