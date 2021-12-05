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
    <el-tab-pane label="展位预订款报表" name="first">
      <el-form :model="queryForm" :inline="true" size="small" label-width="80">
        <el-form-item label="届数：">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">读取展区状态</el-button>
        </el-form-item>
      </el-form>
      <!-- 横线 -->
      <el-divider></el-divider>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column align="center" min-width="120" label="展区" prop="companyName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位分配状态" prop="coceralName"></el-table-column>
        <el-table-column align="center" min-width="120" label="设置数据来源" prop="delegationName">
          <template slot-scope="scope">
            <el-select v-model="scope.$index" clearable>
              <!-- <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option> -->
              <el-option label="不计算费用" value="1"></el-option>
              <el-option label="获取具体展位分配及参照费用" value="2"></el-option>
              <el-option label="获取展位数量安排及展位费用标准" value="3"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small" @click="handJump">获取展位数据</el-button>
        <!-- <el-button type="primary" class="formStyle" size="small">不通过</el-button> -->
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
    return {
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
    // 编辑
    edit(a) {
    },
    // 页面跳转 获取展位数据
    handJump() {
      // window.print();
      this.$router.push(
        {
          path: "/getNumberBooths",
          query: {
            data: this.tableData
          }
        }
      );
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

