<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团审核参展资格" name="first" v-loading.fullscreen="fullLoading">
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
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" :label="`第${getCes - 1}届广交会实际使用企业名称`" prop="companyCn"></el-table-column>
        <el-table-column align="center" min-width="120" :label="`第${getCes - 1}届广交会实际使用数量`" prop="boothNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="所属交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" :label="`是否申请参加第${getCes}届广交会`" prop="isJoinCecf">
          <template slot-scope="scope">
            <el-select v-model="scope.row.isJoinCecf" v-if="!(scope.row.examineStatus === '0' || scope.row.examineStatus === '1' || scope.row.examineStatus === '2')">
              <el-option
                v-for="(item, index) in optionExtion"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span v-else>{{scope.row.isJoinCecf | status}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否符合广交会参展资格标准" prop="charterFlag">
          <el-table-column align="center" min-width="120" label="是否依法取得法人营业执照和外贸经营证备案登记证明，并已办" prop="charterFlag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.charterFlag" v-if="!(scope.row.examineStatus === '0' || scope.row.examineStatus === '1' || scope.row.examineStatus === '2')">
                <el-option
                  v-for="(item, index) in optionChart"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span v-else>{{scope.row.charterFlag | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="企业类型（流通/非流通）" prop="companyFlag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.companyFlag" v-if="!(scope.row.examineStatus === '0' || scope.row.examineStatus === '1' || scope.row.examineStatus === '2')">
                <el-option
                  v-for="(item, index) in optionCompany"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span v-else>{{scope.row.companyFlag | lfstatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="出口额（万美元）" prop="exportFlag">
            <template slot-scope="scope">
              <el-input v-if="!(scope.row.examineStatus === '0' || scope.row.examineStatus === '1' || scope.row.examineStatus === '2')" v-model.trim="scope.row.exportFlag"></el-input>
              <span v-else>{{scope.row.exportFlag}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="企业是否被纳入禁止参展名单" prop="blacklistFlag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.blacklistFlag" v-if="!(scope.row.examineStatus === '0' || scope.row.examineStatus === '1' || scope.row.examineStatus === '2')">
                <el-option
                  v-for="(item, index) in optionBlack"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span v-else>{{scope.row.blacklistFlag | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="参展展品是否符合要求" prop="exhibitsFlag">
            <template slot-scope="scope">
              <el-select v-if="!(scope.row.examineStatus === '0' || scope.row.examineStatus === '1' || scope.row.examineStatus === '2')" v-model="scope.row.exhibitsFlag">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
              <span v-else>{{scope.row.exhibitsFlag | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="是否符合广交会参展资格标准" prop="examineStatus">
            <template slot-scope="scope">
              <div v-if="scope.row.examineStatus == null">
                <el-button type="text" @click="handPass(scope.row, 1)">是</el-button>
                <el-button type="text" @click="handPass(scope.row, 2)">否</el-button>
                <!-- <el-button type="text" @click="handPass(scope.row, 0)">未审核</el-button> -->
              </div>
              <div v-else>
                <el-button type="text" :disabled="(scope.row.examineStatus === '1')" v-if="(scope.row.examineStatus === '1')">是</el-button>
                <el-button type="text" :disabled="(scope.row.examineStatus === '2')" v-if="(scope.row.examineStatus === '2')">否</el-button>
                <!-- <el-button type="text" :disabled="(scope.row.exhibitsFlag === '0')" v-show="(scope.row.exhibitsFlag === '0')" @click="handPass(scope.row, 0)">未审核</el-button> -->
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="不合格原因说明" prop="examineOpinion"></el-table-column>
      </el-table>
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
      <!-- 弹出框 -->
      <el-dialog
        title="审核"
        :visible.sync="dialogVisible"
        @close="clDia"
        width="500px">
        <el-form :model="formDad">
          <el-form-item label="不符合原因">
            <el-input type="textarea" v-model.trim="formDad.noreson" :rows="5"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handNopass">确 定</el-button>
        </span>
      </el-dialog>
      <!-- </div> -->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      obj: {
        current: 1,
        size: 10
      },
      formDad: {
        noreson: ""
      },
      ynPass: false,
      dialogVisible: false, // 不通过的弹框
      dialogMessage: {}, // 不通过时的参数
      // 表格内部绑定的数据
      sendTable: {
        exhibitionPeriod: "", // 是否申请参加第124届广交会
        charterFlag: "", // 是否依法取得法人营业执照和外贸经营证备案登记证明，并已办
        companyFlag: "", // 企业类型（流通/非流通）
        exportFlag: "", // 出口额（万美元）
        blacklistFlag: "" // 企业是否被纳入禁止参展名单
      },
      // 表单绑定数据
      formData: {
        delegationCode: "", // 交易团
        exhibitionArea: "", // 展区
        companyCn: "" // 企业名称
      },
      // 交易团绑定数据
      optionDelegation: [],
      // 展区绑定数据
      optionExhibition: [],
      // 是否申请参加第124届广交会
      optionExtion: [
        // { label: "请选择", value: "" },
        { label: "是", value: "1" },
        { label: "否", value: "0" }
      ],
      // 是否依法取得法人营业执照和外贸经营证备案登记证明，并已办
      optionChart: [
        // { label: "请选择", value: "" },
        { label: "是", value: "1" },
        { label: "否", value: "0" }
      ],
      // 企业类型（流通/非流通）
      optionCompany: [
        // { label: "请选择", value: "" },
        { label: "流通", value: "1" },
        { label: "非流通", value: "0" }
      ],
      // 企业是否被纳入禁止参展名单
      optionBlack: [
        // { label: "请选择", value: "" },
        { label: "是", value: "1" },
        { label: "否", value: "0" }
      ],
      // 表格数据
      tableData: [
        {
          exhibitionPeriod: "",
          boothTotal: "",
          supportTotle: ""
        }
      ],
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
        return "是";
      } else if (val === "0") {
        return "否";
      }
    },
    lfstatus(val) {
      if (val === "1") {
        return "流通";
      } else if (val === "0") {
        return "非流通";
      }
    }
  },
  mounted() {
    // 获取字典
    // this.getlistDealConditionjyt()
    //   .then(res => {
    //     for (let i = 0; i < res.length; i++) {
    //       let aFirst = {};
    //       let bSec = {};
    //       aFirst["label"] = res[i].delegationName;
    //       aFirst["value"] = res[i].delegationCode;
    //       bSec["label"] = res[i].exhibitionAreaName;
    //       bSec["value"] = res[i].exhibitionArea;
    //       this.optionDelegation.push(aFirst);
    //       this.optionExhibition.push(bSec);
    //     }
    //   })
    //   .catch(e => {});
    this.getcurrentExhibitionSession();
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
  computed: {
    ...mapGetters("nainformation", ["getCes"])
  },
  methods: {
    ...mapActions("actualUserCall", [
      "getlistDealGrade", // 获取
      "getlistDealConditionjyt", // 查询条件
      "adddealGrade" // 点击“通过、不通过或者未审核”按钮，交易团提交审核参展资格
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getcurrentExhibitionSession", // 展届
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistDealGrade(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.paginationData.total = res.total;
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {});
    },
    // 关闭弹框
    clDia() {
      this.formDad.noreson = "";
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
    // 通过
    handPass(val, num) {
      let parame = {};
      parame = {
        examineRecordId: val.examineRecordId,
        isJoinCecf: val.isJoinCecf,
        charterFlag: val.charterFlag,
        companyFlag: val.companyFlag,
        exportFlag: val.exportFlag,
        blacklistFlag: val.blacklistFlag,
        exhibitsFlag: val.exhibitsFlag,
        examineStatus: num,
        examineOpinion: ""
      };
      if (parame.isJoinCecf === "") {
        this.$message("请选择是否申请参加第124届广交会");
      } else if (parame.charterFlag === "") {
        this.$message("请选择是否依法取得法人营业执照和外贸经营证备案登记证明，并已办");
      } else if (parame.companyFlag === "") {
        this.$message("请选择企业类型（流通/非流通）");
      } else if (parame.exportFlag === "") {
        this.$message("请填写出口额（万美元）");
      } else if (parame.exportFlag.replace(/^([1-9][0-9]*)$/, "")) {
        this.$message("出口额应为正整数");
      } else if (parame.blacklistFlag === "") {
        this.$message("请选择企业是否被纳入禁止参展名单");
      } else if (parame.exhibitsFlag === "") {
        this.$message("请选择参展展品是否符合要求");
      } else
      if (num === 1) {
        this.$confirm('该参展展品符合广交会参展资格标准', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adddealGrade(parame).then(res => {
            this.ynPass = true;
            this.getListPage(this.obj);
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消该操作'
          });          
        });
      } else if (num === 2) {
        this.dialogVisible = true;
        this.dialogMessage = val;
      } else if (num === 0) {
        this.$confirm('该参展展品未审核？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.adddealGrade(parame).then(res => {
            this.getListPage(this.obj);
            this.ynPass = true;
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(e => {});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '您已取消该操作'
          });          
        });
      }
    },
    // 不通过 的 确定按钮
    handNopass() {
      this.dialogVisible = false;
      let param = {};
      param = {
        examineRecordId: this.dialogMessage.examineRecordId,
        isJoinCecf: this.dialogMessage.isJoinCecf,
        charterFlag: this.dialogMessage.charterFlag,
        companyFlag: this.dialogMessage.companyFlag,
        exportFlag: this.dialogMessage.exportFlag,
        blacklistFlag: this.dialogMessage.blacklistFlag,
        exhibitsFlag: this.dialogMessage.exhibitsFlag,
        examineStatus: 2,
        examineOpinion: this.formDad.noreson
      };
      if (param.isJoinCecf === "") {
        this.$message("请选择是否申请参加第124届广交会");
      } else if (param.charterFlag === "") {
        this.$message("请选择是否依法取得法人营业执照和外贸经营证备案登记证明，并已办");
      } else if (param.companyFlag === "") {
        this.$message("请选择企业类型（流通/非流通）");
      } else if (param.exportFlag === "") {
        this.$message("请填写出口额（万美元）");
      } else if (param.exportFlag.replace(/^([1-9][0-9]*)$/, "")) {
        this.$message("出口额应为正整数");
      } else if (param.blacklistFlag === "") {
        this.$message("请选择企业是否被纳入禁止参展名单");
      } else if (param.exhibitsFlag === "") {
        this.$message("请选择参展展品是否符合要求");
      } else if (param.examineOpinion === "") {
        this.$message("请填写不符合要求的理由");
      } else {
        this.adddealGrade(param).then(res => {
          this.ynPass = true;
          this.getListPage(this.obj);
          this.formDad.noreson = "";
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(e => {});
      }
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
</style>





