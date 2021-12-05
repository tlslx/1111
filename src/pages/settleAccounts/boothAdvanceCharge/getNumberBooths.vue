<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
</style>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="获取展位数据" name="first">
      <p><span>届数：120</span></p>
      <p>
        <span>数据生成时间：{{date}}</span>
        <el-button type="primary" class="floatRight">读取展区状态</el-button>
      </p>
      <!-- 横线 -->
      <el-divider></el-divider>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" label="源A：获取具体展位分配">
          <el-table-column align="center" min-width="80" prop="province" label="届数"></el-table-column>
          <el-table-column align="center" min-width="80" prop="city" label="期数"></el-table-column>
          <el-table-column align="center" min-width="80" prop="address" label="交易团"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="企业"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="结算方式"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="展区"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="专区"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="展位位置"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="展位类型"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="布展类型"></el-table-column>
        </el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 100%; margin-top: 30px;">
        <el-table-column align="center" label="源B：获取展位数量安排">
          <el-table-column align="center" min-width="80" prop="province" label="届数"></el-table-column>
          <el-table-column align="center" min-width="80" prop="city" label="期数"></el-table-column>
          <el-table-column align="center" min-width="80" prop="address" label="交易团"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="企业"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="结算方式"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="展区"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="专区"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="布展类型"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="展位位置"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="展位类型"></el-table-column>
          <el-table-column align="center" min-width="80" prop="zip" label="安排数量"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small" @click="handBack">返回</el-button>
        <el-button type="primary" class="formStyle" size="small">汇总计算预收费</el-button>
      </div>
      <!-- 分页 -->
      <div style="padding-top: 10px;float: right;">
        <pagination :pageInfo="paginationData" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SimplenessTable from "@/components/project/common1/simplenessTable";
import pagination from "@/components/project/common1/pagination";
import { mapActions } from "vuex";
export default {
  components: {
    "simpleness-table": SimplenessTable,
    pagination
  },
  data() {
    let myDate = new Date();
    let date = myDate.toLocaleString();
    return {
      date,
      loading: false,
      tableData: [],
      checkList: [],
      isSelection: true,
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      activeName: "first"
    };
  },
  created() {
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 获取页面初始数据
    getListPage(url) {

    },
    // 组件打钩项
    handSele() {},
    // 组件打钩事件
    seChange(val) {
    },
    // 筛选
    onSearch() {

    },
    // 返回
    handBack() {
      this.$router.push("/summarizeExpensesTradeteam");
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>

