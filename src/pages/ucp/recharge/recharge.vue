<template>
  <kindo-box :title="languageSource.CommonPayLang.prepayCharge" icon="fa-search" v-loading="loading" :element-loading-text="languageSource.CommonPayLang.jumpToPaymentPage" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="box_class">
      <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" label-width="100px" @submit.native.prevent @keyup.enter.native="submitForm" :inline-message="true">
        <el-form-item :label="languageSource.CommonPayLang.prepayAccountType" prop="rechargeType">
          <el-select v-model="ruleForm.rechargeType" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass" @change="onChange">
            <el-option v-for="item in source.rechargeTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.prepayAccount" prop="rechargeAccountNum">
          <el-input v-model="ruleForm.rechargeAccountNum" class="inputclass" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.chargeAmount" prop="rechargeAmount">
          <el-input v-model="ruleForm.rechargeAmount" class="inputclass" clearable></el-input> <span style="width:20px">{{ languageSource.CommonPayLang.yuan }}</span>
        </el-form-item>
        <el-form-item :label="languageSource.CommonPayLang.capitalAmount" prop="rechargeAmoutCapital">
          <el-input v-model="ruleForm.rechargeAmoutCapital" class="inputclass" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="right('prepayChargeSubmit')" @click="submitForm()">{{ languageSource.CommonPayLang.charge }}</el-button>
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
      pageId: "prepayCharge",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      submitUrl: kindo.config.api.unifiedCollectUrl + "/api/recharge/rechargeRecords/submitAdvanceChargeInfo",
      getAllAccounts: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getAllAccounts",
      ruleForm: {
        rechargeAmount: "",
        rechargeAccountNum: "",
        rechargeType: "",
        rechargeAmoutCapital: ""
      },
      rules: {},
      source: {
        rechargeTypes: []
      },
      loading: false
    };
  },
  methods: {
    onChange() {
      this.ruleForm.rechargeAccountNum = "";
      let _this = this;
      this.$http.get(this.getAllAccounts, { 'accountType': this.ruleForm.rechargeType })
        .then(data => {
          if (data.length) {
            _this.ruleForm.rechargeAccountNum = data[0].rechargeAccountNum;
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
            .$confirm(this.languageSource.CommonPayLang.confirmPrepayCharge, this.languageSource.CommonLang.tips, { type: "warning" })
            .then(() => {
              _this.loading = true;
              request
                .postJson(_this.submitUrl, _this.ruleForm)
                .then(data => {
                  _this.loading = false;
                  // 获取订单信息成功后，跳转到支付页面
                  this.$router.push({
                    path: data.retUrl,
                    query: data
                  });
                })
                .catch(error => {
                  _this.$message.error(error);
                  _this.loading = false;
                });
            });
        } else {
          return false;
        }
      });
    }
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    let checkRechargeAmount = (rule, value, callback) => {
      if (kindo.validate.pNumerical(value) && value > 0) {
        let transformVal = parseFloat(value).toFixed(3);
        let realVal = transformVal.substring(0, transformVal.length - 1);
        this.ruleForm.rechargeAmount = realVal;
        this.ruleForm.rechargeAmoutCapital = kindo.ucpUtil.convertCurrency(realVal);
        return callback();
      } else {
        return callback(new Error(this.languageSource.CommonPayLang.inputValidAmount));
      }
    };

    this.rules = {
      rechargeAmount: [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.chargeAmount, trigger: "blur" },
        { validator: checkRechargeAmount, trigger: "blur" }
      ],
      rechargeAccountNum: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.prepayAccount, trigger: "blur" }
      ],
      rechargeType: [
        { required: true, message: this.languageSource.CommonLang.select + this.languageSource.CommonPayLang.prepayAccountType, trigger: "blur" }
      ]
    };

    this.source.rechargeTypes = await kindo.dictionary.get('exhibitType');
  },
  mounted() {
  },
  beforeMount() {
    var query = this.$route.query;
    this.ruleForm.rechargeAccountNum = query.rechargeAccountNum;
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