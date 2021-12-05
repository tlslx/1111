/**
 * @file 企业注册
 */
 <style scoped>
.el-tabs__header {
  margin-bottom: 25px;
}
.user-register-ruleForm >>> .el-button {
  width: 150px;
  height: 40px;
}
.el-form-item-btn >>> .el-form-item__content {
  margin-left: 0!important;
  width: 100%!important;
  text-align: center;
}
.cb_confirm {
  display: block;
  text-align: center;
}
.operate-container {
  margin: 0!important;
}
.operate-container >>> .el-form-item__content {
  margin-left: 0!important;
  width: 100%!important;
  text-align: center;
}
.user-register-ruleForm >>> .el-form-item__content {
  width: 390px;
}
.select-city {
  width: 182px;
}
.dialog-text {
  font-size: 16px;
  line-height: 2;
}
.container >>> .el-dialog__header {
  background-color: #fff;
  border: 0px;
}
.container >>> .el-dialog__footer {
  background-color: #fff;
  border: 0px;
}
.user-register-ruleForm >>> .el-checkbox {
  margin-right: 0;
}
.register-privacy-container >>> .el-dialog {
  margin-top: 5vh;
  height: 80%;
  overflow-y: scroll;
}
.register-privacy-container >>> .el-dialog__header {
  height: 22px;
}
.register-privacy-container >>> .el-dialog__body {
  padding: 0 50px;
  height: calc(100% - 150px);
}
.register-privacy-container >>> .el-button {
  position: relative;
  left: 50%;
  margin-left: -45px;
  margin-bottom: 20px;
}
</style>
<template>
  <div v-loading="loading">
    <!--<div style="margin-bottom: 7px;color: #d80c18;">可申请广交会展位</div>-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="280px" class="user-register-ruleForm" :label-position="labelPosition">
      <el-form-item label="企业中文名称：" prop="insertCompanyInfoSession.companyName">
        <el-input clearable maxlength="50" v-model="ruleForm.insertCompanyInfoSession.companyName" placeholder="请输入企业中文名称"></el-input>
      </el-form-item>
      <el-form-item label="企业英文名称：" prop="insertCompanyInfoSession.companyNameEn">
        <el-input clearable maxlength="100" v-model="ruleForm.insertCompanyInfoSession.companyNameEn" placeholder="请输入企业英文名称"></el-input>
      </el-form-item>
      <el-form-item label="企业统一社会信用代码/营业执照号：" prop="insertCompanyInfoSession.businessLicenceNo">
        <el-input clearable maxlength="18" v-model="ruleForm.insertCompanyInfoSession.businessLicenceNo" @change="changeBusinessLicenceNo" placeholder="请输入企业统一社会信用代码/企业营业执照"></el-input>
      </el-form-item>
      <el-form-item label="企业注册地：" required>
        <el-col :span="11">
          <el-form-item label="" style="margin-bottom: 0;">
            <!-- prop="insertCompanyInfoSession.provinces" -->
            <el-input clearable maxlength="100" disabled v-model="province"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-form-item label="" style="margin-bottom: 0;" prop="insertCompanyInfoSession.city">
            <el-select clearable v-model="ruleForm.insertCompanyInfoSession.city" placeholder="请选择" @change="cityChanged" class="select-city">
              <!-- <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
              <el-option v-for="item in city" :key="item.provinceCityId" :label="item.provinceCityName" :value="item.provinceCityId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="所属交易团：" prop="insertCompanyInfoSession.businessDelegationId">
        <el-select clearable v-model="ruleForm.insertCompanyInfoSession.businessDelegationId" placeholder="请选择" @change="selectBusiDelegation">
          <el-option v-for="item in businessDelegation" :key="item.enterprisesId" :label="item.enterprisesName" :value="item.enterprisesId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业简称：" prop="insertCompanyInfoSession.enterpriseAbbreviation">
        <el-col :span="11">
          <el-form-item label="" style="margin-bottom: 0;">
            <el-input clearable maxlength="8" v-model="enterprisesAbbreviation" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-form-item label="" style="margin-bottom: 0;" prop="insertCompanyInfoSession.enterpriseAbbreviation">
            <el-input class="select-city" clearable :maxlength="8 - enterprisesAbbreviation.length" v-model="ruleForm.insertCompanyInfoSession.enterpriseAbbreviation" placeholder="请输入企业简称"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="参展联系人：" prop="insertCompanyOtherInfoSession.exhibitorContact">
        <el-input maxlength="100" clearable v-model="ruleForm.insertCompanyOtherInfoSession.exhibitorContact" placeholder="请输入参展联系人"></el-input>
      </el-form-item>
      <el-form-item label="参展联系人手机：" prop="insertCompanyOtherInfoSession.exhibitorContactPhone">
        <el-input maxlength="11" clearable v-model="ruleForm.insertCompanyOtherInfoSession.exhibitorContactPhone" placeholder="请输入参展联系人手机"></el-input>
      </el-form-item>
      <el-form-item label="参展联系专用邮箱：" prop="insertCompanyOtherInfoSession.dedicatedEmail">
        <el-input maxlength="50" clearable v-model="ruleForm.insertCompanyOtherInfoSession.dedicatedEmail" placeholder="请输入广交会参展专用电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="" class="operate-container">
        <el-checkbox v-model="checked" @change="selectPrivacy" label="我已阅知并愿意遵守" name="type"></el-checkbox>
        <a href="#" @click="showPrivacy">《隐私条款》</a>
      </el-form-item>
      <el-form-item class="el-form-item-btn">
        <div style="color: #d80c18">友情提示：以上信息一经交易团审核通过后将不能修改，请确保信息准确、完整。</div>
        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
        <!-- <el-button @click="toLoginPage">取消</el-button> -->
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <div style="color:red;font-size:26px;" v-if="companyId === '0'">网络异常</div>
      <div class="dialog-text" v-else>
        <span>恭喜您注册成功！请牢记红色字段，它将用作您初始登录的账号密码。</span>
        <div style="color:red;font-size:26px;">{{ companyId }}</div>
      </div>
      
      <span slot="footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog class="register-privacy-container" :visible.sync="privacyDialogVisible">
      <privacy-policy></privacy-policy>
      <el-button type="primary" @click="confirmPrivacy">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import privacyPolicy from "./privacyPolicy";
export default {
  components: {
    'privacy-policy': privacyPolicy
  },
  data() {
    return {
      labelPosition: 'left',
      companyId: "",
      dialogVisible: false,
      // 隐私政策
      privacyDialogVisible: false,
      isExist: false,
      loading: false,
      checked: false,
      ruleForm: {
        insertCompanyInfoSession: {
          businessDelegationId: "", // 所属交易团
          provinces: "", // 省
          city: "", // 市
          companyName: "", // 企业名称（中文）
          companyNameEn: "", // 企业名称（英文）
          enterpriseAbbreviation: "", // 企业简称（中文）
          businessLicenceNo: "", // 企业营业执照
          isRead: "0" // 是否阅读隐私条款
        },
        insertCompanyOtherInfoSession: {
          exhibitorContact: "", // 参展联系人
          exhibitorContactPhone: "", // 参展联系人手机
          dedicatedEmail: "" // 广交会参展专用电子邮箱
        }
      },
      rules: {
        insertCompanyInfoSession: {
          customsCode: [{ validator: this.validateMail, trigger: "blur" }],
          tradeGroupType: [
            { required: true, message: "请选择", trigger: "change" }
          ],
          businessDelegationId: [
            { required: true, message: "请选择", trigger: "change" }
          ],
          // 企业中文简称
          enterpriseAbbreviation: [
            { required: true, validator: this.validateEnterAbbr, trigger: "blur" }
          ],
          provinces: [
            {
              required: true,
              message: "请选择省",
              trigger: "change"
            }
          ],
          city: [
            {
              required: true,
              message: "请选择市",
              trigger: "change"
            }
          ],
          companyName: [
            {
              required: true,
              // pattern: /[\u4e00-\u9fa5]/,
              message: "请输入企业中文名称",
              trigger: "blur"
            },
            { validator: this.checkCn, trigger: "blur" }
          ],
          companyNameEn: [
            {
              required: true,
              // pattern: /^[A-Za-z]+$/,
              message: "请输入企业英文名称",
              trigger: "blur"
            },
            { validator: this.checkEn, trigger: "blur" }
          ],
          businessLicenceNo: [
            { required: true, trigger: "blur", validator: this.validateNo }
          ]
        },
        insertCompanyOtherInfoSession: {
          exhibitorContact: [
            { required: true, validator: this.validateExhibitorContact, trigger: "blur" }
          ],
          exhibitorContactPhone: [
            {
              required: true,
              validator: (rule, value, callback) => {
                let errors = [];
                let regRule = this.$store.state.common.CHECK_CONST_DATA.telephone;
                if (!regRule.test(value)) {
                  errors.push(new Error("请输入正确的手机号"));
                } else if (value === '') {
                  errors.push(new Error("请输入参展联系人手机号"));
                }
                callback(errors);
              },
              trigger: "blur"
            }
          ],
          dedicatedEmail: [
            {
              required: true,
              message: "请输入广交会参展专用电子邮箱",
              trigger: "blur"
            },
            {
              type: "email",
              message: "请输入正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ]
        }
      },
      businessDelegation: [], // 所属交易团
      // 省code码
      provinceCode: '',
      // 省
      province: '',
      cityCode: '',
      // 市
      city: [],
      // 企业简称前面自动带部分
      enterprisesAbbreviation: '',
      // 企业简称后面填写部分
      enterpriseAbbreviation: ''
    };
  },
  async beforeCreate () {
  },
  created() {

  },
  computed: {
    ...mapGetters("enterpriseRegister", ["getStatus"]),
    ...mapGetters("dictionary", ["dictionaryData"]),
    ...mapGetters("countriesRegions", ["dicCountryCity"])
  },
  methods: {
    ...mapActions("enterpriseRegister", ["enterpriseRegistration", "checkCompanyInfoByNameInfo", "getDelegationAndProAndCityInfo", "checkCompanyInfoByBusinessLicenceNoInfo"]),
    // 正则参展联系人
    validateExhibitorContact(rule, value, callback) {
      let str = this.$store.state.common.CHECK_CONST_DATA.notStartByBlank;
      if (value === '') {
        return callback(new Error('请输入参展联系人'));
      } else if (!str.test(value)) {
        return callback(new Error('首位不可为空格'));
      } else {
        return callback();
      }
    },
    // 正则英文
    checkEn(rule, value, callback) {
      let errors = [];
      let validateEn = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameEn;
      // let validateEn = this.$store.state.common.CHECK_CONST_DATA.trimEnterpriseNameEn;
      if (value === '') {
        errors.push(new Error("请输入企业英文名称"));
      } else if (!validateEn.test(value)) {
        errors.push(new Error("不允许汉字及中文标点符号及全角括号，首位不可为空格"));
      }
      callback(errors);
    },
    // 正则企业名称中文
    checkCn(rule, value, callback) {
      let checkChineseName = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameCh;
      if (value === '') {
        return callback(new Error('请输入企业中文名称'));
      } else if (!checkChineseName.test(value)) {
        return callback(new Error('必须包含汉字，不允许半角括号'));
      } else {
        let param = {
          "nameSession":
          { "companyName": this.ruleForm.insertCompanyInfoSession.companyName }
        };
        this.checkCompanyInfoByNameInfo(param).then(res => {
          if (!res) {
            // this.isExist = true;
            return callback(new Error('该企业中文名称已注册,请重新输入！'));
          } else {
            return callback();
          }
          //  else {
          //   this.isExist = false;
          // }
        }).catch(e => {
          // this.isExist = false;
          if (e.indexOf('该名称已存在') > -1) {
            return callback(new Error('该名称已存在'));
          } else {
            return callback(new Error(e));
          }
        });
      }
    },
    // 正则10位海关编码
    validateMail(rule, value, callback) {
      let str = /^\d{10}$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确的10位海关编码'));
      } else {
        return callback();
      }
    },
    // 正则营业执照号
    validateNo(rule, value, callback) {
      let str = /^[A-Za-z0-9]{18}$/;
      // 大于等于4位截取第三位和第四位数字
      let validBusinessLicenceNo = '';
      validBusinessLicenceNo = value.length >= 4 ? value.substr(2, 2) : '';
      if (value === '') {
        return callback(new Error('请输入营业执照号(18位数字或字母)'));
      } else if (!str.test(value)) {
        return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
      } else {
        this.getDelegationAndProAndCityInfo(validBusinessLicenceNo).then(res => {
          this.province = res && res.province ? res.province.provinceCityName : '';
          this.provinceCode = res && res.province && res.province.provinceCityId ? res.province.provinceCityId : '';
          this.city = res && res.city ? res.city : [];
          this.businessDelegation = res && res.businessDelegation ? res.businessDelegation : [];
          this.checkCompanyInfoByBusinessLicenceNoInfo(value).then(response => {
            if (String(res.province) === 'null' || String(response) !== 'null') {
              return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
            } else {
              return callback();
            }
          }).catch(error => {
            return callback(new Error('该企业统一社会信用代码/营业执照号已被注册'));
            // return callback();
          });
        }).catch(e => {
          return callback(new Error(e));
          // return callback();
        });
      }
    },
    // 修改营业执照号
    changeBusinessLicenceNo() {
      this.province = '';
      this.ruleForm.insertCompanyInfoSession.city = '';
      this.ruleForm.insertCompanyInfoSession.businessDelegationId = '';
      this.enterprisesAbbreviation = '';
    },
    // 根据用户选择的所属交易团显示企业简称文字
    selectBusiDelegation(val) {
      if (this.businessDelegation.length > 0) {
        this.businessDelegation.forEach((value, index, array) => {
          if (val === value.enterprisesId) {
            this.enterprisesAbbreviation = value.enterprisesAbbreviation;
          }
        });
      }
    },
    // 校验企业简称
    validateEnterAbbr(rule, value, callback) {
      if (value === '') {
        return callback('请输入企业简称');
        // !(this.ruleForm.insertCompanyInfoSession.companyName.indexOf(value) > -1)
      } else if (!this.judeKeyWord(value)) {
        return callback('关键字必须来源于企业所填的中文名称');
      } else if (value.length + this.enterprisesAbbreviation.length > 8) {
        return callback('总字数不能超过' + (8 - this.enterprisesAbbreviation.length) + '个字');
      } else {
        return callback();
      }
    },
    judeKeyWord(word) {
      let words = this.ruleForm.insertCompanyInfoSession.companyName.split('');
      let currentWord = word.split('');
      let flag = true;
      for (let i = 0; i <= currentWord.length; i++) {
        if (currentWord[i] && (words.indexOf(currentWord[i]) < 0)) {
          flag = false;
        }
      }
      return flag;
    },
    // 校验是否包含重复部分
    containRepeatPart(prevStr, targetStr) {
      let hasRepeat = false;
      let prevArr = prevStr.split('');
      let targetArr = targetStr.split('');
      if (prevArr.length > 0) {
        prevArr.forEach((prevVal, prevIndex) => {
          if (targetArr.length > 0) {
            targetArr.forEach((targetVal, targetIndex) => {
              if (prevVal === targetVal) {
                hasRepeat = true;
              }
            });
          }
        });
      }
      return hasRepeat;
    },
    // 校验英文名称重名
    checkNameEn() {
      if (this.ruleForm.insertCompanyInfoSession.companyNameEn !== "") {
        let param = {
          "nameSession":
          {
            "companyNameEn": this.ruleForm.insertCompanyInfoSession.companyNameEn
          }
        };
        this.checkCompanyInfoByNameInfo(param).then(res => {
          if (res === false) {
            this.isExist = true;
            this.$message({
              type: 'error',
              message: '该企业英文名称已注册,请重新输入！'
            });
          } else {
            this.isExist = false;
          }
        }).catch(e => {
          this.isExist = false;
          if (e.indexOf('该名称已存在') > -1) {
            this.$message.error('该名称已存在');
          } else {
            this.$message.error(e);
          }
        });
      }
    },
    cityChanged: function(city) {},
    // 查看隐私条款
    showPrivacy() {
      this.privacyDialogVisible = !this.privacyDialogVisible;
    },
    // 关闭隐私条款窗口
    confirmPrivacy() {
      this.privacyDialogVisible = false;
    },
    // 是否勾选阅读隐私协议
    selectPrivacy(val) {

    },
    submitForm() {
      if (this.checked) {
        this.ruleForm.insertCompanyInfoSession.provinces = this.provinceCode;
        this.ruleForm.insertCompanyInfoSession.isRead = "1";
        let registerParams = JSON.parse(JSON.stringify(this.ruleForm));
        registerParams.insertCompanyInfoSession.enterpriseAbbreviation = this.enterprisesAbbreviation + registerParams.insertCompanyInfoSession.enterpriseAbbreviation;
        let _this = this;
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.loading = true;
            _this.enterpriseRegistration(registerParams).then(res => {
              this.loading = false;
              if (res && res !== '') {
                let accountInfo = res.split(',');
                this.companyId = '账号：' + accountInfo[0] + '  密码：' + accountInfo[1];
              }
              this.dialogVisible = true;
            }).catch(e => {
              this.loading = false;
              _this.$message.error(e);
            });
          } else {
            this.$message.error("请输入正确的信息");
          }
        });
      } else {
        this.$message.error("请仔细阅读隐私条款后确认并提交");
      }
    },
    confirm() {
      this.$confirm("您确认已经记住您的账号密码？", "提示信息", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: "success",
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '注册成功!'
        });
        this.dialogVisible = false;
        this.$router.push("/index");
      });
    }
  }
};
</script>



