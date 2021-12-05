<template>
  <el-page ref="qualificationReview">
    <template slot="header">
      <!--资质审核弹框-->
      <el-dialog :title="source.language.qualificationReviewPage" :close-on-click-modal="false" :visible.sync="badgeDialogVisible" width="80%">
        <!--不通过原因弹框-->
        <el-dialog width="40%" :title="source.language.failureReason" :visible.sync="innerVisible" append-to-body>
          <kindo-box>
            <el-form :model="notPassFrom" ref="notPassFrom" :rules="notPassRules" label-width="70px">
              <el-form-item :label="source.language.theReason" prop="qualificationsAuditOpinion">
                <el-input type="textarea" :rows="8" :placeholder="source.language.enterContent" class="textclass" v-model="notPassFrom.qualificationsAuditOpinion">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="innerVisible = false">{{source.language.cancel}}</el-button>
                <el-button v-if="right('edit')" type="primary" @click="notPassReason">{{source.language.confirm}}</el-button>
              </el-form-item>
            </el-form>
          </kindo-box>
        </el-dialog>
        <kindo-box :title="source.language.enterpriseQualificationReview">
          <el-form :model="enterpriseAuditForm" :rules="enterpriseAuditRules" ref="enterpriseAuditForm" label-position="right" label-width="210px">
            <!--第一部分-->
            <el-form-item :label="source.language.enterpriseName">
              <span>{{enterpriseAuditForm.enterpriseName}}</span>
            </el-form-item>
            <el-form-item :label="source.language.contactName">
              <span>{{enterpriseAuditForm.contactName}}</span>
            </el-form-item>
            <el-form-item :label="source.language.idCardNoForm">
              <span>{{enterpriseAuditForm.contactIdNumber}}</span>
            </el-form-item>
            <el-form-item :label="source.language.unifiedSocialCreditCodeForm">
              <span>{{enterpriseAuditForm.unifiedSocialCreditCode}}</span>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item :label="source.language.idCardFont">
                  <img class="imgclass" :src="api.getFile + enterpriseAuditForm.idCardFrontId">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.idCardReverse">
                      <img class="imgclass" :src="api.getFile + enterpriseAuditForm.idCardReverseId">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item :label="source.language.businessLicense">
                  <img class="imgclass" :src="api.getFile + enterpriseAuditForm.businessLicenseId">
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.qualificationPicture">
                      <img class="imgclass" :src="api.getFile + enterpriseAuditForm.qualificationId">
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-form-item :label="source.language.businessLicenseValidityPeriod">
              <span>{{enterpriseAuditForm.businessLicenseValidity}}</span>
            </el-form-item>

            <!--第二部分-->
            <div class="hrclass"></div>
            <el-form-item :label="source.language.buyerTypeForm" prop="buyerType">
              <el-row>
                <el-col :span="2">
                  <span>{{source.language.classA}}</span>
                </el-col>
                <el-col :span="16">
                  <el-radio-group v-model="enterpriseAuditForm.buyerType" :disabled="isAuditPassed">
                    <el-radio v-model="enterpriseAuditForm.buyerType" v-for="item in source.buyerTypeOptions" :key="item.value" :label="item.label"></el-radio>
                    <!-- <el-radio label="内贸采购商"></el-radio>
                    <el-radio label="进口采购商"></el-radio>
                    <el-radio label="全部"></el-radio> -->
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item :label="source.language.qualificationForm" prop="qualificationB">
              <el-row>
                <el-col :span="2">
                  <span>{{source.language.classB}}</span>
                </el-col>
                <el-col :span="20">
                  <el-radio-group v-model="enterpriseAuditForm.qualificationB" :disabled="isAuditPassed">
                    <el-radio v-model="enterpriseAuditForm.qualificationB" v-for="item in source.qualificationTypeB" :key="item.value" :label="item.label"></el-radio>
                    <!-- <el-radio label="批发企业年销售额1亿元/零售企业5000万元"></el-radio>
                    <el-radio label="营业额超过5000万元"></el-radio>
                    <el-radio label="营业额超过3000万元"></el-radio> -->
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item prop="qualificationC">
              <el-row>
                <el-col :span="2">
                  <span>{{source.language.classC}}</span>
                </el-col>
                <el-col :span="22">
                  <el-radio-group v-model="enterpriseAuditForm.qualificationC" :disabled="isAuditPassed">
                    <el-radio v-model="enterpriseAuditForm.qualificationC" v-for="item in source.qualificationTypeC" :key="item.value" :label="item.label"></el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
            <!--第三部分-->
            <div class="hrclass" v-if="!isAuditPassed"></div>
            <el-form-item :label="source.language.notPassingRecord" v-if="!isAuditPassed">
              <el-row>
                <el-col>
                  <span>{{source.language.failureReasonForm}}{{enterpriseAuditForm.qualificationsAuditOpinion}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <span>{{source.language.reviewTimeForm}}{{enterpriseAuditForm.qualificationsAuditDate}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <span>{{source.language.reviewerForm}}{{enterpriseAuditForm.qualificationsAuditor}}</span>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label-width="140px" v-if="!isAuditPassed">
              <el-button v-if="right('edit')" type="primary" @click="auditPass(true)">{{source.language.auditPassed}}</el-button>
              <el-button v-if="right('edit')" @click="auditNotPass(true)">{{source.language.auditNotPassed}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>

      </el-dialog>
      <!--按钮栏-->
      <kindo-box :title="source.language.qualificationReview" icon="fa-search">
        <el-form inline ref="badgeForms" :model="badgeForms" :rules="badgeFormRules" @submit.native.prevent @keyup.enter.native="onQuery" label-position="right">
          <el-form-item :label="source.language.enterpriseNameTable" label-width="90px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="badgeForms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.unifiedSocialCreditCode" label-width="140px" prop="unifiedSocialCreditCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="badgeForms.unifiedSocialCreditCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.status" label-width="60px">
            <el-select v-model="badgeForms.qualificationsAuditStatus" clearable :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.statusOptions" :key="item.value" :label="item.label" :value="item.value">
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
        <kindo-table ref="badgeBusinessTable" :url="api.get" :queryParam="badgeForm">
          <el-table-column prop="enterpriseName" :label="source.language.enterpriseNameTable" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column prop="unifiedSocialCreditCode" :label="source.language.unifiedSocialCreditCode" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="qualificationsAuditStatus" :label="source.language.status" show-overflow-tooltip min-width="120" :formatter="statusFormat"></el-table-column>
          <el-table-column prop="qualificationsAuditOpinion" :label="source.language.auditResult" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="qualificationsAuditDate" :label="source.language.reviewTime" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="qualificationsAuditor" :label="source.language.reviewer" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column :label="source.language.operation" width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" :title="source.language.view" @click="view(scope.row)">{{source.language.view}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "qualificationReview",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "qualificationReview",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAuditRecord/findEntListPageByParams",
        getEntInfo: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAuditRecord/getInfo",
        review: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseAuditRecord/auditAllowed",
        getFile: kindo.config.api.comsUrl + "/api/fs/view/"
      },
      badgeForms: {},
      badgeFormRules: {},
      source: {
        language: {},
        //0 待审核；1 审核通过； 2 审核不通过
        statusOptions: [{
          label: "全部",
          value: ""
        }, {
          label: "待审核",
          value: 0
        }, {
          label: "审核通过",
          value: 1
        }, {
          label: "审核不通过",
          value: 2
        }],
        customerTypeOptions: [{
          label: "特邀",
          value: "1"
        }, {
          label: "重要",
          value: "2"
        }, {
          label: "普通",
          value: "3"
        }],
        //采购类型A类
        buyerTypeOptions: [],
        // 资质B类
        qualificationTypeB: [],
        //资质C类
        qualificationTypeC: []
      },
      badgeDialogVisible: false, //资质审核弹框
      innerVisible: false, //不通过原因，内部弹框
      isEnterprise: true,
      //资质审核表单
      enterpriseAuditForm: {},
      //不通过原因表单
      notPassFrom: {
        qualificationsAuditOpinion: ""
      },
      enterpriseAuditRules: {},
      notPassRules: {},
      isSubmitDisabled: false, //审核通过按钮禁用
      isAuditPassed: false
    };
  },
  computed: {
    badgeForm: function () {
      return {
        queryParams: this.badgeForms
      };
    }
  },
  async created() {
    this._badgeForms = Object.assign({}, this.badgeForms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    // 读取数据字典
    this.source.qualificationTypeB = await kindo.dictionary.get('qualificationB');
    this.source.qualificationTypeC = await kindo.dictionary.get('qualificationC');
    this.source.buyerTypeOptions = [{
      label: this.source.language.importPurchaser,
      value: 1
    }, {
      label: this.source.language.domesticBuyers,
      value: 2
    }, {
      label: this.source.language.allType,
      value: 3
    }];
    this.enterpriseAuditRules = {
      buyerType: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ],
      qualificationB: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ],
      qualificationC: [
        { required: true, message: this.source.language.pleaseChoose, trigger: 'change' }
      ]
    };
    this.notPassRules = {
      qualificationsAuditOpinion: [
        { required: true, message: this.source.language.enterReason, trigger: "blur" },
        { max: 100, message: this.source.language.badgeCostLength, trigger: "blur" }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    //状态过滤显示
    statusFormat(row) {
      let statusLabel = row.qualificationsAuditStatus;
      for (let i = 0; i < this.source.statusOptions.length; i++) {
        if (this.source.statusOptions[i].value === row.qualificationsAuditStatus) {
          statusLabel = this.source.statusOptions[i].label;
          break;
        }
      }
      return statusLabel;
    },
    //A类，B类，C类单选按钮过滤显示
    buyerTypeFormat(value, buyerType) {
      let buyerLabel = value;
      for (let i = 0; i < this.source[buyerType].length; i++) {
        if (this.source[buyerType][i].value === buyerLabel) {
          buyerLabel = this.source[buyerType][i].label;
          break;
        }
      }
      return buyerLabel;
    },
    onQuery() {
      this.$refs.badgeBusinessTable.loadData();
    },
    onResetQuery() {
      this.badgeForms = Object.assign({}, this._badgeForms);
      this.$nextTick(function () {
        this.$refs.badgeBusinessTable.reloadData();
      });
    },
    //查企业资质信息
    getEnterpriseInfo(row) {
      let params = {
        json: {
          customQueryParams: {
            id: row.id
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getEntInfo, params).then(res => {
        this.enterpriseAuditForm = {
          id: row.id,
          enterpriseName: res.enterpriseUser.enterpriseName,
          contactName: res.enterpriseUser.contactName,
          contactIdNumber: res.enterpriseUser.contactIdNumber,
          unifiedSocialCreditCode: res.enterpriseUser.unifiedSocialCreditCode,
          businessLicenseValidity: res.enterpriseUser.businessLicenseValidity,
          qualificationsAuditOpinion: res.auditRecord.qualificationsAuditOpinion,
          qualificationsAuditDate: res.auditRecord.qualificationsAuditDate,
          qualificationsAuditor: res.auditRecord.qualificationsAuditor,
          enterpriseId: row.enterpriseId,
          session: row.session,
          buyerType: this.buyerTypeFormat(res.buyerType ? res.buyerType : "", "buyerTypeOptions"),
          qualificationB: this.buyerTypeFormat(res.qualificationB, "qualificationTypeB"),
          qualificationC: this.buyerTypeFormat(res.qualificationC, "qualificationTypeC")
        };
        this.$nextTick(function () {
          this.$refs.enterpriseAuditForm.clearValidate();
        });
      });
    },
    //查看待审核的企业或个人资质
    view(row) {
      this.badgeDialogVisible = true;
      this.isSubmitDisabled = false;
      this.isAuditPassed = false;
      //审核通过时，不显示审核通过按钮
      if (row.qualificationsAuditStatus === 1) {
        this.isAuditPassed = true;
      }
      //查企业资质材料信息
      this.getEnterpriseInfo(row);
    },
    //审核通过 审核：0 待审核；1 审核通过； 2 审核不通过
    auditPass() {
      let buyerType = this.enterpriseAuditForm.buyerType;
      let qualificationB = this.enterpriseAuditForm.qualificationB;
      let qualificationC = this.enterpriseAuditForm.qualificationC;
      //A类采购类型
      this.source.buyerTypeOptions.forEach(item => {
        if (item.label === buyerType) {
          buyerType = item.value;
        }
      });
      //B类资质
      this.source.qualificationTypeB.forEach(item => {
        if (item.label === qualificationB) {
          qualificationB = item.value;
        }
      });
      //C类资质
      this.source.qualificationTypeC.forEach(item => {
        if (item.label === qualificationC) {
          qualificationC = item.value;
        }
      });
      let params = {
        id: this.enterpriseAuditForm.id,
        enterpriseId: this.enterpriseAuditForm.enterpriseId,
        session: this.enterpriseAuditForm.session,
        qualificationsAuditStatus: 1,
        buyerType: buyerType,
        qualificationB: qualificationB,
        qualificationC: qualificationC
      };
      this.$refs.enterpriseAuditForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.review, params)
            .then(res => {
              this.isSubmitDisabled = false;
              this.badgeDialogVisible = false;
              this.$refs.badgeBusinessTable.loadData();
            }, err => {
              this.isSubmitDisabled = false;
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
    },
    //审核不通过，需填写不通过原因
    auditNotPass() {
      this.innerVisible = true;
      this.notPassFrom = {
        qualificationsAuditOpinion: ""
      };
      this.$nextTick(function () {
        this.$refs.notPassFrom.clearValidate();
      });
    },
    //提交不通过原因
    notPassReason() {
      let params = {
        id: this.enterpriseAuditForm.id,
        qualificationsAuditStatus: 2,
        qualificationsAuditOpinion: this.notPassFrom.qualificationsAuditOpinion
      };
      this.$refs.notPassFrom.validate(valid => {
        if (valid) {
          this.$http.postJson(this.api.review, params)
            .then(res => {
              this.innerVisible = false;
              this.badgeDialogVisible = false;
              this.$refs.badgeBusinessTable.loadData();
            }, err => {
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.textclass {
  width: 350px;
}
.formitemclass {
  margin-bottom: 20px;
}
.hrclass {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  height: 10px;
}
.imgclass {
  width: 200px;
  height: 150px;
}
</style>

