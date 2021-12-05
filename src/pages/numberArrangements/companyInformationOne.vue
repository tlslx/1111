<template>
  <div class="aa">
      <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
        <el-form-item label="所属交易团：" prop="name">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商（协）会会员号：" prop="region">
          <el-form label-position="" label-width="auto">
            <el-form-item label="中国进出口纺织品商会：">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="中国医药保健品进出口商会：" style="margin-top: 20px;">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="中国食品土畜进出口商会：" style="margin-top: 20px;">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="中国轻工工艺品进出口商会：" style="margin-top: 20px;">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="中国五矿化工进出口商会：" style="margin-top: 20px;">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="中国机电产品进出口商会：" style="margin-top: 20px;">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item label="中国外商投资企业商会：" style="margin-top: 20px;">
              <el-input style="width: 300px;"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="公司简称（英文）：" required>
          <el-input style="width: 400px;" placeholder="请输入公司英文简称"></el-input>
        </el-form-item>
        <el-form-item label="公司名称分词：" prop="delivery">
          <el-input style="width: 400px;" placeholder="请输入公司名称分词"></el-input>
        </el-form-item>
        <el-form-item label="是否上市公司：" prop="type">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="上市地点：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="股票代码：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入股票代码" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="企业属性：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业类型：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业营业执照注册号：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入企业营业执照注册号" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="企业统一社会信用代码：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入企业统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="法人代表：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入法人代表" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="公司成立年份：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入公司成立年份" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="注册资本（万人民币）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入注册资本" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="员工数量：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产部门人数：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="研发部门人数：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质监部门人数：" prop="resource">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂房面积（平方米）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入厂房面积" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="主营产品关键字（中文）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入主营产品关键字" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="主营产品关键字（英文）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入主营产品关键字" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="主营产品关键字（中文）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入主营产品关键字" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="上年度国内销售额（万人民币）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入上年度国内销售额" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="上年度出口额（万美元）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入上年度出口额" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号（万人民币）：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入纳税人识别号" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="贸易形式：" prop="type">
          <el-radio v-model="radio" label="1">OBM</el-radio>
          <el-radio v-model="radio" label="2">ODM</el-radio>
          <el-radio v-model="radio" label="3">OEM</el-radio>
        </el-form-item>
        <el-form-item label="公司LOGO：" prop="type">
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="warning">点击上传附件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="公司形象图：" prop="type">
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="warning">点击上传附件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="公司简介（中文）：">
          <el-input style="width: 400px;" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="公司简介（英文）：">
          <el-input style="width: 400px;" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="企业首次展时间（年）：" prop="type">
          <el-date-picker
            style="width: 400px;"
            v-model="value5"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm">确定</el-button>
          <el-button @click="resetForm">取消</el-button>
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
    },
    handlePreview(file) {
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

