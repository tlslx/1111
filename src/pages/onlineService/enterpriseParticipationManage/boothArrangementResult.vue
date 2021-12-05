/**
 * @file 展位安排结果
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位申请情况" name="0"></el-tab-pane>
    <el-tab-pane label="企业资料审核结果" name="1"></el-tab-pane>
    <el-tab-pane label="展位安排结果" name="2">
      <cust-table class="vip-enterprise-list" :cols="cols" :data="tableData"></cust-table>
    </el-tab-pane>
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
      activeName: "2",
      cols: [
        {
          prop: "exhibitionArea",
          label: "展区"
        },
        {
          prop: "boothNature",
          label: "展位性质"
        },
        {
          prop: "applyNum",
          label: "申请数量"
        },
        {
          prop: "consortium",
          label: "联营企业(审核情况)"
        },
        {
          prop: "boothApplyStatus",
          label: "展位申请审核情况"
        },
        {
          prop: "arrangeBoothsNum",
          label: "安排展位数",
          style: "color: red"
        },
        {
          prop: "operation",
          label: "操作"
        }
      ]
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            exhibitionArea: "日用品",
            boothNature: "一般性",
            applyNum: "12cm",
            consortium: "萌果科技（已审核）",
            boothApplyStatus: "未审核",
            arrangeBoothsNum: "标准展位2个",
            operation: ""
          },
          {
            exhibitionArea: "纺织品",
            boothNature: "一般性",
            applyNum: "12cm",
            consortium: "萌果科技（已审核）",
            boothApplyStatus: "未审核",
            arrangeBoothsNum: "标准展位2个",
            operation: ""
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
</style>
