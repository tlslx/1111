<template>
  <el-page ref="planaudit">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :api="config.api" :language="source.language" @reload="onChild" @down-click="onDownload" ref="childDialog"/>
      <down-dialog :api="config.api" :language="source.language" @reload="onChild" ref="downDialog"/>
      <!--按钮栏-->
      <kindo-box :title="source.language.audit" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.mapname" prop="schemeGraphName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.schemeGraphName" class="inputclass"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="source.language.version" prop="version">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.version" class="inputclass"></el-input>
          </el-form-item> -->
          <el-form-item :label="source.language.staff" prop="creatorName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.creatorName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.areacode" prop="exhibitionAreaName">
            <el-autocomplete v-model="exhibitionAreaName" :fetch-suggestions="SearchAsyncName" :placeholder="source.language.inputarea" @select="(item)=>{handleSelect(item)}"></el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <!--左侧字典树-->
        <kindo-box>
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
            <el-table-column prop="creatorName" :label="source.language.staff" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pavilionCode" :label="source.language.hall" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionHallCode" :label="source.language.exphall" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionAreaCode" :label="source.language.areacode" min-width="200" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.areas, value)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitinNum" :label="source.language.expnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionPeriodCode" :label="source.language.expcode" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="standardBoothSize" :label="source.language.stand" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="boothsNumber" :label="source.language.boothnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isHasProfiledStandardBooth" :label="source.language.isprostand" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mainChannelWidth" :label="source.language.mainwidth" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mainViceChannelNum" :label="source.language.mainnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isHasIsland" :label="source.language.island" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isUseBaseMap" :label="source.language.isbase" min-width="200" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.mapSelect, value)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isUseTemplateMap" :label="source.language.istemp" min-width="200" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.mapSelect, value)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="baseMapStatus" :label="source.language.basestate" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.baseMapStatus)}" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="templateStatus" :label="source.language.tempstate" min-width="200" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.parentDictOptions,row.templateStatus)}" align="center" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="exhibitinNum" :label="source.language.tempstate" min-width="200" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="version" :label="source.language.version" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createDate" :label="source.language.time" min-width="200" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip></el-table-column>
            <el-table-column :label="source.language.operation" width="180" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button v-if="right('view')" type="text" :title="source.language.approval" @click="onAction('view','child',scope.row)">{{source.language.approval}}</el-button>
                <el-button v-if="right('down')" type="text" :title="source.language.download" @click="onAction('down','down',scope.row)">{{source.language.download}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button type="primary" icon="el-icon-download" v-if="right('down')" @click="onAction('down','down',selectedData)">{{source.language.downfiles}}</el-button>
            </div>
          </kindo-table>
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
  name: "planaudit",
  mixins: [tableMixIn, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog'),
    'downDialog': () => import('./components/downDialog')
  },
  data() {
    return {
      pageId: "planaudit",
      config,
      action: "",
      exhibitionAreaName: "",
      isTreeClick: false,
      dictName: "",
      dataDictId: "",
      dataDictParentId: "",
      mainHeight: 500,
      checked: false,
      selectedData: [],
      forms: {
        buttomGraphName: "",
        version: "",
        status: "",
        isHistory: 0,
        creatorName: ""
      },
      source: {
        parentDictOptions: [],
        mapSelect: [],
        areas: [],
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
    this.dynamicHeight();
    this._forms = Object.assign({}, this.forms);
    this.source.areas = await kindo.dictionary.get('areaOfExhibits'); // 展区
    this.source.language.common = kindo.util.getLanguage('CommonLang');
    const sessions = [this.source.language.unaudited, this.source.language.beaudited, this.source.language.auditfail, this.source.language.auditpass, this.source.language.withdrawn, this.source.language.waitaudit];
    sessions.forEach((s, i) => {
      this.source.parentDictOptions.push({ value: i.toString(), label: s });
    });
    const maplist = [this.source.language.mapfalse, this.source.language.maptrue];
    maplist.forEach((s, i) => {
      this.source.mapSelect.push({ value: i.toString(), label: s });
    });
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    onQuery() {
      this.$refs.table.reloadData();
    },
    // 重置条件为空查询
    onResetQuery() {
      this.checked = false;
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    onChild() {
      this.$refs.table.reloadData();
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
    onTreeNodeClick(data, node, component) {
      var dictIds = data["dataDictId"];
      this.isTreeClick = true;
      this.dataSysDictId = data.dataDictId;
      this.dataDictId = dictIds;
      this.dictName = data.dictName;
      this.dataDictParentId = data.dataDictParentId;
      this.forms.dataDictId = dictIds;
      this.onQuery();
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
      let jsonData = {
        businessKey: row.buttomGraphId
      };
      this.$http
      .postJson(this.config.api.start, jsonData)
      .then(data => {
        kindo.util.alert(this.source.language.common.recallfully, 'success');
      });
    },
    // 撤回
    onRedo(row) {
      let jsonData = {
        businessKey: row.businessKey,
        processDefinitionKey: row.processDefinitionKey,
        userId: row.userId,
        variables: 
        {
          passFlag: "1"
        }
      };
      this.$http
      .postJson(this.config.api.redo, jsonData)
      .then(data => {
        kindo.util.alert(this.source.language.common.recallfully, 'success');
      });
    },
    // 提交
    onSubmit(row) {
      let jsonData = {
        businessKey: row.businessKey,
        actId: row.actId,
        userId: row.userId,
        id: row.id,
        variables: 
        {
          passFlag: "0",
          reviewComment: ""
        }
      };
      this.$http
      .postJson(this.config.api.redo, jsonData)
      .then(data => {
        kindo.util.alert(this.source.language.common.successfully, 'success');
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
      if (action === 'down') {
        if (!row || row.length === 0) {
          kindo.util.alert(this.source.language.common.selectData, this.source.language.common.tips, "warning");
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
</style>