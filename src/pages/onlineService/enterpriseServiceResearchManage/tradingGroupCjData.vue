/**
 * @file 交易团成交数据
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查询成交统计明细" name="0"></el-tab-pane>
    <el-tab-pane label="查询企业成交汇总情况" name="1">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="广交会编码：">
          <el-input v-model="formInline.gjhMeetingCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input v-model="formInline.companyName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
          <el-col :span="11">
            <el-date-picker
              prop="date1"
              type="date"
              placeholder="选择日期"
              v-model="formInline.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">至</el-col>
          <el-col :span="11">
            <el-date-picker
              prop="date2"
              type="data"
              placeholder="选择时间"
              v-model="formInline.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
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
  name: "vipCheckReviewResultsReception",
  components: {
    "cust-table": custTable
  },
  data() {
    return {
      activeName: "1",
      formInline: {
        gjhMeetingCode: "",
        companyName: ""
      },
      cols: [
        {
          prop: "nper",
          label: "届数"
        },
        {
          prop: "time",
          label: "时间"
        },
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "gjhMeetingCode",
          label: "广交会编码"
        },
        {
          prop: "totalAmount",
          label: "成交总金额（万美元）"
        },
        {
          prop: "totalOrdersNum",
          label: "订单总数"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "查询",
              style: "cursor: pointer;text-decoration: underline;color: red;"
            },
            {
              type: "underlineText",
              label: "下载",
              style:
                "cursor: pointer;text-decoration: underline;color: red;margin: 0px 8px;"
            }
          ]
        }
      ]
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          },
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          },
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          },
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          },
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          },
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          },
          {
            nper: "123",
            time: "2018/04/19",
            companyName: "广东萌果科技有限公司",
            gjhMeetingCode: "328723",
            totalAmount: "4",
            totalOrdersNum: "53"
          }
        ]
      };
    }
  }
};
</script>
<style scoped>

</style>
