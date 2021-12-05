<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="查看展位安排数量" name="one">
          <!-- <work-department-audit v-if="isShowo"></work-department-audit> -->
          <booth-number-inquiry v-if="isShowo"></booth-number-inquiry>
        </el-tab-pane>
        <el-tab-pane label="查看展位安排进度" name="two">
          <inpanel-view v-if="isShowt"></inpanel-view>
        </el-tab-pane>
        <el-tab-pane label="调整记录" name="Three">
          <adjustment-record v-if="isShowte"></adjustment-record>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import WorkDepartmentAudit from "./workDepartmentAudit";
import AdjustmentRecord from "./adjustmentRecordb";
import BoothNumberInquiry from "./boothNumberInquiryb";
import InpanelView from "./inpanelViewb";
export default {
  components: {
    // workDepartmentAudit: WorkDepartmentAudit,
    boothNumberInquiry: BoothNumberInquiry, // 查看展位安排数量 ok
    adjustmentRecord: AdjustmentRecord, // 调整记录 ok
    inpanelView: InpanelView // 查看展位安排进度 ok
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

