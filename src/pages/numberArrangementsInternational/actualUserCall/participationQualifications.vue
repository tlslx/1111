<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸中心汇总企业参展资格审核情况表" name="first" v-loading.fullscreen="fullLoading">
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
        <el-table-column align="center" min-width="120" label="第123届广交会实际使用企业名称" prop="companyCn"></el-table-column>
        <el-table-column align="center" min-width="120" label="第123届广交会实际使用数量" prop="boothNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="所属交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" label="交易团审核" prop="supportTotle">
          <el-table-column align="center" min-width="120" label="是否申请参加第124届广交会" prop="isJoinCecf">
            <template slot-scope="scope">
              <span>{{scope.row.isJoinCecf | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="是否符合广交会参展资格标准" prop="exhibitsFlagByDeal">
            <template slot-scope="scope">
              <span>{{scope.row.exhibitsFlagByDeal | status}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="商协会复核" prop="boothTotal">
          <!-- <el-table-column align="center" label="是否依法取得法人营业执照和外贸经营证备案登记证明，并已办" prop="boothTotal">
          </el-table-column>
          <el-table-column align="center" label="企业类型（流通/非流通）" prop="boothTotal">
          </el-table-column>
          <el-table-column align="center" label="出口额（万美元）" prop="boothTotal">
          </el-table-column>
          <el-table-column align="center" label="企业是否被纳入禁止参展名单" prop="boothTotal">
          </el-table-column>
          <el-table-column align="center" label="参展展品是否符合要求" prop="boothTotal">
          </el-table-column> -->
          <el-table-column align="center" min-width="120" label="是否符合广交会参展资格标准" prop="exhibitsFlagByAsso">
            <template slot-scope="scope">
              <span>{{scope.row.exhibitsFlagByAsso | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="不合格原因说明" prop="examineOpinion"></el-table-column>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="danger" class="formStyle">报送</el-button>
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
      formData: {
        delegationCode: "", // 交易团
        exhibitionArea: "", // 展区
        companyCn: "" // 企业名称
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
      tableData: [
        {
          exhibitionPeriod: "",
          boothTotal: "",
          supportTotle: ""
        }
      ],
      // 分页
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
    }
  },
  mounted() {
    // 获取字典
    // this.getlistDealCondition()
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
  methods: {
    ...mapActions("actualUserCall", [
      "getlistForeignCheck", // 外贸中心汇总使用者参展资格审核情况表(分页)
      "getlistDealCondition" // 查询条件
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistForeignCheck(Url).then(res => {
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
    // 编辑
    computEdit() {},
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





