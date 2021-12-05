<template>
  <el-tabs v-model="activeNameBesc">
    <el-tab-pane label="按需求安排" name="first">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="按需求安排" name="first">
          <on-demand v-if="isShowo"></on-demand>
        </el-tab-pane>
        <el-tab-pane label="按展区出口额占比安排" name="second">
          <exhibition-export v-if="isShowt"></exhibition-export>
        </el-tab-pane>
        <el-tab-pane label="安排表" name="third">
          <schedule v-if="isShowte"></schedule>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import onDemand from "./onDemand"; 
import exhibitionExport from "./exhibitionExport";
import schedule from "./schedule";
export default {
  components: {
    onDemand,
    exhibitionExport,
    schedule
  },
  data() {
    return {
      activeNameBesc: "first",
      activeName: "first",
      isShowte: true,
      isShowt: true,
      isShowo: true
    };
  },
  watch: {
    activeName(val) {
      if (val === "first") {
        this.isShowo = true;
        this.isShowt = false;
        this.isShowte = false;
      } else
      if (val === "second") {
        this.isShowo = false;
        this.isShowt = true;
        this.isShowte = false;
      } else if (val === "third") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = true;
      }
    }
  }
};
</script>

