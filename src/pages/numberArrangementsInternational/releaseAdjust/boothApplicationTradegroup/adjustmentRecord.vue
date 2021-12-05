<template>
  <div v-loading.fullscreen="fullLoading">
    <!--<el-card style="padding-bottom: 24px">-->
      <!-- 表单 -->
    <el-form :inline="true" :model="formData" size="small">
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
      <el-form-item label="与之互调的交易团" label-width="160px">
        <el-select v-model="formData.adjustDelegationId" clearable>
          <el-option
            v-for="(item, index) in localstora.delegation"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区">
        <el-select v-model="formData.exhibitionAreaCode" clearable>
          <el-option
            v-for="(item, index) in localstora.exhibitionArea"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调整类型">
        <el-select v-model="formData.adjustType" clearable>
          <el-option label="还原调整" value="RESTORE_EXCHANGE_UNEQUAL"></el-option>
          <el-option label="等量调换" value="EQUAL_EXCHANGE"></el-option>
          <el-option label="不等量调换" value="UNEQUAL_EXCHANGE"></el-option>
          <el-option label="退回展位" value="REFUND"></el-option>
          <el-option label="新增展位" value="NEW_EXHIBITION"></el-option>
          <el-option label="展位类别调整" value="TYPE_EXCHANGE"></el-option>
          <el-option label="回收展位" value="RECOVERY"></el-option>
          <el-option label="其他" value="OTHER"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="届数">
        <el-select v-model="formData.exhibitionSession" clearable>
          <el-option v-for="(item, index) in localstora.exhibitionSession" :key="index" :value="item" :label="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展位类别">
        <el-select v-model="formData.boothType" clearable>
          <el-option label="一般性展位" value="1"></el-option>
          <el-option label="中央通道展位" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="floatRight">
        <el-button class="formStyle" type="primary" @click="onSear">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border size="small">
      <el-table-column align="center" min-width="76" label="届数" prop="exhibitionSession"></el-table-column>
      <el-table-column align="center" min-width="80" label="展位类型" prop="boothType">
        <template slot-scope="scope">
          {{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="编号" prop="serialNumber"></el-table-column>
      <el-table-column align="center" min-width="80" label="录入日期" prop="createDate">
        <!-- <template slot-scope="scope">
          {{scope.row.createDate | credat}}
        </template> -->
      </el-table-column>
      <el-table-column align="center" min-width="80" label="交易团" prop="delegationName"></el-table-column>
      <el-table-column align="center" min-width="80" label="展区" prop="exhibitionAreaName"></el-table-column>
      <el-table-column align="center" min-width="80" label="与之互调的交易团" prop="adjustDelegationName"></el-table-column>
      <el-table-column align="center" min-width="80" label="调整展位数" prop="adjustNumber">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-input v-model.trim="tabDat.adjustNumber" maxlength="4"></el-input>
          </div>
          <span v-else>{{scope.row.adjustNumber | pasintStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="调整类型" prop="adjustType">
        <template slot-scope="scope">
          {{scope.row.adjustType | adjustTypeAdjust}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="计入基数" prop="isJoinBase">
        <template slot-scope="scope">
          {{scope.row.isJoinBase === "YES" ? "是" : "否"}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="备注" prop="remark"></el-table-column>
      <el-table-column align="center" min-width="160" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">修改</el-button>
          <el-button type="text" v-else @click="onServe(scope.row, scope.$index)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 一堆按钮 -->
    <div class="paginationTop floatLeft">
      <el-button type="primary" class="formStyle" size="small" @click="handDownload">下载</el-button>
    </div>
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
    <!--</el-card>-->
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
        pageIndex: 1,
        pageSize: 10
      },
      tabDat: {
        adjustNumber: ""
      },
      formData: {
        delegationId: "",
        exhibitionAreaCode: "",
        adjustType: "",
        adjustDelegationId: "",
        exhibitionSession: "",
        boothType: ""
      },
      lastIndexPage: "",
      fullLoading: true,
      localstora: {
        exhibitionArea: [],
        delegation: [],
        exhibitionSession: []
      },
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
    },
    credat(val) {
      let value = val.substr(0, 10);
      return value;
    },
    pasintStatus(val) {
      return parseInt(Number(val));
    }
  },
  mounted() {
    // this.getlistAdjustDemand().then(res => {
    //   if (res.records.length !== 0) {
    //     let id = { adjustDemandId: res.records[0].adjustDemandId };
    //     this.getlistAreaCode(id).then(resarea => {
    //       for (let j = 0; j < resarea.records.length; j++) {
    //         this.localstora.exhibitionArea = JSON.parse(JSON.stringify(resarea.records));
    //       }
    //     }).catch(e => {});
    //     this.getlistDelegation(id).then(resde => {
    //       for (let j = 0; j < resde.records.length; j++) {
    //         this.localstora.delegation = JSON.parse(JSON.stringify(resde.records));
    //       }
    //     }).catch(e => {});
    //   }
    // }).catch(e => {});
    // 展区
    this.getexhibitionArea().then(resa => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.localstora.exhibitionSession.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.localstora.exhibitionSession = this.localstora.exhibitionSession.sort(rul);
    });
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getadjustRecord", // 查询生成的调整记录
      "updateentryBoothAdjustment" // 修改录入展位调整调换记录
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getsysExhibitions", //获取展届信息
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment", // 商协会
      "getcurrentExhibitionSession" // 展届
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.tableData = [];
      this.getadjustRecord(Url)
        .then(res => {
          this.fullLoading = false;
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 查询
    onSear() {
      this.obj = {
        pageIndex: 1,
        pageSize: 10,
        customQueryParams: []
      };
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        if (this.formData[key[i]] !== "" && this.formData[key[i]] != null) {
          let aFist = {
            name: key[i],
            findType: "EQ",
            joinType: "And",
            dataType: "Default",
            values: [this.formData[key[i]]],
            description: ""
          };
          this.obj.customQueryParams.push(aFist);
        }
      }
      this.getListPage(this.obj);
    },
    // 下载
    handDownload() {
      let url = "exhibitionSession=" + this.formData.exhibitionSession + "&boothType=" + this.formData.boothType + "&adjustDelegationId=" + this.formData.adjustDelegationId + "&delegationId=" + this.formData.delegationId + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode + "&adjustType=" + this.formData.adjustType + "&boothSource=0";
      url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/scheduleRecord/download?" + url + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 编辑 no
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.tabDat.adjustNumber = parseInt(Number(val.adjustNumber));
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.tabDat.adjustNumber = parseInt(Number(val.adjustNumber));
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 编辑 =》 保存 no
    onServe(val, valId) {
      this.lastIndexPage = "";
      this.tableData[valId]["edit"] = false;
      let editTableData = {
        adjustRecordId: val.adjustRecordId,
        adjustNumber: this.tabDat.adjustNumber
      };
      if (editTableData.adjustNumber === "") {
        this.$message("调整展位数不能为空");
      } else
      if (editTableData.adjustNumber.replace(/^-?\d+$/, "")) {
        this.$message("调整展位数只能为整数");
      } else {
        this.updateentryBoothAdjustment(editTableData)
          .then(res => {
            this.getListPage(this.obj); // 调用初始加载页面方法
          })
          .catch(e => {});
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '--';
        }
        if (index === 2 || index === 3 || index === 5) {
          sums[index] = "--";
        }

      });
      return sums;
    },
    // 撤回
    revocation() {},
    // 分条/页
    handleSizeChange(val) {
      this.obj.pageSize = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.pageIndex = val;
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
</style>


