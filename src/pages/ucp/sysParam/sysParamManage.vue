<template>
  <el-page ref="sysParamManage" >

    <!--
  -->
    <template slot="header">
      <kindo-box :title="languageSource.CommonPayLang.paramConfig" icon="fa-search">
      </kindo-box>

    </template>
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" :inline-message="true" label-width="35%" width="100%">

            <el-row>

              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.refundTransferDate" prop="refundTransferDate">
                  <el-input v-model="ruleForm.refundTransferDate" type="number" oninput="if(value.length>4)value=value.slice(0,4)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>

            <el-row>

              <el-col :span="12">
                <el-form-item :label="languageSource.CommonPayLang.refundLimit" prop="refundLimit">
                  <el-input v-model="ruleForm.refundLimit" type="number" oninput="if(value.length>8)value=value.slice(0,8)"></el-input>
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
      apiSaveUrl: kindo.config.api.unifiedCollectUrl + "/api/basicData/param/save", //这里是路径，需要对应
      ruleForm: {
        refundTransferDate: "",
        refundLimit: ""
      },
      rules: {
      }
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.rules.refundTransferDate = [
       { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.refundTransferDate, trigger: "blur" },
       { pattern: kindo.validate.pattern.pInterger, message: this.languageSource.CommonPayLang.refundTransferDate + this.languageSource.CommonPayLang.illegal, trigger: 'blur' }
    ];
    this.rules.refundLimit = [
       { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.refundLimit, trigger: "blur" },
       { pattern: kindo.validate.pattern.pInterger, message: this.languageSource.CommonPayLang.refundLimit + this.languageSource.CommonPayLang.illegal, trigger: 'blur' }
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
          .$confirm(this.languageSource.CommonPayLang.sureToConfig, this.languageSource.CommonLang.tips, { type: "warning" })
          .then(() => {
            request.postJson(_this.apiSaveUrl, _this.ruleForm).then((data) => {
              _this.$message.success(this.languageSource.CommonPayLang.configSuccess);
              _this.reset();
              window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].click();

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
        window.parent.document.getElementsByClassName("el-tabs__item is-top is-active")[0].click();
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
        refundTransferDate: "",
        refundLimit: ""
      };
      // this.page = false;
      // document.getElementById("tab-增值税发票登记").style.display = "none";
    },
    loadForm() {
      this.$http.get(kindo.config.api.unifiedCollectUrl + "/api/basicData/param/get").then(data => {
        this.ruleForm.refundTransferDate = data.refundTransferDate;
        this.ruleForm.refundLimit = data.refundLimit;
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