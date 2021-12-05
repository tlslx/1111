<template>
  <el-card style="padding-bottom: 24px">
    <div>
      <!-- 表单 -->
      <el-form :inline="true" :model="formData" v-loading.fullscreen="fullLoading" size="small">
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
      <el-table :data="tableData" size="small" style="width: 100%" border>
        <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
          <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
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
            <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
            <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="cont">
        <el-button type="primary" class="formStyle">提交</el-button>
      </div> -->
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
      obj: {},
      // 表单绑定数据
      formData: {
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
      editform: { finalNumber: "" },
      // 编辑表单规则
      editRule: {
        finalNumber: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      // 表格数据
      tableData: [],
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
      "getlistordinarySpecialRangeDemand", //3.1获取特定范围展位申请-按需求数安排汇总列表
      "editordinarySpecialRangeDemand" // 3.2编辑特定范围展位申请-按需求数安排汇总列表
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
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
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editform.finalNumber = val.finalNumber;
        this.editform["demandId"] = val.demandId;
        // this.tabDat.inNumber = val.inNumber;
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
    },
    // 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      // this.
      this.$refs[datae].validate((vald) => {
        if (vald) {
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
        }
      });
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

