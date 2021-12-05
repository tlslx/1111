/**
 * @file 添加标准展位展具配置
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加标准展位展具配置" name="three">
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
        <el-form-item label="展区编号：" prop="exhibitionAreaNumber">
          <el-input v-model="ruleForm.exhibitionAreaNumber"></el-input>
        </el-form-item>
        <el-form-item label="展区名称：" prop="exhibitionAreaName">
          <el-input v-model="ruleForm.exhibitionAreaName"></el-input>
        </el-form-item>
        <el-form-item label="规标准展位长度（毫米）：" prop="standardBoothLength">
          <el-input v-model="ruleForm.standardBoothLength"></el-input>
        </el-form-item>
        <el-form-item label="标准展位宽度（毫米）：" prop="standardBoothWidth">
          <el-input v-model="ruleForm.standardBoothWidth"></el-input>
        </el-form-item>
        <el-form-item label="展具配置费限额（元）：" prop="configurationFeeLimit">
          <el-input v-model="ruleForm.configurationFeeLimit                                                                                                                                                   " placeholder="2900*495*4200"></el-input>
        </el-form-item>
        <el-form-item label="默认配置方案：" prop="defaultSchemeName">
          <el-input v-model="ruleForm.defaultSchemeName"></el-input>
        </el-form-item>
        <el-form-item label="方案编码：" prop="schemeCode">
          <el-input v-model="ruleForm.schemeCode"></el-input>
        </el-form-item>
        <el-form-item label="方案名称：" prop="programName">
          <el-input v-model="ruleForm.programName"></el-input>
        </el-form-item>
        <el-form-item label="配置效果图：" prop="rendering">
          <el-upload
            :action="uploadUrl"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="配置图：" prop="configurationDiagram">
          <el-button type="text" @click="ruleDialogVisible = true">修改配置</el-button>
          <el-dialog title="配置图" :visible.sync="ruleDialogVisible" width="70%">
            <el-form label-width="70px">
              <el-form-item class="el-form-item-btn">
                <el-button @click="ruleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="ruleDialogVisible = false">保 存</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')">保存</el-button>
          <el-button class="btn2" @click="toBack">关闭</el-button>
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
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile',
      activeName: "three",
      dialogImageUrl: '',
      dialogVisible: false,
      ruleDialogVisible: false,
      sessionNums: [], // 届数字典
      issueNums: [], // 期数字典
      ruleForm: {
        sessionNum: "",
        issueNum: "",
        exhibitionAreaNumber: "",
        exhibitionAreaName: "",
        standardBoothLength: "",
        standardBoothWidth: "",
        configurationFeeLimit: "",
        defaultSchemeName: "",
        schemeCode: "",
        programName: "",
        rendering: "",
        configurationDiagram: ""
      },
      rules: {
        sessionNum: [{ required: true, message: "请选择", trigger: "change" }],
        issueNum: [{ required: true, message: "请选择", trigger: "change" }],
        exhibitionAreaNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        exhibitionAreaName: [{ required: true, message: "请输入", trigger: "blur" }],
        standardBoothLength: [{ required: true, message: "请输入", trigger: "blur" }],
        standardBoothWidth: [{ required: true, message: "请输入", trigger: "blur" }],
        configurationFeeLimit: [{ required: true, message: "请输入", trigger: "blur" }],
        defaultSchemeName: [{ required: true, message: "请输入", trigger: "blur" }],
        schemeCode: [{ required: true, message: "请输入", trigger: "blur" }],
        programName: [{ required: true, message: "请选择", trigger: "change" }],
        rendering: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('sheme', []),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  methods: {
    ...mapActions('sheme', ['addEquipmentConfigurationInfo']),
    handleClick(tab, event) {

    },
    handleRemove(file, fileList) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 表单提交
    submitForm(formName) {
      // 校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 新增
          this.addEquipmentConfigurationInfo(this.ruleForm).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            });
            this.$router.push('/sheme');
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
.demo-ruleForm{
  margin:30px 0px 12px 0px;
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
