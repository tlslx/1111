/**
 * @file 添加库存增减
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加库存预警设置" name="three">
      <el-form :model="ruleForm" ref="ruleForm" label-width="200px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="届数：" prop="sessionNum">
          <el-select v-model="ruleForm.sessionNum" clearable>
            <el-option label="第122期" value="1"></el-option>
            <el-option label="第123期" value="2"></el-option>
            <el-option label="第124期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数：" prop="issueNum">
          <el-select v-model="ruleForm.issueNum" clearable>
            <el-option label="1期" value="1"></el-option>
            <el-option label="2期" value="2"></el-option>
            <el-option label="3期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域：" prop="area">
          <el-input v-model="ruleForm.area" placeholder="02122052"></el-input>
        </el-form-item>
        <el-form-item label="库存：" prop="stockNum">
          <el-input v-model="ruleForm.stockNum" placeholder="四米帐篷"></el-input>
        </el-form-item>
        <el-form-item label="预警值：" prop="warmNum">
          <el-input v-model="ruleForm.warmNum" placeholder="张"></el-input>
        </el-form-item>
        <el-form-item label="展材名称：" prop="materialName">
          <el-select v-model="ruleForm.materialName" clearable>
            <el-option label="4平方米洽谈桌" value="1"></el-option>
            <el-option label="5平方米洽谈桌" value="2"></el-option>
            <el-option label="6平方米洽谈桌" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展材数量：" prop="materialQuantity">
          <el-input v-model="ruleForm.materialQuantity" placeholder="2900*495*4200"></el-input>
        </el-form-item>
        <el-form-item label="展材预留数量：" prop="materialKeepQuantity">
          <el-input v-model="ruleForm.materialKeepQuantity" placeholder="2900mm"></el-input>
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
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: "three",
      dialogImageUrl: '',
      dialogVisible: false,
      ruleDialogVisible: false,
      sessionNums: [], // 届数字典
      issueNums: [], // 期数字典
      materialNames: [], //展材名称字典
      // imgUrl: "",
      ruleForm: {
        sessionNum: "",
        issueNum: "",
        area: "",
        stockNum: "",
        warmNum: "",
        materialName: "",
        materialQuantity: "",
        materialKeepQuantity: ""
      },
      rules: {
        sessionNum: [{ required: true, message: "请选择", trigger: "change" }],
        issueNum: [{ required: true, message: "请选择", trigger: "change" }],
        area: [{ required: true, message: "请输入", trigger: "blur" }],
        stockNum: [{ required: true, message: "请输入", trigger: "blur" }],
        warmNum: [{ required: true, message: "请输入", trigger: "blur" }],
        materialName: [{ required: true, message: "请输入", trigger: "blur" }],
        materialQuantity: [{ required: true, message: "请输入", trigger: "blur" }],
        materialKeepQuantity: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('stockFlu', []),
    ...mapGetters('dictionary', ['dictionaryData']),
    stockFluQuery() {
      return {
        sessionNum: this.queryForm.sessionNum,
        issueNum: this.queryForm.issueNum,
        area: this.queryForm.area,
        warmNum: this.queryForm.warmNum
      };
    }
  },
  // async beforeCreate() {
  //   this.sessionNums = await kindo.dictionary.get('sessionNums'); // 届数
  //   this.issueNums = await kindo.dictionary.get('issueNums'); // 展期
  //   this.areas = await kindo.dictionary.get('areas'); // 区域
  // },
  methods: {
    ...mapActions('stockFlu', ['addStockWarmInfo']),
    handleClick(tab, event) {

    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addStockWarmInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/stockFlu');
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
