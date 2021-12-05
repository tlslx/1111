<template>
  <div v-loading.fullscreen="fullLoading">
  <!--<el-card style="padding-bottom: 24px">-->
    <!-- 表单 -->
    <el-form :inline="true" :model="formData" size="small">
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
      <el-form-item label="商会">
        <el-select v-model="formData.coceralId" clearable>
          <el-option
            v-for="(item, index) in localstora.businessAssociation"
            :key="index"
            :label="item.deptName"
            :value="item.deptId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展区">
        <el-select v-model="formData.exhibitionAreaCode" clearable>
          <el-option
            v-for="(item, index) in localstora.exhibitionArea"
            :key="index"
            :label="item.exhibitionAreaName"
            :value="item.exhibitionAreaCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="formData.boothType" clearable>
          <el-option label="一般性展位" value="1"></el-option>
          <el-option label="中央通道展位" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展期">
        <el-select v-model="formData.exhibitionPeriod" clearable>
          <el-option label="第一期" value="1"></el-option>
          <el-option label="第二期" value="2"></el-option>
          <el-option label="第三期" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="floatRight">
        <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" size="small" border :summary-method="getSummaries">
      <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
      <el-table-column align="center" min-width="80" label="类别" prop="boothType">
        <template slot-scope="scope">
          {{scope.row.boothType === "1" ? "一般性展位" : "中央通道展位"}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="交易团" prop="delegationName"></el-table-column>
      <el-table-column align="center" min-width="80" label="展期" prop="exhibitionPeriod"></el-table-column>
      <el-table-column align="center" min-width="80" label="商会" prop="coceralName"></el-table-column>
      <el-table-column align="center" min-width="160" label="展区" prop="exhibitionAreaName"></el-table-column>
      <el-table-column align="center" min-width="80" :label="`${getCes}届初始展位数`" prop="boothNumberBefore"></el-table-column>
      <el-table-column align="center" min-width="80" label="等量调换" prop="equalExchangeNumber">
        <template slot-scope="scope">
          {{scope.row.equalExchangeNumber == null ? "0" : scope.row.equalExchangeNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="不等量调换" prop="unequalExchangeNumber">
        <template slot-scope="scope">
          {{scope.row.unequalExchangeNumber == null ? "0" : scope.row.unequalExchangeNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="还原调整" prop="restoreExchangeNumber">
        <template slot-scope="scope">
          {{scope.row.restoreExchangeNumber == null ? "0" : scope.row.restoreExchangeNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="退展位" prop="refundNumber">
        <template slot-scope="scope">
          {{scope.row.refundNumber == null ? "0" : scope.row.refundNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="新增展位" prop="newExhibitionNumber">
        <template slot-scope="scope">
          {{scope.row.newExhibitionNumber == null ? "0" : scope.row.newExhibitionNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="回收展位" prop="recoveryNumber">
        <template slot-scope="scope">
          {{scope.row.recoveryNumber == null ? "0" : scope.row.recoveryNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="展位类型调整" prop="typeExchangeNumber">
        <template slot-scope="scope">
          {{scope.row.typeExchangeNumber == null ? "0" : scope.row.typeExchangeNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" label="其他调整" prop="otherNumber">
        <template slot-scope="scope">
          {{scope.row.otherNumber == null ? "0" : scope.row.otherNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="80" :label="`${getCes}届最终展位数`" prop="boothNumberFinal"></el-table-column>
    </el-table>
    <!-- 一堆按钮 -->
    <div class="paginationTop floatLeft">
      <el-button type="primary" size="small" class="formStyle" @click="handDownload">下载</el-button>
      <!-- <el-button type="danger" class="formStyle" @click="handelSubmit">不通过</el-button> -->
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
  <!--</el-card>-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      obj: {
        current: 1,
        size: 10
      },
      formData: {
        delegationId: "",
        exhibitionAreaCode: "",
        boothType: "",
        exhibitionPeriod: "",
        coceralId: ""
      },
      fullLoading: true,
      localstora: {
        exhibitionArea: [],
        delegation: [],
        businessAssociation: []
      },
      // 表格数据
      tableData: [],
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    ...mapGetters("nainformation", ["getCes"])
  },
  mounted() {
    // this.getlistAdjustDemand().then(res => {
    //   if (res.records.length !== 0) {
    //     let id = { adjustDemandId: res.records[0].adjustDemandId };
    //     this.getlistAreaCode(id).then(resarea => {
    //       for (let j = 0; j < resarea.records.length; j++) {
    //         this.localstora.exhibitionArea = JSON.parse(JSON.stringify(resarea.records));
    //       }
    //     }).catch(e => {});
    //     this.getlistDelegation(id).then(resde => {
    //       for (let j = 0; j < resde.records.length; j++) {
    //         this.localstora.delegation = JSON.parse(JSON.stringify(resde.records));
    //       }
    //     }).catch(e => {});
    //   }
    // }).catch(e => {});
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    // 展届
    this.getcurrentExhibitionSession();
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getListPage(this.obj);
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistBoothNumber" // 展位数量查询
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment", // 商协会
      "getcurrentExhibitionSession" // 展届
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistBoothNumber(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.ordinaryBrandNumberDTO.total;
          this.paginationData.currentPage = res.ordinaryBrandNumberDTO.current;
          this.paginationData.pageSize = res.ordinaryBrandNumberDTO.size;
          this.tableData = res.ordinaryBrandNumberDTO.records;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10"
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
      let url = "delegationId=" + this.formData.delegationId + "&coceralId=" + this.formData.coceralId + "&boothType=" + this.formData.boothType + "&exhibitionPeriod=" + this.formData.exhibitionPeriod + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode;
      url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/boothNumber/download?" + url + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 页面合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
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
        } else {
          sums[index] = '--';
        }
        if (index === 2 || index === 3) {
          sums[index] = "--";
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


