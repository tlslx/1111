<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="工作部审批退回申请" name="one">
          <booth-number-inquiry v-if="isShowo"></booth-number-inquiry>
        </el-tab-pane>
        <el-tab-pane label="汇总通知已通过的申请" name="two">
          <inpanel-view v-if="isShowt"></inpanel-view>
        </el-tab-pane>
        <!-- <el-tab-pane label="展位安排" name="Three">
          <adjustment-record v-if="isShowte"></adjustment-record>
        </el-tab-pane> -->
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import WorkDepartmentAudit from "./workDepartmentAudit";
import DepartmentSetsupmodules from "./examinesApproves";
// import WorkdepartmentDetermine from "./boothArrangement";
import SpecificboothDeclaration from "./consolidatedApproved";
export default {
  components: {
    boothNumberInquiry: DepartmentSetsupmodules, // 工作部审批退回申请 ok
    // adjustmentRecord: WorkdepartmentDetermine, // 展位安排 ok
    inpanelView: SpecificboothDeclaration // 汇总通知已通过的申请 ok
  },
  data() {
    return {
      sendNeed: "退回一般性展位调整",
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

