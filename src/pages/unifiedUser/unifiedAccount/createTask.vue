<style lang="less" scoped>
.create-task {
  .task-body {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .el-form-item {
    text-align: center;
    margin: 20px 0;
  }
  .el-col-2 {
    text-align: center;
  }
}
</style>

<template>
  <!-- 创建任务信息页面 -->
  <div class="create-task">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="创建任务信息" name="first">
        <div class="task-body">
          <el-form :rules="rules" ref="form" label-width="110px" style="width: 40%">
            <el-form-item label="任务名称:" prop="name">
              <el-select v-model="ruleForm.name" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务类型:">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option label="定时任务" value="dsrw"></el-option>
                <el-option label="一次性任务" value="ycxrw"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务开始时间:">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="任务执行周期:">
              <el-col :span="11">
                <el-input v-model="ruleForm.circle1" placeholder="请输入"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-select v-model="ruleForm.circle2" placeholder="请选择">
                  <el-option label="小时" value="hour"></el-option>
                  <el-option label="天" value="day"></el-option>
                  <el-option label="月" value="month"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="间隔执行时间:">
              <el-col :span="11">
                <el-input v-model="ruleForm.interval" placeholder="请输入"></el-input>
              </el-col>
              <el-col :span="2">分</el-col>
            </el-form-item>
            <el-form-item label="失败重试次数:">
              <el-select v-model="ruleForm.degree" placeholder="请选择">
                <el-option label="1次" value="one"></el-option>
                <el-option label="2次" value="two"></el-option>
                <el-option label="3次" value="three"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="超时时间:">
              <el-input v-model="ruleForm.overtime" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 90px; margin-left: 12px;" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button style="width: 90px;" @click="resetForm('ruleForm2')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        name: '',
        type: '',
        date1: '',
        date2: '',
        circle1: '',
        circle2: '',
        overtime: '',
        interval: '',
        degree: ''
      },
      rules: {
        name: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');
        } else {
          //console.log('error submit!!');
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

