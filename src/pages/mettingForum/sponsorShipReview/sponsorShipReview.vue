/**
* @file 广交会-会议赞助审核
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">会议赞助审核</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" label-width="90px">
      <el-form-item label="赞助商名称" size="mini">
        <el-input v-model.trim="ruleForm.companyName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="赞助等级" size="mini">
        <el-select v-model="ruleForm.supportLevel" placeholder="请选择">
          <el-option v-for="(sponsor,index) in sponsorsData" :key="index" :label="sponsor.supportLevel" :value="sponsor.supportLevel"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option label="待审核" value="0"></el-option>
          <el-option label="通过" value="1"></el-option>
          <el-option label="不通过" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" style="margin-left: 50px">
        <el-button type="primary"  @click="getSupportApplyList('1')">查询</el-button>
        <el-button type="primary"  @click="resetApplyForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" @click="handleMuitlPass()" :disabled="publishBtn">通过</el-button>
      <el-button type="warning" @click="handleMuitlNoPass()" :disabled="noPublishBtn">不通过</el-button>
    </el-row>
    <template>
      <el-table
        class="table"
        :data="listDatas"
        border
        @select-all="handleTabSelectAll"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="companName"
          label="赞助商名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="meetingTitle"
          label="会议主题"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="会议时间"
          align="center"
          width="280">
          <template slot-scope="scope">
            <span>{{ scope.row.meetingStartTime.substring(0,16) }}-{{ scope.row.meetingEndTIme.substring(0,16) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="supportLevel"
          label="赞助等级"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="otherPlan"
          label="其他赞助方案"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '0'">待审核</span>
            <span v-if="scope.row.status === '1'">通过</span>
            <span v-if="scope.row.status === '2'">不通过</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" v-if="scope.row.status === '0'" @click="handleSinglePass(scope.row, scope.$index)">通过</el-button>
            <el-button type="text" size="mini" v-else @click="handleSinglePass(scope.row, scope.$index)" :disabled="true">通过</el-button>
            <el-button type="text" size="mini" v-if="scope.row.status === '0'" @click="handleSingleNoPass(scope.row, scope.$index)">不通过</el-button>
            <el-button type="text" size="mini" v-else @click="handleSingleNoPass(scope.row, scope.$index)" :disabled="true">不通过</el-button>
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
    name: "sponsorShipReview",
    data() {
      return {
        source: {
          language: []
        },
        listDatas: [],
        listTotal: 0,
        sponsorsData: [],

        auditFlag: '',
        passSupportIds: [],
        noPassSupportIds: [],
        publishBtn: true,
        noPublishBtn: true,

        ruleForm: {
          companName: '',
          supportLevel: '',
          status: '',
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
      this.getSupportApplyList();
      this.getSponsorsList();
    },
    // async created() {
    //   this.source.language = await kindo.util.getLanguage('BaseMapLang');
    // },
    methods: {
      /*
        列表数据获取
       */
      // 赞助申请列表
      getSupportApplyList(flag) {
        if (flag === '1') {
          this.ruleForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listSupportApply', this.ruleForm).then(res => {
          this.listDatas = res.records;
          this.listTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取赞助管理列表
      getSponsorsList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listSupportPlanSet').then(res => {
          this.sponsorsData = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleTabSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleSelectionChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.passSupportIds = [];
        this.noPassSupportIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          if (val[i].status === '0') {
            this.passSupportIds.push(val[i].supportApplyId);
          } else {
            this.noPassSupportIds.push(val[i].supportApplyId);
          }
        }

        if (this.passSupportIds.length > 0) {
          this.noPublishBtn = false;
          this.publishBtn = false;
        } else {
          this.noPublishBtn = true;
          this.publishBtn = true;
        }
      },
      handleMuitlPass() {
        if (this.noPassSupportIds.length > 0) {
          this.$message.warning("不能包含已经审核的选项!");
        } else {
          this.auditFlag = '1';
          this.sendSponsorRequest(this.passSupportIds);
        }
      },
      handleMuitlNoPass() {
        if (this.noPassSupportIds.length > 0) {
          this.$message.warning("不能包含已经审核的选项!");
        } else {
          this.showDialogTips("确认审核不通过吗?").then(() => {
            this.auditFlag = '2';
            this.sendSponsorRequest(this.passSupportIds);
          }).catch(() => { });
        }
      },
      handleSinglePass(row, index) {
        this.auditFlag = '1';
        this.sendSponsorRequest([row.supportApplyId]);
      },
      handleSingleNoPass(row, index) {
        this.showDialogTips("确认审核不通过吗?").then(() => {
          this.auditFlag = '2';
          this.sendSponsorRequest([row.supportApplyId]);
        }).catch(() => { });
      },
      // 发送审核结果
      sendSponsorRequest(supportIds) {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/auditSupportApply?auditFlag=' + this.auditFlag, supportIds).then(res => {
          this.$message.success("审核成功");
          this.getSupportApplyList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.getSupportApplyList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.getSupportApplyList();
      },
      resetApplyForm() {
        this.ruleForm.companyName = '';
        this.ruleForm.supportLevel = '';
        this.ruleForm.status = '';
        this.ruleForm.current = 1;
      },
      // 消息提示
      showDialogTips(tipMessage) {
        return this.$confirm(tipMessage, '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        });
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
  .dialog_item{
    width: 230px;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .btn-row{
    margin-left: 20px;
    margin-bottom: 20px;
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

