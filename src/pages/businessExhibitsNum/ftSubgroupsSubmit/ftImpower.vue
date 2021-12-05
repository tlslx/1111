<template>
  <el-tabs v-model="activeNameBesc">
    <el-tab-pane label="分团提交一般性展位数量安排" name="first">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="交易团管理员授权给分团" name="first">
          <on-demand v-if="isShowo"></on-demand>
        </el-tab-pane>
        <el-tab-pane label="交易团审核分团数量安排方案" name="second">
          <exhibition-export v-if="isShowt"></exhibition-export>
        </el-tab-pane>
        <!-- <el-tab-pane label="安排表" name="third">
          <schedule v-if="isShowte"></schedule>
        </el-tab-pane> -->
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import OnDemand from "./ftjytAdministratorSubgroup"; // 授权给分团
import ExhibitionExport from "./ftjytAuditSubgroup"; // 审核分团
export default {
  components: {
    onDemand: OnDemand,
    exhibitionExport: ExhibitionExport
  },
  data() {
    return {
      activeNameBesc: "first",
      activeName: "first",
      isShowte: true,
      isShowt: false,
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

