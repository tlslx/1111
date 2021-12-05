<template>
  <div v-loading.fullscreen="fullLoading">
    <!-- <el-button type="danger" @click="goBack">返回</el-button> -->
    <!-- tabel表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" prop="exhibitionArea" label="展区"></el-table-column>
      <el-table-column align="center" prop="boothType" label="展位类型"></el-table-column>
      <el-table-column align="center" prop="exhibitsCategory" label="展品分类"></el-table-column>
      <el-table-column align="center" prop="applyBoothNumber" label="申请数量"></el-table-column>
      <el-table-column align="center" prop="customCode" label="参评海关编码"></el-table-column>
      <el-table-column align="center" prop="beyond" label="参评境外注册商标"></el-table-column>
      <el-table-column align="center" prop="territory" label="境内注册商标"></el-table-column>
      <el-table-column align="center" prop="checkStatus" label="审核状态">
        <template slot-scope="scope">{{scope.row.checkStatus | checkState}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handelPass(scope.row)"
          >通过</el-button>
          <el-button
            type="primary"
            @click="handelNoPass(scope.row)"
          >不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-form :inline="true" style="float: right;">
      <el-form-item>
        <el-pagination
          style="margin-top: 5px;"
          background
          layout="total, prev, pager, next, jumper"
          :total="paginationData.total"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary">确定</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullLoading: true,
      obj: {
        companyId: 111,
        current: 1,
        size: 10
      },
      objOne: {
        brandApplyId: "1",
        checkStatus: "1"
      },
      queryData: {},
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      tableData: [],
      formData: {
        region: ""
      }
    };
  },
  filters: {
    checkState(value) {
      // let val = value - 0;
      if (value === "1") {
        return "审核通过";
      } else if (value === "0") {
        return "审核不通过";
      } else {
        return "未审核";
      }
    }
  },
  created() {
    this.queryData = this.$router.history.current.query.dataType;
  },
  mounted() {
    this.obj["companyId"] = this.queryData.companyId;
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("tradeGroupAudit", [
      "getcheckBrandBoothUseCondition",
      "updatecheckBrandBoothUseCondition"
    ]),
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    },
    // 通过
    handelPass(val) {
      this.$confirm("审核通过！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.objOne["brandApplyId"] = val.brandApplyId;
          this.objOne["checkStatus"] = 1;
          this.updatecheckBrandBoothUseCondition(this.objOne)
            .then(res => {
              this.getListPage(this.obj);
              this.$message({
                type: "success",
                message: "审核成功!"
              });
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    // 不通过
    handelNoPass(val) {
      this.$confirm("审核不通过！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.objOne["brandApplyId"] = val.brandApplyId;
          this.objOne["checkStatus"] = 0;
          this.updatecheckBrandBoothUseCondition(this.objOne)
            .then(res => {
              this.getListPage(this.obj);
              this.$message({
                type: "success",
                message: "审核成功!"
              });
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    // 获取页面数据
    getListPage(Url) {
      this.getcheckBrandBoothUseCondition(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          this.paginationData.total = res.total;
          this.paginationData.pageSize = res.size;
          this.paginationData.currentPage = res.current;
          this.tableData = res.records;
        })
        .catch(e => {
          // console.log(e);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
/* .fcolor {
  color: #0f0;
} */
.popup {
  position: absolute;
  left: 35%;
  top: 20%;
  width: 500px;
}
</style>


