<template>
  <el-card style="padding-bottom: 24px">
    <el-form :inline="true" :model="formData" v-loading.fullscreen="fullLoading" size="small">
      <el-form-item label="查看维度">
        <el-select v-model="isView" clearable>
          <el-option label="按需求安排" value="one"></el-option>
          <el-option label="按展区出口额占比安排" value="two"></el-option>
          <el-option label="汇总安排表" value="three"></el-option>
        </el-select>
      </el-form-item>
      <div v-if="isView === 'one' || isView === 'three'" style="display: inline-block;">
        <el-form-item label="申报名称">
          <el-input v-model.trim="formData.demandName" style="width: 215px" clearable></el-input>
        </el-form-item>
      </div>
      <el-form-item label="展期">
        <el-select v-model="formData.exhibitionPeriod" clearable>
          <el-option label="第一期" value="1"></el-option>
          <el-option label="第二期" value="2"></el-option>
          <el-option label="第三期" value="3"></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item class="floatRight">
        <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <div v-if="isView === 'one'">
      <el-table v-if="isView === 'one'" key="one" :data="tableData" size="small" style="width: 100%" border>
        <el-table-column align="center" min-width="120" label="申报名称" prop="demandName"></el-table-column>
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
          <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="申报需求数" prop="declareNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="安排展位数" prop="finalNumber">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <!-- <el-input v-model.trim="tabDat.finalNumber" maxlength="8"></el-input> -->
              <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule">
                <el-form-item prop="finalNumber">
                  <el-input v-model.trim.number="editform.finalNumber" :autofocus="true" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{scope.row.finalNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="isView === 'one'">
              <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="cont" v-if="isView === 'one'">
        <el-button type="primary" size="small" class="formStyle" @click="onSubmit">提交</el-button>
      </div>
    </div>
    <!-- 表二 -->
    <div v-if="isView === 'two'">
      <el-table v-if="isView === 'two'" key="two" :data="tableDataTwo" style="width: 100%" size="small" border>
        <el-table-column align="center" min-width="120" label="申报名称" prop="demandName"></el-table-column>
        <el-table-column align="center" min-width="120" label="交易团（分团）" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
          <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="展品专区" prop="productAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="申报展位数" prop="declareNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="出口额（美元）" prop="exportVolume"></el-table-column>
        <el-table-column align="center" min-width="120" label="出口额占比" prop="exportProportion"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位数" prop="boothNumber">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule">
                <el-form-item prop="boothNumber">
                  <el-input v-model.trim.number="editform.boothNumber" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{scope.row.boothNumber | piStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="isView === 'two'">
              <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="cont">
        <el-button type="primary" size="small" class="formStyle" @click="onSubmit">提交</el-button>
      </div>
    </div>
    <!-- 表三 -->
    <div v-if="isView === 'three'">
      <el-table v-if="isView === 'three'" key="three" :data="tableDataThree" style="width: 100%" size="small" border>
        <el-table-column align="center" min-width="120" label="申报名称" prop="demandName"></el-table-column>
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
          <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="展品专区" prop="productAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="商会" prop="coceralName"></el-table-column>
        <el-table-column align="center" min-width="120" label="拟安排展位数" prop="boothNumber">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule">
                <el-form-item prop="boothNumber">
                  <el-input v-model.trim.number="editform.boothNumber" maxlength="2"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{scope.row.boothNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="isView === 'three'">
              <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
              <el-button type="text" @click="onDele(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="cont">
        <el-button type="primary" size="small" class="formStyle" @click="onSubmit">提交</el-button>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
        return callback(new Error("必须大于等于0"));
      } else {
        return callback();
      }
    };
    return {
      isView: "one",
      obj: {},
      // 表单绑定数据
      formData: {
        demandName: "",
        delegationId: "", // 交易团
        exhibitionArea: "", // 展区
        companyCn: "" // 企业名称
      },
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [] // 交易团
      },
      lastIndexPage: "",
      tabDat: {},
      subm: [],
      editform: { finalNumber: "", boothNumber: "" },
      // 编辑表单规则
      editRule: {
        finalNumber: [{ validator: tynum, required: true, trigger: "blur" }],
        boothNumber: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      // 表格数据
      tableData: [],
      tableDataTwo: [],
      tableDataThree: [],
      fullLoading: true
    };
  },
  filters: {
    nper(data) {
      if (data === "1") {
        return "第一期";
      } else if (data === "2") {
        return "第二期";
      } else if (data === "3") {
        return "第三期";
      }
    },
    piStatus(val) {
      return parseInt(val);
    }
  },
  // created() {
  //   this.getListPage(this.obj);
  // },
  watch: {
    isView(val) {
      this.getListPage(this.obj);
    }
  },
  mounted() {
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "getlistordinarySpecialRangeDemand", //3.1获取特定范围展位申请-按需求数安排汇总列表 one
      "editordinarySpecialRangeDemand", // 3.2编辑特定范围展位申请-按需求数安排汇总列表 one
      "getlistOrdinarySpecialRangeExport", // 4.1获取特定范围展位申请-展区出口额占比安排汇总列表 two
      "editordinarySpecialRangeExport", // 4.2编辑特定范围展位申请-展区出口额占比安排信息 two
      "getlistOrdinarySpecialRangeTotal", // 5.1获取特定范围展位申请-安排汇总列表
      "editordinarySpecialRangeTotal", // 5.2编辑特定范围展位申请-安排汇总信息
      "deleordinarySpecialRangeTotal", // 5.3删除特定范围展位申请-安排汇总信息
      "addordinaryPostArrangeTotal", // 5.4提交汇总安排至外贸司审核
      "addtotalPostArrangeTotal" // 提交信息至安排汇总表
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      if (this.isView === "one") {
        this.getlistordinarySpecialRangeDemand(Url)
          .then(res => {
            this.fullLoading = false;
            this.tableData = [];
            let getTable = JSON.parse(JSON.stringify(res.records));
            for (let i = 0; i < getTable.length; i++) {
              getTable[i]["edit"] = false;
            }
            this.tableData = getTable;
          })
          .catch(e => {});
      } else if (this.isView === "two") {
        this.getlistOrdinarySpecialRangeExport(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableDataTwo = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
          this.tableDataTwo = getTable;
        })
        .catch(e => {});
      } else if (this.isView === "three") {
        this.getlistOrdinarySpecialRangeTotal(Url)
          .then(res => {
            this.fullLoading = false;
            this.tableDataThree = [];
            this.subm = [];
            let getTable = JSON.parse(JSON.stringify(res.records));
            for (let i = 0; i < getTable.length; i++) {
              getTable[i]["edit"] = false;
              let fist = {
                examineStatus: getTable[i].examineStatus,
                totalId: getTable[i].totalId
              };
              this.subm.push(fist);
            }
            this.tableDataThree = getTable;
          })
          .catch(e => {});
      }
    },
    // 查询
    onSearch() {
      this.obj = {};
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
    onEdit(val, valId) {
      if (this.isView === "one") {
        if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
          this.editform.finalNumber = val.finalNumber;
          this.editform["demandId"] = val.demandId;
          this.tableData[valId]["edit"] = true;
          this.lastIndexPage = valId;
        } else {
          this.$confirm("是否放弃本次修改")
            .then(() => {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i]["edit"] = false;
              }
              this.editform.finalNumber = val.finalNumber;
              this.editform["demandId"] = val.demandId;
              this.tableData[valId]["edit"] = true;
              this.lastIndexPage = valId;
            })
            .catch(() => {
              this.$message.info("已取消本次操作");
            });
        }
      } else if (this.isView === "two") {
        if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
          this.editform.boothNumber = parseInt(val.boothNumber);
          this.editform["exportId"] = val.exportId;
          // this.tabDat.inNumber = val.inNumber;
          this.tableDataTwo[valId]["edit"] = true;
          this.lastIndexPage = valId;
        } else {
          this.$confirm("是否放弃本次修改")
            .then(() => {
              for (let i = 0; i < this.tableDataTwo.length; i++) {
                this.tableDataTwo[i]["edit"] = false;
              }
              this.editform.boothNumber = parseInt(val.boothNumber);
              this.editform["exportId"] = val.exportId;
              this.tableDataTwo[valId]["edit"] = true;
              this.lastIndexPage = valId;
            })
            .catch(() => {
              this.$message.info("已取消本次操作");
            });
        }
      } else if (this.isView === "three") {
        if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
          this.editform.boothNumber = val.boothNumber;
          this.editform["totalId"] = val.totalId;
          // this.tabDat.inNumber = val.inNumber;
          this.tableDataThree[valId]["edit"] = true;
          this.lastIndexPage = valId;
        } else {
          this.$confirm("是否放弃本次修改")
            .then(() => {
              for (let i = 0; i < this.tableDataThree.length; i++) {
                this.tableDataThree[i]["edit"] = false;
              }
              this.editform.boothNumber = val.boothNumber;
              this.editform["totalId"] = val.totalId;
              this.tableDataThree[valId]["edit"] = true;
              this.lastIndexPage = valId;
            })
            .catch(() => {
              this.$message.info("已取消本次操作");
            });
        }
      }
    },
    // 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      if (this.isView === "one") {
        this.editRule.finalNumber[0].required = true;
        this.editRule.boothNumber[0].required = false;
      } else {
        this.editRule.finalNumber[0].required = false;
        this.editRule.boothNumber[0].required = true;
      }
      this.$refs[datae].validate((vald) => {
        if (vald) {
          if (this.isView === "one") {
            this.editordinarySpecialRangeDemand(this.editform)
              .then(res => {
                this.tableData[valId]["edit"] = false;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {});
          } else if (this.isView === "two") {
            this.editordinarySpecialRangeExport(this.editform)
              .then(res => {
                this.tableDataTwo[valId]["edit"] = false;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {});
          } else if (this.isView === "three") {
            this.editordinarySpecialRangeTotal(this.editform)
              .then(res => {
                this.tableDataThree[valId]["edit"] = false;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {});
          }
        }
      });
    },
    // 删除 three
    onDele(val) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleordinarySpecialRangeTotal(val)
            .then(res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 提交
    onSubmit() {
      if (this.isView === "three") {
        this.addordinaryPostArrangeTotal(this.subm).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getListPage(this.obj);
        }).catch(e => {
          this.$message({
            message: "无数据",
            type: "error"
          });
        });
      } else if (this.isView === "two") {
        this.addtotalPostArrangeTotal(this.tableDataTwo).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getListPage(this.obj);
        }).catch(e => {
          this.$message({
            message: "无数据",
            type: "error"
          });
        });
      } else {
        let data = this.tableData;
        for (let i = 0; i < this.tableData.length; i++) {
          data[i]["boothNumber"] = this.tableData[i].finalNumber;
        }
        this.addtotalPostArrangeTotal(data).then(res => {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.getListPage(this.obj);
        }).catch(e => {
          this.$message({
            message: "无数据",
            type: "error"
          });
        });
      }
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
.cont {
  text-align: center;
  margin-top: 20px;
}
</style>
