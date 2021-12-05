/**
 * @file 交易团 查看议题
 * @author: weiwei
 * @date:2019/6/18
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看议题" name="first">
      <div class="above-table">
        <span style="font-weight: 700;font-size: 16px;color:#2b579a;">通知议题: {{subjectTitle}}</span>
        <el-button type="text" class="download" @click="downloadList">下载XLS</el-button>
        <el-button type="text" class="print">打印</el-button>
      </div>

      <el-form :model="checkTopicListForm" ref="checkTopicListForm">
        <el-table border :data="checkTopicListForm.records">
          <el-table-column prop="subjectTitle" label="通知议题"></el-table-column>
          <el-table-column prop="unionDeptname" label="关联中心"></el-table-column>
          <el-table-column prop="isSupport" label="是否赞成">
            <template slot-scope="scope">
              <el-form-item :prop="'records.' + scope.$index + '.isSupport'" label-width="0">
                <el-select placeholder="请输入" v-model="scope.row.isSupport" clearable>
                  <el-option v-for="item in [{value: 0, label: '不赞成'}, {value: 1, label: '赞成'}]" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="feedbackContent" label="反馈内容">
            <template slot-scope="scope">
              <el-form-item :prop="'records.' + scope.$index + '.feedbackContent'" label-width="0">
                <el-input placeholder="请输入100字以内" v-model="scope.row.feedbackContent" type="textarea" maxlength="100" clearable></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleSave(scope.row)">保存</el-button>
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
          :total="checkTopicListData.total">
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
      subjectId: '',
      pageInfoData: { currentPage: 1, pageSize: 10 },
      subjectTitle: '',
      checkTopicListForm: {} // 列表中填表单用
    };
  },
  computed: {
    ...mapGetters('leaderGroup', ['checkTopicListData']),
    queryParams() {
      return {
        subjectId: this.subjectId,
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
      };
    }
  },
  created() {
    this.subjectId = this.$route.query.subjectId;
    this.subjectTitle = this.$route.query.subjectTitle;
    this.getCheckTopicList(this.queryParams).then(res => {
      this.checkTopicListForm = JSON.parse(JSON.stringify(this.checkTopicListData));
    });
  },
  methods: {
    ...mapActions('leaderGroup', ['getCheckTopicList', 'postCheckTopicSave']),
    handleSave(row) {
      let feedbackId = row.feedbackId; let isSupport = row.isSupport;
      let feedbackContent = row.feedbackContent; let subjectId = this.subjectId;
      this.$confirm('是否确认保存?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消'
      }).then(res => {
        this.postCheckTopicSave({ feedbackId, isSupport, feedbackContent, subjectId }).then(() => {
          this.$message.success('保存成功');
          this.getCheckTopicList(this.queryParams).then(() => {
            this.checkTopicListForm = JSON.parse(JSON.stringify(this.checkTopicListData));
          });
        }).catch(() => {
          this.$message.error('保存失败');
        });
      });
    },
    downloadList() {
      kindo.util.getdown(`${process.env.API_SN_URL}/api/efSupFeedback/downloadFeedBack?${this.encodeSearchParams(this.queryForm)}`);
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getCheckTopicList(this.queryParams).then(res => {
        this.checkTopicListForm = JSON.parse(JSON.stringify(this.checkTopicListData));
      });
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getCheckTopicList(this.queryParams).then(res => {
        this.checkTopicListForm = JSON.parse(JSON.stringify(this.checkTopicListData));
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
