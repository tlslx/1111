<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="等量/不等量（含还原）调整" name="first">
      <el-tabs v-model="activeDemand" @tab-click="handChangeTab" type="card">
        <el-tab-pane label="发布展位调整需求"  name="one">
          <post-demand v-if="isShowo"></post-demand>
        </el-tab-pane>
        <el-tab-pane label="查看他团展位调整需求" name="two">
          <processing-requirement v-if="isShowt" @handWidth="handwith"></processing-requirement>
        </el-tab-pane>
        <el-tab-pane label="填写等量/不等量调整申请" name="three">
          <adjustment-letter v-if="isShowte" :softData="jumpData"></adjustment-letter>
        </el-tab-pane>
        <el-tab-pane label="处理他团等量/不等量调整申请" name="four">
          <processing-requirements v-if="isShowfour"></processing-requirements>
        </el-tab-pane>
        <el-tab-pane label="提交不等量还原调整申请" name="five">
          <reduction-adjustmenter v-if="isShowfive"></reduction-adjustmenter>
        </el-tab-pane>
        <!--
        <el-tab-pane label="调整记录查询" name="six">
          <online-inquiry v-if="isShowsix"></online-inquiry>
        </el-tab-pane>
        -->
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import PostDemand from "./adjustDemand/postDemand";
import ProcessingRequirement from "./adjustDemand/processingRequirements";
import AdjustmentLetter from "./adjustApplication/adjustmentLetter";
import ProcessingRequirements from "./adjustApplication/processingRequirements";
import ReductionAdjustmenter from "./reductionAdjustment/reductionAdjustmenter";
// import OnlineInquiry from "./reductionAdjustment/onlineInquiry";
export default {
  components: {
    postDemand: PostDemand, // 发布展位调整需求
    processingRequirement: ProcessingRequirement, // 查看他团展位调整需求
    adjustmentLetter: AdjustmentLetter, // 填写等量/不等量调整申请
    processingRequirements: ProcessingRequirements, // 处理他团等量/不等量调整申请
    reductionAdjustmenter: ReductionAdjustmenter // 提交不等量还原调整申请
    // onlineInquiry: OnlineInquiry // 调整记录查询
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
      // isShowsix: false,
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
        // this.isShowsix = false;
      } else
      if (val === "two") {
        this.isShowo = false;
        this.isShowt = true;
        this.isShowte = false;
        this.isShowfour = false;
        this.isShowfive = false;
        // this.isShowsix = false;
      } else if (val === "three") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = true;
        this.isShowfour = false;
        this.isShowfive = false;
        // this.isShowsix = false;
      } else if (val === "four") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = false;
        this.isShowfour = true;
        this.isShowfive = false;
        // this.isShowsix = false;
      } else if (val === "five") {
        this.isShowo = false;
        this.isShowt = false;
        this.isShowte = false;
        this.isShowfour = false;
        this.isShowfive = true;
        // this.isShowsix = false;
      } 
      // else if (val === "six") {
      //   this.isShowo = false;
      //   this.isShowt = false;
      //   this.isShowte = false;
      //   this.isShowfour = false;
      //   this.isShowfive = false;
      //   this.isShowsix = true;
      // }
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

