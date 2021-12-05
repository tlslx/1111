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
    <el-tab-pane label="核对定金缴纳情况" name="first">
      <el-form :model="queryForm" :inline="true" size="small" label-width="80">
        <el-form-item label="期数：">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型：">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴纳状态：">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 横线 -->
      <!-- <el-divider></el-divider> -->
      <p><span>数据生成时间：{{date}}</span></p>
      <!-- 表格 -->
      <simpleness-table
        :loading="loading"
        :selection="isSelection"
        :tableData="tableData"
        :tableTrData="data"
        @selectionChange="seChange"
        @edit="edit"
      ></simpleness-table>
      <!-- <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small">通过</el-button>
        <el-button type="primary" class="formStyle" size="small">不通过</el-button>
      </div> -->
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
      data: [
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "企业名称",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "期数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展区",
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
          label: "展位数",
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
          label: "缴纳状态",
          type: "string",
          width: "90"
        },
        {
          type: "btn",
          width: "120",
          label: "操作",
          textArray: [
            {
              type: "edit",
              label: "编辑"
            }
          ]
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

