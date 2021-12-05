/**
 * @file 填写咨询投诉报障内容
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="填写咨询投诉报障内容" name="two">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item style="margin:30px 0px 12px 0px" label="咨询投诉类型：" prop="consultationComplaintType">
          <el-select v-model="ruleForm.consultationComplaintType" clearable>
            <el-option label="咨询" value="1"></el-option>
            <el-option label="投诉" value="2"></el-option>
            <el-option label="保障" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" prop="contactNumber">
          <el-input v-model="ruleForm.contactNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input v-model="ruleForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="问题描述：" prop="problemDescription">
          <el-input type="textarea" v-model="ruleForm.problemDescription"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">提交</el-button>
          <el-button class="btn2" @click="toBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "two",
      ruleForm: {
        consultationComplaintType: "",
        contactNumber: "",
        email: "",
        title: "",
        problemDescription: ""
      },
      rules: {
        consultationComplaintType: [{ required: true, message: "请选择", trigger: "change" }],
        contactNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        email: [{ required: true, message: "请输入", trigger: "blur" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        problemDescription: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('submissionOrders', [])
  },
  methods: {
    ...mapActions('submissionOrders', ['addComplaintInfo', 'selectListAllTwo']),
    handleClick(tab, event) {

    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addComplaintInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/completeComplaintList');
          });
        } else {
          return false;
        }
      });
    },
    // 取消返回列表页
    toBack() {
      this.$router.back();
    }
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