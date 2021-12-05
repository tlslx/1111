/**
 * @file VIP企业申请证件（筹展证）
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="申请筹展证" name="0">
      <div class="div_hint">企业可申请期数为2期，当前可申请证件数量为3，已申请证件数量为2。</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item
          class="eli_attendNum"
          style="margin:30px 0px 12px 0px"
          label="企业名称："
          prop="companyName"
        >
          <el-input maxlength="3" v-model="ruleForm.companyName" placeholder="广州萌果科技股份有限公司"></el-input>
        </el-form-item>
        <el-form-item label="证件类型：" prop="documentType">
          <el-select v-model="ruleForm.documentType" placeholder="内停车证">
            <el-option label="筹展证" value="outlaws"></el-option>
            <el-option label="撤展证" value="moveIn"></el-option>
            <el-option label="接待证" value="reception"></el-option>
            <el-option label="内停车证" value="parking"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="张芳"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-input v-model="ruleForm.sex" placeholder="男"></el-input>
        </el-form-item>
        <el-form-item label="身份证类型：" prop="cardType">
          <el-select v-model="ruleForm.cardType" placeholder="居名身份证">
            <el-option label="居名身份证" value="card"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="cardNumber">
          <el-input v-model="ruleForm.cardNumber" placeholder="340*********1823"></el-input>
        </el-form-item>
        <el-form-item label="上传头像照片:" prop="headImg">
          <img src="\static\img\head.jpg" width="60" height="80">
          <img src="\static\img\head.jpg" width="60" height="80">
        </el-form-item>
        <el-form-item label="上传身份证照片:" prop="cardImg">
          <img src="\static\img\head.jpg" width="60" height="80">
          <img src="\static\img\head.jpg" width="60" height="80">
        </el-form-item>
        <el-form-item label="期数：" prop="nper">
          <el-select v-model="ruleForm.nper" placeholder="1">
            <el-option label="1" value="one"></el-option>
            <el-option label="2" value="two"></el-option>
            <el-option label="3" value="there"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" required>
          <el-date-picker
            prop="startTime"
            type="date"
            placeholder="2017/10/29"
            v-model="ruleForm.startTime"
            style="width: 100%;"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" required>
          <el-date-picker
            prop="endTime"
            type="date"
            placeholder="2018/02/18"
            v-model="ruleForm.endTime"
            style="width: 100%;"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上传附件:" prop="checkAttachment">
          <el-button size="medium">点击上传附件</el-button>
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
      activeName: "0",
      ruleForm: {
        companyName: "",
        documentType: "",
        name: "",
        sex: "",
        cardType: "",
        cardNumber: "",
        headImg: "",
        cardImg: "",
        nper: "",
        startTime: "",
        endTime: "",
        checkAttachment: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        documentType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请输入性别", trigger: "blur" }
        ],
        cardType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        cardNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        headImg: [{ required: true, message: " ", trigger: "blur" }],
        cardImg: [{ required: true, message: " ", trigger: "blur" }]
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
.div_hint {
  color: red;
  position: relative;
  left: 30%;
  margin-top: 30px;
}
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 26%;
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
