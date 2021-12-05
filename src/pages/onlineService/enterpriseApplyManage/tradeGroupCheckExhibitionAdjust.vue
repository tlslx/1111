/**
 * @file 交易团审核展区调整
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="交审核展区调整" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="企业名称：" prop="companyName">广东萌果科技有限公司</el-form-item>
        <el-form-item label="企业广交会编码：" prop="enterpriseGjhCode">98327498236492</el-form-item>
        <el-form-item label="交易团：" prop="tradeGroup">广州市交易团</el-form-item>
        <el-form-item label="商协会：" prop="businessAssociation">日用品商协会</el-form-item>
        <el-form-item label="海关商品编码：" prop="customsCommodityCode">9378653187318739000</el-form-item>
        <el-form-item label="对应商品名称：" prop="productName">萌果高端纸巾</el-form-item>
        <el-form-item label="海关注册编码：" prop="customsRegistrationCode">1876781</el-form-item>
        <el-form-item label="建议原因：" prop="recommendReason">
          <el-input :rows="4" type="textarea" v-model="ruleForm.recommendReason"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">确定</el-button>
          <el-button class="btn2" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        companyName: "",
        enterpriseGjhCode: "",
        tradeGroup: "",
        businessAssociation: "",
        customsCommodityCode: "",
        productName: "",
        customsRegistrationCode: "",
        recommendReason: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        enterpriseGjhCode: [
          { required: true, message: "请输入企业广交会编码", trigger: "blur" }
        ],
        tradeGroup: [
          { required: true, message: "请输入交易团名称", trigger: "blur" }
        ],
        businessAssociation: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        customsCommodityCode: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        productName: [{ required: true, message: "请输入", trigger: "blur" }],
        customsRegistrationCode: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style scoped>
.el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.btn1 {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
</style>


