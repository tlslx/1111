<template>
  <el-page ref="agencyAdminSubmitApplication">
    <template slot="header">
      <!--查看回执弹窗-->
      <receipt-dialog ref="receiptDialog" :receiptForm="viewReceiptForm" :language="source.language"></receipt-dialog>

      <kindo-box :title="source.language.agencyAdminSubmitApplication">
        <!--按钮栏-->
        <el-form inline ref="applicationForms" :rules="applicationRules" :model="applicationForms" @submit.native.prevent @keyup.enter.native="onQuery" label-position="right" v-if="isOnQuery">
          <el-form-item :label="source.language.enterpriseNameTable" label-width="90px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="applicationForms.enterpriseName" :placeholder="source.language.pleaseEnter" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.unifiedSocialCreditCode" label-width="140px" prop="unifiedSocialCreditCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="applicationForms.unifiedSocialCreditCode" :placeholder="source.language.pleaseEnter" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.numberOfPeriods" label-width="60px">
            <el-select v-model="applicationForms.period" clearable @change="periodChange" :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.feeLevel" label-width="60px">
            <el-select v-model="applicationForms.feeLevel" :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.levelNameOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.badgeApplication" name="certificationApplication">
            <kindo-box>
              <kindo-table ref="certificationApplicationTable" :url="api.getApplication" :queryParam="applicationForm" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="enterpriseName" :label="source.language.enterpriseNameTable" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column prop="unifiedSocialCreditCode" :label="source.language.unifiedSocialCreditCode" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="name" :label="source.language.nameTable" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="idCardNo" :label="source.language.identityNumber" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="phonenumber" :label="source.language.contactInformation" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column :label="source.language.operation" width="150" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button v-if="right('edit')" type="text" @click="onModify(scope.row)">{{source.language.edit}}</el-button>
                  </template>
                </el-table-column>
              </kindo-table>
              <!--底部按钮栏-->
              <el-form :model="submitApplicationForm" inline ref="submitApplicationForm" :rules="submitApplicationFormRules" label-position="right" class="footerclass">
                <el-form-item :label="source.language.numberOfPeriods" label-width="50px" prop="exhibitionPeriod">
                  <el-select v-model="submitApplicationForm.exhibitionPeriod" @change="periodChange" :placeholder="source.language.pleaseChoose" class="inputclass">
                    <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="source.language.feeLevel" label-width="50px" prop="levelName">
                  <el-select v-model="submitApplicationForm.levelName" @change="levelNameChange" :placeholder="source.language.pleaseChoose" class="inputclass">
                    <el-option v-for="item in source.levelNameOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="source.language.numberOfDays" label-width="50px" prop="feeType">
                  <el-select v-model="submitApplicationForm.feeType" :placeholder="source.language.pleaseChoose" class="inputclass">
                    <el-option v-for="item in source.feeTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="source.language.startingTime" label-width="80px" prop="effectStartDate">
                  <el-date-picker :picker-options="exhibitionPeriodTimeOption" value-format="yyyy-MM-dd" v-model="submitApplicationForm.effectStartDate" format="yyyy 年 MM 月 dd 日" type="date" :placeholder="source.language.selectDate" class="inputclass">
                  </el-date-picker>
                </el-form-item>
                <el-form-item :label="source.language.takeBadgeAddress" label-width="80px" prop="takeBadgeAddr">
                  <el-select v-model="submitApplicationForm.takeBadgeAddr" :placeholder="source.language.pleaseChoose" class="inputclass">
                    <el-option v-for="item in source.licenseLocationOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-row type="flex" justify="center">
                <el-col :span="2">
                  <el-button v-if="right('submitApplication')" type="primary" @click="submitApplication">{{source.language.submitApplication}}</el-button>
                </el-col>
              </el-row>
            </kindo-box>
          </el-tab-pane>

          <el-tab-pane :label="source.language.alreadyAppliedCertification" name="alreadyAppliedCertification">
            <kindo-box>
              <kindo-table ref="alreadyAppliedTable" :url="api.getAlreadyApplied" :queryParam="alreadyAppliedForm">
                <el-table-column prop="applyUserName" :label="source.language.nameTable" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="idcardNo" :label="source.language.identityNumber" show-overflow-tooltip min-width="150"></el-table-column>
                <el-table-column prop="createDate" :label="source.language.applicationTime" show-overflow-tooltip min-width="120"></el-table-column>
                <el-table-column prop="exhibitionPeriod" :label="source.language.numberOfPeriods" :formatter="periodFormat" show-overflow-tooltip min-width="80"></el-table-column>
                <el-table-column prop="feeType" :label="source.language.numberOfDays" show-overflow-tooltip min-width="80"></el-table-column>
                <el-table-column prop="effectStartDate" :label="source.language.startingTime" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="feeLevel" :label="source.language.feeLevel" :formatter="levelNameFormat" show-overflow-tooltip min-width="80"></el-table-column>
                <el-table-column prop="totalPrice" :label="source.language.cost" show-overflow-tooltip min-width="80"></el-table-column>
                <el-table-column prop="creatorName" :label="source.language.submitter" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column prop="status" :label="source.language.auditStatus" :formatter="statusFormat" show-overflow-tooltip min-width="100"></el-table-column>
                <el-table-column :label="source.language.operation" width="150" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" @click="onRepeal(scope.row)" v-if="right('repeal')&&(scope.row.status === 'SUBMITTED'|| scope.row.status === 'BU_APPROVED' || scope.row.status ==='BC_APPROVED')">{{source.language.repeal}}</el-button>
                    <el-button type="text" @click="onView(scope.row)" v-else-if="right('view')&&(scope.row.status ==='BC_APPROVED' || scope.row.status ==='SETTLE' || scope.row.status ==='MADE' || scope.row.status ==='SENT')">{{source.language.viewReceipt}}</el-button>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
              </kindo-table>
            </kindo-box>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "agencyAdminSubmitApplication",
  mixins: [listPageBase],
  data() {
    var _this = this;
    return {
      pageId: "agencyAdminSubmitApplication",
      api: {
        getApplication: kindo.config.api.importExbUrl + "/api/BmMcApply/getOrgApplyList",
        getAlreadyApplied: kindo.config.api.importExbUrl + "/api/BmMcApply/getOrgListByComplete",
        getLevelName: kindo.config.api.importExbUrl + "/api/BmMcApply/getLevelName",
        getUserInfo: kindo.config.api.importExbUrl + "/api/BmMcApply/getLoginUser", //获取当前登录用户信息
        submitApplication: kindo.config.api.importExbUrl + "/api/BmMcApply/enterpriseQuotaApply",
        revoke: kindo.config.api.importExbUrl + "/api/BmMcApply/revokeQuotaApply",
        update: kindo.config.api.importExbUrl + "/api/BmMcApply/updateQuotaApply",
        resubmit: kindo.config.api.importExbUrl + "/api/BmMcApply/toResubmitQuotaApply"
      },
      activeName: "certificationApplication",
      applicationForms: {
        orgId: ""
      },
      // 办证申请查询栏表单
      alreadyAppliedForms: {
        orgId: ""
      },
      applicationRules: {},
      source: {
        language: {},
        periodOptions: [],
        levelNameOptions: [],
        feeTypeOptions: [{
          label: "一天",
          value: 1
        }, {
          label: "两天",
          value: 2
        }, {
          label: "三天",
          value: 3
        }, {
          label: "四天",
          value: 4
        }, {
          label: "五天",
          value: 5
        }],
        licenseLocationOptions: [],
        statusOptions: [],
        feeTypeQueryOptions: []
      },
      viewReceiptForm: {}, //查看回执表单
      isOnQuery: true,
      //当前登录的用户信息
      currentUserInfo: {
        userId: "",
        orgId: ""
      },
      submitApplicationForm: {
        levelName: ""
      }, //办证申请底部按钮表单
      submitApplicationFormRules: {},
      submitApplicationSelection: [], //批量提交申请
      //设置可选日期范围
      exhibitionPeriodTimeOption: {
        disabledDate(date) {
          //日期结束时间为凌晨0点（如"2019-04-11 00:00:00"）可选范围需减一天（24*3600*1000毫秒）
          if (date.getTime() > (_this.submitApplicationForm.closingTime - 86400000) || date.getTime() < _this.submitApplicationForm.curtainTime) {
            return true;
          }
        }
      }
    };
  },
  computed: {
    applicationForm: function () {
      return {
        queryParams: this.applicationForms
      };
    },
    alreadyAppliedForm: function () {
      return {
        queryParams: this.alreadyAppliedForms
      };
    }
  },
  async created() {
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    //读取数据字典
    this.source.licenseLocationOptions = await kindo.dictionary.get('takeBadgeAddr');
    // 审核状态
    this.source.statusOptions = await kindo.dictionary.get('badge_audit_status');

    this.submitApplicationFormRules = {
      exhibitionPeriod: [
        { required: true, message: this.source.language.pleaseChoose, trigger: "change" }
      ],
      levelName: [
        { required: true, message: this.source.language.pleaseChoose, trigger: "change" }
      ],
      feeType: [
        { required: true, message: this.source.language.pleaseChoose, trigger: "change" }
      ],
      effectStartDate: [
        { required: true, message: this.source.language.pleaseChoose, trigger: "change" }
      ],
      takeBadgeAddr: [
        { required: true, message: this.source.language.pleaseChoose, trigger: "change" }
      ]
    };

    this.source.periodOptions = [{
      label: this.source.language.phaseOneTable,
      value: "1"
    }, {
      label: this.source.language.phaseTwoTable,
      value: "2"
    }, {
      label: this.source.language.phaseThreeTable,
      value: "3"
    }];
    this.source.feeTypeQueryOptions = [{
      label: this.source.language.firstGear,
      value: "1"
    }, {
      label: this.source.language.secondGear,
      value: "2"
    }, {
      label: this.source.language.thirdGear,
      value: "3"
    }, {
      label: this.source.language.fourthGear,
      value: "4"
    }, {
      label: this.source.language.fifthGear,
      value: "5"
    }];
  },
  mounted() {
    this.$nextTick(function () {
      this.getCurrentUserInfo();
    });
  },
  updated: function () {
    this.$nextTick(function () {
      this.$refs.submitApplicationForm.clearValidate();
    });
  },
  methods: {
    //  审核状态过滤显示
    //  1.SUBMITTED：业务部门待审核，2.BU_REJECTED：业务部门审核不通过，3.BU_APPROVED：业务部门审核通过，4.SETTLE：已结算
    //  5.BC_APPROVED：证件中心审核通过，6.BC_REJECTED：证件中心审核不通过，7.SENT：已发证，8.REVOKE_AUDIT：撤销待审核
    //  9.REVOKE: 已撤销， 10.MADE：已制证
    statusFormat(row) {
      let statusLabel = row.status;
      for (let i = 0; i < this.source.statusOptions.length; i++) {
        if (this.source.statusOptions[i].value === row.status) {
          statusLabel = this.source.statusOptions[i].label;
        }
      }
      return statusLabel;
    },
    //期数过滤显示
    periodFormat(row) {
      let periodLabel = row.exhibitionPeriod;
      for (let i = 0; i < this.source.periodOptions.length; i++) {
        if (this.source.periodOptions[i].value === row.exhibitionPeriod) {
          periodLabel = this.source.periodOptions[i].label;
        }
      }
      return periodLabel;
    },
    //档位过滤显示
    levelNameFormat(row) {
      let priceLabel = row.feeLevel;
      for (let i = 0; i < this.source.feeTypeQueryOptions.length; i++) {
        if (this.source.feeTypeQueryOptions[i].value === row.feeLevel) {
          priceLabel = this.source.feeTypeQueryOptions[i].label;
        }
      }
      return priceLabel;
    },
    handleClick(tab) {
      if (tab.name === "certificationApplication") {
        this.isOnQuery = true;
        this.onApplicationQuery();
        this.submitApplicationForm = {};
      } else if (tab.name === "alreadyAppliedCertification") {
        this.isOnQuery = false;
        this.onAlreadyQuery();
      }
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
        this.applicationForms.orgId = this.currentUserInfo.orgId;
        this.alreadyAppliedForms.orgId = this.currentUserInfo.orgId;
        this._applicationForms = Object.assign({}, this.applicationForms);
        this.onApplicationQuery();
      }, err => {
        this.onApplicationQuery();
      });
    },
    onQuery() {
      this.onApplicationQuery();
    },
    //查询条件重置为空
    onResetQuery() {
      this.applicationForms = Object.assign({}, this._applicationForms);
      this.$nextTick(function () {
        this.onApplicationQuery();
      });
    },
    onApplicationQuery() {
      this.$refs.certificationApplicationTable.loadData();
    },
    onAlreadyQuery() {
      this.$refs.alreadyAppliedTable.loadData();
    },
    handleSelectionChange(val) {
      this.submitApplicationSelection = val;
    },
    //编辑
    onModify(row) { },
    //选择期数后，查对应档位选项
    getLevelName(exhibitionPeriod) {
      let params = {
        json: {
          customQueryParams: {
            period: exhibitionPeriod
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      let levelNameData = [];
      this.source.levelNameOptions = [];
      this.submitApplicationForm.levelName = "";
      this.$http.get(this.api.getLevelName, params).then(res => {
        levelNameData = res.records;
        this.submitApplicationForm.closingTime = res.records[0] ? new Date(res.records[0].closingTime).getTime() : "";
        this.submitApplicationForm.curtainTime = res.records[0] ? new Date(res.records[0].curtainTime).getTime() : "";
        for (let i = 0; i < levelNameData.length; i++) {
          for (let j = 0; j < this.source.feeTypeQueryOptions.length; j++) {
            if (levelNameData[i].priceName === this.source.feeTypeQueryOptions[j].value) {
              this.source.levelNameOptions.push({
                label: this.source.feeTypeQueryOptions[j].label,
                value: this.source.feeTypeQueryOptions[j].value
              });
              break;
            }
          }
        }
      });
    },
    periodChange(val) {
      this.getLevelName(val);
    },
    levelNameChange(val) {
      this.submitApplicationForm.levelName = val;
    },
    //提交申请
    submitApplication() {
      let params = [];
      if (this.submitApplicationSelection.length === 0) {
        this.$message({
          message: this.source.language.pleaseSelectData,
          type: "warning"
        });
        return;
      }
      this.$refs.submitApplicationForm.validate(valid => {
        if (valid) {
          for (let i = 0; i < this.submitApplicationSelection.length; i++) {
            params.push({
              badgeTypeName: "国内采购商证",
              badgeTypeCode: 91,
              enterpriseId: this.submitApplicationSelection[i].enterpriseId,
              enterpriceName: this.submitApplicationSelection[i].enterpriseName,
              enterpriceCode: this.submitApplicationSelection[i].enterpriceNo,
              applyUserName: this.submitApplicationSelection[i].name,
              applyUserMobile: this.submitApplicationSelection[i].phonenumber,
              idcardNo: this.submitApplicationSelection[i].idCardNo,
              applyOrgId: this.currentUserInfo.orgId,
              applyOrgName: "华为合作机构",
              exhibitionPeriod: this.submitApplicationForm.exhibitionPeriod,
              feeLevel: this.submitApplicationForm.levelName,
              feeType: this.submitApplicationForm.feeType,
              effectStartDate: this.submitApplicationForm.effectStartDate,
              takeBadgeAddr: this.submitApplicationForm.takeBadgeAddr
            });
          }
          this.$http.postJson(this.api.submitApplication, params).then(res => {
            this.onQuery();
            this.$message({
              message: this.source.language.submitSuccess,
              type: "success"
            });
            this.$refs.certificationApplicationTable.reloadData();
          });
        }
      });
    },
    // 撤销
    onRepeal(row) {
      let params = {
        status: "REVOKE",
        applyId: row.applyId,
        userId: this.currentUserInfo.userId,
        exhibitionPeriod: row.exhibitionPeriod,
        feeLevel: row.feeLevel,
        effectStartDate: row.effectStartDate,
        feeType: row.feeType,
        idcardNo: row.idcardNo
      };
      let promptMessage = this.source.language.repealPrompt;
      if (row.status === "BU_APPROVED") {
        promptMessage = this.source.language.departmentMessage;
      } else if (row.status === "BC_APPROVED") {
        promptMessage = this.source.language.centerMessage;
      }
      this.$confirm(promptMessage, this.source.language.repealReminder, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.postJson(this.api.revoke, params).then(res => {
          this.$refs.alreadyAppliedTable.reloadData();
          this.$message({
            type: 'success',
            message: this.source.language.repealSuccess
          });
        });
      });
    },
    //查看回执
    onView(row) {
      this.$refs.receiptDialog.dialogVisible = true;
      this.viewReceiptForm = {
        takeBadgeAddr: row.takeBadgeAddr,
        applyUserName: row.applyUserName,
        idcardNo: row.idcardNo,
        feeType: row.feeType,
        createDate: row.createDate,
        feeLevel: row.feeLevel,
        applyId: row.applyId
      };
    }
  },
  components: {
    "receiptDialog": () => import("./components/receiptDialog.vue")
  }
};
</script>
<style scoped>
.footerclass {
  margin-top: 10px;
}
</style>

