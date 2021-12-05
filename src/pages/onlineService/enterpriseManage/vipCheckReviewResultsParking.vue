/**
 * @file VIP企业查看审核结果(内停车证)
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="证件申请最终审核结果" name="first">
      <el-table
        :data="tableData"
        :header-cell-style="tableHeaderColor"
        :border=true
        size="small"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in cols"
          :key="index"
          align="center"
          :prop="item.prop"
          :label="item.label"
        ></el-table-column>
      </el-table>
      <el-button class="btn_apply" size="medium">证件申请</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      cols: [
        {
          prop: "number",
          label: "序号"
        },
        {
          prop: "models",
          label: "车型(座)"
        },
        {
          prop: "busNumber",
          label: "车牌号码"
        },
        {
          prop: "documentType",
          label: "证件类型"
        },
        {
          prop: "nper",
          label: "期数"
        },
        {
          prop: "enterStartTime",
          label: "进馆开始时间"
        },
        {
          prop: "enterEndTime",
          label: "进馆结束时间"
        },
        {
          prop: "driverName",
          label: "驾驶人姓名"
        },
        {
          prop: "cardNumber",
          label: "身份证号"
        },
        {
          prop: "phoneNumber",
          label: "手机号"
        },
        {
          prop: "parkingPlace",
          label: "停车地点"
        },
        {
          prop: "checkResults",
          label: "审核结果"
        },
        {
          prop: "checkOpinion",
          label: "审核意见"
        }
      ],
      tableData: [
        {
          number: "1",
          models: "小型汽车",
          busNumber: "皖B34784",
          documentType: "内停车证",
          nper: "1",
          enterStartTime: "2017/10/29",
          enterEndTime: "2018/2/18",
          driverName: "张娇",
          cardNumber: "340*********3117",
          phoneNumber: "189****8384",
          parkingPlace: "C区车库",
          checkResults: "审核通过",
          checkOpinion: " "
        }
      ]
    };
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f5f5f5;";
        //  return "background-color: #f5f5f5;color: #B6B5C2;font-weight: 500;";
      }
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
  padding: 10px 30px;
}
</style>