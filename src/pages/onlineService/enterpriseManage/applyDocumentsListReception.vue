/**
 * @file 企业申请证件列表(接待证)
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核VIP证件申请" name="first">
      <el-table
        :data="tableData"
        :header-cell-style="tableHeaderColor"
        :border="true"
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
        <el-table-column align="center" prop="operation" label="操作" width="200">
          <template slot-scope="scope">
            <div class="block" style="display: flex; justify-content: center;">
              <el-button size="small" type="text">通过</el-button>
              <el-button style="color: red" size="small" type="text">不通过</el-button>
              <el-button style="color: green" size="small" type="text">开始审核</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        style="display: flex; align-items: right;padding-right: 120px; margin-left: 30%;margin-top: 40px"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="800"
        ></el-pagination>
        <el-button type="primary" size="medium" style="margin-left: 20px;">确定</el-button>
      </div>
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
          prop: "startTime",
          label: "开始时间"
        },
        {
          prop: "endTime",
          label: "结束时间"
        }
      ],
      tableData: [
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
        },
        {
          name: "张雪",
          sex: "男",
          documentType: "接待证",
          cardNumber: "382*********3672",
          nper: "1",
          startTime: "2017/01/15",
          endTime: "2018/04/19"
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
  },
  handleSizeChange(val) {
    // console.log(`每页 ${val} 条`);
  },
  handleCurrentChange(val) {
    // console.log(`当前页: ${val}`);
  }
};
</script>
<style scoped>
</style>
