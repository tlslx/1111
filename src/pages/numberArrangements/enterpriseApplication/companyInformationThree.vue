<template>
  <div class="aa">
      <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
        <el-form-item label="参展目的（多选）：" prop="name">
          <el-checkbox v-model="checked">出口成交</el-checkbox>
          <el-checkbox v-model="checked">结识新客户联系老客户</el-checkbox>
          <el-checkbox v-model="checked">展示企业形象</el-checkbox>
          <el-checkbox v-model="checked">获取市场信息</el-checkbox>
          <el-checkbox v-model="checked">推出新产品</el-checkbox>
        </el-form-item>
        <el-form-item label="是否有内贸业务：" prop="region">
          <el-select style="width: 400px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai">5-10人</el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上年度出口额前三位客户的国别或地区：">
          <el-select style="width: 150px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai">印度</el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select style="width: 150px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai">尼日利亚</el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select style="width: 150px;" v-model="ruleForm.name" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai">中非共和国</el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主要目标市场（多选）：" prop="delivery">
          <el-checkbox v-model="checked">非洲</el-checkbox>
          <el-checkbox v-model="checked">大洋洲</el-checkbox>
          <el-checkbox v-model="checked">美加</el-checkbox>
          <el-checkbox v-model="checked">拉美</el-checkbox>
          <el-checkbox v-model="checked">俄罗斯</el-checkbox>
          <br>
          <el-checkbox v-model="checked">欧盟</el-checkbox>
          <el-checkbox v-model="checked">欧洲其他国家</el-checkbox>
          <el-checkbox v-model="checked">日韩</el-checkbox>
          <el-checkbox v-model="checked">港澳台</el-checkbox>
          <el-checkbox v-model="checked">中东</el-checkbox>
          <br>
          <el-checkbox v-model="checked">东南亚</el-checkbox>
          <el-checkbox v-model="checked">南亚</el-checkbox>
          <el-checkbox v-model="checked">中亚</el-checkbox>
          <el-checkbox v-model="checked">其他（请注明）</el-checkbox>
          <el-input style="width: 100px;" placeholder="a343" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="主要目标客户类型（多选）：" prop="type">
          <el-checkbox v-model="checked">制造商</el-checkbox>
          <el-checkbox v-model="checked">贸易商</el-checkbox>
          <el-checkbox v-model="checked">分销商</el-checkbox>
          <el-checkbox v-model="checked">代理商</el-checkbox>
          <br>
          <el-checkbox v-model="checked">批发商</el-checkbox>
          <el-checkbox v-model="checked">零售商</el-checkbox>
          <el-checkbox v-model="checked">其他（请注明）</el-checkbox>
          <el-input style="width: 100px;" placeholder="4344" v-model="ruleForm.desc"></el-input>
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

