<template>
  <el-page >
    <template slot="header">
      <!-- 新增弹框 -->
      <arrange-dialog
        :natures="natures"
        :areas="areas"
        @ok="ok"
        :languageSource="languageSource"
        ref="arrangeDialog"/>
      <rule-tabs
        :title="languageSource.RuleSettingLang.thirdView"
        :languageSource="languageSource"
        activeName="plan"
        @ruleTabsClick='handleClick'
      />
      <kindo-box>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable">
            <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips"  -->
            <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255" class="common-style"></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionType" :label="languageSource.LocationLang.exhibitionPropertyTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionPositionTypeTip" -->
            <el-select v-model="searchForm.exhibitionType" clearable class="common-style" placeholder="" >
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionAreaTip" -->
            <el-select v-model="searchForm.exhibitionArea" clearable class="common-style" placeholder="" >
              <el-option
                v-for="area in areas"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body" >
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.getPreArrangedEnterprise"
          :queryParam="form"
        >
          <el-table-column prop="positionNumber" :label="languageSource.RuleSettingLang.exhibitionPositionNumber" header-align="center" align="center" min-width="208"></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable" header-align="center" align="center" min-width="204"></el-table-column>
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" header-align="center" align="center" min-width="204"></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.LocationLang.exhibitionPropertyTable" header-align="center" align="center" min-width="204"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" header-align="center" align="center" min-width="204">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRemove(scope.row.id)" size="mini" >{{languageSource.RuleSettingLang.remove}}</el-button>
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" @click="onCreate" v-if="right('arrangeAdd')">{{languageSource.CommonLang.add}}</el-button>
          </div>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import config from './index';
import arrangeDialog from './arrangeDialog';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'arrange',
  mixins: [listPageBase],
  components: {
    'ruleTabs': () => import('./ruleTabs.vue'),
    arrangeDialog
  },
  props: {
    'natures': {
      'type': Array,
      'required': true
    },
    'areas': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'pageId': 'rule',
      config,
      //接口地址
      'searchForm': {
        enterpriseName: '',
        exhibitionType: '',
        exhibitionArea: ''
      },
      '_forms': {}
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.table.reloadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.$refs.searchForm.resetFields();
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.table.reloadData();
      });
    },
    // 移除
    handleRemove (id) {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.RuleSettingLang.removeMsg, languageSource.CommonLang.tips, "warning", async () => {
        this.$http.postJson(this.config.api.removePreArrangedEnterprise, [id])
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.RuleSettingLang.removeSuccessTips, languageSource.CommonLang.tips, 'success');
          });
      });

    },
    //新增
    onCreate () {
      this.$refs.arrangeDialog.dialogVisible = true;
      this.$refs.arrangeDialog.onResetQuery(); //调用表格查询方法
    },
    ok () {
      this.searchForm = {};
      this.$refs.searchForm.resetFields();
      this.$refs.table.reloadData();
    },
    //tab点击
    handleClick(tab) {
      this.$emit('tabClick', tab);
    }
  }
};
</script>

<style scoped>
.m-b {
  margin-bottom: 18px;
}
.common-style {
  width: 180px;
}
</style>
