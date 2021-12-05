<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="查看审核" name="first">
      <el-tabs v-model="activeDemand" @tab-click="handChangeTab" type="card">
        <el-tab-pane label="查看审核"  name="one">
          <post-demand v-if="isShowo"></post-demand>
        </el-tab-pane>
        <el-tab-pane label="工作部已审核结果" name="two">
          <!-- <processing-requirement v-if="isShowt" @handWidth="handwith"></processing-requirement> -->
        </el-tab-pane>
        <el-tab-pane label="财务部未审核结果" name="three">
          <!-- <adjustment-letter v-if="isShowte" :softData="jumpData"></adjustment-letter> -->
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import PostDemand from "./viewAuditChild";
// import ProcessingRequirement from "./adjustDemand/processingRequirements";
// import AdjustmentLetter from "./adjustApplication/adjustmentLetter";
export default {
  components: {
    postDemand: PostDemand // 查看审核
    // processingRequirement: ProcessingRequirement, // 工作部已审核结果
    // adjustmentLetter: AdjustmentLetter, // 财务部未审核结果
  },
  data() {
    return {
      fullLoading: false,
      activeName: "first",
      activeDemand: "one",
      isShowte: false,
      isShowt: false,
      isShowo: true,
      isShowfour: false,
      isShowfive: false,
      isShowsix: false,
      jumpData: {}
    };
  },
  watch: {
    activeDemand(val) {
      if (val === "one") {
        this.isShowo = true;
        this.isShowt = false;
        this.isShowte = false;
        this.isShowfour = false;
        this.isShowfive = false;
        this.isShowsix = false;
      } else
      if (val === "two") {
        this.isShowo = false;
        this.isShowt = true;
        this.isShowte = false;
        this.isShowfour = false;
        this.isShowfive = false;
        this.isShowsix = false;
      } else if (val === "three") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = true;
        this.isShowfour = false;
        this.isShowfive = false;
        this.isShowsix = false;
      } else if (val === "four") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = false;
        this.isShowfour = true;
        this.isShowfive = false;
        this.isShowsix = false;
      } else if (val === "five") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = false;
        this.isShowfour = false;
        this.isShowfive = true;
        this.isShowsix = false;
      } else if (val === "six") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = false;
        this.isShowfour = false;
        this.isShowfive = false;
        this.isShowsix = true;
      }
    }
  },
  mounted() {
    if (this.$route.query.num) {
      this.activeDemand = this.$route.query.num;
    }
  },
  methods: {
    handwith(val) {
      this.activeDemand = "three";
      this.jumpData = val;
    },
    handChangeTab() {
      this.jumpData = {};
    }
  }
};
</script>

