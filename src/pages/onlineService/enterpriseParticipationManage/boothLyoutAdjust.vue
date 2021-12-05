/**
 * @file 展位布局类型调整
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="展位布展类型列表" name="0">
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
      ></cust-table>
      <el-button @click="recommendBuyers" class="btn_recommend" size="medium">申请调整</el-button>
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
          prop: "boothAdjustLayoutType",
          label: "展位调整布展类型",
          type: "string"
        },
        {
          prop: "exhibitionArea",
          label: "展区",
          type: "string"
        },
        {
          prop: "adjustNum",
          label: "调整数量",
          type: "string"
        },
        {
          prop: "boothNo",
          label: "展位号",
          type: "string"
        },
        {
          prop: "checkStatus",
          label: "审核状态",
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
            boothAdjustLayoutType: "标摊调整统一布局",
            exhibitionArea: "日用品",
            adjustNum: "3",
            boothNo: "H8A0",
            checkStatus: "审核通过"
          },
          {
            boothAdjustLayoutType: "标摊调整统一布局",
            exhibitionArea: "日用品",
            adjustNum: "3",
            boothNo: "H8A0",
            checkStatus: "审核通过"
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.btn_recommend {
  background: #ff6600;
  color: white;
  margin: 20px 0px;
  height: 40px;
  padding: 0px 30px;
}
</style>
