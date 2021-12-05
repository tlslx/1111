
/**
* @file 注册
* @author:fanglinshuai
* @date:2019/3/7
*/
<template>
  <el-tabs v-model="activeName" @tab-click="firstTabClick">
      <el-tab-pane label="1.验证信息" name="first">
        <el-form label-width="160px"
        :model="form"
        ref="form"
        :rules="searchRules">
          <el-form-item label="企业英文名称:" prop="enNames">
            <el-col :span="5">
              <el-input v-model="form.enNames" ></el-input>
              <div class="name-select" v-if="visible">
                <ul style="padding-left: 10px;">
                  <template v-for="item in enNames">
                    <li :key="item" class="li-style" @click="giveName(item)">{{ item }}</li>
                  </template>
                </ul>
              </div>
            </el-col>
            <el-col :span="5">
              <el-button type="danger" class="searchBtn" @click="research">查询</el-button>
            </el-col>
          </el-form-item>
          <div class="sub-style">
            <el-button type="danger" class="submitBtn" @click="confirmRepValidate('form')">验证</el-button>
            <el-button type="info" class="submitBtn" style="margin-left: 50px" @click="resetForm('form')">取消</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="2.填写基本信息" name="second" :disabled="paneDisabled">
      <span class="remarke">*号为必填项※号为必填项</span>
        <el-form label-width="160px"
        :rules="formRules"
        :model="registForm"
        ref="registForm">
          <el-form-item label="企业英文名称：" class="inline-item" prop="companyNameEn" size="small" >
            <el-input v-model="registForm.companyNameEn" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="企业中文名称：" class="inline-item" size="small" prop="companyNameCh">
            <el-input v-model="registForm.companyNameCh"></el-input>
          </el-form-item>
          <el-form-item label="企业简称：" class="inline-item" size="small" prop="enterpriseAbbreviation" >
            <el-input v-model="registForm.enterpriseAbbreviation"></el-input>
          </el-form-item>
          <el-form-item label="所在国家区域：" class="inline-item" size="small" prop="countryRegionId">
            <el-select v-model="registForm.countryRegionId" placeholder="请选择">
              <el-option
                v-for="item in countries"
                :key="item.countryRegionId"
                :label="item.crChName"
                :value="item.countryRegionId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品：" class="inline-item" size="small" prop="product" >
            <el-input v-model="registForm.product"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" class="inline-item" size="small" prop="contact" >
            <el-input v-model="registForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="职务：" class="inline-item" size="small" prop="job" >
            <el-input v-model="registForm.job"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" class="inline-item" size="small" prop="mail" >
            <el-input v-model="registForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="电话：" class="inline-item" size="small" prop="telephone" >
            <el-input v-model="registForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="企业类型：" class="inline-item" size="small" prop="companyType" >
            <el-select v-model="registForm.companyType" placeholder="请选择">
              <el-option
                v-for="item in companyTypeOptionsData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" class="inline-item" size="small" prop="companyTypeElse" >
            <el-input v-model="registForm.companyTypeElse"></el-input>
          </el-form-item>
          <el-form-item label="所属行业：" class="inline-item" size="small" prop="industry" >
            <el-select v-model="registForm.industry" placeholder="请选择">
              <el-option
                v-for="item in industryTypeOptionsData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业网址：" class="inline-item" size="small" prop="companyNetAddress" >
            <el-input v-model="registForm.companyNetAddress"></el-input>
          </el-form-item>
          <el-form-item label="意向申请展位数量：" class="inline-item" size="small" prop="intentionBoothNum">
            <el-input v-model.number="registForm.intentionBoothNum"></el-input>
          </el-form-item>
          <el-form-item label="意向申请届数：" class="inline-item" size="small" prop="intentionExhSes">
            <el-select v-model="registForm.intentionExhSes" placeholder="请选择">
              <el-option
                v-for="item in exhibitListAllData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招展代理" class="inline-item" size="small" prop="exhibitionAgentId" >
            <el-select v-model="registForm.exhibitionAgentId" placeholder="请选择">
              <el-option
                v-for="item in exhibitionAgents"
                :key="item.exhibitionAgentId"
                :label="item.agentCh"
                :value="item.exhibitionAgentId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="sub-style">
          <div>
          <el-checkbox style="margin-right: 10px;" name="checkBox"></el-checkbox>本司已阅读并同意<a class="showCase" @click="dialogProduct=true">《境外参展商隐私政策》</a>
          </div>
          <el-button type="danger" class="submitBtnT" @click="submitForm('registForm')">提交</el-button>
          <el-button type="info" class="submitBtnT" style="margin-left: 50px" @click="cancelSubmit">取消</el-button>
        </div>
      </el-tab-pane>
      <el-dialog title="隐私提款" :visible.sync="dialogProduct" class="formProduct">
      <p class="total">境外参展商隐私政策</p>
      <p>最新更新日期：2018年X月X日</p>
      <p>中国对外贸易中心、中国对外贸易中心（集团）（以下统称为“外贸中心”或“我们”）尊重您的个人隐私。本隐私政策旨在释明我们是谁，我们如何收集、分享和使用您的个人信息，以及您如何维护您的合法权益。</p>
      <p>本隐私政策适用于外贸中心通过旗下官方网站www.cftc.org.cn、www.cantonfair.org.cn（以下统称为“网站”）收集的个人信息以及您使用我们的服务（包括但不限于我们的网站、APP、公众号等）时我们所收集的个人信息，比如您向我们申请中国进出口商品交易会（简称“广交会”）的各项服务时。</p>
      <p>如果您对我们使用您的个人信息有任何疑问或顾虑，请通过本隐私政策底部所示联系方式与我们联系。</p>
      <p>外贸中心的业务是什么？</p>
      <p>中国对外贸易中心是商务部直属事业单位，主要负责承办中国进出口商品交易会（又称广交会）；在中国广州及上海同时拥有国内两个超大型现代化展馆，即位于广州市海珠区琶洲岛的广交会展馆和位于上海市虹桥商务区核心区西部的国家会展中心（上海）。中国对外贸易中心以其六十多年的专业办展经验、卓越的业绩、专业的服务在中国会展业中占有举足轻重的地位。</p>
      <p>中国对外贸易中心下设企业集团、即中国对外贸易中心（集团），主要业务是主办各类大型专业展览；经营广州及上海两大展馆；通过旗下子公司及控股/参股公司经营电子商务、广告、进出口贸易、旅游、酒店、餐饮、物业等业务。</p>
      <p>有关外贸中心的更多信息，请参阅我们网站www.cftc.org.cn的“中心简介”的部分。</p>
      <p>外贸中心收集的个人信息以及原因</p>
      <p>我们可能收集您的个人信息，这些个人信息会大致分为以下几类：</p>
      <p class="p-indent">您自愿提供的信息</p>
      <p>为了使用我们的服务，我们会请您自愿地提供如下个人信息：</p>
      <p class="p-indent">联系方式诸如您的姓名、地址、电话号码、电子邮件地址、传真号码、性别等；以及</p>
      <p class="p-indent">业务需要的公司相关证照、个人证件图片、个人照片、个人身份证件信息等；以及</p>
      <p class="p-indent">有助于提供及改进服务的信息，包括所在公司名称、公司类型、公司规模、个人职务、采购需求等；以及</p>
      <p class="p-indent">通过问卷调查、意见征集或其他营销调查活动收集到的个人信息；以及</p>
      <p class="p-indent">提供给客户服务代表用于调查或解决问题的个人信息</p>
      <p>我们使用这些个人信息来为您参加广交会提供便利，为您提供外贸中心主办的其他展览会的信息及服务，并向您提供关于我们的信息。我们向您收集的个人信息及其原因将在我们向您收集您的个人信息时向您明示。</p>
      <p class="p-indent">我们自动收集的信息</p>
      </el-dialog>
  </el-tabs>
</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'regist',
  mixins: [tableMixIn, listPageBase],
  data() {
    let checkLength = (rule, value, callback) => {
      let errors = [];
      if (value.length > rule.length) {
        errors.push(new Error("长度超过限制" + rule.length));
      }
      callback(errors);
    };
    return {
      activeName: "first",
      paneDisabled: true,
      dialogProduct: false,
      visible: false,
      enNames: [],
      countries: [],
      exhibitionAgents: [],
      value: '',
      form: {
        enNames: ""
      },
      registForm: {
        companyNameEn: "",
        companyNameCh: "",
        enterpriseAbbreviation: "",
        countryRegionId: "",
        companyType: "",
        companyTypeElse: "",
        industry: "",
        exhibitionAgentId: "",
        intentionBoothNum: "",
        intentionExhSes: "",
        companyNetAddress: "",
        contact: "",
        depart: "",
        job: "",
        mail: "",
        product: "",
        telephone: ""
      },
      searchRules: {
        enNames: [{ required: true, message: "企业英文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z0-9]*[a-zA-Z0-9]+$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入字母、数字、括号、字符间支持一个空格"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ]
      },
      formRules: {
        companyNameEn: [{ required: true, message: "企业英文名称不能为空", trigger: "blur" }],
        companyNameCh: [{ required: true, message: "企业中文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
              let regRuleT = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
              if (regRuleT.test(value) || regRule.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }

            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ],
        enterpriseAbbreviation: [{ required: true, message: "企业简称不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }],
        countryRegionId: [{ required: true, message: "所在国家区域不能为空", trigger: "blur" }],
        product: [{ required: true, message: "产品不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        contact: [{ required: true, message: "联系人不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        job: [{ required: true, message: "职务不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        mail: [{ required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的邮箱格式"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        telephone: [{ required: true, message: "电话不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([0-9]{0,255})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("只能输入数字"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        companyType: [{ required: true, message: "企业类型不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }],
        industry: [{ required: true, message: "所属行业不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        companyNetAddress: [{ required: true, message: "企业网址不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        intentionBoothNum: [{ required: true, message: "意向申请展位数量不能为空", trigger: "blur" },
        { type: 'number', message: '意向申请展位数量必须为数字值' }, { length: "32", validator: checkLength }],
        intentionExhSes: [{ required: true, message: "意向申请届数不能为空", trigger: "blur" },
        { length: "100", validator: checkLength }],
        exhibitionAgentId: [{ required: true, message: "招展代理不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }]
      }
    };
  },
  computed: {
    ...mapGetters('regist', ['getListAll', 'companyTypeOptionsData', 'industryTypeOptionsData', 'exhibitListAllData']),  // 用户新增
    confirmRepParams() { // 验证企业是否已经注册参数
      let param = {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "companyNameEn",
            "values": [
              this.form.enNames
            ]
          }
        ]
      };
      return param;
    }
  },
  created() {
    this.getCompanyTypeOptions();
    this.getIndustryTypeOptions();
    this.getExhibitListAll();
  },
  methods: {
    // ...mapActions('regist', ['getListAllInfo']),   // 根据企业英文名称模糊查询
    // ...mapActions('regist', ['getConfirmIsRepeatInfo']),   // 根据企业英文名称模糊查询
    // ...mapActions('regist', ['getAllCountryInfo']),   // 获取国家
    // ...mapActions('regist', ['addInfo']),   // 企业询盘注册
    // ...mapActions('regist', ['getAllAgentsInfo']),   // 获取所有招展代理
    // 获取所有企业类型, 获取所有企业所属行业
    ...mapActions('regist', ['getListAllInfo', 'getConfirmIsRepeatInfo', 'getAllCountryInfo',
      'addInfo', 'getAllAgentsInfo', 'getCompanyTypeOptions', 'getIndustryTypeOptions', 'getExhibitListAll']),
    // 查询企业名称
    research() {
      let param = {
        current: 1,
        isAsc: true,
        name: this.form.enNames,
        orderByField: "create_date",
        size: 5
      };
      this.visible = true;
      this.getListAllInfo(param).then(res => {
        this.enNames = res;
      });
    },
    // 给查询输入框赋值
    giveName(item) {
      this.form.enNames = item;
      this.visible = false;
    },
    // 清空表单信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    firstTabClick() { // 切换为pane2 禁用
      if (this.activeName === 'first') {
        this.paneDisabled = true;
      }
    },
    // 验证企业是否已经注册 内置fn
    confirmRep() {
      // let param = {
      //   "customQueryParams": [
      //     {
      //       "findType": "EQ",
      //       "joinType": "And",
      //       "name": "companyNameEn",
      //       "values": [
      //         this.form.enNames
      //       ]
      //     }
      //   ]
      // };
      this.getConfirmIsRepeatInfo(this.confirmRepParams).then(res => {
        if (res === "1") {
          this.$confirm('企业未注册，请填写注册信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getAllCountryInfo().then(resS => {
              this.countries = resS;
            });
            this.getAllAgentsInfo().then(resT => {
              this.exhibitionAgents = resT;
            });
            this.activeName = "second";
            this.paneDisabled = false;
            this.registForm.companyNameEn = this.form.enNames;
          }).catch(() => {

          });
        } else if (res === "0") {
          this.$confirm('企业已注册，请登录', '提示', {
            confirmButtonText: '登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url = location.href;
            let loginUrl = process.env.SSO_BASE_URL;
            let IASID = process.env.IASID;
            parent.location.href = loginUrl + "/logout?type=0&IASID=" + IASID + "&ReturnUrl=" + encodeURI(url);
          }).catch(() => {

          });
        } else {
          this.$message.error('返回体有误');
        }
      }).catch(e => {
        this.$message.error('请求失败');
      });
    },
    confirmRepValidate(formName) { // 验证企业是否已经注册
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirmRep();
        } else {
          this.$message.error("请将表单填写完整");
        }
      });
    },
    // 注册提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let checkBox = document.getElementsByName("checkBox");
          if (checkBox[0].checked === true) {
            this.addInfo(this.registForm).then(res => {
              // if (res.flag === "1") {

              // }
              this.$message({
                message: '注册成功', type: 'success'
              });
              for (let key in this.registForm) { // 置空
                this.registForm[key] = '';
              }
              this.activeName = "first";
            }).catch(e => {
              this.$message.error(e.message);
            });
          } else {
            this.$message.error("请先阅读并同意《境外参展商隐私政策》");
          }
        } else {
          this.$message.error("请将表单填写完整");
        }
      });
    },
    // 取消提交
    cancelSubmit() {
      this.$message({
        message: '已取消注册', type: 'info'
      });
      for (let key in this.registForm) { // 置空
        this.registForm[key] = '';
      }
      this.activeName = "first";
    }
  }
};
</script>
<style scoped>
.searchBtn{
  margin-left: 30px;
  width: 100px; /* width: 80px; */
}
.submitBtn{
  margin-top: 30px;
  margin-left: 120px;
  width: 100px;
}
.submitBtnT{
  margin-top: 30px;
  margin-left: 30px;
  width: 100px;
}
.inline-item{
  display: inline-block;
  width: 50%;
  margin-left: 3%;
  margin-right: 60%;
  margin-top: 15px;
}
.p-indent{
  text-indent:2em;
}
.total{
  font-family: 'Arial Negreta', 'Arial';
  font-weight: 700;
  text-align: center;
  font-size: 18px;
  line-height: 28px;
}
.sub-style{
margin-left: 120px;
padding-bottom: 10px;
}
.remarke{
  margin-left: 40px;
  color: red;
}
.showCase{
  color: rgb(22, 155, 213);
  cursor:pointer;
}
.li-style{
list-style:none;
cursor:pointer;
}
.name-select{
  border: 1px solid rgba(228, 228, 228, 1);

}
</style>
