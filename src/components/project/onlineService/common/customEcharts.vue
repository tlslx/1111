<style scoped>
</style>
<template>
  <div class="echarts-container" :class="classSetting" ref="echarts-contents">
    <div class="echarts-contents" :id="echartsKey" :ref="echartsKey" :style="{width: contentWidth + 'px', height: contentHeight + 'px'}"></div>
  </div>
</template>
<script>
// import echarts from "echarts";
if (!global.echarts) {
  global.echarts = echarts;
}
export default {
  props: {
    extendOption: {
      default: {}
    },
    classSetting: '',
    custRender: {
      default: () => {
        return function() {};
      }
    },
    eventsListener: {
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.contentWidth = this.$refs['echarts-contents'].clientWidth;
      this.contentHeight = this.$refs['echarts-contents'].clientHeight;
      this.$nextTick(() => {
        this.refreshCharts();
        this.refreshRender();
        if (this.eventsListener) {
          for (const key in this.eventsListener) {
            this.echartInstance.on(key, this.eventsListener[key]);
          }
        }
      });
    });
  },
  data() {
    return {
      echartInstance: null,
      defaultOption: {},
      contentWidth: 0,
      contentHeight: 0,
      echartsKey: Math.random() * 10,
      options: {}
    };
  },
  methods: {
    refreshCharts() {
      if (!this.echartInstance) {
        this.echartInstance = echarts.init(document.getElementById(this.echartsKey));
      }
      this.options = Object.assign(Object.assign({}, this.defaultOption), this.extendOption);
      this.echartInstance.setOption(this.options);
    },
    refreshRender() {
      let _zr = this.echartInstance.getZr();
      this.custRender(_zr);
    },
    resizeChart() {
      this.echartInstance.resize();
    }
  },
  computed: {
  },
  watch: {
    extendOption: {
      handler() {
        this.options = Object.assign(Object.assign({}, this.defaultOption), this.extendOption);
      },
      deep: true
    }
  }
};
</script>

