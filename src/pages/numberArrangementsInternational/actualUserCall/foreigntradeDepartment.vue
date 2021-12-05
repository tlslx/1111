<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸司审核" name="first" v-loading.fullscreen="fullLoading">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="交易团">
          <el-select v-model="formData.delegationCode" clearable>
            <el-option
              v-for="(item, index) in optionDelegation"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData.exhibitionArea" clearable>
            <el-option
              v-for="(item, index) in optionExhibition"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model.trim="formData.companyCn" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formData.examineStatus" clearable>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
            <el-option label="未审核" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border show-summary :summary-method="getSummaries">
        <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
        <el-table-column align="center" min-width="120" label="实际使用者的企业名称" prop="companyCn"></el-table-column>
        <el-table-column align="center" min-width="120" label="所属交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="所属商会" prop="associatioName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位数量" prop="boothNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="审核状态" fixed="right" prop="examineStatus">
          <template slot-scope="scope">
            {{scope.row.examineStatus | checktus}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="160" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="scope.row.examineStatus !== '0'"
              @click="handPass(scope.row, 1)"
            >通过</el-button>
            <el-button
              type="text"
              :disabled="scope.row.examineStatus !== '0'"
              @click="handPass(scope.row, 2)"
            >不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" @click="handDownload">下载</el-button>
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
      <el-dialog title="提示" :visible.sync="isPas" width="500px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item label="是否计入基数" prop="addBase">
            <el-select v-model="ruleForm.addBase">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="cpstyle">
          <el-button type="primary" @click="addSubmit('ruleForm')">确定</el-button>
          <el-button @click="isPas = false">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      obj: {
        current: 1,
        size: 10
      },
      ynpass: {
        "examineRecordId": "",
        "examineStatus": ""
      },
      isPas: false,
      ruleForm: {
        addBase: ""
      },
      rules: {
        addBase: [
          { required: true, message: "请选择是否计入基数", trigger: "blur" }
        ]
      },
      formData: {
        delegationCode: "", // 交易团
        exhibitionArea: "", // 展区
        companyCn: "", // 企业名称
        examineStatus: "" // 状态
      },
      // 交易团绑定数据
      optionDelegation: [],
      // 展区绑定数据
      optionExhibition: [],
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
      formOptionTwo: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "北京",
          value: "北京"
        },
        {
          label: "南京",
          value: "南京"
        }
      ],
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
      fullLoading: true,
      exhArea: [],
      activeName: "first"
    };
  },
  filters: {
    checktus(val) {
      if (val === "1") {
        return "通过";
      } else if (val === "2") {
        return "不通过";
      } else if (val === "0") {
        return "未审核";
      }
    }
  },
  mounted() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.optionExhibition = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.optionDelegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getListPage(this.obj);
  },
  // watch: {
  //   optionExhibition: {
  //     handler(val) {
  //       for (let key in val) {
  //         for (let i in this.exhArea) {
  //           if (val[key].exhibitionAreaCode === this.exhArea[i].value) {
  //             val[key].newName = this.exhArea[i].label;

  //           }
  //         }
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  methods: {
    ...mapActions("actualUserCall", [
      "getlistfOreignTrade", // 外贸司审核(分页)
      "addforeignTradeSync", // 外贸司审核(通过/不通过)
      "getforeignTradeCondition" // 查询条件
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistfOreignTrade(Url).then(res => {
        this.fullLoading = false;
        this.tableData = [];
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
        this.tableData = JSON.parse(JSON.stringify(res.records));
      }).catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: 1,
        size: 10
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
    // 下载
    handDownload() {
      // let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&delegationCode=${this.formData.delegationCode}&associatioCode=${this.formData.associatioCode}&exhibitionSession=${this.formData.exhibitionSession}&sendStatus=${this.formData.sendStatus}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/ordinaryUser/foreignTrade/download", "_parent");
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 5) {
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
            // sums[index] += ' 元';
          }
        } else {
          sums[index] = '--';
        }
      });
      return sums;
    },
    // 通过/不通过
    handPass(val, id) {
      this.ynpass = {
        "examineRecordId": "",
        "examineStatus": ""
      },
      this.ynpass.examineRecordId = val.examineRecordId;
      this.ynpass.examineStatus = id;
      if (id === 1) {
        this.isPas = true;
        // this.$confirm('是否确认通过该条信息?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.addforeignTradeSync(this.ynpass).then(res => {
        //     this.getListPage(this.obj);
        //     this.$message({
        //       type: 'success',
        //       message: '操作成功!'
        //     });
        //   }).catch(e => {});
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消操作'
        //   });          
        // });
      } else if (id === 2) {
        this.$confirm('是否确认不通过该条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addforeignTradeSync(this.ynpass).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getListPage(this.obj);
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      }
    },
    // 通过 =》 确认
    addSubmit(fname) {
      this.ynpass["isJoinBase"] = this.ruleForm.addBase;
      this.$refs[fname].validate((val) => {
        if (val) {
          this.addforeignTradeSync(this.ynpass)
          .then(res => {
            this.isPas = false;
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.getListPage(this.obj);
          })
          .catch(e => {});
        } else {
          return false;
        }
      });
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
.cpstyle {
  text-align: center;
  padding: 20px;
}
</style>

