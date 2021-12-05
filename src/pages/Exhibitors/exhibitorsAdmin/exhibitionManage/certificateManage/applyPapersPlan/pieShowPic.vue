<style lang="less" scoped>

</style>

<template>
  <div>
    <el-row type="flex" justify="center">
      <!-- 额度 -->
      <el-col :span="12">
        <div id="left-pie" style="height:400px;width:50%"></div>
      </el-col>
      <!-- 申请数量 -->
      <el-col :span="12">
        <div id="right-pie" style="height:400px;width:50%"></div>
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
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          y: 'bottom',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      rightEcharts: null,
      rightOption: {
        title: {
          text: "证件申请进度饼状图",
          left: "center"
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          y: 'bottom',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.leftEcharts = echarts.init(document.getElementById('left-pie'));
    this.leftEcharts.setOption(this.leftOption);
    this.rightEcharts = echarts.init(document.getElementById('right-pie'));
    this.rightEcharts.setOption(this.rightOption);
  }
};
</script>
