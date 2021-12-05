/**
 * @file 企业重要信息修改
 */
<style scoped>
  .import-info-attention {
    text-align: center;
    font-size: 14px;
    color: #d80c18;
  }
  .el-form {
    width: 600px;
    margin: 50px auto;
  }
  .el-form-item {
    position: relative;
  }
  .el-form-item-btn {
    position: relative;
    left: 20%;
    margin-top: 50px;
  }
  .cb_confirm {
    position: relative;
    left: 28%;
    margin-top: 20px;
  }
  .review-plan {
    float: right;
  }
  .btn-notice {
    float: right;
  }
  .btn-text {
    color: #d80c18;
    text-decoration: underline;
    cursor: pointer;
  }
  .btn-pass {
    background-color: #d80c18;
  }
  .btn {
    padding: 0 10px;
    background: #d80c18;
    color: #fff;
    border-radius: 5px;
  }
  .dialog-form .el-form-item {
    margin-left: -20%;
  }
</style>
<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="企业重要信息修改" name="first" @tab-click="handleClick">
      <div class="import-info-attention">如需对本企业重要信息进行修改，请相应上传对应证明材料。上传格式为jpg或者pdf格式。如果多张图片，可以合并成一个pdf文件再上传。单个文件大小不能超过500K。</div>
      <div class="import-info-attention">重要信息修改申请提交后，由本企业所属交易团进行初审。如有疑问，请与所属交易团联系。</div>
      <el-form
        v-loading="loading"
        ref="ruleForm"
        label-width="180px"
        class="demo-ruleForm">
        <el-form-item v-for="(item, index) in infoList"
          :key="index"
          :label="item.label + '：'">
          {{ item.value }}
          <div :class="getClassByReviewStatus(item.auditResults)" @mouseover="toDetail(item)" @click="goEdit(item)">{{ item.auditResults }}</div>
          <div style="float: right;clear: both;" v-if="item.auditResults === '审核不通过，点击再次修改' && item.approveExplain && item.approveExplain !== ''">不通过原因：{{item.approveExplain}}</div>
          <!-- @mouseleave.stop="closeDetail" -->
        </el-form-item>
         <el-form-item style="text-align: center;">
          <el-button type="primary" @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
      <!-- 修改企业重要信息弹出层开始 -->
      <ent-dialog :dialogFormVisible="dialogFormVisible"
        ref="entDialog"
        :formInfo="form"
        :rules="rules"
        @close-dialog-info="closeDialogInfo"
        @confirm-dialog-info="confirmDialogInfo">
      </ent-dialog>
      <!-- 修改企业重要信息弹出层结束 -->
      <!-- 修改企业中文名称弹出层开始 -->
      <ent-sub-dialog :subDialogFormVisible="subDialogFormVisible"
        ref="subEntDialog"
        :subFormInfo="subForm"
        :subRules="subRules"
        :showEnterAbbr="showEnterAbbr"
        @sub-close-dialog-info="subCloseDialogInfo"
        @sub-confirm-dialog-info="subConfirmDialogInfo">
      </ent-sub-dialog>
      <!-- 修改企业中文名称弹出层结束 -->
      <!-- 查看企业详细信息开始 -->
      <ent-imp-inf-mod-detail
        :dialogFormVisible="detailDialogFormVisible"
        @close-ent-imp-inf-mod-detail="closeDetailDialog"
        :detailInfo="detailInfo">
      </ent-imp-inf-mod-detail>
      <!-- 查看企业详细信息结束 -->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import entImpInfModDialog from "@/components/project/onlineService/enterpriseApplyManage/entImpInfModDialog";
import entImpInfModSubDialog from "@/components/project/onlineService/enterpriseApplyManage/entImpInfModEnterNameDialog";
import entImpInfModDetail from "@/components/project/onlineService/enterpriseApplyManage/entImpInfModDetail";
import { mapActions, mapGetters } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  components: {
    'ent-dialog': entImpInfModDialog,
    'ent-sub-dialog': entImpInfModSubDialog,
    'ent-imp-inf-mod-detail': entImpInfModDetail
  },
  data() {
    return {
      loading: false,
      activeName: "first",
      // 修改企业中文名称后修改企业简介
      showEnterAbbr: false,
      // 获取公司资料页面的省市交易团信息
      routeInfo: {},
      // 所属企业简称中的交易团信息
      enterpriseAbbreviation: "",
      //是否审核
      isAudit: false,
      // 修改弹出框
      dialogFormVisible: false,
      // 修改名称弹出框
      subDialogFormVisible: false,
      // 修改弹出框label
      label: "",
      // 详情信息
      detailDialogFormVisible: false,
      detailInfo: {},
      activeIndex: 0,
      // 修改弹出框表单
      form: {
        "label": "",
        "prop": "",
        "value": "",
        "proofUrl": "",
        "tips": "",
        "auditResults": "",
        "modifyImportId": ""
      },
      subForm: {
        "company_name": "",
        "enterprise_abbreviation": "",
        "prevInfo": "",
        "proofUrl": "",
        "subProofUrl": ""
      },
      ruleForm: {
        // 企业名称（中文）
        companyName: "",
        // 企业名称
        companyNameEn: "",
        // 海关编码
        customsCode: "",
        // // 进出口代码
        importExportCode: "",
        // 营业执照号
        businessLicenceNo: "",
        // 企业简称
        enterpriseAbbreviation: "",
        // 审核进度
        auditStatus: "待审核"
      },
      rules: {
        "company_name_en": [
          { required: true, validator: this.checkEn, trigger: 'blur' }
        ],
        "customs_code": [
          { required: true, validator: this.validateMail, trigger: 'blur' }
        ],
        "import_export_code": [
          { required: true, validator: this.validateImportExportCode, trigger: 'blur' }
        ],
        "business_licence_no": [
          { required: true, validator: this.validateNo, trigger: 'blur' }
        ],
        "enterprise_abbreviation": [
          { required: true, validator: this.validateEnterAbbr, trigger: 'blur' }
        ]
        // "proofUrl": [
        //   { required: true }
        // ]
      },
      subRules: {
        "company_name": [
          { required: true, validator: this.checkCn, trigger: 'blur' }
        ],
        "enterprise_abbreviation": [
          { required: true, validator: this.subValidateEnterAbbr, trigger: 'blur' }
        ]
        // "proofUrl": [
        //   { required: true }
        // ]
      },
      // 审核进度
      auditResults: [
        {
          "label": "待审核",
          "code": "null",
          "value": "null"
        },
        {
          "label": "审核不通过",
          "code": "0",
          "value": "0"
        },
        {
          "label": "待审核",
          "code": "1",
          "value": "1"
        },
        {
          "label": "待审核",
          "code": "2",
          "value": "2"
        },
        {
          "label": "审核通过",
          "code": "3",
          "value": "3"
        }
      ],
      infoList: [
        {
          "label": "企业名称（中文）",
          "prop": "company_name",
          "value": "",
          "oldContent": "",
          "maxlength": "80",
          "tips": "请上传当地工商部门开具的变更证明，以及企业法人营业执照（如果有多张图片，可以合并成一个pdf文件再上传。）",
          "modifyImportId": "",
          "approveExplain": ""
        },
        {
          "label": "企业名称（英文）",
          "prop": "company_name_en",
          "value": "",
          "oldContent": "",
          "maxlength": "100",
          "tips": "请上传对外贸易经营者备案登记表（或外商投资企业批准证书）（如果有多张图片，可以合并成一个pdf文件再上传。）",
          "modifyImportId": "",
          "approveExplain": ""
        },
        {
          "label": "海关编码",
          "prop": "customs_code",
          "value": "",
          "oldContent": "",
          "maxlength": "10",
          "tips": "请上传当地工商部门开具的变更证明，或海关进出口货物收发货人报关注册登记证书（如果有多张图片，可以合并成一个pdf文件再上传。）",
          "modifyImportId": "",
          "approveExplain": ""
        },
        {
          "label": "进出口代码",
          "prop": "import_export_code",
          "value": "",
          "oldContent": "",
          "maxlength": "20",
          "tips": "请上传当地工商部门开具的变更证明，或营业执照，或对外贸易经营者备案登记表（如果有多张图片，可以合并成一个pdf文件再上传。）",
          "modifyImportId": "",
          "approveExplain": ""
        },
        {
          "label": "企业统一社会信用代码",
          "prop": "business_licence_no",
          "value": "",
          "oldContent": "",
          "maxlength": "18",
          "tips": "请上传当地工商部门开具的变更证明或营业执照（如果有多张图片，可以合并成一个pdf文件再上传。）",
          "modifyImportId": "",
          "approveExplain": ""
        },
        {
          "label": "企业简称",
          "prop": "enterprise_abbreviation",
          "value": "",
          "oldContent": "",
          "maxlength": "8",
          "tips": "填写格式为：所属交易团简称+企业名称关键字。提示：假如同时修改了企业中文名称，因尚未生效，系统还以旧名称来判断简称规则。请等待中文名称审核通过生效后，再修改简称",
          "modifyImportId": "",
          "approveExplain": ""
        }
      ]
    };
  },
  created() {
    this.routeInfo = Object.assign(this.$route.query, {});
    this.loading = true;
    this.getImportantReviewProgress(this.$store.state.userInfo.companyId).then(res => {
      this.loading = false;
    }).catch(e => {
      this.loading = false;
    });
    this.dealWithEnterprisesAbbreviation();
  },
  mounted() {
  },
  computed: {
    ...mapGetters('corpDataManagement', ['importDocReviewProgress']),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  methods: {
    ...mapActions('corpDataManagement', ['reviewCompanyInfo', 'modifyImportCompanyInfos', 'getImportantReviewProgress', 'modifyUnPassImportCompanyInfos']),
    ...mapActions('enterpriseRegister', ['getDelegationAndProAndCityInfo', 'checkCompanyInfoByBusinessLicenceNoInfo']),
    handleClick(tab, event) {
    },
    // 获取企业名称简称的label
    dealWithEnterprisesAbbreviation() {
      if (this.routeInfo.businessDelegation.length > 0) {
        this.routeInfo.businessDelegation.forEach((value, index, array) => {
          if (this.routeInfo.businessDelegationId === value.enterprisesId) {
            this.enterpriseAbbreviation = value.enterprisesAbbreviation;
            this.subForm.prevInfo = this.enterpriseAbbreviation;
          }
        });
      }
    },
    // 正则英文
    checkEn(rule, value, callback) {
      let errors = [];
      let validateEn = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameEn;
      // let validateEn = this.$store.state.common.CHECK_CONST_DATA.trimEnterpriseNameEn;
      if (!value || value === '') {
        errors.push(new Error("请输入企业名称英文"));
      } else if (!validateEn.test(value)) {
        errors.push(new Error("不允许汉字及中文标点符号及全角括号，首位不能为空格"));
      }
      callback(errors);
    },
    // 正则企业名称中文
    checkCn(rule, value, callback) {
      let checkChineseName = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameCh;
      // 处理修改企业中文名称后的企业简称是否要修改问题
      let enterAbbr = '';
      if (this.infoList[5].value && (this.infoList[5].value.indexOf(this.enterpriseAbbreviation) > -1)) {
        enterAbbr = this.infoList[5].value.substr(this.enterpriseAbbreviation.length);
      } else {
        enterAbbr = this.infoList[5].value;
      }
      //  || !(value.indexOf(this.infoList[5].value) > -1)
      if (value && !(value.indexOf(enterAbbr) > -1)) {
        this.showEnterAbbr = true;
        this.$message({
          type: 'info',
          message: '企业中文名称发生变化，请修改企业简称'
        });
      } else {
        this.showEnterAbbr = false;
      }
      if (!value || value === '') {
        return callback(new Error('请输入企业中文名称'));
      } else if (!checkChineseName.test(value)) {
        return callback(new Error('必须包含汉字，不允许半角括号'));
      } else {
        return callback();
      }
    },
    // 正则10位海关编码
    validateMail(rule, value, callback) {
      let str = /^[0-9a-zA-Z]{10}$/;
      if (!value || value === '') {
        return callback(new Error('请输入海关编码'));
      } else if (!str.test(value)) {
        return callback(new Error('请输入正确的10位海关编码'));
      } else {
        return callback();
      }
    },
    // 校验进出口代码
    validateImportExportCode(rule, value, callback) {
      let str = /^[A-Z\d]+$/;
      if (!value || value === '') {
        return callback(new Error('请输入进出口代码'));
      } else if (!str.test(value)) {
        return callback(new Error('请输入正确的进出口代码，数字或大写字母'));
      } else {
        return callback();
      }
    },
    // 正则营业执照号
    validateNo(rule, value, callback) {
      let str = /^[A-Za-z0-9]{18}$/;
      // 大于等于4位截取第三位和第四位数字
      let validBusinessLicenceNo = '';
      if (!value || value === '') {
        return callback(new Error('请输入营业执照号(18位数字或字母)'));
      } else {
        validBusinessLicenceNo = value.length >= 4 ? value.substr(2, 2) : '';
        this.getDelegationAndProAndCityInfo(validBusinessLicenceNo).then(res => {
          this.checkCompanyInfoByBusinessLicenceNoInfo(value).then(response => {
            if (String(res.province) === 'null' || !str.test(value)) {
              return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
            } else {
              return callback();
            }
          }).catch(error => {
            return callback(new Error('该企业统一社会信用代码/营业执照号已被注册'));
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: 'error'
          });
        });
      }
    },
    // 校验企业简称
    validateEnterAbbr(rule, value, callback) {
      if (!value || value === '') {
        return callback('请输入企业简称');
      } else if (!this.judeKeyWord(value)) {
        return callback('关键字必须来源于企业所填的中文名称');
      } else if ((value.length + this.enterpriseAbbreviation.length) > 8) {
        return callback('总字数不能超过' + (8 - this.enterpriseAbbreviation.length) + '个字');
      } else {
        return callback();
      }
    },
    // 判断企业简称是否包含在企业中文名称中
    judeKeyWord(word) {
      let words = this.infoList[0].value.split('');
      let currentWord = word.split('');
      let flag = true;
      for (let i = 0; i <= currentWord.length; i++) {
        if (currentWord[i] && (words.indexOf(currentWord[i]) < 0)) {
          flag = false;
        }
      }
      return flag;
    },
    // 企业名称页面校验企业简称
    subValidateEnterAbbr(rule, value, callback) {
      let companyName = this.$refs['subEntDialog'].$refs['subEditImporInfo'].model['company_name'];
      if (companyName === '') {
        companyName = this.infoList[0].value.indexOf(value);
      } else {
        companyName = this.$refs['subEntDialog'].$refs['subEditImporInfo'].model['company_name'];
      }
      if (!value || value === '') {
        return callback('请输入企业简称');
      } else if (!this.subJudeKeyWord(value, companyName)) {
        return callback('关键字必须来源于企业所填的中文名称');
      } else if ((value.length + this.enterpriseAbbreviation.length) > 8) {
        return callback('总字数不能超过' + (8 - this.enterpriseAbbreviation.length) + '个字');
      } else {
        return callback();
      }
    },
    // 企业名称页面校验企业简称
    subJudeKeyWord(word, companyName) {
      let words = companyName.split('');
      let currentWord = word.split('');
      let flag = true;
      for (let i = 0; i <= currentWord.length; i++) {
        if (currentWord[i] && (words.indexOf(currentWord[i]) < 0)) {
          flag = false;
        }
      }
      return flag;
    },
    // 获取审核状态
    getReviewStatus(reviewStatus) {
      let reviewText = '点击进行修改';
      if (reviewStatus && reviewStatus === '0') {
        reviewText = '审核不通过，点击再次修改';
      } else if (reviewStatus && reviewStatus === '3') {
        reviewText = '审核通过，点击再次修改';
      } else if (reviewStatus && reviewStatus === '1' || reviewStatus === '2') {
        reviewText = $helper.getDicLabel(this.auditResults, reviewStatus);
      }
      return reviewText;
    },
    // 根据审核状态加载不同样式
    getClassByReviewStatus(auditResults) {
      if (auditResults === '点击进行修改' || auditResults === '审核不通过，点击再次修改' || auditResults === '审核通过，点击再次修改') {
        return 'btn-text btn-notice';
      } else {
        return 'btn-notice btn';
      }
    },
    // 编辑重要信息
    goEdit(item) {
      this.form.label = item.label;
      this.form.prop = item.prop;
      if (this.form.prop === 'enterprise_abbreviation' || this.form.prop === 'company_name') {
        this.form.hasPrevInfo = true;
        this.form.prevInfo = this.enterpriseAbbreviation;
      } else {
        this.form.hasPrevInfo = false;
      }
      this.form['enterprise_abbreviation'] = this.infoList[5].value;
      this.form.value = '';
      this.form[item.prop] = '';
      this.form.proofUrl = "";
      this.form.oldContent = item.value;
      this.form.tips = item.tips;
      this.form.maxlength = item.maxlength;
      this.form.auditResults = item.auditResults;
      this.form.modifyImportId = item.modifyImportId;
      this.subForm = Object.assign(this.subForm, this.form);
      // console.log(this.subForm);
      if (item.auditResults === '点击进行修改' || item.auditResults === '审核不通过，点击再次修改' || item.auditResults === '审核通过，点击再次修改' || !item.auditResults) {
        if (item.prop === 'company_name') {
          this.subDialogFormVisible = true;
        } else {
          this.dialogFormVisible = true;
        }
      }
    },
    // 鼠标悬停显示详细信息
    toDetail(item) {
      if (item.auditResults === '审核通过' || item.auditResults === '审核不通过' || item.auditResults === '待审核') {
        this.detailInfo = item;
        if (this.detailInfo.oldContent && this.detailInfo.oldContent !== '') {
          this.detailInfo.oldContent = this.detailInfo.oldContent.replace('-', '');
        }
        if (this.detailInfo.newContent && this.detailInfo.newContent !== '') {
          this.detailInfo.newContent = this.detailInfo.newContent.replace('-', '');
        }
        this.detailDialogFormVisible = true;
      }
    },
    // 关闭详情弹层
    closeDetailDialog() {
      this.detailDialogFormVisible = false;
    },
    // 关闭弹出层
    closeDialogInfo() {

      this.dialogFormVisible = false;
    },
    // 关闭名称弹出层
    subCloseDialogInfo() {
      this.subDialogFormVisible = false;
      this.showEnterAbbr = false;
    },
    // 返回上一个页面
    goBack() {
      this.$router.push('/basEntInf');
    },
    // 处理审核不通过情况
    dealWithUnPassCondition(form, formType) {
      let param = {
        "modifyImportId": form.modifyImportId,
        "companyId": this.$store.state.userInfo.companyId,
        "colname": form.prop,
        "oldContent": form.oldContent,
        "newContent": form.newContent,
        "auditResults": "1",
        "deleApproveResult": null, // 审核不通过后重新申请时，将审核结果重置为待审核
        "proofUrl": form.proofUrl
      };
      // 添加文件名
      if (form.proofUrlName) {
        param.proofUrlName = form.proofUrlName;
      }
      if (formType === 'main') {
        this.dialogFormVisible = false;
      } else {
        this.subDialogFormVisible = false;
      }
      // console.log(param);
      this.modifyUnPassImportCompanyInfos(param).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功'
        });
      }).then(response => {
        this.loading = true;
        this.getImportantReviewProgress(this.$store.state.userInfo.companyId).then(reso => {
          this.loading = false;
        });
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 处理审核通过情况
    dealWithPassCondition(form, formType) {
      let param = {
        "insertImportCompanyInfoSession":
        {
          "companyId": this.$store.state.userInfo.companyId,
          "colname": form.prop,
          "oldContent": form.oldContent,
          "newContent": form.newContent,
          "auditResults": "1",
          "proofUrl": form.proofUrl
        }
      };
      // 添加文件名
      if (form.proofUrlName) {
        param.insertImportCompanyInfoSession.proofUrlName = form.proofUrlName;
      }
      if (formType === 'main') {
        this.dialogFormVisible = false;
      } else {
        this.subDialogFormVisible = false;
      }
      // console.log(param);
      this.modifyImportCompanyInfos(param).then(res => {
        this.$message({
          type: 'success',
          message: '提交成功'
        });
      }).then(response => {
        this.loading = true;
        this.getImportantReviewProgress(this.$store.state.userInfo.companyId).then(reso => {
          this.loading = false;
        });
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 确认修改
    confirmDialogInfo(form) {
      if (form.prop === 'enterprise_abbreviation') {
        form.oldContent = form.prevInfo && form.prevInfo !== '' ? form.prevInfo + form.oldContent : form.oldContent;
        form.newContent = form.prevInfo && form.prevInfo !== '' ? form.prevInfo + form.value : form.value;
      } else {
        form.newContent = form.value;
      }
      // 处理审核不通过情况
      if (form.auditResults === '审核不通过，点击再次修改') {
        this.dealWithUnPassCondition(form, 'main');
      } else {
        this.dealWithPassCondition(form, 'main');
      }
    },
    // 处理审核不通过传参
    dealWithSubUnPass(enterNameParams) {
      let currentEnterNameParams = JSON.parse(JSON.stringify(enterNameParams));
      this.infoList.forEach((value, index, array) => {
        if (value.prop === currentEnterNameParams.prop) {
          currentEnterNameParams.modifyImportId = value.modifyImportId;
          currentEnterNameParams.colname = value.colname;
        }
      });
      if (currentEnterNameParams.prop === 'enterprise_abbreviation') {
        currentEnterNameParams.newContent = this.enterpriseAbbreviation !== '' && (currentEnterNameParams.value.substr(0, 2) !== this.enterpriseAbbreviation) ? this.enterpriseAbbreviation + '-' + currentEnterNameParams.value : currentEnterNameParams.value;
        if (this.enterpriseAbbreviation !== '' && currentEnterNameParams.oldContent && currentEnterNameParams.oldContent !== '' && (currentEnterNameParams.oldContent.substr(0, 2) === this.enterpriseAbbreviation)) {
          currentEnterNameParams.oldContent = this.enterpriseAbbreviation + '-' + currentEnterNameParams.oldContent.replace(this.enterpriseAbbreviation, '');
        } else {
          currentEnterNameParams.oldContent = this.enterpriseAbbreviation !== '' && (currentEnterNameParams.oldContent.substr(0, 2) !== this.enterpriseAbbreviation) ? this.enterpriseAbbreviation + '-' + currentEnterNameParams.oldContent : currentEnterNameParams.oldContent;
        }
      } else {
        currentEnterNameParams.newContent = currentEnterNameParams.value;
      }
      currentEnterNameParams.companyId = this.$store.state.userInfo.companyId;
      currentEnterNameParams.auditResults = '1';
      if (currentEnterNameParams.proofUrlName && currentEnterNameParams.proofUrlName !== '') {
        currentEnterNameParams.proofUrlName = currentEnterNameParams.proofUrlName;
      }
      return currentEnterNameParams;
    },
    // 处理审核通过传参
    dealWithSubPass(enterAbbrParams) {
      let currentEnterAbbrParams = JSON.parse(JSON.stringify(enterAbbrParams));
      this.infoList.forEach((value, index, array) => {
        if (value.prop === currentEnterAbbrParams.prop) {
          currentEnterAbbrParams.colname = value.colname;
        }
      });
      if (currentEnterAbbrParams.prop === 'enterprise_abbreviation') {
        currentEnterAbbrParams.newContent = this.enterpriseAbbreviation !== '' && (currentEnterAbbrParams.value.substr(0, 2) !== this.enterpriseAbbreviation) ? this.enterpriseAbbreviation + '-' + currentEnterAbbrParams.value : currentEnterAbbrParams.value;
        if (this.enterpriseAbbreviation !== '' && currentEnterAbbrParams.oldContent && currentEnterAbbrParams.oldContent !== '' && (currentEnterAbbrParams.oldContent.substr(0, 2) === this.enterpriseAbbreviation)) {
          currentEnterAbbrParams.oldContent = this.enterpriseAbbreviation + '-' + currentEnterAbbrParams.oldContent.replace(this.enterpriseAbbreviation, '');
        } else {
          currentEnterAbbrParams.oldContent = this.enterpriseAbbreviation !== '' && (currentEnterAbbrParams.oldContent.substr(0, 2) !== this.enterpriseAbbreviation) ? this.enterpriseAbbreviation + '-' + currentEnterAbbrParams.oldContent : currentEnterAbbrParams.oldContent;
        }
      } else {
        currentEnterAbbrParams.newContent = currentEnterAbbrParams.value;
      }
      currentEnterAbbrParams.companyId = this.$store.state.userInfo.companyId;
      currentEnterAbbrParams.auditResults = '1';
      if (currentEnterAbbrParams.proofUrlName && currentEnterAbbrParams.proofUrlName !== '') {
        currentEnterAbbrParams.proofUrlName = currentEnterAbbrParams.proofUrlName;
      }
      return currentEnterAbbrParams;
    },
    // 确认修改企业名称
    subConfirmDialogInfo(enterNameParams, enterAbbrParams) {
      // 处理审核不通过情况
      if (enterNameParams.auditResults === '审核不通过，点击再次修改') {
        this.dealWithUnPassCondition(this.dealWithSubUnPass(enterNameParams), 'sub');
      } else {
        this.dealWithPassCondition(this.dealWithSubPass(enterNameParams), 'sub');
      }
      if (enterAbbrParams) {
        if (enterAbbrParams.auditResults === '审核不通过，点击再次修改') {
          this.dealWithUnPassCondition(this.dealWithSubUnPass(enterAbbrParams), 'sub');
        } else {
          this.dealWithPassCondition(this.dealWithSubPass(enterAbbrParams), 'sub');
        }
      }

    }
  },
  watch: {
    "importDocReviewProgress"(newVal) {
      newVal.forEach((value, index, array) => {
        this.infoList.forEach((formVal, formIndex) => {
          if (value.colname === formVal.prop) {
            if (formVal.prop === 'customs_code' && value.param == null) {
              formVal.value = '无';
            } else {
              formVal.value = value.param && value.param !== '' ? value.param.replace('-', '') : value.param;
            }
            formVal.oldContent = value.oldContent;
            formVal.newContent = value.newContent;
            formVal.auditResults = this.getReviewStatus(value.auditResults);
            formVal.modifyImportId = value.modifyImportId;
            formVal.approveExplain = value.approveExplain;
          }
        });
      });
    }
  }
};
</script>



