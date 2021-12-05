<template>
  <kindo-box title="订单测试页面" icon="fa-search" v-loading="loading" element-loading-text="正在跳转到支付页面中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="box_class">
      <el-form :model="ruleForm" :rules="rules" :ref="ruleForm" label-width="100px" :inline-message="true" @submit.native.prevent @keyup.enter.native="submitForm">
        <el-form-item label="订单号" prop="orderNum">
          <el-input v-model="ruleForm.orderNum" class="inputclass"></el-input>
        </el-form-item>
        <el-form-item label="订单日期" prop="orderDate">
          <el-date-picker v-model="ruleForm.orderDate" type="datetime" class="inputclass" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单金额" prop="orderAmount">
          <el-input v-model="ruleForm.orderAmount" class="inputclass" clearable></el-input>
        </el-form-item>
        <el-form-item label="交易类型" prop="transType">
          <el-select v-model="ruleForm.transType" placeholder="请选择" class="inputclass" :clearable="true" :editable="false">
            <el-option v-for="item in source.transTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费类别" prop="chargeCategory">
          <el-select v-model="ruleForm.chargeCategory" :clearable="true" placeholder="请选择" class="inputclass">
            <el-option v-for="item in source.chargeCategories" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展览类别" prop="exhibitCategory">
          <el-select v-model="ruleForm.exhibitCategory" :clearable="true" placeholder="请选择" class="inputclass">
            <el-option v-for="item in source.exhibitCategories" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="币种" prop="currency">
          <el-select v-model="ruleForm.currency" :clearable="true" placeholder="请选择" class="inputclass" :editable="false" :disabled="true">
            <el-option v-for="item in source.currencys" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单来源" prop="sourceSys">
          <el-input v-model="ruleForm.sourceSys" class="inputclass" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button type="primary" @click="goPay()" :disabled="!ruleForm.id.length">去支付</el-button>
        </el-form-item>
      </el-form>
    </div>

  </kindo-box>
</template>

<script>
import request from "@/scripts/framework/http";
export default {
  data() {
    var checkOrderAmount = (rule, value, callback) => {
      if (kindo.validate.pNumerical(value) && value > 0) {
        let transformVal = parseFloat(value).toFixed(3);
        let realVal = transformVal.substring(0, transformVal.length - 1);
        this.ruleForm.orderAmount = realVal;
        return callback();
      } else {
        return callback(new Error("请输入正确的金额"));
      }
    };
    return {
      submitUrl: kindo.config.api.unifiedCollectUrl + "/api/order/transOrders/addOrder",
      getPaymentUrl: kindo.config.api.unifiedCollectUrl + "/api/order/transOrders/getPaymentData",
      ruleForm: {
        id: "",
        orderNum: "",
        orderDate: "",
        orderAmount: "5",
        transType: "1",
        orderType: "",
        chargeCategory: "2",
        exhibitCategory: "",
        currency: "1",
        orderCount: "1",
        sourceSys: "进出口招商"
      },
      source: {
        transTypes: [{ value: "1", label: "支付" }, { value: "2", label: "退款" }],
        chargeCategories: [{ value: "1", label: "预付款收款" }, { value: "2", label: "普通收款" }],
        exhibitCategories: [],
        currencys: [{ value: "1", label: "人民币" }]
      },
      rules: {
        orderNum: [
          { required: true, message: "请输入订单号码", trigger: "blur" }
        ],
        orderDate: [
          { required: true, message: "请输入订单日期", trigger: "blur" }
        ],
        orderAmount: [
          { required: true, message: "请输入充值金额", trigger: "blur" },
          { validator: checkOrderAmount, trigger: "blur" }
        ],
        transType: [
          { required: true, message: "请输入交易类型", trigger: "blur" }
        ],
        chargeCategory: [
          { required: true, message: "请输入收费类别", trigger: "blur" }
        ],
        exhibitCategory: [
          { required: true, message: "请输入展览类别", trigger: "blur" }
        ],
        orderCount: [
          { required: true, message: "请输入订单数量", trigger: "blur" }
        ],
        sourceSys: [
          { required: true, message: "请输入订单来源", trigger: "blur" }
        ],
        currency: [
          { required: true, message: "请输入币种", trigger: "blur" }
        ]
      },
      loading: false
    };
  },
  methods: {
    submitForm() {
      let _this = this;
      _this.$refs[_this.ruleForm].validate(valid => {
        if (valid) {
          _this
            .$confirm("您确定要提交订单吗？", "提示", { type: "warning" })
            .then(() => {
              this.$store.commit('pageLoading', true);
              request
                .postJson(_this.submitUrl, _this.ruleForm)
                .then(data => {
                  this.ruleForm.id = data.id;
                  this.$message.success("订单导入成功");
                  this.$store.commit('pageLoading', false);
                })
                .catch(error => {
                  _this.$message.error(error);
                  this.$store.commit('pageLoading', false);
                });
            });
        } else {
          return false;
        }
      });
    },
    goPay() {
      this.getPaymentData(this.ruleForm.id);
    },
    getPaymentData(id) {
      // 支付订单
      if (this.ruleForm.transType === "1") {
        this.$store.commit('pageLoading', true);
        request
          .get(this.getPaymentUrl, { id: id })
          .then(data => {
            this.$store.commit('pageLoading', false);
            // 获取订单信息成功后，跳转到支付页面
            this.$router.push({
              path: data.retUrl,
              query: data
            });
          })
          .catch(error => {
            _this.$message.error(error);
            this.$store.commit('pageLoading', false);
          });
      } else {
        // 退款订单
        this.$message.error("该订单无法进行支付");
      }
    }
  },
  async created() {
    this.source.exhibitCategories = await kindo.dictionary.get('exhibitType');
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
</style>