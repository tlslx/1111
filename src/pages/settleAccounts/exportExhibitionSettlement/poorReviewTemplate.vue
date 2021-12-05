<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="收费模板设置" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" label-width="80px" size="small">
          <el-form-item label="款项类别">
            <el-select v-model="formData.delegationIsRecommend" clearable>
              <el-option label="预订款" value="0"></el-option>
              <el-option label="预收费" value="1"></el-option>
              <el-option label="结算款" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="formData.delegationIsRecommend" clearable>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" size="small" @click="onSearch">筛选</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <simpleness-table
          :loading="loading"
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
          <el-button class="formStyle" type="primary" size="small">通过</el-button>
          <el-button class="formStyle" type="primary" size="small">不通过</el-button>
        </div>
        <!-- 分页 -->
        <!-- <div style="padding-top: 10px;float: right;">
          <pagination :pageInfo="paginationData" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
        </div> -->
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
      reviewTrDate: [],
      formData: {
        exhibitionArea: "",
        delegationIsRecommend: ""
      },
      tableData: [],
      data: [
        {
          width: "100",
          prop: "",
          type: "string",
          label: "款项类型"
        },
        {
          width: "100",
          prop: "",
          type: "string",
          label: "模板序号"
        },
        {
          width: "100",
          prop: "",
          type: "string",
          label: "所用模板"
        },
        {
          width: "100",
          prop: "",
          type: "string",
          label: "模板审核状态"
        },
        {
          width: "100",
          prop: "",
          type: "btn",
          label: "操作",
          textArray: [
            {
              label: "预览",
              type: "preview"
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
.floatRight {
  float: right;
  margin-right: 50px;
}
.acentsty {
  text-align: center;
  /* padding: 20px; */
}
</style>

