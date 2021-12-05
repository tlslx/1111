<template>
  <el-page ref="sysParamManage" >

    <!--
  -->
    <template slot="header">
      <kindo-box :title="languageSource.CommonPayLang.newPayment" icon="fa-search">
      </kindo-box>

    </template>
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" :inline-message="true" label-width="35%" width="100%">

            <el-row>

              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.collection" prop="userName">
                  <el-input v-model="ruleForm.userName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.collectionAdmin" prop="upperAdmin">
                  <el-input v-model="ruleForm.upperAdmin" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.group" prop="operatorGroup">
                  <el-input v-model="ruleForm.operatorGroup" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.cash" prop="cashAmount">
                  <el-input v-model="ruleForm.cashAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.check" prop="checkAmount">
                  <el-input v-model="ruleForm.checkAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.bankcard" prop="bankCardAmount">
                  <el-input v-model="ruleForm.bankCardAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.alipay" prop="alipayAmount">
                  <el-input v-model="ruleForm.alipayAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.wechat" prop="wechartAmount">
                  <el-input v-model="ruleForm.wechartAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.advancePayment" prop="rechargeAccountAmount">
                  <el-input v-model="ruleForm.rechargeAccountAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.collectAmount" prop="handinAmount">
                  <el-input v-model="ruleForm.handinAmount"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.refundAmount" prop="refundAmount">
                  <el-input v-model="ruleForm.refundAmount" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.remark" prop="remark">
                  <el-input v-model="ruleForm.remark" type="textarea" autosize></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>

              <el-col :span="12">

                <el-form-item>
                  <el-button type="primary" @click="onSave()" icon="glyphicon glyphicon-floppy-disk">{{languageSource.CommonLang.save}}</el-button>
                  <el-button icon="el-icon-close" @click="onCancel()">{{languageSource.CommonLang.cancel}}</el-button>
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

export default {

  data() {
    return {
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      page: true,
      isRead: false,
      ruleForm: {
        userName: "",
        upperAdmin: "",
        operatorGroup: "",
        cashAmount: "",
        checkAmount: "",
        bankCardAmount: "",
        alipayAmount: "",
        wechartAmount: "",
        rechargeAccountAmount: "",
        handinAmount: "",
        refundAmount: "",
        remark: ""
      },
      apiSaveUrl: kindo.config.api.unifiedCollectUrl + "/api/handle/record/add", //这里是路径，需要对应
      rules: {
      }
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    let numberValidator = (rule, value, callback) => {
      if (isNaN(value)) {
        return callback(new Error(this.languageSource.CommonLang.numberValidator));
      } else if (value < 0) {
        return callback(new Error(this.languageSource.CommonPayLang.plusRequired));
      } else {
        return callback();
      }
    };
    this.rules.handinAmount = [
      { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.collectAmount, trigger: "blur" },
      { validator: numberValidator, trigger: 'blur' }
    ];
  },
  mounted() {
    this.loadForm();
  },
  methods: {
    onSave() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this
          .$confirm(this.languageSource.CommonPayLang.sureToAddPayment, this.languageSource.CommonLang.tips, { type: "warning" })
          .then(() => {
            request.postJson(_this.apiSaveUrl, _this.ruleForm).then((data) => {
              _this.$message.success(this.languageSource.CommonPayLang.saveSuccess + "!");
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
      this.$confirm(this.languageSource.CommonPayLang.cancelConfirm, this.languageSource.CommonLang.tips, { type: "warning" }).then(() => {
        window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].children[0].click();
      });
    },
    reset() {
      this.ruleForm = {
        userName: "",
        upperAdmin: "",
        operatorGroup: "",
        cashAmount: "",
        checkAmount: "",
        bankCardAmount: "",
        alipayAmount: "",
        wechartAmount: "",
        rechargeAccountAmount: "",
        handinAmount: "",
        refundAmount: "",
        remark: ""
      };
    },
    loadForm() {
      this.$http.get(kindo.config.api.unifiedCollectUrl + "/api/handle/record/init").then(data => {
        this.ruleForm.userName = data.userName;
        this.ruleForm.upperAdmin = data.upperAdmin;
        this.ruleForm.operatorGroup = data.operatorGroup;
        this.ruleForm.cashAmount = data.cashAmount;
        this.ruleForm.checkAmount = data.checkAmount;
        this.ruleForm.bankCardAmount = data.bankCardAmount;
        this.ruleForm.alipayAmount = data.alipayAmount;
        this.ruleForm.wechartAmount = data.wechartAmount;
        this.ruleForm.rechargeAccountAmount = data.rechargeAccountAmount;
        this.ruleForm.handinAmount = data.handinAmount;
        this.ruleForm.refundAmount = data.refundAmount;
        this.ruleForm.remark = data.remark;
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