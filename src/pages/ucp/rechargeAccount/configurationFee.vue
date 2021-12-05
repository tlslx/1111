<template>
  <el-page ref="boothFee">

    <template slot="header">
      <kindo-box :title="languageSource.CommonPayLang.configFeeRegistration" icon="fa-search">
      </kindo-box>

    </template>
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" :inline-message="true" label-width="0%" width="100%">
            <el-row>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.transUnitType" prop="transUnitType" label-width="25%">
                  <el-select v-model="ruleForm.transUnitType" prop="transUnitType">
                    <el-option v-for="item in source.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.unitName" prop="unitName" label-width="25%">
                  <el-input v-model="ruleForm.unitName"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>
            <el-row>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.rechargeAccountNum" prop="rechargeAccount" label-width="25%">
                  <el-input v-model="ruleForm.rechargeAccount"></el-input>
                  <!--:disabled="true"-->
                </el-form-item>
              </el-form-col>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.remitAmount" prop="chargeAmount" label-width="25%">
                  <el-input v-model="ruleForm.chargeAmount"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>

            <el-row>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.exportBank" prop="payBankName" label-width="25%">
                  <el-input v-model="ruleForm.payBankName"></el-input>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.exportAccount" prop="payBankAccount" label-width="25%">
                  <el-input v-model="ruleForm.payBankAccount"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>

            <el-row>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.importBank" prop="receiveBankName" label-width="25%">
                  <el-input v-model="ruleForm.receiveBankName"></el-input>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.importAccount" prop="receiveBankAccount" label-width="25%">
                  <el-input v-model="ruleForm.receiveBankAccount"></el-input>
                </el-form-item>
              </el-form-col>
            </el-row>
            <el-row>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.remitDate" prop="chargeDate" label-width="25%">
                  <el-date-picker v-model="ruleForm.chargeDate" type="date" value-format="yyyy-MM-dd hh:mm:ss" :placeholder="languageSource.CommonPayLang.selectDate"></el-date-picker>
                </el-form-item>
              </el-form-col>
              <el-form-col :span="11">
                <el-form-item :label="languageSource.CommonPayLang.currency" prop="currency" label-width="25%">
                  <el-select v-model="ruleForm.currency" prop="currency" :disabled="true">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form-col>
            </el-row>

            <el-row>

              <el-col :span="11">

                <el-form-item label-width="25%">
                  <el-button type="primary" @click="onSave()" v-if="right('configFeeSave')" icon="glyphicon glyphicon-floppy-disk">{{languageSource.CommonLang.save}}</el-button>
                  <el-button icon="el-icon-close" @click="onCancel()" v-if="right('configFeeCancel')">{{languageSource.CommonLang.cancel}}</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import request from '@/scripts/framework/http';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "configFee",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "configFee",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      isRead: false,
      apiSaveUrl: kindo.config.api.unifiedCollectUrl + "/api/recharge/prereceiveRecords/saveOrUpdate", //这里是路径，需要对应
      ruleForm: {
        transUnitType: "",
        unitName: "",
        chargeProject: "2",
        chargeAmount: "",
        chargeDate: "",
        rechargeAccount: "",
        currency: "1",
        payBankName: "",
        payBankAccount: "",
        receiveBankName: "",
        receiveBankAccount: ""
      },
      options: [],
      rules: {},
      source: {
        type: []
      }
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    let checkRechargeAmount = (rule, value, callback) => {
      if (kindo.validate.pNumerical(value)) {
        if (value < 0 || value > 999999999) {
          return callback(new Error(this.languageSource.CommonPayLang.pleaseEnterNum));
        }
        if (value.toString().indexOf(".") >= 0 && value.toString().split(".")[1].length > 2) {
          return callback(new Error(this.languageSource.CommonPayLang.maxTwoDecimalPlaces));
        }
        this.ruleForm.chargeAmount = Math.floor(value * 100) / 100;
        return callback();
      } else {
        return callback(new Error(this.languageSource.CommonPayLang.pleaseEnterNum));
      }
    };

    this.rules = {
      rechargeAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.rechargeAccountNum, trigger: 'blur' },
        { pattern: kindo.validate.pattern.bankCard, message: this.languageSource.CommonPayLang.onlyPositiveNum, trigger: 'blur' }
      ],
      chargeAmount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.remitAmount, trigger: 'blur' },
        { validator: checkRechargeAmount, trigger: "blur" }
      ],
      payBankName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.exportBank, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      payBankAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.exportAccount, trigger: 'blur' },
        { pattern: kindo.validate.pattern.bankCard, message: this.languageSource.CommonPayLang.onlyPositiveNum, trigger: 'blur' }
      ],
      receiveBankName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.importBank, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      receiveBankAccount: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.importAccount, trigger: 'blur' },
        { pattern: kindo.validate.pattern.bankCard, message: this.languageSource.CommonPayLang.onlyPositiveNum, trigger: 'blur' }
      ],
      chargeDate: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.remitDate, trigger: 'blur' }
      ],
      unitName: [
        { required: true, message: this.languageSource.CommonPayLang.pleaseInput + this.languageSource.CommonPayLang.unitName, trigger: 'blur' },
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      currency: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.currency, trigger: 'blur' }
      ],
      transUnitType: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.transUnitType, trigger: 'blur' }
      ]
    };

    this.options = [{ value: "1", label: this.languageSource.CommonPayLang.renminbi }];
    this.source.type = [{ value: "1", label: this.languageSource.CommonPayLang.provincialTradingGrp }, { value: "2", label: this.languageSource.CommonPayLang.centralTradingGrp }, { value: "3", label: this.languageSource.CommonPayLang.businessUnit }];
  },
  mounted() {
  },
  methods: {
    onSave() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this
            .$confirm(this.languageSource.CommonPayLang.confirmRegist, this.languageSource.CommonLang.tips, { type: "warning" })
            .then(() => {
              _this.loading = true;
              request.postJson(_this.apiSaveUrl, _this.ruleForm).then((data) => {
                _this.$message.success(this.languageSource.CommonPayLang.saveSuccess);
                _this.reset();
                window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();
              }).catch((error) => {
                _this.$message.error(error);
              });
            });
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$confirm(this.languageSource.CommonPayLang.confirmCancelBooth, this.languageSource.CommonLang.tips, { type: "warning" }).then(() => {
        window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();
      });
    },
    reset() {
      this.ruleForm = {
        transUnitType: "",
        unitName: "",
        chargeProject: "2",
        chargeAmount: "",
        chargeDate: "",
        rechargeAccount: "",
        currency: "1",
        payBankName: "",
        payBankAccount: "",
        receiveBankName: "",
        receiveBankAccount: ""
      };
    }
  }
};
</script>

<style>
.icon-button {
  font-size: medium;
}
.el-form {
  margin-top: 30px;
}

.clearfix {
  line-height: 20px;
}
.box-card {
  width: 100%;
}
</style>

