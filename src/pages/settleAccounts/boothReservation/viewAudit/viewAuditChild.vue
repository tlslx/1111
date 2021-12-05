<style scoped>
.boothForm {
  margin-bottom: 5px;
}
</style>

<template>
  <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="查看审核" name="first"> -->
  <div>
    <!-- 表格 -->
    <simpleness-table
      :loading="loading"
      :tableData="tableData"
      :tableTrData="data"
      :newSummary="true"
    ></simpleness-table>
  </div>
      <!-- 分页 -->
      <!-- <div style="padding-top: 10px;float: right;">
        <pagination :pageInfo="paginationData" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div> -->
    <!-- </el-tab-pane>
  </el-tabs> -->
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
      data: [
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "品牌展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位总数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "标准展位费",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "计收百分比（%）",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "预订款金额",
          type: "string",
          width: "90"
        }
      ],
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
      this.$router.push("/companySureEdit");
    },
    // 当前行 是否可勾选
    cheSelectbox(row, index) {
      if (row.meetingStatus === '01' || row.meetingStatus === '06') {
        return true;
      } else {
        return false; //不可勾选
      }
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
    },
    // 返回
    handbBack() {
      this.$router.push("/collectBoothReservation");
    }
  }
};
</script>

