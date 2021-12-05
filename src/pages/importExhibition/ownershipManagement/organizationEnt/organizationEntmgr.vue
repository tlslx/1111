
<template>
  <el-page ref="organizationEntmgr">
    <template slot="header">
      <kindo-box :title="source.language.agencyRelatedEnterpriseMgt" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery" v-if="isShowSerachBox">
          <el-form-item :label="source.language.enterpriseName" label-width="80px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.unifiedSocialCreditCode" label-width="130px" prop="unifiedSocialCreditCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.unifiedSocialCreditCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-row class="menubutton">
          <el-col :span="3">
            <el-button type="primary" @click="sendInvitation" v-if="right('sendInvitation')&&isShowSerachBox">{{source.language.sendInvitation}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="accept" v-if="right('accept')&&isAccept">{{source.language.accept}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="onCreateEnt" class="sys-buttons" v-if="right('add')&&isShowSerachBox">{{source.language.createEnterpriseUser}}</el-button>
          </el-col>
        </el-row>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.sendInvitation" name="sendInvitation">
            <!--发送邀请 -->
            <kindo-table ref="sendInvitationTable" :url="api.getSend" :queryParam="form">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.enterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="unifiedSocialCreditCode" :label="source.language.unifiedSocialCreditCode" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="sendInvitation(scope.row, scope.$index)" v-if="right('sendInvitation') && scope.row.status !== source.language.hasBeenSent">{{source.language.sendInvitation}}</el-button>
                  <span v-else>{{source.language.hasBeenSent}}</span>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.receiveQuery" name="receiveQuery">
            <!--接收请求 -->
            <kindo-table ref="receiveRequestTable" :url="api.getReceive" :queryParam="receiveForm">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.initiatorEnterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="createDate" :label="source.language.applicationTime" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column label="source.language.操作" fixed="right" align="center">
                <template slot-scope="scope">
                  <el-button v-right.edit type="text" @click="accept(scope.row, scope.$index)" v-if="right('accept') && (scope.row.operateStatus !== source.language.accepted && scope.row.operateStatus !== source.language.rejected)">{{source.language.accept}}</el-button>
                  <el-button v-right.edit type="text" @click="reject(scope.row, scope.$index)" v-if="right('reject') && (scope.row.operateStatus !=='已接受'&&scope.row.operateStatus !== source.language.rejected)">{{source.language.notAccepted}}</el-button>
                  <span v-if="scope.row.operateStatus === source.language.accepted">{{source.language.accepted}}</span>
                  <span v-if="scope.row.operateStatus === source.language.rejected">{{source.language.rejected}}</span>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.applicationResultFeedback" name="applyResult">
            <!--申请结果反馈 -->
            <kindo-table ref="applyResultTable" :url="api.getApply" :queryParam="applyForm">
              <el-table-column prop="auditTime" :label="source.language.reviewTime" show-overflow-tooltip min-width="120" :formatter="thinkTime"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.reviewerEnterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="auditStatus" :label="source.language.auditStatus" show-overflow-tooltip min-width="120" :formatter="verifyStatus"></el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.subEnterpriseManagement" name="subEnterpriseMgr">
            <!--下属企业管理 -->
            <kindo-table ref="subEnterpriseTable" :url="api.getSubEnt" :queryParam="subForm">
              <el-table-column prop="enterpriseName" :label="source.language.enterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="unifiedSocialCreditCode" :label="source.language.unifiedSocialCreditCode" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="adminAuditStatus" :label="source.language.auditStatus" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right" align="center">
                <template slot-scope="scope">
                  <span v-if="(scope.row.applyType === 0 || scope.row.applyType === 1) && scope.row.adminAuditStatus === 0 && (scope.row.applyStatus === 0 || scope.row.applyStatus === 1)">{{source.language.hasBeenSent}}</span>
                  <el-button v-right.edit type="text" @click="repeal(scope.row, scope.$index)" v-if="right('repeal')&&((scope.row.applyType === 0 || scope.row.applyType === 1) && scope.row.adminAuditStatus === 0 && (scope.row.applyStatus === 0 || scope.row.applyStatus === 1))">{{source.language.repeal}}</el-button>
                  <el-button v-right.delete type="text" @click="onDel(scope.row, scope.$index)" v-if="right('delete')&&((((scope.row.applyType === 1 || scope.row.applyType === 0) && scope.row.adminAuditStatus === 1) || ((scope.row.applyType === 3 || scope.row.applyType === 4) && scope.row.applyStatus === 1 && scope.row.adminAuditStatus === 0)))">{{source.language.delete}}</el-button>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "organizationEntmgr",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "organizationEntmgr",
      loading: false,
      api: {
        getSend: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findEnterpriseUser",
        getReceive: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findReceivingRequest",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        getApply: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findAuditResultFeedback",
        getSubEnt: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findEnterpriseManagement",
        updateBatch: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/updateBatch",
        acceptRejectRepeal: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/acceptAgencyOwnershipRequset",
        delete: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/relieveAgencyOwnership"
      },
      activeName: "sendInvitation",
      forms: {
        enterpriseName: "",
        unifiedSocialCreditCode: ""
      },
      receiveForms: {},
      applyForms: {},
      subForms: {},
      adminAuditStatus: [],
      isShowSerachBox: true,
      sendInvitSelection: [], //批量处理发送邀请
      acceptSelection: [],  //批量处理接受邀请
      isAccept: false,
      source: {
        language: {}
      },
      formsRules: {},
      //当前登录的用户信息
      currentUserInfo: {}
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    },
    receiveForm: function () {
      return {
        queryParams: this.receiveForms
      };
    },
    applyForm: function () {
      return {
        queryParams: this.applyForms
      };
    },
    subForm: function () {
      return {
        queryParams: this.subForms
      };
    }
  },
  async created() {
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.source.language.validateSpecialChars));
      } else {
        return callback();
      }
    };
    var validateCreditCode = (rule, value, callback) => {
      if (kindo.validate.unifiedSocialCreditCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateCreditCode));
      }
    };
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('ownershipManagementLang');
    this.formsRules = {
      enterpriseName: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      unifiedSocialCreditCode: [
        { max: 18, message: this.source.language.unifiedSocialCreditCodeRules, trigger: "blur" },
        { validator: validateCreditCode, trigger: 'blur' }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      //获取当前登录用户信息
      this.getCurrentUserInfo();
    });
  },
  methods: {
    handleClick(tab) {
      this.isShowSerachBox = tab.name === "sendInvitation";
      this.isAccept = tab.name === "receiveQuery";
      switch (tab.name) {
        case "sendInvitation":
          this.onQuery();
          break;
        case "receiveQuery":
          this.onReceiveQuery();
          break;
        case "applyResult":
          this.onApplyQuery();
          break;
        case "subEnterpriseMgr":
          this.onSubEntQuery();
          break;
        default:
      }
    },
    //获取当前用户信息
    getCurrentUserInfo() {
      let params = {
        json: {
          customQueryParams: {},
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getUserInfo, params).then(res => {
        this.currentUserInfo = res;
        this.subForms.orgId = this.currentUserInfo.orgId;
        this.applyForms.orgId = this.currentUserInfo.orgId;
        this.receiveForms.orgId = this.currentUserInfo.orgId;
        this.forms.orgId = this.currentUserInfo.orgId;
        this.onQuery();
      });
    },
    // 发送请求查询
    onQuery() {
      this.$refs.sendInvitationTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.onQuery();
    },
    onCreateEnt() {
      this.$router.push({
        path: "/enterpriseRegistration",
        query: {
          applyType: 2,
          orgId: this.currentUserInfo.orgId
        }
      });
    },
    //  接收请求 列表
    onReceiveQuery() {
      this.$refs.receiveRequestTable.loadData();
    },
    //  申请结果反馈
    onApplyQuery() {
      this.$refs.applyResultTable.loadData();
    },
    // 下属机构审核
    onSubEntQuery() {
      this.$refs.subEnterpriseTable.loadData();
    },
    sendInvitSelectionChange(val) {
      this.sendInvitSelection = val;
    },
    acceptSelectionChange(val) {
      this.acceptSelection = val;
    },
    // 发送请求
    sendInvitation(row, index) {
      let _this = this;
      let entityList = [];
      //批量操作需先勾选表数据
      if (!row.enterpriseId) {
        if (this.sendInvitSelection.length === 0) {
          this.$message({
            message: this.source.language.pleaseSelectData,
            type: "warning"
          });
          return;
        }
        for (let i = 0; i < this.sendInvitSelection.length; i++) {
          entityList.push({
            orgId: this.currentUserInfo.orgId,
            enterpriseId: this.sendInvitSelection[i].enterpriseId,
            enterpriseName: this.sendInvitSelection[i].enterpriseName,
            unifiedSocialCreditCode: this.sendInvitSelection[i].unifiedSocialCreditCode
          });
        }
      } else {
        //表操作列发送邀请
        entityList = [{
          orgId: this.currentUserInfo.orgId,
          enterpriseId: row.enterpriseId,
          enterpriseName: row.enterpriseName,
          unifiedSocialCreditCode: row.unifiedSocialCreditCode
        }];
      }
      let uri = this.api.updateBatch + "?operationState=BatchInvite";
      _this.$http.postJson(uri, entityList)
        .then(res => {
          //批量发送邀请，操作列状态也需要批量更改
          for (let i = 0; i < this.$refs.sendInvitationTable.internalData.length; i++) {
            for (let j = 0; j < entityList.length; j++) {
              if (entityList[j].enterpriseId === this.$refs.sendInvitationTable.internalData[i].enterpriseId) {
                this.$refs.sendInvitationTable.internalData[i].status = this.source.language.hasBeenSent; //已发送
                this.$refs.sendInvitationTable.internalData.splice(i, 1, this.$refs.sendInvitationTable.internalData[i]);
                break;
              }
            }
          }
          this.$message({
            message: this.source.language.sendInvitationSuccess,
            type: "success"
          });
        });
    },
    //  接受请求
    accept(row, index) {
      let entityList = [];
      //是否批量操作,批量操作需先勾选数据
      if (!row.id) {
        if (this.acceptSelection.length === 0) {
          this.$message({
            message: this.source.language.pleaseSelectData,
            type: "warning"
          });
          return;
        }
        for (let i = 0; i < this.acceptSelection.length; i++) {
          entityList.push({
            id: this.acceptSelection[i].id,
            applyStatus: 1
          });
        }
      } else {
        entityList = [{
          id: row.id,
          applyStatus: 1
        }];
      }
      let uri = this.api.updateBatch + "?operationState=BatchAccept";
      this.$http.postJson(uri, entityList)
        .then(res => {
          //批量接受邀请，操作列状态也需要批量更新
          for (let i = 0; i < this.$refs.receiveRequestTable.internalData.length; i++) {
            for (let j = 0; j < entityList.length; j++) {
              if (entityList[j].id === this.$refs.receiveRequestTable.internalData[i].id) {
                this.$refs.receiveRequestTable.internalData.operateStatus = this.source.language.accepted; //已接受
                this.$refs.receiveRequestTable.internalData.splice(i, 1, this.$refs.receiveRequestTable.internalData[i]);
                break;
              }
            }
          }
        });
    },
    //  不接受
    reject(row, index) {
      let params = {
        id: row.id,
        applyStatus: 2
      };
      this.$http.post(this.api.acceptRejectRepeal, params).then(res => {
        row.operateStatus = this.source.language.rejected; //已拒绝
        this.$refs.receiveRequestTable.internalData.splice(index, 1, row);
      });
    },
    //  撤销
    repeal(row, index) {
      let params = {
        id: row.id,
        applyStatus: 3
      };
      this.$confirm(this.source.language.repealTips, this.source.language.prompt, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.post(this.api.acceptRejectRepeal, params)
          .then(res => {
            this.onSubEntQuery();
            this.$message({
              type: 'success',
              message: this.source.language.repealSuccess
            });
          }, err => {
            this.$message.error(err);
          });
      });
    },
    //  删除关联企业
    onDel(row, index) {
      let params = {
        id: row.id,
        applyType: 3,
        enterId: row.enterpriseId
      };
      this.$confirm(this.source.language.deleteTips, this.source.language.prompt, {
        confirmButtonText: this.language.confirm,
        cancelButtonText: this.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.post(this.api.delete, params).then(res => {
          this.onSubEntQuery();
          this.$message({
            type: 'success',
            message: this.source.language.deleteSuccess
          });
        }, err => {
          this.$message.error(err);
        });
      });
    },
    //  审核时间处理
    thinkTime(row) {
      if (row.applyStatus === 2) {
        return row.dealDate;
      } else {
        return row.adminAuditDate;
      }
    },
    verifyStatus(row) {
      if (row.adminAuditStatus === 1) {
        return this.source.language.pass;
      } else if (row.applyStatus === 2 || row.adminAuditStatus === 2) {
        return this.source.language.notPassing;
      }
    }
  }
};
</script>

<style>
.menubutton {
  margin-top: 5px;
}
</style>
