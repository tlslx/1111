/**
 * @file 企业被点击量/收藏量情况
 */
<style scope>
  .enter-container {
    padding-top: 20px;
  }
  .enter-hit-and-collection-container {
    padding-top: 30px;
  }
  .enter-hit-and-collection-content {
    width: 100%;
    height: 500px;
  }
</style>
<template>
  <div class="enter-container">
    <cust-table
      :cols="cols"
      :data="tableData"
      @deal-with-operate="dealWithOperate"
      @change-multiple-selection="changeMultipleSelection">
    </cust-table>
    <div class="enter-hit-and-collection-container">
      <custom-echarts key="enter-hit-and-collection" ref="enterHitAndCollection" :classSetting="classSetting" :extend-option="option"></custom-echarts>
    </div>
  </div>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import customEcharts from "@/components/project/onlineService/common/customEcharts.vue";
export default {
  data() {
    return {
      cols: [
        {
          "label": "月份",
          "prop": "month"
        },
        {
          "label": "2018年1月",
          "prop": "jan"
        },
        {
          "label": "2018年2月",
          "prop": "feb"
        },
        {
          "label": "2018年3月",
          "prop": "mar"
        },
        {
          "label": "2018年4月",
          "prop": "apr"
        },
        {
          "label": "2018年5月",
          "prop": "may"
        },
        {
          "label": "2018年6月",
          "prop": "jun"
        },
        {
          "label": "近6个月合计",
          "prop": "summary"
        }
      ],
      classSetting: 'enter-hit-and-collection-content',
      tableData: {
        data: [
          {
            "month": "企业被点击量",
            "jan": "17",
            "feb": "26",
            "mar": "50",
            "apr": "96",
            "may": "50",
            "jun": "96",
            "summary": "189"
          },
          {
            "month": "企业被收藏量",
            "jan": "55",
            "feb": "43",
            "mar": "73",
            "apr": "58",
            "may": "73",
            "jun": "58",
            "summary": "229"
          }
        ]
      }
    };
  },
  components: {
    "cust-table": custTable,
    "custom-echarts": customEcharts
  },
  computed: {
    option() {
      let result = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#00a1ff', '#60d937'],
        legend: {
          data: ['企业被点击量', '企业被收藏量']
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
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '企业被点击量',
            type: 'bar',
            barWidth: 20,
            data: [320, 332, 110, 330, 201, 102]
          },
          {
            name: '企业被收藏量',
            type: 'bar',
            barWidth: 20,
            data: [120, 132, 140, 150, 360, 150]
          }
        ]
      };
      return result;
    }
  },
  methods: {
    dealWithOperate() {},
    changeMultipleSelection() {}
  }
};
</script>



