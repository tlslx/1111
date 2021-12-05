/**
* @file 广交会-会议论坛报名记录
* @author:zhangwenjian
* @date: 2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">会议论坛报名记录</span></p>
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
      <el-form-item label="是否开放" size="mini">
        <el-select v-model="ruleForm.isOpen" placeholder="请选择">
          <el-option label="开放" value="1"></el-option>
          <el-option label="未开放" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option label="已发布" value="1"></el-option>
          <el-option label="未发布" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="searchForumList('1')">查询</el-button>
        <el-button type="primary" @click="resetRuleForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row class="btn-row">
      <el-button type="warning" :disabled="directionBtn"  @click="directionalMuitlInvitation()">定向邀请</el-button>
      <el-button type="primary" :disabled="directionBtn" @click="signUpMuitlAudience()">报名听众</el-button>
    </el-row>
    <template>
      <el-table
        ref="multipleTable"
        :data="listDatas"
        class="table"
        border
        @select-all="handleListSelectAll"
        @selection-change="handleListSelectChange"
        style="width: 100%;">

        <el-table-column
          type="selection"
          width="50">
        </el-table-column>

        <el-table-column
          prop="exhibitionSession"
          label="届数"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="exhibitionPeriod"
          label="期数"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="meetingTitle"
          label="会议主题"
          width="160"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{ path: '/mettingForumDetail', query: { forumId: scope.row.forumId, enterRouter: '/mettingForumSignupList' }}">{{scope.row.meetingTitle}}</router-link>
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
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="forumLabelName"
          label="标签"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="出席嘉宾"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewGuestList(scope.row, scope.$index)">查看名单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="numberLimit"
          label="人数限制"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="forumCost"
          label="费用（元）"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="directionalInvitation(scope.row, scope.$index)">定向邀请</el-button>
            <el-button type="text" size="mini" @click="signUpAudience(scope.row, scope.$index)">报名听众</el-button>
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

    <!--定向邀请弹框-->
    <el-dialog title="定向邀请"  width="860px" :visible.sync="inviteDialog"  :close-on-click-modal="false">
      <el-form :inline="true" :model="inviteForm" class="demo-form-inline">
        <el-form-item label="姓名" size="mini" label-width="70px">
          <el-input style="width: 150px" v-model.trim="inviteForm.audienceName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="重要客户" size="mini" label-width="70px">
          <el-select style="width: 150px" v-model="inviteForm.isImportant" placeholder="请选择">
            <el-option  label="是" value="1"></el-option>
            <el-option  label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button  type="primary" @click="getDirectionalList('1')">查询</el-button>
          <el-button  type="primary" @click="resetDirectionalForm()">重置</el-button>
          <el-button  type="warning" @click="openAddAudienceDialog()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="inviteDatas">
        <el-table-column property="date" label="序号" type="index" width="60"></el-table-column>
        <el-table-column
          prop="audienceName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="audienceEmail"
          label="邮箱"
          align="center">
        </el-table-column>
        <el-table-column
          label="是否重要客户"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.isImportant ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="forumCost"
          label="费用(元)"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleInviteSizeChange"
        @current-change="handleInviteCurrentChange"
        :current-page.sync="inviteForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="inviteForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="inviteTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button @click="inviteDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!--添加听众弹框-->
    <el-dialog title="添加报名" :visible.sync="addAudienceDialog"  width="480px" :close-on-click-modal="false">
      <el-form :model="addAudienceForm" label-position="right" ref="addAudienceForm" :rules="rules" style="padding: 0 20px" label-width="90px">
        <el-form-item label="姓名:" size="mini" prop="audienceName">
          <el-input :disabled="addAudienceDisable" type="text" maxlength="50" v-model.trim="addAudienceForm.audienceName" placeholder="请输入内容" style="width: 70%"></el-input>
          <el-button type="warning" @click="selectAudience()" style="margin-left: 5px">选择</el-button>
        </el-form-item>
        <el-form-item label="公司名称:"  size="mini" prop="companyName">
          <el-input :disabled="addAudienceDisable" type="text" maxlength="50" v-model.trim="addAudienceForm.companyName" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="职位:" size="mini" prop="audiencePosition">
          <el-input :disabled="addAudienceDisable" type="text" maxlength="32" v-model.trim="addAudienceForm.audiencePosition" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="手机:" size="mini" prop="audienceMobile">
          <el-input :disabled="addAudienceDisable" type="text" maxlength="11" v-model.trim="addAudienceForm.audienceMobile" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:"  size="mini" prop="audienceEmail">
          <el-input :disabled="addAudienceDisable" type="text" maxlength="50" v-model.trim="addAudienceForm.audienceEmail" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="行业:" size="mini" prop="industryId">
          <el-select :disabled="addAudienceDisable" v-model="addAudienceForm.industryId" placeholder="请选择" class="dialog_item"  @change="industryChange">
            <el-option v-for="(profession,index) in industrys" :key="index" :label="profession.industryName"
                       :value="profession.industryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区:" size="mini" prop="exhibitionId">
          <el-select :disabled="addAudienceDisable" v-model="addAudienceForm.exhibitionId" placeholder="请选择" class="dialog_item">
            <el-option v-for="(exhibition,index) in exhibitions" :key="index" :label="exhibition.exhibitionName"
                       :value="exhibition.exhibitionId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要客户:" size="mini" prop="isImportant">
          <el-select :disabled="addAudienceDisable" v-model="addAudienceForm.isImportant" placeholder="请选择" class="dialog_item">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="论坛费用:"  size="mini" prop="forumCost">
          <el-input type="text" v-if="forumCost" maxlength="13" v-model.trim="addAudienceForm.forumCost" placeholder="请输入内容" class="dialog_item"></el-input>
          <el-input type="text" v-else :disabled="true" v-model.trim="addAudienceForm.forumCost" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="邀请模板:" size="mini">
          <el-select v-model="addAudienceForm.templateId" placeholder="请选择" class="dialog_item">
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="addAudienceInfo()">确 认</el-button>
        <el-button @click="cancelAddAudience()">取 消</el-button>
        <el-button @click="resetAddAudienceDialog()">重 置</el-button>
      </div>
    </el-dialog>

    <!--听众名单--选择听众加入定向邀请-->
    <el-dialog title="听众名单"  width="800px" :visible.sync="addInviteDialog" :close-on-click-modal="false">
      <el-form :inline="true" :model="addInviteForm" class="demo-ruleForm" label-width="90px">
        <el-form-item label="姓名" size="mini">
          <el-input v-model.trim="addInviteForm.audienceName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" size="mini">
          <el-input v-model.trim="addInviteForm.audienceEmail" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="重要客户" size="mini">
          <el-select v-model="addInviteForm.isImportant" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini" style="margin-left: 20px">
          <el-button type="primary" @click="getAudienceList('1')">查询</el-button>
          <el-button type="primary" @click="resetaddInviteForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-table
          ref="multipleTable"
          :data="audiencesDatas"
          border>

          <el-table-column
            label="序号"
            type="index"
            width="80">
          </el-table-column>

          <el-table-column
            prop="audienceName"
            label="姓名"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="公司名称"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="audiencePosition"
            label="职位"
            align="center"
            width="150">
          </el-table-column>
          <el-table-column
            prop="audienceMobile"
            label="手机"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="audienceEmail"
            label="邮箱"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            prop="isImportant"
            label="重要客户"
            width="150"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.isImportant ? "是": "否" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="industryName"
            label="行业"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exhibitionName"
            label="展区"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="100">
            <template slot-scope="scope">
              <el-button  type="text" size="mini" @click="addAudienceToSignUp(scope.row, scope.$index)">加入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="pagination"
          @size-change="handleAddInviteSizeChange"
          @current-change="handleAddInviteCurrentChange"
          :current-page.sync="addInviteForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="addInviteForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="audiencesTotal"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>
      <div class="dialog-footer">
        <el-button @click="closeAddInviteDialog()">关 闭</el-button>
      </div>
    </el-dialog>

    <!--报名听众弹框-->
    <el-dialog title="报名听众"  width="880px" :visible.sync="signUpDialog"  :close-on-click-modal="false">
      <el-form :inline="true" :model="signUpForm" class="demo-form-inline">
        <el-form-item label="姓名" size="mini" label-width="70px">
          <el-input style="width: 150px" v-model.trim="signUpForm.audienceName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="重要客户" size="mini" label-width="70px">
          <el-select style="width: 150px" v-model="signUpForm.isImportant" placeholder="请选择">
            <el-option  label="是" value="1"></el-option>
            <el-option  label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否签到" size="mini" label-width="70px">
          <el-select style="width: 150px" v-model="signUpForm.isSignIn" placeholder="请选择">
            <el-option  label="已签到" value="1"></el-option>
            <el-option  label="未签到" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini" style="margin-left: 20px">
          <el-button  type="primary" @click="getSignUpList('1')">查询</el-button>
          <el-button  @click="resetSignUpForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row class="btn-row">
        <el-button type="primary" :disabled="updateBtn" @click="openUpdateDialog()" class="btn">修改费用</el-button>
      </el-row>
      <el-table
        border
        @select-all="handlesignUpSelectAll"
        @selection-change="handlesignUpSelectChange"
        :data="signUpDatas"
      >
        <el-table-column
          type="selection"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="audienceName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="audienceEmail"
          label="邮箱"
          align="center">
        </el-table-column>
        <el-table-column
          label="是否重要客户"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.isImportant ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否签到"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.isSignIn ? '已签到' : '未签到'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="forumCost"
          label="费用(元)"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleSignUpSizeChange"
        @current-change="handleSignUpCurrentChange"
        :current-page.sync="signUpForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="signUpForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="signUpTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button @click="signUpDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!--修改费用弹框-->
    <el-dialog title="修改费用"  width="460px" :visible.sync="updateCostDialog"  :close-on-click-modal="false">
      <el-form :inline="true" :model="updateCostForm" class="demo-form-inline" style="text-align: center" :rules="updateRules">
        <el-form-item label="论坛费用" size="mini" label-width="90px" prop="forumCost">
          <el-input style="width: 150px" v-model.trim="updateCostForm.forumCost" placeholder="请输入论坛费用"></el-input>
        </el-form-item>
        <el-row class="dialog-footer">
          <el-button  type="primary" @click="updateCostRequest()">确认</el-button>
          <el-button  type="primary" @click="updateCostDialog = false">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!--查看嘉宾名单弹框-->
    <el-dialog title="查看嘉宾名单"  width="600px" :visible.sync="viewListDialog" :close-on-click-modal="false">
      <el-form :inline="true" :model="viewListForm" class="demo-form-inline">
        <el-form-item label="姓名" size="mini" label-width="70px">
          <el-input style="width: 150px" v-model.trim="viewListForm.guestName"></el-input>
        </el-form-item>
        <el-form-item label="所属机构" size="mini" label-width="70px" >
          <el-input style="width: 150px" v-model.trim="viewListForm.orgName"></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button  type="primary" @click="getGuestList('1')">查询</el-button>
          <el-button  type="primary" @click="resetViewListForm()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="viewListDatas"
        border
      >
        <el-table-column
          property="date"
          label="序号"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          prop="guestName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="所属机构"
          align="center">
        </el-table-column>
        <el-table-column
          prop="guestPhone"
          label="手机"
          align="center">
        </el-table-column>
        <el-table-column
          prop="forumRole"
          label="会议角色"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleViewListSizeChange"
        @current-change="handleViewListCurrentChange"
        :current-page.sync="viewListForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="viewListForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="viewListTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button type="primary" @click="viewListDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';

  export default {
    name: "mettingForumSignupList",
    mixins: [dialogMixin],
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error("输入不能包含特殊字符!"));
        } else {
          return callback();
        }
      };
      const checkFee = (rule, value, callback) => {
        let reg = /^\d+(\.\d+)?$/;
        let match = reg.test(value);
        if (value == null || value === '') {
          return callback();
        }
        if (!match) {
          return callback(new Error('请输入数字类型!'));
        }
        let decimal = /(^[0-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
        let matchDecimal = decimal.test(value);
        if (!matchDecimal) {
          return callback(new Error('只能保留两位小数!'));
        }
        let data = (value + '').split('.')[0];
        if (data.length > 10) {
          return callback(new Error('输入的数字过大!'));
        }
        return callback();
      };
      return {
        source: {
          language: []
        },
        directionBtn: true,
        updateBtn: true,

        listDatas: [],
        signUpDatas: [],
        inviteDatas: [],
        viewListDatas: [],
        audiencesDatas: [],

        listTotal: 0,
        signUpTotal: 0,
        inviteTotal: 0,
        viewListTotal: 0,
        audiencesTotal: 0,

        signUpDialog: false,
        inviteDialog: false,
        viewListDialog: false,
        updateCostDialog: false,
        addInviteDialog: false,
        addAudienceDialog: false,

        industrys: [],
        exhibitions: [],
        forumCost: '',
        forumId: '',
        addAudienceDisable: false,

        enrolmentAudienceIds: [],  // 报名听众id
        directionalIds: [],   // 定向邀请id

        ruleForm: {
          exhibitionSession: '',
          exhibitionPeriod: '',
          meetingTitle: '',
          searchTime: '',
          meetingBegin: '',
          meetingEnd: '',
          isOpen: '',
          status: '',
          current: 1,
          size: 10
        },
        signUpForm: {
          forumId: '',
          audienceName: '',
          isImportant: '',
          isSignIn: '',
          current: 1,
          size: 10
        },
        inviteForm: {
          audienceName: '',
          isImportant: '',
          forumId: '',
          current: 1,
          size: 10
        },
        addInviteForm: {
          audienceName: '',
          audienceEmail: '',
          isImportant: '',
          current: 1,
          size: 10
        },
        addAudienceForm: {
          audienceName: '',
          audienceMobile: '',
          audienceId: '',
          audienceEmail: '',
          companyName: '',
          audiencePosition: '',
          isImportant: '',
          exhibitionId: '',
          industryId: '',
          forumCost: '',
          templateId: '',
          forumId: ''
        },
        viewListForm: {
          forumId: '',
          guestName: '',
          orgName: '',
          current: 1,
          size: 10
        },

        updateCostForm: {
          forumEnrollId: [],
          forumCost: ''
        },
        rules: {
          audienceName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { required: false, validator: validateSpecial, trigger: 'blur' }
          ],
          audienceEmail: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          audienceMobile: [
            { required: false, validator: validateMobile, trigger: 'blur' }
          ],
          companyName: [
            { required: false, validator: validateSpecial, trigger: 'blur' }
          ],
          audiencePosition: [
            { required: false, validator: validateSpecial, trigger: 'blur' }
          ],
          forumCost: [
            { validator: checkFee, trigger: 'blur' }
          ]
        },
        updateRules: {
          forumCost: [
            { required: true, message: '请输入费用', trigger: 'blur' },
            { validator: checkFee, trigger: 'blur' }
          ]
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
       会议论坛报名记录
      */
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
      // 重置论坛列表搜索表单
      resetRuleForm() {
        this.ruleForm.exhibitionSession = '';
        this.ruleForm.exhibitionPeriod = '';
        this.ruleForm.searchTime = '';
        this.ruleForm.meetingTitle = '';
        this.ruleForm.meetingBegin = '';
        this.ruleForm.meetingEnd = '';
        this.ruleForm.audienceId = '';
        this.ruleForm.isOpen = '';
        this.ruleForm.status = '';
        this.ruleForm.current = 1;
      },
      /*
        表格操作按钮事件处理
      */
      // 查看嘉宾名单
      viewGuestList(row, index) {
        this.viewListForm.forumId = row.forumId;
        this.viewListDialog = true;
        this.getGuestList();
      },
      // 单个定向邀请
      directionalInvitation(row, index) {
        this.inviteDialog = true;
        this.inviteForm.forumId = row.forumId;
        this.addAudienceForm.forumId = row.forumId;
        if (row.forumCost == null || row.forumCost === '') {
          this.forumCost = 0;
        } else {
          this.forumCost = row.forumCost;
        }
        this.forumId = row.forumId;
        this.getDirectionalList();
      },
      // 多个定向邀请
      directionalMuitlInvitation() {
        this.forumId = '';
        if (this.forumIds.length > 1) {
          this.$message.warning("只能选择一个会议论坛进行定向邀请!");
        } else {
          this.inviteDialog = true;
          this.inviteForm.forumId = this.forumIds[0];
          this.addAudienceForm.forumId = this.forumIds[0];
          this.getDirectionalList();
        }
      },
      // 单个报名听众
      signUpAudience(row, index) {
        this.signUpDialog = true;
        this.signUpForm.forumId = row.forumId;
        if (row.forumCost == null || row.forumCost === '') {
          this.forumCost = 0;
        } else {
          this.forumCost = row.forumCost;
        }
        this.addAudienceForm.forumId = row.forumId;
        this.updateCostForm.forumCost = '';
        this.getSignUpList();
      },
      // 多个报名听众
      signUpMuitlAudience() {
        this.updateCostForm.forumCost = '';
        if (this.forumIds.length > 1) {
          this.$message.warning("只能选择一个会议论坛进行操作!");
        } else {
          this.signUpDialog = true;
          this.signUpForm.forumId = this.forumIds[0];
          this.addAudienceForm.forumId = this.forumIds[0];
          this.getSignUpList();
        }
      },
      /*
        选择及分页事件处理
      */
      // 列表选择事件
      handleListSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleListSelectChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.forumIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.forumIds.push(val[i].forumId);
        }
        if (val.length > 0) {
          if (val[0].forumCost == null || val[0].forumCost === '') {
            this.forumCost = 0;
          } else {
            this.forumCost = val[0].forumCost;
          }
        }
        if (this.forumIds.length > 0) {
          this.directionBtn = false;
        } else {
          this.directionBtn = true;
        }
      },
      openUpdateDialog() {
        this.updateCostDialog = true;
        this.updateCostForm.forumCost = '';
      },
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchForumList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchForumList();
      },
      /*
       定向邀请弹框处理
      */
      // 获取定向邀请列表
      getDirectionalList(flag) {
        if (flag === '1') {
          this.inviteForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listDesignationInvitate', this.inviteForm).then(res => {
          this.inviteDatas = res.records;
          this.inviteTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      resetDirectionalForm() {
        this.inviteForm.audienceName = '';
        this.inviteForm.isImportant = '';
        this.inviteForm.current = 1;
      },
      handleInviteSizeChange(pageSize) {
        this.inviteForm.size = pageSize;
        this.getDirectionalList();
      },
      handleInviteCurrentChange(currentPage) {
        this.inviteForm.current = currentPage;
        this.getDirectionalList();
      },

      /*
          报名听众弹框处理
       */
      getSignUpList(flag) {
        if (flag === '1') {
          this.signUpForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumAudiences', this.signUpForm).then(res => {
          this.signUpDatas = res.records;
          this.signUpTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      resetSignUpForm() {
        this.signUpForm.audienceName = '';
        this.signUpForm.isImportant = '';
        this.signUpForm.isSignIn = '';
        this.signUpForm.current = 1;
      },
      // 列表多选和全选
      handlesignUpSelectAll(val) {
        this.pushSignUpSelectIds(val);
      },
      handlesignUpSelectChange(val) {
        this.pushSignUpSelectIds(val);
      },
      pushSignUpSelectIds(val) {
        this.updateCostForm.forumEnrollId = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.updateCostForm.forumEnrollId.push(val[i].forumEnrollId);
        }
        if (this.updateCostForm.forumEnrollId.length > 0) {
          this.updateBtn = false;
        } else {
          this.updateBtn = true;
        }
      },
      // 分页
      handleSignUpSizeChange(pageSize) {
        this.signUpForm.size = pageSize;
        this.getSignUpList();
      },
      handleSignUpCurrentChange(currentPage) {
        this.signUpForm.current = currentPage;
        this.getSignUpList();
      },
      /*
        嘉宾名单，选择嘉宾加入邀请
      */
      // 嘉宾信息列表
      getAudienceList(flag) {
        if (flag === '1') {
          this.addInviteForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listAudience', this.addInviteForm).then(res => {
          this.audiencesDatas = res.records;
          this.audiencesTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      resetaddInviteForm() {
        this.addInviteForm.audienceName = '';
        this.addInviteForm.companyName = '';
        this.addInviteForm.isImportant = '';
        this.addInviteForm.current = 1;
      },
      handleAddInviteSizeChange(pageSize) {
        this.addInviteForm.size = pageSize;
        this.getAudienceList();
      },
      handleAddInviteCurrentChange(currentPage) {
        this.addInviteForm.current = currentPage;
        this.getAudienceList();
      },
      resetAddAudienceDialog() {
        for (let item in this.addAudienceForm) {
          this.addAudienceForm[item] = '';
        }
        this.addAudienceDisable = false;
        this.addAudienceForm.forumCost = this.forumCost;

      },
      // 添加嘉宾到定向邀请记录
      addAudienceToSignUp(row, index) {
        if (this.forumId) {
          this.addAudienceForm.forumId = this.forumId;
        } else {
          this.addAudienceForm.forumId = this.forumIds[0];
        }
        for (let item in this.addAudienceForm) {
          this.addAudienceForm[item] = row[item];
        }
        if (this.addAudienceForm.isImportant) {
          this.addAudienceForm.isImportant = '1';
        } else {
          this.addAudienceForm.isImportant = '0';
        }
        this.addAudienceForm.forumCost = this.forumCost;
        this.addInviteDialog = false;
        this.addAudienceDialog = true;
        this.addAudienceDisable = true;
      },
      /*
        修改费用弹框
       */
      updateCostRequest() {
        // 费用修改请求  updateCostForm
        this.$http.postJson(this.baseApi + '/api/customservice/forum/updateForumCost?forumCost=' + this.updateCostForm.forumCost, this.updateCostForm.forumEnrollId).then(res => {
          this.$message.success("费用修改成功");
          this.updateCostDialog = false;
          this.getSignUpList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      /*
        添加嘉宾(听众信息)
       */
      openAddAudienceDialog() {
        if (this.$refs.addAudienceForm !== undefined) {
          this.$refs.addAudienceForm.resetFields();
        }
        this.addAudienceDialog = true;
        this.inviteDialog = false;
        this.resetAddAudienceForm();
        this.getIndustryList();
      },
      selectAudience() {
        this.addAudienceDialog = false;
        this.addInviteDialog = true;
        this.getAudienceList();
      },
      closeAddInviteDialog() {
        this.addInviteDialog = false;
        this.inviteDialog = true;
        this.addAudienceDisable = false;
      },
      industryChange(val) {
        this.exhibitions = [];
        this.getExhibitionList(val);
      },
      // 增加定向邀请听众
      addAudienceInfo() {
        this.$refs["addAudienceForm"].validate((valid) => {
          if (valid) {
            if (!this.forumId) {
              this.addAudienceForm.forumId = this.forumIds[0];
            } else {
              this.addAudienceForm.forumId = this.forumId;
            }
            if (this.addAudienceForm.forumCost === '' || this.addAudienceForm.forumCost == null) {
              this.addAudienceForm.forumCost = 0;
            }
            this.$http.postJson(this.baseApi + '/api/customservice/forum/saveInviteAudience?forumCost=' + this.addAudienceForm.forumCost, this.addAudienceForm).then(res => {
              this.$message.success("新增成功");
              this.addAudienceDialog = false;
              this.inviteDialog = true;
              this.addAudienceDisable = false;
              // 重新获取定向邀请列表
              this.getDirectionalList();
            }).catch(error => {
              this.$message.error(error);
            });
          }
        });
      },
      // 重置新增的表单
      resetAddAudienceForm() {
        this.addAudienceForm.audienceMobile = '';
        this.addAudienceForm.audienceName = '';
        this.addAudienceForm.audienceEmail = '';
        this.addAudienceForm.companyName = '';
        this.addAudienceForm.audiencePosition = '';
        this.addAudienceForm.isImportant = '';
        this.addAudienceForm.exhibitionId = '';
        this.addAudienceForm.industryId = '';
        this.addAudienceForm.forumCost = this.forumCost;
        // 邀请模板重置

      },
      // 获取行业列表
      getIndustryList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listIndustry', { size: 50 }).then(res => {
          this.industrys = res.records;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取展区列表
      getExhibitionList(industryId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/listExhibitionSetAll', { industryId: industryId }).then(res => {
          this.exhibitions = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 嘉宾名单列表
      handleViewListSizeChange(pageSize) {
        this.viewListForm.size = pageSize;
        this.getGuestList();
      },
      handleViewListCurrentChange(currentPage) {
        this.viewListForm.current = currentPage;
        this.getGuestList();
      },
      // 重置嘉宾搜索表单
      resetViewListForm() {
        this.viewListForm.guestName = '';
        this.viewListForm.orgName = '';
        this.viewListForm.current = 1;
      },
      cancelAddAudience() {
        this.addAudienceDialog = false;
        this.inviteDialog = true;
        this.getDirectionalList();
      },
      // 获取嘉宾信息列表
      getGuestList(flag) {
        this.viewListDatas = [];
        this.viewListTotal = 0;
        if (flag === '1') {
          this.viewListForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumGuestRelation', this.viewListForm).then(res => {
          this.viewListDatas = res.records;
          this.viewListTotal = res.total;
        }).catch(error => {
          this.$message.error(error);
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
  .btn-row{
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .btn {
    text-align: center;
    height: 30px;
    padding: 0 30px;
  }
  .dialog-footer {
    text-align: center;
  }
  .pagination{
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
