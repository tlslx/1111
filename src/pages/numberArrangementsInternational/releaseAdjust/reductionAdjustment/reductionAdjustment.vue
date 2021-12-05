<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card">
        <el-tab-pane label="还原调整" name="one">
          <reduction-adjustmenter v-if="isShow"></reduction-adjustmenter>
        </el-tab-pane>
        <el-tab-pane label="线上查询" name="two">
          <online-inquiry v-if="!isShow"></online-inquiry>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ReductionAdjustmenter from "./reductionAdjustmenter";
import OnlineInquiry from "./onlineInquiry";
export default {
  components: {
    reductionAdjustmenter: ReductionAdjustmenter,
    onlineInquiry: OnlineInquiry
  },
  data() {
    return {
      sendNeed: "还原调整",
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

