<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="退回申请书" name="first" style="padding-left: 70px; padding-right: 200px;">
      <el-form :model="formData" label-position="right" :rules="rules" label-width="180px">
        <el-form-item label="企业名称：" prop="companyName">
          <el-input v-model="formData.companyName" maxlength="24" value = "宝芝林" style="width: 400px; "></el-input>
        </el-form-item>
        <el-form-item label="广交会编码：" prop="cantonFairCode">
          <el-input v-model="formData.cantonFairCode" maxlength="20" value = "864513" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="交易团：" prop="dealClusterName">
          <el-input v-model="formData.dealClusterName" maxlength="24" value = "广东" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="展区：" prop="exhibitionAreaName">
          <el-input v-model="formData.exhibitionAreaName" maxlength="10" value = "医药中医" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="展期：" prop="exhibitionPeriod">
          <el-select v-model="formData.exhibitionPeriod" style="width: 400px; margin-top: 8px">
            <el-option label="请选择" value = ""></el-option>
            <el-option label="1" value = "1"></el-option>
            <el-option label="2" value = "2"></el-option>
            <el-option label="3" value = "3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上届品牌展位数量：" prop="lastBoothNumber">
          <el-input v-model="formData.lastBoothNumber" maxlength="10" value = "宝芝林" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="退回展位号：" prop="backBooth">
          <el-checkbox-group v-model="formData.backBooth">
            <el-checkbox label="2348561">2348561</el-checkbox>
            <el-checkbox label="8561w">8561w</el-checkbox>
            <el-checkbox label="891r">891r</el-checkbox>
            <el-checkbox label="4fs145">4fs145</el-checkbox>
            <el-checkbox label="a441">a441</el-checkbox>
            <el-checkbox label="15af">15af</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="本届品牌展位数变化量：" prop="currentChangedBoothNumber">
          <el-input v-model="formData.currentChangedBoothNumber" maxlength="10" value = "2" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="本届保留品牌展位数：" prop="currentReserveNumber">
          <el-input v-model="formData.currentReserveNumber" maxlength="10" value = "986451" style="width: 400px; margin-top: 8px"></el-input>
        </el-form-item>
        <el-form-item label="情况分类：" prop="backType">
          <el-select v-model="formData.backType" style="width: 400px; margin-top: 8px">
            <el-option label="请选择" value=""></el-option>
            <el-option label="全部退回" value="1"></el-option>
            <el-option label="部分退回" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退回原因：" prop="backReason">
          <el-input v-model="formData.backReason" style="margin-top: 8px" maxlength="120" type = "textarea" rows="3" value="宝芝林"></el-input>
        </el-form-item>
      </el-form>
      <p style="text-align: center;">关于退展位收费约束机制的时间机制</p>
      <textarea v-model="name" id="" cols="" style="background: #ebebeb; width: 100%" rows="5"></textarea>
      <div>
        <el-checkbox  v-model="checked">本司已读并确认以上所述内容</el-checkbox>
        <div style="float: right;">
          <el-button @click="toDemplate">打印模板</el-button>
          <el-button>上传确认书</el-button>
        </div>
      </div>
      <div style="text-align: center;">
        <el-button :disabled="!checked" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    let checkBge = (rule, value, callback) => {
      let regBule = /[^\a-zA-Z0-9\$]/g;
      if (regBule.test(value)) {
        return callback(new Error('请输入数字和字母'));
      } else if (!value) {
        return callback(new Error('输入不能为空'));
      }
      callback();
    };
    let checkAge = (rule, value, callback) => {
      let regBule = /[^\u4e00-\u9fa5|a-zA-Z\$]/g;
      if (regBule.test(value)) {
        return callback(new Error('请输入汉字或英文'));
      } else if (!value) {
        return callback(new Error('输入不能为空'));
      }
      callback();
    };
    let checkDge = (rule, value, callback) => {
      let regBule = /[^\u4e00-\u9fa5\$]/g;
      if (regBule.test(value)) {
        return callback(new Error('请输入汉字'));
      } else if (!value) {
        return callback(new Error('输入不能为空'));
      }
      callback();
    };
    let checkCge = (rule, value, callback) => {
      let regCule = /[^\d\$]/g;
      if (regCule.test(value)) {
        return callback(new Error('请输入正整数'));
      } else if (!value) {
        return callback(new Error('输入不能为空'));
      }
      callback();
    };
    return {
      formData: {
        'exhibitionAreaName': "",
        'backBooth': [],
        'companyName': "",
        'cantonFairCode': "",
        'dealClusterName': "",
        'exhibitionPeriod': "",
        'lastBoothNumber': "",
        'currentChangedBoothNumber': "",
        'currentReserveNumber': "",
        'backType': "",
        'backReason': "",
        'boothAffirmId': '1'
      },
      activeName: "first",
      name: '',
      checked: true,
      rules: {
        cantonFairCode: [
          { validator: checkBge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        companyName: [
          { validator: checkAge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        currentChangedBoothNumber: [
          { validator: checkCge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        currentReserveNumber: [
          { validator: checkCge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        dealClusterName: [
          { validator: checkDge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        exhibitionAreaName: [
          { validator: checkDge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        lastBoothNumber: [
          { validator: checkCge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        backReason: [
          { validator: checkDge, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],
        backBooth: [
           { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
        ],
        exhibitionPeriod: [
           { required: true, message: '请选择', trigger: 'change' }
        ],
        backType: [
           { required: true, message: '请选择', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    ...mapActions("enterprisesConfirm", ["getEnterprisesSubmit", "postSummarized"]),
    handleList() {
      this.getEnterprisesSubmit().then(res => {
        this.name = res.projectContent;
      }).catch(e => {});
    },    
    //提交
    onSubmit() {   
      if (this.formData.exhibitionAreaName === '') {
        this.$message('展区不能为空');
      } else if (this.formData.backBooth === '') {
        this.$message("退回展位号不能为空");
      } else if (this.formData.companyName === '') {
        this.$message("企业名称不能为空");
      } else if (this.formData.cantonFairCode === '') {
        this.$message("广交会编码不能为空");
      } else if (this.formData.dealClusterName === '') {
        this.$message("交易团不能为空");
      } else if (this.formData.exhibitionPeriod === '') {
        this.$message("展期不能为空");
      } else if (this.formData.lastBoothNumber === '') {
        this.$message("上届品牌展位数量不能为空");
      } else if (this.formData.currentChangedBoothNumber === '') {
        this.$message("本届品牌展位数变化量不能为空");
      } else if (this.formData.currentReserveNumber === '') {
        this.$message("本届保留品牌展位数不能为空");
      } else if (this.formData.backType === '') {
        this.$message("情况分类不能为空");
      } else if (this.formData.backReason === '') {
        this.$message("退回原因不能为空");
      } else { 
        this.formData["backBooth"] = JSON.stringify(this.formData.backBooth);
        this.postSummarized(this.formData).then(res => {
          this.formData["backBooth"] = [];
          this.$router.push("/enterprise_return");
        }).catch(e => {});
      } 
    },
    toDemplate() {
    }
  }
};
</script>
<style scoped>
aa{
  float: left;
}
</style>

