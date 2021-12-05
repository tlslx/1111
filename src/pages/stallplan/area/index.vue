<template>
  <el-page class="area">
    <template slot="body">
      <info :languageSource="languageSource"/>
      <gear :languageSource="languageSource"/>
      <checking :languageSource="languageSource"/>
      <approval :languageSource="languageSource"/>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'areas',
  mixins: [listPageBase],
  components: {
    'info': () => import('./components/info'),
    'gear': () => import('./components/gear'),
    'checking': () => import('./components/checking'),
    'approval': () => import('./components/approval')
  },
  async created () {
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
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
