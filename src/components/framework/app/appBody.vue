<template>
  <div class="app-body" v-loading="loading" :style="{height:height+'px'}">
    <router-view v-if="isRouterAlive"></router-view>
  </div>

</template>

<script>
export default {
  name: "AppBody",
  props: ["height"],
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }
  },
  computed: {
    loading() {
      return this.$store.state.pageLoading;
    }
  }
};
</script>

<style>
.app-body {
  /* overflow: hidden; */
  margin-left: 0px;
  padding: 0px;
  box-sizing: border-box;
  /* background-color: #fbf8f87a; */
  background-color: #fff;
}

.app-body .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.5);
}

.el-main,
.el-tabs {
  background: #fff;
}
</style>

