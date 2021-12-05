<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="查看各团一般性展位数量" name="one">
          <!-- <work-department-audit v-if="isShowo"></work-department-audit> -->
          <booth-number-inquiryw v-if="isShowo"></booth-number-inquiryw>
        </el-tab-pane>
        <el-tab-pane label="查看展位安排进度" name="two">
          <inpanel-vieww v-if="isShowt"></inpanel-vieww>
        </el-tab-pane>
        <el-tab-pane label="调整记录" name="Three">
          <adjustment-recordw v-if="isShowte"></adjustment-recordw>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import WorkDepartmentAudit from "./workDepartmentAudit";
import AdjustmentRecordq from "./boothApplicationTradegroup/adjustmentRecord";
import BoothNumberInquiryq from "./boothApplicationTradegroup/boothNumberInquiry.vue";
import InpanelViewq from "./inpanelView";
export default {
  components: {
    // workDepartmentAudit: WorkDepartmentAudit,
    boothNumberInquiryw: BoothNumberInquiryq, // 查看展位安排数量 ok
    adjustmentRecordw: AdjustmentRecordq, // 调整记录 ok
    inpanelVieww: InpanelViewq // 查看展位安排进度 ok
  },
  data() {
    return {
      sendNeed: "展位管理",
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

