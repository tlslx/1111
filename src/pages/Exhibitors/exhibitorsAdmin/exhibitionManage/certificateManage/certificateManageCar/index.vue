<style lang="less" scoped>

</style>

<template>
  <div>
    <el-tabs value="perpetual">
      <el-tab-pane label="证件管理(车证)" name="perpetual">
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" @tab-click="pageChange">
      <el-tab-pane label="参展企业" name="first">
      </el-tab-pane>
      <el-tab-pane label="招展代理" name="second">
      </el-tab-pane>
    </el-tabs>
    <component :is="componentName" style="padding: 0 10px"></component>
  </div>
</template>

<script>
import carCompany from './certificateCarCompany';
import carAgent from "./certificateCarAgent";
export default {
  components: {
    "carCompany-page": carCompany,
    "carAgent-page": carAgent
  },
  data() {
    return {
      activeName: "first",
      componentName: "carCompany-page"
    };
  },
  methods: {
    pageChange(val) {
      console.log(val);
      let name = val.name;
      if (name === "first") {
        this.componentName = "carCompany-page";
      } else if (name === "second") {
        this.componentName = "carAgent-page";
      }
    }
  }
};
</script>
