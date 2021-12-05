/**
 * @file 申请海关商品编码对应展区调整（前台）
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="申请海关商品编码对应展区调整" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="企业名称：" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="广东萌果科技有限公司"></el-input>
        </el-form-item>
        <el-form-item label="企业广交会编码：" prop="enterpriseGjhCode">
          <el-input v-model="ruleForm.enterpriseGjhCode" placeholder="98327498236492"></el-input>
        </el-form-item>
        <el-form-item label="交易团：" prop="tradeGroup">
          <el-input v-model="ruleForm.tradeGroup" placeholder="深圳团"></el-input>
        </el-form-item>
        <el-form-item label="商协会：" prop="businessAssociation">
          <el-input v-model="ruleForm.businessAssociation" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="海关商品编码：" prop="customsCommodityCode">
          <el-input v-model="ruleForm.customsCommodityCode" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="对应商品名称：" prop="productName">
          <el-input v-model="ruleForm.productName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="建议增加展区：" prop="suggestedAddExhibition">
          <el-input v-model="ruleForm.suggestedAddExhibition" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="建议原因：" prop="recommendReason">
          <el-input :rows="4" type="textarea" v-model="ruleForm.recommendReason"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button type="primary" class="btn1" @click="submitForm('ruleForm')">确定</el-button>
          <!-- <el-button class="btn2" @click="resetForm">取消</el-button> -->
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
        suggestedAddExhibition: "",
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
        productName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        suggestedAddExhibition: [
          { required: true, message: "请输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    }
    // resetForm() {
    // }
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
  left: 30%;
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


