<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="工作部审核" name="one">
          <work-department-audit v-if="isShowo"></work-department-audit>
        </el-tab-pane>
        <el-tab-pane label="生成调整记录" name="two">
          <adjustment-record v-if="isShowt"></adjustment-record>
        </el-tab-pane>
        <el-tab-pane label="展位数量查询" name="Three">
          <booth-number-inquiry v-if="isShowte"></booth-number-inquiry>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import WorkDepartmentAudit from "./workDepartmentAudit";
import AdjustmentRecord from "./adjustmentRecord";
import BoothNumberInquiry from "./boothNumberInquiry";
export default {
  components: {
    workDepartmentAudit: WorkDepartmentAudit,
    adjustmentRecord: AdjustmentRecord,
    boothNumberInquiry: BoothNumberInquiry
  },
  data() {
    return {
      sendNeed: "工作部审核",
      fullLoading: false,
      activeName: "first",
      activeDemand: "one",
      isShowte: true,
      isShowt: true,
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

