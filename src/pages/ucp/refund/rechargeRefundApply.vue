<template>
  <kindo-box :title="languageSource.CommonPayLang.prepayRefundApply" icon="fa-search">
    <div class="box_class">
      <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" label-width="100px" @submit.native.prevent @keyup.enter.native="submitForm">
        <el-form-item :label="languageSource.CommonPayLang.refundAmount" prop="refundAmount">
          <el-input v-model="ruleForm.refundAmount" class="inputclass" clearable :disabled="!ruleForm.rechargeAccount.length"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.prepayAccountType" prop="exhibitType">
          <el-select v-model="ruleForm.exhibitType" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass" @change="onChange">
            <el-option v-for="item in source.exhibitTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.prepayAccount" prop="rechargeAccount">
          <el-input v-model="ruleForm.rechargeAccount" class="inputclass" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.collectBankName" prop="receiveBankName">
          <el-input v-model="ruleForm.receiveBankName" class="inputclass" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.collectBankAccount" prop="receiveBankAccount">
          <el-input v-model="ruleForm.receiveBankAccount" class="inputclass" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.companyName" prop="companyName">
          <el-input v-model="ruleForm.companyName" class="inputclass" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.companyTel" prop="companyTel">
          <el-input v-model="ruleForm.companyTel" class="inputclass" clearable></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.mobilephone" prop="mobilePhoneNum">
          <el-input v-model="ruleForm.mobilePhoneNum" class="inputclass" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="right('rechargeRefundApplySubmit')" @click="submitForm()">{{ languageSource.CommonPayLang.approvalSubmit }}</el-button>
          <el-button type="info" v-if="right('rechargeRefundApplyCancel')" @click="cancel()">{{ languageSource.CommonLang.cancel }}</el-button>
        </el-form-item>
      </el-form>
    </div>

  </kindo-box>
</template>

<script>
import request from "@/scripts/framework/http";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      pageId: "rechargeRefundApply",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      getAllAccounts: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getAllAccounts",
      refundApplyUrl: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/rechargeRefundApply",
      getUrl: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getByUserId",
      ruleForm: {
        refundAmount: "",
        rechargeAccount: "",
        exhibitType: "",
        receiveBankName: "",
        receiveBankAccount: "",
        companyTel: "",
        mobilePhoneNum: "",
        companyName: "",
        accountBalance: ""
      },
      rules: {},
      source: {
        exhibitTypes: []
      }
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    let checkRefundAmout = (rule, value, callback) => {
      if (kindo.validate.pNumerical(value) && value > 0) {
        if (value > this.ruleForm.accountBalance) {
          return callback(new Error(this.languageSource.CommonPayLang.exceedBalance));
        } else {
          let transformVal = parseFloat(value).toFixed(3);
          let realVal = transformVal.substring(0, transformVal.length - 1);
          this.ruleForm.refundAmount = realVal;
          return callback();
        }
      } else {
        return callback(new Error(this.languageSource.CommonPayLang.refundAmount + this.languageSource.CommonPayLang.invalid));
      }
    };

    this.rules = {
      refundAmount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.refundAmount, trigger: "blur" },
        { validator: checkRefundAmout, trigger: "blur" }
      ],
      exhibitType: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.prepayAccountType, trigger: "blur" }
      ],
      rechargeAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.prepayAccount, trigger: "blur" }
      ],
      receiveBankName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.collectBankName, trigger: "blur" }
      ],
      receiveBankAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.collectBankAccount, trigger: "blur" }
      ],
      companyTel: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.companyTel, trigger: "blur" },
        { pattern: kindo.validate.pattern.iTelephone, message: this.languageSource.CommonPayLang.companyTel + this.languageSource.CommonPayLang.invalid, trigger: 'blur' }
      ],
      mobilePhoneNum: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.mobilephone, trigger: "blur" },
        { pattern: kindo.validate.pattern.iMobile, message: this.languageSource.CommonPayLang.mobilephone + this.languageSource.CommonPayLang.invalid, trigger: 'blur' }
      ],
      companyName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.companyName, trigger: "blur" }
      ]
    };

    this.source.exhibitTypes = await kindo.dictionary.get('exhibitType');
  },
  methods: {
    onChange() {
      this.ruleForm.rechargeAccount = "";
      this.ruleForm.receiveBankName = "";
      this.ruleForm.receiveBankAccount = "";
      this.ruleForm.companyName = "";
      this.ruleForm.accountBalance = "";
      this.ruleForm.mobilePhoneNum = "";
      this.ruleForm.companyTel = "";
      let _this = this;
      this.$http.get(this.getAllAccounts, { 'accountType': this.ruleForm.exhibitType })
        .then(data => {
          if (data.length) {
            _this.ruleForm.rechargeAccount = data[0].rechargeAccountNum;
            _this.ruleForm.receiveBankName = data[0].bankName;
            _this.ruleForm.receiveBankAccount = data[0].bankAccountNum;
            _this.ruleForm.companyName = data[0].companyName;
            _this.ruleForm.accountBalance = data[0].accountBalance;
            _this.ruleForm.mobilePhoneNum = data[0].mobilePhoneNum;
            _this.ruleForm.companyTel = data[0].companyTel;
          }
        })
        .catch(error => {
          _this.$message.error(error);
        });
    },
    submitForm() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this
            .$confirm(this.languageSource.CommonPayLang.confirmRefund, this.languageSource.CommonLang.tips, { type: "warning" })
            .then(() => {
              request
                .postJson(_this.refundApplyUrl, _this.ruleForm)
                .then(data => {
                  _this.$message.success(this.languageSource.CommonPayLang.refundSuccess);
                  _this.$router.push(
                    "recharge_refund_records_manage"
                  );
                })
                .catch(error => {
                  _this.$message.error(error);
                });
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this
        .$confirm(this.languageSource.CommonPayLang.confirmCancelRefund, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(() => {
          kindo.util.closeWin();
        });
    },
    loadForm() {
      let _this = this;
      request
        .get(_this.getUrl)
        .then(data => {
          this.ruleForm.rechargeAccount = data.rechargeAccountNum;
          this.ruleForm.receiveBankName = data.bankName;
          this.ruleForm.receiveBankAccount = data.bankAccountNum;
          this.ruleForm.companyName = data.companyName;
          this.ruleForm.accountBalance = data.accountBalance;
        })
        .catch(error => {
          _this.$message.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.box_class {
  width: 400px !important;
}
.inputclass {
  width: 260px !important;
}
.el-form-item {
  margin-bottom: 20px;
}
</style>