<template>
<el-page class="schedule">
  <template slot="header">
    <kindo-box :title="languageSource.CheckProgress.view">
      <el-form :inline="true" :model="searchForm"  label-position="left" label-width="85px">
        <el-form-item :label="languageSource.RuleSettingLang.enterpriseName">
          <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips"  -->
          <el-input v-model="searchForm.heading" clearable :maxlength="255" class="common-style" ></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.AdjustmentApply.businessDelegation">
          <!-- :placeholder="languageSource.CheckProgress.businessDelegationTips"  -->
          <el-input v-model="searchForm.jytuan" clearable :maxlength="255"  class="common-style" ></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.LocationLang.exhibitionPeriod">
          <!-- :placeholder="languageSource.LocationLang.exhibitionTips" -->
          <el-select v-model="searchForm.zhanqi" clearable class="common-style" placeholder=""  >
            <el-option :key="1" label="第2期" :value="2"></el-option>
            <el-option :key="2" label="第3期" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.CheckProgress.filterGranularity">
          <!-- :placeholder="languageSource.CheckProgress.filterGranularityTips" -->
          <el-select v-model="searchForm.lidu" clearable class="common-style" placeholder="" >
            <el-option :key="1" label="交易团" :value="1"></el-option>
            <el-option :key="2" label="企业" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">{{languageSource.CommonLang.query}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>
  </template>
    <template slot="body">
      <el-container>
        <kindo-box>
          <kindo-table
            ref="table"
            :url="config.api.approveReviewGetList"
            :queryParam="form"
          >
            <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.exhibitionPeriodTable"></el-table-column>
            <el-table-column prop="exhibitionPeriod" :label="languageSource.AdjustmentApply.businessDelegation"></el-table-column>
            <el-table-column prop="exhibitionAreaName" :label="languageSource.CheckProgress.relevantCommerceChamber"></el-table-column>
            <el-table-column prop="exhibitionProperty" :label="languageSource.CheckProgress.recommendTotal"></el-table-column>
            <el-table-column prop="schemeName" :label="languageSource.CheckProgress.arrangeNumber"></el-table-column>
            <el-table-column prop="company" :label="languageSource.CheckProgress.progress"></el-table-column>
          </kindo-table>
        </kindo-box>
      </el-container>
    </template>
</el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'schedule',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../components/headline')
  },
  data () {
    return {
      'searchForm': {},
      'languageSource': {
        'CheckProgress': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {},
        'LocationLang': {}
      }
    };
  },
  created () {
    //读取国际化
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
  },
  methods: {
    handleCurrentChange () {

    }
  }
};
</script>

<style scoped>
.schedule {
  overflow-y: auto;
}
.m-b {
  margin-bottom: 18px;
}
.common-style {
  width: 180px;
}
</style>
