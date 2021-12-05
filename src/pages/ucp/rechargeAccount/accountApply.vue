<template>
  <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" :inline-message=true label-width="35%" width="100%">
    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.accountType" prop="accountType">
          <el-select v-model="ruleForm.accountType" :disabled="isDisable" :placeholder="languageSource.CommonLang.select" :clearable="true" class="accountType">
            <el-option v-for="item in source.accountTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.invoiceReceiveMethod" prop="invoiceReceiveMethod">
          <el-select v-model="ruleForm.invoiceReceiveMethod" :placeholder="languageSource.CommonLang.select" :clearable="true">
            <el-option v-for="item in source.invoiceReceiveOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.creditLetterCode" prop="creditLetterCode">
          <el-input v-model="ruleForm.creditLetterCode"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.invoiceTitle" prop="invoiceTitle">
          <el-input v-model="ruleForm.invoiceTitle"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.taxNumber" prop="taxNumber">
          <el-input v-model="ruleForm.taxNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.channelNumber" prop="channelNumber">
          <el-input v-model="ruleForm.channelNumber"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.bankName" prop="bankName">
          <el-input v-model="ruleForm.bankName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.bankAccountNum" prop="bankAccountNum">
          <el-input v-model="ruleForm.bankAccountNum"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.companyName" prop="companyName">
          <el-input v-model="ruleForm.companyName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.companyTel" prop="companyTel">
          <el-input v-model="ruleForm.companyTel"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.companyAdd" prop="companyAdd">
          <el-input v-model="ruleForm.companyAdd"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.accountEmail" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="languageSource.CommonPayLang.mobilePhoneNum" prop="mobilePhoneNum">
          <el-input v-model="ruleForm.mobilePhoneNum"></el-input>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row type="flex" justify="center" style="margin-bottom:10px;font-weight:bold;">
      <el-col :span="20">
        <span style="color:#409EFF;">{{languageSource.CommonPayLang.accountProtocol}}</span>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-card class="box-card">
          <div>{{languageSource.CommonPayLang.protocolRemark}}</div>
        </el-card>
        <el-checkbox v-model="isRead" :label="languageSource.CommonPayLang.confirmProtocol" style="margin-top:20px;"></el-checkbox>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary" @click="onSave()" icon="glyphicon glyphicon-floppy-disk">{{languageSource.CommonLang.save}}</el-button>
      <el-button type="success" v-if="right('accountActive')" @click="onSubmit()" icon="el-icon-check">{{languageSource.CommonLang.activation}}</el-button>
      <el-button icon="el-icon-close" @click="onCancel()">{{languageSource.CommonLang.cancel}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import request from '@/scripts/framework/http';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      pageId: "account_apply",
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      isDisable: false,
      isRead: false,
      apiSaveUrl: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/accountApply",
      apiGetUrl: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/accountApply/getDraftRechargeAccount",
      checkAccountTypeUrl: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getByAccountType",
      ruleForm: {
        invoiceReceiveMethod: "",
        creditLetterCode: "",
        companyName: "",
        invoiceTitle: "",
        taxNumber: "",
        bankName: "",
        bankAccountNum: "",
        companyTel: "",
        companyAdd: "",
        email: "",
        mobilePhoneNum: "",
        accountType: ""
      },
      rules: {
        invoiceReceiveMethod: [],
        creditLetterCode: [],
        invoiceTitle: [],
        taxNumber: [],
        channelNumber: [],
        bankName: [],
        bankAccountNum: [],
        companyName: [],
        companyTel: [],
        companyAdd: [],
        email: [],
        mobilePhoneNum: [],
        accountType: []
      },
      source: {
        accountTypes: [],
        invoiceReceiveOption: []
      }
    };
  },
  mounted() {
    this.initFormData();//检查是否存在草稿信息，有则加载数据
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    let _commonPay = this.languageSource.CommonPayLang;
    let _common = this.languageSource.CommonLang;
    let accountValidator = (rule, value, callback) => {
      if (value) {
        let param = { accountType: value };
        this.$http.get(this.checkAccountTypeUrl, param).then((data) => {
          if (data !== "") {
            return callback(new Error(_commonPay.rechargeAccountExist));
          } else {
            return callback();
          }
        });
      } else {
        return callback();
      }
    };
    this.rules.creditLetterCode = [
          { required: true, message: _common.input + _commonPay.creditLetterCode, trigger: "blur" },
          { pattern: kindo.validate.pattern.creditLetterCode, message: _commonPay.creditLetterCode + _commonPay.illegal, trigger: 'blur' }
    ];
    this.rules.invoiceReceiveMethod = [
          { required: true, message: _common.select + _commonPay.invoiceReceiveMethod }
    ];
    this.rules.invoiceTitle = [
          { required: true, message: _common.input + _commonPay.invoiceTitle, trigger: "blur" },
          { max: 50, message: _commonPay.invoiceTitle + _commonPay.max50, trigger: 'blur' }
    ];
    this.rules.taxNumber = [
      { required: true, message: _common.input + _commonPay.taxNumber, trigger: "blur" },
      { pattern: kindo.validate.pattern.taxNum, message: _commonPay.taxNumber + _commonPay.illegal, trigger: 'blur' }
    ];
    this.rules.bankName = [
      { required: true, message: _common.input + _commonPay.bankName, trigger: "blur" },
      { max: 30, message: _commonPay.bankName + _commonPay.max30, trigger: 'blur' }
    ];
    this.rules.channelNumber = [
      { required: true, message: _common.input + _commonPay.channelNumber, trigger: "blur" },
      { pattern: kindo.validate.pattern.bankCard, message: _commonPay.channelNumber + _commonPay.illegal, trigger: 'blur' }
    ];
    this.rules.bankAccountNum = [
      { required: true, message: _common.input + _commonPay.bankAccountNum, trigger: "blur" },
      { pattern: kindo.validate.pattern.bankCard, message: _commonPay.bankAccountNum + _commonPay.illegal, trigger: 'blur' }
    ];
    this.rules.companyName = [
      { required: true, message: _common.input + _commonPay.companyName, trigger: "blur" },
      { max: 50, message: _commonPay.companyName + _commonPay.max50, trigger: 'blur' }
    ];
    this.rules.companyTel = [
      { required: true, message: _common.input + _commonPay.companyTel, trigger: "blur" },
      { pattern: kindo.validate.pattern.iTelephone, message: _commonPay.companyTel + _commonPay.illegal, trigger: 'blur' }
    ];
    this.rules.companyAdd = [
      { required: true, message: _common.input + _commonPay.companyAddr, trigger: "blur" },
      { max: 50, message: _commonPay.companyAddr + _commonPay.max50, trigger: 'blur' }
    ];
    this.rules.email = [
      { required: true, message: _common.input + _commonPay.accountEmail, trigger: "blur" },
      { pattern: kindo.validate.pattern.email, message: _commonPay.accountEmail + _commonPay.illegal, trigger: 'blur' },
      { max: 30, message: _commonPay.accountEmail + _commonPay.max30, trigger: 'blur' }
    ];
    this.rules.mobilePhoneNum = [
      { required: true, message: _common.input + _commonPay.mobilePhoneNum, trigger: "blur" },
      { pattern: kindo.validate.pattern.iMobile, message: _commonPay.mobilePhoneNum + _commonPay.illegal, trigger: 'blur' }
    ];
    this.rules.accountType = [
      { required: true, message: _common.input + _commonPay.accountType, trigger: "change" },
      { validator: accountValidator, trigger: "change" }
    ];
    this.source.invoiceReceiveOption = await kindo.dictionary.get('invoiceReceivingMode');
    this.source.accountTypes = await kindo.dictionary.get('exhibitType');
   
  },
  methods: {
    initFormData() {
      let paramId = this.$route.query.rechargeAccountId;
      if (paramId) {
        this.rules.accountType = [];
        this.isDisable = "disabled";
        let param = { id: paramId };
        this.$http.get(this.apiGetUrl, param).then(data => {
          if (data) {
            this.ruleForm = data;
            // this.$message.info(this.languageSource.CommonPayLang.unDraft);
          }
        });
      }
    },
    onCancel() {
      let paramId = this.$route.query.rechargeAccountId;
      this.$confirm(this.languageSource.CommonPayLang.cancelConfirm, this.languageSource.CommonLang.tips, { type: "warning" }).then(() => {
        if (paramId) {
          this.$router.push("/unitrecharge_accounts_manage");
        } else {
          window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();
        }
      });
    },
    onSubmit() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          if (!_this.isRead) { // 未选中
            _this.$message.warning(this.languageSource.CommonPayLang.readProtocol);
            return false;
          }
          _this.$confirm(this.languageSource.CommonPayLang.activeConfirm, this.languageSource.CommonLang.tips, { type: "warning" }).then(() => {
            _this.ruleForm.activeState = 1;
            request.postJson(_this.apiSaveUrl, _this.ruleForm).then((data) => {
              _this.ruleForm.id = data.id;
              _this.$message.success(this.languageSource.CommonPayLang.activeSuccess);
              window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].click();
            }).catch((error) => {
              _this.$message.error(this.languageSource.CommonPayLang.activeFail);
            });
          });
        } else {
          return false;
        }
      });
    },
    onSave() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this.ruleForm.activeState = -1;
          request.postJson(_this.apiSaveUrl, _this.ruleForm).then((data) => {
            _this.ruleForm.id = data.id;
            _this.$message.success(this.languageSource.CommonPayLang.saveSuccess);
          }).catch((error) => {
            _this.$message.error(this.languageSource.CommonPayLang.saveFail);
          });
        } else {
          return false;
        }
      });
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

