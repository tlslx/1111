/**
 * @file 新增展具二级分类
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新增展具二级分类" name="two">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item style="margin:30px 0px 12px 0px" label="一级类型名称：" prop="typeName">
          <el-select v-model="ruleForm.typeName" clearable>
            <el-option v-for="item in typeNames" :key="item.value" :label="item.label" :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级类型编号：" prop="secondTypeCode">
          <el-input v-model="ruleForm.secondTypeCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="二级类型名称：" prop="secondTypeName">
          <el-input v-model="ruleForm.secondTypeName" clearable></el-input>
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
      typeNames: [],
      ruleForm: {
        typeName: "",
        secondTypeCode: "",
        secondTypeName: ""
      },
      rules: {
        typeName: [{ required: true, message: "请选择", trigger: "change" }],
        secondTypeCode: [{ required: true, message: "请输入", trigger: "blur" }],
        secondTypeName: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListAllTwo().then(response => {
      for (let i in response) {
        _this.typeNames.push({
          value: i,
          label: response[i].typeName
        });
      }
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('categoryManagement', [])
  },
  methods: {
    ...mapActions('categoryManagement', ['addExhibitionClassInfo', 'selectListAllTwo']),
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