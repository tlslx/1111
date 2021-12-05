<template>
  <el-page class="area">
    <template slot="body">
      <review-form :languageSource="languageSource"/>
      <approval :languageSource="languageSource"/>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'modifyExhibitionType',
  mixins: [listPageBase],
  components: {
    'reviewForm': () => import('./components/reviewForm.vue'),
    'approval': () => import('./components/approval')
  },
  created () {
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
  },
  data () {
    return {
      languageSource: {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      }
    };
  }
};
</script>

<style scoped>
.area {
  overflow-y: auto;
}
</style>
