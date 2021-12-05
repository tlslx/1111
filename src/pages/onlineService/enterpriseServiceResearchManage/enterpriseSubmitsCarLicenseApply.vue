/**
 * @file 企业管理员提交车证申请
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业管理员提交证件申请" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="期数：" prop="nper">
          <el-input v-model="ruleForm.nper" placeholder="二期"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-select v-model="ruleForm.name" placeholder="张扬">
            <el-option label="张扬" value="zhangyang"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="女">
            <el-option label="男" value="boy"></el-option>
            <el-option label="女" value="girl"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证件号码：" prop="idCard">
          <el-input v-model="ruleForm.idCard" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="办证专用照片:" prop="certificateLicense">
          <img src="\static\img\head.jpg" width="60" height="80">
          <img src="\static\img\head.jpg" width="60" height="80">
        </el-form-item>
        <el-form-item label="车牌号：" prop="licensePlateNum">
          <el-input v-model="ruleForm.licensePlateNum" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="车证类型：" prop="carCardType">
          <el-select v-model="ruleForm.carCardType" placeholder="撤展车证">
            <el-option label="撤展车证" value="moveIn"></el-option>
            <el-option label="筹展车证" value="outlaws"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="司机手机号：" prop="driverPhoneNum">
          <el-input v-model="ruleForm.driverPhoneNum" placeholder="请输入" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="录入人联系电话：" prop="enterContactNum">
          <el-input v-model="ruleForm.enterContactNum" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">提交</el-button>
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
        nper: "",
        name: "",
        sex: "",
        idCard: "",
        certificateLicense: "",
        licensePlateNum: "",
        carCardType: "",
        driverPhoneNum: "",
        enterContactNum: ""
      },
      rules: {
        nper: [{ required: true, message: "", trigger: "blur" }],
        name: [{ required: true, message: "", trigger: "change" }],
        sex: [{ required: true, message: "", trigger: "change" }],
        idCard: [{ required: true, message: "", trigger: "blur" }],
        certificateLicense: [{ required: true, message: "", trigger: "blur" }],
        licensePlateNum: [{ required: true, message: "", trigger: "blur" }],
        carCardType: [{ required: true, message: "", trigger: "change" }],
        driverPhoneNum: [{ required: true, message: "", trigger: "blur" }],
        enterContactNum: [{ required: true, message: "", trigger: "blur" }]
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


