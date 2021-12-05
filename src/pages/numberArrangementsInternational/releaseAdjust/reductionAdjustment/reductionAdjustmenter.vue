<template>
  <div v-loading.fullscreen="fullLoading" class="pad-b">
    <el-card style="padding-bottom: 24px">
      <!-- 表单 -->
      <el-form :inline="true" :model="obj" size="small">
        <el-form-item label="届数">
          <el-select v-model="obj.exhibitionSession" clearable>
            <el-option v-for="(item, key) in exhibitionSessionOpts" :key="key" :value="item.exhibitionNum" :label="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="与本团互调的交易团" label-width="160px">
          <el-select v-model="obj.adjustDelegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="obj.exhibitionAreaCode" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
        <el-table-column align="center" min-width="120" label="序号" prop="serialNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="调整展位数" prop="adjustNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="与本团互调的交易团" prop="adjustDelegationName"></el-table-column>
        <el-table-column align="center" min-width="160" label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-show="scope.row.adjustType === 'EQUAL_EXCHANGE'" :disabled="handl && !((scope.row.otherDelegationConfirm === '2' && scope.row.examineStatus === '2') || scope.row.otherDelegationConfirm === '1')" @click="amountChange(scope.row)">等量调换</el-button>
            <el-button type="text" v-show="scope.row.adjustType === 'UNEQUAL_EXCHANGE'" :disabled="handl && !((scope.row.otherDelegationConfirm === '2' && scope.row.examineStatus === '2') || scope.row.otherDelegationConfirm === '1')" @click="amountChange(scope.row)">还原</el-button>
            <el-button type="text" @click="handlePrint(scope.row)">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="primary" size="small" class="formStyle" @click="handleDownload">下载</el-button>
      </div>
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
      obj: {
        exhibitionSession: null,
        adjustDelegationId: "",
        exhibitionAreaCode: "",
        delegationId: "",
        current: 1,
        size: 10
      },
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      // hand: true, // 有没有还原调整
      handl: true,
      localstora: {},
      formData: {
        exhibitionSession: "",
        adjustDelegationId: "",
        exhibitionAreaCode: ""
      },
      fullLoading: true,
      // 表格数据
      tableData: [],
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
  filters: {
    checkState(value) {
      if (value === "1") {
        return "通过";
      } else if (value === "2") {
        return "不通过";
      } else if (value === "0") {
        return "未审核";
      } else {
        return "待确认";
      }
    },
    adjustTypeAdjust(val) {
      switch (val) {
        case "REFUND":
          return "退回展位";
        case "NEW_EXHIBITION":
          return "新增展位";
        case "EQUAL_EXCHANGE":
          return "等量调换";
        case "RECOVERY":
          return "回收展位";
        case "TYPE_EXCHANGE":
          return "展位类别调整";
        case "UNEQUAL_EXCHANGE":
          return "不等量调换";
        case "RESTORE_EXCHANGE_EQUAL":
          return "还原调整（等量调换）";
        case "RESTORE_EXCHANGE_UNEQUAL":
          return "还原调整（还原）";
        case "OTHER":
          return " 其他";
        default:
          return "";
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    // 届数范围
    this.getsysExhibitions().then(res => {
      this.exhibitionSessionOpts = JSON.parse(JSON.stringify(res)).data;
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getlistAdjustDemand();
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    this.getListPage(this.obj);
    // if (JSON.stringify(this.localstora) === "{}") {
    //   this.$message({
    //     message: "请设置工作部设置调整规则",
    //     type: "danger"
    //   });
    // } else
    // if (this.localstora.records[0].adjustType === "1" || this.localstora.records[0].adjustType === "1,2" || this.localstora.records[0].adjustType === "2,1" || this.localstora.records[0].adjustType === "2") {
    //   this.handl = true;
    // }
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistRestoreScheduleApply", // 查询还原调整
      "addrestoreScheduleApply" // 进行还原调整
    ]),
    ...mapActions('nainformation', ['getsysExhibitions', 'getdelegationDepartment', 'getexhibitionArea']),
    // 获取页面数据 ok
    getListPage(Url) {
      this.getlistRestoreScheduleApply(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = res.records;
        })
        .catch(e => {
          this.fullLoading = false;
        });
    },
    // 下载
    handleDownload() {
      let url = `delegationId=${this.obj.delegationId}&adjustDelegationId=${this.obj.adjustDelegationId}&exhibitionSessioin=${this.obj.exhibitionSessioin}&exhibitionAreaCode=${this.obj.exhibitionAreaCode}&current=1&size=${this.paginationData.total}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/ordinaryAdjustApplyDelegation/restoreScheduleApply/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 查询
    onSearch() {
      this.obj.current = 1;
      // let key = Object.keys(this.formData);
      // for (let i = 0; i < key.length; i++) {
      //   let aFirst = key[i];
      //   let bSecend = this.formData[key[i]];
      //   if (bSecend !== "") {
      //     this.obj[aFirst] = bSecend;
      //   }
      // }
      this.getListPage(this.obj);
    },
    // 等量调换/还原 ok
    amountChange(val) {
      let pac = {
        delegationCode: this.$store.getters.userInfo.org.deptCode,
        adjustDelegationCode: val.adjustDelegationCode,
        exhibitionSession: val.exhibitionSession,
        orderId: val.orderId
      };
      this.$confirm("确认进行该操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addrestoreScheduleApply(pac)
            .then(res => {
              this.$message({
                message: "操作成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消该操作"
          });
        });
    },
    // 跳转打印页
    handlePrint(row) {
      this.$router.push({ path: '/submitPrintPage', query: { data: row }});
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
.pad-b {
  padding: 5px;
}
</style>


