/**
 * @file 审核VIP证件申请（接待证）
 */
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="审核VIP证件申请" name="0">
        <div class="div_hint">企业可申请期数为2期，当前可申请证件数量为3，已申请证件数量为2。</div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="企业名称:" prop="companyName">广州萌果科技有限公司</el-form-item>
          <el-form-item label="姓名:" prop="name">胡浩</el-form-item>
          <el-form-item label="性别:" prop="sex">男</el-form-item>
          <el-form-item label="证件类型:" prop="documentType">居民身份证</el-form-item>
          <el-form-item label="证件号码:" prop="cardNumber">340***********1621</el-form-item>
          <el-form-item label="头像照片:" prop="headImg">
            <img src="\static\img\head.jpg" width="60" height="80">
            <img src="\static\img\head.jpg" width="60" height="80">
          </el-form-item>
          <el-form-item label="身份证照片:" prop="cardImg">
            <img src="\static\img\head.jpg" width="60" height="80">
            <img src="\static\img\head.jpg" width="60" height="80">
          </el-form-item>
          <el-form-item label="期数:" prop="nper">1</el-form-item>
          <el-form-item label="开始时间:" prop="startTime">2017/10/29</el-form-item>
          <el-form-item label="结束时间:" prop="endTime">2018/2/18</el-form-item>
          <el-form-item label="查看附件:" prop="checkAttachment">
            <el-button size="medium">点击下载附件</el-button>
          </el-form-item>
          <el-form-item label="审核意见:" prop="checkOpinion">
            <el-input :rows="4" type="textarea" v-model="ruleForm.checkOpinion"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn1" @click="submitForm('ruleForm')">通过</el-button>
            <el-button class="btn2" @click="resetForm('ruleForm')">不通过</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "0",
      ruleForm: {
        companyName: "",
        name: "",
        sex: "",
        documentType: "",
        cardNumber: "",
        headImg: "",
        cardImg: "",
        nper: "",
        startTime: "",
        endTime: "",
        checkAttachment: "",
        checkOpinion: ""
      },
      rules: {
        companyName: [{ required: true, message: "请选择", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        documentType: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        cardNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        headImg: [{ required: true, message: " ", trigger: "blur" }],
        cardImg: [{ required: true, message: " ", trigger: "blur" }],
        nper: [{ required: true, message: "", trigger: "blur" }],
        startTime: [{ required: true, message: "", trigger: "blur" }],
        endTime: [{ required: true, message: "", trigger: "blur" }]
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
  left: 40%;
  margin-top: 30px;
}
.el-form-item {
  width: 400px;
  position: relative;
  left: 30%;
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


