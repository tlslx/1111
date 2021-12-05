/**
 * @file 添加工单服务项目
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加工单服务项目" name="three">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="项目类型：" prop="project.projectName">
          <el-input v-model="ruleForm.project.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目细项：" prop="project.projectDetails">
          <el-input v-model="ruleForm.project.projectDetails"></el-input>
        </el-form-item>
        <el-form-item label="负责部门：" prop="workAcceptorHall.deptName">
          <el-select v-model="ruleForm.workAcceptorHall.deptName" clearable>
            <el-option label="工程公司" value="1"></el-option>
            <el-option label="多个部门" value="2"></el-option>
            <el-option label="装修公司" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责科室/班组：" prop="workAcceptorHall.groupName">
          <el-select v-model="ruleForm.workAcceptorHall.groupName" clearable>
            <el-option label="工程部" value="1"></el-option>
            <el-option label="研发部" value="2"></el-option>
            <el-option label="后勤部" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域：" prop="project.area">
          <el-select v-model="ruleForm.project.area" clearable>
            <el-option label="A区" value="1"></el-option>
            <el-option label="B区" value="2"></el-option>
            <el-option label="C区" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人：" prop="workAcceptorHall.chargeName">
          <el-select v-model="ruleForm.workAcceptorHall.chargeName" clearable>
            <el-option label="王姐" value="1"></el-option>
            <el-option label="赵千" value="2"></el-option>
            <el-option label="李四" value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否需要自动派工：" prop="isForm">
          <el-select v-model="ruleForm.isForm" clearable>
            <el-option label="是" value="shi"></el-option>
            <el-option label="否" value="fou"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="内容模版：" prop="project.contentTemplate">
          <el-input v-model="ruleForm.project.contentTemplate" placeholder="请输入"></el-input>
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
      activeName: "three",
      deptNames: [],
      groupNames: [],
      areas: [],
      chargeNames: [],
      ruleForm: {
        project: {
          projectName: "",
          projectDetails: "",
          area: "",
          contentTemplate: ""
        },
        workAcceptorHall: {
          deptName: "",
          groupName: "",
          chargeName: ""
        }
      },
      rules: {
        project: {
          projectName: [{ required: true, message: "请输入", trigger: "blur" }],
          projectDetails: [{ required: true, message: "请输入", trigger: "blur" }],
          area: [{ required: true, message: "请选择", trigger: "change" }],
          contentTemplate: [{ required: true, message: "请输入", trigger: "blur" }]
        },
        workAcceptorHall: {
          deptName: [{ required: true, message: "请选择", trigger: "change" }],
          groupName: [{ required: true, message: "请选择", trigger: "change" }],
          chargeName: [{ required: true, message: "请选择", trigger: "change" }]
          // isForm: [{ required: true, message: "请选择", trigger: "change" }],
        }
      }
    };
  },
  computed: {
    ...mapGetters('orderSetting', []),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  async beforeCreate() {
    this.deptNames = await kindo.dictionary.get('deptNames');
    this.groupNames = await kindo.dictionary.get('groupNames');
    this.areas = await kindo.dictionary.get('areas');
    this.chargeNames = await kindo.dictionary.get('chargeNames');
  },
  methods: {
    ...mapActions('orderSetting', ['addInfo']),
    handleClick(tab, event) {

    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/serviceItemManagement');
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
