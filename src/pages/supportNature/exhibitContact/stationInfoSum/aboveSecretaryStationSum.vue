/**
 * @file 商协会、交易团秘书长以上参会人员信息统计
 * @author: weiwei
 * @date:2019/6/4
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商协会、交易团秘书长以上参会人员信息统计" name="first">
      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="aboveSecretaryGeneralSum.records">
        <el-table-column prop="orgName" label="单位名称"></el-table-column>
        <el-table-column prop="participation" label="参会职务"></el-table-column>
        <el-table-column prop="participantPosition" label="所在单位、部门及职务"></el-table-column>
        <el-table-column prop="participantAdministrativeLevel" label="行政级别"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="participantNumber" label="参会期数">
          <template slot-scope="scope">
            {{ scope.row.participantNumber | qishuFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="participantRemarks" label="备注"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="aboveSecretaryGeneralSum.total">
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
    ...mapGetters('stationInfoSum', ['aboveSecretaryGeneralSum']),
    queryParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getAboveSecretaryGeneralSum(this.queryParams);
  },
  methods: {
    ...mapActions('stationInfoSum', ['getAboveSecretaryGeneralSum']),
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getAboveSecretaryGeneralSum(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getAboveSecretaryGeneralSum(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupAboveSecretaryGeneral/downloadStatistics`);
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
