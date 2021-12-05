<template>
  <kindo-box :title="title">
    <el-tabs v-model="currentActive" type="card" @tab-click="handleClick">
      <el-tab-pane :label="languageSource.LocationLang.progressSum" name="progressSum">
      </el-tab-pane>
      <el-tab-pane :label="languageSource.LocationLang.numSum" name="numSum" >
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
      'pageId': 'seatProgressSum',
      'currentActive': 'progressSum'
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
