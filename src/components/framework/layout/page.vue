<!--
  单个功能页模板
-->
<template>
  <el-layout ref="layout" class="el-page" :fit="fit" :left-width="leftWidth">
    <template slot="top"><slot name="header"></slot></template>
    <template slot="center" slot-scope="scope"><slot name="body" :height="scope.height"></slot></template>
    <template slot="bottom"><slot name="footer"></slot></template>
    <template slot="left"><slot name="lefter"></slot></template>
  </el-layout>
</template>

<script>
export default {
  name: "ElPage",
  props: {
    fit: { type: Boolean, default: true },
    leftWidth: { type: Number, default: 0 }
  },
  methods: {
    resize() {
      let _this = this;
      setTimeout(function() {
        _this.$refs["layout"].resize();
      }, 100);
    }
  }
};
</script>

<style>
.el-page {
  position: relative;
}
/* .el-page >>>
.el-layout>.el-layout-item.center {
  background-color: #fff;  
} */
</style>
