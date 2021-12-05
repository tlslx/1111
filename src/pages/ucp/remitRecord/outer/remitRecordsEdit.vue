<template>
  <el-form :ref="ruleForm" :rules="rules" :model="ruleForm" :inline-message=true label-width="35%" width="100%">
    <el-row>
      <el-col :span="11">
        <el-form-item :label="source.language.accountType" prop="rechargeType">
          <el-select v-model="ruleForm.rechargeType" prop="rechargeType" @change="searchByRechargeType">
            <el-option v-for="item in rechargeTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="source.language.rechargeAccountNum" prop="rechargeAccount">
          <el-input v-model="ruleForm.rechargeAccount" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="source.language.receiveBankName" prop="receiveBankName">
          <el-input v-model="ruleForm.receiveBankName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="source.language.receiveBankAccount" prop="receiveBankAccount">
          <el-input v-model="ruleForm.receiveBankAccount" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="source.language.payBankAccountName" prop="payBankName">
          <el-input v-model="ruleForm.payBankName" :disabled="isView"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="source.language.payBankAccountNum" prop="payBankAccountNum">
          <el-input v-model="ruleForm.payBankAccountNum" :disabled="isView"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="source.language.remitDate" prop="remitDate">
          <el-date-picker v-model="ruleForm.remitDate" type="date" value-format="yyyy-MM-dd hh:mm:ss" :placeholder="source.language.selectDate"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="source.language.companyName" prop="companyName">
          <el-input v-model="ruleForm.companyName" :disabled="isView"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="source.language.currency" prop="currency">
          <el-select v-model="ruleForm.currency" prop="currency">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item :label="source.language.remitAmount" prop="remitAmount">
          <el-input v-model="ruleForm.remitAmount" :disabled="isView"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="22">
        <el-form-item :label="source.language.remitNotes" prop="remitNotes" label-width="17.5%">
          <el-input type="textarea" v-model="ruleForm.remitNotes" :rows="4"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item :label="source.language.remitAttachment" prop="remitAttachment">
          <el-upload ref="upload" :action="api.uploadFile" accept=".jpg,.png,.jpeg" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-change="fileChange" :before-remove="handleBeforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :headers="headers" :auto-upload="false">
            <el-button size="small" type="primary">{{source.language.clickUpload}}</el-button>
            <div slot="tip" class="el-upload__tip">
              <font color="#f00">{{uploadTip}}</font>
            </div>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button v-if="right('remit_records_register_submit')" type="primary" @click="onSubmit()" icon="glyphicon glyphicon-floppy-disk">{{source.comLanguage.submit}}</el-button>
      <el-button v-if="right('remit_records_register_cancer')" @click="onCancel()" icon="el-icon-close">{{source.comLanguage.cancel}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
import store from '@/scripts/framework/store/index.js';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [dialogPageBase, listPageBase],
  data() {
    return {
      pageId: "remit_records_register",
      api: {
        upload: kindo.config.api.unifiedCollectUrl + "/api/remitRecords/upload",
        getInfo: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/remitRecords/getRechargeAccount",
        getByExhibitType: kindo.config.api.unifiedCollectUrl + "/api/basicData/collectAccount/getByExhibitType",
        add: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/remitRecords/add",
        uploadFile: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseUser/updateFile"
      },
      source: {
        language: [],
        comLanguage: []
      },
      headers: { "Token": store.getters.token },
      activeTab: "baseInfo",
      uploadTip: "",
      value1: "",
      fileList: [],
      options: [
        { value: "1", label: "人民币" }
      ],
      rechargeTypes: [],
      ruleForm: {
        remitDate: "",
        currency: "1",
        receiveBankAccount: "",
        receiveBankName: "",
        remitAmount: "",
        remitAttachment: "",
        remitNotes: "",
        rechargeAccount: "",
        payBankName: "",
        payBankAccountNum: "",
        companyName: "",
        rechargeType: "1",
        remitAttachmentName: ""
      },
      rules: {}
    };
  },
  mounted: function () {
    this.loadData();
  },
  async created() {

    var checkRechargeAmount = (rule, value, callback) => {
      if (kindo.validate.pNumerical(value) && value > 0) {
        this.ruleForm.remitAmount = Math.floor(value * 100) / 100;
        return callback();
      } else {
        return callback(new Error(this.source.language.inputCorrectAmt));
      }
    };
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.source.language.invalidChar));
      } else {
        return callback();
      }
    };

    this.source.comLanguage = kindo.util.getLanguage('CommonLang');
    this.source.language = kindo.util.getLanguage('CommonPayLang');

    this.rules = {
      rechargeAccount: [
        { required: true, message: this.source.language.getCollectAccountFail, trigger: 'blur' },
        { max: 30, message: this.source.language.max30, trigger: "blur" }
      ],
      remitAmount: [
        { required: true, message: this.source.language.inputRemitAmount, trigger: 'blur' },
        { validator: checkRechargeAmount, trigger: "blur" }
      ],
      payBankName: [
        { required: true, message: this.source.language.inputPayBankAccountName, trigger: 'blur' },
        { max: 50, message: this.source.language.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      payBankAccountNum: [
        { required: true, message: this.source.language.inputPayBankAccountNum, trigger: 'blur' },
        { max: 30, message: this.source.language.max30, trigger: "blur" },
        { pattern: kindo.validate.pattern.bankCard, message: this.source.language.payBankAccountNumError, trigger: 'blur' }
      ],
      receiveBankName: [
        { required: true, message: this.source.language.getCollectAccountFail, trigger: 'blur' },
        { max: 50, message: this.source.language.max50, trigger: "blur" }
      ],
      receiveBankAccount: [
        { required: true, message: this.source.language.getCollectAccountFail, trigger: 'blur' },
        { max: 30, message: this.source.language.max30, trigger: "blur" }
      ],
      remitDate: [
        { required: true, message: this.source.language.selectRemitDate, trigger: 'blur' }
      ],
      companyName: [
        { required: true, message: this.source.language.inputCompanyName, trigger: 'blur' },
        { max: 50, message: this.source.language.max50, trigger: "blur" }
      ],
      currency: [
        { required: true, message: this.source.language.inputCurrency, trigger: 'blur' }
      ],
      remitNotes: [
        { max: 100, message: this.source.language.max100, trigger: "blur" }
      ]
    };

    this.rechargeTypes = await kindo.dictionary.get('exhibitType');
  },
  methods: {
    searchByRechargeType(value) {
      this.loadData();
    },
    pageLoad() { },
    onSubmit() {
      let _this = this;
      if ($(".el-upload-list.el-upload-list--text li") == null || $(".el-upload-list.el-upload-list--text li").length === 0) {
        _this.uploadTip = _this.source.language.selectRemitAttachment;
        return;
      } else {
        _this.uploadTip = "";
      }
      _this.$refs[this.ruleForm].validate((valid) => {
        if (valid) {
          //二次确认弹框
          _this.$confirm(_this.source.language.submitTips, _this.source.comLanguage.tips, {
            confirmButtonText: _this.source.comLanguage.confirm,
            cancelButtonText: _this.source.comLanguage.cancel,
            type: 'warning'
          }).then(() => {
            _this.$refs.upload.submit();
          }).catch(() => {

          });

        } else {
          return false;
        }
      });
    },
    loadData() {
      let _this = this;
      let ruleForm = this.ruleForm;
      this.$http.get(this.api.getInfo, { "accountType": _this.ruleForm.rechargeType }).then(
        function (res) {
          if (res) {
            ruleForm.rechargeAccount = res.rechargeAccountNum;
            ruleForm.payBankName = res.bankName;
            ruleForm.payBankAccountNum = res.bankAccountNum;
            ruleForm.companyName = res.companyName;
          }
        },
        function () {
          _this.$message({ message: _this.source.language.getCollectAccountFail, type: "warning" });
          ruleForm.rechargeAccount = "";
          ruleForm.payBankName = "";
          ruleForm.payBankAccountNum = "";
          ruleForm.companyName = "";
        }
      );
      //获取收款账号
      this.$http.post(this.api.getByExhibitType, { "exhibitType": _this.ruleForm.rechargeType }).then(
        function (res) {
          if (res) {
            ruleForm.receiveBankName = res.bankName;
            ruleForm.receiveBankAccount = res.bankAccount;
          }
        },
        function (res) {
          ruleForm.receiveBankName = "";
          ruleForm.receiveBankAccount = "";
          _this.$message({ message: _this.source.language.getCollectAccountFail, type: "warning" });
        }
      );
    },
    fileChange(file, fileList) {
      this.fileList = fileList.slice(-3);
      this.uploadTip = "";
    },
    handleBeforeRemove(file, fileList) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(this.source.language.fileNumOnlyOne);
    },
    handleBeforeUpload(file) {
      if (file.size >= 1024 * 1024) {
        this.$message({ message: this.source.language.fileSizeNotExceed1MB, type: "warning" });
        return false;
      }
      let nameLength = file.name.substring(0, file.name.lastIndexOf(".")).length;
      if (parseInt(nameLength) > 50) {
        this.$message({ message: this.source.language.fileNameLenghMax50, type: "warning" });
        return false;
      }

      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
        this.$message({ message: this.source.language.imageFileOnly, type: "warning" });
        return false;
      }
      this.ruleForm.remitAttachmentName = file.name;
      return true;
    },
    handleSuccess(response, file) {
      var _this = this;
      //上传成功
      if (response.flag === '1') {
        _this.ruleForm.remitAttachment = response.data;
        _this.$http.postJson(_this.api.add, _this.ruleForm).then(
          function (res) {
            _this.$message({ message: _this.source.comLanguage.successfully, type: "warning" });
            _this.gotoList();
          },
          function () {
          }
        );
      }
    },
    onCancel() {
      var _this = this;
      _this.$confirm(_this.source.language.cancelTips, _this.source.comLanguage.tips, {
        confirmButtonText: _this.source.comLanguage.comfirm,
        cancelButtonText: _this.source.comLanguage.cancel,
        type: 'warning'
      }).then(() => {
        _this.gotoList();
      }).catch(() => {

      });
    },
    gotoList() {
      this.$router.push("remitRecords");
      window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].text = this.source.language.remitRegisterRecords;
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