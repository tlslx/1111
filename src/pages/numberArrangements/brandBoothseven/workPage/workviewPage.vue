<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card" v-loading.fullscreen="fullLoading">
        <el-tab-pane label="外贸司公示调整安排方案" name="one">
          <adjust-schedule v-if="isShowo"></adjust-schedule>
        </el-tab-pane>
        <el-tab-pane label="查看交易团反馈意见" name="two">
          <panel-view v-if="isShowt"></panel-view>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import AdjustSchedule from "./workAdjustSchedule";
import PanelView from "./workPanelView";
export default {
  components: {
    adjustSchedule: AdjustSchedule, // 含退回情况汇总 ok
    panelView: PanelView // 分类统计 ok
  },
  data() {
    return {
      sendNeed: "品牌展位调整安排方案公示",
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

