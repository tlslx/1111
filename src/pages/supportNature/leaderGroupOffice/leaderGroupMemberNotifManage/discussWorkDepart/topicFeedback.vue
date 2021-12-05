/**
 * @file 查看议题反馈
 * @author: weiwei
 * @date:2019/6/13
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看议题反馈" name="first">
      <el-row type="flex" justify="end">
        <el-button class="back-button" size="mini" type="primary" @click="handleBack">返回</el-button>
      </el-row>
      <div class="above-table">
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="feedbackListData.records">
        <el-table-column prop="subjectTitle" label="议题"></el-table-column>
        <el-table-column prop="unionDeptname" label="关联中心"></el-table-column>
        <el-table-column prop="support" label="赞成"></el-table-column>
        <el-table-column prop="notSupport" label="反对"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetails(scope.row)">查看详情</el-button>
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
          :total="feedbackListData.total">
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
      pageInfoData: { currentPage: 1, pageSize: 10 },
      queryForm: { eventId: '' },
      exhibitionNum: ''
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['feedbackListData']),
    queryParams() {
      return {
        eventId: this.queryForm.eventId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  async created() {
    this.queryForm.eventId = this.$route.query.eventId;
    this.exhibitionNum = this.$route.query.exhibitionNum;
    this.getTopicFeedbackList(this.queryParams);
  },
  methods: {
    ...mapActions('leaderGroup', ['getTopicFeedbackList']),
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupSubject/downloadDto?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleDetails(row) { // details
      let subjectTitle = row.subjectTitle;
      let subjectId = row.subjectId;
      let exhibitionNum = this.exhibitionNum;
      this.$router.push({
        path: "/topicDetails",
        query: {
          subjectTitle, subjectId, exhibitionNum
        }
      });
    },
    handleBack() { // 返回
      this.$router.push({
        path: "/noticeManageWork"
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getTopicFeedbackList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getTopicFeedbackList(this.queryParams);
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
    .el-row {
      .back-button {
        padding: 0 15px;
        height: 30px;
      }
    }
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
  }
}
</style>
