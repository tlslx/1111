<template>
  <div v-loading.fullscreen="fullLoading">
    <el-card style="padding-bottom: 24px">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" size="small" label-width="130px">
        <el-form-item label="展位类型">
          <el-select v-model="formData.boothType" clearable>
            <el-option label="一般性展位" value="1"></el-option>
            <el-option label="中央通道展位" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本团换入展位类别">
          <el-select v-model="formData.outAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="本团换出展位类别">
          <el-select v-model="formData.inAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效情况">
          <el-select v-model="formData.otherDelegationConfirm" @change="handleChange" clearable>
            <el-option label="待确认" value="0"></el-option>
            <el-option label="待审核" value="10"></el-option>
            <el-option label="审核通过" value="11"></el-option>
            <el-option label="审核不通过" value="12"></el-option>
            <el-option label="还原调整" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" size="small" v-loading="loading" border>
        <el-table-column align="center" min-width="120" label="编号" prop="orderNo"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位类型" prop="boothType">
          <template slot-scope="scope">{{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="对方交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="本团换入展位类别" prop="outArea"></el-table-column>
        <el-table-column align="center" min-width="120" label="本团换入展位数" prop="outNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="本团换出展位类别" prop="inArea"></el-table-column>
        <el-table-column align="center" min-width="120" label="本团换出展位数" prop="inNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="生效情况" prop="otherDelegationConfirm">
          <template slot-scope="scope">{{scope.row | checkState}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handelSure(scope.row)" :disabled="scope.row.otherDelegationConfirm !== '0'">确认</el-button>
            <el-button type="text" @click="handelDelete(scope.row)" :disabled="scope.row.otherDelegationConfirm !== '0'">删除</el-button>
            <!--<el-button type="text" @click="handDownload(scope.row)">打印</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <!-- <div class="paginationTop floatLeft">
        <el-button type="primary" size="small" class="formStyle" @click="handDownload">打印</el-button>
      </div> -->
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="paginationData.pageSizes"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      loading: false,
      fullLoading: true,
      formData: {
        boothType: "",
        otherDelegationConfirm: "",
        inAreaCode: "",
        outAreaCode: "",
        examineStatus: '',
        delegationId: this.$store.getters.userInfo.org.deptId
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      }, // 数据字典
      formOptionOne: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "2018",
          value: "2018"
        }
      ],
      // 表格数据
      tableData: [],
      token: "",
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    queryData() {
      return {
        boothType: this.formData.boothType,
        otherDelegationConfirm: "",
        inAreaCode: this.formData.inAreaCode,
        outAreaCode: this.formData.outAreaCode,
        examineStatus: '',
        delegationId: this.formData.delegationId,
        page: this.paginationData.currentPage,
        size: this.paginationData.pageSize
      };
    }
  },
  filters: {
    checkState(value) {
      if (value.otherDelegationConfirm === "0") {
        return "待确认";
      } else if (value.otherDelegationConfirm === "1" && value.examineStatus === '0') {
        return "待审核";
      } else if (value.otherDelegationConfirm === "1" && value.examineStatus === '1') {
        return "审核通过";
      } else if (value.otherDelegationConfirm === "1" && value.examineStatus === '2') {
        return "审核不通过";
      } else if (value.otherDelegationConfirm === "2") {
        return "还原调整";
      }
    }
  },
  mounted() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // this.getlistAdjustDemand();
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    this.getListPage(this.queryData);
    this.token = localStorage.getItem("USER_TOKEN");
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistPostScheduleApply", // 填写一般性调整申请时，查询需要处理的展位调整请求
      "updatepostScheduleApply" // 填写一般性调整申请时，处理展位调整需求
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    // 生效情况
    handleChange(val) {
      if (val === '10') {
        this.queryData.otherDelegationConfirm = '1';
        this.queryData.examineStatus = '0';
      } else if (val === '11') {
        this.queryData.otherDelegationConfirm = '1';
        this.queryData.examineStatus = '1';
      } else if (val === '12') {
        this.queryData.otherDelegationConfirm = '1';
        this.queryData.examineStatus = '2';
      } else {
        this.queryData.otherDelegationConfirm = val;
        this.queryData.examineStatus = '';
      }
    },
    // 获取页面数据
    getListPage(Url) {
      this.loading = true;
      this.tableData = [];
      this.getlistPostScheduleApply(Url)
        .then(res => {
          this.loading = false;
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 查询
    onSearch() {
      this.paginationData.currentPage = 1;
      this.getListPage(this.queryData);
    },
    // 下载
    // handDownload(data) {
    //   // let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&delegationId=" + this.obj.delegationId + "&delegationName=" + this.$store.getters.userInfo.org.deptName + "&boothType=" + this.formData.boothType + "&token=" + this.token;
    //   // window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/postScheduleApply/download?current=" + url, "_parent");
    //   this.$router.push({
    //     path: "/printedPageOne",
    //     query: {
    //       data: data,
    //       tatal: this.paginationData.total
    //     }
    //   });
    // },
    // 我方确认
    handelSure(val) {
      this.$confirm("是否确认申请并提交广交会工作部？", "确认", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let tsub = {
            applyId: val.applyId,
            otherDelegationConfirm: "1"
          };
          this.updatepostScheduleApply(tsub)
            .then(res => {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.getListPage(this.queryData);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消确认"
          });
        });
    },
    // 删除
    handelDelete(row) {
      this.$confirm('确认是否删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(`${process.env.API_NA_URL}/api/ordinaryAdjustApplyDelegation/delete`, { applyId: row.applyId }).then(res => {
          this.$message.success('删除成功');
          this.getListPage(this.queryData);
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 分条/页
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
      this.getListPage(this.queryData);
    },
    // 分页
    handleCurrentChange(val) {
      this.paginationData.currentPage = val;
      this.getListPage(this.queryData);
    }
  }
};
</script>
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


