<template>
  <div>
    <warrant v-if="activeName === 'warrant'" @tabClick='handleClick' :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource" ></warrant>
    <prompt v-else-if="activeName === 'prompt'" @tabClick='handleClick' :languageSource="languageSource"/>
    <arrange v-else-if="activeName === 'plan'" @tabClick='handleClick' :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource" />
    <sortition v-else-if="activeName === 'import'" @tabClick='handleClick' :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource" ></sortition>
    <rule-set v-else-if="activeName === 'ruleSet'" @tabClick='handleClick' :natures="natures" :areas="regionOfExhibition" :languageSource="languageSource" ></rule-set>
  </div>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'rule',
  mixins: [listPageBase],
  components: {
    'warrant': () => import('./components/warrant'),
    'prompt': () => import('./components/prompt'),
    'arrange': () => import('./components/arrange'),
    'sortition': () => import('./components/sortition'),
    'ruleSet': () => import('./components/ruleSet')
  },
  data () {
    return {
      'pageId': 'rule',
      'activeName': 'warrant',
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
  async beforeCreate () {
    //获取数据字典的值
    this.natures = await kindo.dictionary.get('depositBoothType'); //展位性质
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
  },
  created () {
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    }
  }
};
</script>
