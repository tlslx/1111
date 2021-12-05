/**
 * @file 审核办证人员资料2
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="审核办证人员资料" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item
          style="margin:30px 0px 12px 0px"
          label="企业广交会编码："
          prop="enterpriseGjhCode"
        >98327498236492</el-form-item>
        <el-form-item label="姓名：" prop="name">张雪</el-form-item>
        <el-form-item label="性别：" prop="sex">女</el-form-item>
        <el-form-item label="证件类型：" prop="documentType">中华人民共和国身份证</el-form-item>
        <el-form-item label="身份证件号码：" prop="idCard">237*********8831</el-form-item>
        <el-form-item label="证件照片：" prop="idCardPhoto">
          <img src="\static\img\head.jpg" width="60" height="80">
          <img src="\static\img\head.jpg" width="60" height="80">
        </el-form-item>
        <el-form-item label="办证专用照：" prop="certificateLicense">
          <img src="\static\img\head.jpg" width="60" height="80">
          <img src="\static\img\head.jpg" width="60" height="80">
        </el-form-item>
        <el-form-item label="电话：" prop="phoneNum">173****7131</el-form-item>
        <el-form-item label="E-mail：" prop="mail">1837381742472@qq.com</el-form-item>
        <el-form-item label="审核意见：" prop="checkReason">
          <el-input :rows="4" type="textarea" v-model="ruleForm.checkReason"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">通过</el-button>
          <el-button class="btn2" @click="resetForm('ruleForm')">不通过</el-button>
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
        enterpriseGjhCode: "",
        name: "",
        sex: "",
        documentType: "",
        idCard: "",
        idCardPhoto: "",
        certificateLicense: "",
        phoneNum: "",
        mail: "",
        checkReason: ""
      },
      rules: {
        enterpriseGjhCode: [{ required: true, message: "", trigger: "blur" }],
        name: [{ required: true, message: "", trigger: "blur" }],
        sex: [{ required: true, message: "", trigger: "blur" }],
        documentType: [{ required: true, message: "", trigger: "blur" }],
        idCard: [{ required: true, message: "", trigger: "blur" }],
        idCardPhoto: [{ required: true, message: "", trigger: "blur" }],
        certificateLicense: [{ required: true, message: "", trigger: "blur" }],
        phoneNum: [{ required: true, message: "", trigger: "blur" }],
        mail: [{ required: true, message: "", trigger: "blur" }],
        checkReason: [{ required: true, message: "", trigger: "blur" }]
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
  background-color: rgb(0, 102, 255);
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


