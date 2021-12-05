<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团确认提交贫困企业" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表格 -->
        <simpleness-table
          :loading="loading"
          :newSummary="isSummary"
          :selection="isSelection"
          :tableData="tableData"
          :tableTrData="data"
          @edit="edit"
          @selectionChange="seChange"
        ></simpleness-table>
        <!-- <canBeEdit-table
          :selection="isSelection"
          :loading="loading"
          :tableTrData="reviewTrDate"
          :tableData="tableData"
          @deal-with-operate="edit"
        ></canBeEdit-table> -->
        <!-- 通过/不通过 按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" size="small">提交</el-button>
        </div>
        <!-- 分页 -->
        <div style="padding-top: 10px;float: right;">
          <pagination :pageInfo="paginationData" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SimplenessTable from "@/components/project/common1/simplenessTable";
// import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common1/pagination";
export default {
  components: {
    "simpleness-table": SimplenessTable,
    // "canBeEdit-table": canBeEditTable,
    pagination
  },
  data() {
    return {
      obj: {
        current: "1",
        size: "10"
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      isSelection: true,
      loading: false, // canBeEditTable
      isSummary: false,
      reviewTrDate: [
        
      ],
      tableData: [],
      data: [
        {
          width: "80",
          prop: "",
          type: "index",
          label: "编号"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "交易团"
        },
        {
          width: "150",
          prop: "",
          type: "string",
          label: "参展企业名称"
        },
        {
          width: "120",
          prop: "",
          type: "string",
          label: "广交会编码"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "期数"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "展区"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "展位数"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "展位号"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "所属贫困县"
        },
        {
          width: "90",
          prop: "",
          type: "string",
          label: "审核情况（工资部审核结果）"
        },
        {
          width: "150",
          label: "操作",
          prop: "",
          type: "btn",
          textArray: [
            {
              label: "编辑",
              type: "edit"
            }
          ]
        }
      ],
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      optspe: [],
      activeName: "first"
    };
  },
  methods: {
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

<style scoped>
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

