/**
 * @file 企业联系方式
 */
<style scoped>
  .el-form-item {
    width: 600px;
    position: relative;
    left: 20%;
    margin-bottom: 22px;
  }
  .cb_confirm{
    position: relative;
    left: 28%;
    margin-top: 20px;
  }
  .el-form-item-btn {
    text-align: center;
  }
</style>
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="corConInfo"
      label-width="260px"
      class="demo-ruleForm"
      :label-position="labelPosition">
      <el-form-item label="地址（中文）：" prop="adressCh">
        <el-input v-model="ruleForm.adressCh" :disabled="disabledJytReview" placeholder="请输入地址（中文）" clearable maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="地址（英文）：" prop="adressEn">
        <el-input v-model="ruleForm.adressEn" :disabled="disabledJytReview" placeholder="请输入地址（英文）" clearable maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="邮政编码：" prop="postalCode">
        <el-input v-model="ruleForm.postalCode" :disabled="disabledJytReview" placeholder="请填写邮政编码" clearable maxlength="6"></el-input>
      </el-form-item>
      <el-form-item label="业务联系人姓名（中文）：" prop="businessContactsCh">
        <el-input v-model="ruleForm.businessContactsCh" :disabled="disabledJytReview" placeholder="请输入业务联系人姓名（中文）" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="" prop="businessContactsGender">
        <el-radio v-model="ruleForm.businessContactsGender" :disabled="disabledJytReview" label="1">先生</el-radio>
        <el-radio v-model="ruleForm.businessContactsGender" :disabled="disabledJytReview" label="2">女士</el-radio>
      </el-form-item>
      <el-form-item label="职位：" prop="businessContactsPosition" clearable>
        <el-select v-model="ruleForm.businessContactsPosition" :disabled="disabledJytReview" clearable placeholder="请选择">
          <el-option v-for="item in busPosition" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务联系人姓名（英文）：" prop="businessContactsEn">
        <el-input v-model="ruleForm.businessContactsEn" :disabled="disabledJytReview" placeholder="请输入业务联系人姓名（英文）" clearable maxlength="20"></el-input>
      </el-form-item>
      <!-- prop="telephone"  -->
      <el-form-item label="电话：" prop="telephone" style="margin-bottom: 0;" ref="telephone">
        <el-form-item label="" prop="telephoneInternationalCode" style="width: 120px;display: inline-block;left: auto;">
          <el-input v-model="ruleForm.telephoneInternationalCode" placeholder="国际区号" clearable maxlength="5"></el-input>
        </el-form-item>
        <span>-</span>
        <el-form-item label="" prop="telephoneCode" style="width: 120px;display: inline-block;left: auto;">
          <el-input v-model="ruleForm.telephoneCode" placeholder="区号" clearable maxlength="4"></el-input>
        </el-form-item>
        <span>-</span>
        <el-form-item label="" prop="telephoneCodeLast" style="width: 137px;display: inline-block;left: 0;">
          <el-input v-model="ruleForm.telephoneCodeLast" placeholder="号码" clearable maxlength="8"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机" clearable maxlength="11"></el-input>
      </el-form-item>
       <!-- prop="fax"  -->
      <el-form-item label="传真：" prop="fax" style="margin-bottom: 0;" ref="fax">
        <el-form-item label="" prop="faxInternationalCode" style="width: 120px;display: inline-block;left: auto;">
          <el-input v-model="ruleForm.faxInternationalCode" placeholder="国际区号" clearable maxlength="5"></el-input>
        </el-form-item>
        <span>-</span>
        <el-form-item label="" prop="faxCode" style="width: 120px;display: inline-block;left: auto;">
          <el-input v-model="ruleForm.faxCode" placeholder="区号" clearable maxlength="4"></el-input>
        </el-form-item>
        <span>-</span>
        <el-form-item label="" prop="faxCodeLast" style="width: 137px;display: inline-block;left: 0;">
          <el-input v-model="ruleForm.faxCodeLast" placeholder="号码" clearable maxlength="8"></el-input>
        </el-form-item>
        <!-- <el-input v-model="ruleForm.fax" placeholder="请输入传真" clearable maxlength="20"></el-input> -->
      </el-form-item>
      <el-form-item label="业务联系电子邮箱：" prop="businessContactsEmail">
        <el-input v-model="ruleForm.businessContactsEmail" :disabled="disabledJytReview" placeholder="请输入业务联系电子邮箱" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item><span style="font-size: 12px;">请输入公司的业务邮箱，不要使用私人邮箱，该邮箱将在展商展品查询公布</span></el-form-item>
      <!-- <el-form-item label="参展联系人：">
        {{ ruleForm.exhibitorContact }}
      </el-form-item>
      <el-form-item label="参展联系人手机：">
        {{ ruleForm.exhibitorContactPhone }}
      </el-form-item> -->
      <el-form-item label="参展联系人：" prop="exhibitorContact">
        <el-input maxlength="20" clearable v-model="ruleForm.exhibitorContact" placeholder="请输入参展联系人"></el-input>
      </el-form-item>
      <el-form-item label="参展联系人手机：" prop="exhibitorContactPhone">
        <el-input maxlength="11" clearable v-model="ruleForm.exhibitorContactPhone" :disabled="disabledJytReview" placeholder="请输入参展联系人手机"></el-input>
      </el-form-item>
      <el-form-item label="广交会参展业务专用联系电子邮箱：" prop="dedicatedEmail">
        <el-input v-model="ruleForm.dedicatedEmail" placeholder="请输入广交会参展业务专用联系电子邮箱" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item><span style="font-size: 12px;">请输入广交会参展业务专用联系电子邮件，该邮箱不在 展商展品查询 公布，仅用于接受广交会参展业务办理邮件联络，如：获取密码等业务。</span></el-form-item>
      <el-form-item label="企业网址：" prop="website">
        <el-input v-model="ruleForm.website" placeholder="请输入网址" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item prop="hideContactInfo">
        <el-checkbox v-model="ruleForm.hideContactInfo" :disabled="disabledJytReview" label="在展商展品查询中隐藏联系方式" name="type"></el-checkbox>
      </el-form-item>
    </el-form>
    <div class="el-form-item-btn">
      <el-button type="primary" @click="submitForm">提交</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    let checkExhibitorContactPhone = (rule, value, callback) => {
      let errors = [];
      let regOnlyEnglish = this.$store.state.common.CHECK_CONST_DATA.onlyBlank;
      let regTelephone = this.$store.state.common.CHECK_CONST_DATA.telephone;
      if (regOnlyEnglish.test(value)) {
        errors.push(new Error("不允许只输入空格"));
      } else if (!regTelephone.test(value)) {
        errors.push(new Error("请输入正确的手机号码"));
      }
      callback(errors);
    };
    return {
      // 设置表单对齐方式
      labelPosition: 'left',
      companyId: this.$store.state.userInfo.companyId,
      // 企业联系方式
      ruleForm: {
        companyId: this.$store.state.userInfo.companyId,
        // 地址中文
        adressCh: "",
        // 地址英文
        adressEn: "",
        // 邮编
        postalCode: "",
        // 业务联系人姓名（中文）
        businessContactsCh: "",
        // 性别
        businessContactsGender: "01",
        // 职务
        businessContactsPosition: "",
        // 业务联系人姓名（英文）
        businessContactsEn: "",
        // 电话国际区号
        telephoneInternationalCode: "",
        // 电话区号
        telephoneCode: "",
        // 电话号码
        telephoneCodeLast: "",
        // 电话
        telephone: "",
        // 手机
        phone: "",
        // 传真国际区号
        faxInternationalCode: "",
        // 传真区号
        faxCode: "",
        // 传真号码
        faxCodeLast: "",
        // 传真
        fax: "",
        // 业务联系电子邮箱
        businessContactsEmail: "",
        // 参展联系人
        exhibitorContact: "",
        // 参展联系人手机
        exhibitorContactPhone: "",
        // 广交会参展业务专用联系电子邮箱
        dedicatedEmail: "",
        // 网址
        website: "",
        // 我要去在展商展品查询中隐藏联系方式
        hideContactInfo: ""
      },
      // 职位数组
      busPosition: [],
      exhibitionTotalNum: 0,
      // 获取展位信息传参
      searchExhibition: {
        companyId: this.$store.state.userInfo.companyId,
        current: "1",
        size: "10"
      },
      rules: {
        // 地址（中文）
        adressCh: [
          { required: true, validator: this.checkAddressCh, trigger: "blur" }
        ],
        // 地址（英文）
        adressEn: [
          { required: true, validator: this.checkAddressEn, trigger: "blur" }
        ],
        // 邮政编码
        postalCode: [
          { required: true, validator: this.checkPostalCode, trigger: "blur" }
        ],
        // 业务联系人姓名（中文）
        businessContactsCh: [
          { required: true, validator: this.checkBusinessContactsCh, trigger: "blur" }
        ],
        // 业务联系人姓名（英文）
        businessContactsEn: [
          { required: true, validator: this.checkBusinessContactsEn, trigger: "blur" }
        ],
        // 性别
        businessContactsGender: [
          { required: true, message: "请输入业务联系人性别", trigger: "change" }
        ],
        // 职位
        businessContactsPosition: [
          { required: true, message: "请选择职位", trigger: "change" }
        ],
        // 校验电话国际区号
        telephoneInternationalCode: [
          { required: false, validator: this.checkPhoneInternationalCode, trigger: "blur" }
        ],
        // 电话区号
        telephoneCode: [
          { required: false, validator: this.checkTelePhoneCode, trigger: "blur" }
        ],
        // 电话号码
        telephoneCodeLast: [
          { required: false, validator: this.checkTelePhoneCode, trigger: "blur" }
        ],
        // 电话
        telephone: [
          { required: false, message: "", trigger: "blur" }
        ],
        // 手机
        phone: [
          { required: true, validator: this.checkPhone, trigger: "blur" }
        ],
        // 校验传真国际区号
        faxInternationalCode: [
          { required: true, validator: this.checkFaxInternationalCode, trigger: "blur" }
        ],
        // 传真区号
        // 修改人: 李康  传真 由必填 改为非必填 0504
        faxCode: [
          { required: false, validator: this.checkFax, trigger: "blur" }
        ],
        // 传真号码
        // 修改人: 李康  传真 由必填 改为非必填 0504
        faxCodeLast: [
          { required: false, validator: this.checkFax, trigger: "blur" }
        ],
        // 传真
        // 修改人: 李康  传真 由必填 改为非必填
        fax: [
          { required: false, message: "", trigger: "blur" }
        ],
        // 业务联系电子邮箱
        businessContactsEmail: [
          { required: true, validator: this.checkDedicatedEmail, trigger: "blur" }
        ],
        // 参展联系人校验
        exhibitorContact: [
          { required: true, validator: this.validateExhibitorContact, trigger: "blur" }
        ],
        // 参展联系人手机校验
        exhibitorContactPhone: [
          { required: true, message: "请输入参展联系人手机", trigger: "blur" },
          { validator: checkExhibitorContactPhone, trigger: 'blur' }
        ],
        // 广交会参展业务专用联系电子邮箱
        dedicatedEmail: [
          { required: true, validator: this.checkdedicatedEmail, trigger: "blur" }
        ],
        // 网址
        website: [
          { validator: this.checkWebsite, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    basEntInf: {
      type: Object,
      default: () => {}
    },
    disabledJytReview: {
      type: Boolean,
      default: false
    }
  },
  async beforeCreate() {
    this.busPosition = await kindo.dictionary.get('post'); // 职位字典
  },
  created() {
    let _this = this;
    // 获取一般性展位信息
    this.getGeneralStand(encodeURI(JSON.stringify(this.searchExhibition))).then(res => {
      this.exhibitionTotalNum = res.total;
    });
    this.getBasicInfo(_this.companyId).then(res => {
      if (res) {
        for (let key in res) {
          _this.dealWithFormData(key, res);
        }
        _this.dealWithData();
      }
    });
  },
  methods: {
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    ...mapActions("companyInfomation", ["getGeneralStand"]),
    // 初始化处理是否问题
    dealWithYesOrNo(value) {
      if (value === '1') {
        return true;
      } else {
        return false;
      }
    },
    // 循环遍历表单的数据
    dealWithFormData(key, res) {
      let _this = this;
      // 处理企业联系方式
      for (let ruleKey in _this.ruleForm) {
        if (res[key] && res[key] !== '' && key === ruleKey) {
          _this.$set(_this.ruleForm, ruleKey, res[key]);
        }
      }
    },
    // 处理相关数据
    dealWithData() {
      let _this = this;
      // 处理我要去在展商展品查询中隐藏联系方式
      _this.$set(_this.ruleForm, 'hideContactInfo', _this.dealWithYesOrNo(_this.ruleForm.hideContactInfo));
    },
    handleClick(tab, event) {

    },
    // 校验地址（中文）
    checkAddressCh(rule, value, callback) {
      let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      if (value === '') {
        return callback('请输入中文地址');
      } else if (!regRuleContainCh.test(value)) {
        return callback('必须包含汉字');
      } else {
        return callback();
      }
    },
    // 校验地址（英文）
    checkAddressEn(rule, value, callback) {
      // let englishContainBlock = this.$store.state.common.CHECK_CONST_DATA.notChinese;
      let englishContainBlock = this.$store.state.common.CHECK_CONST_DATA.notChAndNotStartByBlank;
      if (value === '') {
        return callback('请输入英文地址');
      } else if (!englishContainBlock.test(value)) {
        return callback('不允许输入汉字，首位不可为空格');
      } else {
        return callback();
      }
    },
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
    // 校验电话国际区号
    checkPhoneInternationalCode(rule, value, callback) {
      let englishContainBlock = /^\+?\d{0,4}$/;
      // if (value === '') {
      //   return callback('请输入');
      // } else
      if (!englishContainBlock.test(value)) {
        return callback(new Error('请输入正确的号码'));
      } else {
        return callback();
      }
    },
    // 校验电话
    checkTelePhoneCode(rule, value, callback) {
      let englishContainBlock = /^\d*$/;
      // if (value === '') {
      //   return callback('请输入');
      // } else
      if (!englishContainBlock.test(value)) {
        return callback(new Error('请输入正确的号码'));
      } else {
        return callback();
      }
    },
    // 校验电话国际区号
    checkFaxInternationalCode(rule, value, callback) {
      let englishContainBlock = /^\+?\d{0,4}$/;
      if (!englishContainBlock.test(value)) {
        return callback(new Error('请输入正确的号码'));
      } else {
        return callback();
      }
    },
    // 校验传真
    checkFax(rule, value, callback) {
      let englishContainBlock = /^\d*$/;
      if (!englishContainBlock.test(value)) {
        return callback(new Error('请输入正确的号码'));
      } else {
        return callback();
      }
    },
    // 校验手机号码
    checkPhone(rule, value, callback) {
      let reg = this.$store.state.common.CHECK_CONST_DATA.telephone;
      if (value === '') {
        return callback('请输入手机号码');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确的手机号码'));
      } else {
        return callback();
      }
    },
    // 校验邮政编码
    checkPostalCode(rule, value, callback) {
      let reg = /^\d{6}$/;
      if (value === '') {
        return callback('请输入邮政编码');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确的邮政编码'));
      } else {
        return callback();
      }
    },
    // 校验业务联系人姓名（中文）
    checkBusinessContactsCh(rule, value, callback) {
      let regRuleContainCh = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      if (value === '') {
        return callback('请输入业务联系人姓名（中文）');
      } else if (!regRuleContainCh.test(value)) {
        return callback('必须包含汉字');
      } else {
        return callback();
      }
    },
    // 校验业务联系人姓名（英文）
    checkBusinessContactsEn(rule, value, callback) {
      // let notChinese = this.$store.state.common.CHECK_CONST_DATA.notChinese;
      let notChinese = this.$store.state.common.CHECK_CONST_DATA.notChAndNotStartByBlank;
      if (value === '') {
        return callback('请输入业务联系人姓名（英文）');
      } else if (!notChinese.test(value)) {
        return callback('不允许输入汉字，首位不可为空格');
      } else {
        return callback();
      }
    },
    // 校验业务联系电子邮箱
    checkDedicatedEmail(rule, value, callback) {
      let reg = this.$store.state.common.CHECK_CONST_DATA.email;
      if (value === '') {
        return callback('请输入业务联系电子邮箱');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入合法的邮箱地址'));
      } else {
        return callback();
      }
    },
    // 校验广交会参展业务专用联系电子邮箱
    checkdedicatedEmail(rule, value, callback) {
      let reg = this.$store.state.common.CHECK_CONST_DATA.email;
      if (value === '') {
        return callback('请输入广交会参展业务专用联系电子邮箱');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入合法的邮箱地址'));
      } else {
        return callback();
      }
    },
    // 校验网址
    checkWebsite(rule, value, callback) {
      // let reg = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      let reg = /[.]/gi;
      if (value === '') {
        return callback();
      } else if (!reg.test(value)) {
        return callback(new Error('请输入合法的网址'));
      } else {
        return callback();
      }
    },
    // 处理提交时问题
    dealWithYesOrNoValue(value) {
      if (value) {
        return '1';
      } else {
        return '0';
      }
    },
    submitForm() {
      let corInfoForm = JSON.parse(JSON.stringify(this.ruleForm));
      // 处理电话
      corInfoForm.telephone = corInfoForm.telephoneInternationalCode + corInfoForm.telephoneCode + corInfoForm.telephoneCodeLast;
      this.ruleForm.telephone = corInfoForm.telephone;
      // 处理传真
      corInfoForm.fax = corInfoForm.faxInternationalCode + corInfoForm.faxCode + corInfoForm.faxCodeLast;
      this.ruleForm.fax = corInfoForm.fax;
      // 处理我要去在展商展品查询中隐藏联系方式
      corInfoForm.hideContactInfo = this.dealWithYesOrNoValue(corInfoForm.hideContactInfo);
      corInfoForm.reviewResult = 'null';
      // console.log('获取父组件', this.$parent.$parent);
      // console.log('获取父组件1', this.$parent.$parent.$children[0].$children[0].$refs['basicInfo']);
      // console.log('获取父组件2', this.$parent.$parent.$children[1].$children[0].$refs['comBraPatInfo']);
      // console.log('获取父组件3', this.$parent.$parent.$children[2].$children[0].$refs['entPatPurInfo']);
      // console.log('获取父组件4', this.$parent.$parent.$children[3].$children[0].$refs['corConInfo']);
      // this.$refs['corConInfo'].validate((valid) => {
      //   if (valid) {
      //     this.reviewCompanyDocs(corInfoForm).then(res => {
      //       this.$message({
      //         type: 'success',
      //         message: '提交成功'
      //       });
      //       // 通知父页面信息提交成功
      //       this.$emit('complete-cor-con-info', true);
      //       this.getBasicInfo(this.companyId).then(response => {
      //         if (response) {
      //           for (let key in response) {
      //             this.dealWithFormData(key, response);
      //           }
      //           this.dealWithData();
      //         }
      //       });
      //       if (this.exhibitionTotalNum < 4) {
      //         this.$router.push('/enterExManagement');
      //       }
      //       this.loading = false;
      //     }).catch(e => {
      //       this.loading = false;
      //       this.$message({
      //         showClose: true,
      //         message: e,
      //         type: 'error'
      //       });
      //       // 通知父页面信息提交失败
      //       this.$emit('complete-cor-con-info', false);
      //     });
      //   } else {
      //     setTimeout(() => {
      //       let isError = document.getElementsByClassName("is-error");
      //       isError[0].querySelector('input').focus();
      //     }, 1);
      //     this.$message({
      //       showClose: true,
      //       message: '企业联系方式验证未通过',
      //       type: 'error'
      //     });
      //     // 通知父页面信息提交失败
      //     this.$emit('complete-cor-con-info', false);
      //   }
      // });
      this.$parent.$parent.$children[0].$children[0].$refs['basicInfo'].validate((basicValid) => {
        if (basicValid) {
          this.$parent.$parent.$children[1].$children[0].$refs['comBraPatInfo'].validate((enterValid) => {
            if (enterValid) {
              this.$parent.$parent.$children[2].$children[0].$refs['entPatPurInfo'].validate((demValid) => {
                if (demValid) {
                  this.$parent.$parent.$children[3].$children[0].$refs['corConInfo'].validate((corValid) => {
                    if (corValid) {
                      this.reviewCompanyDocs(corInfoForm).then(res => {
                        this.$message({
                          type: 'success',
                          message: '提交成功'
                        });
                        // 通知父页面信息提交成功
                        this.$emit('complete-cor-con-info', true);
                        this.getBasicInfo(this.companyId).then(response => {
                          if (response) {
                            for (let key in response) {
                              this.dealWithFormData(key, response);
                            }
                            this.dealWithData();
                          }
                        });
                        if (this.exhibitionTotalNum < 4) {
                          this.$router.push('/enterExManagement');
                        }
                        this.loading = false;
                      }).catch(e => {
                        this.loading = false;
                        this.$message({
                          showClose: true,
                          message: e,
                          type: 'error'
                        });
                        // 通知父页面信息提交失败
                        this.$emit('complete-cor-con-info', false);
                      });
                    } else {
                      setTimeout(() => {
                        this.$parent.$parent.activeNames = [];
                        this.$parent.$parent.activeNames.push('fourth');
                        let isError = document.getElementsByClassName("is-error");
                        isError[0].querySelector('input').focus();
                      }, 1);
                      this.$message({
                        showClose: true,
                        message: '企业联系方式验证未通过',
                        type: 'error'
                      });
                      // 通知父页面信息提交失败
                      this.$emit('complete-cor-con-info', false);
                    }
                  });
                } else {
                  this.loading = false;
                  setTimeout(() => {
                    this.$parent.$parent.activeNames = [];
                    this.$parent.$parent.activeNames.push('third');
                    let isError = document.getElementsByClassName("is-error");
                    isError[0].querySelector('input').focus();
                  }, 1);
                  this.$message({
                    showClose: true,
                    message: '企业参展及贸易需求验证未通过',
                    type: 'error'
                  });
                }
              });
            } else {
              this.loading = false;
              setTimeout(() => {
                this.$parent.$parent.activeNames = [];
                this.$parent.$parent.activeNames.push('second');
                let isError = document.getElementsByClassName("is-error");
                isError[0].querySelector('input').focus();
              }, 1);
              this.$message({
                showClose: true,
                message: '企业品牌/认证/奖励/专利信息验证未通过',
                type: 'error'
              });
            }
          });
        } else {
          this.loading = false;
          setTimeout(() => {
            this.$parent.$parent.activeNames = [];
            this.$parent.$parent.activeNames.push('first');
            let isError = document.getElementsByClassName("is-error");
            isError[0].querySelector('input').focus();
          }, 1);
          this.$message({
            showClose: true,
            message: '企业基本信息验证未通过',
            type: 'error'
          });
        }
      });
    }
  }
};
</script>



