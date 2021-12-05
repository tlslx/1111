<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="等量/不等量（含还原）调整" name="first">
      <el-tabs v-model="activeDemand" type="card">
        <el-tab-pane label="工作部设置调整规则" name="one">
          <booth-number-inquiry v-if="isShowo"></booth-number-inquiry>
        </el-tab-pane>
        <el-tab-pane label="审核交易团展位调整申请" name="two">
          <adjustment-record v-if="isShowt"></adjustment-record>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SetAdjustmentRules from "./setAdjustmentRules";
import WorkDepartmentAudit from "./boothApplicationTradegroup/workDepartmentAudit";
export default {
  components: {
    boothNumberInquiry: SetAdjustmentRules, // 工作部设置调整规则 ok
    adjustmentRecord: WorkDepartmentAudit // 审核交易团展位调整申请 ok
  },
  data() {
    return {
      fullLoading: false,
      activeName: "first",
      activeDemand: "one",
      isShowte: false,
      isShowt: false,
      isShowo: true
    };
  },
  watch: {
    activeDemand(val) {
      if (val === "one") {
        this.isShowo = true;
        this.isShowt = false;
        this.isShowte = false;
      } else
      if (val === "two") {
        this.isShowo = false;
        this.isShowt = true;
        this.isShowte = false;
      } else if (val === "Three") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = true;
      }
    }
  }
};
</script>

