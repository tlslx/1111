/**
 * @file 企业资料管理
 */
<style scoped>
  .el-form-item-btn {
    margin-top: 10px;
    width: 100%;
    text-align: center;
  }
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业资料管理" name="1" v-loading="loading" class="enter-doc-manage-container">
      <el-collapse v-model="activeNames" @change="handleChange" ref="basEntInfInfo">
        <el-collapse-item title="企业基本信息" name="first">
          <basic-info ref="basicEnterInfo" @complete-basic-info="completeBasicInfo" :basEntInf="basEntInf" :disabledJytReview="disabledJytReview"></basic-info>
        </el-collapse-item>
        <!-- v-if="completedStatus.completedBasicInfo" -->
        <el-collapse-item title="企业品牌/认证/奖励/专利信息" name="second">
          <com-info ref="enterInfo" @complete-com-bra-pat-info="completeComBraPatInfo" :basEntInf="basEntInf" :disabledJytReview="disabledJytReview"></com-info>
        </el-collapse-item>
        <!-- v-if="completedStatus.completedComBraPatInf"   -->
        <el-collapse-item title="企业参展及贸易需求" name="third">
          <ent-dem ref="enterDemInfo" @complete-ent-pat-pur-tra-dem="completeEntPatPurTraDem" :basEntInf="basEntInf" :disabledJytReview="disabledJytReview"></ent-dem>
        </el-collapse-item>
        <!-- v-if="completedStatus.completedEntPatPurTraDem"  -->
        <el-collapse-item title="企业联系方式" name="fourth">
          <cor-info ref="enterCorInfo" @complete-cor-con-info="completeCorConInfo" :basEntInf="basEntInf" :disabledJytReview="disabledJytReview"></cor-info>
        </el-collapse-item>
      </el-collapse>
      <!-- <div class="el-form-item-btn">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </div> -->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
import basicInfo from "@/components/project/onlineService/enterpriseApplyManage/basicInfo.vue";
import comBraPatInf from "@/components/project/onlineService/enterpriseApplyManage/comBraPatInf.vue";
import corConInf from "@/components/project/onlineService/enterpriseApplyManage/corConInf.vue";
import entPatPurTraDem from "@/components/project/onlineService/enterpriseApplyManage/entPatPurTraDem.vue";
export default {
  components: {
    'basic-info': basicInfo,
    'com-info': comBraPatInf,
    'cor-info': corConInf,
    'ent-dem': entPatPurTraDem
  },
  data() {
    return {
      activeName: '1',
      activeNames: ['first'],
      loading: false,
      // 获取展位信息传参
      searchExhibition: {
        companyId: this.$store.state.userInfo.companyId,
        current: "1",
        size: "10"
      },
      exhibitionTotalNum: 0,
      companyId: this.$store.state.userInfo.companyId,
      completedStatus: {
        // 完善企业基本信息
        completedBasicInfo: false,
        // 完善企业品牌/认证/奖励/专利信息
        completedComBraPatInf: false,
        // 完善企业参展及贸易需求
        completedEntPatPurTraDem: false,
        // 完善企业基本联系方式
        completedCorConInf: false
      },
      // 交易团审核状态--默认启用修改
      disabledJytReview: false,
      // 字典数组--贸易方式
      tradeForm: [],
      // 字典数组--海外注册商标的国家及地区数量
      manageQuantity: [],
      // 字典数组--面向企业的（个）行业认证数量
      industryNum: [],
      // 字典数组--面向产品/生产线的（个）行业认证数量
      exhibitCert: [],
      // 字典数组--参展目的
      participationGoal: [],
      // 字典数组--主要目标市场
      mainMarket: [],
      // 字典数组--主要目标客户类型
      mainType: [],
      // 企业资料信息
      basEntInf: {},
      // 企业基本信息
      basicInfoForm: {},
      // 企业品牌/认证/奖励/专利信息
      comBraPatInfForm: {},
      // 企业参展及贸易需求
      entPatPurTraDemForm: {},
      // 企业基本联系方式
      corConInfForm: {}
    };
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getBrands', 'getbasic']),
    ...mapGetters("companyInfomation", ["getStand"])
  },
  created() {
    // this.tradeForm = kindo.dictionary.get('tradeForm'); // 字典数据--贸易方式
    // this.manageQuantity = kindo.dictionary.get('manageQuantity'); // 字典数组--海外注册商标的国家及地区数量
    // this.industryNum = kindo.dictionary.get('industryNum'); // 字典数组--面向企业的（个）行业认证数量
    // this.exhibitCert = kindo.dictionary.get('exhibitCert'); // 字典数组--面向产品/生产线的（个）行业认证数量
    // this.participationGoal = kindo.dictionary.get('participationGoal'); // 字典数组--参展目的
    // this.mainMarket = kindo.dictionary.get('mainMarket'); // 字典数组--主要目标市场
    // this.mainType = kindo.dictionary.get('mainType'); // 字典数组--主要目标客户类型
  },
  mounted() {
    this.getReviewResultInfo(this.companyId).then(res => {
      // this.disabledJytReview = true;
      // 交易团审核通过后，企业不能修改
      if (res.reviewResult === '通过') {
        this.disabledJytReview = true;
      } else if (this.reviewResult === '不通过' || res.reviewResult === '可审核' || res.reviewResult === '资料未更新') { // 交易团审核不通过或待审核或资料未更新的企业可以修改
        this.disabledJytReview = false;
      }
    });
    this.getBasicInfo(this.companyId).then(res => {
      if (res) {
        if (res.reviewResult === 'null' || !res.reviewResult) {
          for (let status in this.completedStatus) {
            this.completedStatus[status] = true;
          }
          this.activeNames = ['first', 'second', 'third', 'fourth'];
        }
      }
      if (this.$route.query.type === 'comBraPatInf') {
        this.activeNames = [];
        this.activeNames.push('second');
      }
    });
    // 获取一般性展位信息
    this.getGeneralStand(encodeURI(JSON.stringify(this.searchExhibition))).then(res => {
      this.exhibitionTotalNum = res.total;
    });
    // this.$nextTick(() => {
    //   console.log(this.$refs['basicEnterInfo'].$refs['basicInfo'].model);
    // });
    // this.$nextTick(() => {
    //   console.log(this.$refs['enterInfo'].$refs['comBraPatInfo'].model);
    // });
    // this.$nextTick(() => {
    //   console.log(this.$refs['enterDemInfo'].$refs['entPatPurInfo'].model);
    // });
    // this.$nextTick(() => {
    //   console.log(this.$refs['enterCorInfo'].$refs['corConInfo'].model);
    // });

    // let basicInfoForm = JSON.parse(JSON.stringify(this.$refs['basicEnterInfo'].$refs['basicInfo'].model));
    // this.basicInfoForm = basicInfoForm;
    // let comBraPatInfForm = JSON.parse(JSON.stringify(this.$refs['enterInfo'].$refs['comBraPatInfo'].model));
    // this.comBraPatInfForm = comBraPatInfForm;
    // let entPatPurTraDemForm = this.$refs['enterDemInfo'].$refs['entPatPurInfo'].model;
    // this.entPatPurTraDemForm = entPatPurTraDemForm;
    // let corConInfForm = this.$refs['enterCorInfo'].$refs['corConInfo'].model;
    // this.corConInfForm = corConInfForm;
    // this.basEntInf = JSON.parse(JSON.stringify(Object.assign(this.basicInfoForm, this.comBraPatInfForm, this.entPatPurTraDemForm, this.corConInfForm, this.completedStatus, {})));
  },
  methods: {
    ...mapActions('onlineServiceHomePage', ['getReviewResultInfo']),
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    ...mapActions("enterpriseRegister", ["getDelegationAndProAndCityInfo"]),
    ...mapActions("companyInfomation", ["getGeneralStand"]),
    handleClick(tab, event) {},
    // getBasicEnterInfo() {
    //   console.log(this.$refs['basicEnterInfo'].$refs['basicInfo'].model);
    // },
    // getEnterInfo() {
    //   console.log(this.$refs['enterInfo'].$refs['comBraPatInfo'].model);
    // },
    handleChange(val) {},
    // 获取企业基本信息
    completeBasicInfo(val) {
      this.completedStatus.completedBasicInfo = val;
      if (val) {
        this.activeNames = [];
        this.activeNames.push('second');
      }
    },
    // 获取企业品牌/认证/奖励/专利信息
    completeComBraPatInfo(val) {
      this.completedStatus.completedComBraPatInf = val;
      if (val) {
        this.activeNames = [];
        this.activeNames.push('third');
      }
    },
    // 获取企业参展及贸易需求的完善状态信息
    completeEntPatPurTraDem(val) {
      this.completedStatus.completedEntPatPurTraDem = val;
      if (val) {
        this.activeNames = [];
        this.activeNames.push('fourth');
      }
    },
    // 获取企业联系方式信息
    completeCorConInfo(val) {
      this.completedStatus.completedCorConInf = val;
      // if (val) {
      //   this.basicInfoForm = JSON.parse(JSON.stringify(this.$refs['basicEnterInfo'].$refs['basicInfo'].model));
      //   this.comBraPatInfForm = JSON.parse(JSON.stringify(this.$refs['enterInfo'].$refs['comBraPatInfo'].model));
      //   this.entPatPurTraDemForm = this.$refs['enterDemInfo'].$refs['entPatPurInfo'].model;
      //   this.corConInfForm = this.$refs['enterCorInfo'].$refs['corConInfo'].model;
      //   this.basEntInf = JSON.parse(JSON.stringify(Object.assign(this.basicInfoForm, this.comBraPatInfForm, this.entPatPurTraDemForm, this.corConInfForm, this.completedStatus, {})));
      // }
    },
    // 处理checkbox的显示问题
    dealWithShowCheckBox(prevData, dicData) {
      let targetArray = [];
      targetArray = prevData && dicData && dicData.length > 0
      ? $helper.getLabelArray(prevData, dicData)
      : [];
      return targetArray;
    },
    // 初始化处理是否问题
    dealWithYesOrNo(value) {
      if (value === '1') {
        return true;
      } else {
        return false;
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
      // console.log(this);
      // this.loading = true;
      // console.log('企业基本信息', this.basicInfoForm);
      // console.log('企业品牌/认证/奖励/专利信息', this.comInfoForm);
      // console.log('企业参展及贸易需求', this.entDemInfoForm);
      // console.log('企业联系方式', this.corInfoForm);
      // 处理企业成立年份
      // if (this.basicInfoForm.incorporationYear && this.basicInfoForm.incorporationYear !== '') {
      //   this.basicInfoForm.incorporationYear = new Date(this.basicInfoForm.incorporationYear).getTime();
      // }
      // // 处理企业首次参展年份
      // if (this.basicInfoForm.firstExhibitionDate && this.basicInfoForm.firstExhibitionDate !== '') {
      //   this.basicInfoForm.firstExhibitionDate = new Date(this.basicInfoForm.firstExhibitionDate).getTime();
      // }
      // // 处理企业名称分词
      // this.basicInfoForm.companyPpl = '';
      // if (this.basicInfoForm.companyPplList.length > 0) {
      //   this.basicInfoForm.companyPplList.forEach((value) => {
      //     this.basicInfoForm.companyPpl += value.companyPpl + ',';
      //   });
      // }
      // this.basicInfoForm.companyPpl = this.basicInfoForm.companyPpl.slice(0, this.basicInfoForm.companyPpl.length - 1);
      // // 处理上年度出口额度前三位的地区
      // this.dealWithExportQuotas();
      // // 处理品牌（商标）
      // this.dealWithBrand();
      // // 处理电话
      // this.corInfoForm.telephone = this.corInfoForm.telephoneCode + this.corInfoForm.telephoneCodeLast;
      // // 处理传真
      // this.corInfoForm.fax = this.corInfoForm.faxCode + this.corInfoForm.faxCodeLast;
      // let currentRuleForm = JSON.parse(JSON.stringify(Object.assign(this.basicInfoForm, this.comInfoForm, this.entDemInfoForm, this.corInfoForm, {})));
      // // 处理是否有海关编码
      // if (currentRuleForm.hasCustomsCode === '2') {
      //   currentRuleForm.customsCode = '无';
      // }
      // // 处理是否列入《中国高科技出口产品目录》
      // currentRuleForm.includStatus = this.dealWithYesOrNoValue(currentRuleForm.includStatus);
      // // 处理我要去在展商展品查询中隐藏联系方式
      // currentRuleForm.hideContactInfo = this.dealWithYesOrNoValue(currentRuleForm.hideContactInfo);
      // this.$refs['basicEnterInfo'].$refs['basicInfo'].validate((basicValid) => {
      //   if (basicValid) {
      //     this.$refs['enterInfo'].$refs['comBraPatInfo'].validate((enterValid) => {
      //       if (enterValid) {
      //         this.$refs['enterDemInfo'].$refs['entPatPurInfo'].validate((demValid) => {
      //           if (demValid) {
      //             this.$refs['enterCorInfo'].$refs['corConInfo'].validate((corValid) => {
      //               if (corValid) {
      //                 this.reviewCompanyDocs(currentRuleForm).then(res => {
      //                   this.$message({
      //                     type: 'success',
      //                     message: '设置成功'
      //                   });
      //                   this.getBasicInfo(this.companyId).then(response => {
      //                     if (response) {
      //                       for (let key in response) {
      //                         this.dealWithFormData(key, response);
      //                       }
      //                       this.dealWithData();
      //                     }
      //                     if (this.exhibitionTotalNum < 4) {
      //                       this.$router.push('/enterExManagement');
      //                     }
      //                   });
      //                   this.loading = false;
      //                 }).catch(e => {
      //                   this.loading = false;
      //                   this.$message({
      //                     showClose: true,
      //                     message: e,
      //                     type: 'error'
      //                   });
      //                 });
      //               } else {
      //                 this.loading = false;
      //                 setTimeout(() => {
      //                   let isError = document.getElementsByClassName("is-error");
      //                   isError[0].querySelector('input').focus();
      //                 }, 1);
      //                 this.$message({
      //                   showClose: true,
      //                   message: '企业联系方式验证未通过',
      //                   type: 'error'
      //                 });
      //               }
      //             });
      //           } else {
      //             this.loading = false;
      //             setTimeout(() => {
      //               let isError = document.getElementsByClassName("is-error");
      //               isError[0].querySelector('input').focus();
      //             }, 1);
      //             this.$message({
      //               showClose: true,
      //               message: '企业参展及贸易需求验证未通过',
      //               type: 'error'
      //             });
      //           }
      //         });
      //       } else {
      //         this.loading = false;
      //         setTimeout(() => {
      //           let isError = document.getElementsByClassName("is-error");
      //           isError[0].querySelector('input').focus();
      //         }, 1);
      //         this.$message({
      //           showClose: true,
      //           message: '企业品牌/认证/奖励/专利信息验证未通过',
      //           type: 'error'
      //         });
      //       }
      //     });
      //   } else {
      //     this.loading = false;
      //     setTimeout(() => {
      //       let isError = document.getElementsByClassName("is-error");
      //       isError[0].querySelector('input').focus();
      //     }, 1);
      //     this.$message({
      //       showClose: true,
      //       message: '企业基本信息验证未通过',
      //       type: 'error'
      //     });
      //   }
      // });
    },
    resetForm() {},
    // 处理上年度出口额度前三位的地区
    dealWithExportQuotas() {
      let exportQuotasArr = [];
      let exportQuotasStr = '';
      if (this.entDemInfoForm.exportQuotasOne) {
        exportQuotasArr.push(this.entDemInfoForm.exportQuotasOne);
      }
      if (this.entDemInfoForm.exportQuotasTwo) {
        exportQuotasArr.push(this.entDemInfoForm.exportQuotasTwo);
      }
      if (this.entDemInfoForm.exportQuotasThree) {
        exportQuotasArr.push(this.entDemInfoForm.exportQuotasThree);
      }
      if (exportQuotasArr.length > 0) {
        exportQuotasArr.forEach((value, index, array) => {
          exportQuotasStr += index === array.length - 1 ? value : value + ',';
        });
      }
      this.entDemInfoForm.firstThreeCustomersCountry = exportQuotasStr;
    },
    // 处理品牌、商标
    dealWithBrand() {
      let str = '';
      if (this.getBrands.length > 0) {
        this.getBrands.forEach((value, index, array) => {
          str += index === (array.length - 1) ? value.brandNameCh : value.brandNameCh + ',';
        });
      }
      this.comInfoForm.brand = str;
    }
  },
  watch: {
    "basEntInf": {
      handler(newVal) {

      },
      deep: true
    }
  }
};

</script>



