<template>
  <el-page ref="setDefaultIndex">
    <template slot="header">
      <kindo-box :title="source.language.setDefaultIndex"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.dailyApplicationLimit" name="dailyApplicationLimit">
            <daily-apply-limit ref="dailyApplyLimit" :language="source.language"></daily-apply-limit>
          </el-tab-pane>
          <el-tab-pane :label="source.language.eachPeriodLimit" name="eachPeriodLimit">
            <each-period-free-limit ref="eachPeriodFreeLimit" :language="source.language"></each-period-free-limit>
          </el-tab-pane>
          <el-tab-pane :label="source.language.enterpriseDefaultIndex" name="enterpriseDefaultIndex">
            <ent-default-index ref="entDefaultIndex" :language="source.language"></ent-default-index>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
export default {
  name: "setDefaultIndex",
  data() {
    return {
      pageId: "setDefaultIndex",
      activeName: "dailyApplicationLimit",
      source: {
        language: {}
      }
    };
  },
  async created() {
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "dailyApplicationLimit":
          this.$refs.dailyApplyLimit.onQuery();
          break;
        case "eachPeriodLimit":
          this.$refs.eachPeriodFreeLimit.onQuery();
          break;
        case "enterpriseDefaultIndex":
          this.$refs.entDefaultIndex.onQuery();
          break;
        default:
      }
    }
  },
  components: {
    "dailyApplyLimit": () => import("./components/dailyApplicationLimit"),
    "eachPeriodFreeLimit": () => import("./components/eachPeriodFreeLimit"),
    "entDefaultIndex": () => import("./components/enterpriseDefaultIndex")
  }
};
</script>
<style>
</style>
