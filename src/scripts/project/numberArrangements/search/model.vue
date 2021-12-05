<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团审核参展资格" name="first" v-loading.fullscreen="fullLoading">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="交易团">
          <el-select v-model="formData.delegationCode">
            <el-option
              v-for="(item, index) in optionDelegation"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData.exhibitionArea">
            <el-option
              v-for="(item, index) in optionExhibition"
              :key="index"
              :label="item.label"
              :value="item.value"
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
        <el-table-column align="center" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="第123届广交会实际使用企业名称" prop="companyCn"></el-table-column>
        <el-table-column align="center" label="第123届广交会实际使用数量" prop="boothNumber"></el-table-column>
        <el-table-column align="center" label="所属交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" label="是否申请参加第124届广交会" prop="exhibitionPeriod">
          <template slot-scope="scope">
            <el-select v-model="scope.row.exhibitionPeriod">
              <el-option
                v-for="(item, index) in optionExtion"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否符合广交会参展资格标准" prop="charterFlag">
          <el-table-column align="center" label="是否依法取得法人营业执照和外贸经营证备案登记证明，并已办" prop="charterFlag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.charterFlag">
                <el-option
                  v-for="(item, index) in optionChart"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="企业类型（流通/非流通）" prop="companyFlag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.companyFlag">
                <el-option
                  v-for="(item, index) in optionCompany"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="出口额（万美元）" prop="exportFlag">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.exportFlag"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="企业是否被纳入禁止参展名单" prop="blacklistFlag">
            <template slot-scope="scope">
              <el-select v-model="scope.row.blacklistFlag">
                <el-option
                  v-for="(item, index) in optionBlack"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="参展展品是否符合要求" prop="exhibitsFlag">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="onEdit(scope.$index)"
              >通过</el-button>
              <el-button
                type="text"
                @click="onServe(scope.$index)"
              >不通过</el-button>
              <el-button
                type="text"
                @click="onServe(scope.$index)"
              >未审核</el-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="不合格原因说明" prop="examineOpinion"></el-table-column>
        <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="!scope.row.edit"
              :disabled="scope.row.ordinaryBaseList[0].examineStatus === '0' || scope.row.ordinaryBaseList[0].examineStatus === '1'"
              @click="onEdit(scope.$index, scope.row.ordinaryBaseList)"
            >修改</el-button>
            <el-button
              type="text"
              v-else
              @click="onServe(scope.row.ordinaryBaseList, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- 一堆按钮 -->
      <!-- <div class="paginationTop floatLeft">
        <el-button type="danger" class="formStyle">发送</el-button>
        <el-button type="primary" class="formStyle">下载</el-button>
      </div> -->
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="paginationData.total"
          @current-change="handleCurrentChange"
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
import { $date } from "@/scripts/project/utils";
export default {
  data() {
    return {
      obj: {
        current: 1,
        size: 10
      },
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
      optionDelegation: [
        { label: "请选择", value: "" }
      ],
      // 展区绑定数据
      optionExhibition: [
        { label: "请选择", value: "" }
      ],
      // 是否申请参加第124届广交会
      optionExtion: [
        { label: "请选择", value: "" }
      ],
      // 是否依法取得法人营业执照和外贸经营证备案登记证明，并已办
      optionChart: [
        { label: "请选择", value: "" }
      ],
      // 企业类型（流通/非流通）
      optionCompany: [
        { label: "请选择", value: "" }
      ],
      // 企业是否被纳入禁止参展名单
      optionBlack: [
        { label: "请选择", value: "" }
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
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 40
      },
      fullLoading: false,
      activeName: "first"
    };
  },
  mounted() {
    // 获取字典
    this.getlistDealCondition()
      .then(res => {
        for (let i = 1; i < 4; i++) {
          let aFirst = {};
          let bSec = {};
          // let cThrid = {};
          // let dFourd = {};
          aFirst["label"] = res.associatioCodeList["00" + i][0].delegationName;
          aFirst["value"] = res.associatioCodeList["00" + i][0].delegationCode;
          bSec["label"] = res.associatioCodeList["00" + i][0].exhibitionAreaName;
          bSec["value"] = res.associatioCodeList["00" + i][0].exhibitionArea;
          // cThrid["label"] = res.associatioCodeList["00" + i][0].associatioName;
          // cThrid["value"] = res.associatioCodeList["00" + i][0].associatioCode;
          // dFourd["label"] = res.associatioCodeList["00" + i][0].exhibitionSession + "届";
          // dFourd["value"] = res.associatioCodeList["00" + i][0].exhibitionSession;
          this.optionDelegation.push(aFirst); // 交易团
          this.optionExhibition.push(bSec); // 展区
        }
      })
      .catch(e => {});
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("actualUserCall", [
      "getlistDealGrade", // 获取
      "getlistDealCondition" // 查询条件
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistDealGrade(Url).then(res => {
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
    // 编辑
    computEdit() {
      if (val.exchangeNumber.replace(/^([1-9][0-9]*)$/, "")) {
        this.$message("调整展位数量只能输入正整数");
      } else {
        this.updateordinaryExchangeIntent(editTableData)
          .then(res => {
            this.getListPage(this.obj); // 调用初始加载页面方法
          })
          .catch(e => {});
      }
    },
    // json 格式 获取页面数据
    getListPag(Url) {
      let getUrl = encodeURI(JSON.stringify(Url));
      this.getlistIntent(getUrl).then(res => {
        // console.log(res, "查询交易团一般性展位调整需求");
      }).catch(e => {});
    },
    // 日期方法
    computDele() {
      this.obj["deadline"] = $date.format(this.formData.deadline, "MM-dd"); // 日期方法
      // 清空弹框
      for (let key in this.formDataEdit) {
        this.formDataEdit[key] = "";
      }
    },
    // 查询字典
    revocation() {
      this.localstora = JSON.parse(localStorage.getItem("dictData"));  // 查询字典
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





