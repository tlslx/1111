/**
 * @file 个人用户的详细资料
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个人用户的详细资料" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px;" label="注册类型：" prop="registerType">
          <el-select v-model="ruleForm.registerType" placeholder="个人">
            <el-option label="个人" value="personal"></el-option>
            <el-option label="企业" value="enterprise"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱信息"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-input v-model="ruleForm.sex" placeholder="请填写性别"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="phoneNum">
          <el-input v-model="ruleForm.phoneNum" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <el-input v-model="ruleForm.confirmPassword" placeholder="请再次确认密码"></el-input>
        </el-form-item>
        <el-checkbox class="cb_confirm" label="请仔细阅读隐私条款后确认并提交" name="type"></el-checkbox>
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
        registerType: "",
        email: "",
        name: "",
        sex: "",
        phoneNum: "",
        password: "",
        confirmPassword: ""
      },
      rules: {
        registerType: [
          { required: true, message: "请选择注册类型", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入请输入邮箱信息", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {

    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.cb_confirm{
  position: relative;
  left: 28%;
  margin-top: 20px;
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


