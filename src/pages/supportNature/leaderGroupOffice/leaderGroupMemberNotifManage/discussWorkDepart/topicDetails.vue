/**
 * @file 议题详情
 * @author: weiwei
 * @date:2019/6/13
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="议题详情" name="first">
      <el-row type="flex" justify="end">
        <el-button class="back-button" size="mini" type="primary" @click="handleBack">返回</el-button>
      </el-row>
      <div class="above-table">
        <span style="font-weight: 700;font-size: 16px;color:#2b579a;">通知议题: {{subjectTitle}}</span>
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>

      <el-form :model="topicDetailsForm" ref="topicDetailsForm">
        <el-table border :data="topicDetailsForm.records">
          <el-table-column prop="memberName" label="成员单位名称"></el-table-column>
          <!-- <el-table-column prop="" label="关联中心"></el-table-column> -->
          <el-table-column prop="isSupport" label="投票">
            <template slot-scope="scope">
              <span v-if="scope.row.isManual === 0">
                {{ scope.row.isSupport === 0 ? '不赞成' : ( scope.row.isSupport === 1 ? '赞成' : '' ) }}
              </span>
              <el-form-item v-else-if="scope.row.isManual === 1" :prop="'records.' + scope.$index + '.isSupport'" label-width="0">
                <el-select placeholder="请输入" v-model="scope.row.isSupport" clearable>
                  <el-option v-for="item in [{value: 0, label: '不赞成'}, {value: 1, label: '赞成'}]" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="feedbackContent" label="反馈意见">
            <template slot-scope="scope">
              <span v-if="scope.row.isManual === 0">
                {{ scope.row.feedbackContent }}
              </span>
              <el-form-item v-else-if="scope.row.isManual === 1" :prop="'records.' + scope.$index + '.feedbackContent'" label-width="0">
                <el-input placeholder="请输入100字以内" v-model="scope.row.feedbackContent" type="textarea" maxlength="100" clearable></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.isManual === 1" type="text" @click="handleSave(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageBySubList.total">
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
      queryForm: { subjectId: '' },
      pageInfoData: { currentPage: 1, pageSize: 10 },
      exhibitionNum: '',
      topicDetailsForm: {} // 复制到本地
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['pageBySubList']),
    queryParams() {
      return {
        subjectId: this.queryForm.subjectId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize,
        exhibitionNum: this.exhibitionNum
      };
    }
  },
  created() {
    this.subjectTitle = this.$route.query.subjectTitle;
    this.exhibitionNum = this.$route.query.exhibitionNum;
    this.queryForm.subjectId = this.$route.query.subjectId;
    this.getPageBySubList(this.queryParams).then(res => {
      this.topicDetailsForm = JSON.parse(JSON.stringify(this.pageBySubList));
    });
  },
  methods: {
    ...mapActions('leaderGroup', ['getPageBySubList', 'postPageBySubRowSave']),
    handleSave(row) {
      let feedbackId = row.feedbackId; let memberId = row.memberId; let isSupport = row.isSupport;
      let feedbackContent = row.feedbackContent; let subjectId = row.subjectId;
      this.$confirm('是否确认保存?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(res => {
        this.postPageBySubRowSave({ feedbackId, memberId, isSupport, feedbackContent, subjectId }).then(() => {
          this.$message.success('保存成功');
          this.getPageBySubList(this.queryParams).then(() => {
            this.topicDetailsForm = JSON.parse(JSON.stringify(this.pageBySubList));
          });
        }).catch(() => {
          this.$message.error('保存失败');
        });
      });
    },
    handleBack() { // 返回通知事件管理
      let subjectId = this.queryForm.subjectId;
      let exhibitionNum = this.exhibitionNum;
      this.$router.push({
        path: "/noticeManageWork",
        query: {
          subjectId, exhibitionNum
        }
      });
    },
    downloadList() {
      let obj = this.queryForm;
      obj.exhibitionNum = this.exhibitionNum;
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupFeedback/downloadBySub?${this.encodeSearchParams(obj)}`);
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getPageBySubList(this.queryParams).then(res => {
        this.topicDetailsForm = JSON.parse(JSON.stringify(this.pageBySubList));
      });
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getPageBySubList(this.queryParams).then(res => {
        this.topicDetailsForm = JSON.parse(JSON.stringify(this.pageBySubList));
      });
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
