<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="查看待安排展位数" name="one">
          <booth-number-inquiry v-if="isShowo"></booth-number-inquiry>
        </el-tab-pane>
        <el-tab-pane label="提交安排方案" name="two">
          <inpanel-view v-if="isShowt"></inpanel-view>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import DepartmentSetsupmodules from "./seeArrangeBoothList";
import SpecificboothDeclaration from "./submitReschedulProposal";
export default {
  components: {
    boothNumberInquiry: DepartmentSetsupmodules, // 含退回情况汇总 ok
    inpanelView: SpecificboothDeclaration // 分类统计 ok
  },
  data() {
    return {
      sendNeed: "品牌展位退回情况汇总",
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

