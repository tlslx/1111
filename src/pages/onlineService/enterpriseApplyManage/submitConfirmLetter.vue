/**
 * @file 提交品牌展位退回
 */
<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane label="提交品牌展位退回" name="first">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="confirmBook"
          label-width="260px"
          class="submit-confirm-form-container"
          :label-position="labelPosition">
          <el-form-item label="展区：" prop="exhibitionArea">
            <el-select v-model="ruleForm.exhibitionArea"  placeholder="请选择" :disabled="true">
              <el-option v-for="item in exhibitionArea" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="本届可确认品牌展位数：" prop="currentChangeNumber">
            <el-input v-model="ruleForm.initialBoothNum" placeholder="请输入本届品牌展位数变化量" disabled maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="本届已确认品牌展位数：" prop="currentReserveNumber">
            <el-input v-model="ruleForm.affirmBoothNumber" disabled placeholder="请输入本届保留品牌展位数" clearable maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="退回品牌展位数：" prop="currentReserveNumber">
            <el-input v-model="ruleForm.backBoothNum" disabled placeholder="请输入本届保留品牌展位数" clearable maxlength="500"></el-input>
          </el-form-item>
          <el-form-item label="情况分类：" prop="backType">
            <el-select v-model="ruleForm.backType" disabled placeholder="请选择">
              <el-option v-for="item in caseClassification" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退回原因：" prop="backReason">
            <el-input v-model="ruleForm.backReason" type="textarea" :rows="5" placeholder="请输入退回原因" clearable maxlength="255"></el-input>
          </el-form-item>
          <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :show-close='showClose'
            width="60%"
            >
            <p>提交成功！请点击“打印”，打印相关申请材料并盖章后，提交给所属交易团，确认申请方正式生效！</p>
            <span slot="footer" class="dialog-footer" style="text-align: center">
              <el-button @click="onprint">打印</el-button>
            </span>
          </el-dialog>
          <!--<div>关于退展位收费约束机制的时间机制</div>-->
          <!--<div>-->
            <!--<el-input style="width: 70%;padding: 15px 0;" :rows="5" v-model="brandSubmitConfirmBook.projectContent" type="textarea" disabled clearable maxlength="500"></el-input>-->
          <!--</div>-->
          <div>
            <!--<el-checkbox v-model="ruleForm.checked" label="本企业已阅读并确认以上所述内容" name="type"></el-checkbox>-->
            <div style="padding: 15px 0;">
              <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="info" @click="cancel">返回</el-button>
            </div>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      loading: false,
      dialogVisible: false,
      showClose: false,
      // 展区字典
      exhibitionArea: [],
      // 展期字典
      exhibitonPhase: [],
      // 情况分类字典
      caseClassification: [
        { label: '全部退回', value: '1' },
        { label: '部分退回', value: '2' }
      ],
      // 设置表单对齐方式
      labelPosition: 'left',
      confirmBook: '',
      ruleForm: {
        domains: [
          // 主要展示产品
          {
            products: ""
          }
        ],
        companyProductList: [],
        productType: "", // 展品分类
        productTypeName: '',
        hscode: '',
        cantonFairCode: '',
        postalCode: '',
        selfBackNumber: '',
        exhibitionSession: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        exhibitionType: '',
        dealClusterName: '',
        exhibitionPeriod: '',
        brandBoothNumber: '',
        backBoothNumber: '',
        currentChangeNumber: '',
        initialBoothNum: '',
        affirmBoothNumber: '',
        currentReserveNumber: '',
        lastBoothNum: '',
        companyId: '',
        companyName: '',
        companyCode: '',
        backType: '',
        canEdit: false,
        boothAffirmId: '',
        isContacted: "0", // 是否愿意接洽国内采购商
        isCarryOut: '',  // 展位期间开展的内贸业务
        joinProductType: '', // 我司参展展品为
        backReason: '',
        boothNumber: "", // 申请数量
        boothNumberLast: '', // 上届申请数量
        boothType: '02',
        checked: false,
        demandRecordId: ''
      },
      newDate: {},
      writeForm: {},
      boothTypeList: [],
      isAll: false,
      rules: {
        currentReserveNumber: [
          { validator: this.checkCurrentReserveNumber, trigger: 'blur' }
        ],
        backReason: [
          { required: true, message: '请输入退回原因', trigger: 'blur' }
        ]
      },
      baseApi: process.env.API_OS_URL
    };
  },
  props: {
  },
  async beforeCreate() {
    this.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.exhibitionArea.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.exhibitionArea.splice(deleteIndex, 1);
      }
    });
    this.exhibitonPhase = await kindo.dictionary.get('exhibitonPhase'); // 展期
    this.caseClassification = await kindo.dictionary.get('caseClassification'); // 情况分类
    this.boothTypeList = await kindo.dictionary.get('booth_Type'); // 展位性质
  },
  created() {
    // this.getConfirmNote(); // 获取退展位收费约束机制的时间机制确认书内容
    this.getDelegationInfo(); // 获取交易团字典信息
    if (this.$route.query.confirmData) {
      for (let key in this.backConfirmDataParams) {
        for (let queryKey in this.$route.query.confirmData) {
          if (key === queryKey) {
            this.backConfirmDataParams[key] = this.$route.query.confirmData[queryKey];
          }
        }
      }
    }
  },
  mounted() {
    this.isAll = this.$route.query.isAll;
    if (this.isAll) {
      // 全额退出的情况
      let writeForm = JSON.parse(this.$route.query.writeForm);
      this.writeForm = writeForm;
      for (let item in writeForm) {
        this.ruleForm[item] = writeForm[item];
      }
      this.ruleForm.affirmBoothNumber = 0;
      if (writeForm.backBoothNum) {
        this.ruleForm.backBoothNum = writeForm.backBoothNum;
        this.ruleForm.selfBackNumber = writeForm.backBoothNum;
        this.ruleForm.initialBoothNum = writeForm.backBoothNum;
      } else {
        this.ruleForm.backBoothNum = writeForm.schemePublish.initialBoothNum;
        this.ruleForm.selfBackNumber = writeForm.schemePublish.initialBoothNum;
        this.ruleForm.initialBoothNum = writeForm.schemePublish.initialBoothNum;
      }
      this.ruleForm.backType = '1';
      this.ruleForm.exhibitionArea = writeForm.exhibitionArea;
      this.ruleForm.exhibitionAreaName = writeForm.exhibitionAreaName;
      this.ruleForm.exhibitionSession = writeForm.schemePublish.exhibitionSession;
    } else {
      // 部分确认的情况
      let writeForm = JSON.parse(this.$route.query.writeForm);
      this.writeForm = writeForm;
      for (let item in writeForm) {
        this.ruleForm[item] = writeForm[item];
      }
      this.ruleForm.selfBackNumber = this.ruleForm.initialBoothNum - this.ruleForm.currentReserveNumber;
      this.ruleForm.backBoothNum = this.ruleForm.initialBoothNum - this.ruleForm.currentReserveNumber;
      this.ruleForm.affirmBoothNumber = this.writeForm.currentReserveNumber;
      this.ruleForm.lastBoothNum = this.writeForm.brandBoothNumber;
      this.ruleForm.cantonFairCode = this.writeForm.companyCode;
      this.ruleForm.boothNumber = this.writeForm.currentReserveNumber;
      this.ruleForm.boothNumberLast = this.writeForm.brandBoothNumber;

      if ((writeForm.currentReserveNumber - 0) === 0) {
        this.ruleForm.backType = '1';
      } else {
        this.ruleForm.backType = '2';
      }
    }
  },
  computed: {
    ...mapGetters('companyInfomation', ['brandSubmitConfirmBook', 'backBoothNum', 'brandSubmitConfirmBookData']),
    ...mapGetters('common', ['delegationList']),
    backConfirmDataParams() {
      return {
        demandRecordId: '',
        companyCode: '',
        exhibitionAreaName: '',
        coceralName: '',
        coceralId: '',
        companyName: '',
        publishId: '',
        dealClusterName: '',
        dealClusterId: '',
        companyId: '',
        cantonFairCode: '',
        brandBoothNumber: '',
        exhibitionArea: ''
      };
    }
  },
  methods: {
    ...mapActions('companyInfomation', ['getConfirmNote', 'getSchemePublishConfirm', 'addSubmitConfirmBookData', 'addSchemePublishConfirmData', "postSchemePublishSubmit"]),
    ...mapActions('common', ['getDelegationInfo']),
    handleClick(tab, event) {

    },
    //打印
    onprint() {
      if (this.printDat) {
        this.$router.push({ path: '/printApplicationForm', query: { writeForm: JSON.stringify(this.ruleForm), demandRecordId: this.demandRecordId, isAll: true, isback: true }});
      } else {
        this.$router.push({ path: '/printApplicationForm', query: { writeForm: JSON.stringify(this.ruleForm), demandRecordId: this.demandRecordId, isAll: false }});
      }
    },
    // 校验本届保留品牌展位数
    checkCurrentReserveNumber(rule, value, callback) {
      let str = /(^[1-9]\d*$)|(^0?$)/;
      if (!str.test(value)) {
        return callback(new Error('请输入纯数字'));
      } else {
        return callback();
      }
    },
    // 提交数据
    submit() {
      this.$refs['confirmBook'].validate((valid) => {
        if (valid) {
          this.loading = true;
          // 主要展示产品
          this.writeForm.companyProductList = [];
          // 主要展示产品
          for (let key in this.writeForm.domains) {
            this.writeForm.companyProductList.push({ productId: this.writeForm.domains[key].products });
          }
          // affirmBoothNumber 为本届确认的展位数，isAll 是否全部退回的标识符
          if (this.isAll) {
            this.ruleForm.affirmBoothNumber = 0;
          } else {
            this.ruleForm.affirmBoothNumber = this.writeForm.currentReserveNumber;
          }
          this.ruleForm.lastBoothNum = this.writeForm.brandBoothNumber;
          this.ruleForm.cantonFairCode = this.writeForm.companyCode;
          if (this.isAll) {
            this.newDate = this.ruleForm;
            this.printDat = true; // 打印标识字段
            // 提交全部退回的数据
            if (this.writeForm.canEdit) {
              // 编辑状态，先删后增
              this.$http.postJson(this.baseApi + '/api/ordinaryCompanyDemandRecord/numberAffirmDelete',
                {
                  boothAffirmId: this.writeForm.boothAffirmId,
                  demandRecordId: this.writeForm.demandRecordId
                })
                .then((resp) => {
                  this.addSubmitConfirmBookData(this.ruleForm).then(res => {
                    this.ruleForm.dealClusterName = res.numberAffirm.dealClusterName;
                    this.dialogVisible = true;  // 弹框弹出
                    this.loading = false;
                  }).catch(e => {
                    this.$message.error('提交失败!');
                  });
                })
                .catch((error) => {
                  this.loading = false;
                });
            } else {
              this.addSubmitConfirmBookData(this.ruleForm).then(res => {
                this.ruleForm.dealClusterName = res.numberAffirm.dealClusterName;
                this.dialogVisible = true;  // 弹框弹出
                this.loading = false;
              }).catch(e => {
                this.$message.error('提交失败!');
                this.loading = false;
              });
            }
          } else {
            // 提交部分退回的数据
            this.printDat = false; // 打印标识字段
            // 部分退回
            if (this.writeForm.canEdit) {
              // 编辑状态，先删后增
              this.$http.postJson(this.baseApi + '/api/ordinaryCompanyDemandRecord/numberAffirmDelete',
                {
                  boothAffirmId: this.writeForm.boothAffirmId,
                  demandRecordId: this.writeForm.demandRecordId
                })
                .then((resp) => {

                  this.addSubmitConfirmBookData(this.ruleForm).then(res => {
                    this.loading = false;
                    this.ruleForm.dealClusterName = res.numberAffirm.dealClusterName;
                    this.dialogVisible = true;  // 弹框弹出
                  }).catch(e => {
                    this.$message.error(e);
                    this.loading = false;
                  });

                  this.postSchemePublishSubmit(this.writeForm).then((res) => {
                    this.writeForm.demandRecordId = res.demandRecordId;
                    this.ruleForm.demandRecordId = res.demandRecordId;
                    this.loading = false;
                  }).catch(e => {
                    this.loading = false;
                  });

                })
                .catch((error) => {

                });
            } else {

              this.addSubmitConfirmBookData(this.ruleForm).then(res => {
                this.loading = false;
                this.ruleForm.dealClusterName = res.numberAffirm.dealClusterName;
                this.dialogVisible = true;  // 弹框弹出
              }).catch(e => {
                this.$message.error(error);
                this.loading = false;
              });

              this.postSchemePublishSubmit(this.writeForm).then((res) => {
                this.writeForm.demandRecordId = res.demandRecordId;
                this.ruleForm.demandRecordId = res.demandRecordId;
                this.loading = false;
              }).catch(e => {
                this.loading = false;
                this.$message.error(e);
              });
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: '验证未通过',
            type: 'error'
          });
        }
      });
    },
    // 取消
    cancel() {
      this.$router.push({
        path: '/brandBoothConfirm', query: { schemeDetail: JSON.stringify(this.writeForm) }
      });
    }
  },
  watch: {
    'ruleForm.currentReserveNumber'(val) {
      if (!isNaN(parseInt(val)) && !isNaN(parseInt(this.ruleForm.brandBoothNumber))) {
        this.ruleForm.currentChangeNumber = parseInt(this.ruleForm.brandBoothNumber) - parseInt(val);
      }
    }
  }
};
</script>
<style scoped>
.submit-confirm-form-container {
  text-align: center;
}
.el-form-item {
  position: relative;
  left: 25%;
  margin-bottom: 22px;
  width: 50%;
  text-align: center;
}
.cb_confirm {
  position: relative;
  left: 28%;
  margin-top: 20px;
}
</style>


