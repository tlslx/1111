/**
 * @file 企业基本信息
 */
<style scoped>
  .basic-ruleForm {
    /* width: 70%;
    margin: auto; */
  }
  .basic-ruleForm >>> .el-form-item {
    position: relative;
    /* left: 15%; */
    left: 20%;
    margin-bottom: 25px;
  }
  .basic-ruleForm >>> .el-form-item__label {
    width: 330px!important;
  }
  .basic-ruleForm >>> .el-select {
    width: 320px;
  }
  .basic-ruleForm >>> .el-input {
    width: 320px;
  }
  .basic-ruleForm >>> .el-textarea {
    width: 450px;
  }
  .basic-ruleForm >>> .el-form-item__error {
    left: 230px;
  }
  .el-form-item-btn {
    position: relative;
    left: 20%;
    margin-top: 50px;
  }
  .upload-basic-info {
    display: inline;
  }
  .cb_confirm {
    position: relative;
    left: 28%;
    margin-top: 20px;
  }
  .bus-code {
    display: flex;
    margin-bottom: 22px;
  }
  .bus-name {
    width: 252px;
    margin: 0;
  }
  .bus-input {
    width: 320px;
  }
  .has-customsCode >>> .el-form-item__error {
    left: 0;
  }
  .select-city {
    width: 182px;
    margin-top: 20px;
  }
  .ruleform-mainProductKeywordCh >>> .el-form-item__content {
    line-height: normal;
  }
  .ruleform-mainProductKeywordCh >>> .el-form-item__content {
    line-height: normal;
  }
  .basic-form-companyppl >>> .el-form-item__content {
    line-height: normal;
  }
  .basic-form-enter-register >>> .el-form-item__content {
    margin-left: 230px;
  }
  .basic-info-company-logo-container >>> .el-form-item__content {
    margin-left: 320px!important;
    width: 320px!important;
  }
  .basic-info-company-image-container >>> .el-form-item__content {
    margin-left: 320px!important;
    width: 320px!important;
  }
  .basic-info-company-ppl >>> .el-form-item__content {
    display: inline-block;
    left: 0;
    margin-left: 0!important;
  }
  .basic-info-companyppl-icon {
    margin: 7px;
    color: var(--red-outer-color-basis);
  }
  .basic-info-company-ppl >>> .el-form-item__error {
    left: 0;
  }
  .ruleform-mainProductKeywordEn >>> .el-form-item__content {
    line-height: 12px;
  }
  .el-form-item-btn {
    left: 0;
    margin-top: 30px;
    text-align: center;
  }
  .basicinfo-listedPlaceOther {
    left: 0!important;
    margin-left: 230px!important;
    margin-top: 20px!important;
    margin-bottom: 0!important;
  }
  .basicinfo-listedPlaceOther >>> .el-form-item__error {
    left: 0;
  }
  .basic-info-import-edit >>> .el-form-item__content {
    margin-left: 0!important;
  }
  .basic-info-city-form {
    left: 0!important;
  }
  .basic-info-city-form >>> .el-form-item__error {
    display: inline;
    left: 0;
  }
  .basic-form-enter-register {
    margin-bottom: 0!important;
  }
</style>
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="basicInfo"
      class="basic-ruleForm"
      :label-position="labelPosition">
      <!-- <el-button @click="test">下载</el-button> -->
      <el-form-item label="企业名称（中文）：" prop="companyName">
        <span>{{ ruleForm.companyName }}</span>
      </el-form-item>
      <el-form-item label="企业名称（英文）：" prop="companyNameEn">
        <span>{{ ruleForm.companyNameEn }}</span>
      </el-form-item>
      <el-form-item v-if="basicInfoErrorCustomCode" label="海关编码：">
        <span>{{ originCustomCode }}</span>
      </el-form-item>
      <el-form-item v-if="basicInfoErrorCustomCode" label="" class="basic-info-import-edit">
        <span style="font-size: 20px;font-weight: bold;color: #d80c18;">请修改成正确的海关编码</span>
      </el-form-item>
      <el-form-item label="海关编码：" prop="hasCustomsCode">
        <el-form-item style="display: inline;left: 0;" v-if="!editStatus">
          <el-radio v-model="ruleForm.hasCustomsCode" :disabled="disabledJytReview" label="1" @change="changeCustomsCode">有</el-radio>
          <el-radio v-model="ruleForm.hasCustomsCode" :disabled="disabledJytReview" label="2" @change="changeCustomsCode">无</el-radio>
        </el-form-item>
        <el-form-item class="has-customsCode" :style="{display: 'inline', left: (editStatus ? '0px' : '230px')}" prop="customsCode" ref="customsCode">
          <template v-if="editStatus">
            <span>{{ ruleForm.customsCode }}</span>
          </template>
          <template v-else-if="!editStatus && ruleForm.hasCustomsCode === '1'">
            <el-input v-model="ruleForm.customsCode" :disabled="disabledJytReview" placeholder="请输入海关编码" clearable maxlength="10"></el-input>
            <!-- <i class="el-icon-check" style="cursor: pointer;" @click="confirmImportInfo('customsCode')"></i>
            <i class="el-icon-edit" style="cursor: pointer;" @click="editImportInfo('customsCode')"></i> -->
          </template>
        </el-form-item>
      </el-form-item>
      <el-form-item v-if="basicInfoErrorImportExportCode" label="进出口代码：">
        <span>{{ originImportExportCode }}</span>
      </el-form-item>
      <el-form-item v-if="basicInfoErrorImportExportCode" label="" class="basic-info-import-edit">
        <span style="font-size: 20px;font-weight: bold;color: #d80c18;">请修改成正确的进出口代码</span>
      </el-form-item>
      <el-form-item label="进出口代码：" prop="importExportCode" ref="importExportCode">
        <template v-if="editStatus">
          <span>{{ ruleForm.importExportCode }}</span>
        </template>
         <!-- || basicInfoErrorCustomCode -->
        <template v-else>
          <el-input v-model="ruleForm.importExportCode" :disabled="disabledJytReview" placeholder="请输入进出口代码" clearable maxlength="20"></el-input>
          <!-- <i class="el-icon-check" style="cursor: pointer;" @click="confirmImportInfo('importExportCode')"></i>
          <i class="el-icon-edit" style="cursor: pointer;" @click="editImportInfo('importExportCode')"></i> -->
        </template>
      </el-form-item>
      <el-form-item label="企业统一社会信用代码(营业执照号)：">
        <span>{{ originBusinessLicenceNo }}</span>
      </el-form-item>
      <el-form-item label="企业简称：" prop="enterpriseAbbreviation">
        <span>{{ ruleForm.enterpriseAbbreviation }}</span><span style="margin-left: 5px;font-size: 12px;">--仅用于广交会展位图标示</span>
      </el-form-item>
      <el-form-item label="" class="basic-info-import-edit">
        <span> 注意：以上信息不能自行修改，如有必要修改，请填写</span>
        <el-button style="padding: 0!important;" type="text" @click="toImportant">《重要信息修改申请》</el-button>
        <span>，提交后等待或通知交易团审核。</span>
        <!-- :disabled="editEnterImportInfo()" -->
      </el-form-item>
      <!-- <el-form-item label="所属交易团类型：" prop="tradeGroupType">
        <el-select v-model="ruleForm.tradeGroupType" placeholder="请选择所属交易团" clearable>
          <el-option v-for="item in tradeGroupType" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="企业进出口代码：" prop="importExportCode">
        <el-input clearable maxlength="20" v-model="ruleForm.importExportCode" placeholder="请输入企业进出口代码"></el-input>
      </el-form-item> -->
      <el-form-item label="广交会编码：">
        {{ ruleForm.cantonCode }}
      </el-form-item>
      <!-- <el-form-item v-if="basicInfoErrorCustomCode" label="" class="basic-info-import-edit">
        <span style="font-size: 20px;font-weight: bold;color: #d80c18;">请修改成正确的海关编码</span>
      </el-form-item> -->
      <!-- <el-form-item v-if="basicInfoErrorCustomCode" label="海关编码：" prop="editErrorCustomsCode">
        <el-input v-model="ruleForm.editErrorCustomsCode" placeholder="请输入海关编码" clearable maxlength="18"></el-input>
      </el-form-item> -->
      <el-form-item v-if="basicInfoTipNoProvince" label="" class="basic-info-import-edit">
        <span style="font-size: 20px;font-weight: bold;color: #d80c18;">请修改成正确的企业统一社会信用代码（营业执照号）</span>
        <div style="font-size: 12px;">--填写内容仅作为现场业务收款开票依据，最终发票信息以现场确认为准</div>
      </el-form-item>
      <el-form-item v-if="basicInfoTipNoProvince" label="企业统一社会信用代码(营业执照号)：" prop="businessLicenceNo">
        <el-input v-model="ruleForm.businessLicenceNo" :disabled="disabledJytReview" placeholder="请输入企业统一社会信用代码(营业执照号)" clearable maxlength="18"></el-input>
      </el-form-item>
      <el-form-item label="企业注册地：" class="basic-form-enter-register" required>
        <el-form-item label="" style="display: inline;left: 0;padding-bottom: 25px;">
          <el-input clearable maxlength="100" disabled v-model="ruleForm.province"></el-input>
        </el-form-item>
        <el-form-item label="" prop="city" class="basic-info-city-form">
          <el-select clearable v-model="ruleForm.city" :disabled="disabledJytReview" placeholder="请选择" class="select-city">
            <el-option v-for="item in city" :key="item.provinceCityId" :label="item.provinceCityName" :value="item.provinceCityId"></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="所属交易团：" prop="businessDelegationId">
        <el-select v-model="ruleForm.businessDelegationId"  placeholder="请选择所属交易团" :disabled="disabledBusiDeleId || disabledJytReview" clearable>
          <el-option v-for="item in bussDeleg" :key="item.enterprisesId" :label="item.enterprisesName" :value="item.enterprisesId"></el-option>
        </el-select>
      </el-form-item>
      <!-- 商协会会员号 -->
      <el-form-item label="商协会会员号：" prop="businessAssociationCode">
        <div>请填写申请展区对应商会的会员信息</div>
        <div class="bus-code">
          <p class="bus-name">中国进出口纺织品商会</p>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.textileChamberOfCommerce" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
        <div class="bus-code">
          <span class="bus-name">中国医药保健品进出口商会</span>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.medicinesAndHealthProducts" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
        <div class="bus-code">
          <span class="bus-name">中国食品土畜进出口商会</span>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.foodAndAnimal" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
        <div class="bus-code">
          <span class="bus-name">中国轻工工艺品进出口商会</span>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.lightIndustryCrafts" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
        <div class="bus-code">
          <span class="bus-name">中国五矿化工进出口商会</span>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.minmetalsChemicals" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
        <div class="bus-code">
          <span class="bus-name">中国机电产品进出口商会</span>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.mechanicalProducts" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
        <div class="bus-code">
          <span class="bus-name">中国外商投资企业商会</span>
          <el-input class="bus-input" maxlength="48" v-model="ruleForm.foreignInvestment" :disabled="disabledJytReview" placeholder="请输入会员号" clearable></el-input>
        </div>
      </el-form-item>
      <el-form-item label="企业名称分词：" class="basic-info-company-ppl" prop="companyPpl" ref="companyPpl" style="margin-bottom: 0;">
        <!-- 修改人: 李康   maxlength 改为 maxlength="100" -->
        <el-form-item
          v-for="(item, index) in ruleForm.companyPplList"
          :key="index"
          :prop="'companyPplList.' + index +'.companyPpl'" style="left: 0;"
          :rules="[{required: true, validator: checkCompanyPpl, trigger: 'blur'}]">
          <el-input class="company-ppl" v-model="item.companyPpl" :disabled="disabledJytReview" placeholder="" clearable maxlength="100"></el-input>
          <i v-if="!disabledJytReview" class="el-icon-circle-plus-outline basic-info-companyppl-icon" @click="addCompanyPpl"></i>
          <i v-if="!disabledJytReview" class="el-icon-remove-outline basic-info-companyppl-icon" @click="removeCompanyPpl(item, index)"></i>
        </el-form-item>
        <!-- <el-form-item label="" style="left: 0;margin-left: 230px;"><i class="el-icon-circle-plus-outline" @click="addCompanyPpl"></i></el-form-item> -->
        <!-- <el-form-item :key="index" prop="companyPplTwo"> 施雪龙添加，此处报错，暂时注释-->
        <!-- <el-form-item prop="companyPplTwo">
          <el-input class="company-ppl" v-model="ruleForm.companyPplTwo" placeholder="" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item prop="companyPplThree">
          <el-input class="company-ppl" v-model="ruleForm.companyPplThree" placeholder="" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item prop="companyPplFour">
          <el-input class="company-ppl" v-model="ruleForm.companyPplFour" placeholder="" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item prop="companyPplFive">
          <el-input class="company-ppl" v-model="ruleForm.companyPplFive" placeholder="" clearable maxlength="32"></el-input>
        </el-form-item> -->
      </el-form-item>
      <el-form-item class="basic-form-companyppl" style="margin-bottom: 0;margin-left: 230px;">
        <div style="font-size: 12px;">--仅用于“展商展品查询系统”使用，以方便客商快速查找到贵企业的信息</div>
        <!-- <div style="font-size: 12px;">--填写示例：如企业名称为“广东省海凯思进出品企业”，建议分词为“广东海凯思，海凯思”，多个分词间使用“,”分隔</div> -->
        <div style="font-size: 12px;">--最多只能录入5个分词，且分词内容仅限企业名称中的文字</div>
      </el-form-item>
      <el-form-item label="是否上市企业：" prop="listedStatus">
        <el-radio-group v-model="ruleForm.listedStatus" :disabled="disabledJytReview" @change="changeListedStatus">
          <el-radio label="01">是</el-radio>
          <el-radio label="02">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上市地点：" v-if="isNotInMarket" prop="listedPlace">
        <el-select v-model="ruleForm.listedPlace" :disabled="disabledJytReview" placeholder="请选择" clearable @change="changeListedPlace">
          <el-option v-for="item in listPlace" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-form-item label="" v-if="showListedPlaceOther" prop="listedPlaceOther" class="basicinfo-listedPlaceOther" ref="listedPlaceOther">
          <el-input placeholder="请填写" v-model="ruleForm.listedPlaceOther" :disabled="disabledJytReview" style="width: 200px;" clearable maxlength="500"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="股票代码：" v-if="isNotInMarket" prop="stockCode">
        <el-input v-model="ruleForm.stockCode" :disabled="disabledJytReview" placeholder="请输入股票代码" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="企业属性：" prop="enterpriseAttribute">
        <el-select v-model="ruleForm.enterpriseAttribute" :disabled="disabledJytReview" placeholder="请选择" clearable>
          <el-option v-for="item in enterAttribute" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业类型：" prop="enterprisesType">
        <el-select v-model="ruleForm.enterprisesType" :disabled="disabledJytReview" placeholder="请选择" clearable>
          <el-option v-for="item in enterType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="法人代表：" prop="legalPerson">
        <el-input v-model="ruleForm.legalPerson" :disabled="disabledJytReview" placeholder="请输入法人代表" clearable maxlength="32"></el-input>
      </el-form-item>
      <el-form-item label="企业成立年份：" prop="incorporationYear" ref="incorporationYear">
        <el-input v-model="ruleForm.incorporationYear" placeholder="请输入企业成立年份" clearable maxlength="32"></el-input>
        <!-- <el-date-picker :picker-options="setIncorporaDate" v-model="ruleForm.incorporationYear" format="yyyy" type="year" placeholder="请选择企业成立年份"></el-date-picker> -->
      </el-form-item>
      <el-form-item label="注册资本（万人民币）：" prop="registeredCapital">
        <el-tooltip placement="right-end" effect="light">
          <div slot="content">请输入注册资本（万人民币）<br/>（最多保留4位小数）</div>
          <el-input v-model="ruleForm.registeredCapital" placeholder="" clearable maxlength="32"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="员工数量：" prop="employeesCount">
        <el-select v-model="ruleForm.employeesCount" :disabled="disabledJytReview" placeholder="请选择" clearable>
          <el-option v-for="item in employeeCount" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生产部门人数：" prop="productionEmployeesCount">
        <el-select v-model="ruleForm.productionEmployeesCount" :disabled="disabledJytReview" placeholder="请选择" clearable>
          <el-option v-for="item in productCount" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="研发部门人数：" prop="developEmployeesCount">
        <el-select v-model="ruleForm.developEmployeesCount" :disabled="disabledJytReview" placeholder="请选择" clearable>
          <el-option v-for="item in developCount" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="质监部门人数：" prop="qualityEmployeesCount">
        <el-select v-model="ruleForm.qualityEmployeesCount" :disabled="disabledJytReview" placeholder="请选择" clearable>
          <el-option v-for="item in qualityCount" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厂房面积（平方米）：" prop="plantArea" style="margin-bottom: 20px;">
        <!-- <el-input v-model="ruleForm.plantArea" placeholder="请输入厂房面积（平方米）（最多保留两位小数）" clearable maxlength="48"></el-input> -->
        <el-tooltip placement="right-end" effect="light">
          <div slot="content">如无自有厂房请写0<br/>（最多保留2位小数）</div>
          <el-input v-model="ruleForm.plantArea" :disabled="disabledJytReview" placeholder="请输入厂房面积（平方米）" clearable maxlength="48"></el-input>
        </el-tooltip>
      </el-form-item>
      <!-- <el-form-item class="ruleform-mainProductKeywordEn" style="margin-bottom: 0;margin-left: 230px;">
        <div style="font-size: 12px;">如无自有厂房请写0</div>
      </el-form-item> -->
       <!-- 修改人: 李康   maxlength 改为 maxlength="100" maxlength="200" -->
      <el-form-item label="主营产品关键字（中文）：" prop="mainProductKeywordCh" style="margin-bottom: 20px;">
        <el-tooltip placement="right-end" effect="light">
          <div slot="content">多个关键字请用逗号区分</div>
          <el-input v-model="ruleForm.mainProductKeywordCh" :disabled="disabledJytReview" placeholder="请输入主营产品关键字（中文）" clearable maxlength="100"></el-input>
        </el-tooltip>
      </el-form-item>
      <!-- <el-form-item class="ruleform-mainProductKeywordCh" style="margin-bottom: 0;margin-left: 230px;">
        <div style="font-size: 12px;">多个关键字请用逗号区分</div>
      </el-form-item> -->
      <el-form-item label="主营产品关键字（英文）：" prop="mainProductKeywordEn" style="margin-bottom: 20px;">
        <el-tooltip placement="right-end" effect="light">
          <div slot="content">多个关键字请用逗号区分</div>
          <el-input v-model="ruleForm.mainProductKeywordEn" :disabled="disabledJytReview" placeholder="请输入主营产品关键字（英文）" clearable maxlength="200"></el-input>
        </el-tooltip>
      </el-form-item>
      <!-- <el-form-item class="ruleform-mainProductKeywordEn" style="margin-bottom: 0;margin-left: 230px;">
        <div style="font-size: 12px;">多个关键字请用逗号区分</div>
      </el-form-item> -->
      <el-form-item label="上年度国内销售额（万人民币）：" prop="domesticSalesLast">
        <el-tooltip placement="right-end" effect="light">
          <div slot="content">请输入上年度国内销售额（万人民币）<br/>（最多保留4位小数）</div>
          <el-input v-model="ruleForm.domesticSalesLast" :disabled="disabledJytReview" clearable maxlength="20"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="上年度出口额（万美元）：" prop="exportVolumeLast">
        <el-tooltip placement="right-end" effect="light">
          <div slot="content">请输入上年度出口额（万美元）<br/>（最多保留4位小数）</div>
          <el-input v-model="ruleForm.exportVolumeLast" :disabled="disabledJytReview" clearable maxlength="20"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="纳税人识别号：" prop="taxpayerIdentificationNo">
        <el-input v-model="ruleForm.taxpayerIdentificationNo" :disabled="disabledJytReview" placeholder="请输入纳税人识别号" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item  label="贸易形式(多选)：" prop="tradeForm">
        <el-checkbox-group v-model="ruleForm.tradeForm" :disabled="disabledJytReview" placeholder="请选择">
          <el-checkbox v-for="item in tradeForm" :label="item.label" :key="item.value" :value="item.value"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="企业LOGO：" prop="companyLogoId" class="basic-info-company-logo-container">
        <el-upload
          :disabled="disabledJytReview"
          class="upload-basic-info"
          :action="logoUploadUrl + ''"
          list-type="picture"
          :on-preview="handlePreview"
          :on-remove="handleLogoRemove"
          :before-remove="logoBeforeRemove"
          :on-success="logoUploadSuccessfully"
          :on-exceed="handleLogoExceed"
          :before-upload="handleLogoBeforeUpload"
          :file-list="logoFileList"
          :limit="imgLimit">
          <el-button v-if="logoFileList.length < 1" :disabled="disabledJytReview" type="primary">点击上传</el-button>
          <!-- <i v-show="logoFileList.length < 1" class="el-icon-plus"></i> -->
        </el-upload>
        <span style="float: right;font-size: 12px;">- 格式：JPG, JPEG, PNG, GIF<br/>- 大小：不超过100kb<br/>- 建议图片长宽为150像素左右，以达到最佳显示效果</span>
        <el-dialog :visible.sync="companyLogoIdInfo.dialogVisible">
          <img width="100%" :src="companyLogoIdInfo.dialogImageUrl" alt="企业LOGO">
        </el-dialog>
      </el-form-item>
      <el-form-item label="企业形象图：" prop="companyImageId" class="basic-info-company-image-container">
        <el-upload
          :disabled="disabledJytReview"
          class="upload-basic-info"
          :action="imageUploadUrl + ''"
          list-type="picture"
          :on-preview="handlePreview"
          :on-remove="handleImageRemove"
          :before-remove="imageBeforeRemove"
          :on-exceed="handleImageExceed"
          :on-success="imageUploadSuccessfully"
          :before-upload="handleImageBeforeUpload"
          :file-list="imageFileList"
          :limit="imgLimit">
            <el-button v-if="imageFileList.length < 1" :disabled="disabledJytReview" type="primary">点击上传</el-button>
          <!-- <i v-show="imageFileList.length < 1" class="el-icon-plus"></i> -->
        </el-upload>
        <span style="float: right;font-size: 12px;">- 格式：JPG, JPEG, PNG, GIF<br/>- 大小：不超过100kb<br/>- 建议图片长宽为150像素左右，以达到最佳显示效果</span>
        <el-dialog :visible.sync="companyImageIdInfo.dialogVisible">
          <img width="100%" :src="companyImageIdInfo.dialogImageUrl" alt="企业形象图">
        </el-dialog>
      </el-form-item>
      <el-form-item label="企业简介（中文）：" prop="companyProfileCh">
        <el-input type="textarea" :autosize="{ minRows: 10 }" placeholder="请输入内容" v-model="ruleForm.companyProfileCh" :disabled="disabledJytReview" clearable maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="企业简介（英文）：" prop="companyProfileEn">
        <el-input type="textarea" :autosize="{ minRows: 10 }" placeholder="请输入内容" v-model="ruleForm.companyProfileEn" :disabled="disabledJytReview" clearable maxlength="2500"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否参展过：" prop="isParticipated">
        <el-radio-group v-model="ruleForm.isParticipated" @change="changeParticipation">
          <el-radio label="01">是</el-radio>
          <el-radio label="02">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- 江重生  不清楚后台传isParticipated会不会有误，未用上面的数据，这边沟通修改为 确定为是，企业首次参展年份参数传，否,参数不传，只操作firstExhibitionDate -->
      <!-- 江重生   确定为 参展有 则传 firstExhibitionDate 无 测删去 firstExhibitionDate 不传 ，删除 赋值 在change 内-->
      <!-- <el-form-item label="是否参展过：">
        <el-radio-group v-model="isParticipated" @change="changeParticipation">
          <el-radio label="01">是</el-radio>
          <el-radio label="02">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="企业首次参展年份：" prop="firstExhibitionDate">
          <!-- v-show="isNotParticipate"  -->
        <el-input v-model="ruleForm.firstExhibitionDate" :disabled="disabledJytReview" placeholder="请输入企业首次参展年份" clearable maxlength="32"></el-input>
        <!-- <el-date-picker :picker-options="setFirstExhibitDate" v-model="ruleForm.firstExhibitionDate" format="yyyy" type="year" placeholder="请输入企业首次展时间"></el-date-picker> -->
      </el-form-item>
    </el-form>
    <div class="el-form-item-btn">
      <el-button type="primary" @click="submitForm">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  data() {
    return {
      companyId: this.$store.state.userInfo.companyId,
      // 初始海关编码
      originCustomCode: "",
      // 海关编码错误
      basicInfoErrorCustomCode: false,
      // 初始进出口代码
      originImportExportCode: "",
      // 进出口代码错误
      basicInfoErrorImportExportCode: false,
      // 初始化是否是错误的营业执照号
      originBusiLicenNoIsError: true,
      // 企业营业执照号错误
      basicInfoTipNoProvince: false,
      // 初始营业执照号
      originBusinessLicenceNo: "",
      businessLicenceNoOld: "",
      // 禁用所属交易团
      disabledBusiDeleId: false,
      // 企业基本信息
      ruleForm: {
        companyId: this.$store.state.userInfo.companyId,
        // 企业名称
        companyName: "",
        // 企业名称（英文）
        companyNameEn: "",
        // 是否有海关编码
        hasCustomsCode: '1',
        // 海关编号
        customsCode: "",
        // 老用户的海关编码
        // editErrorCustomsCode: "",
        // 企业进出口代码
        importExportCode: "",
        // 营业执照号
        businessLicenceNo: "",
        // 广交会编码
        cantonCode: "",
        // 企业简称
        enterpriseAbbreviation: "",
        // 所属交易团类型
        // tradeGroupType: "",
        // 省
        province: "",
        provinceId: "",
        // 市
        city: "",
        // 所属交易团
        businessDelegationId: "",
        // 中国进出口纺织品展会
        textileChamberOfCommerce: "",
        // 中国医药保健品进出口商会
        medicinesAndHealthProducts: "",
        // 中国食物土畜进出口商会
        foodAndAnimal: "",
        // 中国轻工工艺品进出口商会
        lightIndustryCrafts: "",
        // 中国五矿化工进出口商会
        minmetalsChemicals: "",
        // 中国机电产品进出口商会
        mechanicalProducts: "",
        // 中国外商投资进出口商会
        foreignInvestment: "",
        // 企业名称分词
        companyPpl: "",
        // 企业名称分词数组
        companyPplList: [
          {
            companyPpl: ''
          }
        ],
        // 是否上市企业
        listedStatus: "02",
        // 上市地点
        listedPlace: "",
        // 其他上市地点
        listedPlaceOther: "",
        // 股票代码
        stockCode: "",
        // 企业属性
        enterpriseAttribute: "",
        // 企业类型
        enterprisesType: "",
        // 法人代表
        legalPerson: "",
        // 企业成立年份
        incorporationYear: "",
        // 注册资本（万人民币）
        registeredCapital: "",
        // 员工数量
        employeesCount: "",
        // 生产部门人数
        productionEmployeesCount: "",
        // 研发部门人数
        developEmployeesCount: "",
        // 质检部门人数
        qualityEmployeesCount: "",
        // 厂房面积
        plantArea: "",
        // 主营产品关键字（中文）
        mainProductKeywordCh: "",
        // 主营产品关键字（英文）
        mainProductKeywordEn: "",
        elKeywordsMainPro: "",
        // 上年度国内销售额
        domesticSalesLast: "",
        // 上年度出口额
        exportVolumeLast: "",
        // 纳税人识别号
        taxpayerIdentificationNo: "",
        // 贸易形式
        tradeForm: [],
        // 企业LOGO
        companyLogoId: "",
        // 企业形象图
        companyImageId: "",
        // 企业简介（中文）
        companyProfileCh: "",
        // 企业简介（英文）
        companyProfileEn: "",
        // 是否参展过
        isParticipated: "01",
        // 企业首次参展时间（年）
        firstExhibitionDate: ""
      },
      // 处理海关编码
      editStatus: false,
      // 所属交易图
      bussDeleg: [],
      // 全国交易团
      allCountriesBusiDele: [],
      // 市
      city: [],
      // 是否参展
      isParticipated: '01',
      // 设置表单对齐方1式1
      labelPosition: 'left',
      // 查看海关编码是否通过校验
      validCustomsCode: true,
      // 查看进出口代码是否通过检验
      validImportExportCode: true,
      // 默认不显示其他上市地点的输入框
      showListedPlaceOther: false,
      // 上传图片地址
      logoUploadUrl: process.env.API_OS_URL + '/efOS/file/addLogoFile',
      imageUploadUrl: process.env.API_OS_URL + '/efOS/file/addLogoFile',
      // logo是否是格式正确的图片
      logoIsJPG: true,
      // logo图片大小是否符合规范
      logoIsLt100Kb: true,
      // 形象图是否是格式正确的图片
      imageIsJPG: true,
      // 形象图图片大小是否符合规范
      imageIsLt100Kb: true,
      // 企业logo
      companyLogoIdInfo: {
        // 预览图片窗口图片地址
        dialogImageUrl: '',
        // 预览图片窗口默认隐藏
        dialogVisible: false
      },
      // 企业形象图
      companyImageIdInfo: {
        // 预览图片窗口图片地址
        dialogImageUrl: '',
        // 预览图片窗口默认隐藏
        dialogVisible: false
      },
      // 当非上市公司时，隐藏上市地点与股票代码
      isNotInMarket: true,
      // 未参展过
      isNotParticipate: true,
      // 图片上传文件数最大限制
      imgLimit: 1,
      // 企业LOGO
      logoFileList: [],
      // 企业形象图
      imageFileList: [],
      // 所属交易团
      // tradeGroupType: [],
      // 上市地点数组
      listPlace: [],
      // 企业属性数组
      enterAttribute: [],
      // 企业类型数组
      enterType: [],
      // 员工数量数组
      employeeCount: [],
      // 生产部人数数组
      productCount: [],
      // 研发部人数数组
      developCount: [],
      // 质检部人数数组
      qualityCount: [],
      // 贸易形式checkbox
      tradeForm: [],
      // 设置企业成立年份当前年份后不可选
      setIncorporaDate: {
        disabledDate: (time) => {
          return time.getTime() > new Date().getTime();
        }
      },
      // 设置企业首次参展年份的禁用日期
      setFirstExhibitDate: {
        disabledDate: (time) => {
          return time.getTime() < new Date('1957-01-01').getTime() || time.getTime() > new Date().getTime();
        }
      },
      // 校验
      rules: {
         // 所属交易团类型校验
        // tradeGroupType: [
        //   { required: true, message: "请选择所属交易团类型", trigger: "change" }
        // ],
        // 企业中文名称
        // companyName: [
        //   { required: true, validator: checkCn, trigger: "blur" }
        // ],
        // // 企业英文名称
        // companyNameEn: [
        //   { required: true, validator: checkEn, trigger: "blur" }
        // ],
        // 是否有海关编码
        hasCustomsCode: [
          { required: true, trigger: "blur" }
        ],
        // 海关编码
        customsCode: [
          { required: true, validator: this.validateMail, trigger: "blur" }
        ],
        // 修改老用户错误的海关编码
        // editErrorCustomsCode: [
        //   { required: true, validator: this.validateEditErrorMail, trigger: "blur" }
        // ],
        // 进出口代码校验
        importExportCode: [
          { required: true, validator: this.validateImportExportCode, trigger: "blur" }
        ],
        // 企业营业执照注册号/统一社会信用代码校验
        businessLicenceNo: [
          { required: true, validator: this.validateNo, trigger: "blur" }
        ],
        // // 企业简称
        // enterpriseAbbreviation: [
        //   { required: true, validator: validateEnterAbbreviation, trigger: "blur" }
        // ],
        city: [
          { required: true, message: "请选择市", trigger: "change" }
        ],
        // 所属交易团校验
        businessDelegationId: [
          { required: true, message: "请选择所属交易团", trigger: "change" }
        ],
        // 企业名称分词校验
        companyPpl: [
          { required: true, message: '', trigger: "blur" }
        ],
        // // 企业名称分词一校验
        // companyPplOne: [
        //   { validator: this.checkCompanyPpl, trigger: 'blur' }
        // ],
        // // 企业名称分词二校验
        // companyPplTwo: [
        //   { validator: this.checkCompanyPpl, trigger: 'blur' }
        // ],
        // // 企业名称分词三校验
        // companyPplThree: [
        //   { validator: this.checkCompanyPpl, trigger: 'blur' }
        // ],
        // // 企业名称分词四校验
        // companyPplFour: [
        //   { validator: this.checkCompanyPpl, trigger: 'blur' }
        // ],
        // // 企业名称分词五校验
        // companyPplFive: [
        //   { validator: this.checkCompanyPpl, trigger: 'blur' }
        // ],
        // 是否上市企业校验
        listedStatus: [
          { required: true, message: "请选择是否上市企业", trigger: "change" }
        ],
        // 上市地点校验
        listedPlace: [
          { required: true, message: "请选择上市地点", trigger: "change" }
        ],
        // 股票代码校验
        stockCode: [
          { required: true, validator: this.checkStockCode, trigger: "blur" }
        ],
        // 其他上市地点校验
        listedPlaceOther: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        // 企业属性校验
        enterpriseAttribute: [
          { required: true, message: "请选择企业属性", trigger: "change" }
        ],
        // 企业类型校验
        enterprisesType: [
          { required: true, message: "请选择企业类型", trigger: "change" }
        ],
        // 法人代表校验
        legalPerson: [
          { required: true, validator: this.validatorLegalPerson, trigger: "blur" }
        ],
        // 企业成立年份校验
        incorporationYear: [
          { required: true, validator: this.checkIncorporationYear, trigger: "blur" }
        ],
        // 注册资本校验-正整数，最多四位小数
        registeredCapital: [
          { required: true, validator: this.checkRegisteredCapital, trigger: "blur" }
        ],
        // 员工数量校验
        employeesCount: [
          { required: true, message: "请选择员工数量", trigger: "change" }
        ],
        // 生产部门人数校验
        productionEmployeesCount: [
          { required: true, message: "请选择生产部门人数", trigger: "change" }
        ],
        // 研发部门人数校验
        developEmployeesCount: [
          { required: true, message: "请选择生产部门人数", trigger: "change" }
        ],
        // 质监部门人数校验
        qualityEmployeesCount: [
          { required: true, message: "请选择质监部门人数", trigger: "change" }
        ],
        // 厂房面积校验-正整数-保留两位小数
        plantArea: [
          { required: true, validator: this.checkPlantArea, trigger: "blur" }
        ],
        // 主营产品关键字（中文）校验
        mainProductKeywordCh: [
          { required: true, validator: this.checkMainProductKeyWordCh, trigger: "blur" }
          // message: "请输入主营产品关键字（中文）",
        ],
        // 主营产品关键字（英文）
        mainProductKeywordEn: [
          { required: true, validator: this.checkMainProductKeyWordEn, trigger: "blur" }
        ],
        // 上半年国内销售额（万人民币）-保留四位小数
        domesticSalesLast: [
          { required: true, validator: this.checkDomesticSalesLast, trigger: "blur" }
        ],
        // 上年度出口额校验-保留四位小数
        exportVolumeLast: [
          { required: true, validator: this.checkExportVolumeLast, trigger: "blur" }
        ],
        // 纳税人识别号校验
        taxpayerIdentificationNo: [
          { validator: this.checkTaxpayerIdentificationNo, trigger: "blur" }
        ],
        // 企业简介（中文）校验
        companyProfileCh: [
          { required: true, validator: this.checkCompanyProfileCh, trigger: "blur" }
        ],
        // 企业简介（英文）校验
        companyProfileEn: [
          { required: true, validator: this.checkComanyProfileEn, trigger: "blur" }
        ],
        // 企业首次展时间（年）校验
        firstExhibitionDate: [
          { required: true, message: "请输入企业首次展时间年份", trigger: "blur" }
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
  computed: {
    ...mapGetters('corpDataManagement', ['getbasic'])
  },
  async beforeCreate() {
    this.tradeForm = await kindo.dictionary.get('tradeForm'); // 贸易形式
    this.listPlace = await kindo.dictionary.get('listingPlace'); // 上市地点字典
    this.enterAttribute = await kindo.dictionary.get('companyAttribute'); // 企业属性字典
    this.enterType = await kindo.dictionary.get('companyType'); // 企业类型字典
    this.employeeCount = await kindo.dictionary.get('staff'); // 员工数量字典
    this.productCount = await kindo.dictionary.get('staff'); // 生产部门人数字典
    this.developCount = await kindo.dictionary.get('developNum'); // 研发部门人数字典
    this.qualityCount = await kindo.dictionary.get('developNum'); // 质监部门人数字典
  },
  mounted() {
    let _this = this;
    this.getBasicInfo(_this.companyId).then(res => {
      if (res) {
        this.originBusinessLicenceNo = res.businessLicenceNo;
        for (let key in res) {
          _this.dealWithFormData(key, res);
        }
        _this.dealWithData(res);
        // 给海关编码赋初始值
        _this.originCustomCode = res.customsCode;
        // 初始化时校验海关编码，若海关编码格式不符合则要求用户修改海关编码
        let str = /^[0-9a-zA-Z]{10}$/;
        if ((String(_this.originCustomCode) !== 'null') && _this.originCustomCode !== '' && _this.originCustomCode !== '无' && !str.test(_this.originCustomCode)) {
          this.basicInfoErrorCustomCode = true;
          this.ruleForm.customsCode = '';
          this.editStatus = false;
        } else {
          this.basicInfoErrorCustomCode = false;
        }
        // 给企业进出口代码赋初始值
        _this.originImportExportCode = res.importExportCode;
        let regStr = /^[A-Z\d]+$/;
        if ((String(_this.originImportExportCode) !== 'null') && _this.originImportExportCode !== '' && _this.originImportExportCode !== '无' && !regStr.test(_this.originImportExportCode)) {
          this.basicInfoErrorImportExportCode = true;
          this.ruleForm.importExportCode = '';
          this.editStatus = false;
        } else {
          this.basicInfoErrorImportExportCode = false;
        }
        if (res.businessLicenceNo && res.businessLicenceNo !== '' && res.businessLicenceNo.length >= 4) {
          this.getDelegationAndProAndCityInfo(res.businessLicenceNo.substr(2, 2)).then(response => {
            _this.bussDeleg = response.businessDelegation;
            _this.allCountriesBusiDele = response.allBusinessDelegation;
            _this.ruleForm.province = response && response.province ? response.province.provinceCityName : '';
            _this.ruleForm.provinceId = response && response.province ? response.province.provinceCityId : '';
            if (response && !response.province) {
              this.basicInfoTipNoProvince = true;
              this.originBusiLicenNoIsError = false;
              // 当不存在省的情况，清空营业执照号，市
              this.ruleForm.businessLicenceNo = '';
              this.ruleForm.city = '';
            } else {
              this.basicInfoTipNoProvince = false;
              this.ruleForm.businessLicenceNo = res.businessLicenceNo;
              // 初始化记住接口返回的营业执照号
              this.businessLicenceNoOld = res.businessLicenceNo;
            }
            _this.city = response && response.city ? response.city : [];
            // 处理所属交易团
            if (response.allBusinessDelegation && response.allBusinessDelegation.length > 0) {
              response.allBusinessDelegation.forEach((value, index, array) => {
                if (value.enterprisesId === res.businessDelegationId) {
                  this.ruleForm.businessDelegationId = value.enterprisesName;
                }
              });
            }
          });
        } else {
          this.basicInfoTipNoProvince = true;
          this.originBusiLicenNoIsError = false;
          // 当营业执照号错误的情况清空营业执照号，市和省的信息
          this.ruleForm.province = '';
          this.ruleForm.provinceId = '';
          this.ruleForm.businessLicenceNo = '';
          this.ruleForm.city = '';
          this.getDelegationAndProAndCityInfo().then(response => {
            // 处理所属交易团
            if (response.allBusinessDelegation && response.allBusinessDelegation.length > 0) {
              response.allBusinessDelegation.forEach((value, index, array) => {
                if (value.enterprisesId === res.businessDelegationId) {
                  this.ruleForm.businessDelegationId = value.enterprisesName;
                }
              });
            }
          });
        }
      }
    });
  },
  methods: {
    ...mapActions('file', ['delBasicFileInfo']),
    ...mapActions('corpDataManagement', ['reviewCompanyDocs', 'getBasicInfo']),
    ...mapActions("enterpriseRegister", ["getDelegationAndProAndCityInfo", "checkCompanyInfoByBusinessLicenceNoInfo"]),
    // test() {
    //   let url = process.env.API_OS_URL + '/efOS/file/exportExcel';
    //   window.open(url);
    // },
    // 循环遍历表单的数据
    dealWithFormData(key, res) {
      let _this = this;
      // 处理企业基本信息
      for (let ruleKey in _this.ruleForm) {
        if (res[key] && res[key] !== '' && key === ruleKey) {
          _this.$set(_this.ruleForm, ruleKey, res[key]);
        }
      }
    },
    // 处理相关数据
    dealWithData(res) {
      let _this = this;
      // 处理企业成立年份
      // let incorporationYear = res.incorporationYear;
      // if (incorporationYear && incorporationYear !== '') {
      //   let length = incorporationYear.length;
      //   let toNum = Number(incorporationYear);
      //   if (!isNaN(toNum) && length > 10) {
      //     _this.$set(_this.ruleForm, 'incorporationYear', new Date(toNum));
      //   } else if (new Date(String(res.incorporationYear)).getDate() > 0 && length > 10) {
      //     _this.$set(_this.ruleForm, 'incorporationYear', res.incorporationYear);
      //   } else {
      //     _this.$set(_this.ruleForm, 'incorporationYear', null);
      //   }
      // } else {
      //   _this.$set(_this.ruleForm, 'incorporationYear', null);
      // }
      // 处理贸易的罗列
      if (typeof res.tradeForm === 'string' && res.tradeForm.length > 0) {
        _this.$set(_this.ruleForm, 'tradeForm', _this.dealWithShowCheckBox(res.tradeForm, _this.tradeForm));
      }
      // 处理企业名称分词
      if (_this.ruleForm.companyPpl !== '' && _this.ruleForm.companyPpl.length > 0) {
        _this.ruleForm.companyPplList = [];
        let companyPplArr = _this.ruleForm.companyPpl.split(',');
        companyPplArr.forEach((value, index, array) => {
          if (value !== '') {
            let currentCompanyPpl = {
              companyPpl: value
            };
            _this.ruleForm.companyPplList.push(currentCompanyPpl);
          }
        });
      }
      // 处理海关编码和企业进出口代码
      if (_this.ruleForm.customsCode !== '' && _this.ruleForm.importExportCode !== '') {
        _this.editStatus = true;
      }
      // 处理是否是上市企业
      this.changeListedStatus(res.listedStatus);
    },
    // 处理有无海关编码的选择
    changeCustomsCode(val) {
      if (val === '1') {
        this.rules.customsCode[0].required = true;
      } else {
        this.rules.customsCode[0].required = false;
        this.$refs['customsCode'].clearValidate();
      }
    },
    // 处理checkbox的显示问题
    dealWithShowCheckBox(prevData, dicData) {
      let targetArray = [];
      targetArray = prevData && dicData && dicData.length > 0
      ? $helper.getLabelArray(prevData, dicData)
      : [];
      return targetArray;
    },
    // 添加企业名称分词
    addCompanyPpl() {
      if (this.ruleForm.companyPplList.length < 5) {
        this.ruleForm.companyPplList.push({});
      } else {
        this.$message({
          showClose: true,
          message: '最多只能录入5个分词',
          type: 'error'
        });
      }
    },
    // 删除企业名称分词
    removeCompanyPpl(item, index) {
      if (this.ruleForm.companyPplList.length > 1) {
        let currentIndex = this.ruleForm.companyPplList.indexOf(item);
        if (currentIndex !== -1) {
          this.ruleForm.companyPplList.splice(currentIndex, 1);
        }
      } else {
        this.$message({
          showClose: true,
          message: '最少需要录入1个分词',
          type: 'error'
        });
      }

    },
    // 判断是否确认修改企业重要信息
    confirmImportInfo(prop) {
      this[prop] = true;
    },
    // 编辑企业重要重要
    editImportInfo(prop) {
      this[prop] = false;
    },
    // 正则10位海关编码
    validateMail(rule, value, callback) {
      let str = /^[0-9a-zA-Z]{10}$/;
      if (this.rules.customsCode[0].required && this.ruleForm.customsCode !== '无') {
        if (value === '' && this.ruleForm.hasCustomsCode === '1') {
          this.validCustomsCode = false;
          return callback(new Error('请输入海关编码'));
        } else if (!str.test(value)) {
          this.validCustomsCode = false;
          return callback(new Error('请输入正确的10位海关编码'));
        } else {
          this.validCustomsCode = true;
          return callback();
        }
      } else {
        this.validCustomsCode = true;
        return callback();
      }
    },
    // 校验修复的海关编码输入框
    validateEditErrorMail(rule, value, callback) {
      let str = /^[0-9a-zA-Z]{10}$/;
      if (value === '') {
        this.validCustomsCode = false;
        return callback(new Error('请输入海关编码'));
      } else if (!str.test(value)) {
        this.validCustomsCode = false;
        return callback(new Error('请输入正确的10位海关编码'));
      } else {
        this.validCustomsCode = true;
        return callback();
      }
    },
    // 校验进出口代码
    validateImportExportCode(rule, value, callback) {
      let str = /^[A-Z\d]+$/;
      if (value === '') {
        this.validImportExportCode = false;
        return callback(new Error('请输入进出口代码'));
      } else if (!str.test(value)) {
        this.validImportExportCode = false;
        return callback(new Error('请输入正确的进出口代码，数字或大写字母'));
      } else {
        this.validImportExportCode = true;
        return callback();
      }
    },
    // 校验营业执照号
    validateNo(rule, value, callback) {
      let str = /^[A-Za-z0-9]{18}$/;
      // 大于等于4位截取第三位和第四位数字
      let validBusinessLicenceNo = '';
      if (value === '' || !value) {
        // 上一次营业执照号若不等于当前用户输入的营业执照号则清空市和交易团的信息
        if (this.businessLicenceNoOld !== value) {
          this.ruleForm.city = '';
          this.ruleForm.businessDelegationId = '';
          this.city = [];
          this.bussDeleg = [];
        }
        // 记住上一次用户输入的营业执照号
        this.businessLicenceNoOld = value;
        return callback(new Error('请输入营业执照号(18位数字或字母)'));
      } else if (!str.test(value)) {
        // 上一次营业执照号若不等于当前用户输入的营业执照号则清空市和交易团的信息
        if (this.businessLicenceNoOld !== value) {
          this.ruleForm.city = '';
          this.ruleForm.businessDelegationId = '';
          this.city = [];
          this.bussDeleg = [];
        }
        // 记住上一次用户输入的营业执照号
        this.businessLicenceNoOld = value;
        return callback(new Error('您输入的企业统一社会信用代码/营业执照号格式有误'));
      } else {
        validBusinessLicenceNo = value.length >= 4 ? value.substr(2, 2) : '';
        this.getDelegationAndProAndCityInfo(validBusinessLicenceNo).then(res => {
          this.bussDeleg = res && res.businessDelegation ? res.businessDelegation : [];
          this.city = res && res.city ? res.city : [];
          if (res && res.province) {
            this.ruleForm.province = res && res.province ? res.province.provinceCityName : '';
            this.ruleForm.provinceId = res && res.province && res.province.provinceCityId ? res.province.provinceCityId : '';
            // 上一次营业执照号若不等于当前用户输入的营业执照号则清空市和交易团的信息
            if (this.businessLicenceNoOld !== value) {
              this.ruleForm.city = '';
              // this.ruleForm.businessDelegationId = '';
            }
            // 记住上一次用户输入的营业执照号
            this.businessLicenceNoOld = value;
            if (this.basicInfoTipNoProvince) {
              this.checkCompanyInfoByBusinessLicenceNoInfo(value).then(response => {
                if (String(res.province) === 'null' || String(response) !== 'null') {
                  return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
                } else {
                  return callback();
                }
              }).catch(error => {
                this.ruleForm.province = '';
                this.ruleForm.city = '';
                this.ruleForm.businessDelegationId = '';
                return callback(new Error('该企业统一社会信用代码/营业执照号已被注册'));
              });
            } else {
              return callback();
            }
          } else {
            this.ruleForm.province = '';
            this.ruleForm.city = '';
            this.ruleForm.businessDelegationId = '';
            return callback(new Error('您输入的企业统一社会信用代码/营业执照号有误'));
          }
        }).catch(e => {
          return callback(new Error(e));
        });
      }
    },
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
    // 信息未完善不能修改重要信息
    editEnterImportInfo() {
      if (this.ruleForm.companyName === ''
        && this.ruleForm.companyNameEn === ''
        && this.ruleForm.customsCode === ''
        && this.ruleForm.importExportCode === ''
        && this.ruleForm.businessLicenceNo === ''
        && this.ruleForm.enterpriseAbbreviation === '') {
        return 'true';
      } else {
        return 'false';
      }
    },
    // 修改上市地点
    changeListedPlace(val) {
      // let label = $helper.getDictLabel(this.listPlace, val);
      if (val === '9') { // 包含该元素
        this.showListedPlaceOther = true;
        this.rules.listedPlaceOther[0].required = true;
      } else {
        this.showListedPlaceOther = false;
        this.rules.listedPlaceOther[0].required = false;
        this.ruleForm.listedPlaceOther = '';
      }
    },
    // 企业名称分词
    checkCompanyPpl(rule, value, callback) {
      let companyNameCh = this.ruleForm.companyName; // 企业名称中文
      let companyNameEn = this.ruleForm.companyNameEn; // 企业名称英文
      let hasCommonCh = false;
      let hasCommonEn = false;
      if (value && value !== '') {
        hasCommonCh = $helper.hasDiffPartByTwoStr(value, companyNameCh);
        if (hasCommonCh) {
          hasCommonEn = $helper.hasDiffPartByTwoStr(value, companyNameEn);
        }
      }
      if (!value || value === '') {
        return callback('请输入企业名称分词');
      } else if (hasCommonEn) {
        return callback('企业分词必须来源于企业中英文名称');
      } else if (value > 8) {
        return callback('总字数不能超过8个字');
      } else {
        return callback();
      }
    },
    // 校验股票代码-英文和数字
    checkStockCode(rule, value, callback) {
      let str = this.$store.state.common.CHECK_CONST_DATA.englishAndNum;
      if (value === '') {
        return callback('请输入股票代码');
      } else if (!str.test(value)) {
        return callback(new Error('请输入英文和数字'));
      } else {
        return callback();
      }
    },
    // 校验主营产品关键字（中文）
    checkMainProductKeyWordCh(rule, value, callback) {
      let errors = [];
      let regRule = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      if (value === '') {
        errors.push(new Error("请输入主营产品关键字（中文）"));
      } else {
        let valArr = value.replace(/，/ig, ',').split(',');
        valArr.forEach((validVal, validIndex) => {
          if (!regRule.test(validVal)) {
            errors.push(new Error("必须包含汉字"));
          }
        });
      }
      callback(errors);
    },
    // 校验主营产品关键字（英文）
    checkMainProductKeyWordEn(rule, value, callback) {
      let errors = [];
      let regRuleEn = this.$store.state.common.CHECK_CONST_DATA.notChinese;
      // let regRuleEn = this.$store.state.common.CHECK_CONST_DATA.notChAndNotStartByBlank;
      if (value === '') {
        errors.push(new Error("请输入主营产品关键字（英文）"));
      } else {
        let valArr = value.replace(/，/ig, ',').split(',');
        valArr.forEach((validVal, validIndex) => {
          if (!regRuleEn.test(validVal)) {
            errors.push(new Error("不允许汉字"));
          }
        });
      }
      callback(errors);
    },
    // 营业执照号的验证
    checkBusinessLicenceNo(rule, value, callback) {
      let str = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
      if (value === '') {
        return callback('请输入企业营业执照注册号/统一社会信用代码');
      } else if (!str.test(value)) {
        return callback(new Error('请输入正确的营业执照号'));
      } else {
        return callback();
      }
    },
    // 校验企业成立年份
    checkIncorporationYear(rule, value, callback) {
      // let str = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
      if (value === '') {
        return callback('请输入企业成立年份');
      } else {
        return callback();
      }
    },
    // 注册资本（万人民币）校验
    checkRegisteredCapital(rule, value, callback) {
      // let reg = /^([0-9]+)(.[0-9]{1,4})?$/;
      let reg = /^\d*(\.\d{1,4})?$/;
      if (value === '') {
        return callback('请输入注册资本');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的数字，最多保留4位小数'));
      } else {
        return callback();
      }
    },
    // 厂房面积校验
    checkPlantArea(rule, value, callback) {
      // let reg = /^([0-9]+)(.[0-9]{1,2})?$/;
      let reg = /^\d*(\.\d{1,2})?$/;
      if (value === '') {
        return callback('请输入厂房面积');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的数字，最多保留2位小数'));
      } else {
        return callback();
      }
    },
    // 上年度出口额校验
    checkExportVolumeLast(rule, value, callback) {
      // let reg = /^([0-9]+)(.[0-9]{1,4})?$/;
      let reg = /^\d*(\.\d{1,4})?$/;
      if (value === '') {
        return callback('请输入上年度出口额');
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的数字，最多保留4位小数'));
      } else {
        return callback();
      }
    },
    // 纳税人识别号校验
    checkTaxpayerIdentificationNo(rule, value, callback) {
      let str = this.$store.state.common.CHECK_CONST_DATA.englishAndNum;
      if (value === '' || value == null) {
        return callback();
      }
      if (!str.test(value)) {
        return callback(new Error('请输入字母/数字'));
      } else {
        return callback();
      }
    },
    // 校验企业简介（中文）
    checkCompanyProfileCh(rule, value, callback) {
      let errors = [];
      // let containChinese = this.$store.state.common.CHECK_CONST_DATA.containChinese;
      let containChinese = this.$store.state.common.CHECK_CONST_DATA.containChAndEnter;
      if (value === '') {
        errors.push(new Error("请输入中文企业简介"));
      } else if (!containChinese.test(value)) {
        errors.push(new Error("必须包含汉字"));
      }
      callback(errors);
    },
    // 校验企业简介（英文）
    checkComanyProfileEn(rule, value, callback) {
      let errors = [];
      let notChinese = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
      if (value === '') {
        errors.push(new Error("请输入英文企业简介"));
      } else if (notChinese.test(value)) {
        errors.push(new Error("不允许输入汉字"));
      }
      callback(errors);
    },
    // 上半年国内销售额（万人民币）校验
    checkDomesticSalesLast(rule, value, callback) {
      // let reg = /^([0-9]*)(.[0-9]{1,4})?$/;
      let reg = /^\d*(\.\d{1,4})?$/;
      if (value === '') {
        return callback(new Error('请输入上年度国内销售额'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的数字，最多保留4位小数'));
      } else {
        return callback();
      }
    },
    // 修改是否是上市公司
    changeListedStatus(val) {
      if (val === '02' || !val) {
        this.isNotInMarket = false;
        this.rules.listedPlace[0].required = false;
        this.rules.listedPlace[0].stockCode = false;
      } else {
        this.isNotInMarket = true;
        this.rules.listedPlace[0].required = true;
        this.rules.listedPlace[0].stockCode = true;
      }
    },
    // 修改是否参展过
    changeParticipation(val) {
      if (val === '02') { // 否的情况
        // 江重生 否 删除 赋空值
        this.rules.firstExhibitionDate[0].required = false;
        delete this.ruleForm['firstExhibitionDate'];
        // console.log(this.ruleForm.firstExhibitionDate);
        // this.isNotParticipate = false;
      } else {
        this.rules.firstExhibitionDate[0].required = true;
        this.ruleForm['firstExhibitionDate'] = '';
        // console.log(this.ruleForm.firstExhibitionDate);
        // this.isNotParticipate = true;
      }
    },
    // logo-上传成功的回调
    logoUploadSuccessfully(response, file, fileList) {
      if (response.data && response.data.fileId) {
        this.ruleForm.companyLogoId = response.data.fileId;
      } else {
        this.logoFileList = [];
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        });
      }
    },
    // image-上传成功的回调
    imageUploadSuccessfully(response, file, fileList) {
      if (response.data && response.data.fileId) {
        this.ruleForm.companyImageId = response.data.fileId;
      } else {
        this.imageFileList = [];
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        });
      }
    },
    // 删除logo图片
    handleLogoRemove(file, fileList) {
      if (this.ruleForm.companyLogoId !== '') {
        this.delBasicFileInfo(this.ruleForm.companyLogoId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.ruleForm.companyLogoId = '';
        }).catch(e => {
          this.ruleForm.companyLogoId = '';
        });
      }
    },
    // 删除形象图片
    handleImageRemove(file, fileList) {
      if (this.ruleForm.companyImageId !== '') {
        this.delBasicFileInfo(this.ruleForm.companyImageId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.ruleForm.companyImageId = '';
        }).catch(e => {
          this.ruleForm.companyImageId = '';
        });
      }
    },
    // 删除文件
    // deleteFile(fileId, targetFileId) {
    //   this.delFileInfo(fileId).then(res => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功'
    //     });
    //     targetFileId = '';
    //   }).catch(e => {
    //     this.$message({
    //       showClose: true,
    //       message: e,
    //       type: 'error'
    //     });
    //   });
    // },
    // 文件预览
    handlePreview(file) {
      this.companyLogoIdInfo.dialogImageUrl = file.url;
      this.companyLogoIdInfo.dialogVisible = true;
    },
    // 企业Logo上传类型设置
    handleLogoBeforeUpload(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png') {
        this.logoIsJPG = false;
      } else {
        this.logoIsJPG = true;
      }

      this.logoIsLt100Kb = file.size / 1024 < 100;
      if (!this.logoIsJPG) {
        this.$message.error('上传的图片只能是 JPG/JPEG/PNG/GIF 格式!');
      }
      if (!this.logoIsLt100Kb) {
        this.$message.error('上传的图片大小不能超过 100kb!');
      }
      return this.logoIsJPG && this.logoIsLt100Kb;
    },
    // 企业形象图上传类型设置
    handleImageBeforeUpload(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png') {
        this.imageIsJPG = false;
      } else {
        this.imageIsJPG = true;
      }
      this.imageIsLt100Kb = file.size / 1024 < 100;
      if (!this.imageIsJPG) {
        this.$message.error('上传的图片只能是 JPG/JPEG/PNG/GIF 格式!');
      }
      if (!this.imageIsLt100Kb) {
        this.$message.error('上传的图片大小不能超过 100kb!');
      }
      return this.imageIsJPG && this.imageIsLt100Kb;
    },
    handleLogoExceed() {
      this.$message.error('只能上传一张图片!');
    },
    handleImageExceed() {
      this.$message.error('只能上传一张图片!');
    },
    logoBeforeRemove(file, fileList) {
      if (this.logoIsJPG && this.logoIsLt100Kb) {
        return this.$confirm('确定移除？');
      }
    },
    imageBeforeRemove(file, fileList) {
      if (this.imageIsJPG && this.imageIsLt100Kb) {
        return this.$confirm('确定移除？');
      }
    },
    // 去往重要信息修改页面
    toImportant() {
      let _this = this;
      let _businessDelegationId = '';
      // 处理所属交易团
      if (_this.allCountriesBusiDele && _this.allCountriesBusiDele.length > 0) {
        _this.allCountriesBusiDele.forEach((value, index, array) => {
          if (value.enterprisesName === _this.ruleForm.businessDelegationId) {
            _businessDelegationId = value.enterprisesId;
          }
        });
        this.$router.push({
          path: "/entImpInfMod",
          query: {
            province: this.ruleForm.province,
            city: this.ruleForm.city,
            businessDelegation: this.allCountriesBusiDele,
            businessDelegationId: _businessDelegationId
          }
        });
      } else {
        this.$message.error('尚未获取到企业注册地信息，请稍候。');
      }

      // this.$refs['basicInfo'].validateField('customsCode', (customsCodeError) => {
      //   if (!customsCodeError) {
      //     this.$refs['basicInfo'].validateField('importExportCode', (importExportCodeError) => {
      //       if (!importExportCodeError) {
      //         this.$router.push({
      //           path: "/entImpInfMod",
      //           query: {
      //             province: this.ruleForm.province,
      //             city: this.ruleForm.city,
      //             businessDelegation: this.bussDeleg,
      //             businessDelegationId: this.ruleForm.businessDelegationId
      //           }
      //         });
      //       } else {
      //         this.$message({
      //           showClose: true,
      //           message: '请填写正确的进出口代码',
      //           type: 'error'
      //         });
      //       }
      //     });
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: '请填写正确的海关编码',
      //       type: 'error'
      //     });
      //   }
      // });
      // this.$refs['customsCode'].clearValidate();
      // this.$refs['importExportCode'].clearValidate();
    },
    // 提交表单
    submitForm() {
      let basicInfoForm = JSON.parse(JSON.stringify(this.ruleForm));
      // 处理企业成立年份
      // if (basicInfoForm.incorporationYear && basicInfoForm.incorporationYear !== '') {
      //   basicInfoForm.incorporationYear = String(new Date(basicInfoForm.incorporationYear).getTime());
      // }
      // 处理所属交易团
      if (this.allCountriesBusiDele && this.allCountriesBusiDele.length > 0) {
        this.allCountriesBusiDele.forEach((value, index) => {
          if (value.enterprisesName === basicInfoForm.businessDelegationId) {
            basicInfoForm.businessDelegationId = value.enterprisesId;
          }
        });
      }
      // 处理是否有海关编码
      if (basicInfoForm.hasCustomsCode === '2') {
        basicInfoForm.customsCode = '无';
      }
      // 处理企业名称分词
      basicInfoForm.companyPpl = '';
      if (basicInfoForm.companyPplList.length > 0) {
        basicInfoForm.companyPplList.forEach((value) => {
          basicInfoForm.companyPpl += value.companyPpl + ',';
        });
      }
      // 处理市
      basicInfoForm.province = basicInfoForm.provinceId;
      // 处理companyLocated
      basicInfoForm.companyLocated = basicInfoForm.province + basicInfoForm.city;
      basicInfoForm.companyPpl = basicInfoForm.companyPpl.slice(0, basicInfoForm.companyPpl.length - 1);
      this.ruleForm.companyPpl = basicInfoForm.companyPpl;
      basicInfoForm.reviewResult = '3';
      this.$refs['basicInfo'].validate((valid) => {
        if (valid) {
          this.reviewCompanyDocs(basicInfoForm).then(res => {
            this.$message({
              type: 'success',
              message: '提交成功，请继续完善信息'
            });
            this.basicInfoTipNoProvince = false;
            this.basicInfoErrorCustomCode = false;
            this.basicInfoErrorImportExportCode = false;
            // 通知父页面信息提交成功
            this.$emit('complete-basic-info', true);
            this.getBasicInfo(this.companyId).then(response => {
              if (response) {
                this.originBusinessLicenceNo = response.businessLicenceNo;
                for (let key in response) {
                  this.dealWithFormData(key, response);
                }
                this.dealWithData(response);
                // 处理所属交易团
                if (this.allCountriesBusiDele && this.allCountriesBusiDele.length > 0) {
                  this.allCountriesBusiDele.forEach((value, index, array) => {
                    if (value.enterprisesId === response.businessDelegationId) {
                      this.ruleForm.businessDelegationId = value.enterprisesName;
                    }
                  });
                }
                if (response.businessLicenceNo && response.businessLicenceNo !== '' && response.businessLicenceNo.length >= 4) {
                  this.getDelegationAndProAndCityInfo(response.businessLicenceNo.substr(2, 2)).then(resp => {
                    this.ruleForm.province = resp && resp.province ? resp.province.provinceCityName : '';
                  });
                }
              }
            });
            this.loading = false;
          }).catch(e => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: e,
              type: 'error'
            });
            // 通知父页面信息提交失败
            this.$emit('complete-basic-info', false);
          });
        } else {
          setTimeout(() => {
            let isError = document.getElementsByClassName("is-error");
            if (isError[0] && isError[0] && isError[0].querySelector('input')) {
              isError[0].querySelector('input').focus();
            }
          }, 1);
          // this.basicInfoTipNoProvince = true;
          this.$message({
            showClose: true,
            message: '企业基本信息验证未通过',
            type: 'error'
          });
          // 清除企业名称分词校验
          this.$refs['companyPpl'].clearValidate();
          // 通知父页面信息提交失败
          this.$emit('complete-basic-info', false);
        }
      });
    }
  },
  watch: {
    "tradeForm": {
      handler(newVal) {
        this.dealWithData(this.getbasic);
      },
      deep: true
    },
    "ruleForm.cantonCode": {
      handler(newVal) {
        if (newVal && newVal !== '') {
          this.disabledBusiDeleId = true;
        } else {
          this.disabledBusiDeleId = false;
        }
      },
      deep: true
    },
    "ruleForm.hasCustomsCode": {
      handler(newVal) {
        if (newVal === '1') {
          this.rules.hasCustomsCode[0].required = true;
        } else {
          this.rules.hasCustomsCode[0].required = false;
        }
      },
      deep: true
    },
    "ruleForm.companyPpl": {
      handler(newVal) {
        if (newVal === '') {
          // 清除企业名称分词多余校验
          this.$refs['companyPpl'].clearValidate();
        }
      }
    },
    "ruleForm.listedStatus": {
      handler(newVal) {
        if (newVal === '02') {
          this.isNotInMarket = false;
          this.rules.listedPlace[0].required = false;
          this.rules.listedPlace[0].stockCode = false;
        } else {
          this.isNotInMarket = true;
          this.rules.listedPlace[0].required = true;
          this.rules.listedPlace[0].stockCode = true;
        }
      },
      deep: true
    },
    "ruleForm.listedPlace": {
      handler(newVal) {
        // let label = $helper.getDictLabel(this.listPlace, newVal);
        if (newVal === '9') {
          this.showListedPlaceOther = true;
        } else {
          this.showListedPlaceOther = false;
        }
      },
      deep: true
    },
    "ruleForm.companyLogoId": {
      handler(newVal) {
        this.logoFileList = newVal ? [{ url: process.env.API_OS_URL + "/efOS/file/getCompanyImg?fileId=" + newVal }] : [];
      },
      deep: true
    },
    "ruleForm.companyImageId": {
      handler(newVal) {
        this.imageFileList = newVal ? [{ url: process.env.API_OS_URL + "/efOS/file/getCompanyImg?fileId=" + newVal }] : [];
      },
      deep: true
    }
  }
};

</script>



