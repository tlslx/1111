<template>
  <!-- <div> -->
    <!-- 首页 -->
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="生成报表" name="first">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="地区汇总表" name="first">
          <generate-report1></generate-report1>
        </el-tab-pane>
        <el-tab-pane label="展区汇总表" name="second">
          <generate-report2></generate-report2>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
  <!-- </div> -->
</template>
<script>
import GenerateReport1 from "./generateReport1";
import GenerateReport2 from "./generateReport2";
export default {
  components: {
    generateReport1: GenerateReport1,
    generateReport2: GenerateReport2
  },
  data() {
    return {
      activeName2: "first",
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style scoped>
/* aa {
 
} */
</style>

