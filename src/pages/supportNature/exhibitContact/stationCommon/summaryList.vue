/**
 * @file 加入总表
 * @author: weiwei
 * @date:2019/6/3
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="加入总表的单位列表" name="first">
      <div class="above-table">接收列表
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="summaryListData.records" @selection-change="handleSelectChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orgName" label="单位名称"></el-table-column>
        <el-table-column prop="station" label="驻地"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="peopleStationedNumber" label="入住人数"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-button class="newAddBtn" type="primary" @click="handleAddSum" :disabled="!this.selectParams.length">加入总表</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="summaryListData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      activeName: 'first',
      pageInfoData: {
        currentPage: 1,
        pageSize: 10
      },
      selectParams: []
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['summaryListData']),
    queryParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getSummaryList(this.queryParams);
  },
  methods: {
    ...mapActions('exhibitContact', ['getSummaryList', 'postSubmitSummary']),
    handleSelectChange(val) {
      this.selectParams = val.map(ele => {
        return { 'stationId': ele.stationId };
      });
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupTradingGroupStation/downloadCheck`);
    },
    handleAddSum() { // 加入总表
      this.postSubmitSummary(this.selectParams).then(() => {
        this.selectParams = [];
        this.getSummaryList(this.queryParams);
        this.$message.success('加入总表成功');
      }).catch(() => {
        this.$message.error('加入总表失败');
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getSummaryList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getSummaryList(this.queryParams);
    }
  }
};
</script>
<style lang='less' scoped>
.el-tabs {
  .el-tab-pane {
    .pagination-contain {
      position: relative;
      padding: 10px 0;
      .newAddBtn {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
    .above-table {
      position: relative;
      padding-bottom: 10px;
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
