<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="同步至一般性展位数量安排" name="first" v-loading.fullscreen="fullLoading">
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
        <!-- <el-form-item label="展位来源">
          <el-select v-model="formData.exhibitionSession" clearable>
            <el-option
              v-for="(item, index) in formOptionOne"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          <el-button class="formStyle" type="danger" @click="onSearch">同步</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border show-summary :summary-method="getSummaries">
        <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
        <el-table-column align="center" min-width="120" label="类别" prop="fakeData">
          <template slot-scope="scope">
            {{ scope.row.fakeData === "0" ? '一般性展位' : null }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展期" prop="fakeData">
          <template slot-scope="scope">
            {{ scope.row.fakeData === "0" ? '第一期' : null }}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="商会" prop="associatioName"></el-table-column>
        <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" min-width="120" :label="`${lastexhib}届最终展位数/${nowexhib}届初始展位数`" prop="boothNumberBefore">
          <template slot-scope="scope">{{ scope.row.boothNumberBefore ? scope.row.boothNumberBefore : "0" }}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="等量调换" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" label="不等量调换" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" label="还原调整" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" label="退展位" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" label="新增展位" prop="boothNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="回收展位" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" label="展位类型调整" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" label="其他调整" prop="fakeData"></el-table-column>
        <el-table-column align="center" min-width="120" :label="`${nowexhib}届最终展位数`" prop="boothNumberFinal">
          <template slot-scope="scope">{{ scope.row.boothNumberFinal ? scope.row.boothNumberFinal : "0" }}</template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="展位来源" prop="fakeData">
          <template slot-scope="scope">
            {{ scope.row.fakeData === "0" ? '实际使用者得' : null }}
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
        exhibitionArea: "" // 展区
        // companyCn: "" // 企业名称
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
          label: "实际使用者得",
          value: "1"
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
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      lastexhib: "123",
      nowexhib: "124",
      fullLoading: false,
      activeName: "first"
    };
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
    // this.getexhibitionArea().then(res => {
    //   console.log(res, "222");
    // }).catch(e => {});
  },
  methods: {
    ...mapActions("actualUserCall", [
      "getforeignTradeSync", // 外贸司查看同步至一般性展位数量安排(分页)
      "getlistDealCondition" // 查询条件
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getforeignTradeSync(Url).then(res => {
        this.fullLoading = false;
        this.tableData = [];
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
        this.tableData = JSON.parse(JSON.stringify(res.records));
        if (tableData[0].exhibitionSessionBefore) {
          this.lastexhib = tableData[0].exhibitionSessionBefore;
        } else if (tableData[0].exhibitionSession) {
          this.nowexhib = tableData[0].exhibitionSession;
        }
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
      window.open(process.env.API_NA_URL + "/api/ordinaryUser/foreignTradeSync/download", "_parent");
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 2 || index === 15) {
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
          // sums[index] += ' 元';
        } else {
          sums[index] = '';
          return;
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

