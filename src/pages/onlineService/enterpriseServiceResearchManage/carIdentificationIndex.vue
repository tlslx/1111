/**
 * @file 车辆证件指标
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="车辆证件指标" name="0">
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
        @change-multiple-selection="changeMultipleSelection"
      ></cust-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable
  },
  data() {
    return {
      activeName: 0,
      cols: [
        {
          prop: "bus",
          label: "大客车",
          type: "string"
        },
        {
          prop: "smallCar",
          label: "内停小车",
          type: "string"
        },
        {
          prop: "businessCar",
          label: "会务车",
          type: "string"
        },
        {
          prop: "incrementalIndicator",
          label: "增加的指标",
          type: "string"
        }
      ]
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            bus: "小于等于10",
            smallCar: "小于等于25",
            businessCar: "小于等于5",
            incrementalIndicator: "大货车数量小于等于8"
          }
        ]
      };
    }
  }
};
</script>
<style scoped>

</style>
