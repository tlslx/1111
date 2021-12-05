/**
* @file 联营企业管理---登记联营企业资料
*/
<style scoped>
.el-form-item {
  width: 800px;
  position: relative;
  left: 20%;
  margin-bottom: 22px;
}
.el-input {
  width: 400px;
}
.el-select {
  width: 400px;
}
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="登记联营企业资料" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="240px" class="demo-ruleForm">
        <el-form-item label="企业名称(中文):" prop="nameCh">
          <el-input v-model="ruleForm.nameCh" maxlength="50" @blur="checkName" :disabled="disabled" clearable placeholder="请填写企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业名称(英文):" prop="nameEn">
          <el-input v-model="ruleForm.nameEn" maxlength="100" @blur="checkNameEn" :disabled="disabled" clearable placeholder="请填写企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业类型:" prop="companyType">
          <el-select v-model="ruleForm.companyType" placeholder="请选择" :disabled="disabled" clearable>
            <el-option v-for="item in dicCompanyType" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址(中文):" prop="addressCh">
          <el-input v-model="ruleForm.addressCh" maxlength="128" :disabled="disabled" clearable placeholder="请填写地址"></el-input>
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
          <el-input v-model="ruleForm.customsRegisterNo" maxlength="10" :disabled="disabled" clearable placeholder="请填写海关注册编码(10位字母/数字)"></el-input>
        </el-form-item>
        <el-form-item label="企业属性:" prop="companyAttribute">
          <el-select v-model="ruleForm.companyAttribute" placeholder="请选择" :disabled="disabled" clearable>
            <el-option v-for="item in dicCompanyAttribute" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人:" prop="contacts">
          <el-input v-model="ruleForm.contacts" maxlength="20" :disabled="disabled" clearable placeholder="请填写联系人"></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="20" :disabled="disabled" clearable placeholder="请填写电话"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="telephone">
          <el-input v-model="ruleForm.telephone" maxlength="11" :disabled="disabled" clearable placeholder="请填写手机"></el-input>
        </el-form-item>
        <el-form-item label="传真:" prop="fax">
          <el-input v-model="ruleForm.fax" maxlength="20" :disabled="disabled" clearable placeholder="请填写传真"></el-input>
        </el-form-item>
        <el-form-item label="E-mail:" prop="email">
          <el-input v-model="ruleForm.email" maxlength="50" :disabled="disabled" clearable placeholder="请填写E-mail"></el-input>
        </el-form-item>
        <el-form-item label="网址:" prop="website">
          <el-input v-model="ruleForm.website" maxlength="50" :disabled="disabled" clearable placeholder="请填写网址"></el-input>
        </el-form-item>
        <el-form-item label="联营企业展位负责人:" prop="responsiblePerson">
          <el-input v-model="ruleForm.responsiblePerson" maxlength="50" :disabled="disabled" clearable placeholder="请填写联营企业展位负责人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" v-if="isOp !== '0'" v-loading="fullscreenLoading">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    data() {
      // 海关注册编码校验
      let validateNum = (rule, value, callback) => {
        if (value !== '' && value != null) {
          let str = /^[0-9a-zA-Z]{10}$/;
          if (!str.test(value)) {
            return callback(new Error('请输入正确的海关编码'));
          } else {
            return callback();
          }
        } else {
          return callback();
        }
      };
      // 校验中文地址
      let checkCnT = (rule, value, callback) => {
        let errors = [];
        let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
        if (value === '') {
          errors.push(new Error("请输入中文地址"));
        } else if (!regRuleContainCh.test(value) && value != null) {
          errors.push(new Error("必须包含汉字"));
        }
        callback(errors);
      };
      // 校验英文地址
      let validateAddressEn = (rule, value, callback) => {
        let errors = [];
        // let englishContainBlock = this.$store.state.common.CHECK_CONST_DATA.notChinese;
        let englishContainBlock = this.$store.state.common.CHECK_CONST_DATA.notChAndNotStartByBlank;
        if (value === '') {
          errors.push(new Error("请输入英文地址"));
        } else if (!englishContainBlock.test(value)) {
          errors.push(new Error("不允许输入汉字，首位不可为空格"));
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
      // 正则只能输入中文
      let validateCn = (rule, value, callback) => {
        let errors = [];
        let checkChineseName = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameCh;
        if (value === '') {
          errors.push(new Error("请输入企业中文名称"));
        } else if (!checkChineseName.test(value)) {
          errors.push(new Error("必须包含汉字，不允许半角括号"));
        }
        callback(errors);
      };
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
      // 电话校验
      let validatePhone = (rule, value, callback) => {
        let errors = [];
        let regRule = this.$store.state.common.CHECK_CONST_DATA.phone;
        if (value === '') {
          // errors.push(new Error("请输入电话"));
          return callback();
        } else if (!regRule.test(value)) {
          errors.push(new Error("请输入正确的电话，区号和号码中间用'-'连接"));
        }
        callback(errors);
      };
      // 传真校验
      let validateFax = (rule, value, callback) => {
        let errors = [];
        let regRule = this.$store.state.common.CHECK_CONST_DATA.phone;
        if (value === '' || value == null) {
          // errors.push(new Error("请输入传真"));
          return callback();
        } else if (!regRule.test(value)) {
          errors.push(new Error("请输入正确的传真，区号和号码中间用'-'连接"));
        }
        callback(errors);
      };
      // 校验手机号
      let validateTelePhone = (rule, value, callback) => {
        let errors = [];
        let regRule = this.$store.state.common.CHECK_CONST_DATA.telephone;
        if (!regRule.test(value)) {
          errors.push(new Error("请输入正确的手机号"));
        } else if (value === '') {
          errors.push(new Error("请输入手机号"));
        }
        callback(errors);
      };
      // 正则邮箱
      let validateMail = (rule, value, callback) => {
        let reg = this.$store.state.common.CHECK_CONST_DATA.email;
        if (value === '') {
          return callback('请输入邮箱');
        } else if (!reg.test(value)) {
          return callback(new Error('请输入合法的邮箱地址'));
        } else {
          return callback();
        }
      };
      // //正则传真
      // let validateFax = (rule, value, callback) => {
      //   let str = /^(\d{3,4}-)?\d*$/;
      //   if (!str.test(value)) {
      //     return callback(new Error('请输入正确的传真号'));
      //   } else {
      //     return callback();
      //   }
      // };
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
      // 正则英文
      let validateEn = (rule, value, callback) => {
        let errors = [];
        let validateEng = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameEn;
        // let validateEng = this.$store.state.common.CHECK_CONST_DATA.trimEnterpriseNameEn;
        if (value === '') {
          errors.push(new Error("请输入企业英文名称"));
        } else if (!validateEng.test(value)) {
          errors.push(new Error("不允许汉字及中文标点符号及全角括号，首位不可为空格"));
        }
        callback(errors);
      };

      // //正则人名
      // let validatePeople = (rule, value, callback) => {
      //   let str = /^[a-zA-Z\u4e00-\u9fa5 ]{1,}$/;
      //   if (!str.test(value)) {
      //     return callback(new Error('请输入正确人名'));
      //   } else {
      //     return callback();
      //   }
      // };
      // 正则营业执照号
      let validateNo = (rule, value, callback) => {
        let str = /^[A-Za-z0-9]{18}$/;
        if (value === '') {
          return callback(new Error('请输入营业执照号(18位数字或字母)'));
        } else if (!str.test(value)) {
          return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
        } else {
          return callback();
        }
        // {
        //   this.checkCompanyInfoByBusinessLicenceNoInfo(value).then(response => {
        //     if (!str.test(value)) {
        //       return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
        //     } else {
        //       return callback();
        //     }
        //   }).catch(error => {
        //     return callback(new Error('该企业统一社会信用代码/营业执照号已被注册'));
        //   });
        // }
      };
      //正则网址
      let validateWeb = (rule, value, callback) => {
        if (value === '') {
          return callback();
        } else {
          let str = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
          if (!str.test(value)) {
            return callback(new Error('请输入合法的网址'));
          } else {
            return callback();
          }
        }
      };
      return {
        // tab标题
        activeName: "first",
        companyId: '',
        fullscreenLoading: false,
        handeDate: {},
        returnName: "",
        nameCh: "",
        nameEn: "",
        isExist: false,
        // 表单禁用变量
        disabled: false,
        // 确认按钮只在0的时候不显示{0:查看；1：编辑；2：新增}
        isOp: "3",
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
          companyId: this.$store.state.userInfo.companyId,
          // 企业名称（中文）
          nameCh: "",
          // 企业名称（英文）
          nameEn: "",
          // 企业类型
          companyType: "",
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
            trigger: 'blur',
            validator: validateCn
          },
          {
            message: '企业名称（中文）重复设置',
            trigger: 'change'
            // validator: validateCnName
          }],
          nameEn: [{
            required: true,
            trigger: 'blur',
            validator: validateEn
          },
          {
            message: '企业名称（英文）重复设置',
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
            trigger: 'blur',
            validator: checkCnT
          }],
          addressEn: [{
            required: true,
            trigger: 'blur',
            validator: validateAddressEn
          }],
          businessLicenceNo: [{
            required: true,
            trigger: 'blur',
            validator: validateNo
          }],
          legalPerson: [{
            required: true,
            trigger: 'blur',
            validator: this.validatorLegalPerson
          }],
          customsRegisterNo: [{
            required: false,
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
            trigger: 'blur',
            validator: this.validatorContacts
            // validator: validatePeople
          }],
          telephone: [{
            required: true,
            trigger: 'blur',
            validator: validateTelePhone
          }],
          phone: [{
            required: false,
            trigger: 'blur',
            validator: validatePhone
          }],
          // 正则传真
          fax: [{
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
            trigger: 'blur',
            validator: this.validatorResponsiblePerson
            // validator: validatePeople
          }]
        }
      };
    },
    async beforeCreate() {
      this.dicCompanyAttribute = await kindo.dictionary.get('companyAttribute'); // 企业属性
      this.dicCompanyType = await kindo.dictionary.get('companyType'); // 企业类型
    },
    created() {
      this.companyId = this.$store.state.userInfo.companyId;
      // 从一般性展位跳转过来，暂存携参
      if (this.$route.query.data) {
        this.returnName = this.$route.query.returnName;
        this.handeDate = this.$route.query.data;
      }
      // 确定按钮是否显示
      this.isOp = this.$route.query.isOp;
      // 确定按钮不显示时为查看页面，所有输入框禁用
      if (this.isOp === "0") {
        this.disabled = true;
      }
      // 判断不为新增页面，获取详情信息
      if (this.$route.query.associateId) {
        this.getAssociateEnterprisesDetailInfo(this.$route.query.associateId).then(res => {
          this.ruleForm = JSON.parse(JSON.stringify(res));
          this.nameCh = res.nameCh;
          this.nameEn = res.nameEn;
        });
      }
      //获取字典数据
      // let dicData = JSON.parse(localStorage.getItem('dictData'));
      // this.dicCompanyAttribute = dicData.companyAttribute;
      // this.dicCompanyType = dicData.companyType;
    },
    computed: {
      ...mapGetters('JointVentureManagement', ['getPro', 'judgeInfo'])
    },
    methods: {
      ...mapActions("enterpriseRegister", ["checkCompanyInfoByBusinessLicenceNoInfo"]),
      ...mapActions('JointVentureManagement', ['addAssociateEnterprisesInfo', 'updateAssociateEnterprisesInfo',
        'getAssociateEnterprisesDetailInfo', 'judgeAssociateEnterprisesInfo'
      ]),
      // 校验法人代表
      validatorLegalPerson(rule, value, callback) {
        let str = this.$store.state.common.CHECK_CONST_DATA.notStartByBlank;
        if (value === '') {
          return callback(new Error('请输入法人代表'));
        } else if (!str.test(value)) {
          return callback(new Error('首位不可为空格'));
        } else {
          return callback();
        }
      },
      // 校验联系人
      validatorContacts(rule, value, callback) {
        let str = this.$store.state.common.CHECK_CONST_DATA.notStartByBlank;
        if (value === '') {
          return callback(new Error('请输入联系人'));
        } else if (!str.test(value)) {
          return callback(new Error('首位不可为空格'));
        } else {
          return callback();
        }
      },
      // 校验联营企业展位负责人
      validatorResponsiblePerson(rule, value, callback) {
        let str = this.$store.state.common.CHECK_CONST_DATA.notStartByBlank;
        if (value === '') {
          return callback(new Error('请输入联营企业展位负责人'));
        } else if (!str.test(value)) {
          return callback(new Error('首位不可为空格'));
        } else {
          return callback();
        }
      },
      // 确认提交
      submitForm(formName) {
        this.fullscreenLoading = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true;
            if (this.ruleForm.companyType === "1" || this.ruleForm.companyType === "4" || this.ruleForm.companyType === "9") {
              this.toRes();
            } else {
              this.$message({
                type: 'error',
                message: '联营企业类型只能选择生产企业或科研院所或其他企业!'
              });
              this.fullscreenLoading = false;
            }
            // 判断新增或编辑调不同接口
          } else {
            this.fullscreenLoading = false;
            this.$message.error("提交失败");
            return false;
          }
        });
      },
      toRes () {
        if (this.isExist && !this.$route.query.associateId) {
          this.$message({
            type: 'error',
            message: '该企业名称已存在,请重新输入！'
          });
        } else {
          this.fullscreenLoading = true;
          this.changeData();
        }
      },
      // 判断新增或编辑调不同接口方法
      changeData() {
        // 新增传参
        let param = this.ruleForm;
        // 编辑传参
        let upparam = {
          "associateEnterprisesInfos": [{
            companyId: this.$store.state.userInfo.companyId,
            nameCh: this.ruleForm.nameCh,
            nameEn: this.ruleForm.nameEn,
            companyType: this.ruleForm.companyType,
            addressCh: this.ruleForm.addressCh,
            addressEn: this.ruleForm.addressEn,
            businessLicenceNo: this.ruleForm.businessLicenceNo,
            legalPerson: this.ruleForm.legalPerson,
            customsRegisterNo: this.ruleForm.customsRegisterNo,
            companyAttribute: this.ruleForm.companyAttribute,
            contacts: this.ruleForm.contacts,
            telephone: this.ruleForm.telephone,
            phone: this.ruleForm.phone,
            fax: this.ruleForm.fax,
            email: this.ruleForm.email,
            website: this.ruleForm.website,
            responsiblePerson: this.ruleForm.responsiblePerson,
            associateId: this.ruleForm.associateId
          }]
        };
        // associateId存在调更新接口，为编辑页面
        if (this.$route.query.associateId) {
          this.updateAssociateEnterprisesInfo(upparam).then(res => {
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 1000);
            this.$message.success("提交成功");
            this.$router.push("/jointVentureManagement");
          }).catch(() => {
            this.fullscreenLoading = false;
          });
        } else {
          // 新增页面确认提交
          this.addAssociateEnterprisesInfo(param).then(res => {
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 1000);
            this.$message.success("提交成功");
            if (this.returnName === "brandApplyDataList") {
        // this.$router.push("/brand_applicat_list");
              this.$router.push({
                path: "/main_exhibits_apply",
                query: {
                  data: this.handeDate,
                  temp: true
                }
              });
            } else {
              this.$router.push("/jointVentureManagement");
            }
          }).catch(() => {
            this.fullscreenLoading = false;
          });
        }
      },
      checkName() {
        if (this.ruleForm.nameCh !== "" && this.ruleForm.nameCh !== this.nameCh) {
          this.searchEnParam.customQueryParams = [
            {
              "name": "nameCh",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.ruleForm.nameCh],
              "description": ""
            },
            {
              "name": "companyId",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.companyId],
              "description": ""
            }
          ],
          this.judgeAssociateEnterprisesInfo(this.searchEnParam).then(res => {
            if (res === "0") {
              this.isExist = true;
              this.$message({
                type: 'error',
                message: '该企业中文名称已注册,请重新输入！'
              });
            } else {
              this.isExist = false;
            }
          });
        }
      },
      checkNameEn() {
        if (this.ruleForm.nameEn !== "" && this.ruleForm.nameEn !== this.nameEn) {
          this.searchEnParam.customQueryParams = [
            {
              "name": "nameEn",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.ruleForm.nameEn],
              "description": ""
            },
            {
              "name": "companyId",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.companyId],
              "description": ""
            }
          ],
          this.judgeAssociateEnterprisesInfo(this.searchEnParam).then(res => {
            if (res === "0") {
              this.isExist = true;
              this.$message({
                type: 'error',
                message: '该企业英文名称已注册,请重新输入！'
              });
            } else {
              this.isExist = false;
            }
          });
        }
      },
      // 取消按钮，返回上一页
      resetForm() {
        if (this.returnName === "brandApplyDataList") {
        // this.$router.push("/brand_applicat_list");
          this.$router.push({
            path: "/main_exhibits_apply",
            query: {
              data: this.handeDate,
              temp: true
            }
          });
        } else {
          this.$router.back();
        }

      }
    }
  };

</script>
