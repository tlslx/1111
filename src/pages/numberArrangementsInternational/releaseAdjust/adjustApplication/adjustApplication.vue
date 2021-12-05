<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="填写调整函" name="one">
          <adjustment-letter v-if="isShow"></adjustment-letter>
        </el-tab-pane>
        <el-tab-pane label="处理展位调整申请" name="two">
          <processing-requirements v-if="!isShow"></processing-requirements>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import AdjustmentLetter from "./adjustmentLetter";
import ProcessingRequirements from "./processingRequirements";
export default {
  components: {
    adjustmentLetter: AdjustmentLetter,
    processingRequirements: ProcessingRequirements
  },
  data() {
    return {
      sendNeed: "提交调整需求",
      fullLoading: false,
      activeName: "first",
      activeDemand: "one",
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

