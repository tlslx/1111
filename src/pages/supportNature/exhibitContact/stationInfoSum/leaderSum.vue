/**
 * @file 大会领导委员会任职名单
 * @author: weiwei
 * @date:2019/6/4
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="大会领导委员会任职名单信息统计" name="first">
      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="leadershipSum.records">
        <el-table-column prop="orgName" label="单位名称"></el-table-column>
        <el-table-column prop="numberParticipants" label="期数">
          <template slot-scope="scope">
            {{ scope.row.numberParticipants | qishuFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="memberName" label="姓名"></el-table-column>
        <el-table-column prop="memberPosition" label="所在单位及职务"></el-table-column>
        <el-table-column prop="memberLevel" label="行政级别"></el-table-column>
        <el-table-column prop="responsibilityNote" label="备注"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="leadershipSum.total">
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
    ...mapGetters('stationInfoSum', ['leadershipSum']),
    queryParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getleadershipListSum(this.queryParams);
  },
  methods: {
    ...mapActions('stationInfoSum', ['getleadershipListSum']),
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getleadershipListSum(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getleadershipListSum(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupLeadershipList/downloadStatistics`);
    }
  },
  filters: {
    qishuFilter: val => {
      let _val = val + '';
      switch (_val) {
        case '1':
          return '第一期';
        case '2':
          return '第二期';
        case '3':
          return '第三期';
        default:
          return '';
      }
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
