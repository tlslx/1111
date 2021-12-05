<template>
  <div v-loading.fullscreen="fullLoading">
    <el-card style="padding-bottom: 24px">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="甲方交易团">
          <el-select v-model="formData.delegationCode" clearable>
            <el-option
              v-for="(item, index) in localstora.delegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model.trim="formData.orderNo" maxlength="12" style="width: 215px;"></el-input>
          <!-- <el-select v-model="formData.orderNo" clearable> -->
          <!-- </el-select> -->
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
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换入展位">
          <el-select v-model="formData.inAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="换出展位">
          <el-select v-model="formData.outAreaCode" clearable>
            <el-option
              v-for="(item, index) in localstora.exhibitionArea"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearcher">查询</el-button>
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
        <el-table-column align="center" min-width="90" label="编号" prop="orderNo"></el-table-column>
        <el-table-column align="center" min-width="90" label="甲方交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="90" label="换入展位" prop="inArea"></el-table-column>
        <el-table-column align="center" min-width="90" label="换入数量" prop="inNumber"></el-table-column>
        <el-table-column align="center" min-width="90" label="换出展位" prop="outArea"></el-table-column>
        <el-table-column align="center" min-width="90" label="换出数量" prop="outNumber"></el-table-column>
        <el-table-column align="center" min-width="90" label="换入位置信息" prop="boothTotal"></el-table-column>
        <el-table-column align="center" min-width="90" label="换出位置信息" prop="boothTotal"></el-table-column>
        <el-table-column align="center" min-width="90" label="调整交易团" prop="otherDelegationName"></el-table-column>
        <el-table-column align="center" min-width="90" label="调整类型" prop="adjustType">
          <template slot-scope="scope">
            {{scope.row.adjustType | adjustTypeAdjust}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="90" label="展位类别" prop="boothType">
          <template slot-scope="scope">
            {{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="90" label="审核情况" prop="examineStatus">
          <template slot-scope="scope">{{scope.row.examineStatus | checkState}}</template>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="danger" size="small" class="formStyle" @click="handelSubmit(1)">通过</el-button>
        <el-button type="danger" size="small" class="formStyle" @click="handelSubmit(0)">不通过</el-button>
        <el-button type="primary" size="small" class="formStyle" @click="handEntering">录入展位调整</el-button>
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
      <!-- 是否计入基数 -->
      <el-dialog title="提示" :visible.sync="isPas" :close-on-click-modal="false" width="500px">
        <el-form size="small">
          <el-form-item label="是否计入基数">
            <el-select v-model="addBase">
              <el-option label="是" value="YES"></el-option>
              <el-option label="否" value="NO"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="baseBtn">
          <el-button type="primary" @click="addSubmit">确定</el-button>
          <el-button @click="isPas = false">取消</el-button>
        </div>
      </el-dialog>
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
        current: 1,
        size: 10
      },
      formData: {
        delegationCode: "",
        orderNo: "",
        inAreaCode: "",
        adjustType: "",
        boothType: "",
        otherDelegationCode: "",
        outAreaCode: ""
      },
      addBase: "NO", // 是否计入基数
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      param: {
        examineStatus: "",
        ordinaryAdjustApplyDelegationList: []
      },
      fullLoading: true,
      // 表格数据
      tableData: [],
      isPas: false,
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
  mounted() {
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
    this.getListPage(this.obj);
    // // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistWorkScheduleApply", // 查询工作部审核交易团展位调整申请
      "updatecheckScheduleApplyByWork" // 工作部审核商协会审核通过的一般性交易团展位申请调整，审核通过的话，同时生成调整记录
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistWorkScheduleApply(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = res.records;
        })
        .catch(e => {});
    },
    // 查询
    onSearcher() {
      this.obj = {
        current: "1",
        size: "10"
      };
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
            delegationCode: val[i].delegationCode,
            otherDelegationCode: val[i].otherDelegationCode,
            outAreaCode: val[i].outAreaCode,
            outNumber: val[i].outNumber,
            inAreaCode: val[i].inAreaCode,
            inNumber: val[i].inNumber,
            applyId: val[i].applyId,
            boothType: val[i].boothType,
            adjustType: val[i].adjustType,
            orderNo: val[i].orderNo,
            examineOrgCn: "工作部"
          };
          // 交易团
          // ynPas["delegationId"] = val[i].delegationId;
          // ynPas["otherDelegationId"] = val[i].otherDelegationId;
          for (let key = 0; key < this.localstora.delegation.length; key++) {
            if (this.localstora.delegation[key].deptCode === val[i].delegationCode) {
              ynPas["delegationName"] = this.localstora.delegation[key].deptName;
              ynPas["delegationId"] = this.localstora.delegation[key].deptId;
            }
            if (this.localstora.delegation[key].deptCode === val[i].otherDelegationCode) {
              ynPas["otherDelegationName"] = this.localstora.delegation[key].deptName;
              ynPas["otherDelegationId"] = this.localstora.delegation[key].deptId;
            }
          }
          // 展区
          for (let key = 0; key < this.localstora.exhibitionArea.length; key++) {
            if (this.localstora.exhibitionArea[key].exhibitionAreaCode === val[i].outAreaCode) {
              ynPas["outArea"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
            }
            if (this.localstora.exhibitionArea[key].exhibitionAreaCode === val[i].inAreaCode) {
              ynPas["inArea"] = this.localstora.exhibitionArea[key].exhibitionAreaName;
            }
          }
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
    handelSubmit(val) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      if (this.param.ordinaryAdjustApplyDelegationList.length === 0) {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.$message("请勾选您要操作的数据");
      } else if (val === 1) {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.isPas = true;
      } else {
        this.param.examineStatus = "2";
        this.$confirm("确认不通过？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.updatecheckScheduleApplyByWork(this.param)
              .then(res => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
                this.$message({
                  message: "操作成功！",
                  type: "success"
                });
                this.getListPage(this.obj);
              })
              .catch(e => {
                this.$nextTick(() => { 
                  fullScreenloading.close();
                });
              });
          })
          .catch(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      }
    },
    // 批量通过
    addSubmit() {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.param.examineStatus = "1";
      this.param["isJoinBase"] = this.addBase;
      this.updatecheckScheduleApplyByWork(this.param)
      .then(res => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.isPas = false;
        this.$message({
          message: "操作成功！",
          type: "success"
        });
        this.getListPage(this.obj);
      })
      .catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
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
        if (index === 11 || index === 12 || index === 3 || index === 5) {
          sums[index] = "--";
        }

      });
      return sums;
    },
    // 页面跳转 录入展位调整
    handEntering() {
      this.$router.push("/inputboothAdjustment");
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
.baseBtn {
  text-align: center;
  padding: 10px 0;
}
</style>


