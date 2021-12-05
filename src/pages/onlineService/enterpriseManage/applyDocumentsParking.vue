/**
 * @file VIP企业申请证件（内停车证）
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="申请内停车证" name="0">
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
          <el-input maxlength="3" v-model="ruleForm.companyName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="证件类型：" prop="documentType">
          <el-select v-model="ruleForm.documentType" placeholder="内停车证">
            <el-option label="筹展证" value="outlaws"></el-option>
            <el-option label="撤展证" value="moveIn"></el-option>
            <el-option label="接待证" value="reception"></el-option>
            <el-option label="内停车证" value="parking"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车型（座）：" prop="models">
          <el-input v-model="ruleForm.models" placeholder="小型汽车"></el-input>
        </el-form-item>
        <el-form-item label="车牌号码：" prop="busNumber">
          <el-input v-model="ruleForm.busNumber" placeholder="皖B83792"></el-input>
        </el-form-item>
        <el-form-item label="期数：" prop="nper">
          <el-select v-model="ruleForm.nper" placeholder="1">
            <el-option label="1" value="one"></el-option>
            <el-option label="2" value="two"></el-option>
            <el-option label="3" value="there"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进馆开始时间：" required>
          <el-date-picker
            prop="enterStartTime"
            type="date"
            placeholder="2017/10/29"
            v-model="ruleForm.enterStartTime"
            style="width: 100%;"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="进馆结束时间：" required>
          <el-date-picker
            prop="enterEndTime"
            type="date"
            placeholder="2018/02/18"
            v-model="ruleForm.enterEndTime"
            style="width: 100%;"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="驾驶人姓名：" prop="driverName">
          <el-input v-model="ruleForm.driverName" placeholder="张娇"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="cardNumber">
          <el-input v-model="ruleForm.cardNumber" placeholder="340*********1823"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phoneNumber">
          <el-input v-model="ruleForm.driverName" placeholder="18736281932" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="停车地点：" prop="parkingPlace">
          <el-checkbox-group v-model="ruleForm.parkingPlace">
            <el-checkbox label="A区车库" name="packing_A"></el-checkbox>
            <el-checkbox label="B区车库" name="packing_B"></el-checkbox>
            <el-checkbox label="C区车库" name="packing_C"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="通行区域：" prop="trafficArea">
          <el-input v-model="ruleForm.trafficArea"></el-input>
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
        models: "",
        busNumber: "",
        nper: "",
        enterStartTime: "",
        enterEndTime: "",
        driverName: "",
        cardNumber: "",
        phoneNumber: "",
        parkingPlace: [],
        trafficArea: "",
        checkAttachment: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        documentType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        models: [
          { required: true, message: "请输入车型（座）", trigger: "blur" }
        ],
        busNumber: [
          { required: true, message: "请输入车牌号码", trigger: "blur" }
        ],
        nper: [{ required: true, message: "请选择期数", trigger: "change" }],
        enterStartTime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        enterEndTime: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        driverName: [
          { required: true, message: "请驾驶人姓名", trigger: "blur" }
        ],
        cardNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        parkingPlace: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个停车场",
            trigger: "change"
          }
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
