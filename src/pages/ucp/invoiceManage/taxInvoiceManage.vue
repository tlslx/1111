<template>
  <el-page ref="taxInvoiceManage" >

    <!--
  -->
    <template slot="header">
      <kindo-box :title="languageSource.CommonPayLang.invoiceCheckIn" icon="fa-search">
      </kindo-box>

    </template>
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" :inline-message="true" label-width="35%" width="100%">

            <el-row>

              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.addedTaxinvoiceNo" prop="vatInvoiceNo">
                  <el-input v-model="ruleForm.vatInvoiceNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>

            <el-row>

              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.elecInvoiceNo" prop="originInvoiceNo">
                  <el-input v-model="ruleForm.originInvoiceNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">

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
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      pageId: "taxInvoiceManage",
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      page: true,
      isRead: false,
      apiSaveUrl: kindo.config.api.unifiedCollectUrl + "/api/invoice/invoiceRecords/exchangeVatInvoice", //这里是路径，需要对应

      // apiSaveUrl: "http://localhost:8051/UnifiedCollectionMS" + "/api/invoice/taxInvoice/saveOrUpdate", //这里是路径，需要对应
      ruleForm: {
        addedTaxinvoiceNo: "",
        eInvoiceNo: ""
      },
      rules: {
      }
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    let validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.invalidChar));
      } else {
        return callback();
      }
    };
    this.rules.addedTaxinvoiceNo = [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.addedTaxinvoiceNo, trigger: "blur" },
        { min: 0, max: 50, message: this.languageSource.CommonPayLang.addedTaxinvoiceNo + this.languageSource.CommonPayLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
    ];
    this.rules.eInvoiceNo = [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.elecInvoiceNo, trigger: "blur" },
        { min: 0, max: 50, message: this.languageSource.CommonPayLang.elecInvoiceNo + this.languageSource.CommonPayLang.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
    ];
  },
  mounted() {
  },
  methods: {
    onSave() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this
          .$confirm(this.languageSource.CommonPayLang.sureToCheckIn, { type: "warning" })
          .then(() => {
            _this.$http.get(_this.apiSaveUrl, _this.ruleForm).then((data) => {
              _this.$message.success(this.languageSource.CommonPayLang.checkInSuccess);
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
      // this.$confirm("您确定要关闭页面吗？", "提示")
      //     .then(() => {
      //       this.$router.push('/upc/rechargeAccount/taxInvoiceList');
      //       this.dialogVisible = false;
      //     })
      //     .catch(() => {});
      //取消，弹出确定窗口，确定，关闭页面
      this.ruleForm = {
        addedTaxinvoiceNo: "",
        eInvoiceNo: ""
      };
      // this.page = false;
      // document.getElementById("tab-增值税发票登记").style.display = "none";
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

