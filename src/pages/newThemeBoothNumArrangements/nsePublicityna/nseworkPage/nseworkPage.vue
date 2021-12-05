<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位数量公示管理" name="first">
      <el-tabs v-model="activeDemand" type="card">
        <el-tab-pane label="整体方案公示" name="one">
          <work-overallplan v-if="isShow"></work-overallplan>
        </el-tab-pane>
        <el-tab-pane label="展位调整方案公示" name="two">
          <work-adjustmentafte v-if="!isShow"></work-adjustmentafte>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import WorkOverallplan from "./nseworkOverallplan";
import WorkAdjustmentafte from "./nseworkAdjustmentafte";
export default {
  components: {
    workOverallplan: WorkOverallplan,
    workAdjustmentafte: WorkAdjustmentafte
  },
  data() {
    return {
      activeName: "first",
      activeDemand: "one",
      obj: {},
      isShow: true
    };
  },
  watch: {
    activeDemand(val) {
      if (val === "one") {
        this.isShow = true;
      } else
      if (val === "two") {
        this.isShow = false;
      }
    }
  }
};
</script>

