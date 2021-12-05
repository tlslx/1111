<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="外贸中心、交易团查看复核结果" name="first" v-loading.fullscreen="fullLoading">
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
      <el-table :data="tableData" style="width: 100%" border show-summary :summary-method="getSummaries">
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
          <el-table-column align="center" min-width="120" label="是否符合广交会参展资格标准" prop="examineStatusByDeal">
            <template slot-scope="scope">
              <span>{{scope.row.examineStatusByDeal | exstatus}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="商协会复核" prop="boothTotal">
          <el-table-column align="center" min-width="120" label="是否依法取得法人营业执照和外贸经营证备案登记证明，并已办" prop="charterFlag">
            <template slot-scope="scope">
              <span>{{scope.row.charterFlag | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="企业类型（流通/非流通）" prop="companyFlag">
          <template slot-scope="scope">
              <span>{{scope.row.companyFlag | lfstatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="出口额（万美元）" prop="exportFlag">
            <template slot-scope="scope">
              <span>{{scope.row.exportFlag | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="企业是否被纳入禁止参展名单" prop="blacklistFlag">
            <template slot-scope="scope">
              <span>{{scope.row.blacklistFlag | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="参展展品是否符合要求" prop="exhibitsFlagByAsso">
            <template slot-scope="scope">
              <span>{{scope.row.exhibitsFlagByAsso | status}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="是否符合广交会参展资格标准" prop="examineStatusByAsso">
            <template slot-scope="scope">
              <span>{{scope.row.examineStatusByAsso | exstatus}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="不合格原因说明" prop="examineOpinion"></el-table-column>
        </el-table-column>
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
      // 交易团绑定数据
      optionDelegation: [],
      // 展区绑定数据
      optionExhibition: [],
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
        return "是";
      } else if (val === "0") {
        return "否";
      }
    },
    exstatus(val) {
      if (val === "1") {
        return "是";
      } else if (val === "2") {
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
      "getlistForeignCenter", // 外贸中心、交易团查看复核结果(分页)
      "getforeignCenterCondition" // 查询条件
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistForeignCenter(Url).then(res => {
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
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 2) {
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





