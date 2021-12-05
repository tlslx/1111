/**
 * @file 企业申请展位布局类型调整
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="申请展位布展类型调整" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 12px 0px" label="展位调整布展类型：" prop="boothAdjustLayoutType">
          <el-select v-model="ruleForm.boothAdjustLayoutType" placeholder="标摊调整特装">
            <el-option label="标摊调整特装" value="generalBooth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionArea" style="position: relative;">
          <el-select v-model="ruleForm.exhibitionArea" placeholder="日用品展区">
            <el-option label="日用品展区" value="commodityBooth"></el-option>
            <el-option label="户外运动展区" value="digitalBooth"></el-option>
            <el-option label="数码产品展区" value="videoGameBooth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调整数量：" prop="adjustNum">
          <el-input-number
            v-model="ruleForm.adjustNum"
            size="medium"
            @change="handleChange"
            :min="1"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="调整原因：" prop="adjustReason">
          <el-input :rows="4" type="textarea" v-model="ruleForm.adjustReason"></el-input>
        </el-form-item>
        <el-form-item label="展位号：" prop="boothNo">
          <el-input v-model="ruleForm.boothNo" placeholder="C.2240"></el-input>
        </el-form-item>
        <el-form-item label="打印上传：" prop="printUpload">
          <el-button>打印</el-button>
          <el-button>上传</el-button>
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
        boothAdjustLayoutType: "",
        exhibitionArea: "",
        adjustNum: 1,
        adjustReason: "",
        boothNo: "",
        printUpload: ""
      },
      rules: {
        boothAdjustLayoutType: [{ required: true, message: "请选择", trigger: "change" }],
        exhibitionArea: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        adjustNum: [{ required: true, message: "请选择", trigger: "blur" }],
        boothNo: [{ required: true, message: "请输入", trigger: "blur" }],
        printUpload: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(tab, event) {}
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


