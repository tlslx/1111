<template v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.5)">
  <el-page ref="refundAudit">
    <template slot="header">
      <kindo-box :title="languageSource.CommonPayLang.refundApproval">
        <el-steps :space="200" :active="active" finish-status="success" align-center>
          <el-step :title="item.actName" :key="item.actId" v-for="item in source.nodeList"></el-step>
        </el-steps>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-form v-if="isRecharge" :model="rechargeForm" :rules="rules" ref="form" label-position="right" label-width="80px" :disabled="true" inline>
          <el-form-item :label="languageSource.CommonPayLang.billNo" prop="billNo">
            <el-input v-model="rechargeForm.billNo" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.prepayAccount" prop="rechargeAccount">
            <el-input v-model="rechargeForm.rechargeAccount" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.applyDate" prop="createDate">
            <el-input v-model="rechargeForm.createDate" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.currency" prop="currency">
            <el-select v-model="rechargeForm.currency" :placeholder="languageSource.CommonLang.select" class="inputclass">
              <el-option v-for="item in source.currencyOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundAmount" prop="refundAmount">
            <el-input v-model="rechargeForm.refundAmount" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.receiveBankName" prop="receiveBankName">
            <el-input v-model="rechargeForm.receiveBankName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.receiveBankAccount" prop="receiveBankAccount">
            <el-input v-model="rechargeForm.receiveBankAccount" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.examineState" prop="approveState">
            <el-select v-model="rechargeForm.approveState" :placeholder="languageSource.CommonLang.select" class="inputclass">
              <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form v-else :model="orderForm" ref="orderForm" label-position="right" label-width="100px" :disabled="true" inline>
          <el-form-item :label="languageSource.CommonPayLang.billNo" prop="refundFlowNum">
            <el-input v-model="orderForm.refundFlowNum" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.examineState" prop="approveState">
            <el-select v-model="orderForm.approveState" :placeholder="languageSource.CommonLang.select" class="inputclass">
              <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.companyName" prop="companyName">
            <el-input v-model="orderForm.companyName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.invoiceState" prop="invoiceState">
            <el-select v-model="orderForm.invoiceState" :placeholder="languageSource.CommonLang.select" class="inputclass">
              <el-option v-for="item in source.invoiceStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.bankBillNo" prop="orderNum">
            <el-input v-model="orderForm.orderNum" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundAmount" prop="refundAmount">
            <el-input v-model="orderForm.refundAmount" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundDate" prop="refundDate">
            <el-input v-model="orderForm.refundDate" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundMethod" prop="refundMethod">
            <el-select v-model="orderForm.refundMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
              <el-option v-for="item in source.refundMethods" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundType" prop="refundType">
            <el-select v-model="orderForm.refundType" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
              <el-option v-for="item in source.refundTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.applyDate" prop="createDate">
            <el-input v-model="orderForm.createDate" class="inputclass"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="wfForm" :rules="rules" ref="wfForm" label-position="right" label-width="80px" :inline-message="true">
          <el-form-item :label="languageSource.CommonPayLang.approvalComment" prop="comment">
            <el-input type="textarea" v-model="wfForm.comment" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.approvalOperation" prop="passFlag">
            <el-radio-group v-model="wfForm.passFlag">
              <el-radio label="1">{{ languageSource.CommonPayLang.approvalPass }}</el-radio>
              <el-radio label="0">{{ languageSource.CommonPayLang.approvalReject }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ languageSource.CommonPayLang.approvalSubmit }}</el-button>
            <el-button type="info" @click="cancel()">{{ languageSource.CommonLang.cancel }}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>

      <kindo-box>
        <el-collapse accordion>
          <el-collapse-item :title="languageSource.CommonPayLang.viewApprovalLog">
            <div>
              <el-steps :space="150" direction="vertical" :active="source.actLogs.length-1">
                <el-step :title="item.actName" :finish-status="(item.submitType===0)?'error':'success'" :key="item.id" v-for="item in source.actLogs">
                  <template slot="description">
                    <div><span>{{ item.userName }}</span></div>
                    <div><span>{{ item.startTime }}</span></div>
                    <div><span>{{ item.comment }}</span></div>
                  </template>
                </el-step>
              </el-steps>
            </div>
          </el-collapse-item>
        </el-collapse>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "refundAudit",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "refundAudit",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        getAuditDetailUrl: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getRechargeAuditDetail",
        auditOpUrl: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/batchRefund"
      },
      // 弹出框
      rechargeForm: {
        id: "",
        billNo: "",
        rechargeAccount: "",
        createDate: "",
        currency: "",
        refundAmount: "",
        receiveBankName: "",
        receiveBankAccount: "",
        approveState: "",
        taskId: ""
      },
      orderForm: {
        id: "",
        refundFlowNum: "",
        approveState: "",
        companyName: "",
        invoiceState: "",
        orderCount: "",
        orderNum: "",
        refundAmount: "",
        refundDate: "",
        refundMethod: "",
        refundType: "",
        createDate: "",
        creatorId: "",
        creatorName: "",
        taskId: ""
      },
      wfForm: {
        taskId: "",
        comment: "",
        passFlag: ""
      },
      source: {
        invoiceStates: [],
        approveStates: [],
        refundTypes: [],
        refundMethods: [],
        currencyOptions: [],
        actLogs: [],
        nodeList: []
      },
      rules: {},
      active: 0,
      curActId: "",
      isRecharge: false,
      businessKey: "",
      taskId: ""
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    this.rules = {
      comment: [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.approvalComment, trigger: "blur" },
        { max: 200, message: this.languageSource.CommonPayLang.max200, trigger: "blur" }
      ],
      passFlag: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.approvalOperation, trigger: "blur" }
      ]
    };

    this.source.invoiceStates = [{ value: "1", label: this.languageSource.CommonPayLang.invoiceMaked }, { value: "0", label: this.languageSource.CommonPayLang.invoiceUnmaked }];
    this.source.refundTypes = [{ value: "1", label: this.languageSource.CommonPayLang.onlineRefund }, { value: "2", label: this.languageSource.CommonPayLang.offlineRefund }];
    this.source.refundMethods = [{ value: "1", label: this.languageSource.CommonPayLang.cashRefund }, { value: "2", label: this.languageSource.CommonPayLang.onlineBanking }];
    this.source.currencyOptions = [{ value: '1', label: this.languageSource.CommonPayLang.renminbi }];
    this.source.approveStates = [{ value: '1', label: this.languageSource.CommonPayLang.approving }, { value: '2', label: this.languageSource.CommonPayLang.approved }, { value: '3', label: this.languageSource.CommonPayLang.rejected }];
    this.source.actLogs = [{ actName: "", actId: "1" }, { actName: "", actId: "2" }, { actName: "", actId: "3" }, { actName: "", actId: "4" }];
    this.source.nodeList = [{ actName: "", actId: "1" }, { actName: "", actId: "2" }, { actName: "", actId: "3" }, { actName: "", actId: "4" }];
  },
  methods: {
    onSubmit() {
      this.$refs.wfForm.validate(valid => {
        if (valid) {
          let param = {
            id: this.taskId,
            actId: this.curActId,
            businessKey: this.businessKey,
            prePayFlag: this.isRecharge,
            variables: {
              passFlag: this.wfForm.passFlag,
              reviewComment: this.wfForm.comment
            }
          };
          let _this = this;
          _this
            .$confirm(this.languageSource.CommonPayLang.confirmSubmit, this.languageSource.CommonLang.tips, { type: "warning" })
            .then(() => {
              _this.$http.postJson(_this.api.auditOpUrl, param).then(res => {
                kindo.util.alert(this.languageSource.CommonPayLang.approvalSubmitSuccess, "success");
                _this.$router.push({
                  path: (_this.isRecharge) ? "/rechargeRefundApproveRecords" : "/refundApproveRecords"
                });
              }).catch(error => {
                this.$message.error(error);
              });
            });
        }
      });
    },
    cancel() {
      this
        .$confirm(this.languageSource.CommonPayLang.confirmCancelApproval, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(() => {
          this.$router.back(-1);
        });
    }
  },
  beforeMount() {
    var query = this.$route.query;
    // 获取到业务详情数据
    this.isRecharge = query.isRecharge;
    if (query.isRecharge) {
      this.rechargeForm = query;
    } else {
      this.orderForm = query;
    }
    this.businessKey = query.id;
    this.taskId = query.taskId;
    let _this = this;
    _this.$http
      .get(_this.api.getAuditDetailUrl, { id: this.businessKey, taskId: this.taskId })
      .then(data => {
        // 获取工作流日志数据
        _this.source.actLogs = data.actLog;
        _this.source.nodeList = data.progress.nodeList;
        _this.curActId = data.progress.curActId;
        for (let i = 0; i < data.progress.nodeList.length; i++) {
          let tmp = data.progress.nodeList[i];
          if (tmp.actId === _this.curActId) {
            _this.active = i;
            break;
          }
        }
      })
      .catch(error => {
        _this.$message.error(error);
      });
  }
};
</script>
<style lang="scss" scoped>
.shortclass {
  width: 140px !important;
  margin-right: 5px;
}
.inputclass {
  width: 160px !important;
}
</style>