/**
* @file 广交会-会议论坛留言管理
* @author:zhangwenjian
* @date: 2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">会议论坛留言管理</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="80px">
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option label="123届" value="1"></el-option>
          <el-option label="124届" value="2"></el-option>
          <el-option label="125届" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期数" size="mini">
        <el-select v-model="ruleForm.exhibitionPeriod" placeholder="请选择">
          <el-option label="第一期" value="第一期"></el-option>
          <el-option label="第二期" value="第二期"></el-option>
          <el-option label="第三期" value="第三期"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议主题" size="mini">
        <el-input v-model.trim="ruleForm.meetingTitle" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item class="item" label="会议时间" prop="meetingBegin" size="small">
        <el-date-picker
          v-model="ruleForm.searchTime"
          type="datetimerange"
          align="right"
          range-separator="至"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['08:00:00', '21:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item size="mini" style="margin-left: 50px">
        <el-button type="primary" class="btn" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" class="btn" @click="resetSearchForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        class="table"
        ref="multipleTable"
        :data="listDatas"
        border
        style="width: 100%;">

        <el-table-column
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="exhibitionSession"
          label="届数"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="exhibitionPeriod"
          label="期数"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="meetingTitle"
          label="会议主题"
          width="150"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{ path: '/mettingForumMsgDetail', query: { forumId: scope.row.forumId, isView: '0' }}">{{scope.row.meetingTitle}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="会议时间"
          align="center"
          width="280">
          <template slot-scope="scope">
            <span>{{ scope.row.meetingStartTime.substring(0,16) }} - {{ scope.row.meetingEndTime.substring(0,16) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="activity"
          label="活动"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="numberLimit"
          label="人数限制"
          align="center">
        </el-table-column>
        <el-table-column
          prop="forumCost"
          label="费用（元）"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="toForumMsgDetail(scope.row, scope.$index)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="handleListSizeChange"
        @current-change="handleListCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  export default {
    name: "mettingForumMsgList",
    data() {
      return {
        source: {
          language: []
        },
        listDatas: [],
        listTotal: 0,

        ruleForm: {
          exhibitionSession: '',
          exhibitionPeriod: '',
          meetingTitle: '',
          searchTime: '',
          meetingBegin: '',
          meetingEnd: '',
          current: 1,
          size: 10
        },
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.searchForumList();
    },
    methods: {
      /*
      搜索及条件重置
      */
      // 获取留言列表
      searchForumList(flag) {
        if (this.ruleForm.searchTime !== '') {
          this.ruleForm.meetingBegin = this.ruleForm.searchTime[0];
          this.ruleForm.meetingEnd = this.ruleForm.searchTime[1];
        }
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listForums', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      resetSearchForm() {
        this.ruleForm.exhibitionSession = '';
        this.ruleForm.exhibitionPeriod = '';
        this.ruleForm.meetingTitle = '';
        this.ruleForm.searchTime = '';
        this.ruleForm.meetingBegin = '';
        this.ruleForm.meetingEnd = '';
        this.ruleForm.current = 1;
      },
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchForumList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchForumList();
      },
      // 跳转到留言详情
      toForumMsgDetail(row, index) {
        this.$router.push({ path: '/mettingForumMsgDetail', query: { forumId: row.forumId, isView: '1' }});
      }
    }

  };
</script>
<style scoped>
  .container {
    margin: 10px;
  }

  .top_line {
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }

  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }

  .table {
    margin-left: 20px;
  }

  .btn {
    text-align: center;
    height: 30px;
    padding: 0 30px;
  }

  .pagination {
    text-align: right;
    margin: 10px;
  }
  .demo-ruleForm{
    margin-left: 20px;
  }
</style>
<style>
  .el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  .table{
    width: 98%;
    margin:0 20px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
