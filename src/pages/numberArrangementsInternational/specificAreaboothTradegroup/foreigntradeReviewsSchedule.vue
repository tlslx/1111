<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸司审定安排表" name="first" v-loading.fullscreen="fullLoading">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small" v-loading.fullscreen="fullLoading">
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
          <el-form-item label="申报名称">
            <el-input v-model.trim="formData.demandName" style="width: 215px" clearable></el-input>
            <!-- <el-select v-model="formData.demandName" clearable>
              <el-option label="申报" value="1"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <el-table-column align="center" min-width="120" label="申报名称" prop="demandName"></el-table-column>
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod">
            <template slot-scope="scope">
              {{scope.row.exhibitionPeriod | nper}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展品专区" prop="productAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="商会" prop="coceralName"></el-table-column>
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
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
          <el-table-column align="center" min-width="160" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="yPass(scope.row)">通过</el-button>
              <el-button type="text" @click="nPass(scope.row)">不通过</el-button>
              <el-button
                type="text"
                v-if="!scope.row.edit"
                @click="onEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog title="审核" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" width="500px">
          <el-form :model="auditForm" ref="auditRef" size="small" :rules="auditRules" label-width="120px">
            <el-form-item label="不通过原因 ：" prop="examineOpinion">
              <el-input type="textarea" v-model="auditForm.examineOpinion" row="5"></el-input>
            </el-form-item>
            <div class="cont">
              <el-button class="formStyle" @click="npSeave('auditRef')">保存</el-button>
              <el-button class="formStyle" @click="handCancel">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
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
        demandName: "",
        delegationId: "", // 交易团
        exhibitionArea: "", // 展区
        exhibitionPeriod: "" // 企业名称
      },
      isShow: false,
      optionDelegation: [],
      optionExhibition: [],
      localstora: {
        exhibitionArea: [], // 展区
        delegation: [] // 交易团
      },
      auditForm: { examineOpinion: "" },
      subm: {
        examineUserId: this.$store.getters.userInfo.userId,
        examineUserCn: this.$store.getters.userInfo.userName
      },
      editform: { boothNumber: "" },
      lastIndexPage: "",
      // 编辑表单规则
      editRule: {
        boothNumber: [{ validator: tynum, required: true, trigger: "change" }]
      },
      auditRules: {
        examineOpinion: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      // 表格数据
      tableData: [],
      activeName: "first",
      fullLoading: false
    };
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
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "getlistPostArrangeTotal", // 6.1获取外贸司审核安排列表
      "editordinarySpecialRangeTotal", // 5.2编辑特定范围展位申请-安排汇总信息
      "editordinaryPostArrangeTotal" // 6.2外贸司审核
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistPostArrangeTotal(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          // this.subm = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
            // let fist = {
            //   recordId: getTable[i].recordId
            // };
            // this.subm.push(fist);
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
    // 通过
    yPass(val) {
      this.subm["ownId"] = val.totalId;
      // this.subm["totalId"] = val.totalId;
      this.subm["examineStatus"] = "1";
      this.$confirm('审核通过', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.editordinaryPostArrangeTotal(this.subm).then(res => {
          this.$message({
            message: "审核通过",
            type: "success"
          });
          this.getListPage(this.obj); 
        }).catch(e => {});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });  
      });
    },
    // 不通过
    nPass(val) {
      this.subm["ownId"] = val.totalId;
      // this.subm["totalId"] = val.totalId;
      this.auditForm.examineOpinion = "";
      this.isShow = true;
    },
    // 不通过 保存
    npSeave(datae) {
      this.subm["examineOpinion"] = this.auditForm.examineOpinion;
      this.subm["examineStatus"] = "0";
      this.$refs[datae].validate(vald => {
        if (vald) {
          this.editordinaryPostArrangeTotal(this.subm).then(res => {
            this.isShow = false;
            this.$message({
              message: "审核不通过",
              type: "success"
            });
            this.getListPage(this.obj); 
          }).catch(e => {});
        }
      });
    },
    // 不通过 取消
    handCancel() {
      this.isShow = false;
      this.auditForm.examineOpinion = "";
    },
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editform.boothNumber = val.boothNumber;
        this.editform["totalId"] = val.totalId;
        // this.tabDat.inNumber = val.inNumber;
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
    // 编辑 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      // this.
      this.$refs[datae].validate(vald => {
        if (vald) {
          this.editordinarySpecialRangeTotal(this.editform)
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
  padding-bottom: 20px;
}
</style>

