<template>
  <div class="aa">
      <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
        <el-form-item label="品牌（商标）：" prop="name">
          <el-input style="width: 400px;" placeholder="已登记2个品牌（商标）"></el-input>
        </el-form-item>
        <el-form-item label="海关注册商标的国家及地区数量：">
          <el-input style="width: 400px;" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="国际/行业通行（个）：" required>
          <el-input style="width: 400px;" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="管理体系认证的数量：">
          <el-radio v-model="radio" label="1">ISO9000系列</el-radio>
          <el-radio v-model="radio" label="2">ISO14000系列</el-radio>
          <el-radio v-model="radio" label="3">SA8000</el-radio>
          <el-radio v-model="radio" label="4">OHSAS18000系列</el-radio>
          <el-radio v-model="radio" label="5">其他（请填写）</el-radio>
        </el-form-item>
        <el-form-item label="面向企业的（个）：" prop="type">
          <el-input style="width: 400px;" placeholder="请输入面向企业的个数"></el-input>
        </el-form-item>
        <el-form-item label="行业认证数量：" prop="resource">
          <el-radio v-model="radio" label="11">Oeko-Tex Standard 100</el-radio>
          <el-radio v-model="radio" label="22">HACCP</el-radio>
          <el-radio v-model="radio" label="33">CGMP</el-radio>
          <el-radio v-model="radio" label="44">ISO22000</el-radio>
          <el-radio v-model="radio" label="55">ISO/TS16949</el-radio>
          <el-radio v-model="radio" label="66">ISO13485</el-radio>
          <el-radio v-model="radio" label="77">其他（请填写）</el-radio>
        </el-form-item>
        <el-form-item label="面向产品/生产线的（个）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入面向产品/生产线的个数" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="行业认证数量：">
          <el-radio v-model="radio" label="111">CCC CB CCEE CCIE CE CECC CNAS</el-radio><br>
          <el-radio v-model="radio" label="222">COS CQC CSA EMC ETL FCC FDA</el-radio><br>
          <el-radio v-model="radio" label="333">GS HALAL JDMF KOSHER MPREII PCT PMDA</el-radio><br>
          <el-radio v-model="radio" label="444">PSE SAA SASO TGA TUV TCO UL</el-radio><br>
          <el-radio v-model="radio" label="555">UPC USP WATERMARK WHO PQ 其他（请填写）</el-radio>
        </el-form-item>
        <el-form-item label="国家级奖励数量：">
          <el-input style="width: 400px;" placeholder="请输入国家级奖励数量" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="省级奖励数量：">
          <el-input style="width: 400px;" placeholder="请输入省级奖励数量" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="发明专利数：">
          <el-input style="width: 400px;" placeholder="请输入发明专利数"></el-input>
        </el-form-item>
        <el-form-item label="外观设计专利数：">
          <el-input style="width: 400px;" placeholder="请输入外观设计专利数" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">是否列入《中国高科技出口产品目录》</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm"> 确定 </el-button>
          <el-button @click="resetForm"> 取消 </el-button>
        </el-form-item>
      </el-form>
      <!-- 弹出框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <p style="text-align: center;">您的申请已提交成功！</p>
        <p slot="footer" style="text-align: center;">
          <el-button type="primary" @click="dialogVisible = false">确 认</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </p>
      </el-dialog>
      </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      checked: false,
      value5: "",
      fileList: [{ name: '', url: '' }],
      radio: "1",
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleClose() {},
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除${file.name}？`);
    },
    submitForm(formName) {
      this.dialogVisible = true;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        } 
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

