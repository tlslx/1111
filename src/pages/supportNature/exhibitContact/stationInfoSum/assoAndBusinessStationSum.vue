/**
 * @file 商协会、交易团驻地信息统计
 * @author: weiwei
 * @date:2019/6/4
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会、交易团驻地信息统计" name="first">
      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="tradingGroupStationSum.records">
        <el-table-column prop="orgName" label="单位名称"></el-table-column>
        <el-table-column prop="station" label="驻地"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="peopleStationedNumber" label="入住人数"></el-table-column>
        <el-table-column prop="conferenceGroupTelephone" label="会务组电话"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tradingGroupStationSum.total">
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
    ...mapGetters('stationInfoSum', ['tradingGroupStationSum']),
    queryParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getTradingGroupStationSum(this.queryParams);
  },
  methods: {
    ...mapActions('stationInfoSum', ['getTradingGroupStationSum']),
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getTradingGroupStationSum(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getTradingGroupStationSum(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupTradingGroupStation/downloadStatistics`);
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
