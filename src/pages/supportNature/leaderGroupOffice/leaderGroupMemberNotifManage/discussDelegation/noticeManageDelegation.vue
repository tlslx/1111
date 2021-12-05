/**
 * @file 交易团 通知管理
 * @author: weiwei
 * @date:2019/6/12
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="通知管理" name="first">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="届数" prop="exhibitionNum">
          <el-select placeholder="请选择" v-model="queryForm.exhibitionNum" clearable>
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
      <el-table border :data="deleNoticeManageData.records">
        <el-table-column prop="topic" label="通知事件"></el-table-column>
        <el-table-column prop="content" label="通知事件"></el-table-column>
        <el-table-column prop="sendTime" label="通知时间"></el-table-column>
        <el-table-column prop="isRead" label="是否已读">
          <template slot-scope="scope">
            {{ scope.row.isRead === 0 ? '未读' : ( scope.row.isRead === 1 ? '已读' : '' ) }}
          </template>
        </el-table-column>
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
          :total="deleNoticeManageData.total">
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
    ...mapGetters('leaderGroup', ['deleNoticeManageData']),
    ...mapGetters('subEnterpriseManage', ['exhibitonNumListAll']),
    queryParams() {
      return {
        exhibitionNum: this.queryForm.exhibitionNum,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.getExhibitionNumListAll().then(res => {
      this.exhibitonNumListAll.forEach(ele => {
        if (ele.current) {
          this.queryForm.exhibitionNum = ele.exhibitionNum;
          this.getDeleNoticeManage(this.queryParams);
        }
      });
    });
  },
  methods: {
    ...mapActions('leaderGroup', ['getDeleNoticeManage']),
    ...mapActions('subEnterpriseManage', ['getExhibitionNumListAll']), // 展届
    handleQuery() {
      this.pageInfoData = { currentPage: 1, pageSize: 10 };
      this.getDeleNoticeManage(this.queryParams);
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupSendMemberEvent/downloadSendManger?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleCheck(row) { // 查看按钮
      let eventId = row.eventId;
      let topic = row.topic;
      this.$router.push({
        path: "/noticeTopicManageDelegation",
        query: {
          eventId, topic
        }
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getDeleNoticeManage(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getDeleNoticeManage(this.queryParams);
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

