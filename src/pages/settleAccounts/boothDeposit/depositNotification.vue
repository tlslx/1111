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
    <el-tab-pane label="定金通知" name="first">
      <el-form :model="queryForm" :inline="true" size="small" label-width="80">
        <el-form-item label="届数">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单号">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站内信发送状态">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮件发送状态">
            <el-select v-model="queryForm.delegationIsRecommend" clearable>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="寄送状态">
          <el-select v-model="queryForm.exhibitionAreaCode" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 横线 -->
      <el-divider></el-divider>
      <!-- 内容 -->
      <div style="margin-bottom: 20px;">
        <div style="display: inline-block; line-height: 50px">
          <span>打印内容：</span>
           <el-checkbox-group v-model="checkList" style="display: inline-block;">
            <el-checkbox label="封面"></el-checkbox>
            <el-checkbox label="清单（展位费）"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div style="float: right">
          <span>起止发文函号：</span>
          <el-input size="mini" style="width: 80px;"></el-input><span>至</span><el-input size="mini" style="width: 80px;"></el-input>
          <el-button type="primary" size="mini">批量分配</el-button>
        </div>
        <div>
          <el-button type="primary">打印</el-button>
          <el-button type="primary">下载</el-button>
          <el-button type="primary">修改函号</el-button>
          <el-button type="primary">发送站内信</el-button>
          <el-button type="primary">发送邮件</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <simpleness-table
        :loading="loading"
        :selection="isSelection"
        :tableData="tableData"
        :tableTrData="data"
        @selectionChange="seChange"
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
    return {
      loading: false,
      tableData: [],
      checkList: [],
      isSelection: true,
      data: [
        {
          prop: "",
          label: "届数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "函号",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "站内信发送状态",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "邮件地址",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "邮件发送状态",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "寄送地址",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "寄送状态",
          type: "string",
          width: "90"
        },
        {
          type: 'btn',
          width: "120",
          label: "操作",
          textArray: [
            {
              type: "send",
              label: "寄送"
            },
            {
              type: "preview",
              label: "查看"
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

