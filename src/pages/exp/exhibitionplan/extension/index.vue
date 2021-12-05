<template>
  <el-page ref="extension">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :api="config.api" @reload="onChild" ref="childDialog" :language="language" />
      <!--按钮栏-->
      <kindo-box :title="language.extensionLang.exhibitionManagment" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="language.extensionLang.exhibitionName" prop="exhibitionName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.exhibitionName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionNum" prop="exhibitionNum">
            <el-select v-model="forms.exhibitionNum" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expnum" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="shortclass" v-model="forms.exhibitionNum"></el-input>{{language.extensionLang.session}} -->
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionYear" prop="exhibitionYear">
            <el-date-picker v-model="forms.exhibitionYear" :placeholder="language.extensionLang.selectPlaceholder+language.extensionLang.exhibitionYear" class="inputclass" type="year" value-format="yyyy" :clearable="true" :editable="false"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{language.extensionLang.query}}</el-button>
            <el-button @click="onResetQuery">{{language.extensionLang.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="language.extensionLang.exhibitionSeason" prop="exhibitionSeason">
            <el-select v-model="forms.exhibitionSeason" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.quarter" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <el-form slot="more" :model="forms" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="季度" prop="exhibitionSeason">
            <el-select v-model="forms.exhibitionSeason" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.quarter" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="config.api.get" :queryParam="form" :cell-style="isCenter">
            <el-table-column :label="language.extensionLang.exhibitionNum" prop="exhibitionNum" min-width="80px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.exhibitionName" prop="exhibitionName" min-width="100px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.createDate" prop="createDate" min-width="150px" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.hasnow" prop="exhibitionNum" min-width="100px" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <span v-if='scope.row.isCurrent' style="color:#67C23A">{{language.extensionLang.hasyes}}</span>
                <span v-else>{{language.extensionLang.hasno}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="language.extensionLang.operation" width="260" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" v-if="right('edit')" :title="language.extensionLang.edit" @click="onAction('edit',scope.row)">{{language.extensionLang.edit}}</el-button>
                <el-button type="text" v-if="right('view')" :title="language.extensionLang.view" @click="onAction('view',scope.row)">{{language.extensionLang.view}}</el-button>
                <el-button type="text" v-if="right('clone')" :title="language.extensionLang.copy" @click="onAction('clone',scope.row)">{{language.extensionLang.copy}}</el-button>
                <el-button type="text" v-if="right('delete')" :title="language.extensionLang.delete" @click="onAction('delete',scope.row)">{{language.extensionLang.delete}}</el-button>
                <span v-if='scope.row.isCurrent' :title="language.extensionLang.choosenew" style="color:#67C23A">{{language.extensionLang.haschoose}}</span>
                <el-button v-else-if="right('choose')" type="text" :title="language.extensionLang.choosetip" @click="choose(scope.row)">{{language.extensionLang.choose}}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" type="primary" v-if="right('add')" @click="onAction('add')">{{language.extensionLang.add}}</el-button>
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
  name: "extension",
  mixins: [tableMixIn, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog')
  },
  data() {
    return {
      pageId: "extension",
      config,
      action: "",
      editexp: 1, // 默认展期统计数
      exhibitsNum: "",
      forms: {
        exhibitionName: "",
        exhibitionNum: "",
        exhibitionYear: "",
        exhibitionSeason: ""
      },
      source: {
        quarter: [],
        expnum: []
      },
      language: {
        extensionLang: {
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
  created() {
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.language.extensionLang = kindo.util.getLanguage('ExtensionLang');
    this.language.extensionLang.common = kindo.util.getLanguage('CommonLang');
    const sessions = [this.language.extensionLang.spring, this.language.extensionLang.autumn];
    sessions.forEach((s, i) => {
      this.source.quarter.push({
        value: (i + 1).toString(),
        label: s
      });
    });
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
    choose(row) {
      this.$http.get(this.config.api.getnow).then(res => {
        kindo.util.confirm(this.language.extensionLang.common.ischoose + res.exhibitionNum + this.language.extensionLang.common.isend, this.language.extensionLang.common.tips, "warning", async () => {
          this.$http
          .postJson(this.config.api.current, { exhibitionId: row.exhibitionId })
          .then(data => {
            this.onQuery();
            kindo.util.alert(this.language.extensionLang.common.successfully, this.language.extensionLang.common.tips, 'success');
          });
        });
      });
    },
    // 公用触发方法
    onAction(action, row) {
      if (action !== 'delete') {
        this.$refs.childDialog.childVisible = true;
      }
      this.$refs.childDialog.action = '';
      this.$nextTick(function () {
        this.$refs.childDialog.action = action;
        if (row) {
          this.$refs.childDialog.rowdata = row;
        }
      });
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    }
  },
  watch: {
    "forms.exhibitionYear"(v) {
      this.forms.exhibitionYear = kindo.util.formatDate(v, "yyyy");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>