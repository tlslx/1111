/**
 * @file 企业资料审核结果
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位申请情况" name="0"></el-tab-pane>
    <el-tab-pane label="企业资料审核结果" name="1">
      <cust-table class="vip-enterprise-list" :cols="cols" :data="tableData"></cust-table>
    </el-tab-pane>
    <el-tab-pane label="展位安排结果" name="2"></el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
export default {
  name: "vipCheckReviewResultsReception",
  components: {
    "cust-table": custTable
  },
  data() {
    return {
      activeName: "1",
      cols: [
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "tradeGroup",
          label: "交易团"
        },
        {
          prop: "exhibitionArea",
          label: "展区"
        },
        {
          prop: "boothType",
          label: "展位类型"
        },
        {
          prop: "applyNum",
          label: "申请数量"
        },

        {
          prop: "checkResults",
          label: "审核结果",
          style: "color: green"
        },
        {
          prop: "BoothsPositionResult",
          label: "展位位置结果",
          style: "color: blue"
        }
      ]
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            companyName: "广东萌果科技有限公司",
            tradeGroup: "广东省东菀市",
            exhibitionArea: "日用品",
            boothType: "一般性",
            applyNum: "12cm",
            checkResults: "审核通过",
            BoothsPositionResult: "标准展位"
          },
          {
            companyName: "广东萌果科技有限公司",
            tradeGroup: "广东省东菀市",
            exhibitionArea: "日用品",
            boothType: "一般性",
            applyNum: "12cm",
            checkResults: "审核通过",
            BoothsPositionResult: "标准展位"
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
</style>
