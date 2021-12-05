<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸司查看审核展位安排调整方案" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" label-width="80px" size="small">
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionArea" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易团">
            <el-select v-model="formData.delegationId" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展期">
            <el-select v-model="formData.coceralIsRecommend" clearable>
              <el-option label="第一期" value="1"></el-option>
              <el-option label="第二期" value="2"></el-option>
              <el-option label="第三期" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="贫困县">
            <el-select v-model="formData.productType" clearable>
              <el-option label="响水县" value="xiangshuixian"></el-option>
              <!-- <el-option v-for="(item, index) in optspe" :key="index" :label="item.specialAreaName" :value="item.specialAreaCode"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="formData.delegationIsRecommend" clearable>
              <el-option label="已审核" value="1"></el-option>
              <el-option label="未审核" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" size="small" @click="onSearch">筛选</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <simpleness-table :tableData="tableData" :tableTrData="data" :selection="isSelection"></simpleness-table>
        <!-- <canBeEdit-table
          :selection="isSelection"
          :loading="loading"
          :tableTrData="reviewTrDate"
          :tableData="tableData"
        ></canBeEdit-table> -->
        <!-- 通过/不通过 按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" size="small">通过</el-button>
          <el-button type="primary" class="formStyle" size="small">不通过</el-button>
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
      formData: {
        exhibitionArea: "",
        delegationId: "",
        coceralIsRecommend: "",
        companyName: "",
        productType: "",
        cecfCode: "",
        delegationIsRecommend: ""
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      isSelection: true,
      loading: false, // canBeEditTable
      reviewTrDate: [],
      tableData: [],
      data: [
        {
          width: "80",
          type: "index",
          prop: "",
          label: "编号"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "交易团"
        },
        {
          width: "150",
          type: "string",
          prop: "",
          label: "参展企业名称"
        },
        {
          width: "120",
          type: "string",
          prop: "",
          label: "广交会编码"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "期数"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "展区"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "展位数"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "展位号"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "所属贫困县"
        },
        {
          width: "90",
          type: "string",
          prop: "",
          label: "审核状态"
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
    // 筛选
    onSearch() {

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

