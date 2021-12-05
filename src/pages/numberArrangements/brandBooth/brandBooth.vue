<template>
  <!-- 默认标签页 -->
  <el-tabs v-model="activeName">
    <el-tab-pane label="整体展位数量进度计划安排设置" name="first">
    <!-- 子组件 -->
      <div>
        <!-- <normal-schedule v-if="isNormal" @childValue="childValue"></normal-schedule> -->
        <normal-schedule></normal-schedule>
        <!-- 特殊安排 -->
        <!-- <special-arrangements v-else @childValueTwo="childValueTwo"></special-arrangements> -->
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import NormalSchedule from "./normalSchedule";
// import SpecialArrangements from "./specialArrangements";
export default {
  components: {
    normalSchedule: NormalSchedule
    // specialArrangements: SpecialArrangements
  },
  data() {
    return {
      activeName: "first"
      // isNormal: true
    };
  },
  methods: {
    // childValue(val) {
    //   this.isNormal = false;
    // },
    // childValueTwo(val) {
    //   this.isNormal = true;
    // }
  }
};
</script>

