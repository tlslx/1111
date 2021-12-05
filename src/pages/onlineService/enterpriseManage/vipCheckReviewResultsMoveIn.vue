/**
 * @file VIP企业查看审核结果（撤展证）
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="证件申请最终审核结果" name="0">
      <cust-table class="vip-enterprise-list" :cols="cols" :data="tableData"></cust-table>
      <el-button class="btn_apply" size="medium">证件申请</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
export default {
  name: "vipCheckReviewResultsMoveIn",
  components: {
    "cust-table": custTable
  },
  data() {
    return {
      activeName: 0,
      cols: [
        {
          prop: "sequenceNum",
          label: "序号"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "sex",
          label: "性别"
        },
        {
          prop: "documentType",
          label: "证件类型"
        },
        {
          prop: "cardNumber",
          label: "身份证号"
        },
        {
          prop: "nper",
          label: "期数"
        },
        {
          prop: "checkResults",
          label: "审核结果"
        },
        {
          prop: "checkOpinion",
          label: "审核意见"
        }
      ]
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            sequenceNum: "1",
            name: "张方",
            sex: "男",
            documentType: "撤展证",
            cardNumber: "340*********3117",
            nper: "1",
            checkResults: "审核通过",
            checkOpinion: " "
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.btn_apply {
  background: #0099ff;
  color: white;
  margin: 20px 0px;
  height: 40px;
  padding: 0px 30px;
}
</style>