/**
* @file 听众-会议论坛报名
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">听众会议论坛报名</span></p>
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
          <el-option label="未报名" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" style="margin-left: 50px">
        <el-button type="primary" class="btn" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" class="btn" @click="resetSearchForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="primary" :disabled="signUpBtn" @click="openSignUpDialog()">报名</el-button>
    </el-row>
    <template>
      <el-table
        class="table"
        ref="multipleTable"
        :data="listDatas"
        border
        @select-all="handleTabSelectAll"
        @selection-change="handleSelectionChange"
        style="width: 100%;">

        <el-table-column
          type="selection"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="exhibitionSession"
          label="届数"
          width="130"
          align="center">
          <template slot-scope="scope">
            <span>第125届</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="exhibitionPeriod"
          label="期数"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="meetingTitle"
          label="会议主题"
          width="150"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{ path: '/mettingForumAduienceDetail', query: { forumId: scope.row.forumId, isRegister: scope.row.isRegister }}">{{scope.row.meetingTitle}}</router-link>
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
          prop="isRegister "
          label="状态"
          align="center"
          fixed="right">
          <template slot-scope="scope">
            <span v-if="scope.row.isRegister">已报名</span>
            <span v-else>未报名</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="160"
              :visible-arrow="true"
              trigger="click">
                <div>
                  <img :src="qrCodeUrl" style="width:150px;height:150px;margin: 0 auto">
                  <div style="width: 160px;text-align: center">此二维码用于移动端会议签到用</div>
                </div>
              <el-button :disabled="!scope.row.isRegister" type="text" @click="showQrCode(scope.row, scope.$index)" slot="reference">签到二维码</el-button>
            </el-popover>
            <el-button type="text" size="mini" :disabled="scope.row.isRegister" @click="openSignUpSingleForum(scope.row, scope.$index)">报名</el-button>
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

    <!--报名提示弹框-->
    <el-dialog title="报名提示"  width="400px" :visible.sync="signUpDialog">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="" size="mini" label-width="0" style="text-align: center">
          <div v-if="totalForumCost != 0" style="width: 400px;text-align: center">你报名参加的会议论坛签到时需要付费<span style="color: red">{{totalForumCost}}</span>元,是否报名?</div>
          <div v-else style="width: 400px;text-align: center">你报名参加的会议论坛免费,是否报名?</div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="signUpSingleForum()">确 定</el-button>
        <el-button @click="cancelSignUpDialog()">取 消</el-button>
      </div>
    </el-dialog>

    <!--报名提示弹框-->
    <el-dialog title="报名提示"  width="450px" :visible.sync="signUpMutilDialog">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="" size="mini" label-width="0" style="text-align: center">
          <div v-if="mutilTotalForumCost != 0" style="width: 400px;text-align: center">你报名参加的会议论坛签到时需要付费<span style="color: red">{{mutilTotalForumCost}}</span>元,是否报名?</div>
          <div v-else style="width: 400px;text-align: center">你报名参加的会议论坛免费,是否报名?</div>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary"  @click="signUpMuitlForum()">确 定</el-button>
        <el-button @click="cancelsignUpMutilDialog()">取 消</el-button>
      </div>
    </el-dialog>

    <!--报名提示弹框-->
    <el-dialog title="报名成功"  width="450px" :visible.sync="signUpSuccessDialog">
      <div style="padding: 10px 20px;margin-left: 20px">
        您参加的会议论坛报名成功，报名费现场签到给相关工作
      </div>
      <div style="padding: 10px 20px">
        人员，温馨提示：参会需办理入场证件，如不办理，则不能进
      </div>
      <div style="padding: 10px 20px">
        入广交会馆。点击<a href="">证件申请</a>
      </div>
      <div style="width: 450px;text-align: center" >
        <img :src="qrCodeUrl" style="width:150px;height:150px;margin: 0 auto">
      </div>
      <div style="width: 450px;text-align: center">签到二维码</div>
      <div class="dialog-footer">
        <el-button @click="signUpSuccessDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "mettingForumSignupAduience",
    data() {
      return {
        source: {
          language: []
        },
        listDatas: [],
        listTotal: 0,
        signUpDialog: false,
        signUpMutilDialog: false,
        signUpSuccessDialog: false,
        signUpBtn: true,
        qrCodeUrl: '',
        totalForumCost: 0,
        mutilTotalForumCost: 0,

        forumIds: [],
        signUpIds: [],
        forumId: '',

        ruleForm: {
          exhibitionSession: '',
          exhibitionPeriod: '',
          meetingTitle: '',
          isRegister: "",
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
        this.$http.get(this.baseApi + '/api/customservice/forum/listEnrollAudience', this.ruleForm).then(res => {
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
      },
      cancelSignUpDialog() {
        this.signUpDialog = false;

      },
      cancelsignUpMutilDialog() {
        this.signUpMutilDialog = false;
      },
      // 列表选中事件处理
      handleTabSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleSelectionChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.forumIds = [];
        this.signUpIds = [];
        let total = 0;
        for (let i = 0, length = val.length; i < length; i++) {
          if (val[i].isRegister) {
            this.signUpIds.push(val[i].forumId);
          } else {
            this.forumIds.push(val[i].forumId);
            if (val[i].forumCost) {
              total += parseInt(val[i].forumCost);
            }
          }
        }
        this.mutilTotalForumCost = total;
        if (this.forumIds.length > 0) {
          this.signUpBtn = false;
        } else {
          this.signUpBtn = true;
        }
      },
      openSignUpSingleForum(row, index) {
        // this.showDialogTips("确认报名?").then(() => {
        //
        // }).catch(() => {});
        this.signUpDialog = true;
        this.forumId = row.forumId;
        if (row.forumCost) {
          this.totalForumCost = row.forumCost;
        } else {
          this.totalForumCost = 0;
        }
      },
      // 报名会议论坛
      signUpSingleForum() {
        this.sendSignUpRequest([this.forumId]);
      },
      openSignUpDialog() {
        // this.showDialogTips("确认报名?").then(() => {
        //
        // }).catch(() => {});
        if (this.signUpIds.length > 0) {
          this.$message.warning("包含已经报名的选项!");
        } else {
          this.signUpMutilDialog = true;
        }
      },
      signUpMuitlForum() {
        this.sendSignUpRequest(this.forumIds);
      },
      sendSignUpRequest(forumIds) {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/forumRegister', forumIds).then(res => {
          this.$message.success("报名成功!");
          this.signUpMutilDialog = false;
          this.signUpDialog = false;
          this.signUpSuccessDialog = true;
          this.searchForumList();
          this.getQrCode();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      showQrCode(row, index) {
        this.getQrCode();
      },
      // 获取签到二维码
      getQrCode() {
        this.$http.get(this.baseApi + '/api/customservice/forum/getQRCode').then(res => {
          // 获取二维码结果
          this.qrCodeUrl = "data:image/jpeg;base64," + res;
        }).catch(error => {
          this.$message.error(error);
        });
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
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .btn-row{
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .dialog-footer{
    text-align: center;
    margin-top: 10px;
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
