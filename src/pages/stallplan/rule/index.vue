<template>
<el-page class="rule">
  <template slot="body" >
    <el-container>
      <el-header>
        <headline :label="headline"></headline>
      </el-header>
      <el-main>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="languageSource.RuleSettingLang.firstView" name="warrant">
            <warrant :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource"></warrant>
          </el-tab-pane>
          <el-tab-pane :label="languageSource.RuleSettingLang.secondView" name="prompt" >
            <prompt :languageSource="languageSource"/>
          </el-tab-pane>
          <el-tab-pane :label="languageSource.RuleSettingLang.thirdView" name="plan">
            <arrange :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource" />
          </el-tab-pane>
          <el-tab-pane :label="languageSource.RuleSettingLang.lastView" name="import">
            <sortition :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource"/>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </template>
</el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'rule',
  mixins: [listPageBase],
  data () {
    return {
      'activeName': 'warrant',
      'headline': '标摊调整范围授权',
      //展位类型
      'natures': [],
      //展区
      'regionOfExhibition': [],
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {}
      }
    };
  },
  async created () {
    //获取数据字典的值
    this.natures = await kindo.dictionary.get('exhibitionPositionType'); //展位类型
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
  },
  methods: {
    handleClick(tab) {
      this.headline = tab.label;
    }
  },
  components: {
    'headline': () => import('../components/headline'),
    'warrant': () => import('./components/warrant'),
    'prompt': () => import('./components/prompt'),
    'arrange': () => import('./components/arrange'),
    'sortition': () => import('./components/sortition')
  }
};
</script>

<style scoped>
.rule {
  overflow-y: auto;
}
</style>
