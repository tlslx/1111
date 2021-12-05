<template>
  <kindo-box :title="title">
    <el-tabs v-model="currentActive" type="card" @tab-click="handleClick">
      <el-tab-pane :label="languageSource.RuleSettingLang.firstView" name="warrant">
      </el-tab-pane>
      <el-tab-pane :label="languageSource.RuleSettingLang.secondView" name="prompt" >
      </el-tab-pane>
      <el-tab-pane :label="languageSource.RuleSettingLang.thirdView" name="plan">
      </el-tab-pane>
      <el-tab-pane :label="languageSource.RuleSettingLang.lastView" name="import">
      </el-tab-pane>
      <el-tab-pane :label="languageSource.RuleSettingLang.ruleSetTitle" name="ruleSet">
      </el-tab-pane>
    </el-tabs>
  </kindo-box>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'ruleTabs',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline.vue')
  },
  props: {
    'languageSource': {
      'type': Object
    },
    'title': {
      'type': String
    },
    'activeName': {
      'type': String
    }
  },
  data () {
    return {
      'pageId': 'rule',
      'currentActive': 'warrant'
    };
  },
  mounted () {
    this.currentActive = this.activeName;
  },
  methods: {
    //tab点击
    handleClick(tab) {
      this.$emit('ruleTabsClick', tab);
    }
  }
};
</script>
