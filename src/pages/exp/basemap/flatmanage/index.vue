<template>
  <el-page ref="flatmanage">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box :title="source.language.audit" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.graphName" prop="graphName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.graphName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.expnum" prop="exhibitionNum">
            <el-select v-model="forms.exhibitionNum" :placeholder="source.language.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expnum" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.expcode" prop="exhibitionPeriodCode">
            <el-select v-model="forms.exhibitionPeriodCode" :placeholder="source.language.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.explist" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
           <!-- :url="config.api.get" :queryParam="form" -->
          <kindo-table ref="table" :cell-style="isCenter" :url="config.api.get" :queryParam="form">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column :label="source.language.mapflat" min-width="200" prop="graphName" align="center" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <el-button @click="onAction('view','child',scope.row)" type="text">{{scope.row.graphName}}</el-button>
              </template> -->
            </el-table-column>
            <el-table-column prop="exhibitionNum" :label="source.language.expnum" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionPeriodCode" :label="source.language.expcode" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column :label="source.language.operation" width="180" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button v-if="right('view')" type="text" :title="source.language.edit" @click="onAction('view','down',scope.row)">{{source.language.edit}}</el-button>
                <el-button v-if="right('export')" type="text" :title="source.language.export" @click="onAction('view','down',scope.row)">{{source.language.export}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button type="primary" v-if="right('add')" @click="onAction('add','down')">{{source.language.add}}</el-button>
              <!-- <el-button type="primary" v-if="right('auto')" @click="onAction('down','down')">{{source.language.auto}}</el-button>
              <el-button type="primary" v-if="right('upload')" @click="onAction('down','down')">{{source.language.upload}}</el-button> -->
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
  name: "flatmanage",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "flatmanage",
      config,
      action: "",
      forms: {
        graphName: "",
        exhibitionNum: "",
        exhibitionPeriodCode: ""
      },
      source: {
        explist: [],
        expnum: [],
        language: {
          common: {}
        }
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
    // this.source.areas = await kindo.dictionary.get('areaOfExhibits'); // 展区
    this.source.language = kindo.util.getLanguage('FlatMapLang');
    this.source.language.common = kindo.util.getLanguage('CommonLang');
    this.source.explist = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    this.getall();
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
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    onChild() {
      this.$refs.table.reloadData();
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
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    handleSelect(item) {
      this.forms.exhibitionPeriodCode = item.code;
    },
    getall() {
      this.source.expnum = [];
      this.$http.get(this.config.api.getall).then(res => {
        if (res.length) {
          res.forEach((item, index) => {
            let params = {
              id: item.exhibitionId.toString(),
              label: item.exhibitionNum.toString(),
              value: item.exhibitionNum.toString()
            };
            this.source.expnum.push(params);
          });
        }
      });
    },
    // 公用触发方法
    onAction(action, form, row) {
      if (action === 'view') {
        this.$router.push({
          path: '/flatmarking',
          query: row
        });
      } else {
        this.$router.push({
          path: '/flatmarking'
        });
      }
    }
  },
  watch: {
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