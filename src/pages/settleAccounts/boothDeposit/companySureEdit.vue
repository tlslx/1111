<style scoped>
.formStyle {
  width: 300px;
}
</style>


<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="编辑" name="first">
      <el-form :model="queryForm" size="small" label-width="80">
        <el-form-item label="企业名称：">
          <span>北京绿色能源企业</span>
        </el-form-item>
        <el-form-item label="交易团：">
          <span>北京交易团</span>
        </el-form-item>
        <el-form-item label="定金金额：">
          <span>50,000</span>
        </el-form-item>
        <el-form-item label="期数：">
          <el-input class="formStyle"></el-input>
        </el-form-item>
        <el-form-item label="展区：">
          <el-select class="formStyle" v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型：">
          <el-select class="formStyle" v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：">
          <el-input class="formStyle"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handSure">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
      data: [
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位类型",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "固定定金值",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "定金比例",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "定金金额",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "审批状态",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "不通过原因",
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
    },
    // 确认
    handSure() {
      this.$router.push("/confirmEnterprisePayment");
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

