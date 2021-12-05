/**
 * @file VIP企业申请会议室
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="申请广交会展馆会议室" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="eli_attendNum" style="margin:30px 0px 12px 0px" label="参会人数：" prop="attendNum">
          <el-input maxlength="3" v-model="ruleForm.attendNum" placeholder="请输入参会人数"></el-input>
        </el-form-item>
        <el-form-item label="使用时间：" required>
          <el-col :span="11">
             <el-date-picker
               prop="date1"
               type="date"
               placeholder="选择日期"
               v-model="ruleForm.date1"
               style="width: 100%;"
               align="right"
             ></el-date-picker>
          </el-col>
          <el-col class="line" style="text-align: center;" :span="2">至</el-col>
          <el-col :span="11">
              <el-date-picker
                prop="date2"
                type="date"
                placeholder="选择时间"
                v-model="ruleForm.date2"
                style="width: 100%;"
              ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="会议配套：" prop="meetingPackage">
          <el-input v-model="ruleForm.meetingPackage" placeholder="请填写会议配套要求"></el-input>
        </el-form-item>

        <el-form-item label="会议内容：" prop="meetingContent">
          <el-input :rows="4" type="textarea" v-model="ruleForm.meetingContent"></el-input>
        </el-form-item>

        <el-form-item label="备注：" prop="note">
          <el-input v-model="ruleForm.note"></el-input>
        </el-form-item>

        <el-form-item label="其他要求：" prop="otherRequirements">
          <el-input v-model="ruleForm.otherRequirements"></el-input>
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
        attendNum: "",
        date1: "",
        date2: "",
        meetingPackage: "",
        meetingContent: "",
        note: "",
        otherRequirements: ""
      },
      rules: {
        attendNum: [
          { required: true, message: "请输入参会人数", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        meetingPackage: [
          { required: true, message: "请填写会议配套要求", trigger: "blur" }
        ],
        meetingContent: [
          { required: true, message: "请填写会议内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
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
