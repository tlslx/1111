<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="商协会审核交易团展位调整申请" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="甲方交易团">
            <el-select v-model="formData.delegationId" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.delegationName"
                :value="item.delegationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编号">
            <el-input v-model.trim="formData.orderNo" maxlength="12"></el-input>
          </el-form-item>
          <el-form-item label="展位类别">
            <el-select v-model="formData.boothType" clearable>
              <el-option label="一般性展位" value="1"></el-option>
              <el-option label="中央通道展位" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调整类型">
            <el-select v-model="formData.adjustType" clearable>
              <el-option label="还原调整" value="RESTORE_EXCHANGE_UNEQUAL"></el-option>
              <el-option label="等量调换" value="EQUAL_EXCHANGE"></el-option>
              <el-option label="不等量调换" value="UNEQUAL_EXCHANGE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调换交易团">
            <el-select v-model="formData.otherDelegationCode" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.delegationName"
                :value="item.delegationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
           
          border
          size="small"
          show-summary
          :summary-method="getSummaries"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" fixed="left" :selectable="selecta" type="selection" width="55"></el-table-column>
          <el-table-column align="center" min-width="120" label="编号" prop="orderNo"></el-table-column>
          <el-table-column align="center" min-width="120" label="甲方交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="换入展位类别" prop="inArea"></el-table-column>
          <el-table-column align="center" min-width="120" label="换入数量" prop="inNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input v-model.trim="tabDat.inNumber" maxlength="8"></el-input>
              </div>
              <span v-else>{{scope.row.inNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="换出展位类别" prop="outArea"></el-table-column>
          <el-table-column align="center" min-width="120" label="换入位置信息" prop="boothTotal"></el-table-column>
          <el-table-column align="center" min-width="120" label="换出位置信息" prop="boothTotal"></el-table-column>
          <el-table-column align="center" min-width="120" label="调整交易团" prop="otherDelegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="调出数量" prop="outNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-input v-model.trim="tabDat.outNumber" maxlength="8"></el-input>
              </div>
              <span v-else>{{scope.row.outNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="调整类型" prop="adjustType">
            <template slot-scope="scope">
              {{scope.row.adjustType | adjustTypeAdjust}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展位类别" prop="boothType">
            <template slot-scope="scope">
              {{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="审核情况" prop="examineStatus">
            <template slot-scope="scope">{{scope.row.examineStatus | checkState}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="160" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                :disabled="scope.row.examineStatus !== '0'"
                @click="computEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" v-else @click="handSeave(scope.row, scope.$index)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="danger" size="small" class="formStyle" @click="delBoth(1)">通过</el-button>
          <el-button type="danger" size="small" class="formStyle" @click="delBoth(2)">不通过</el-button>
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
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      obj: {
        current: 1,
        size: 10,
        coceralId: "06"
      },
      formData: {
        delegationId: "",
        orderNo: "",
        inAreaCode: "",
        adjustType: "",
        otherDelegationCode: ""
      },
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      param: {
        examineStatus: "",
        ordinaryAdjustApplyDelegationList: []
      },
      fullLoading: true,
      lastIndexPage: "",
      tabDat: {
        inNumber: "",
        outNumber: ""
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
      },
      activeName: "first"
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
  mounted() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
    }
    this.getlistAdjustDemand();
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
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistCoceralScheduleApply", // 查询商协会审核交易团展位调整申请
      "updateadjustApplyDelegation", // 编辑一般性调整申请
      "updatecheckScheduleApplyByCoceral" // 商协会审核交易团展位调整申请
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.tableData = [];
      this.getlistCoceralScheduleApply(Url)
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
    onSearch() {
      this.obj = {
        current: "1",
        size: "10"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj["coceralId"] = this.$store.getters.userInfo.org.deptId;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 编辑
    computEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.tabDat.outNumber = val.outNumber;
        this.tabDat.inNumber = val.inNumber;
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 编辑 =》 保存
    handSeave(val, valId) {
      this.lastIndexPage = "";
      this.tableData[valId]["edit"] = false;
      let editTableData = {
        delegationCode: val.delegationCode,
        applyId: val.applyId,
        outAreaCode: val.outAreaCode,
        outNumber: this.tabDat.outNumber,
        inAreaCode: val.inAreaCode,
        inNumber: this.tabDat.inNumber,
        otherDelegationCode: val.otherDelegationCode
      };
      if (editTableData.inNumber === "") {
        this.$message("换入数量不能为空");
      } else if (editTableData.outNumber === "") {
        this.$message("换出数量不能为空");
      } else
      if (editTableData.inNumber.replace(/^([1-9][0-9]*)$/, "")) {
        this.$message("换入数量只能为正整数");
      } else if (editTableData.outNumber.replace(/^([1-9][0-9]*)$/, "")) {
        this.$message("换出数量只能为正整数");
      } else {
        this.updateadjustApplyDelegation(editTableData)
          .then(res => {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.getListPage(this.obj); // 调用初始加载页面方法
          })
          .catch(e => {});
      }
    },
    // 表格勾选时的事件
    handleSelectionChange(val) {
      this.param = {
        examineStatus: "",
        ordinaryAdjustApplyDelegationList: []
      };
      if (val.length === 0) {
        this.param = {
          examineStatus: "",
          ordinaryAdjustApplyDelegationList: []
        };
      } else {
        for (let i = 0; i < val.length; i++) {
          let ynPas = {
            applyId: val[i].applyId,
            examineOrgCn: "商协会"
          };
          this.param.ordinaryAdjustApplyDelegationList.push(ynPas);
        }
      }
    },
    // 是否禁用复选框事件
    selecta(row, index) {
      if (row.examineStatus === "1" || row.examineStatus === "2") {
        return false;
      } else {
        return true;
      }
    },
    // 批量通过/不通过
    delBoth(val) {
      if (this.param.ordinaryAdjustApplyDelegationList.length === 0) {
        this.$message("请勾选您要操作的数据");
      } else if (val === 1) {
        this.param.examineStatus = "1";
        this.$confirm("确认通过？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.updatecheckScheduleApplyByCoceral(this.param)
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
              message: "已取消操作"
            });
          });
      } else {
        this.param.examineStatus = "2";
        this.$confirm("确认不通过？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.updatecheckScheduleApplyByCoceral(this.param)
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
              message: "已取消操作"
            });
          });
      }
    },
    // 页面合计
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
        if (index === 11 || index === 12) {
          sums[index] = "--";
        }

      });
      return sums;
    },
    // 删除
    computDele() {},
    // 撤回
    revocation() {},
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
</style>


