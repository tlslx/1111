/**
 * @file 交易团 通知议题管理
 * @author: weiwei
 * @date:2019/6/18
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="通知议题管理" name="first">
      <div class="above-table">
        <span style="font-weight: 700;font-size: 16px;color:#2b579a;">通知事件: {{topic}}</span>
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="deleTopicNoticeManageData.records">
        <el-table-column prop="subjectTitle" label="通知议题"></el-table-column>
        <el-table-column prop="unionDeptname" label="关联中心"></el-table-column>
        <el-table-column prop="sendTime" label="通知时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleCheck(scope.row)">查看</el-button>
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
          :total="deleTopicNoticeManageData.total">
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
      eventId: '',
      pageInfoData: { currentPage: 1, pageSize: 10 },
      topic: ''
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['deleTopicNoticeManageData']),
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll']),
    queryParams() {
      return {
        eventId: this.eventId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.topic = this.$route.query.topic;
    this.eventId = this.$route.query.eventId;
    this.getDeleTopicNoticeManage(this.queryParams);
  },
  methods: {
    ...mapActions('leaderGroup', ['getDeleTopicNoticeManage']),
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']), // 展届
    handleQuery() {
      this.pageInfoData = { currentPage: 1, pageSize: 10 };
      this.getDeleTopicNoticeManage(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupSubject/downloadSubjects?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleCheck(row) { // 查看按钮
      let subjectId = row.subjectId;
      let subjectTitle = row.subjectTitle;
      this.$router.push({
        path: "/checkTopicDelegation",
        query: {
          subjectId, subjectTitle
        }
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getDeleTopicNoticeManage(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getDeleTopicNoticeManage(this.queryParams);
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

