/**
 * @file 添加展材
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加展材" name="first">
      <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm" :rules="rules">
        <el-form-item class="eli_attendNum" label="届数：" prop="sessionNum">
          <el-select v-model="ruleForm.sessionNum" clearable>
            <el-option label="第122期" value="1"></el-option>
            <el-option label="第123期" value="2"></el-option>
            <el-option label="第124期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="eli_attendNum" label="期数：" prop="issueNum">
          <el-select v-model="ruleForm.issueNum" clearable>
            <el-option label="1期" value="1"></el-option>
            <el-option label="2期" value="2"></el-option>
            <el-option label="3期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="eli_attendNum" label="展区：" prop="place">
          <el-select v-model="ruleForm.place" clearable>
            <el-option label="A区" value="A"></el-option>
            <el-option label="B区" value="B"></el-option>
            <el-option label="C区" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展材名称：" prop="syntheticMaterialName">
          <el-input v-model="ruleForm.syntheticMaterialName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="展材编号：" prop="exhibitionNumber">
          <el-input v-model="ruleForm.exhibitionNumber" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="展材规格：" prop="syntheticMaterialSpecifications">
          <el-input v-model="ruleForm.syntheticMaterialSpecifications" placeholder="请输入"></el-input>
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
      activeName: "first",
      sessionNums: [],
      issueNums: [],
      places: [],
      ruleForm: {
        sessionNum: "",
        issueNum: "",
        place: "",
        syntheticMaterialName: "",
        exhibitionNumber: "",
        syntheticMaterialSpecifications: ""
      },
      rules: {
        sessionNum: [{ required: true, message: "请选择", trigger: "change" }],
        issueNum: [{ required: true, message: "请选择", trigger: "change" }],
        place: [{ required: true, message: "请选择", trigger: "change" }],
        syntheticMaterialName: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        syntheticMaterialSpecifications: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('exhibitionToolManagement', []),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  // async beforeCreate() {
  //   this.sessionNums = await kindo.dictionary.get('sessionNums'); // 届数
  //   this.issueNums = await kindo.dictionary.get('issueNums'); // 展期
  //   this.places = await kindo.dictionary.get('places'); // 展区
  // },
  methods: {
    ...mapActions('exhibitionToolManagement', ['addCompositionMaterialInfo']),
    handleClick(tab, event) {

    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addCompositionMaterialInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/exhibitionToolManagement');
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
.demo-ruleForm {
  margin: 30px 0px 12px 0px;
}
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
