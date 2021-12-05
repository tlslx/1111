/**
 * @file 工作部 通知事件管理
 * @author: weiwei
 * @date:2019/6/12
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="通知事件管理" name="first">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="届数" prop="a">
          <el-select placeholder="请选择" v-model="queryForm.exhibitionNum">
            <el-option v-for="item in this.exhibitonNumListAll" :key="item.exhibitionNum" :label="item.exhibitionNum"
              :value="item.exhibitionNum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查 询</el-button>
        </el-form-item>
      </el-form>

      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="noticeWorkPageData.records">
        <el-table-column prop="topic" label="通知事件"></el-table-column>
        <el-table-column prop="sendTime" label="通知时间"></el-table-column>
        <el-table-column prop="enRead" label="已读"></el-table-column>
        <el-table-column prop="notRead" label="未读"></el-table-column>
        <el-table-column prop="" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="handleReceiptState(scope.row)">查看回执状态</el-button>
            <el-button type="text" @click="handleTopicFeedback(scope.row)">查看议题反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="noticeWorkPageData.total">
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
      queryForm: { exhibitionNum: '' },
      pageInfoData: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['noticeWorkPageData']),
    // 1.列表
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll']),
    queryParams() {
      return {
        exhibitionNum: this.queryForm.exhibitionNum,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  async created() {
    this.getExhibitionNumListAll().then(res => {
      this.exhibitonNumListAll.forEach(ele => {
        if (ele.current) {
          this.queryForm.exhibitionNum = ele.exhibitionNum;
        }
      });
    }).then(() => {
      this.getNoticeWorkPage(this.queryParams); // 查询列表
    }); // 届数
  },
  methods: {
    ...mapActions('leaderGroup', ['getNoticeWorkPage']),
    // 1.列表
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']),
    handleQuery() {
      this.pageInfoData = { currentPage: 1, pageSize: 10 };
      this.getNoticeWorkPage(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupEvent/downloadSupport?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleReceiptState(row) { // 查看回执状态
      let eventId = row.eventId;
      let topic = row.topic;
      this.$router.push({
        path: "/receiptState",
        query: {
          eventId, topic
        }
      });
    },
    handleTopicFeedback(row) { // 查看议题反馈
      let eventId = row.eventId;
      let exhibitionNum = this.queryForm.exhibitionNum;
      this.$router.push({
        path: "/topicFeedback",
        query: {
          eventId, exhibitionNum
        }
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getNoticeWorkPage(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getNoticeWorkPage(this.queryParams);
    },
    encodeSearchParams(obj) { // 下载用
      const params = [];

      Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
          value = '';
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='));
      });

      return params.join('&');
    }
  }
};
</script>
<style lang='less' scoped>
.el-tabs {
  .el-tab-pane {
    .above-table {
      position: relative;
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
    .el-table {
      margin-bottom: 10px;
    }
  }
}
</style>

