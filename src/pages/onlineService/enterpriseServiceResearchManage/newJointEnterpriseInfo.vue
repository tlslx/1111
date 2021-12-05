/**
 * @file 新增联合企业信息（3）
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="联合企业信息" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-row style="margin:30px 0px 12px 0px">
          <el-col :span="8">
            <el-form-item label="类型：" prop="type">申请方</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactPhoneNum">187****7234</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">广东萌果科技有限公司</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenseNum">392867485262110283171</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">日用品</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="tradingGroup">广东汕头市</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="rollOver">1期</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">日用品</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">2.C453</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本企业确认：" prop="companyConfirm">已确认</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请编号：" prop="applyNum">236826982</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终审结果：" prop="finalResult">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothType">一般性展位</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易团审核：" prop="panelAudit">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="installationType">绿色特装</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会审核：" prop="businessAssociationAudit">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalContact">张雪</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广交会审核：" prop="gjhAudit">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contact">张雪</el-form-item>
          </el-col>
        </el-row>
        <div style="height:0px;border-top:1px black dashed;"/>

        <el-row style="margin:30px 0px 12px 0px">
          <el-col :span="8">
            <el-form-item label="类型：" prop="type">申请方</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactPhoneNum">187****7234</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">广东萌果科技有限公司</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenseNum">392867485262110283171</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">日用品</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="tradingGroup">广东汕头市</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="rollOver">1期</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">日用品</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">2.C453</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="本企业确认：" prop="companyConfirm">已确认</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请编号：" prop="applyNum">236826982</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终审结果：" prop="finalResult">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothType">一般性展位</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交易团审核：" prop="panelAudit">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="installationType">绿色特装</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会审核：" prop="businessAssociationAudit">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalContact">张雪</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广交会审核：" prop="gjhAudit">待审核</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contact">张雪</el-form-item>
          </el-col>
        </el-row>
        <div style="height:0px;border-top:1px black dashed;"/>

        <el-row style="margin:30px 0px 12px 0px">
          <el-col :span="8">
            <el-form-item label="企业名称：" prop="companyName">
              <el-select v-model="ruleForm.companyName" placeholder="广东萌果科技股份有限公司">
                <el-option label="广东萌果科技有限公司" value="mengguo"></el-option>
                <el-option label="新科对外贸易有限公司" value="xinke"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="法定联系人：" prop="legalContact">
              <el-input v-model="ruleForm.legalContact" placeholder="张雪"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展区：" prop="exhibitionArea">
              <el-select v-model="ruleForm.exhibitionArea" placeholder="日用品">
                <el-option label="日用品" value="1"></el-option>
                <el-option label="你好" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：" prop="contact">
              <el-input v-model="ruleForm.contact" placeholder="张雪"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展期：" prop="rollOver">
              <el-input v-model="ruleForm.rollOver" placeholder="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：" prop="contactPhoneNum">
              <el-input v-model="ruleForm.contactPhoneNum" placeholder="187****8133"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位号：" prop="boothNo">
              <el-select v-model="ruleForm.boothNo" placeholder="2.C453  1.V7N9">
                <el-option label="2.C453  1.V7N9" value="1"></el-option>
                <el-option label="2.C453" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="营业执照注册号：" prop="businessLicenseNum">
              <el-input v-model="ruleForm.businessLicenseNum" placeholder="392867485262110283171"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请编号：" prop="applyNum">
              <el-input v-model="ruleForm.applyNum" placeholder="278326423"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属交易团：" prop="tradingGroup">
              <el-input v-model="ruleForm.tradingGroup" placeholder="广东省汕头市"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="展位类型：" prop="boothType">
              <el-input v-model="ruleForm.boothType" placeholder="一般性展位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商协会：" prop="businessAssociation">
              <el-input v-model="ruleForm.businessAssociation" placeholder="日用品"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="布展类型：" prop="installationType">
              <el-input v-model="ruleForm.installationType" placeholder="绿色特装"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="双方关系及证明:" prop="checkAttachment">
              <el-button size="medium">点击上传附件</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        companyName: "",
        exhibitionArea: "",
        rollOver: "",
        boothNo: "",
        applyNum: "",
        boothType: "",
        installationType: "",
        legalContact: "",
        contact: "",
        contactPhoneNum: "",
        businessLicenseNum: "",
        tradingGroup: "",
        businessAssociation: "",
        checkAttachment: ""
      },
      rules: {
        companyName: [{ required: true, message: "", trigger: "change" }],
        exhibitionArea: [{ required: true, message: "", trigger: "change" }],
        rollOver: [{ required: true, message: "请选择", trigger: "blur" }],
        boothNo: [{ required: true, message: "", trigger: "change" }],
        legalContact: [{ required: true, message: "", trigger: "blur" }],
        contact: [{ required: true, message: "", trigger: "blur" }],
        contactPhoneNum: [{ required: true, message: "", trigger: "blur" }],
        businessLicenseNum: [{ required: true, message: "", trigger: "blur" }],
        tradingGroup: [{ required: true, message: "", trigger: "blur" }],
        businessAssociation: [{ required: true, message: "", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClick(tab, event) {}
  }
};
</script>
<style scoped>
/* .el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
} */
.el-form-item-btn {
  position: relative;
  left: 15%;
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


