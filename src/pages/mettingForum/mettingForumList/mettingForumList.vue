/**
* @file 广交会-会议论坛列表
* @author:zhangwenjian
* @date: 2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">会议论坛列表</span></p>
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
          <el-option label="不开放" value="0"></el-option>
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
      <el-button type="primary" @click="createForum()">创建会议论坛</el-button>
      <el-button type="warning" :disabled="deleteBtn" @click="openInviteAudienceDialog()">邀请听众</el-button>
      <el-button type="primary" :disabled="deleteBtn" @click="settingCanSponsor()">设为可赞助</el-button>
      <el-button type="primary" :disabled="publishBtn" @click="publishMuitlForum()">发布</el-button>
      <el-button type="primary" :disabled="cancelPublishBtn" @click="cancelMuitlPublishForum()">撤销发布</el-button>
      <el-button type="primary" :disabled="deleteBtn" @click="deleteMuitlForum()">删除</el-button>
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
          prop="exhibitionPeriod"
          label="期数"
          width="90"
          align="center">
        </el-table-column>
        <el-table-column
          prop="meetingTitle"
          label="会议主题"
          width="150"
          align="center">
          <template slot-scope="scope">
            <router-link :to="{ path: '/mettingForumDetail', query: { forumId: scope.row.forumId, enterRouter: '/mettingForumList' }}">{{scope.row.meetingTitle}}</router-link>
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
          prop="isOpen"
          width="100"
          label="是否开放"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.isOpen ? "开放" : "不开放"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status === '1' ? "发布" : "未发布"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="settingOpen(scope.row, scope.$index)">开放设置</el-button>
            <el-button type="text" size="mini" @click="cancelSinglePublishForum(scope.row, scope.$index)" v-if="scope.row.status === '1'">撤销</el-button>
            <el-button type="text" size="mini" @click="cancelSinglePublishForum(scope.row, scope.$index)" v-else :disabled="true">撤销</el-button>
            <el-button type="text" size="mini" @click="publishSingleForum(scope.row, scope.$index)" v-if="scope.row.status === '0'">发布</el-button>
            <el-button type="text" size="mini" @click="publishSingleForum(scope.row, scope.$index)" v-else :disabled="true">发布</el-button>
            <el-button type="text" size="mini" @click="deleteSingleForum(scope.row, scope.$index)">删除</el-button>
            <el-button type="text" size="mini" @click="updateForum(scope.row, scope.$index)">修改</el-button>
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

    <!--邀请听众弹框-->
    <el-dialog title="邀请听众" width="880px" :visible.sync="inviteAudienceDialog" :close-on-click-modal="false">
      <el-form :inline="true" :model="inviteAudienceForm" class="demo-form-inline" label-width="70px">
        <el-form-item label="姓名" size="mini">
          <el-input type="text" maxlength="50" style="width: 150px" v-model.trim="inviteAudienceForm.audienceName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" size="mini">
          <el-input type="text" maxlength="50" style="width: 150px" v-model.trim="inviteAudienceForm.audienceEmail"></el-input>
        </el-form-item>
        <el-form-item label="行业" size="mini">
          <el-select class="select" v-model="inviteAudienceForm.industryId" placeholder="请选择"  @change="industryChange">
            <el-option v-for="(industry,index) in industrys" :key="index" :label="industry.industryName" :value="industry.industryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区" size="mini">
          <el-select class="select" v-model="inviteAudienceForm.exhibitionId" placeholder="请选择">
            <el-option v-for="(exhibition,index) in exhibitions" :key="index" :label="exhibition.exhibitionName" :value="exhibition.exhibitionId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要客户" size="mini">
          <el-select class="select" v-model="inviteAudienceForm.isImportant" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini" style="margin-left: 20px">
          <el-button type="primary" @click="getAudienceList('1')">查询</el-button>
          <el-button type="primary" @click="resetAudienceSearchForm()">重置</el-button>
          <el-button type="warning" @click="openAddAudienceDialog()">添加</el-button>
          <el-button type="primary" @click="importForumAudience()">导入</el-button>
        </el-form-item>
      </el-form>
      <el-table
        border
        @select-all="handleAudienceSelectAll"
        @selection-change="handleAudienceSelectChange"
        :data="inviteAudienceDatas">
        <el-table-column
          type="selection"
          width="50">
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
          prop="isImportant"
          label="重要客户"
          width="150"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.isImportant ? "是": "否" }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-form  :inline="true" :model="inviteEmailTemplateForm" style="margin-top: 5px">
        <el-form-item label="邀请邮件模板:" size="mini">
          <el-select v-model="inviteEmailTemplateForm.templateId" placeholder="请选择" style="width:150px">
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="0"></el-option>
          </el-select>
          <span>预览</span>
        </el-form-item>
      </el-form>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleAudienceListSizeChange"
        @current-change="handleAudienceListCurrentChange"
        :current-page.sync="inviteAudienceForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="inviteAudienceForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="inviteAudienceTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button type="primary" :disabled="sendInviteBtn" @click="confirmSendInvite()">发送邀请</el-button>
        <el-button @click="inviteAudienceDialog = false">取　　消</el-button>
      </div>
    </el-dialog>

    <!--查看嘉宾名单弹框-->
    <el-dialog title="查看嘉宾名单"  width="700px" :visible.sync="viewListDialog" :close-on-click-modal="false">
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
          width="140"
          fixed="right"
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
        <el-button @click="viewListDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!--添加听众弹框-->
    <el-dialog title="添加听众" :visible.sync="addAudienceDialog"  width="450px" :close-on-click-modal="false">
      <el-form :model="addAudienceForm" label-position="right" ref="addAudienceForm" :rules="rules" label-width="90px" style="margin: 0 20px">
        <el-form-item label="姓名:" size="mini" prop="audienceName">
          <el-input v-model.trim="addAudienceForm.audienceName" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:"  size="mini" prop="companyName">
          <el-input v-model.trim="addAudienceForm.companyName" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="职衔:"  size="mini" prop="audiencePosition">
          <el-input v-model.trim="addAudienceForm.audiencePosition" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="手机:"  size="mini" prop="audienceMobile">
          <el-input v-model.trim="addAudienceForm.audienceMobile" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:"  size="mini" prop="audienceEmail">
          <el-input v-model.trim="addAudienceForm.audienceEmail" placeholder="请输入内容" class="dialog_item"></el-input>
        </el-form-item>
        <el-form-item label="行业:"  size="mini" prop="industryId">
          <el-select v-model="addAudienceForm.industryId" placeholder="请选择" class="dialog_item" @change="industryChange">
            <el-option v-for="(profession,index) in industrys" :key="index" :label="profession.industryName"
                       :value="profession.industryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区:"  size="mini" prop="exhibitionId">
          <el-select v-model="addAudienceForm.exhibitionId" placeholder="请选择" class="dialog_item">
            <el-option v-for="(exhibition,index) in exhibitions" :key="index" :label="exhibition.exhibitionName"
                       :value="exhibition.exhibitionId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要客户:"  size="mini" prop="isImportant">
          <el-select v-model="addAudienceForm.isImportant" placeholder="请选择" class="dialog_item">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="addAudienceInfo()">确 认</el-button>
        <el-button @click="addAudienceDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--开放设置-->
    <el-dialog title="开放设置" :visible.sync="openSettingDialog"  width="400px" :close-on-click-modal="false">
      <el-form  label-position="right" style="text-align: center">
        <el-radio v-model="openSetting" :label="'1'" >开放</el-radio>
        <el-radio v-model="openSetting" :label="'0'" >不开放</el-radio>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="sendOpenSetting()">确 认</el-button>
        <el-button @click="openSettingDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 导入模板及模板下载 -->
    <el-dialog title="导入" :visible.sync="importDialog" :close-on-click-modal="false"  width="400px">
      <el-form  label-position="right" :inline="true"  label-width="110px">
        <el-form-item label="附件:">
          <!--:show-file-list="false"-->
          <el-upload
            class="upload-demo"
            :headers="header"
            :action="uploadApi"
            :on-exceed="templateExceed"
            :before-upload="templateBeforeUpload"
            :on-remove="templateRemove"
            :on-success="templateUploadSuccess"
            :on-error="templateUploadError"
            :file-list="files"
            ref="fujianupload">
            <el-button  slot="trigger" size="small" type="primary" style="padding: 0 30px;height: 30px">导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <a :href="require('@/theme/framework/file/会议论坛听众导入模板.xlsx')" style="margin-left: 20px">模板下载</a>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="importDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!--查看重复数据列表-->
    <el-dialog title="重复信息提示"  width="700px" :visible.sync="repeatListDialog" :close-on-click-modal="false">
      <el-table
        :data="repeatList"
        border
        @select-all="handleRepeatSelectAll"
        @selection-change="handleRepeatSelectionChange"
      >
        <el-table-column
          type="selection"
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
          width="210"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="80">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewAudience(scope.row, scope.$index)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        class="pagination"
        @size-change="handleRepeatListSizeChange"
        @current-change="handleRepeatListCurrentChange"
        :current-page.sync="repeatForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="repeatForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="repeatTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button type="warning" :disabled="replaceBtn" @click="openReplace()">替换原数据</el-button>
        <el-button type="primary" :disabled="replaceBtn" @click="openKeep()">保留原数据</el-button>
      </div>
    </el-dialog>

    <!--信息对比-->
    <el-dialog title="重复信息对比"  width="600px" :visible.sync="repeatDetailDialog" :close-on-click-modal="false">
      <div class="line">
        <div class="one"></div>
        <div class="two" style="color: blue;">原数据</div>
        <div class="two" style="color: red">新数据</div>
      </div>
      <div class="line">
        <div class="one">姓名</div>
        <div class="two">{{oldAudienceDetail.audienceName}}</div>
        <div class="two">{{newAudienceDetail.audienceName}}</div>
      </div>
      <div class="line">
        <div class="one">公司名称</div>
        <div class="two">{{oldAudienceDetail.companyName}}</div>
        <div class="two">{{newAudienceDetail.companyName}}</div>
      </div>
      <div class="line">
        <div class="one">职位</div>
        <div class="two">{{oldAudienceDetail.audiencePosition}}</div>
        <div class="two">{{newAudienceDetail.audiencePosition}}</div>
      </div>
      <div class="line">
        <div class="one">手机</div>
        <div class="two">{{oldAudienceDetail.audienceMobile}}</div>
        <div class="two">{{newAudienceDetail.audienceMobile}}</div>
      </div>
      <div class="line">
        <div class="one">邮箱</div>
        <div class="two">{{oldAudienceDetail.audienceEmail}}</div>
        <div class="two">{{newAudienceDetail.audienceEmail}}</div>
      </div>
      <div class="line">
        <div class="one">重要客户</div>
        <div class="two">{{oldAudienceDetail.isImportant === 1 ? "是" : "否"}}</div>
        <div class="two">{{newAudienceDetail.isImportant === 1 ? "是" : "否"}}</div>
      </div>
      <div class="line">
        <div class="one">行业</div>
        <div class="two">{{oldAudienceDetail.industryName}}</div>
        <div class="two">{{newAudienceDetail.industryName}}</div>
      </div>
      <div class="line" style="border-bottom: 1px solid #d6d6d6;">
        <div class="one">展区</div>
        <div class="two">{{oldAudienceDetail.exhibitionName}}</div>
        <div class="two">{{newAudienceDetail.exhibitionName}}</div>
      </div>
      <div class="dialog-footer">
        <el-button type="warning" @click="openReplace('id')">替换原数据</el-button>
        <el-button type="primary" @click="openKeep('id')">保留原数据</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import dialogMixin from '@/components/project/mixins/mettingForumDialogMixin';
  export default {
    name: "mettingForumList",
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
      return {
        source: {
          language: []
        },
        listDatas: [],
        inviteAudienceDatas: [],
        viewListDatas: [],
        industrys: [],
        exhibitions: [],

        listTotal: 0,
        viewListTotal: 0,
        inviteAudienceTotal: 0,
        header: {
          Token: this.$store.state.token
        },

        inviteAudienceDialog: false,
        addAudienceDialog: false,
        viewListDialog: false,
        openSettingDialog: false,
        importDialog: false,
        repeatListDialog: false,
        repeatDetailDialog: false,
        replaceBtn: true,

        publishBtn: true,
        cancelPublishBtn: true,
        deleteBtn: true,
        sendInviteBtn: true,

        openSetting: '',
        openSettingId: '',
        forumIds: [],
        audienceIds: [],
        publishIds: [],
        noPublishIds: [],
        files: [],
        audiences: [],

        repeatList: [],
        repeatTotal: 0,
        repeatForm: {
          current: 1,
          size: 10
        },

        oldAudienceDetail: {},
        newAudienceDetail: {},
        audienceTempIds: [],
        audienceTempId: '',

        downUrl: '',
        inviteEmailTemplateForm: {
          templateId: ''
        },
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
        inviteAudienceForm: {
          audienceName: '',
          industryId: '',
          isImportant: '',
          current: 1,
          size: 10
        },
        viewListForm: {
          forumId: '',
          guestName: '',
          orgName: '',
          current: 1,
          size: 10
        },
        addAudienceForm: {
          audienceId: '',
          audienceName: '',
          audienceMobile: '',
          audienceEmail: '',
          companyName: '',
          audiencePosition: '',
          isImportant: '',
          exhibitionId: '',
          industryId: ''
        },
        rules: {
          audienceName: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
          ]
        },
        uploadApi: '',
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.uploadApi = this.baseApi + "/api/customservice/forum/importAudience";
      this.downUrl = this.baseApi + "/api/customservice/forum/downloadAudienceTemplate";
      this.searchForumList();
      this.getIndustryList();
    },
    methods: {
      /*
        搜索及条件重置
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
      },
      // 获取行业列表
      getIndustryList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listIndustrySet').then(res => {
          this.industrys = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      industryChange(val) {
        this.exhibitions = [];
        this.getExhibitionList(val);
      },
      // 获取展区列表
      getExhibitionList(industryId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/listExhibitionSetAll', { industryId: industryId }).then(res => {
          this.exhibitions = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取听众列表
      getAudienceList(flag) {
        if (flag === '1') {
          this.inviteAudienceForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listAudience', this.inviteAudienceForm).then(res => {
          this.inviteAudienceDatas = res.records;
          this.inviteAudienceTotal = res.total;
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
        this.ruleForm.isOpen = '';
        this.ruleForm.status = '';
        this.ruleForm.current = 1;
      },
      // 重置听众搜索表单
      resetAudienceSearchForm() {
        this.inviteAudienceForm.audienceName = '';
        this.inviteAudienceForm.industryId = '';
        this.inviteAudienceForm.isImportant = '';
        this.inviteAudienceForm.exhibitionId = '';
        this.inviteAudienceForm.audienceEmail = '';
        this.inviteAudienceForm.current = 1;
      },
      resetViewListForm() {
        this.viewListForm.guestName = '';
        this.viewListForm.orgName = '';
        this.viewListForm.current = 1;
      },
      openAddAudienceDialog() {
        if (this.$refs.addAudienceForm !== undefined) {
          this.$refs.addAudienceForm.resetFields();
        }
        this.addAudienceDialog = true;
        this.resetAddAudienceForm();
      },
      // 重置新增的表单
      resetAddAudienceForm() {
        this.addAudienceForm.audienceMobile = '';
        this.addAudienceForm.audienceId = '';
        this.addAudienceForm.audienceName = '';
        this.addAudienceForm.audienceEmail = '';
        this.addAudienceForm.companyName = '';
        this.addAudienceForm.audiencePosition = '';
        this.addAudienceForm.isImportant = '';
        this.addAudienceForm.exhibitionId = '';
        this.addAudienceForm.industryId = '';
      },
      /*
        操作按钮事件处理
      */
      // 创建会议论坛
      createForum() {
        this.$router.push({ path: '/addMettingForum' });
      },
      // 邀请听众
      openInviteAudienceDialog() {
        if (this.forumIds.length > 1) {
          this.$message.warning("一次只能选择一个会议论坛进行听众邀请!");
        } else {
          this.inviteAudienceDialog = true;
          this.getAudienceList();
        }
      },
      // 单个发布
      publishSingleForum(row, index) {
        this.showDialogTips("确认发布?").then(() => {
          this.$http.postJson(this.baseApi + '/api/customservice/forum/releaseForum', [row.forumId]).then(res => {
            this.$message.success("发布成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      // 批量发布
      publishMuitlForum() {
        if (this.publishIds.length > 0) {
          this.$message.warning('所选列表中包含已发布的论坛!');
        } else {
          this.showDialogTips("确认发布?").then(() => {
            this.$http.postJson(this.baseApi + '/api/customservice/forum/releaseForum', this.forumIds).then(res => {
              this.$message.success("发布成功!");
              this.searchForumList();
            }).catch(error => {
              this.$message.error(error);
            });
          }).catch(() => {});
        }
      },
      // 单个撤销发布
      cancelSinglePublishForum(row, index) {
        this.showDialogTips("确认撤销发布?").then(() => {
          this.$http.postJson(this.baseApi + '/api/customservice/forum/cancelReleaseForum', [row.forumId]).then(res => {
            this.$message.success("撤销成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      // 批量撤销发布
      cancelMuitlPublishForum() {
        if (this.noPublishIds.length > 0) {
          this.$message.warning('所选列表中包含未发布的论坛!');
        } else {
          this.showDialogTips("确认撤销发布?").then(() => {
            this.$http.postJson(this.baseApi + '/api/customservice/forum/cancelReleaseForum', this.forumIds).then(res => {
              this.$message.success("撤销成功!");
              this.searchForumList();
            }).catch(error => {
              this.$message.error(error);
            });
          }).catch(() => {});
        }
      },
      // 单个删除
      deleteSingleForum(row, index) {
        this.showDialogTips("确认删除该数据?").then(() => {
          this.$http.postJson(this.baseApi + '/api/customservice/forum/deleteForum', [row.forumId]).then(res => {
            this.$message.success("删除成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      // 批量删除
      deleteMuitlForum() {
        this.showDialogTips("确认删除所选数据?").then(() => {
          this.$http.postJson(this.baseApi + '/api/customservice/forum/deleteForum', this.forumIds).then(res => {
            this.$message.success("删除成功!");
            this.searchForumList();
          }).catch(error => {
            this.$message.error(error);
          });
        }).catch(() => {});
      },
      // 设置可赞助
      settingCanSponsor() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/forumSupport', this.forumIds).then(res => {
          this.$message.success("设置成功!");
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 设置是否开放
      settingOpen(row, index) {
        this.openSettingDialog = true;
        this.openSetting = row.isOpen ? "1" : "0";
        this.openSettingId = row.forumId;
      },
      // 发送开放/未开放请求
      sendOpenSetting() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/openForum?isOpen=' + this.openSetting, [this.openSettingId]).then(res => {
          this.$message.success("设置成功!");
          this.openSettingDialog = false;
          this.searchForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 修改会议论坛信息
      updateForum(row, index) {
        this.$router.push({ path: '/addMettingForum', query: { forumId: row.forumId }});
      },
      // 导入听众
      importForumAudience() {
        this.importDialog = true;
      },
      // 增加听众
      addAudienceInfo() {
        this.$refs["addAudienceForm"].validate((valid) => {
          if (valid) {
            this.$http.postJson(this.baseApi + '/api/customservice/forum/saveAudience', this.addAudienceForm).then(res => {
              this.$message.success("增加成功");
              this.addAudienceDialog = false;
              this.getAudienceList();
            }).catch(error => {
              this.$message.error(error);
            });
          } else {
            return false;
          }
        });
      },
      // 查看嘉宾名单
      viewGuestList(row, index) {
        this.viewListDialog = true;
        this.viewListForm.forumId = row.forumId;
        this.getGuestList();
      },
      // 确认发送邀请
      confirmSendInvite() {
        this.$http.postJson(this.baseApi + '/api/customservice/forum/inviteForumAudience?forumId=' + this.forumIds[0], this.audienceIds).then(res => {
          this.$message.success("邀请发送成功!");
          this.inviteAudienceDialog = false;
        }).catch(error => {
          this.$message.error(error);
        });
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
        this.publishIds = [];
        this.noPublishIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.forumIds.push(val[i].forumId);
          if (val[i].status === '0') {
            this.noPublishIds.push(val[i].forumId);
          } else {
            this.publishIds.push(val[i].forumId);
          }
        }
        if (this.noPublishIds.length > 0) {
          this.publishBtn = false;
        } else {
          this.publishBtn = true;
        }

        if (this.publishIds.length > 0) {
          this.cancelPublishBtn = false;
        } else {
          this.cancelPublishBtn = true;
        }

        if (this.forumIds.length > 0) {
          this.deleteBtn = false;
        } else {
          this.deleteBtn = true;
        }
      },
      handleAudienceSelectAll(val) {
        this.pushAudienceSelectIds(val);
      },
      handleAudienceSelectChange(val) {
        this.pushAudienceSelectIds(val);
      },
      pushAudienceSelectIds(val) {
        this.audienceIds = [];
        this.audiences = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.audienceIds.push(val[i].audienceId);
          delete val[i].audienceId;
          if (val[i].isImportant) {
            val[i].isImportant = '1';
          } else {
            val[i].isImportant = '0';
          }
          this.audiences.push(val[i]);
        }
        if (this.audienceIds.length > 0) {
          this.sendInviteBtn = false;
        } else {
          this.sendInviteBtn = true;
        }
      },
      // 论坛列表分页
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
        this.searchForumList();
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
        this.searchForumList();
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
      // 听众分页
      handleAudienceListSizeChange(pageSize) {
        this.inviteAudienceForm.size = pageSize;
        this.getAudienceList();
      },
      handleAudienceListCurrentChange(currentPage) {
        this.inviteAudienceForm.current = currentPage;
        this.getAudienceList();
      },
      // 文件上传
      templateExceed() {
        this.$message.error("只能上传一个文件");
      },
      templateBeforeUpload(file) {
        // 格式及大小判断
        if (this.uploadFileTypeJuge(file)) {
          return true;
        } else {
          return false;
        }
      },
      templateRemove(file, fileList) {

      },
      templateUploadSuccess(res, file) {
        if (res.flag === "0") {
          this.$message.error(res.message);
          this.$refs.fujianupload.clearFiles();
        } else {
          this.$message.success("数据导入成功");
          this.$refs.fujianupload.clearFiles();
          this.getRepeatList();
          this.getAudienceList();
        }
      },
      templateUploadError() {
        this.$message.error("数据导入错误");
      },
      uploadFileTypeJuge(file) {
        // 进行pdf格式及大小验证 application/vnd.ms-excel
        let testXlsx = file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        let testXls = file.type === "application/vnd.ms-excel";
        if (!testXlsx && !testXls) {
          this.$message.warning("文件格式上传错误!");
          return false;
        }
        const isLt1M = file.size / 1024 / 1024 < 0.2;
        if (!isLt1M) {
          this.$message.warning("上传文件不能超过1000行数据!");
          return false;
        }
        return true;
      },
      // 获取重复列表
      getRepeatList(flag) {
        if (flag === '1') {
          this.repeatForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listRepeatAudience', this.repeatForm).then(res => {
          this.repeatList = res.records;
          this.repeatTotal = res.total;
          if (this.repeatList.length > 0) {
            this.repeatListDialog = true;
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取原始数据
      getOldAudienceDetail(audienceTempId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getAudienceByTempId', {
          audienceTempId: audienceTempId
        }).then(res => {
          this.oldAudienceDetail = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 查看重复信息
      viewAudience(row, index) {
        this.repeatDetailDialog = true;
        this.newAudienceDetail = row;
        this.audienceTempId = row.audienceTempId;
        this.getOldAudienceDetail(row.audienceTempId);
      },
      handleRepeatListSizeChange(pageSize) {
        this.repeatForm.size = pageSize;
        this.getRepeatList();
      },
      handleRepeatListCurrentChange(currentPage) {
        this.repeatForm.current = currentPage;
        this.getRepeatList();
      },
      handleRepeatSelectAll(val) {
        this.pushRepeatSelectIds(val);
      },
      handleRepeatSelectionChange(val) {
        this.pushRepeatSelectIds(val);
      },
      pushRepeatSelectIds(val) {
        this.audienceTempIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.audienceTempIds.push(val[i].audienceTempId);
        }
        if (this.audienceTempIds.length <= 0) {
          this.replaceBtn = true;
        } else {
          this.replaceBtn = false;
        }
      },
      openReplace(model) {
        if (model === 'id') {
          this.replaceOldData(this.audienceTempId);
        } else {
          this.replaceOldData(this.audienceTempIds.join());
        }
      },
      openKeep(model) {
        if (model === 'id') {
          this.keepOldData(this.audienceTempId);
        } else {
          this.keepOldData(this.audienceTempIds.join());
        }
      },
      // 替换数据
      replaceOldData(audienceTempIds) {
        this.$http.post(this.baseApi + '/api/customservice/forum/replaceAudience', {
          audienceTempIds: audienceTempIds
        }).then(res => {
          this.$message.success("替换成功");
          this.repeatDetailDialog = false;
          this.getRepeatList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 保留原来数据
      keepOldData(audienceTempIds) {
        this.$http.post(this.baseApi + '/api/customservice/forum/reservedAudience', {
          audienceTempIds: audienceTempIds
        }).then(res => {
          this.$message.success("保留成功");
          this.repeatDetailDialog = false;
          this.getRepeatList();
        }).catch(error => {
          this.$message.error(error);
        });
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

  .btn-row {
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .table {
    margin-left: 20px;
  }

  .line{
    display: flex;
    width: 580px;
    height: 35px;
    margin: 0 10px;
    align-items: center;
    border-top: 1px solid #d6d6d6;
  }
  .line .one{
    height: 35px;
    line-height: 35px;
    text-align: right;
    width: 30%;
    font-weight: bold;
    padding-right: 5px;
    border-right: 1px solid #d6d6d6;
    border-left: 1px solid #d6d6d6;
  }
  .line .two{
    height: 35px;
    line-height: 35px;
    text-align: center;
    width: 35%;
    border-right: 1px solid #d6d6d6;
  }

  .demo-ruleForm{
    margin-left: 20px;
  }

  .dialog-footer {
    text-align: center;
    margin: 20px 0 0 0;
  }
  .select{
    width: 150px;
  }

  .pagination {
    text-align: right;
    margin: 10px;
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
