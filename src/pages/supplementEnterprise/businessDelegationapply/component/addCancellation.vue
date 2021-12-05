/**
* @file 联营企业管理---登记联营企业资料
*/
<style lang='less' scoped>
.addCancellation {
  height: 100%;
}
/deep/.el-form-item {
    margin-bottom: 22px;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="企业名称(中文):" prop="nameCh">
              <el-input v-model="ruleForm.nameCh" maxlength="50" @blur="checkName" :disabled="disabled" clearable placeholder="请填写企业名称"></el-input>
            </el-form-item>
            <el-form-item label="企业名称(英文):" prop="nameEn">
              <el-input v-model="ruleForm.nameEn" maxlength="50" @blur="checkNameEn" :disabled="disabled" clearable placeholder="请填写企业名称"></el-input>
            </el-form-item>
            <el-form-item label="地址(中文):" prop="addressCh">
              <el-input v-model="ruleForm.addressCh" maxlength="20" :disabled="disabled" clearable placeholder="请填写地址"></el-input>
            </el-form-item>
            <el-form-item label="地址(英文):" prop="addressEn">
              <el-input v-model="ruleForm.addressEn" maxlength="128" :disabled="disabled" clearable placeholder="请填写地址"></el-input>
            </el-form-item>
            <el-form-item label="营业执照号(统一社会信用代码):" prop="businessLicenceNo">
              <el-input v-model="ruleForm.businessLicenceNo" maxlength="18" :disabled="disabled" clearable placeholder="请填写营业执照号"></el-input>
            </el-form-item>
            <el-form-item label="法人代表:" prop="legalPerson">
              <el-input v-model="ruleForm.legalPerson" maxlength="20" :disabled="disabled" clearable placeholder="请填写法人代表"></el-input>
            </el-form-item>
            <el-form-item label="海关注册编码:" prop="customsRegisterNo">
              <el-input v-model="ruleForm.customsRegisterNo" maxlength="10" :disabled="disabled" clearable placeholder="请填写海关注册编码"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" prop="companyType">
              <el-select v-model="ruleForm.companyType" placeholder="请选择" disabled clearable>
                <el-option v-for="(item, index) in dicCompanyType" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="企业属性:" prop="companyAttribute">
              <el-select v-model="ruleForm.companyAttribute" placeholder="请选择" :disabled="disabled" clearable>
                <el-option v-for="(item, index) in dicCompanyAttribute" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人:" prop="contacts">
              <el-input v-model="ruleForm.contacts" maxlength="20" :disabled="disabled" clearable placeholder="请填写联系人"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="telephone">
              <el-input v-model="ruleForm.telephone" maxlength="13" :disabled="disabled" clearable placeholder="请填写电话"></el-input>
            </el-form-item>
            <el-form-item label="手机:" prop="phone">
              <el-input v-model="ruleForm.phone" maxlength="11" :disabled="disabled" clearable placeholder="请填写手机"></el-input>
            </el-form-item>
            <el-form-item label="传真:" prop="fax">
              <el-input v-model="ruleForm.fax" maxlength="13" :disabled="disabled" clearable placeholder="请填写传真"></el-input>
            </el-form-item>
            <el-form-item label="E-mail:" prop="email">
              <el-input v-model="ruleForm.email" maxlength="50" :disabled="disabled" clearable placeholder="请填写E-mail"></el-input>
            </el-form-item>
            <el-form-item label="网址:" prop="website">
              <el-input v-model="ruleForm.website" maxlength="50" :disabled="disabled" clearable placeholder="请填写网址"></el-input>
            </el-form-item>
            <el-form-item label="联营企业及展位负责人:" prop="responsiblePerson">
              <el-input v-model="ruleForm.responsiblePerson" maxlength="50" :disabled="disabled" clearable placeholder="请填写联营企业及展位负责人"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center; margin-bottom: 20px;">
      <el-button type="primary" @click="submitForm(ruleForm)" >确认</el-button>
      <el-button @click="resetForm">返回</el-button>
    </div>
  </el-tabs>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    props: ["companyId"],
    data() {
      //正则只能输入数字
      let validateNum = (rule, value, callback) => {
        let str = /^[0-9]*$/;
        if (!str.test(value)) {
          return callback(new Error('只能输入数字'));
        } else {
          return callback();
        }
      };
      //电话号码
      let validatelephone = (rule, value, callback) => {
        let str = /^([0-9]{3,4}-)[0-9]{7,8}$/;
        if (!str.test(value)) {
          return callback(new Error('请输入正确的电话号码,区号+电话号码'));
        } else {
          return callback();
        }
      };
      let checkCnT = (rule, value, callback) => {
        let errors = [];
        let regRuleChAndEn = this.$store.state.common.CHECK_CONST_DATA.engAndChine;
        let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
        if (value === '') {
          errors.push(new Error("请输入特征描述中文"));
        } else if (!regRuleChAndEn.test(value) || !regRuleContainCh.test(value)) {
          errors.push(new Error("请输入中文/字母，必须包含中文"));
        }
        callback(errors);
      };
      // // 正则只能输入中文 判重校验
      // let validateCnName = (rule, value, callback) => {
      //   let _this = this;
      //   _this.searchCnParam.customQueryParams[0].values = [];
      //   _this.searchCnParam.customQueryParams[0].values.push(value);
      //   _this.judgeAssociateEnterprisesInfo(_this.searchCnParam).then(res => {
      //     // let str = /^[\u4e00-\u9fa5]+$/;
      //     if (res === "0") {
      //       return callback(new Error("产品名称（中文）重复设置"));
      //     } else {
      //       return callback();
      //     }
      //   });
      // };
      // // 正则只能输入中文
      // let validateCn = (rule, value, callback) => {
      //   let str = /^[\u4e00-\u9fa5]+$/;
      //   if (!str.test(value)) {
      //     return callback(new Error('只能输入中文'));
      //   } else {
      //     return callback();
      //   }
      // };
      // //手机号电话正则，不一定全
      // let validatePhone = (rule, value, callback) => {
      //   let str = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,19}$/;
      //   let ctr = /^[\-]*[\d]+$/;
      //   if (!ctr.test(value)) {
      //     return callback(new Error('请输入数字、-'));
      //   } else if (!str.test(value)) {
      //     return callback(new Error('手机号填写最长不能超过20'));
      //   } else {
      //     return callback();
      //   }
      // };
      // let validatemPhone = (rule, value, callback) => {
      //   let str = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,19}$/;
      //   let ctr = /^[\-]*[\d]+$/;
      //   if (!value) {
      //     return callback();
      //   } else if (!ctr.test(value)) {
      //     return callback(new Error('请输入数字、-'));
      //   } else if (!str.test(value)) {
      //     return callback(new Error('手机号填写最长不能超过20'));
      //   }
      // };
      //正则邮箱
      let validateMail = (rule, value, callback) => {
        let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (value === "") {
          return callback(new Error('请填写邮箱'));
        } else if (!str.test(value)) {
          return callback(new Error('请输入正确邮箱格式'));
        } else {
          return callback();
        }
      };
      // //正则传真
      let validateFax = (rule, value, callback) => {
        let str = /^([0-9]{3,4}-)[0-9]{7,8}$/;
        if (value === '') {
          return callback();
        } else if (!str.test(value)) {
          return callback(new Error('请输入正确的传真号,区号+传真号'));
        } else {
          return callback();
        }
      };
      // //正则英文 判重校验
      // let validateEnName = (rule, value, callback) => {
      //   let _this = this;
      //   _this.searchEnParam.customQueryParams[0].values = [];
      //   _this.searchEnParam.customQueryParams[0].values.push(value);
      //   _this.judgeAssociateEnterprisesInfo(_this.searchEnParam).then(res => {
      //     if (res === "0") {
      //       return callback(new Error("产品名称（英文）重复设置"));
      //     } else {
      //       return callback();
      //     }
      //   });
      // };
      // //正则英文
      // let validateEn = (rule, value, callback) => {
      //   let str = /^[a-zA-Z]+$/;
      //   if (!str.test(value)) {
      //     return callback(new Error('只能输入英文'));
      //   } else {
      //     return callback();
      //   }
      // };
      // //正则人名
      // let validatePeople = (rule, value, callback) => {
      //   let str = /^[a-zA-Z\u4e00-\u9fa5 ]{1,}$/;
      //   if (!str.test(value)) {
      //     return callback(new Error('请输入正确人名'));
      //   } else {
      //     return callback();
      //   }
      // };
      //正则营业执照号
      let validateNo = (rule, value, callback) => {
        let str = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
        if (!str.test(value)) {
          return callback(new Error('请输入正确营业执照号'));
        } else {
          return callback();
        }
      };
      //正则网址
      let validateWeb = (rule, value, callback) => {
        // let str = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
        let str = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/; // xlshih
        if (!value) {
          return callback();
        } else if (!str.test(value)) {
          return callback(new Error('请输入正确的网址'));
        } else {
          return callback();
        }
      };
      //手机号码
      let validaphone = (rule, value, callback) => {
        let str = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (value === '') {
          return callback();
        } else if (!str.test(value)) {
          return callback(new Error('请输入正确的手机格式'));
        } else {
          return callback();
        }
        // if (!str.test(value)) {
        //   return callback(new Error('请输入正确的手机格式'));
        // } else if (value === '') {
        //   return callback();
        // } else {
        //   return callback();
        // }
      };
      return {
        // tab标题
        activeName: "first",
        fullscreenLoading: false,
        isExist: false,
        // 表单禁用变量
        disabled: false,
        // 确认按钮只在0的时候不显示{0:查看；1：编辑；2：新增}
        isOp: "0",
        //企业属性
        dicCompanyAttribute: [],
        //企业类型
        dicCompanyType: [],
        searchCnParam: {
          "orderModelField": [
            {
              "orderByField": "",
              "asc": false
            }
          ],
          "customQueryParams": [
            {
              "name": "nameCh",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [],
              "description": ""
            }
          ]
        },
        searchEnParam: {
          "orderModelField": [
            {
              "orderByField": "",
              "asc": false
            }
          ],
          "customQueryParams": [
            {
              "name": "nameEn",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [],
              "description": ""
            }
          ]
        },
        // 表单对象
        ruleForm: {
          // 公司id
          companyId: "1",
          // 企业名称（中文）
          nameCh: "",
          // 企业名称（英文）
          nameEn: "",
          // 企业类型
          companyType: "07",
          // 地址（中文）
          addressCh: "",
          // 地址（英文）
          addressEn: "",
          // 营业执照号
          businessLicenceNo: "",
          // 法人
          legalPerson: "",
          // 海关注册编码
          customsRegisterNo: "",
          // 公司属性
          companyAttribute: "",
          // 联系人
          contacts: "",
          // 电话
          telephone: "",
          // 手机
          phone: "",
          // 传真
          fax: "",
          // 邮箱
          email: "",
          // 网址
          website: "",
          // 负责人
          responsiblePerson: "",
          // 企业Id
          associateId: ""
        },
        // 校验准则
        rules: {
          nameCh: [{
            required: true,
            message: '请填写企业名称（中文）',
            trigger: 'blur'
            // validator: validateCn
          },
          {
            message: '产品名称（中文）重复设置',
            trigger: 'change'
            // validator: validateCnName
          }],
          nameEn: [{
            required: true,
            message: '请填写企业名称（英文）',
            trigger: 'blur'
            // validator: validateEn
          },
          {
            message: '产品名称（英文）重复设置',
            trigger: 'change'
            // validator: validateEnName
          }],
          companyType: [{
            required: true,
            message: '请选择企业类型',
            trigger: 'blur'
          }],
          addressCh: [{
            required: true,
            message: '请填写地址（中文）',
            trigger: 'blur',
            validator: checkCnT
          }],
          addressEn: [{
            required: true,
            message: '请填写地址（英文）',
            trigger: 'blur'
            // validator: validateEn
          }],
          businessLicenceNo: [{
            required: true,
            message: '请填写营业执照号(15/18位数字)',
            trigger: 'blur',
            validator: validateNo
          }],
          legalPerson: [{
            required: true,
            message: '请填写法人代表',
            trigger: 'blur'
            // validator: validatePeople
          }],
          customsRegisterNo: [{
            trigger: 'blur',
            validator: validateNum
          }],
          companyAttribute: [{
            required: true,
            message: '请选择企业属性',
            trigger: 'change'
          }],
          contacts: [{
            required: true,
            message: '请填写联系人',
            trigger: 'blur'
            // validator: validatePeople
          }],
          telephone: [{
            required: true,
            trigger: 'blur',
            // message: '请填入电话',
            validator: validatelephone
          }],
          phone: [
            {
              required: false,
              validator: validaphone
            }
          ],
          // phone: [{
          //   required: false,
          //   trigger: 'blur',
          //   validator: validaphone
          // }],
          //正则传真
          fax: [{
            required: false,
            trigger: 'blur',
            validator: validateFax
          }],
          email: [{
            required: true,
            trigger: 'blur',
            validator: validateMail
          }],
          website: [{
            required: false,
            trigger: 'blur',
            validator: validateWeb
          }],
          responsiblePerson: [{
            required: true,
            message: '请填写负责人',
            trigger: 'blur'
            // validator: validatePeople
          }]
        }
      };
    },
    async created () {
      this.dicCompanyAttribute = await kindo.dictionary.get('companyAttribute'); // 企业属性
      // this.dicCompanyType = await kindo.dictionary.get('boothType'); // 展位类型
      this.dicCompanyType = await kindo.dictionary.get('companyType'); // 企业类型
    },
    // mounted() {
    //   let dicData = JSON.parse(localStorage.getItem('dictData'));
    //   this.dicCompanyType = dicData.companyType;

    // },
    // created() {
    //   //获取字典数据
    //   let dicData = JSON.parse(localStorage.getItem('dictData'));
    //   this.dicCompanyAttribute = dicData.companyAttribute;
    //   this.dicCompanyType = dicData.companyType;
    // },
    computed: {
      ...mapGetters('supplementEnterprise', ['weightList', 'addCompanyinfoList'])
    },
    methods: {
      ...mapActions('supplementEnterprise', ['getWeightDetermination', 'getAddCompanyInfo']),
      // 确认提交
      submitForm(formName) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            formName.companyId = this.companyId;
            this.getAddCompanyInfo(formName).then((res) => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
              this.resetForm();
            });
          }
        });
      },
      // 企业中文名称验证
      checkName() {
        if (this.ruleForm.nameCh !== "") {
          let temp = {
            nameCh: this.ruleForm.nameCh
          };
          this.getWeightDetermination(temp).then(res => {
            if (res !== "1") {
              this.$message({
                type: 'error',
                message: '该企业中文名称已注册,请重新输入！'
              });
              this.ruleForm.nameCh = '';
            } else {
              this.isExist = false;
            }
          });
        }
      },
      // 企业英文名称验证
      checkNameEn() {
        if (this.ruleForm.nameEn !== "") {
          let temp = {
            nameEn: this.ruleForm.nameEn
          };
          this.getWeightDetermination(temp).then(res => {
            if (res !== "1") {
              this.$message({
                type: 'error',
                message: '该企业英文名称已注册,请重新输入！'
              });
              this.ruleForm.nameEn = '';
            } else {
              this.isExist = false;
            }
          });
        }
      },
      // 取消按钮，返回上一页
      resetForm() {
        this.$refs.ruleForm.resetFields();
        this.$emit("closeModal", false);
      }
    }
  };

</script>
