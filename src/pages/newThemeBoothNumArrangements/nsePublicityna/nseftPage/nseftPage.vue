<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位数量公示管理" name="first">
      <el-tabs v-model="activeDemand" type="card">
        <el-tab-pane label="整体方案公示" name="one">
          <ft-overallplan v-if="isShow"></ft-overallplan>
        </el-tab-pane>
        <el-tab-pane label="展位调整方案公示" name="two">
          <ft-adjustmentafte v-if="!isShow"></ft-adjustmentafte>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import FtOverallplan from "./nseftOverallplan";
import FtAdjustmentafte from "./nseftAdjustmentafte";
export default {
  components: {
    ftOverallplan: FtOverallplan,
    ftAdjustmentafte: FtAdjustmentafte
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

