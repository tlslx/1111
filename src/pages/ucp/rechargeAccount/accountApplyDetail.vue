<template>
  <el-form :model="ruleForm" :ref="ruleForm" label-width="35%" width="100%">
    <el-row>
      <el-col :span="11">
        <el-form-item label="发票抬头：" prop="invoiceTitle">
          {{ruleForm.invoiceTitle}}
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="公司电话：" prop="companyTel">
          {{ruleForm.companyTel}}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="税号：" prop="taxNumber">
          {{ruleForm.taxNumber}}
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="信用证编码：" prop="creditLetterCode">
          {{ruleForm.creditLetterCode}}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="开户行名称：" prop="bankName">
          {{ruleForm.bankName}}
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="手机号：" prop="mobilePhoneNum">
          {{ruleForm.mobilePhoneNum}}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="开户行账号：" prop="bankAccountNum">
          {{ruleForm.bankAccountNum}}
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="邮箱：" prop="email">
          {{ruleForm.email}}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="发票接收方式：" prop="invoiceReceiveMethod">
          <template v-if="ruleForm.invoiceReceiveMethod==1">
            {{invoiceReceiveOption[1]}}
          </template>
          <template v-if="ruleForm.invoiceReceiveMethod==2">
            {{invoiceReceiveOption[2]}}
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="单位地址：" prop="companyAdd">
          {{ruleForm.companyAdd}}
        </el-form-item>
      </el-col>
    </el-row>

    <hr width="90%">

    <el-row>
      <el-col :span="11">
        <el-form-item label="预付款账号：" prop="rechargeAccountNum">
          {{ruleForm.rechargeAccountNum}}
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="激活时间：" prop="createDate">
          {{ruleForm.createDate}}
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="11">
        <el-form-item label="账户余额：" prop="accountBalance">
          <font color="red" style="font-size:25px"><strong>{{ruleForm.accountBalance}}</strong></font>元
        </el-form-item>
      </el-col>
      <el-col :span="11">
        <el-form-item label="状态：" prop="activeState" color="green">
          <template v-if="ruleForm.activeState==1">
            <font color="green">{{activeState[1]}}</font>
          </template>
          <template v-if="ruleForm.activeState==-1">
            <font color="green">{{activeState[2]}}</font>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="danger" @click="changeActiveState(-1)">停用</el-button>
      <el-button type="success" @click="changeActiveState(1)">启用</el-button>
      <el-button type="primary" @click="advanceRecharge()">充值</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      apiUrl: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/add",
      invoiceReceiveOption: { 1: "邮件接收", 2: "短信接收" },
      activeState: { 1: "已激活", 2: "已停用" },
      ruleForm: {
        id: "",
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
        rechargeAccountNum: "",
        createDate: "",
        accountBalance: "",
        activeState: ""
      }
    };
  },
  mounted: function () {
    this.loadData();
  },
  methods: {
    pageLoad() { },
    loadData() {
      let _this = this;
      let param = {};
      param.id = this.ruleForm.id;
      this.$http.get(kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getSingleById", param).then(
        function (res) {
          if (res) {
            _this.ruleForm = res;
          }
        },
        function () {
        }
      );
    },
    changeActiveState(state) {
      let _this = this;
      this.ruleForm.activeState = state;
      this.$http.postJson(kindo.config.api.unifiedCollectUrl + "/api/recharge/account/saveOrUpdate", _this.ruleForm).then(
        function (res) {
          if (res) {
            if (state === 1) {
              _this.$message({ message: "激活成功" });
            } else if (state === -1) {
              _this.$message({ message: "停用成功" });
            }

          }
        },
        function () {
        }
      );
    },
    advanceRecharge() {
      if (this.ruleForm.activeState === 1) {
        this.$router.push({
          path: "/recharge",
          query: { "rechargeAccountNum": this.ruleForm.rechargeAccountNum }
        });
      } else {
        this.$message({ message: "账号未激活" });
      }

    }

  },
  beforeMount() {
    var query = this.$route.query;
    this.ruleForm.id = query.rechargeAccountId;
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

