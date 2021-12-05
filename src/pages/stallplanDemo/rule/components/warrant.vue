<template>
  <el-page >
    <template slot="header">
      <!-- 新增弹框 -->
      <warrant-dialog
        :natures="natures"
        :areas="areas"
        @ok="ok"
        :languageSource="languageSource"
        ref="warrantDialog"/>
      <rule-tabs
        :title="languageSource.RuleSettingLang.firstView"
        :languageSource="languageSource"
        activeName="warrant"
        @ruleTabsClick='handleClick'
      />
      <kindo-box >
        <div class="btn-control">
          <el-button
            type="text"
            @click="isExpanded = !isExpanded"
          >
            <i :class="isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
            <span v-text="isExpanded ? exphide : expshow"></span>
          </el-button>
        </div>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="82px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable">
            <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips"  -->
            <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255" class="common-style"></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionType" :label="languageSource.LocationLang.exhibitionPropertyTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionPositionTypeTip" -->
            <el-select v-model="searchForm.exhibitionType" clearable class="common-style" placeholder="">
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable" >
            <!-- :placeholder="languageSource.LocationLang.exhibitionAreaTip" -->
            <el-select v-model="searchForm.exhibitionArea" clearable class="common-style" placeholder="">
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
        <el-form v-show='isExpanded' :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="82px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="programCode" :label="languageSource.LocationLang.programCode">
            <el-input v-model="searchForm.programCode" clearable :maxlength="255" class="common-style"></el-input>
          </el-form-item>
          <el-form-item prop="enterpriseCode" :label="languageSource.LocationLang.enterpriseCode">
            <el-input v-model="searchForm.enterpriseCode" clearable :maxlength="255" class="common-style"></el-input>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body" >
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.getAuthorizedEnterprise"
          :queryParam="form"
        >
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.LocationLang.exhibitionPropertyTable" header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable"  header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column prop="authorizedContent" :label="languageSource.RuleSettingLang.authorizedContent" header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column prop="boothCodeTable" :label="languageSource.AdjustmentApply.boothCodeTable" header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column prop="programCode" :label="languageSource.LocationLang.programCode" header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column prop="enterpriseCode" :label="languageSource.LocationLang.enterpriseCode" header-align="center" align="center" min-width=""></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" header-align="center" align="center" min-width="">
            <template slot-scope="scope">
              <el-button type="text" @click="handleRemove(scope.row.changeId)" >{{languageSource.RuleSettingLang.remove}}</el-button>
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" @click="onCreate" v-if="right('adjustmentAdd')">{{languageSource.CommonLang.add}}</el-button>
          </div>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import warrantDialog from './warrantDialog';
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'warrant',
  mixins: [listPageBase],
  components: {
    'ruleTabs': () => import('./ruleTabs.vue'),
    warrantDialog
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
      //接口地址
      config,
      'searchForm': {
        enterpriseName: '',
        exhibitionType: '',
        exhibitionArea: '',
        programCode: '',
        enterpriseCode: ''
      },
      '_forms': {},
      exphide: '收起筛选',
      expshow: '高级筛选',
      isExpanded: false
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
      kindo.util.confirm(languageSource.RuleSettingLang.warrantRemoveTips, languageSource.CommonLang.tips, "warning", async () => {
        this.$http
        .postJson(this.config.api.removeAuthorizedEnterprise, [id])
        .then(data => {
          this.$refs.table.loadData();
          kindo.util.alert(languageSource.RuleSettingLang.removeSuccessTips, languageSource.CommonLang.tips, 'success');
        });
      });
    },
    //新增
    onCreate () {
      this.$refs.warrantDialog.dialogVisible = true;
      this.$refs.warrantDialog.onResetQuery(); //调用表格查询方法
    },
    ok () {
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
.common-style {
  width: 180px;
}
.btn-control .el-button{
  position: absolute;
  right: 15px;
  top: 130px;
}
</style>
