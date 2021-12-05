<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看安排方案" name="first" v-loading.fullscreen="fullLoading">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
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
          <el-form-item label="展期">
            <el-select v-model="formData.exhibitionPeriod" clearable>
              <el-option label="第一期" value="1"></el-option>
              <el-option label="第二期" value="2"></el-option>
              <el-option label="第三期" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="交易团">
            <el-select v-model="formData.delegationCode" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.delegationName"
                :value="item.delegationCode"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" border show-summary size="small" :summary-method="getSummaries">
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展期" prop="exhibitionPeriod"></el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="展位数（不含卡车通道展位）" prop="ordinaryNumber">
            <template slot-scope="scope">
              {{scope.row.ordinaryNumber == null ? "0" : scope.row.ordinaryNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="卡车通道展位数" prop="centerChannelNumber">
            <template slot-scope="scope">
              {{scope.row.centerChannelNumber == null ? "0" : scope.row.centerChannelNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="最终展位数" prop="boothNumberFinal">
            <template slot-scope="scope">
              {{scope.row.boothNumberFinal == null ? "0" : scope.row.boothNumberFinal}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐特装数" prop="recommendSpecial">
            <template slot-scope="scope">
              {{scope.row.recommendSpecial == null ? "0" : scope.row.recommendSpecial}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐标摊数" prop="recommendStandard">
            <template slot-scope="scope">
              {{scope.row.recommendStandard == null ? "0" : scope.row.recommendStandard}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐卡车通道数" prop="recommendCentralChannel">
            <template slot-scope="scope">
              {{scope.row.recommendCentralChannel == null ? "0" : scope.row.recommendCentralChannel}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团未推荐数" prop="notRecommendNumber">
            <template slot-scope="scope">
              {{scope.row.notRecommendNumber == null ? "0" : scope.row.notRecommendNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="交易团推荐百分比" prop="recommendPercent">
            <template slot-scope="scope">
              {{scope.row.recommendPercent == null ? "0" : scope.row.recommendPercent}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展位位置安排进度（以预置到交易团为准）" prop="brandPositionSchedulePercent">
            <template slot-scope="scope">
              {{scope.row.brandPositionSchedulePercent == null ? "0" : scope.row.brandPositionSchedulePercent}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="企业展位位置安排进度（以预置到企业为准）" prop="companyPositionSchedulePercent">
            <template slot-scope="scope">
              {{scope.row.companyPositionSchedulePercent == null ? "0" : scope.row.companyPositionSchedulePercent}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="已预置展位数（以预置到企业为准）" prop="presetNumber">
            <template slot-scope="scope">
              {{scope.row.presetNumber == null ? "0" : scope.row.presetNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="剩余展位数（指未预置到企业为准）" prop="leftNumber">
            <template slot-scope="scope">
              {{scope.row.leftNumber == null ? "0" : scope.row.leftNumber}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="实际安排特装数" prop="actualRecommendSpecial">
            <template slot-scope="scope">
              {{scope.row.actualRecommendSpecial == null ? "0" : scope.row.actualRecommendSpecial}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="实际安排标摊数" prop="actualRecommendStandard">
            <template slot-scope="scope">
              {{scope.row.actualRecommendStandard == null ? "0" : scope.row.actualRecommendStandard}}
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="实际安排卡车通道数" prop="actualRecommendCentralChannel">
            <template slot-scope="scope">
              {{scope.row.actualRecommendCentralChannel == null ? "0" : scope.row.actualRecommendCentralChannel}}
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" size="small" @click="handDownload">下载</el-button>
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
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      obj: {
        current: 1,
        size: 10,
        delegationId: "010"
      },
      formData: {
        exhibitionAreaCode: "",
        exhibitionPeriod: "",
        delegationId: ""
      },
      // 表格数据
      tableData: [],
      fullLoading: true,
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      token: "",
      activeName: "first"
    };
  },
  mounted() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
    }
    this.getlistAdjustDemand().then(res => {
      if (res.records.length !== 0) {
        let id = { adjustDemandId: res.records[0].adjustDemandId };
        this.getlistAreaCode(id).then(resarea => {
          for (let j = 0; j < resarea.records.length; j++) {
            this.localstora.exhibitionArea = JSON.parse(JSON.stringify(resarea.records));
          }
        }).catch(e => {});
        this.getlistDelegation(id).then(resde => {
          for (let j = 0; j < resde.records.length; j++) {
            this.localstora.delegation = JSON.parse(JSON.stringify(resde.records));
          }
        }).catch(e => {});
      }
    }).catch(e => {});
    // this.localstora = JSON.parse(localStorage.getItem("temp"));
    // // 展区
    // this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
    //   this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    // }).catch(e => {});
    // // 交易团
    // this.getdelegationDepartment().then(res => {
    //   this.localstora.delegation = JSON.parse(JSON.stringify(res));
    // }).catch(e => {});
    this.getListPage(this.obj);
    this.token = localStorage.getItem("USER_TOKEN");
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "getlistSchedulePlan" // 交易团查看安排方案
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistSchedulePlan(Url)
        .then(res => {
          this.fullLoading = false;
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.tableData = res.records;
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: 1,
        size: 10,
        delegationId: "010"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj["delegationId"] = this.$store.getters.userInfo.org.deptId;
      }
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
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&exhibitionAreaCode=" + this.formData.exhibitionAreaCode + "&exhibitionPeriod=" + this.formData.exhibitionPeriod + "&delegationId=" + this.obj.delegationId + "&token=" + this.token;
      window.open(process.env.API_NA_URL + "/api/ordinaryAdjustApplyDelegation/schedulePlan/download?current=" + url, "_parent");
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
        if (index === 1) {
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


