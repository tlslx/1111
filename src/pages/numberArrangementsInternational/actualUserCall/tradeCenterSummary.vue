<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="汇总实际使用者名单" name="first" v-loading.fullscreen="fullLoading">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="交易团">
          <el-select v-model="formData.delegationCode" clearable>
            <el-option
              v-for="(item, index) in formOptionOne"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData.exhibitionArea" clearable>
            <el-option
              v-for="(item, index) in formOptionTwo"
              :key="index"
              :label="item.exhibitionAreaName"
              :value="item.exhibitionAreaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商会">
          <el-select v-model="formData.associatioCode" clearable>
            <el-option
              v-for="(item, index) in formOptionThree"
              :key="index"
              :label="item.deptName"
              :value="item.deptCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="届数">
          <el-select v-model="formData.exhibitionSession" clearable>
            <el-option
              v-for="(item, index) in formOptionFour"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送状态">
          <el-select v-model="formData.sendStatus" clearable>
            <el-option
              v-for="(item, index) in formOptionSend"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          <el-button class="formStyle" type="primary" @click="onAcquire">获取</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
         
        border
        show-summary
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" :selectable="checkBox" disabled="true" type="selection" fixed width="55"></el-table-column>
        <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
        <el-table-column align="center" min-width="120" label="实际使用者的企业名称" prop="companyCn"></el-table-column>
        <el-table-column align="center" min-width="120" label="所属交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" label="所属商会" prop="associatioName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位数量" prop="boothNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="发送状态" prop="sendStatus">
          <template slot-scope="scope">
            <span>{{ scope.row.sendStatus | status }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="danger" class="formStyle" @click="handelSend">发送</el-button>
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
      <!-- </div> -->
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
      token: "",
      sendObj: [], // 发送传参
      formData: {
        delegationCode: "",
        exhibitionArea: "",
        associatioCode: "",
        exhibitionSession: "",
        sendStatus: ""
      },
      formOptionOne: [],
      formOptionTwo: [],
      formOptionThree: [],
      formOptionFour: [
        { label: "124届", value: "124" },
        { label: "125届", value: "125" },
        { label: "126届", value: "126" },
        { label: "127届", value: "127" },
        { label: "128届", value: "128" },
        { label: "129届", value: "129" },
        { label: "130届", value: "130" },
        { label: "131届", value: "131" },
        { label: "132届", value: "132" },
        { label: "133届", value: "133" }
      ],
      // 发送状态
      formOptionSend: [
        {
          label: "请选择",
          value: ""
        },
        {
          label: "已发送",
          value: "1"
        },
        {
          label: "未发送",
          value: "0"
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
      activeName: "first"
    };
  },
  filters: {
    status(val) {
      if (val === "1") {
        return "已发送";
      } else if (val === "0") {
        return "未发送";
      }
    }
  },
  mounted() {
    // this.getlistDealConditionft()
    //   .then(res => {
    //     for (let i = 0; i < res.length; i++) {
    //       let aFirst = {};
    //       let bSec = {};
    //       let cThrid = {};
    //       let dFourd = {};
    //       aFirst["label"] = res[i].delegationName;
    //       aFirst["value"] = res[i].delegationCode;
    //       bSec["label"] = res[i].exhibitionAreaName;
    //       bSec["value"] = res[i].exhibitionArea;
    //       cThrid["label"] = res[i].associatioName;
    //       cThrid["value"] = res[i].associatioCode;
    //       dFourd["label"] = res[i].exhibitionSession + "届";
    //       dFourd["value"] = res[i].exhibitionSession;
    //       this.formOptionOne.push(aFirst);
    //       this.formOptionTwo.push(bSec);
    //       this.formOptionThree.push(cThrid);
    //       this.formOptionFour.push(dFourd);
    //     }
    //     let hash = {};
    //     this.formOptionFour = this.formOptionFour.reduce(function(item, next) {
    //       hash[next.value] ? '' : hash[next.value] = true && item.push(next);
    //       return item;
    //     }, []);
    //   })
    //   .catch(e => {});
    // 展区
    this.getexhibitionArea().then(res => {
      this.formOptionTwo = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.formOptionOne = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.formOptionThree = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
  },
  methods: {
    ...mapActions("actualUserCall", [
      "getlistOrdinary", //汇总实际使用者名单(分页)
      "getlistDealConditionft", // 查询条件
      "addsendData" // 发送
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment" // 商协会
    ]),
    // 获取页面数据
    getPage(Url) {
      this.getlistOrdinary(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = JSON.parse(JSON.stringify(res.records));
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.paginationData.total = res.total;
        })
        .catch(e => {});
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
      this.getPage(this.obj);
    },
    // 下载
    handDownload() {
      // let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&delegationCode=${this.formData.delegationCode}&associatioCode=${this.formData.associatioCode}&exhibitionSession=${this.formData.exhibitionSession}&sendStatus=${this.formData.sendStatus}&token=${this.token}`;
      window.open(process.env.API_NA_URL + "/api/ordinaryUser/ordinaryUser/download", "_parent");
    },
    // 获取的提示
    onAcquire() {
      // this.$confirm("重新获取会覆盖当前数据，是否确认获取？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "获取成功！"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消获取"
      //     });
      //   });
    },
    // 发送的提示
    handelSend() {
      this.$confirm("是否确认发送？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.sendObj.length > 0) {
            this.addsendData(this.sendObj).then(res => {
              this.getPage(this.obj);
              this.$message({
                type: "success",
                message: "发送成功！"
              });
            }).catch(e => {});
          } else {
            this.$message("请勾选您要发送的内容！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发送"
          });
          this.getPage(this.obj);
        });
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 1 || index === 7) {
          sums[index] = "";
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
          // sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    // 复选框禁用
    checkBox(row, index) {
      if (row.sendStatus === "0") {
        return 1;
      } else {
        return 0;
      }
    },
    // 打钩事件
    handleSelectionChange(val) {
      this.sendObj = [];
      for (let i = 0; i < val.length; i++) {
        let aFirst = {};
        aFirst["examineRecordId"] = val[i].examineRecordId;
        this.sendObj.push(aFirst);
      }
    },
    // 编辑
    computEdit() {},
    // 删除
    computDele() {},
    // 撤回
    revocation() {},
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getPage(this.obj);
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

