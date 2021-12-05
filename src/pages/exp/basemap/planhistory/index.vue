<template>
  <el-page ref="planhistory">
    <template slot="header">
      <!--页面对话框-->
      <down-dialog :api="config.api" :language="source.language" @reload="onChild" ref="downDialog"/>
      <!--按钮栏-->
      <kindo-box :title="source.language.historytitle" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.schemegraph" prop="schemeGraphName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.schemeGraphName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.areacode" prop="exhibitionAreaName">
            <el-autocomplete v-model="exhibitionAreaName" :fetch-suggestions="SearchAsyncName" :placeholder="source.language.inputarea" :trigger-on-focus="false" @select="(item)=>{handleSelect(item)}"></el-autocomplete>
          </el-form-item>
          <el-form-item :label="source.language.expnum" prop="exhibitionNum">
            <el-select v-model="forms.exhibitionNum" :placeholder="source.language.select">
              <el-option v-for="item in source.hisExhibitionNum" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.boothnumber" prop="boothsNumber">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="shortclass" v-model="forms.boothsNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="config.api.get" :queryParam="form" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column :label="source.language.expnum" prop="exhibitionNum" min-width="80px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="source.language.expcode" prop="exhibitionPeriodCode" header-align="center" width="80px"
            :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionPeriodNum,row.exhibitionPeriodCode)}">
            </el-table-column>
            <el-table-column :label="source.language.schemegraph" prop="schemeGraphName" min-width="150px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="source.language.areacode" prop="exhibitionAreaCode" min-width="80px" show-overflow-tooltip header-align="center"
            :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionAreaCodes,row.exhibitionAreaCode)}">
            </el-table-column>
            <el-table-column :label="source.language.operation" width="180" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" v-if="right('down')" @click="onAction('download','down',scope.row)">{{source.language.download}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button type="primary" v-if="right('down')" icon="el-icon-download" @click="onAction('batchDownload','down')" size="small">{{source.language.batchDownload}}</el-button>
              <!-- <el-button icon="el-icon-plus" @click="onAction('batchDownload')">{{source.language.batchDownload}}</el-button> -->
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import exhibitionPeriod from "@/components/project/mixins/exhibitionPeriods";
import listPageBase from '@/components/framework/mixins/listPageBase';
import config from './components';
export default {
  name: "planhistory",
  mixins: [tableMixIn, exhibitionPeriod, listPageBase],
  components: {
    'downDialog': () => import('./components/downDialog')
  },
  data() {
    return {
      pageId: "planhistory",
      config,
      action: "",
      exhibitionAreaName: "",
      forms: {
        schemeGraphName: "",
        exhibitionAreaCode: "",
        exhibitionNum: "",
        boothsNumber: ""
      },
      source: {
        language: {}
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);

    // 读取国际化
    this.source.language = kindo.util.getLanguage('PlanMapLang');
    // this.source.exhibitionPeriodCode = await kindo.dictionary.get('exhibitionPeriodNum');
    this.source.exhibitionAreaCodes = await kindo.dictionary.get('areaOfExhibits');
    this.getHisExhibitionNum();
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    onQuery() {
      this.$refs.table.loadData();
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.exhibitionAreaName = "";
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
          dictCode: 'areaOfExhibits', // 查询展区数据字典
          itemText: queryString
        };
        // let param = {
        //   json: {
        //     customQueryParams: params,
        //     page: {
        //       current: 1,
        //       size: 10
        //     }
        //   }
        // };

        this.$http.get(kindo.config.api.upms + '/api/sysDataDictItem/findDicItemList', params).then(res => {
          this.diclist = res.records.map(item => { 
            return { value: item.itemText, code: item.itemCode }; 
          }) || [];
          callback(this.diclist);
        });
      } else {
        // callback(arr);
      }
    },

    handleSelect(item) {
      this.forms.exhibitionAreaCode = item.code;
    },

    handleSelectionChange(val) {
      this.delDictSelection = val;
    },

    // 公用触发方法
    onAction(action, form, row) {
      this.$refs[form + 'Dialog']['action'] = '';
      this.$nextTick(function () {
        this.$refs[form + 'Dialog']['action'] = action;
        if (row) {
          this.$refs[form + 'Dialog']['rowdata'] = row;
        }
        if (this.delDictSelection && this.delDictSelection.length > 0) {
          this.$refs[form + 'Dialog']['rowselect'] = this.delDictSelection;
        } else if (action === "batchDownload") {
          this.$message({
            type: 'warning',
            message: this.source.language.selectData
          });
          return;
        }
        this.$refs[form + 'Dialog'][form + 'Visible'] = true;
      });
    }
  },
  watch: {
    "exhibitionAreaName"(value) {
      let selectedValue = kindo.dictionary.getLabel(this.source.exhibitionAreaCodes, this.forms.exhibitionAreaCode);
      if (value !== selectedValue) {
        this.forms.exhibitionAreaCode = value === "" ? "" : value;
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>