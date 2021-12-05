/**
* @file 听众-会议论坛报名记录
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">听众会议论坛报名记录</span></p>
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
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.isRegister" placeholder="请选择">
          <el-option label="已报名" value="1"></el-option>
          <el-option label="取消报名" value="0"></el-option>
        </el-select>
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
          align="center"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="exhibitionSession"
          label="届数"
          width="100"
          align="center">
          <template slot-scope="scope">
            <span>第125届</span>
          </template>
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
            <router-link :to="{ path: '/mettingForumAduienceListDetail', query: { forumId: scope.row.forumId }}">{{scope.row.meetingTitle}}</router-link>
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
          prop="forumCost"
          label="费用（元）"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="isRegister"
          label="状态"
          align="center"
          fixed="right">
          <template slot-scope="scope">
            <span>{{ scope.row.isRegister ? "已报名" : '取消报名'}}</span>
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
    name: "mettingForumSignupAduienceList",
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
          isRegister: '',
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
      // 获取留言列表
      searchForumList(flag) {
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listEnrollAudienceRecord', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 事件处理
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchForumList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchForumList();
      },
      resetSearchForm() {
        this.ruleForm.exhibitionSession = '';
        this.ruleForm.exhibitionPeriod = '';
        this.ruleForm.meetingTitle = '';
        this.ruleForm.isRegister = '';
        this.ruleForm.current = 1;
      }
    }
  };
</script>

<style scoped>
  .container{
    margin: 10px;
  }
  .top_line{
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }
  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
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
