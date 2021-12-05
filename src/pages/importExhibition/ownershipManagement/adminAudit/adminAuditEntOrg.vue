<template>
  <el-page ref="adminAuditEntOrg">
    <template slot="header">
      <kindo-box :title="source.language.adminAuditEntOrg" icon="fa-search">
        <el-form :model="forms" :rules="adminAuditRules" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.sessionNumber" label-width="70px" v-if="isHistoryTab" prop="session">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.session" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.enterpriseName" label-width="80px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.unifiedSocialCreditCode" label-width="130px" v-if="!isHistoryTab" prop="unifiedSocialCreditCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.unifiedSocialCreditCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.cooperationAgency" label-width="80px" prop="cooperationAgencyName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.cooperationAgencyName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.cooperationAgencyCode" label-width="100px" v-if="!isHistoryTab" prop="cooperationAgencyCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.cooperationAgencyCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
          <el-row>
            <el-col :span="2">
              <el-button type="primary" @click="entPass" v-if="right('pass')&&isEntRequest">{{source.language.pass}}</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="cptPass" v-if="right('pass')&&isCptAgency">{{source.language.pass}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.enterpriseUserRequest" name="enterpriseRequest">
            <!--企业用户请求 -->
            <kindo-table ref="entRequestTable" :url="api.getEnt" :queryParam="entForm">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.initiatorEnterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="cooperationAgencyName" :label="source.language.processingPartyCooperationAgency" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="intentionEnterprise" :label="source.language.agencyIntentionList" show-overflow-tooltip min-width="150">
                <template slot-scope="scope">
                  <img :src="scope.row.intentionEnterprise">
                </template>
              </el-table-column>
              <el-table-column prop="applyEventType" :label="source.language.applicationType" :formatter="verifyStatus" min-width="150"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right" min-width="150">
                <template slot-scope="scope">
                  <el-button type="text" @click="entPass(scope.row)" v-if="right('pass')&&scope.row.entStatus !==source.language.passed && scope.row.entStatus !== source.language.rejected">{{source.language.pass}}</el-button>
                  <el-button type="text" @click="entReject(scope.row, scope.$index)" v-if="right('notPass') && scope.row.entStatus !== source.language.passed && scope.row.entStatus !== source.language.rejected">{{source.language.notPassing}}</el-button>
                  <span v-if="scope.row.entStatus === source.language.passed">{{source.language.passed}}</span>
                  <span v-if="scope.row.entStatus ===source.language.rejected">{{source.language.rejected}}</span>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.cooperationAgencyRequest" name="cptAgencyRequest">
            <!--合作机构请求 -->
            <kindo-table ref="cptAgencyRequestTable" :url="api.getOrg" :queryParam="orgForm">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column prop="cooperationAgencyName" :label="source.language.initiatorCooperationAgency" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.processingPartyEnterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="applyEventType" :label="source.language.applicationType" :formatter="verifyStatus" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column :label="source.language.operation" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="cptPass(scope.row)" v-if="right('pass') && scope.row.orgStatus !== source.language.passed && scope.row.orgStatus !== source.language.rejected">{{source.language.pass}}</el-button>
                  <el-button type="text" @click="cptReject(scope.row, scope.$index)" v-if="right('notPass') && scope.row.orgStatus !== source.language.passed && scope.row.orgStatus !== source.language.rejected">{{source.language.notPassing}}</el-button>
                  <span v-if="scope.row.orgStatus === source.language.passed">{{source.language.passed}}</span>
                  <span v-if="scope.row.orgStatus === source.language.rejected">{{source.language.rejected}}</span>
                </template>
              </el-table-column>
            </kindo-table>
          </el-tab-pane>
          <el-tab-pane :label="source.language.historyRecord" name="historyRecord">
            <!--历史记录 -->
            <kindo-table ref="historyTable" :url="api.getHistory" :queryParam="historyForm">
              <el-table-column prop="session" :label="source.language.sessionNumber" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="ascriptionDate" :label="source.language.associatedTime" show-overflow-tooltip min-width="120"></el-table-column>
              <el-table-column prop="enterpriseName" :label="source.language.enterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="cooperationAgencyName" :label="source.language.cooperationAgency" show-overflow-tooltip min-width="150"></el-table-column>
              <el-table-column prop="rescissionDate" :label="source.language.releaseTime" show-overflow-tooltip min-width="120"></el-table-column>
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
  name: 'adminAuditEntOrg',
  mixins: [listPageBase],
  data() {
    return {
      pageId: "adminAuditEntOrg",
      api: {
        getEnt: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findEnterpriseRequestByAdmin",
        getOrg: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/findOrgRequestByAdmin",
        getHistory: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/getPageList",
        updateAdminStatus: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/updateAdministratorAudit",
        updateBatch: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAgencyOwnership/updateBatch"
      },
      forms: {
        session: "",
        enterpriseName: "",
        unifiedSocialCreditCode: "",
        cooperationAgencyName: "",
        cooperationAgencyCode: ""
      },
      source: {
        language: {}
      },
      activeName: "enterpriseRequest",
      isEntRequest: true,
      isCptAgency: false,
      isHistoryTab: false,
      entSelectionData: [], // 企业用户请求，批量通过
      aptSelectionData: [], //合作机构用户请求，批量通过
      //查询输入校验
      adminAuditRules: {}
    };
  },
  computed: {
    entForm: function () {
      return {
        queryParams: this.forms
      };
    },
    orgForm: function () {
      return {
        queryParams: this.forms
      };
    },
    historyForm: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    var validateInterger = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateInterger));
      }
    };
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.source.language.validateSpecialChars));
      } else {
        return callback();
      }
    };
    // 统一社会信用代码校验
    var validateCreditCode = (rule, value, callback) => {
      if (kindo.validate.unifiedSocialCreditCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateCreditCode));
      }
    };
    // 机构编码校验
    var validateAgencyCode = (rule, value, callback) => {
      if (kindo.validate.agencyCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateCreditCode));
      }
    };
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('ownershipManagementLang');
    this.adminAuditRules = {
      session: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateInterger, trigger: 'blur' }
      ],
      enterpriseName: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      unifiedSocialCreditCode: [
        { max: 18, message: this.source.language.unifiedSocialCreditCodeRules, trigger: "blur" },
        { validator: validateCreditCode, trigger: 'blur' }
      ],
      cooperationAgencyName: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      cooperationAgencyCode: [
        { max: 32, message: this.source.language.cooperationAgencyCodeRules, trigger: "blur" },
        { validator: validateAgencyCode, trigger: 'blur' }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    handleClick(tab) {
      this.isHistoryTab = tab.name === "historyRecord";
      this.isEntRequest = tab.name === "enterpriseRequest";
      this.isCptAgency = tab.name === "cptAgencyRequest";
      switch (tab.name) {
        case "enterpriseRequest":
          this.entRequestQuery();
          break;
        case "cptAgencyRequest":
          this.cptAgencyRequestQuery();
          break;
        case "historyRecord":
          this.historyQuery();
          break;
        default:
      }
    },
    // 发送请求查询
    onQuery() {
      this.entRequestQuery();
      this.cptAgencyRequestQuery();
      this.historyQuery();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.onQuery();
    },
    //  企业管理查询
    entRequestQuery() {
      this.$refs.entRequestTable.loadData();
    },
    //  机构管理查询
    cptAgencyRequestQuery() {
      this.$refs.cptAgencyRequestTable.loadData();
    },
    //  历史记录查询
    historyQuery() {
      this.$refs.historyTable.loadData();
    },
    //企业请求，批量数据
    entSelectionChange(val) {
      this.entSelectionData = val;
    },
    //机构请求，批量数据
    cptSelectionChange(val) {
      this.cptSelectionData = val;
    },
    //企业通过
    entPass(row) {
      let entityList = [];
      //批量操作需先勾选表数据
      if (!row.id) {
        if (this.entSelectionData.length === 0) {
          this.$message({
            message: this.source.language.pleaseSelectData,
            type: "warning"
          });
          return;
        }
        for (let i = 0; i < this.entSelectionData.length; i++) {
          entityList.push({
            id: this.entSelectionData[i].id,
            adminAuditStatus: 1,
            applyType: this.entSelectionData[i].applyType
          });
        }
      } else {
        entityList = [{
          id: row.id,
          adminAuditStatus: 1,
          applyType: row.applyType
        }];
      }
      let uri = this.api.updateBatch + "?operationState=BatchThrough";
      this.$http.postJson(uri, entityList).then(res => {
        //批量通过，操作列状态也需要批量更改
        for (let i = 0; i < this.$refs.entRequestTable.internalData.length; i++) {
          for (let j = 0; j < entityList.length; j++) {
            if (entityList[j].id === this.$refs.entRequestTable.internalData[i].id) {
              this.$refs.entRequestTable.internalData[i].entStatus = this.source.language.passed; //已通过
              this.$refs.entRequestTable.internalData.splice(i, 1, this.$refs.entRequestTable.internalData[i]);
              break;
            }
          }
        }
      });
    },
    //企业不通过
    entReject(row, index) {
      let params = {
        id: row.id,
        adminAuditStatus: 2,
        applyType: row.applyType
      };
      this.$http.post(this.api.updateAdminStatus, params).then(res => {
        for (let i = 0; i < this.$refs.cptAgencyRequestTable.internalData.length; i++) {
          if (i === index) {
            this.$refs.cptAgencyRequestTable.internalData[i].entStatus = this.source.language.rejected; //已拒绝
            this.$refs.cptAgencyRequestTable.internalData.splice(i, 1, this.$refs.cptAgencyRequestTable.internalData[i]);
          }
        }
      });
    },
    //机构通过
    cptPass(row) {
      let entityList = [];
      //批量操作需先勾选表数据
      if (!row.id) {
        if (this.cptSelectionData.length === 0) {
          this.$message({
            message: this.source.language.pleaseSelectData,
            type: "warning"
          });
          return;
        }
        for (let i = 0; i < this.cptSelectionData.length; i++) {
          entityList.push({
            id: this.cptSelectionData[i].id,
            adminAuditStatus: 1,
            applyType: this.cptSelectionData[i].applyType
          });
        }
      } else {
        entityList = [{
          id: row.id,
          adminAuditStatus: 1,
          applyType: row.applyType
        }];
      }
      let uri = this.api.updateBatch + "?operationState=BatchThrough";
      this.$http.postJson(uri, entityList)
        .then(res => {
          //批量通过，操作列状态也需要批量更改
          for (let i = 0; i < this.$refs.cptAgencyRequestTable.internalData.length; i++) {
            for (let j = 0; j < entityList.length; j++) {
              if (entityList[j].id === this.$refs.cptAgencyRequestTable.internalData[i].id) {
                this.$refs.cptAgencyRequestTable.internalData[i].operatText = this.source.language.passed; //已通过
                this.$refs.cptAgencyRequestTable.internalData.splice(i, 1, this.$refs.cptAgencyRequestTable.internalData[i]);
                break;
              }
            }
          }
        });
    },
    //  机构不通过
    cptReject(row, index) {
      let params = {
        id: row.id,
        adminAuditStatus: 2,
        applyType: row.applyType
      };
      this.$http.post(this.api.updateAdminStatus, params)
        .then(res => {
          for (let i = 0; i < this.$refs.entRequestTable.internalData.length; i++) {
            if (i === index) {
              this.$refs.entRequestTable.internalData[i].operatInnerHTML = this.source.language.rejected; //已拒绝
              this.$refs.entRequestTable.internalData[i].class1 = false;
              this.$refs.entRequestTable.internalData.splice(i, 1, this.$refs.entRequestTable.internalData[i]);
            }
          }
        });

    },
    verifyStatus(row, column, cellValue, index) {
      if (row.applyType === 1) {
        return this.source.language.applicationStatusA;
      } else if (row.applyType === 4) {
        return this.source.language.applicationStatusB;
      } else if (row.applyType === 0) {
        return this.source.language.applicationStatusC;
      } else if (row.applyType === 2) {
        return this.source.language.applicationStatusD;
      } else if (row.applyType === 3) {
        return this.source.language.applicationStatusE;
      }
    }
  }
};
</script>

<style>
</style>
