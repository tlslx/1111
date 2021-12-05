/**
 * @file 审核企业资料详细
 */
<template>
  <div v-loading="loading">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="企业基本信息" name="1" class="folPanel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-form :model="ruleForm" ref="ruleForm" label-width="280px" class="demo-ruleForm">
            <el-form-item label="企业名称（中文）：" prop="companyName">
              {{ ruleForm.companyName }}
            </el-form-item>
            <el-form-item label="企业名称（英文）：" prop="companyNameEn">
              {{ ruleForm.companyNameEn }}
            </el-form-item>
            <el-form-item label="海关编码：" prop="customsCode">
              {{ ruleForm.customsCode }}
            </el-form-item>
            <el-form-item label="进出口代码：" prop="importExportCode">
              {{ ruleForm.importExportCode }}
            </el-form-item>
            <el-form-item label="营业执照号：" prop="businessLicenceNo">
              {{ ruleForm.businessLicenceNo }}
            </el-form-item>
            <el-form-item label="企业简称：" prop="enterpriseAbbreviation">
              {{ ruleForm.enterpriseAbbreviation }}
            </el-form-item>
            <el-form-item label="所属交易团：" prop="businessDelegationId">
              {{ ruleForm.businessDelegationId }}
            </el-form-item>
            <el-form-item label="企业简称（英文）：" prop="enterpriseAbbreviation">
              {{ ruleForm.enterpriseAbbreviation }}
            </el-form-item>
            <el-form-item label="企业名称分词：" prop="companyPpl">
              {{ ruleForm.companyPpl }}
            </el-form-item>
            <el-form-item label="是否上市企业：" prop="listedStatus">
              {{ dealWithListedStatus() }}
            </el-form-item>
            <el-form-item label="上市地点：" prop="listedPlace">
              {{ dealWithListedPlace() }}
            </el-form-item>
            <el-form-item label="股票代码：" prop="stockCode">
              {{ ruleForm.stockCode }}
            </el-form-item>
            <el-form-item label="企业属性：" prop="enterpriseAttribute">
              {{ dealWithEnterpriseAttribute() }}
            </el-form-item>
            <el-form-item label="企业类型：" prop="enterprisesType">
              {{ dealWithEnterprisesType() }}
            </el-form-item>
            <el-form-item label="企业营业执照注册号/统一社会信用代码：" prop="businessLicenceNo">
              {{ ruleForm.businessLicenceNo }}
            </el-form-item>
            <el-form-item label="法人代表：" prop="legalPerson">
              {{ ruleForm.legalPerson }}
            </el-form-item>
            <el-form-item label="企业成立年份：" prop="incorporationYear">
              {{ ruleForm.incorporationYear.substring(0,4) }}
            </el-form-item>
            <el-form-item label="注册资本（万人民币）：" prop="registeredCapital">
              {{ ruleForm.registeredCapital }}
            </el-form-item>
            <el-form-item label="员工数量：" prop="employeesCount">
              {{ dealWithEmployeesCount() }}
            </el-form-item>
            <el-form-item label="生产部门人数：" prop="productionEmployeesCount">
              {{ dealWithProductionEmployeesCount() }}
            </el-form-item>
            <el-form-item label="研发部门人数：" prop="developEmployeesCount">
              {{ dealWithDevelopEmployeesCount() }}
            </el-form-item>
            <el-form-item label="质监部门人数：" prop="qualityEmployeesCount">
              {{ dealWithQualityEmployeesCount() }}
            </el-form-item>
            <el-form-item label="厂房面积（平方米）：" prop="plantArea">
              {{ ruleForm.plantArea }}
            </el-form-item>
            <el-form-item label="主营产品关键字（中文）：" prop="mainProductKeywordCh">
              {{ ruleForm.mainProductKeywordCh }}
            </el-form-item>
            <el-form-item label="主营产品关键字（英文）：" prop="mainProductKeywordEn">
              {{ ruleForm.mainProductKeywordEn }}
            </el-form-item>
            <el-form-item label="上年度国内销售额（万人民币）：" prop="domesticSalesLast">
              {{ ruleForm.domesticSalesLast }}
            </el-form-item>
            <el-form-item label="上年度出口额（万美元）：" prop="exportVolumeLast">
              {{ ruleForm.exportVolumeLast }}
            </el-form-item>
            <el-form-item label="纳税人识别号：" prop="taxpayerIdentificationNo">
              {{ ruleForm.taxpayerIdentificationNo }}
            </el-form-item>
            <el-form-item  label="贸易形式：" prop="tradeForm">
              {{ dealWithTradeForm() }}
            </el-form-item>
            <el-form-item label="企业LOGO：" prop="corLogo">
              <img :src="imgSrc + ruleForm.companyLogoId" alt="">
            </el-form-item>
            <el-form-item label="企业形象图：" prop="corImage">
              <img :src="imgSrc + ruleForm.companyImageId" alt="">
            </el-form-item>
            <el-form-item label="企业简介（中文）：" prop="companyProfileCh">
              {{ ruleForm.companyProfileCh }}
            </el-form-item>
            <el-form-item label="企业简介（英文）：" prop="companyProfileEn">
              {{ ruleForm.companyProfileEn }}
            </el-form-item>
            <el-form-item label="企业首次参展时间（年）：" prop="firstExhibitionDate">
              {{ ruleForm.firstExhibitionDate.substring(0,4) }}
            </el-form-item>
          </el-form>
        </el-tabs>
      </el-collapse-item>
      <el-collapse-item title="企业品牌/认证/奖励/专业信息" name="2" class="folPanel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-form :model="ruleForm" ref="ruleForm" label-width="280px" class="demo-ruleForm">
            <el-form-item label="品牌(商标)：" prop="brand">
              {{ ruleForm.brand }}
            </el-form-item>
            <el-form-item label="海关注册商标的国家及地区数量：" prop="registeredTrademarkCount">
              {{ ruleForm.registeredTrademarkCount }}
            </el-form-item>
            <el-form-item label="国际/行业通行（个) 管理体系认证的数量：" prop="internationallytCertificationCount">
              {{ ruleForm.internationallytCertificationCount }}
            </el-form-item>
            <el-form-item label="面向企业的（个）行业认证数量：" prop="industryCertificationCount">
              {{ ruleForm.industryCertificationCount }}
            </el-form-item>
            <el-form-item label="面向产品/生产线的（个）行业认证数量：" prop="productCertificationQuantity">
              {{ ruleForm.productCertificationQuantity }}
            </el-form-item>
            <el-form-item label="国家级奖励数量：" prop="nationalAwardsCount">
              {{ ruleForm.nationalAwardsCount }}
            </el-form-item>
            <el-form-item label="省级奖励数量：" prop="provincialAwardsCount">
              {{ ruleForm.provincialAwardsCount }}
            </el-form-item>
            <el-form-item label="发明专利数：" prop="inventionPatentsCount">
              {{ ruleForm.inventionPatentsCount }}
            </el-form-item>
            <el-form-item label="实用新型专利数：" prop="utilityPatentsCount">
              {{ ruleForm.utilityPatentsCount }}
            </el-form-item>
            <el-form-item label="外观设计专利数：" prop="patentsDesignCount">
              {{ ruleForm.patentsDesignCount }}
            </el-form-item>
          </el-form>
        </el-tabs>
      </el-collapse-item>
      <el-collapse-item title="企业参展目的及贸易需求" name="3" class="folPanel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-form :model="ruleForm" ref="ruleForm" label-width="280px" class="demo-ruleForm">
            <el-form-item label="参展目的（多选）：" prop="participationGoal">
              {{ dealWithParticipationGoal() }}
            </el-form-item>
            <el-form-item label="是否有内贸业务：" prop="nternalTradeStatus">
              {{ dealWithNternalTradeStatus() }}
            </el-form-item>
            <el-form-item label="上年度出口额度前三位的地区：" prop="firstThreeCustomersCountry">
              {{ ruleForm.firstThreeCustomersCountry }}
            </el-form-item>
            <el-form-item label="主要目标市场（多选）：" prop="mainTargetMarket">
              {{ dealWithMainTargetMarket() }}
            </el-form-item>
            <el-form-item label="主要目标客户类型（多选）：" prop="mainCustomersType">
              {{ dealWithMainCustomersType() }}
            </el-form-item>
          </el-form>
        </el-tabs>
      </el-collapse-item>
      <el-collapse-item title="企业联系方式" name="4" class="folPanel">
        <el-tabs>
          <el-form :model="ruleForm" ref="ruleForm" label-width="280px" class="demo-ruleForm">
            <el-form-item label="地址（中文）：" prop="adressCh">
              {{ ruleForm.adressCh }}
            </el-form-item>
            <el-form-item label="地址（英文）：" prop="adressEn">
              {{ ruleForm.adressEn }}
            </el-form-item>
            <el-form-item label="邮政编码：" prop="postalCode">
              {{ ruleForm.postalCode }}
            </el-form-item>
            <el-form-item label="业务联系人姓名（中文）：" prop="businessContactsCh">
              {{ ruleForm.businessContactsCh }}
            </el-form-item>
            <el-form-item label="职位：" prop="businessContactsPosition">
              {{ dealWithBusinessContactsPosition() }}
            </el-form-item>
            <el-form-item label="业务联系人姓名（英文）：" prop="businessContactsEn">
              {{ ruleForm.businessContactsEn }}
            </el-form-item>
            <el-form-item label="电话：" prop="telephone">
              {{ ruleForm.telephone }}
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
              {{ ruleForm.phone }}
            </el-form-item>
            <el-form-item label="传真：" prop="fax">
              {{ ruleForm.fax }}
            </el-form-item>
            <el-form-item label="业务联系电子邮箱：" prop="businessContactsEmail">
              {{ ruleForm.businessContactsEmail }}
            </el-form-item>
            <el-form-item label="广交会参展业务专用联系电子邮箱：" prop="dedicatedEmail">
              {{ ruleForm.dedicatedEmail }}
            </el-form-item>
            <el-form-item label="网址：" prop="website">
              {{ ruleForm.website }}
            </el-form-item>
          </el-form>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
    <el-form :model="ruleFormRes" ref="ruleFormRes" label-width="220px" class="audit-form">
      <el-form-item label="审核意见：" prop="auditOpinion">
        <el-input style="width: 420px;" type="textarea" maxlength="500" :rows="6" placeholder="请输入内容" v-model="ruleFormRes.auditOpinion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="pass('ruleForm')">通过</el-button>
        <el-button size="mini" type="primary" @click="noPass('ruleForm')">不通过</el-button>
        <el-button size="mini" type="info" @click="reback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  data() {
    return {
      activeNames: ['1'],
      activeName: "",
      ruleFormRes: {
        auditOpinion: ''
      },
      ruleForm: {},
      imgSrc: process.env.API_OS_URL + '/efOS/file/getImg?fileId=',
      loading: false
    };
  },
  created() {
    this.loading = true;
    if (this.$route.query.row && this.$route.query.row.companyId) {
      this.getBasicInfo(this.$route.query.row.companyId).then(res => {
        this.loading = false;
        this.ruleForm = Object.assign(this.ruleForm, res);
      }).catch(e => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
  computed: {

  },
  methods: {
    ...mapActions('corpDataManagement', ['getBasicInfo', 'modifyCompanyInfos']),
    handleClick(tab, event) {
    },
    handleChange(val) {
    },
    // 通过
    pass() {
      let params = {};
      params.approveResult = '1';
      params.reviewResult = '1';
      params.companyId = this.$store.state.userInfo.companyId;
      params.approveExplain = this.ruleFormRes.auditOpinion;
      let currentArr = [];
      currentArr.push(params);
      // 开始审核
      this.modifyCompanyInfos(currentArr).then(reso => {
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审核成功'
        });
        this.$router.push('/audComInf');
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 不通过
    noPass() {
      let params = {};
      params.approveResult = '0';
      params.reviewResult = '0';
      params.companyId = this.$store.state.userInfo.companyId;
      params.approveExplain = this.ruleFormRes.auditOpinion;
      let currentArr = [];
      currentArr.push(params);
      // 开始审核
      this.modifyCompanyInfos(currentArr).then(() => {
      }).then(response => {
        this.$message({
          type: 'success',
          message: '审核成功'
        });
        this.$router.push('/audComInf');
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 返回
    reback() {
      this.$router.push('/audComInf');
    },
    // 处理是否是上市企业
    dealWithListedStatus() {
      if (this.ruleForm.listedStatus) {
        return this.ruleForm.listedStatus === '01' ? '是' : '否';
      }
    },
    // 处理上市地点
    dealWithListedPlace() {
      if (this.$store.getters.dataDictionary.listingPlace && this.ruleForm.listedPlace) {
        return $helper.getDicText(this.$store.getters.dataDictionary.listingPlace, this.ruleForm.listedPlace);
      }
    },
    // 处理企业属性
    dealWithEnterpriseAttribute() {
      if (this.$store.getters.dataDictionary.companyAttribute && this.ruleForm.enterpriseAttribute) {
        return $helper.getDicText(this.$store.getters.dataDictionary.companyAttribute, this.ruleForm.enterpriseAttribute);
      }
    },
    // 处理企业类型
    dealWithEnterprisesType() {
      if (this.$store.getters.dataDictionary.companyType && this.ruleForm.enterprisesType) {
        return $helper.getDicText(this.$store.getters.dataDictionary.companyType, this.ruleForm.enterprisesType);
      }
    },
    // 处理员工数量
    dealWithEmployeesCount() {
      if (this.$store.getters.dataDictionary.staff && this.ruleForm.employeesCount) {
        return $helper.getDicText(this.$store.getters.dataDictionary.staff, this.ruleForm.employeesCount);
      }
    },
    // 处理生产部门人数
    dealWithProductionEmployeesCount() {
      if (this.$store.getters.dataDictionary.staff && this.ruleForm.productionEmployeesCount) {
        return $helper.getDicText(this.$store.getters.dataDictionary.staff, this.ruleForm.productionEmployeesCount);
      }
    },
    // 处理研发部门人数
    dealWithDevelopEmployeesCount() {
      if (this.$store.getters.dataDictionary.developNum && this.ruleForm.developEmployeesCount) {
        return $helper.getDicText(this.$store.getters.dataDictionary.developNum, this.ruleForm.productionEmployeesCount);
      }
    },
    // 处理质监部门人数
    dealWithQualityEmployeesCount() {
      if (this.$store.getters.dataDictionary.developNum && this.ruleForm.qualityEmployeesCount) {
        return $helper.getDicText(this.$store.getters.dataDictionary.developNum, this.ruleForm.qualityEmployeesCount);
      }
    },
    // 处理贸易形式
    dealWithTradeForm() {
      if (this.$store.getters.dataDictionary.tradeForm && this.ruleForm.tradeForm) {
        return $helper.getDicText(this.$store.getters.dataDictionary.tradeForm, this.ruleForm.tradeForm);
      }
    },
    // 处理参展目的（多选）
    dealWithParticipationGoal() {
      if (this.$store.getters.dataDictionary.participationGoal && this.ruleForm.participationGoal) {
        return $helper.getTextString(this.ruleForm.participationGoal, this.$store.getters.dataDictionary.participationGoal);
      }
    },
    // 处理是否有内贸业务
    dealWithNternalTradeStatus() {
      if (this.ruleForm.nternalTradeStatus) {
        return this.ruleForm.nternalTradeStatus === '01' ? '是' : '否';
      }
    },
    // 处理主要目标市场（多选）
    dealWithMainTargetMarket() {
      if (this.$store.getters.dataDictionary.mainMarket && this.ruleForm.mainTargetMarket) {
        return $helper.getTextString(this.ruleForm.mainTargetMarket, this.$store.getters.dataDictionary.mainMarket);
      }
    },
    // 处理主要目标客户类型（多选）
    dealWithMainCustomersType() {
      if (this.$store.getters.dataDictionary.mainType && this.ruleForm.mainCustomersType) {
        return $helper.getTextString(this.ruleForm.mainCustomersType, this.$store.getters.dataDictionary.mainType);
      }
    },
    // 处理职位
    dealWithBusinessContactsPosition() {
      if (this.$store.getters.dataDictionary.post && this.ruleForm.businessContactsPosition) {
        return $helper.getDicText(this.$store.getters.dataDictionary.post, this.ruleForm.businessContactsPosition);
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 80%;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.pass-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.cb_confirm {
  position: relative;
  left: 28%;
  margin-top: 20px;
}
.btn1 {
  float: right;
}
.audit-form {
  margin-top: 30px;
}
.folPanel {
  margin-left: 1%;
}
</style>


