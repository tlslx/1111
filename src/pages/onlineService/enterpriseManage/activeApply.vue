/**
 * @file 申请参加活动论坛
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="申请参加活动论坛" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px;" label="我想申请参加" prop="apply">
          <el-select style="width: 400px" v-model="ruleForm.apply" placeholder="商协会对外贸易交流论坛">
            <el-option label="商协会对外贸易交流论坛" value="shanghai"></el-option>
            <el-option label="中国" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="胡浩"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="ruleForm.sex" placeholder="男"></el-input>
        </el-form-item>
        <el-form-item label="证件号码" prop="cardNum">
          <el-input v-model="ruleForm.cardNum" placeholder="340***********7398"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNum">
          <el-input v-model="ruleForm.phoneNum" placeholder="130****2991"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position" placeholder="设计总监"></el-input>
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
        apply: "",
        name: "",
        sex: "",
        cardNum: "",
        phoneNum: "",
        position: ""
      },
      rules: {
        apply: [{ required: true, message: "请选择", trigger: "change" }],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请输入性别", trigger: "blur" }
        ],
        cardNum: [{ required: true, message: "请输入证件号码", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }]
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
  width: 400px;
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


