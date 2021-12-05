/**
 * @file VIP企业推荐采购商
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="VIP企业推荐采购商" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item class="buyer-item" label="公司名称" prop="purchaserName">
          <el-input v-model="ruleForm.purchaserName" clearable placeholder="请填写公司名称" maxlength="48"></el-input>
        </el-form-item>
        <el-form-item class="buyer-item" label="国家/地区" prop="countoryRegion">
          <el-select v-model="ruleForm.countoryRegion" placeholder="请选择" clearable>
            <el-option v-for="item in dicContory" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="buyer-item" label="采购意向" prop="purchaseIntention">
          <el-input v-model="ruleForm.purchaseIntention" clearable placeholder="请填写采购意向" maxlength="128"></el-input>
        </el-form-item>
        <el-form-item class="buyer-item" label="推荐理由" prop="recommendReason">
          <el-input :rows="4" type="textarea" v-model="ruleForm.recommendReason" maxlength="128" clearable placeholder="请填写推荐理由"></el-input>
        </el-form-item>
        <el-form-item class="buyer-item" label="姓名" prop="purchaseAgentName">
          <el-input v-model="ruleForm.purchaseAgentName" clearable placeholder="请填写姓名" maxlength="24"></el-input>
        </el-form-item>
        <el-form-item class="buyer-item" label="护照号码" prop="purchaseAgentPassport">
          <el-input v-model="ruleForm.purchaseAgentPassport" maxlength="24" clearable placeholder="请填写护照号码"></el-input>
        </el-form-item>
        <el-form-item class="buyer-item" label="职务" prop="purchaseAgentPost">
          <el-select v-model="ruleForm.purchaseAgentPost" placeholder="请选择" clearable>
            <el-option v-for="item in optionPost" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="buyer-item" label="E-mail" prop="purchaseAgentEmail">
          <el-input v-model="ruleForm.purchaseAgentEmail" clearable placeholder="请填写邮箱" maxlength="48"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
          <el-button class="btn2" @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    //人名正则：中文、英文和空格
    let validatePeople = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不可为空'));
      }
      let str = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确人名'));
      } else {
        return callback();
      }
    };
    //邮箱正则
    let validateMail = (rule, value, callback) => {
      let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确邮箱格式'));
      } else {
        return callback();
      }
    };
    //护照正则
    let validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('护照号码不可为空'));
      }
      let str = /^[a-zA-Z0-9]{5,17}$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确护照账号'));
      } else {
        return callback();
      }
    };
    return {
      activeName: "first", // tab标题
      fullscreenLoading: false,
      // 职务模拟数据
      optionPost: [],
      dicContory: [],
      // 表单对象
      ruleForm: {
        purchaserName: "",  // 公司名称
        countoryRegion: "", // 国家/地区
        purchaseIntention: "", // 采购意向
        recommendReason: "", // 推荐理由
        purchaseAgentName: "", // 姓名
        purchaseAgentPassport: "", // 护照
        purchaseAgentPost: "02", // 职务
        purchaseAgentEmail: "" // 邮箱
      },
      // 校验准则
      rules: {
        purchaserName: [
          { required: true, message: "请输入公司名称", trigger: "change" }
        ],
        countoryRegion: [
          { required: true, message: "请选择国家地区", trigger: "blur" }
        ],
        purchaseIntention: [
          { required: true, message: "请输入采购意向", trigger: "blur" }
        ],
        recommendReason: [
          { required: true, message: "请填写推荐理由", trigger: "blur" }
        ],
        purchaseAgentName: [{ required: true, trigger: "blur", validator: validatePeople }],
        purchaseAgentPassport: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        purchaseAgentPost: [{ required: true, message: "请选择职务", trigger: "change" }],
        purchaseAgentEmail: [{ required: true, message: "请填写E-mail", trigger: "blur", validator: validateMail }]
      }
    };
  },
  computed: {
    ...mapGetters('common', ['session']), // 获取届数
    ...mapGetters('vipEnterManagement', ['addRecBuyer'])
  },
  created() {
    // 由编辑进入时，将前一页面数据带入并赋值
    if (this.$route.query) {
      this.ruleForm = this.$route.query;
    }
    //获取字典数据
    let dicData = JSON.parse(localStorage.getItem('dictData'));
    this.optionPost = dicData.post;
    this.dicContory = dicData.countryDic.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']), // 获取届数
    ...mapActions('vipEnterManagement', ['addRecommendBuyersInfo', 'updatePurchaserInfo']),
    // 国家/地区 级联选择器改变事件
    handleChange(value) {},
    // 确认表单
    submitForm(formName) {

      // 获取用户信息
      let param = {}; // 定义传参
      // 判断purchaserId存在为编辑更新，若不存在则为新增
      if (this.$route.query.purchaserId) {
        this.fullscreenLoading = true;
        param = {
          "purchaserInfo":
          {
            "purchaserId": this.$route.query.purchaserId,
            "purchaserName": this.ruleForm.purchaserName,
            "countoryRegion": this.ruleForm.countoryRegion,
            "purchaseIntention": this.ruleForm.purchaseIntention,
            "recommendReason": this.ruleForm.recommendReason,
            "purchaseAgentName": this.ruleForm.purchaseAgentName,
            "purchaseAgentPassport": this.ruleForm.purchaseAgentPassport,
            "purchaseAgentPost": this.ruleForm.purchaseAgentPost,
            "purchaseAgentEmail": this.ruleForm.purchaseAgentEmail,
            "companyId": localStorage.getItem("getComPanyId"),
            "creatorId": this.$store.getters.userInfo.id,
            "creatorName": this.$store.getters.userInfo.userName,
            "modifierId": this.$store.getters.userInfo.id,
            "modifierName": this.$store.getters.userInfo.userName
          }
        };
        // 校验表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 更新数据
            this.updatePurchaserInfo(param).then(res => {
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 1000);
              this.$message.success("提交成功");
              this.$router.push("/vipEnterRecoSumInfo"); // 跳转回列表页
            });
          } else {
            this.$message.error("提交失败");
            return false;
          }
        });
      } else {
        param = {
          "purchaserInfo":
          {
            "purchaserName": this.ruleForm.purchaserName,
            "countoryRegion": this.ruleForm.countoryRegion,
            "purchaseIntention": this.ruleForm.purchaseIntention,
            "recommendReason": this.ruleForm.recommendReason,
            "purchaseAgentName": this.ruleForm.purchaseAgentName,
            "purchaseAgentPassport": this.ruleForm.purchaseAgentPassport,
            "purchaseAgentPost": this.ruleForm.purchaseAgentPost,
            "purchaseAgentEmail": this.ruleForm.purchaseAgentEmail,
            "companyId": localStorage.getItem("getComPanyId"),
            "creatorId": this.$store.getters.userInfo.id,
            "creatorName": this.$store.getters.userInfo.userName,
            "modifierId": this.$store.getters.userInfo.id,
            "modifierName": this.$store.getters.userInfo.userName
          }
        };
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 新增数据
            this.addRecommendBuyersInfo(param).then(res => {
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 1000);
              this.$message.success("提交成功");
              this.$router.push("/vipEnterRecoSumInfo");
            });
          } else {
            this.$message.error("提交失败");
            return false;
          }
        });
      }
    },
    // 取消 返回上一页
    resetForm() {
      this.$router.push("/vipEnterRecoSumInfo");
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
.el-form-item-btn{
  position: relative;
  left: 30%;
  margin-top: 50px;
}
.btn1{
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btn2{
  background-color: white;
  width: 120px;
  height: 40px;
}
.buyer-item{
  margin-bottom: 22px;
}
</style>


