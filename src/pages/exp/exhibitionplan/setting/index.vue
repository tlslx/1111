<template>
  <el-page ref="extension">
    <template slot="header">
      <!--页面对话框-->
      <child-dialog :api="config.api" @reload="onChild" ref="childDialog" :language='language' />
      <!--按钮栏-->
      <kindo-box :title="language.extensionLang.exhibitionAreaManagment" icon="fa-search">
        <el-form :model="forms" ref="forms" :rules="formRules" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="language.extensionLang.exhibitionNum" prop="exhibitionNum">
            <el-select v-model="forms.exhibitionNum" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expnum" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input v-model="forms.exhibitionNum" class="shortclass"></el-input>{{language.extensionLang.session}} -->
          </el-form-item>
          <el-form-item :label="language.extensionLang.exhibitionPeriodCode" prop="exhibitionPeriodCode">
            <el-select v-model="forms.exhibitionPeriodCode" :placeholder="language.extensionLang.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.explist" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.extensionLang.schemeName" prop="schemeName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.schemeName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{language.extensionLang.query}}</el-button>
            <el-button @click="onResetQuery">{{language.extensionLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="config.api.get" :queryParam="form" :cell-style="isCenter">
            <el-table-column :label="language.extensionLang.exhibitionNum" prop="exhibitionNum" min-width="80px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.exhibitionPeriodCode" prop="exhibitionPeriodCode" min-width="80px" :formatter="(row, column, value) => kindo.dictionary.getLabel(source.explist, value)" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.schemeName" prop="schemeName" min-width="150px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.creatorName" prop="creatorName" width="100px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.time" prop="createDate" min-width="150px" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="language.extensionLang.operation" width="220" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button type="text" v-if="right('edit')" @click="onAction('edit',scope.row)">{{language.extensionLang.edit}}</el-button>
                <el-button type="text" v-if="right('view')" @click="onAction('view',scope.row)">{{language.extensionLang.view}}</el-button>
                <el-button type="text" v-if="right('clone')" @click="onAction('clone',scope.row)">{{language.extensionLang.copy}}</el-button>
                <el-button type="text" v-if="right('delete')" @click="onAction('delete',scope.row)">{{language.extensionLang.delete}}</el-button>
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
  name: "setting",
  mixins: [tableMixIn, listPageBase],
  components: {
    'childDialog': () => import('./components/childDialog')
  },
  data() {
    return {
      pageId: "setting",
      config,
      action: "",
      forms: {
        exhibitionNum: "",
        exhibitionPeriodCode: "",
        schemeName: ""
      },
      source: {
        explist: [],
        expnum: []
      },
      language: {
        extensionLang: ''
      },
      formRules: {
        exhibitionNum: []
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
    this.language.extensionLang = kindo.util.getLanguage('ExtensionLang');
    this.formRules.exhibitionNum = [
      { required: false, message: this.language.extensionLang.inputPlaceholder + this.language.extensionLang.exhibitionNum, trigger: "blur" },
      // { pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正整数' },
      { pattern: /^[0-9]*[1-9][0-9]*$/, message: this.language.extensionLang.inputPlaceholder + this.language.extensionLang.positiveIntege }
    ];

    // 读取数据字典
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
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$refs.table.reloadData();
        }
      });
      // kindo.util.closeWin();
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