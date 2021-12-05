<template>
  <!-- <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="品牌展位申请表" name="first">
      <el-form class="brandForm" ref="brandForm" :model="brandForm" :rules="brandFormRules" label-width="280px">
        <el-form-item label="展区:" prop="exhibitionAreaCode">
          <el-select class="select-width" v-model="brandForm.exhibitionAreaCode" @change="exhibitionAreaChange">
            <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出口额比例(%)" v-if="isExportPercent" prop="exportRatio">
          <el-input v-model="brandForm.exportRatio" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="展品类别:" prop="exhibitsCategory">
          <span class="dangerInfo">请根据主要展品类别（占60%以上）选择以下选项，作为展位位置安排和洽谈配对的参考，请务必准确填写。</span>
          <el-radio-group v-model="brandForm.exhibitsCategory">
            <el-radio v-for="(item, key) in exhibitsCategoryOpts" :key="key" :label="item"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主要出口展品:" prop="exhibitId">
          <div class="dangerInfo">(至少选一项)</div>
          <el-select class="small-select-width" v-model="brandForm.exhibitIdOne" @change="handleChangeOne" clearable>
            <el-option v-for="(item, key) in exhibitIdOneOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
          <el-select class="small-select-width" v-model="brandForm.exhibitIdTwo" @change="handleChangeTwo" clearable>
            <el-option v-for="(item, key) in exhibitIdTwoOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用于本展区评审的企业海关注册登记编码:" prop="customCode">
          <el-checkbox-group v-model="brandForm.customCode">
            <el-checkbox v-for="(item, key) in customCodeList" :key="key" :label="item.customCode" @change="getCheckObjDataList({
              aptitudeSource: item.aptitudeSource,
              correlationCompanyName: item.correlationCompanyName,
              customCode: item.customCode,
              customId: item.customId,
              customsCodeCertificate: item.customsCodeCertificate
            }, checkData.customList, 'customId')" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
          </el-checkbox-group>
          <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
        </el-form-item>
        <el-form-item label="申请展位数量（个）:" prop="applyBoothNumber">
          <el-input size="medium" class="input-width" v-model="brandForm.applyBoothNumber"></el-input>
        </el-form-item>
        <el-form-item label="境外注册商标:" prop="territoryCode">
          <el-checkbox-group v-model="brandForm.territoryCode">
            <el-checkbox v-for="(item, key) in territoryCodeList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
              aptitudeId: item.aptitudeId,
              aptitudeName: item.aptitudeName,
              aptitudeType: item.aptitudeType
            }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="territoryCode"></el-checkbox>
          </el-checkbox-group>
          <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
        </el-form-item>
        <el-form-item label="境内注册商标:">
          <el-checkbox-group v-model="brandForm.beyondCode">
            <el-checkbox v-for="(item, key) in beyondCodeList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
              aptitudeId: item.aptitudeId,
              aptitudeName: item.aptitudeName,
              aptitudeType: item.aptitudeType
            }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="beyondCode"></el-checkbox>
          </el-checkbox-group>
          <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
        </el-form-item>
        <el-form-item label="品牌建设:">
          <el-checkbox-group v-model="brandForm.buildType">
            <el-checkbox v-for="(item, key) in buildTypeList" :key="key" :label="item.buildContent" @change="getCheckObjDataList({
              buildContent: item.buildContent,
              buildNumber: item.buildNumber,
              buildType: item.buildType
            }, applyAptitudesList, 'buildNumber')" :checked="item.isChecked === 0 ? false : true" name="buildType"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="研发创新和自主知识产权:">
          <div class="subBrandForm">
            <div class="subBrandForm-title">专利（境内外）与版权:</div>
            <div class="subBrandForm-content">
              <div class="subBrandCheckbox">
                一、发明专利
                <el-checkbox-group v-model="brandForm.patentInvention" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in patentInventionList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="patentInvention"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
              </div>
              <div class="subBrandCheckbox">
                二、实用新型专利
                <el-checkbox-group v-model="brandForm.utilityInvention" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in utilityInventionList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="utilityInvention"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
              </div>
              <div class="subBrandCheckbox">
                三、外观专利
                <el-checkbox-group v-model="brandForm.designPatent" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in designPatentList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="designPatent"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
              </div>
              <div class="subBrandCheckbox">
                四、版权专利
                <el-checkbox-group v-model="brandForm.copyrightPatent" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in copyrightPatentList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="copyrightPatent"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
              </div>
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">国家级高新技术公司:</div>
            <div class="subBrandForm-content">
              <el-checkbox-group v-model="brandForm.highTechCompany">
                <el-checkbox v-for="(item, key) in highTechCompanyList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="highTechCompany"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">国家标准或行业标准:</div>
            <div class="subBrandForm-content">
              <el-checkbox-group v-model="brandForm.nationalStardard">
                <el-checkbox v-for="(item, key) in nationalStardardList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="nationalStardard"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="国际通行认证:">
          <div class="subBrandForm">
            <div class="subBrandForm-title">质量管理体系、环境管理体系认证:</div>
            <div class="subBrandForm-content">
              <el-checkbox-group v-model="brandForm.fscfm">
                <el-checkbox v-for="(item, key) in fscfmList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="fscfm"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">面向企业的行业认证:</div>
            <div class="subBrandForm-content">
              <el-checkbox-group v-model="brandForm.enterpriseCert">
                <el-checkbox v-for="(item, key) in enterpriseCertList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="enterpriseCert"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">面向产品或生产线的行业认证:</div>
            <div class="subBrandForm-content">
              <el-checkbox-group v-model="brandForm.productCert">
                <el-checkbox v-for="(item, key) in productCertList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="productCert"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="“i-邀请”活动评比获得加分展区:" prop="isAwardedMarks">
          <el-select class="small-select-width" v-model="brandForm.isAwardedMarks">
            <el-option v-for="item in isAwardedMarksOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否愿意在会上接洽国内采购商:" prop="isContacted">
          <el-radio-group v-model="brandForm.isContacted" @change="handleRadioChange">
            <el-radio v-for="(item, key) in isContactedOpts" :key="key" :label="item"></el-radio>
          </el-radio-group>
          <div class="subBrandCheckbox" v-if="brandForm.isContacted === '否' ? false : true">
            展会期间开展的内贸业务:
            <el-radio-group v-model="brandForm.isCarryOut" class="sub-check-left">
              <el-radio v-for="(item, key) in isCarryOutOpts" :key="key" :label="item"></el-radio>
            </el-radio-group>
          </div>
          <div class="subBrandCheckbox" v-if="brandForm.isContacted === '否' ? false : true">
            我司参展展品为:
            <el-checkbox-group v-model="brandForm.joinProduct" class="sub-check-left" prop="joinProduct">
              <el-checkbox v-for="(item, key) in joinProductTypeList" :key="key" :label="item" name="joinProduct"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" size="medium" @click="handleSaveNext('brandForm')">保存</el-button>
        <el-button type="info" size="medium" @click="goBack">返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs> -->
  <!-- 静态页面 -->
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="品牌展位申请表" name="first">
      <el-form class="brandForm" ref="brandForm" :model="brandForm" :rules="brandFormRules" label-width="280px">
        <el-form-item label="展区:" prop="exhibitionAreaCode">
          <el-select class="select-width" v-model="brandForm.exhibitionAreaCode" @change="exhibitionAreaChange">
            <el-option v-for="(item, key) in exhibitionAreaOpt" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出口额比例(%)" v-if="isExportPercent" prop="exportRatio">
          <el-input v-model="brandForm.exportRatio" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="展品类别:" prop="exhibitsCategory">
          <div>
            <el-radio-group v-model="brandForm.exhibitsCategory"  class="exhibitId">
                <el-radio v-for="(item, key) in exhibitsCategoryOpt" :key="key" :label="item.label"></el-radio>
            </el-radio-group>
            <div class="exhibitId-tip">
                <span class="dangerInfo">
                  请根据主要展品类别（占60%以上）选择以下选项，作为展位位置安排和洽谈配对的参考，请务必准确填写。
                </span>
            </div>
          </div>
        </el-form-item>
        <!-- 主要出口展品 -->
        <el-form-item label="主要出口展品:" prop="exhibitId" >
          <div class="exhibitIdImport">
            <el-select class="small-select-width" v-model="brandForm.exhibitIdOne" @change="handleChangeOne" clearable>
              <el-option v-for="(item, key) in exhibitIdOneOpt" :key="key" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <el-select class="small-select-width" v-model="brandForm.exhibitIdTwo" @change="handleChangeTwo" clearable>
              <el-option v-for="(item, key) in exhibitIdOneOpt" :key="key" :value="item.value" :label="item.label"></el-option>
            </el-select>
            <div class="exhibitIdImport-tip">(至少选一项)</div>
          </div>
        </el-form-item>
        <!-- 主要出口展品end -->
        <el-form-item label="用于本展区评审的企业海关注册登记编码:" prop="customCode">
          <div class="customCode">
            <el-checkbox-group v-model="brandForm.customCode" >
              <el-checkbox v-for="(item, key) in customCodeLists" :key="key" :label="item.customCode"
              class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
              <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="申请展位数量（个）:" prop="applyBoothNumber">
          <el-input size="medium" class="input-width" v-model="brandForm.applyBoothNumber"></el-input>
        </el-form-item>
        <el-form-item label="境外注册商标:" prop="territoryCode">
          <div class="customCode">
            <el-checkbox-group v-model="brandForm.territoryCode" >
              <el-checkbox v-for="(item, key) in territoryCodeLists" :key="key" :label="item.aptitudeName"
              class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
              <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <!-- <el-checkbox-group v-model="brandForm.territoryCode">
            <el-checkbox v-for="(item, key) in territoryCodeLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
              aptitudeId: item.aptitudeId,
              aptitudeName: item.aptitudeName,
              aptitudeType: item.aptitudeType
            }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="territoryCode"></el-checkbox>
          </el-checkbox-group>
          <a  href="javascript:;" @click="handleAdd()">增加</a> -->
        </el-form-item>
        <el-form-item label="境内注册商标:">
          <div class="customCode">
            <el-checkbox-group v-model="brandForm.beyondCode" >
              <el-checkbox v-for="(item, key) in territoryCodeLists" :key="key" :label="item.aptitudeName"
              class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
              <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <!-- <el-checkbox-group v-model="brandForm.beyondCode">
            <el-checkbox v-for="(item, key) in beyondCodeList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
              aptitudeId: item.aptitudeId,
              aptitudeName: item.aptitudeName,
              aptitudeType: item.aptitudeType
            }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="beyondCode"></el-checkbox>
          </el-checkbox-group>
          <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
        </el-form-item>
        <el-form-item label="品牌建设:">
          <el-checkbox-group v-model="brandForm.buildType">
            <el-checkbox v-for="(item, key) in buildTypeLists" :key="key" :label="item.buildContent"
            class="checkBoxCom"
            @change="getCheckObjDataList({
              buildContent: item.buildContent,
              buildNumber: item.buildNumber,
              buildType: item.buildType
            }, applyAptitudesList, 'buildNumber')" :checked="item.isChecked === 0 ? false : true" name="buildType"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="研发创新和自主知识产权:">
          <div class="subBrandForm">
            <div class="subBrandForm-title">专利（境内外）与版权:</div>
            <div class="subBrandForm-content">
              <div class="subBrandCheckbox">
                <div class="customCode">
                  <span class="subTitle">一、发明专利</span>
                    <el-checkbox-group v-model="brandForm.beyondCode" style="display:inline-block">
                      <el-checkbox v-for="(item, key) in patentInventionLists" :key="key" :label="item.aptitudeName"
                      class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                      <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <!-- <el-checkbox-group v-model="brandForm.patentInvention" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in patentInventionLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="patentInvention"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
              </div>
              <div class="subBrandCheckbox">
                <div class="customCode" >
                  <span class="subTitle">二、实用新型专利</span>
                    <el-checkbox-group v-model="brandForm.utilityInvention" style="display:inline-block">
                      <el-checkbox v-for="(item, key) in utilityInventionLists" :key="key" :label="item.aptitudeName"
                      class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                      <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <!-- 二、实用新型专利
                <el-checkbox-group v-model="brandForm.utilityInvention" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in utilityInventionLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="utilityInvention"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
              </div>
              <div class="subBrandCheckbox">
                <div class="customCode" >
                  <span class="subTitle">三、外观专利</span>
                    <el-checkbox-group v-model="brandForm.designPatent" style="display:inline-block">
                      <el-checkbox v-for="(item, key) in designPatentLists" :key="key" :label="item.aptitudeName"
                      class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                      <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <!-- 三、外观专利
                <el-checkbox-group v-model="brandForm.designPatent" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in designPatentLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="designPatent"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
              </div>
              <div class="subBrandCheckbox">
             <div class="customCode">
                  <span class="subTitle">四、版权专利</span>
                    <el-checkbox-group v-model="brandForm.copyrightPatent"  style="display:inline-block">
                      <el-checkbox v-for="(item, key) in copyrightPatentLists" :key="key" :label="item.aptitudeName"
                      class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                      <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                    </el-checkbox-group>
                </div>
                <!-- 四、版权专利
                <el-checkbox-group v-model="brandForm.copyrightPatent" class="sub-check-left">
                  <el-checkbox v-for="(item, key) in copyrightPatentLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="copyrightPatent"></el-checkbox>
                </el-checkbox-group>
                <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
              </div>
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">国家级高新技术公司:</div>
            <div class="subBrandForm-content">
              <div class="customCode">
                  <el-checkbox-group v-model="brandForm.highTechCompany"  style="display:inline-block">
                    <el-checkbox v-for="(item, key) in highTechCompanyLists" :key="key" :label="item.aptitudeName"
                    class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                    <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                  </el-checkbox-group>
              </div>
              <!-- <el-checkbox-group v-model="brandForm.highTechCompany">
                <el-checkbox v-for="(item, key) in highTechCompanyLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="highTechCompany"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">国家标准或行业标准:</div>
            <div class="subBrandForm-content">
            <div class="customCode">
                  <el-checkbox-group v-model="brandForm.nationalStardard"  style="display:inline-block">
                    <el-checkbox v-for="(item, key) in nationalStardardLists" :key="key" :label="item.aptitudeName"
                    class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                    <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                  </el-checkbox-group>
              </div>
              <!-- <el-checkbox-group v-model="brandForm.nationalStardard">
                <el-checkbox v-for="(item, key) in nationalStardardLists" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="nationalStardard"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
            </div>
          </div>
        </el-form-item>
        <el-form-item label="国际通行认证:">
          <div class="subBrandForm">
            <div class="subBrandForm-title">质量管理体系、环境管理体系认证:</div>
            <div class="subBrandForm-content">

              <div class="customCode">
                  <el-checkbox-group v-model="brandForm.fscfm"  style="display:inline-block">
                    <el-checkbox v-for="(item, key) in fscfmLists" :key="key" :label="item.aptitudeName"
                    class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                    <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                  </el-checkbox-group>
              </div>
              <!-- <el-checkbox-group v-model="brandForm.fscfm">
                <el-checkbox v-for="(item, key) in fscfmList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="fscfm"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">面向企业的行业认证:</div>
            <div class="subBrandForm-content">
              <div class="customCode">
                  <el-checkbox-group v-model="brandForm.enterpriseCert"  style="display:inline-block">
                    <el-checkbox v-for="(item, key) in enterpriseCertLists" :key="key" :label="item.aptitudeName"
                    class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                    <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                  </el-checkbox-group>
              </div>
              <!-- <el-checkbox-group v-model="brandForm.enterpriseCert">
                <el-checkbox v-for="(item, key) in enterpriseCertList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="enterpriseCert"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
            </div>
          </div>
          <div class="subBrandForm">
            <div class="subBrandForm-title">面向产品或生产线的行业认证:</div>
            <div class="subBrandForm-content">
              <div class="customCode">
                  <el-checkbox-group v-model="brandForm.productCert"  style="display:inline-block">
                    <el-checkbox v-for="(item, key) in productCertLists" :key="key" :label="item.aptitudeName"
                    class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                    <el-checkbox-button class="customAdd" size="mini">增加</el-checkbox-button>
                  </el-checkbox-group>
              </div>
              <!-- <el-checkbox-group v-model="brandForm.productCert">
                <el-checkbox v-for="(item, key) in productCertList" :key="key" :label="item.aptitudeName" @change="getCheckObjDataList({
                    aptitudeId: item.aptitudeId,
                    aptitudeName: item.aptitudeName,
                    aptitudeType: item.aptitudeType
                  }, applyAptitudesList, 'aptitudeId')" :checked="item.isChecked === 0 ? false : true" name="productCert"></el-checkbox>
              </el-checkbox-group>
              <a class="dangerInfo" href="javascript:;" @click="handleAdd()">增加</a> -->
            </div>
          </div>
        </el-form-item>
        <el-form-item label="“i-邀请”活动评比获得加分展区:" prop="isAwardedMarks">
          <el-select class="small-select-width" v-model="brandForm.isAwardedMarks">
            <el-option v-for="item in isAwardedMarksOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否愿意在会上接洽国内采购商:" prop="isContacted">
          <el-radio-group v-model="brandForm.isContacted" @change="handleRadioChange">
            <el-radio v-for="(item, key) in isContactedOpts" :key="key" :label="item"></el-radio>
          </el-radio-group>
          <div class="subBrandCheckbox" v-if="brandForm.isContacted === '否' ? false : true">
            展会期间开展的内贸业务:
            <el-radio-group v-model="brandForm.isCarryOut" class="sub-check-left">
              <el-radio v-for="(item, key) in isCarryOutOpts" :key="key" :label="item"></el-radio>
            </el-radio-group>
          </div>
          <div class="subBrandCheckbox" v-if="brandForm.isContacted === '否' ? false : true">
              <div>
                  <span class="subTitle">我司参展展品为:</span>
                    <el-checkbox-group v-model="brandForm.joinProduct"  style="display:inline-block">
                      <el-checkbox v-for="(item, key) in joinProductTypeList" :key="key" :label="item"
                      class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                    </el-checkbox-group>
                </div>
              <!-- <div class="customCode">
                  <el-checkbox-group v-model="brandForm.joinProduct"  style="display:inline-block">
                    <el-checkbox v-for="(item, key) in joinProductTypeList" :key="key" :label="item"
                    class="checkBoxCom" :checked="item.isChecked === 0 ? false : true" name="customCode"></el-checkbox>
                  </el-checkbox-group>
              </div> -->
            <!-- <el-checkbox-group v-model="brandForm.joinProduct" class="sub-check-left" prop="joinProduct">
              <el-checkbox v-for="(item, key) in joinProductTypeList" :key="key" :label="item" name="joinProduct"></el-checkbox>
            </el-checkbox-group> -->
          </div>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" size="medium" @click="handleSaveNext('brandForm')">保存</el-button>
        <el-button type="info" size="medium" @click="goBack">返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    // 包含0的正整数
    var needInt = (rule, value, callback) => {
      const reg = /^(0|\+?[1-9][0-9]*)$/;
      if (value === '') {
        return callback(new Error('此项为必填项'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    // 包含0且保留两位小数的正数
    var needPoint = (rule, value, callback) => {
      const reg = /^((0|\+?[1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (value === '') {
        return callback(new Error('此项为必填项'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入只保留两位小数的数'));
      } else if ((value - 0) > 100) {
        return callback(new Error('请输入>=0且<=100的数'));
      } else {
        return callback();
      }
    };
    return {
      // 静态页面数据
      exhibitsCategoryOpt: [
        {
          label: "视听及娱乐产品",
          isChecked: 0,
          value: "1"
        },
        {
          isChecked: 0,
          label: "通讯产品",
          value: "2"
        }
      ], // 展品类别
      exhibitIdOneOpt: [
        {
          label: "视听及娱乐产品",
          isChecked: 0,
          value: "1"
        },
        {
          label: "通讯产品",
          isChecked: 0,
          value: "2"
        }
      ], // 展品类别
      //
      customCodeLists: [
        {
          isChecked: 0,
          customCode: "34234234123415"
        },
        {
          isChecked: 0,
          customCode: "34234234879612"
        },
        {
          isChecked: 0,
          customCode: "67546345645643"
        },
        {
          isChecked: 0,
          customCode: "34234234188712"
        },
        {
          isChecked: 0,
          customCode: "34234634123416"
        },
        {
          isChecked: 0,
          customCode: "34234234123492"
        },
        {
          isChecked: 0,
          customCode: "34234234123452"
        }
      ],
      // 境外商标
      territoryCodeLists: [
        {
          isChecked: 0,
          aptitudeName: "优质解析品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "年轻人最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "十大放心品牌",
          value: "3"
        }
      ],
      buildTypeLists: [
        {
          isChecked: 0,
          buildContent: "进入商务部认定的外贸转型升级基地且主营业务与该基地特色产业相一致",
          value: "1"
        },
        {
          isChecked: 0,
          buildContent: "已建设国际营销服务体系",
          value: "2"
        },
        {
          isChecked: 0,
          buildContent: "参加商务部主办或参加的境外品牌展",
          value: "3"
        }
      ], // 品牌建设多选数据
      patentInventionLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 发明专利
      utilityInventionLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 发明专利
      designPatentLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 发明专利
      copyrightPatentLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 发明专利
      highTechCompanyLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 国家级高新技术公司
      nationalStardardLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 国家标准或行业标准
      fscfmLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 国家标准或行业标准
      enterpriseCertLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 国家标准或行业标准
      productCertLists: [
        {
          isChecked: 0,
          aptitudeName: "优质品牌",
          value: "1"
        },
        {
          isChecked: 0,
          aptitudeName: "最爱品牌",
          value: "2"
        },
        {
          isChecked: 0,
          aptitudeName: "放心品牌",
          value: "3"
        }
      ], // 国家标准或行业标准
      exhibitionAreaOpt: [
        {
          label: "卫浴设备",
          value: "2"
        },
        {
          label: "化工产品",
          value: "2"
        },
        {
          label: "食品",
          value: "2"
        },
        {
          label: "家用电器",
          value: "2"
        },
        {
          label: "照明产品",
          value: "2"
        },
        {
          label: "新能源",
          value: "2"
        }
      ], // 展区选择数据
      // //////////
      resData: '', // 初始化的数据
      activeName: 'first',
      isExportPercent: false, // 出口额比例
      exhibitsCategoryOpts: [], // 展品类别
      exhibitionAreaOpts: [], // 展区选择数据
      exhibitIdOneOpts: [], // 主要展品1
      exhibitIdTwoOpts: [], // 主要展品2
      customCodeList: [], // 海关编码多选数据
      beyondCodeList: [], // 境内商标多选数据
      territoryCodeList: [], // 境外商标多选数据
      buildTypeList: [], // 品牌建设多选数据
      patentInventionList: [], // 发明专利
      utilityInventionList: [], // 实用新型专利
      designPatentList: [], // 外观专利
      copyrightPatentList: [], // 版权专利
      nationalStardardList: [], // 国家标准或行业标准
      fscfmList: [], // 管理认证
      enterpriseCertList: [], // 企业认证
      productCertList: [], // 产品认证
      isContactedOpts: ['是', '否'], // 是否愿意在会上接洽国内采购商
      isCarryOutOpts: ['由外贸人员兼顾', '由内贸业务人员专项负责'], // 展会期间开展的内贸业务
      joinProductTypeList: ['全面面向境外市场', '外销设计，但也可兼顾境内销售', '有部分主要针对境内市场'], //  我司参展展品
      highTechCompanyList: [], // 国家级高新技术公司
      isAwardedMarksOpts: [{ value: '1', label: '是' }, { value: '0', label: '否' }],
      applyAptitudesList: [], // 各个资质
      brandForm: {
        customCode: [], // 海关编码
        exhibitionAreaCode: '', // 展区id
        exhibitionAreaName: '', // 展区名称
        exhibitionSession: '', // 展届
        coceralId: '', // 商协会id
        coceralName: '', // 商协会名称
        exportRatio: '', // 出口额比例
        applyBoothNumber: '', // 申请展位数量
        buildType: [], // 品牌建设类型
        beyondCode: [], // 境内商标
        territoryCode: [], // 境外商标
        highTechCompany: [], // 国家级高新技术公司
        exhibitsCategory: '', // 展品分类
        exhibitId: '', // 主要出口展品
        exhibitIdOne: '', // 主要出口展品1
        exhibitNameOne: '',
        exhibitIdTwo: '', // 主要出口展品2
        exhibitNameTwo: '',
        invention: [], // 研发创新和自主知识产权
        patentInvention: [], //发明专利
        utilityInvention: [], // 实用新型专利
        designPatent: [], // 外观专利
        copyrightPatent: [], // 版权专利
        nationalStardard: [], // 国家标准或行业标准
        cert: '', // 国际通行认证
        fscfm: [], // 管理认证
        enterpriseCert: [], // 企业认证
        productCert: [], // 产品认证
        isAwardedMarks: '0', // i-邀请活动是否加分给本展区
        isContacted: '否', // 是否愿意接洽国内采购商
        isCarryOut: '由外贸人员兼顾', // 展位期间开展的内贸业务
        joinProduct: [], // 我司参展展品
        readExplain: 1 // 隐私条款确认
      },
      // 多选框选择的数据
      checkData: {
        customList: [],
        territoryList: [],
        beyondList: [],
        buildList: [],
        inventionList: [],
        certList: []
      },
      brandFormRules: { // 校验规则
        exhibitionAreaCode: [{ required: true, message: '请选择展区', trigger: 'change' }],
        exportRatio: [{ required: true, validator: needPoint, message: '请输入>=0且<=100的数', trigger: 'blur' }],
        exhibitsCategory: [{ required: true, message: '请至少选择一项展品类别', trigger: 'change' }],
        exhibitId: [{ required: true, message: '请至少选择一项主要出口展品', trigger: 'change' }],
        applyBoothNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        customCode: [{ required: true, message: '请至少选择一项海关编码', trigger: 'change' }],
        territoryCode: [{ required: true, message: '请至少选择一项境外注册商标', trigger: 'change' }],
        isAwardedMarks: [{ required: true, message: '请选择是或否', trigger: 'change' }],
        isContacted: [{ required: true }]
      }
    };
  },
  computed: {
    ...mapGetters('companyInfomation', ['brandApplyQuery']),
    submitFormData() {
      return {
        brandApplyId: this.$route.params.id, // 申请id
        applyCustomCodes: this.checkData.customList, // 海关编码
        exhibitionArea: this.brandForm.exhibitionAreaCode, // 展区id
        exhibitionAreaName: this.brandForm.exhibitionAreaName, // 展区名称
        applyAptitudes: this.applyAptitudesList, // 各个资质
        applyBuilds: this.checkData.buildList, // 品牌建设
        companyId: this.resData.data.companyId, // 企业id
        companyCode: this.resData.data.companyCode, // 企业代码
        companyName: this.resData.data.companyName, // 企业名称
        companyType: this.resData.data.companyType, // 企业类型
        companyAttribute: this.resData.data.companyAttribute, // 企业属性
        city: this.resData.data.city, // 城市
        region: this.resData.data.region, // 地区
        exhibitionSession: this.brandForm.exhibitionSession, // 展届
        cantonFairCode: this.resData.data.cantonFairCode, // 广交会编码
        boothType: this.resData.data.boothType, // 展位类型
        exhibitsCategory: this.brandForm.exhibitsCategory, // 展品类别
        applyBoothNumber: this.brandForm.applyBoothNumber, // 申请展位数量
        exhibitIdOne: this.brandForm.exhibitIdOne, // 主要展品id1
        exhibitNameOne: this.brandForm.exhibitNameOne, // 主要展品名称1
        exhibitIdTwo: this.brandForm.exhibitIdTwo,
        exhibitNameTwo: this.brandForm.exhibitNameTwo,
        isAwardedMarks: this.brandForm.isAwardedMarks, // i-邀请活动是否加分给本展区
        isContacted: this.brandForm.isContacted === '否' ? 0 : 1, // 是否愿意接洽国内采购商
        isCarryOut: this.brandForm.isCarryOut === '由外贸人员兼顾' ? 0 : 1, // 展位期间开展的内贸业务
        exportRatio: this.brandForm.exportRatio, // 出口额比例
        dealClusterId: this.resData.data.dealClusterId, // 交易团 id
        dealClusterName: this.resData.data.dealClusterName, // 交易团名称
        coceralId: this.brandForm.coceralId, // 商协会id
        coceralName: this.brandForm.coceralName, // 商协会名称
        exhibitArea: this.resData.data.exhibitArea, // 布展面积
        exhibitType: this.resData.data.exhibitType, // 布展类型
        readExplain: this.brandForm.readExplain, // 隐私条款
        joinProductType: '' // 我司参展
      };
    }
  },
  created() {
    let fullScreenloading = this.$loading({ fullscreen: true });
    this.getBrandApplyFormQuery({ brandApplyId: this.$route.params.id }).then(res => {
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        fullScreenloading.close();
      });
      this.resData = JSON.parse(JSON.stringify(res));
      // 默认数据
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.buildTypeList = res.queryApplyBuildInfo;
      this.beyondCodeList = res.aptitudeInfoGroup['11'];
      this.customCodeList = res.queryCustomCodes;
      this.territoryCodeList = res.aptitudeInfoGroup['10'];
      this.patentInventionList = res.aptitudeInfoGroup['1'];
      this.utilityInventionList = res.aptitudeInfoGroup['2'];
      this.designPatentList = res.aptitudeInfoGroup['3'];
      this.copyrightPatentList = res.aptitudeInfoGroup['4'];
      this.highTechCompanyList = res.aptitudeInfoGroup['5'];
      this.nationalStardardList = res.aptitudeInfoGroup['6'];
      this.fscfmList = res.aptitudeInfoGroup['7'];
      this.enterpriseCertList = res.aptitudeInfoGroup['8'];
      this.productCertList = res.aptitudeInfoGroup['9'];
      // 已保存数据
      this.brandForm.exhibitionAreaCode = this.resData.data.exhibitionArea;
      this.exhibitionAreaChange(this.resData.data.exhibitionArea);
      this.brandForm.exportRatio = this.resData.data.exportRatio;
      this.brandForm.exhibitsCategory = this.resData.data.exhibitsCategory;
      this.brandForm.exhibitId = this.resData.data.exhibitIdOne ? this.resData.data.exhibitIdOne : this.resData.data.exhibitIdTwo;
      this.brandForm.exhibitIdOne = this.resData.data.exhibitIdOne;
      this.brandForm.exhibitIdTwo = this.resData.data.exhibitIdTwo;
      this.handleChangeOne(this.resData.data.exhibitIdOne);
      this.handleChangeTwo(this.brandForm.exhibitIdTwo);
      this.checkData.customList = this.resData.data.applyCustomCodes;
      this.brandForm.applyBoothNumber = this.resData.data.applyBoothNumber;
      this.applyAptitudesList = this.resData.data.applyAptitudes;
      this.checkData.buildList = this.resData.data.applyBuilds;
      this.brandForm.isAwardedMarks = this.resData.data.isAwardedMarks + '';
      this.brandForm.isContacted = this.resData.data.isContacted === 1 ? '是' : '否';
      this.brandForm.isCarryOut = this.resData.data.isCarryOut === 0 ? '由外贸人员兼顾' : '由内贸业务人员专项负责';
      this.brandForm.joinProduct = JSON.parse(JSON.stringify(this.resData.data.joinProductType)).split('$');
    }).catch(e => {
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        fullScreenloading.close();
      });
    });
  },
  methods: {
    ...mapActions('companyInfomation', ['getBrandApplyFormQuery', 'postBrandApplyEdit']),
    // 多选框获取对象
    getCheckObjDataList(obj, arr, key) {
      let result = arr.some(item => {
        if (item[key] === obj[key]) {
          return true;
        }
      });
      // 为true则添加，为false则删除
      if (!result) {
        arr.push(obj);
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][key] === obj[key]) {
            arr.splice(i, 1);
            break;
          }
        }
      }
    },
    // 多选框获取数组
    getCheckDataList(id, arr) {
      let index = arr.indexOf(id);
      if (index === -1) {
        arr.push(id);
      } else {
        arr.splice(index, 1);
      }
    },
    // 增加
    handleAdd(name) {

    },
    // 主要出口展品选择事件
    handleChangeOne(val) {
      this.brandForm.exhibitId = val;
      if (val) {
        for (let i = 0; i < this.exhibitIdOneOpts.length; i++) {
          if (this.exhibitIdOneOpts[i].value === val) {
            this.brandForm.exhibitNameOne = this.exhibitIdOneOpts[i].label;
            break;
          }
        }
      } else {
        this.brandForm.exhibitNameOne = '';
      }
    },
    handleChangeTwo(val) {
      this.brandForm.exhibitId = val;
      if (val) {
        for (let i = 0; i < this.exhibitIdTwoOpts.length; i++) {
          if (this.exhibitIdTwoOpts[i].value === val) {
            this.brandForm.exhibitNameTwo = this.exhibitIdTwoOpts[i].label;
            break;
          }
        }
      } else {
        this.brandForm.exhibitNameTwo = '';
      }
    },
    // 展区更换
    exhibitionAreaChange(val) {
      this.brandForm.exportRatio = '';
      this.brandForm.exhibitsCategory = '';
      this.brandForm.exhibitIdOne = '';
      this.brandForm.exhibitIdTwo = '';
      if (val === 'MA02' || val === 'MA05' || val === 'MA06' || val === 'MA07' || val === 'MA08' || val === 'CG03' || val === 'CG04' || val === 'CG05' || val === 'GI03' || val === 'GI04' || val === 'HD04' || val === 'TG01' || val === 'TG02' || val === 'TG03' || val === 'TG04' || val === 'TG06') {
        this.isExportPercent = true;
        this.exhibitsCategoryOpts = ['夏季运动款', '品牌休闲服饰'];
        this.exhibitIdOneOpts = [{ value: '0', label: '主要展品31' }, { value: '1', label: '主要展品32' }];
        this.exhibitIdTwoOpts = [{ value: '0', label: '主要展品41' }, { value: '1', label: '主要展品42' }, { value: '2', label: '主要展品43' }];
      } else if (val === '1002') {
        this.isExportPercent = false;
        this.exhibitsCategoryOpts = ['视听及娱乐产品', '通讯产品'];
        this.exhibitIdOneOpts = [{ value: '0', label: '主要展品11' }, { value: '1', label: '主要展品12' }];
        this.exhibitIdTwoOpts = [{ value: '0', label: '主要展品21' }, { value: '1', label: '主要展品22' }, { value: '2', label: '主要展品23' }];
      } else {
        this.isExportPercent = false;
        this.exhibitsCategoryOpts = [];
        this.exhibitIdOneOpts = [];
        this.exhibitIdTwoOpts = [];
      }
      // 根据展区id获取对应的展区名称
      if (val) {
        for (let i = 0; i < this.resData.exhibitionAreaList.length; i++) {
          if (this.resData.exhibitionAreaList[i].exhibitionAreaCode === val) {
            this.brandForm.exhibitionAreaName = this.resData.exhibitionAreaList[i].exhibitionAreaName;
            this.brandForm.exhibitionSession = this.resData.exhibitionAreaList[i].exhibitionSession;
            this.brandForm.coceralId = this.resData.exhibitionAreaList[i].coceralId;
            this.brandForm.coceralName = this.resData.exhibitionAreaList[i].coceralName;
            break;
          }
        }
      } else {
        this.brandForm.exhibitionAreaName = '';
        this.brandForm.exhibitionSession = '';
        this.brandForm.coceralId = '';
        this.brandForm.coceralName = '';
      }
    },
    handleRadioChange(val) {
      if (val === '否') {
        this.brandForm.isCarryOut = '';
        this.brandForm.joinProduct = [];
      }
    },
    //点击返回
    goBack() {
      this.$router.go(-1);
    },
    // 点击保存
    handleSaveNext(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          // 合并我司参展
          if (this.brandForm.joinProduct.length > 0) {
            let joinList = JSON.parse(JSON.stringify(this.brandForm.joinProduct));
            this.submitFormData.joinProductType = joinList.join('$');
          }
          this.postBrandApplyEdit(this.submitFormData).then(() => {
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              fullScreenloading.close();
            });
            this.$router.push({ name: '品牌展位申请列表' });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
      });
    }
  }
};
</script>
<style scoped>
/* .brandForm{
  width: 55%;
  margin: 0 auto;
}
.dangerInfo{
  color: red;
}
.subBrandForm{
  display: flex;
}
.subBrandCheckbox{
  color: #606266;
}
.select-width{
  width: 260px;
}
.input-width, .small-select-width{
  width: 200px;
}
.subBrandForm-content{
  margin-left: 10px;
}
.footer{
  text-align:center;
  margin-top:40px;
} */
/* 静态页面 */
.brandForm{
  /* width: 60%;
  margin: 0 auto; */
}
.exhibitId{
  width: 400px;
}
.exhibitId-tip{
    position: absolute;
    top: -8px;
    left: 277px;
    width: 400px;
    line-height: 24px;
}
.exhibitIdImport{
  width: 720px;
}
.exhibitIdImport-tip{
    position: absolute;
    top: 0px;
    right: -361px;
    width: 120px;
}
.customCode{
  width: 500px;
}
.checkBoxCom{
  margin-left: 16px!important;
}
.customAdd{
  color: red;
  border: none;
  vertical-align: none;
}
.subTitle{
  display: inline-block;
  width: 112px;
}
.dangerInfo{
  color: red;
}
.subBrandForm{
  display: flex;
  width: 800px;
}
.subBrandCheckbox{
  color: #606266;
  width: 700px;
}
.select-width{
  width: 260px;
}
.input-width, .small-select-width{
  width: 200px;
}
.subBrandForm-content{
  margin-left: 10px;
}
.footer{
  text-align:center;
  margin-top:40px;
}
</style>
<style lang="less" scoped>
/* 静态页面 */
  .brandForm
  /deep/ .el-form-item__label{
    text-align: right;
  }
  .customAdd{
    /deep/ .el-checkbox-button__inner{
      color: red;
      border: none;
      vertical-align: baseline;
    }
  }
  .brandForm
  /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner{
    border: none;
    color: red;
    background-color: transparent;
    box-shadow:none;
  }
  .brandForm
  /deep/ .el-checkbox-button__inner:hover{
    color: red;
  }
  .brandForm
  /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #000;
  }
  .brandForm
  /deep/ .el-radio__input.is-checked+.el-radio__label{
    color: #000
  }
  .brandForm
  /deep/ .el-radio__input.is-checked .el-radio__inner{
    border: red;
    background-color: red;
  }
/* end */
</style>

