/**
 * @file VIP企业查看会议室申请处理
 */
<template>
  <div class="vip-suminfo">
    <el-tabs v-model="activeName">
      <el-tab-pane label="VIP企业推荐汇总信息" name="first">
        <el-table
          :data="tableData"
          :header-cell-style="tableHeaderColor"
          :border=true
          size="small"
          style="width: 100%">
          <el-table-column align="center" prop="attendNum" label="参会人数"></el-table-column>
          <el-table-column align="center" prop="useTime" label="使用时间"></el-table-column>
          <el-table-column align="center" prop="meetingPackage" label="会议配套">
            <template slot-scope="scope">
              <el-button style="color: blue" size="small" type="text">查看会议套餐</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="meetingContent" label="会议内容">
            <template slot-scope="scope">
              <el-button style="color: blue" size="small" type="text">查看会议内容</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="note" label="备注"></el-table-column>
          <el-table-column align="center" prop="checkStates" label="审核状态"></el-table-column>
          <el-table-column align="center" prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button style="color: green" size="small" type="text">修改</el-button>
              <el-button style="color: red" size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="applyMeetingRoom" class="btn_applyMeetingRoom" size="medium">申请会议室</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          attendNum: "12",
          useTime: "2018/9/16-2018/11/20",
          note: " ",
          checkStates: "待审核"
        }
        // {
        //   attendNum: "12",
        //   useTime: "2018/9/16-2018/11/20",
        //   note: " ",
        //   checkStates: "待审核"
        // }
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
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    applyMeetingRoom() {

    }
  }
};
</script>
<style scoped>
.vip-suminfo .el-table {
  text-align: center;
}
.btn_applyMeetingRoom {
  background: #ff0000;
  color: white;
  margin-left: 45%;
  margin-top: 40px;
  padding: 0px 30px;
  height: 40px;
}
</style>
