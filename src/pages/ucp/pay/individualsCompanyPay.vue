<template>
  <el-page ref="individualsCompanyPay">
    <template slot="header">
      <el-dialog :title="languageSource.CommonPayLang.otherPay" :show-close="false" :close-on-click-modal="false" :visible.sync="thirdPayDialogVisible" width="300px" :before-close="handleClose">
        <span>
          <div id="qrcode" ref="qrCodeDiv" style="width:200px;height:200px;margin:auto auto"></div>
        </span>
        <span>{{ languageSource.CommonPayLang.waitToPay }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="!this.canClick" @click="thirdPayConfirm">{{ confirmContent }}</el-button>
          <el-button @click="cancel">{{ cancelContent }}</el-button>
        </span>
      </el-dialog>

      <el-dialog :title="languageSource.CommonPayLang.warmTips" :show-close="false" :close-on-click-modal="false" :visible.sync="unionPayDialogVisible" width="300px">
        <span>{{ languageSource.CommonPayLang.waitToPay }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="!this.canClick" @click="unionPayConfirm">{{ confirmContent }}</el-button>
          <el-button @click="cancel">{{ cancelContent }}</el-button>
        </span>
      </el-dialog>

      <kindo-box :title="languageSource.CommonPayLang.unionPay" icon="fa-search">
        <div class="box_class" style="background-color: #DCDFE6">
          <el-form :model="form" ref="form" :inline="true" label-width="100px">
            <el-form-item :label="languageSource.CommonPayLang.orderAmount" prop="orderAmount">
              <span v-text="form.orderAmount" style="color: #E6A23C"></span>{{ languageSource.CommonPayLang.yuan }}
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.orderNo" prop="orderBillNo">
              <span v-text="form.orderBillNo"></span>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.merchantName" prop="merchantName">
              <span v-text="form.merchantName"></span>
            </el-form-item>
          </el-form>
        </div>
      </kindo-box>
    </template>

    <template slot="body">
      <kindo-box>
        <el-tabs type="border-card">
          <el-tab-pane :label="languageSource.CommonPayLang.personalUnion">
            <el-form :model="individualForm" ref="individualForm" :inline="true">
              <div class="radio_group_class">
                <el-form-item prop="individualPayment" label="">
                  <el-radio-group v-model="individualForm.individualPayment">
                    <el-radio label="chinapay"><img src="/static/img/ucpPay/chinapay.jpg" /></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="button_class">
                <el-form-item>
                  <el-button type="primary" @click="individualPay" :disabled="individualForm.individualPayment.length === 0">{{ languageSource.CommonPayLang.goToPay }}</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="languageSource.CommonPayLang.firmUnion">
            <el-form :model="companyForm" ref="companyForm" :inline="true">
              <div class="radio_group_class">
                <el-form-item prop="companyPayment">
                  <el-radio-group v-model="companyForm.companyPayment">
                    <div class="radio_class">
                      <!-- 邮储银行 -->
                      <el-radio label="PSBC"><img src="/static/img/ucpPay/PSBC.jpg" /></el-radio>
                      <!-- 工商银行 -->
                      <el-radio label="ICBC"><img src="/static/img/ucpPay/ICBC.jpg" /></el-radio>
                      <!-- 农业银行 -->
                      <el-radio label="ABC"><img src="/static/img/ucpPay/ABC.jpg" /></el-radio>
                      <!-- 中国银行 -->
                      <el-radio label="BOC"><img src="/static/img/ucpPay/BOC.jpg" /></el-radio>
                      <!-- 建设银行 -->
                      <el-radio label="CCB"><img src="/static/img/ucpPay/CCB.jpg" /></el-radio>
                    </div>
                    <div class="radio_class">
                      <!-- 交通银行 -->
                      <el-radio label="BOCOM"><img src="/static/img/ucpPay/BOCOM.jpg" /></el-radio>
                      <!-- 中信银行 -->
                      <el-radio label="CNCB"><img src="/static/img/ucpPay/CNCB.jpg" /></el-radio>
                      <!-- 民生银行 -->
                      <el-radio label="CMBC"><img src="/static/img/ucpPay/CMBC.jpg" /></el-radio>
                      <!-- 广发银行 -->
                      <el-radio label="GDB"><img src="/static/img/ucpPay/GDB.png" /></el-radio>
                      <!-- 平安银行 -->
                      <el-radio label="PAB"><img src="/static/img/ucpPay/PAB.jpg" /></el-radio>
                    </div>
                    <div class="radio_class">
                      <!-- 招商银行 -->
                      <el-radio label="CMB"><img src="/static/img/ucpPay/CMB.jpg" /></el-radio>
                      <!-- 浦发银行 -->
                      <el-radio label="SPDB"><img src="/static/img/ucpPay/SPDB.jpg" /></el-radio>
                      <!-- 北京银行 -->
                      <el-radio label="BOB"><img src="/static/img/ucpPay/BOB.jpg" /></el-radio>
                      <!-- 宁波银行 -->
                      <el-radio label="BON"><img src="/static/img/ucpPay/BON.jpg" /></el-radio>
                      <!-- 杭州银行 -->
                      <el-radio label="BOH"><img src="/static/img/ucpPay/BOH.png" /></el-radio>
                    </div>
                    <div class="radio_class">
                      <!-- 徽商银行 -->
                      <el-radio label="HSB"><img src="/static/img/ucpPay/HSB.jpg" /></el-radio>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="button_class">
                <el-form-item>
                  <el-button type="primary" @click="companyPay" :disabled="companyForm.companyPayment.length === 0">{{ languageSource.CommonPayLang.goToPay }}</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="languageSource.CommonPayLang.thidPay">
            <el-form :model="thirdForm" ref="thirdForm" :inline="true">
              <div class="radio_group_class">
                <el-form-item prop="thirdPayment">
                  <el-radio-group v-model="thirdForm.thirdPayment">
                    <el-radio label="weixin">{{ languageSource.CommonPayLang.wechatPay }}</el-radio>
                    <el-radio label="alipay">{{ languageSource.CommonPayLang.aliPay }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div class="button_class">
                <el-form-item>
                  <el-button type="primary" @click="wechatOrAliPay" :disabled="thirdForm.thirdPayment.length === 0">{{ languageSource.CommonPayLang.goToPay }}</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="languageSource.CommonPayLang.advancePayment" v-if="!form.prepayFlag">
            <el-form label-width="100px" :model="prepayForm" :rules="rules" ref="prepayForm" :inline-message="true" style="margin-top:20px;margin-left:20px">
              <el-form-item :label="languageSource.CommonPayLang.prepayAccount" prop="rechargeAccount">
                <el-input v-model="prepayForm.rechargeAccount" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item :label="languageSource.CommonPayLang.mobilephone" prop="enterpriseOperatorTele">
                <el-input v-model="prepayForm.enterpriseOperatorTele" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item :label="languageSource.CommonPayLang.payPassword" prop="enterpriseOperatorPsw">
                <el-input v-model="prepayForm.enterpriseOperatorPsw" class="inputclass" type="password" autocomplete="new-password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="prepayAccountPay">{{ languageSource.CommonPayLang.goToPay }}</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import request from "@/scripts/framework/http";
import QRCode from 'qrcodejs2';
export default {
  name: "individualsCompanyPay",
  data() {
    return {
      pageId: "individualsCompanyPay",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        payOrder: kindo.config.api.unifiedCollectUrl + "/api/order/transOrders/payOrder",
        searchOrder: kindo.config.api.unifiedCollectUrl + "/api/order/transOrders/searchOrder",
        searchWechatAlipayOrder: kindo.config.api.unifiedCollectUrl + "/api/order/transOrders/searchWechatAlipayOrder",
        getQrCode: kindo.config.api.unifiedCollectUrl + "/api/pos/payment/getCode",
        cgbPayGateWay: kindo.config.api.unifiedCollectPaymentUrl,
        prepayAccountPay: kindo.config.api.unifiedCollectUrl + "/api/pos/payment/rechargeAccountPay"
      },
      form: {
        retUrl: "",
        orderAmount: "",
        orderBillNo: "",
        merchantName: "",
        bankCode: "",
        prepayFlag: "",
        orderDate: "",
        orderFlowNo: ""
      },
      individualForm: {
        individualPayment: ""
      },
      companyForm: {
        companyPayment: ""
      },
      thirdForm: {
        thirdPayment: ""
      },
      prepayForm: {
        rechargeAccount: "",
        enterpriseOperatorTele: "",
        enterpriseOperatorPsw: "",
        collectAmount: "",
        orderNum: "",
        flowNo: "",
        collectMethod: ""
      },
      rules: {},
      chinaPayParam: {
        amount: "",
        orderTime: "",
        mccCode: "",
        bizType: "",
        orderId: "",
        accountType: "",
        issInsCode: "",
        returl: ""
      },
      wechatAliPayParam: {
        collectAmount: "",
        collectMethod: "",
        orderBillNo: "",
        prepayFlag: ""
      },
      confirmContent: "",
      cancelContent: "",
      totalTime: 10,
      canClick: true,
      thirdPayDialogVisible: false,
      unionPayDialogVisible: false
    };
  },
  async created() {
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    this.confirmContent = this.languageSource.CommonPayLang.paySuccess;
    this.cancelContent = this.languageSource.CommonPayLang.payCancel;

    this.rules = {
      rechargeAccount: [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.prepayAccount, trigger: "blur" }
      ],
      enterpriseOperatorTele: [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.mobilephone, trigger: "blur" }
      ],
      enterpriseOperatorPsw: [
        { required: true, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.payPassword, trigger: "blur" }
      ]
    };
  },
  beforeMount() {
    // 从数据字典获取收款的商户名称
    this.form = this.$route.query;
  },
  mounted() {
  },
  methods: {
    // 点击个人网银进行支付
    individualPay() {
      // 个人网银
      this.chinaPayParam.payType = "1";
      this.chinaPayParam.accountType = "11";
      this.chinaPayParam.bizType = "000201";
      this.startOnlineChinaPay();
    },
    // 点击企业网银进行支付
    companyPay() {
      // 企业网银
      this.chinaPayParam.payType = "1";
      this.chinaPayParam.accountType = "12";
      this.chinaPayParam.bizType = "000202";
      this.chinaPayParam.issInsCode = this.companyForm.companyPayment;
      this.startOnlineChinaPay();
    },
    // 银联支付开始进行后台请求
    startOnlineChinaPay() {
      this
        .$confirm(this.languageSource.CommonPayLang.confirmPay, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(() => {
          // 显示遮罩层
          this.unionPayDialogVisible = true;
          this.countDown();
          // 跳转到广发支付网关
          let params = { pay: this.chinaPayParam, form: this.form };
          request
            .postJson(this.api.payOrder, params)
            .then(data => {
              if (this.form.bankCode === 'cgb') {
                let signature = "signature=" + data.signature;
                let message = "message=" + data.message;
                let tmpUrl = this.api.cgbPayGateWay + "?" + signature + "&" + message;
                window.open(tmpUrl, "_blank");
              } else {
                this.$message.error(this.languageSource.CommonPayLang.noSupport + this.form.bankCode);
              }
            })
            .catch(error => {
              this.$message.error(error);
              this.unionPayDialogVisible = false;
            });
        });
    },
    // 网银支付完成后点击已完成按钮进行订单交易查询
    unionPayConfirm() {
      this.confirmOrderStatus(this.api.searchOrder);
    },
    // 点击第三方支付按钮
    wechatOrAliPay() {
      this.wechatAliPayParam.collectAmount = this.form.orderAmount;
      this.wechatAliPayParam.collectMethod = this.thirdForm.thirdPayment;
      this.wechatAliPayParam.orderBillNo = this.form.orderBillNo;
      this.wechatAliPayParam.prepayFlag = this.form.prepayFlag;
      // 先获取二维码
      this
        .$confirm(this.languageSource.CommonPayLang.confirmPay, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(() => {
          request
            .postJson(this.api.getQrCode, this.wechatAliPayParam)
            .then(data => {
              this.thirdPayDialogVisible = true;
              this.countDown();
              this.$nextTick(function () {
                this.bindQRCode(data.data.codeUrl);
              });
            })
            .catch(error => {
              this.$message.error(error);
            });
        });
    },
    thirdPayConfirm() {
      this.confirmOrderStatus(this.api.searchWechatAlipayOrder);
    },
    confirmOrderStatus(url) {
      request.get(url, this.form).then(res => {
        if (res.status === '3') {
          this.$message({ type: 'success', message: this.languageSource.CommonPayLang.orderHasPaid });
        } else if (res.status === '2') {
          this.$message.error(this.languageSource.CommonPayLang.orderPaidFail);
        } else {
          this.$message({ type: 'warning', message: this.languageSource.CommonPayLang.orderPaying });
        }
        this.refreshCurrentPage();
      }).catch(error => {
        this.$message.error(error);
        this.refreshCurrentPage();
      });
    },
    // 点击预付款支付按钮
    prepayAccountPay() {
      this.prepayForm.collectAmount = this.form.orderAmount;
      this.prepayForm.flowNo = this.form.orderFlowNo;
      this.prepayForm.collectMethod = "account_pay";
      this.prepayForm.orderNum = this.form.orderBillNo;
      this.prepayForm.enterpriseOperatorPsw = this.$md5(this.prepayForm.enterpriseOperatorPsw);

      this.$store.commit('pageLoading', true);
      request
        .postJson(this.api.prepayAccountPay, this.prepayForm)
        .then(data => {
          this.refreshCurrentPage();
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    handleClose(done) {
      this.$confirm(this.languageSource.CommonPayLang.cancelPay, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    bindQRCode(codeUrl) {
      new QRCode(this.$refs.qrCodeDiv, {
        text: codeUrl,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      });
    },
    cancel() {
      this.refreshCurrentPage();
    },
    countDown() {
      if (!this.canClick) {
        return;
      }
      this.canClick = false;
      this.confirmContent = this.languageSource.CommonPayLang.paySuccess + "(" + this.totalTime + ")";
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.confirmContent = this.languageSource.CommonPayLang.paySuccess + "(" + this.totalTime + ")";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.confirmContent = this.languageSource.CommonPayLang.paySuccess;
          this.totalTime = 10;
          this.canClick = true;
        }
      }, 1000);
    },
    refreshCurrentPage() {
      this.$store.commit('pageLoading', false);
      this.unionPayDialogVisible = false;
      this.thirdPayDialogVisible = false;
      setTimeout(() => {
        // 刷新当前页面
        let url = window.location.origin;
        window.open(url, "_top");
      }, 1000);
    }
  }
};
</script>
<style lang="scss">
.radio_class {
  margin-bottom: 25px;
}

.el-radio img {
  width: 138px;
  height: 33px;
}

.radio_group_class,
.button_class {
  margin-top: 20px;
  margin-left: 20px;
}

.theme-blue .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #409eff;
}

.theme-blue .el-tabs--border-card > .el-tabs__content {
  background-color: #e4e7ed;
}

.theme-red .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #d80c18;
}

.theme-red .el-tabs--border-card > .el-tabs__content {
  background-color: #e4e7ed;
}
</style>