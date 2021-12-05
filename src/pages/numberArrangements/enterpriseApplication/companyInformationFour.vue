<template>
  <div class="aa">
      <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
        <el-form-item label="地址（中文）：" prop="name">
          <el-input style="width: 400px;" placeholder="请输入中文地址" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="地址（英文）：" prop="region">
          <el-input style="width: 400px;" placeholder="请输入英文地址" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：" prop="region">
          <el-input style="width: 400px;" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
        <el-form-item label="业务联系人姓名（中文）：" prop="delivery">
          <el-input style="width: 400px;" placeholder="请输入业务联系人中文姓名"></el-input><br>
          <el-radio v-model="radio" label="1">先生</el-radio>
          <el-radio v-model="radio" label="2">女士</el-radio>
        </el-form-item>
        <el-form-item label="职位：" prop="type">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话：" prop="resource">
          <el-input style="width: 60px;" placeholder="86"></el-input>
          <span>-</span>
          <el-input style="width: 60px;" placeholder="010"></el-input>
          <span>-</span>
          <el-input style="width: 100px;" placeholder="06972683"></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入手机号" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="传真：" prop="resource">
          <el-input style="width: 60px;" placeholder="86"></el-input>
          <span>-</span>
          <el-input style="width: 60px;" placeholder="010"></el-input>
          <span>-</span>
          <el-input style="width: 100px;" placeholder="06972683"></el-input>
        </el-form-item>
        <el-form-item label="业务联系电子邮箱：" prop="resource">
          <el-input style="width: 400px;" placeholder="请输入业务联系电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="广交会参展业务专用联系电子邮箱：" prop="desc">
          <el-input style="width: 400px;" placeholder="请输入广交会参展业务专用联系电子邮箱" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="网址：">
          <el-input style="width: 400px;" placeholder="请输入网址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我要求在<span style="color: #0000ff;">展商展品查询</span>中隐藏联系方式</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm">提交</el-button>
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
      checked: "",
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
        if (valid) {
          // console.log();
        } else {
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

