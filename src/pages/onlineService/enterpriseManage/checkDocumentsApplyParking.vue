/**
 * @file 审核VIP证件申请（内停车证）
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
          <el-form-item label="车型（座）:" prop="models">小型汽车</el-form-item>
          <el-form-item label="车牌号码:" prop="busNumber">皖B27382</el-form-item>
          <el-form-item label="证件类型:" prop="documentType">内停车证</el-form-item>
          <el-form-item label="期数:" prop="nper">1</el-form-item>
          <el-form-item label="进馆开始时间:" prop="enterStartTime">2017/10/29</el-form-item>
          <el-form-item label="进馆结束时间:" prop="enterEndTime">2018/2/18</el-form-item>
          <el-form-item label="驾驶人姓名:" prop="driverName">张娇</el-form-item>
          <el-form-item label="身份证号:" prop="cardNumber">340***********1621</el-form-item>
          <el-form-item label="手机号:" prop="phoneNumber">1872378623</el-form-item>
          <el-form-item label="停车地点:" prop="parkingPlace">C区车库</el-form-item>
          <el-form-item label="通行区域:" prop="trafficArea"></el-form-item>
          <el-form-item label="查看附件:" prop="checkAttachment">
           <el-button size="medium">点击下载附件</el-button>
          </el-form-item>
          <el-form-item label="审核意见:" prop="checkOpinion">
            <el-input :rows="4" type="textarea" v-model="ruleForm.checkOpinion"></el-input>
          </el-form-item>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn1" @click="submitForm('ruleForm')">提交</el-button>
            <el-button class="btn2" @click="resetForm('ruleForm')">取消</el-button>
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
        models: "",
        busNumber: "",
        documentType: "",
        nper: "",
        enterStartTime: "",
        enterEndTime: "",
        driverName: "",
        cardNumber: "",
        phoneNumber: "",
        parkingPlace: "",
        trafficArea: "",
        checkOpinion: ""
      },
      rules: {
        companyName: [{ required: true, message: "请选择", trigger: "blur" }],
        models: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        busNumber: [{ required: true, message: "请输入性别", trigger: "blur" }],
        documentType: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
        nper: [{ required: true, message: "", trigger: "blur" }],
        enterStartTime: [
          { required: true, message: "", trigger: "blur" }
        ],
        enterEndTime: [
          { required: true, message: "", trigger: "blur" }
        ],
        driverName: [
          { required: true, message: "", trigger: "blur" }
        ],
        cardNumber: [
          { required: true, message: "", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "", trigger: "blur" }
        ],
        parkingPlace: [
          { required: true, message: "", trigger: "blur" }
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
.div_hint{
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


