<style lang="less" scoped>

</style>

<template>
  <div>
    <el-row type="flex" justify="center">
      <!-- 额度 -->
      <el-col :span="12">
        <div id="left-bar" style="height:400px;width:60%"></div>
      </el-col>
      <!-- 申请数量 -->
      <el-col :span="12">
        <div id="right-bar" style="height:400px;width:60%"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  props: {
    leftJSon: {
      type: Object,
      default: function() {
        return {};
      }
    },
    rightJSon: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      leftEcharts: null,
      leftOption: {
        title: {
          text: "证件申请进度饼状图",
          left: "center"
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      },
      rightEcharts: null,
      rightOption: {
        title: {
          text: "证件申请进度饼状图",
          left: "center"
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    };
  },
  mounted() {
    this.leftEcharts = echarts.init(document.getElementById('left-bar'));
    this.leftEcharts.setOption(this.leftOption);
    this.rightEcharts = echarts.init(document.getElementById('right-bar'));
    this.rightEcharts.setOption(this.rightOption);
  }
};
</script>
