<template>
  <el-page ref="enterpriseRelationmgr">
    <template slot="header">
      <kindo-box :title="source.language.enterpriseOwnershipManagement" icon="fa-search">
        <el-form :model="forms" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery" :rules="formsRules" v-if="isShowSerachBox">
          <el-form-item :label="source.language.name" label-width="70px" prop="name">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.name" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.identityNumber" label-width="80px" prop="idCardNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.idCardNo" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.mailbox" label-width="70px" prop="mail">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.mail" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.cellphoneNumber" label-width="80px" prop="phonenumber">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.phonenumber" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body" slot-scope="">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.sendRequestToPersonalUser" name="sendReqToPersonal">
            <!--对个人用户发出请求 -->
            <kindo-table ref="sendReqToPersonalTable" :url="api.getPersonUser" :queryParam="form">
              <el-table-column prop="name" :label="source.language.name" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="idCardNo" :label="source.language.identityNumber" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="mail" :label="source.language.mailbox" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="phonenumber" :label="source.language.cellphoneNumber" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right" align="center" min-width="150">
                <template slot-scope="scope">
                  <el-button type="text" @click="sendInvitation(scope.row, scope.$index)" v-if="right('sendInvitation') && scope.row.operatText !== source.language.hasBeenSent">{{source.language.sendInvitation}}</el-button>
                  <span v-else>{{source.language.hasBeenSent}}</span>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.subPersonalManagement" name="subPersonmgr">
            <!--下属个人管理 -->
            <kindo-table ref="subPersonmgrTable" :url="api.getPersonManagement" :queryParam="subForm">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" :label="source.language.name" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="phonenumber" :label="source.language.contactNumber" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="idCardNo" :label="source.language.identityNumber" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="mail" :label="source.language.mailbox" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="ascriptionDate" :label="source.language.ownershipTime" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right" align="center" min-width="150">
                <template slot-scope="scope">
                  <el-button type="text" v-if="right('delete')" @click="onDel(scope.row)">{{source.language.delete}}</el-button>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.reviewIndividualUserApplication" name="auditPersonalApply">
            <!--审核个人用户的申请 -->
            <kindo-table ref="auditPersonalApplyTable" :url="api.getPersonApply" :queryParam="auditForm">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" :label="source.language.applicant" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="createDate" :label="source.language.applicationTime" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right" align="center" min-width="150">
                <template slot-scope="scope">
                  <el-button type="text" @click="accept(scope.row, scope.$index)" v-if="right('accept')&&(scope.row.operatStatus !== source.language.passed && scope.row.operatStatus !== source.language.rejected)">{{source.language.pass}}</el-button>
                  <el-button type="text" @click="reject(scope.row, scope.$index)" v-if="right('reject')&&(scope.row.operatStatus!== source.language.passed && scope.row.operatStatus !== source.language.rejected)">{{source.language.notPassing}}</el-button>
                  <span v-if="scope.row.operatStatus === source.language.rejected">{{source.language.rejected}}</span>
                  <span v-if="scope.row.operatStatus === source.language.passed">{{source.language.passed}}</span>
                </template>
              </el-table-column>
            </kindo-table>
            <el-button type="primary" v-if="right('accept')" @click="accept">{{source.language.examinationPassed}}</el-button>
          </el-tab-pane>
          <el-tab-pane :label="source.language.personalReviewResultsFeedback" name="auditPersonalResult">
            <!--个人审核结果反馈 -->
            <kindo-table ref="auditPersonalResultTable" :url="api.getApplyResult" :queryParam="resultForm">
              <el-table-column prop="handlingDate" :label="source.language.reviewTime" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="name" :label="source.language.reviewerPersonalUserName" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="ascriptionApplyStatus" :label="source.language.auditStatus" show-overflow-tooltip min-width="120" :formatter="verifyStatus"></el-table-column>
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
  name: 'enterpriseRelationmgr',
  mixins: [listPageBase],
  data() {
    return {
      pageId: "enterpriseRelationmgr",
      api: {
        getPersonUser: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/findPersonUser",
        getPersonManagement: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/findPersonManagement",
        getPersonApply: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/findReceiveRequest",
        getApplyResult: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/findAuditResultFeedbackByEnterprises",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        postSendInvit: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/addEnterprisesInvitePerson",
        postAccept: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/acceptEnterpriseOwnershipRequset",
        postReject: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/acceptPersonOwnershipRequset",
        delete: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/relieveIndenterOwnership",
        updateBatch: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/updateBatch"
      },
      //对个人用户发出请求表，下属个人管理表，共用查询参数
      forms: {
        name: "",
        idCardNo: "",
        mail: "",
        phonenumber: ""
      },
      source: {
        language: {}
      },
      auditForms: {}, //审核个人用户的申请表
      resultForms: {}, //个人结果反馈表
      activeName: "sendReqToPersonal",
      acceptSelection: [],
      searchFlag: "sendReqToPersonal",
      formsRules: {},
      isShowSerachBox: true,
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
    subForm: function () {
      return {
        queryParams: this.forms
      };
    },
    auditForm: function () {
      return {
        queryParams: this.auditForms
      };
    },
    resultForm: function () {
      return {
        queryParams: this.resultForms
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
    var validateInterger = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateInterger));
      }
    };
    this._forms = Object.assign({}, this.forms);
    this._subForms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('ownershipManagementLang');

    this.formsRules = {
      name: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      idCardNo: [
        { max: 18, message: this.source.language.unifiedSocialCreditCodeRules, trigger: "blur" },
        { validator: validateInterger, trigger: 'blur' }
      ],
      mail: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" }
      ],
      phonenumber: [
        { max: 11, message: this.source.language.phoneNumberRules, trigger: "blur" },
        { validator: validateInterger, trigger: 'blur' }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onSendReqQuery();
      //获取当前登录用户信息
      this.getCurrentUserInfo();
    });
  },
  methods: {
    handleClick(tab) {
      this.isShowSerachBox = tab.name === "sendReqToPersonal" || tab.name === "subPersonmgr";
      switch (tab.name) {
        case "sendReqToPersonal":
          this.searchFlag = tab.name;
          this.onSendReqQuery();
          break;
        case "subPersonmgr":
          this.searchFlag = tab.name;
          this.onSubQuery();
          break;
        case "auditPersonalApply":
          this.onPersonalApplyQuery();
          break;
        case "auditPersonalResult":
          this.onApplyResultQuery();
          break;
        default:
      }
    },
    verifyStatus(row, column, cellValue, index) {
      if (row.ascriptionApplyStatus === 1) {
        return this.source.language.pass;
      } else if (row.ascriptionApplyStatus === 2) {
        return this.source.language.notPassing;
      } else {
        return this.source.language.underReview;
      }
    },
    //对个人用户发出请求表和下属个人管理表，共用一个查询
    onQuery() {
      if (this.searchFlag === "sendReqToPersonal") {
        this.onSendReqQuery();
      } else {
        this.onSubQuery();
      }
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        if (this.searchFlag === "sendReqToPersonal") {
          this.$refs.sendReqToPersonalTable.reloadData();
        } else {
          this.$refs.subPersonmgrTable.reloadData();
        }
      });
    },
    acceptSelectionChange(val) {
      this.acceptSelection = val;
    },
    //获取当前用户信息
    getCurrentUserInfo() {
      let params = {
        json: {
          customQueryParams: {
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getUserInfo, params).then(res => {
        this.currentUserInfo = res;
      });
    },
    //发送邀请
    sendInvitation(row, index) {
      let entityList = [{
        enterpriseId: this.currentUserInfo.enterpriseId,
        personId: row.userId,
        name: row.name,
        idCardNo: row.idCardNo,
        mail: row.mail,
        phonenumber: row.phonenumber
      }];
      this.$http.postJson(this.api.postSendInvit, entityList).then(res => {
        row.operatText = this.source.language.hasBeenSent; //已发送
        this.$refs.sendReqToPersonalTable.internalData.splice(index, 1, row);
      });
    },
    //对个人用户发出请求表
    onSendReqQuery() {
      this.$refs.sendReqToPersonalTable.loadData();
    },
    //下属个人管理表
    onSubQuery() {
      this.$refs.subPersonmgrTable.loadData();
    },
    //审核个人用户的申请表
    onPersonalApplyQuery() {
      this.$refs.auditPersonalApplyTable.loadData();
    },
    //申请结果反馈表
    onApplyResultQuery() {
      this.$refs.auditPersonalResultTable.loadData();
    },
    //通过
    accept(row, index) {
      var _this = this;
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
            ascriptionApplyStatus: 1
          });
        }
      } else {
        entityList = [{
          id: row.id,
          ascriptionApplyStatus: 1
        }];
      }
      let uri = this.api.updateBatch + "?operationState=BatchThrough";
      this.$http.postJson(uri, entityList).then(res => {
        //批量接受邀请，操作列状态也需要批量更新
        for (let i = 0; i < this.$refs.auditPersonalApplyTable.internalData.length; i++) {
          for (let j = 0; j < entityList.length; j++) {
            if (entityList[j].id === _this.auditPersonalApplyTable[i].id) {
              this.$refs.auditPersonalApplyTable.internalData.operatStatus = this.source.language.passed; // 已通过
              this.$refs.auditPersonalApplyTable.internalData.splice(i, 1, this.$refs.auditPersonalApplyTable.internalData[i]);
              break;
            }
          }
        }
      });
    },
    //不通过
    reject(row, index) {
      let params = {
        id: row.id,
        ascriptionApplyStatus: 2
      };
      this.$http.post(this.api.postReject, params).then(function (result) {
        row.operatStatus = this.source.language.rejected; //已拒绝
        this.$refs.auditPersonalApplyTable.internalData.splice(i, 1, row);
      });
    },
    onDel(row) {
      let params = {
        id: row.id,
        ascriptionApplyStatus: 3
      };
      this.$confirm(this.source.language.deleteTips, this.source.language.prompt, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.post(this.api.delete, params).then(res => {
          this.onSubQuery();
          this.$message({
            type: "success",
            message: this.source.language.deleteSuccess
          });
        });
      });
    }
  }
};
</script>

<style>
</style>
