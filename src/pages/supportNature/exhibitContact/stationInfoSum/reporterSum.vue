/**
 * @file 各单位填报人员信息统计
 * @author: weiwei
 * @date:2019/6/4
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="各单位填报人员信息统计" name="first">
      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="tradingGroupAssociationSum.records">
        <el-table-column prop="orgName" label="单位名称"></el-table-column>
        <el-table-column prop="reporterName" label="填报人姓名"></el-table-column>
        <el-table-column prop="informantOfficePhone" label="办公电话"></el-table-column>
        <el-table-column prop="informantPhone" label="手机"></el-table-column>
        <el-table-column prop="informantFax" label="传真"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tradingGroupAssociationSum.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    ...mapGetters('stationInfoSum', ['tradingGroupAssociationSum']),
    queryParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getTradingGroupAssociationSum(this.queryParams);
  },
  methods: {
    ...mapActions('stationInfoSum', ['getTradingGroupAssociationSum']),
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getTradingGroupAssociationSum(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getTradingGroupAssociationSum(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupTradingGroupAssociation/downloadStatistics`);
    }
  }
};
</script>
<style lang='less' scoped>
.el-tabs {
  .el-tab-pane {
    .above-table {
      position: relative;
      padding-bottom: 10px;
      height: 30px;
      /deep/ .el-button {
        position: absolute;
        &.download {
          right: 40px;
        }
        &.print {
          right: 0px;
        }
      }
    }
  }
}
</style>
