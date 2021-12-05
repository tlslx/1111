<template>
  <el-page ref="personalRelationmgr">
    <template slot="header">
      <kindo-box :title="source.language.personalOwnershipMgt" icon="fa-search">
        <el-form :model="forms" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery" :rules="formsRules" v-if="isShowSerachBox">
          <el-form-item :label="source.language.enterpriseName" label-width="100px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.unifiedSocialCreditCode" label-width="140px" prop="unifiedSocialCreditCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.unifiedSocialCreditCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-row class="menubutton">
          <el-col>
            <el-button v-if="right('add')" type="primary" @click="onCreateEnt">{{source.language.createEnterpriseUser}}</el-button>
          </el-col>
        </el-row>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.applyJoinEnterprise" name="applyJoinEnt">
            <!--申请加入企业 -->
            <kindo-table ref="applyJoinEntTable" :url="getApi" :queryParam="form">
              <el-table-column prop="enterpriseName" :label="source.language.enterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="unifiedSocialCreditCode" :label="source.language.unifiedSocialCreditCode" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="address" :label="source.language.location" :formatter="addressFormat" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column :label="source.language.ownershipEstablishment" show-overflow-tooltip min-width="150" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="release(scope.row, scope.$index)" v-if="right('release') && scope.row.ascriptionApplyStatus === 1">{{source.language.release}}</el-button>
                  <span v-if="scope.row.ascriptionApplyStatus=== 0">{{source.language.alreadyApplied}}</span>
                  <el-button type="text" @click="sendRequest(scope.row, scope.$index)" v-if="right('sendRequest') && scope.row.ascriptionApplyStatus!== 0 && scope.row.ascriptionApplyStatus!==1">{{source.language.sendQuery}}</el-button>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.reviewEnterpriseRequest" name="auditEntReq">
            <!--审核企业的请求 -->
            <el-row>
              <el-col :span="6">
                <div class="table-tips">{{source.language.reviewEnterpriseRequestTableTips}}</div>
              </el-col>
            </el-row>
            <kindo-table ref="auditEntReqTable" :url="api.getAcceptQuestList" :queryParam="acceptForm">
              <el-table-column prop="enterpriseName" :label="source.language.enterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="address" :label="source.language.location" :formatter="addressFormat" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column :label="source.language.review" min-width="150" fixed="right" align="center">
                <template slot-scope="scope">
                  <el-button v-if="right('accept')" type="text" @click="accept(scope.row, scope.$index)">{{source.language.agree}}</el-button>
                  <el-button v-if="right('reject')" type="text" @click="reject(scope.row, scope.$index)">{{source.language.reject}}</el-button>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.reviewResultsFeedback" name="auditResult">
            <!--审核结果反馈 -->
            <kindo-table ref="auditResultTable" :url="api.getFeedbackRecordList" :queryParam="resultForm">
              <el-table-column prop="handlingDate" :label="source.language.reviewTime" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.reviewerEnterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
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
  name: "personalRelationmgr",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "personalRelationmgr",
      api: {
        //查询
        get: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/findEnterUser",
        //获取企业邀请数据列表
        getEntRequestList: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/getListPage",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser",
        //个人向企业发送请求
        sendRuquestToEnt: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/addIndenterOwnership",
        //接受or 不接受 or 再次申请
        acceptOrNot: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/acceptEnterpriseOwnershipRequset",
        //解除个人与企业归属关系
        relieveEnt: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/relieveIndenterOwnership",
        //获取企业列表
        getEntList: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseUser/getListPage",
        //获取审核结果反馈
        getFeedbackRecordList: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/getFeedbackRecordList",
        //获取接收请求列表数据
        getAcceptQuestList: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/getAcceptQuestList",
        verifyRelevance: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/verifyRelevance",
        verifyRelevanceAgain: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/verifyRelevanceAgain"
      },
      activeName: "applyJoinEnt",
      forms: {
        enterpriseName: "",
        unifiedSocialCreditCode: ""
      },
      isSearchNow: false,
      formsRules: {},
      isShowSerachBox: true,
      //审核企业请求form
      acceptForms: {},
      //结果反馈form
      resultForms: {},
      //申请加入企业 当前查询接口
      currentApi: "",
      //当前登录的用户信息
      currentUserInfo: {},
      source: {
        language: {},
        addressOptions: []
      }
    };
  },
  computed: {
    getApi: function () {
      return this.currentApi;
    },
    form: function () {
      return {
        queryParams: this.forms
      };
    },
    acceptForm: function () {
      return {
        queryParams: this.acceptForms
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
    var validateCreditCode = (rule, value, callback) => {
      if (kindo.validate.unifiedSocialCreditCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateCreditCode));
      }
    };
    this._forms = Object.assign({}, this.forms);
    this.currentApi = this.api.getEntRequestList;
    // 读取国际化
    this.source.language = kindo.util.getLanguage('ownershipManagementLang');
    //读取所在地字典数据
    this.source.addressOptions = await kindo.dictionary.get('addressProvince');
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
      this.onApplyJoinEntQuery();
      //获取当前登录用户信息
      this.getCurrentUserInfo();
    });
  },
  methods: {
    handleClick(tab) {
      this.isShowSerachBox = tab.name === "applyJoinEnt";
      switch (tab.name) {
        case "applyJoinEnt":
          this.onApplyJoinEntQuery();
          break;
        case "auditEntReq":
          this.onAuditEntReqQuery();
          break;
        case "auditResult":
          this.onAuditResultQuery();
          break;
        default:
      }
    },
    //所在地过滤显示
    addressFormat(row) {

    },
    //申请加入企业表
    onApplyJoinEntQuery(page) {
      this.currentApi = this.api.getEntRequestList;
      this.$nextTick(function () {
        this.$refs.applyJoinEntTable.loadData();
      });
    },
    //申请加入企业表查询按钮
    onQuery() {
      this.currentApi = this.api.get;
      this.$nextTick(function () {
        this.$refs.applyJoinEntTable.loadData();
      });
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.currentApi = this.api.get;
        this.$refs.applyJoinEntTable.reloadData();
      });
    },
    //审核企业请求表
    onAuditEntReqQuery() {
      this.$refs.auditEntReqTable.loadData();
    },
    //反馈结果
    onAuditResultQuery() {
      this.$refs.auditResultTable.loadData();
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
      });
    },
    //个人创建企业用户
    onCreateEnt() {
      this.$router.push({
        path: "/enterpriseRegistration",
        query: {
          ascriptionType: 2,
          personId: this.currentUserInfo.userId
        }
      });
    },
    //发送请求
    sendRequest(row, index) {
      let params = JSON.stringify({
        enterpriseId: row.enterpriseId,
        personId: this.currentUserInfo.userId,
        enterpriseName: row.enterpriseName,
        unifiedSocialCreditCode: row.unifiedSocialCreditCode
      });
      this.$http.postJson(this.api.sendRuquestToEnt, params).then(res => {
        this.onApplyJoinEntQuery();
      }, err => {
        this.$message.error(err);
      });
    },
    //解除
    release(row, index) {
      let params = {
        id: row.id,
        ascriptionApplyStatus: 3
      };
      this.$confirm(this.source.language.releaseTipsB, this.source.language.prompt, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.post(this.api.relieveEnt, params).then(res => {
          this.onApplyJoinEntQuery();
        }, err => {
          this.$message.error(err);
        });
      });
    },
    accept(row, index) {
      var _this = this;
      let params = {
        personId: this.currentUserInfo.userId
      };
      this.$confirm(this.source.language.enterpriseAcceptTips, this.source.language.prompt, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.post(this.api.verifyRelevance, params)
          .then(result => {
            if (result.length === 0) {
              _this.$http.post(_this.api.acceptOrNot, { "id": row.id, "ascriptionApplyStatus": 1 }).then(res => {
                this.$refs.auditEntReqTable.reloadData();
                _this.$message({
                  type: 'success',
                  message: this.source.language.enterpriseAcceptSuccess
                });
              });
            } else {
              _this.$message({
                showClose: true,
                message: this.source.language.acceptError,
                type: "error"
              });
            }
          });
      });
    },
    reject(row, index) {
      let params = {
        id: row.id,
        ascriptionApplyStatus: 2
      };
      this.$http.post(this.api.acceptOrNot, params).then(res => {
        this.$refs.auditEntReqTable.reloadData();
      });
    },
    verifyStatus(row) {
      if (row.ascriptionApplyStatus === 1) {
        return this.source.language.pass;
      } else if (row.ascriptionApplyStatus === 2) {
        return this.source.language.notPassing;
      } else {
        return this.source.language.underReview;
      }
    }
  }
};
</script>

<style>
.menubutton {
  margin-top: 5px;
}
.table-tips {
  color: red;
  margin-bottom: 5px;
}
</style>
