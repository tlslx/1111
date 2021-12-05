<template>
  <el-tabs v-model="activeName">
    <el-tab-pane :label="sendNeed" name="first">
      <el-tabs v-model="activeDemand" type="card">
        <el-tab-pane label="发布展位需求调整" name="one">
          <post-demand v-if="isShow"></post-demand>
        </el-tab-pane>
        <el-tab-pane label="处理展位调整需求" name="two">
          <processing-requirements v-if="!isShow"></processing-requirements>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import PostDemand from "./postDemand";
import ProcessingRequirements from "./processingRequirements";
export default {
  components: {
    postDemand: PostDemand,
    processingRequirements: ProcessingRequirements
  },
  data() {
    return {
      sendNeed: "交易团发布调整需求",
      activeName: "first",
      activeDemand: "one",
      obj: {},
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

