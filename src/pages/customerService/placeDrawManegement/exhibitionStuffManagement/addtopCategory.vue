/**
 * @file 新增展具一级分类
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新增展具一级分类" name="first">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item style="margin:30px 0px 12px 0px" label="类型编号：" prop="typeNumber">
          <el-input v-model="ruleForm.typeNumber" placeholder="2"></el-input>
        </el-form-item>
        <el-form-item label="类型名称：" prop="typeName">
          <el-input v-model="ruleForm.typeName" placeholder="用电类展具"></el-input>
        </el-form-item>
        <el-form-item label="图层名称：" prop="layerName">
           <el-input v-model="ruleForm.layerName" placeholder="重型收割机C-12型"></el-input>
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
      ruleForm: {
        typeNumber: "",
        typeName: "",
        layerName: ""
      },
      rules: {
        typeNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        typeName: [{ required: true, message: "请输入", trigger: "blur" }],
        layerName: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('categoryManagement', [])
  },
  methods: {
    ...mapActions('categoryManagement', ['addExhibitionClassInfo']),
    handleClick(tab, event) {
      
    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addExhibitionClassInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/categoryManagement');
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


