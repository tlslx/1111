/**
 * @file 查看回执状态
 * @author: weiwei
 * @date:2019/6/13
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看回执状态" name="first">
      <el-row type="flex" justify="end">
        <el-button class="back-button" size="mini" type="primary" @click="handleBack">返回</el-button>
      </el-row>
      <div class="above-table">
        <span style="font: 700 16px;color:#2b579a;">通知事件: {{topic}}</span>
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>
      <el-table border :data="checStatusListData.records">
        <el-table-column prop="sendMemberOrgName" label="单位名称"></el-table-column>
        <el-table-column prop="isRead" label="阅读状态">
          <template slot-scope="scope">
            {{ scope.row.isRead === 0 ? '未读' : ( scope.row.isRead === 1 ? '已读' : '' ) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="checStatusListData.total">
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
      topic: ''
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['checStatusListData']),
    queryParams() {
      return {
        eventId: this.queryForm.eventId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  async created() {
    this.topic = this.$route.query.topic;
    this.queryForm.eventId = this.$route.query.eventId;
    this.getChecStatusList(this.queryParams);
  },
  methods: {
    ...mapActions('leaderGroup', ['getChecStatusList']),
    handleBack() {
      this.$router.push({
        path: "/noticeManageWork"
      });
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupSendMemberEvent/downloadStatus?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getChecStatusList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getChecStatusList(this.queryParams);
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

