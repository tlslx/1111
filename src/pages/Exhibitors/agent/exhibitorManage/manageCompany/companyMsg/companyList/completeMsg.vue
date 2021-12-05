<style lang="less">
@import "../../../../../../../theme/project/css/flex.less";
#complete-msg {
  .el-collapse-item__header{
    background-color: rgba(	100,149,237,1);
    color: #FFFFFF;
    padding-left: 30px;
    font-family: 'Arial Normal', 'Arial';
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .tabs{
    margin-left: 80px;
    margin-right: 80px;
  }
  .li-style{
    list-style:none;
    cursor:pointer;
  }
  .remarke{
    margin-left: 40px;
    color: red;
  }
  .saveBtn{
    float: right;
    margin-right: 10%;
  }
  .saveBtnT{
    float: right;
    margin-right: 1%;
  }
  .inline-item{
    display: inline-block;
    width: 33%;
    margin-left: 8%;
  }
  .colum-item-left {
    display: inline-block;
    width: 66%;
    margin-left: 16%;
  }
  .colum-item-right {
    display: inline-block;
    width: 66%;
    // margin-left: 8%;
  }
  .fileName{
    display: inline-block;
    width: 70%;
  }
  .checkbox-item{
    display: inline-block;
    width: 33%;
    margin-left: 0;
  }
  .btn-style{
    text-align: center;
    padding-bottom: 20px;
  }
  .el-dialog{
    width:50%;
    margin-left: 60%;
  }
  .submint-div{
    width: 100%;
  }
  .submint-btn{
    float: right;
    height: 50px;
    line-height: 50px;
    padding: 0px;
  }
}
</style>

<template>
  <div id="complete-msg">

    <el-tabs v-model="activeName">
      <!-- 完善企业信息 -->
      <el-tab-pane label="完善企业信息" name="first" class="tabs">
        <el-collapse v-model="tables">
          <!-- 重要信息 -->
          <el-collapse-item  name="1">
            <template slot="title">
              <div class="submint-div">
                重要信息
                <el-button type="text" v-on:click.native.stop="submit('impInfForm')" class="submint-btn" v-if="modifyStatus">保存</el-button>
                <el-button type="text" class="submint-btn" v-on:click.native.stop="submit('impInfForm')" v-else>申请修改信息</el-button>
              </div>
            </template>
            <span class="remarke">*号为必填项</span>
            <el-form :model="impInfForm" ref="impInfForm" :rules="impInfRules">
              <el-row>
                <el-form-item label="企业英文名称:" class="inline-item" size="small" prop="companyNameEn" label-width="130px">
                  <el-input v-model="impInfForm.companyNameEn" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" class="inline-item" size="small" prop="telephone" label-width="130px">
                  <el-input v-model="impInfForm.telephone"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="企业中文名称:" class="inline-item" size="small" prop="companyNameCh" label-width="130px">
                  <el-input v-model="impInfForm.companyNameCh"></el-input>
                </el-form-item>
                <el-form-item label="联系人:" class="inline-item" size="small" prop="contact" label-width="130px">
                  <el-input v-model="impInfForm.contact"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="企业地址:" class="inline-item" size="small" prop="companyAddressCh" label-width="130px">
                  <el-input v-model="impInfForm.companyAddressCh"></el-input>
                </el-form-item>
                <el-form-item label="网址:" class="inline-item" size="small" prop="companyNetAddress" label-width="130px">
                  <el-input v-model="impInfForm.companyNetAddress"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="所在国家地区:" class="inline-item" size="small" prop="countryRegionId" label-width="130px">
                  <el-select  placeholder="请选择" v-model="impInfForm.countryRegionId">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱:" class="inline-item" size="small" prop="mail" label-width="130px">
                  <el-input v-model="impInfForm.mail"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="营业执照:" class="inline-item" size="small" prop="licenseFile" label-width="130px">
                  <el-upload v-model="impInfForm.licenseFile" class="upload-demo" ref="upload" :action="uploadApi"
                    :data="uploadSingleParams" :before-upload="beforeUploadSingle" :limit="1"
                    :on-success="uploadSuccess" :on-error="uploadError"
                    :file-list="fileList">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
                </el-form-item>
                <el-form-item label="代理归属:" class="inline-item" size="small" prop="exhibitionAgentId" label-width="130px">
                  <el-select  placeholder="请选择" v-model="impInfForm.exhibitionAgentId">
                    <el-option v-for="item in options" :key="item.value"
                      :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="原产地文件:" class="inline-item" size="small" prop="sourceAreaFile" label-width="130px">
                  <el-upload v-model="impInfForm.sourceAreaFile" class="upload-demo" ref="upload" :action="uploadApi"
                    :data="uploadSingleParams" :before-upload="beforeUploadSingle" :limit="1"
                    :on-success="sourceSuccess" :on-error="uploadError"
                    :file-list="fileList">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
                </el-form-item>
              </el-row>
            </el-form>
          </el-collapse-item>
          <!-- 基本信息 -->
          <el-collapse-item  name="2">
            <template slot="title">
              <div class="submint-div">
              基本信息
              <el-button  type="text" v-on:click.native.stop="submit('baseInfForm')" class="submint-btn" >保存</el-button>
              </div>
            </template>
            <el-form :model="baseInfForm" ref="baseInfForm" :rules="baseRules" :disabled="isUpdate">
              <el-row>
                <el-col :span="12">
                  <div class="bm bm-ver">
                    <el-form-item label="企业简称:" class="colum-item-left" size="small" prop="enterpriseAbbreviation" label-width="130px">
                      <el-input v-model="baseInfForm.enterpriseAbbreviation"></el-input>
                    </el-form-item>
                    <el-form-item label="产品:" class="colum-item-left" size="small" prop="product" label-width="130px">
                      <el-input v-model="baseInfForm.product"></el-input>
                    </el-form-item>
                    <el-form-item label="企业类型:" class="colum-item-left" size="small" prop="companyType" label-width="130px">
                      <el-select  placeholder="请选择" v-model="baseInfForm.companyType">
                        <el-option v-for="item in firmTypeArr" :key="item.value"
                          :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="" class="colum-item-left" size="small" prop="companyTypeElse" label-width="130px" v-if="firmType">
                      <el-input placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业:" class="colum-item-left" size="small" prop="industry" label-width="130px">
                      <el-input v-model="baseInfForm.industry"></el-input>
                    </el-form-item>
                    <el-form-item label="意向申请展位数量:" class="colum-item-left" size="small" prop="intentionBoothNum" label-width="130px">
                      <el-input v-model="baseInfForm.intentionBoothNum"></el-input>
                    </el-form-item>
                    <el-form-item label="意向申请届数:" class="colum-item-left" size="small" prop="intentionExhSes" label-width="130px">
                      <el-input v-model="baseInfForm.intentionExhSes"></el-input>
                    </el-form-item>
                    <el-form-item label="企业logo:" class="colum-item-left" size="small" prop="companyLogoFileId" label-width="130px">
                      <el-upload v-model="baseInfForm.companyLogoFileId" class="upload-demo"
                        ref="upload" :action="uploadApi" :limit="1"
                        :data="uploadSingleParams" :before-upload="beforeUploadSingle"
                        :on-success="baseSuccess" :on-error="uploadError" :file-list="fileList">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="公司简介:" class="colum-item-left" size="small" prop="companySummary" label-width="130px">
                      <el-input type="textarea" :rows="2" v-model="baseInfForm.companySummary"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="bm bm-ver">
                    <el-form-item label="部门:" class="colum-item-right" size="small" prop="depart" label-width="128px">
                      <el-input v-model="baseInfForm.depart"></el-input>
                    </el-form-item>
                    <el-form-item label="手机:" class="colum-item-right" size="small" prop="telephone" label-width="128px">
                      <el-input v-model="baseInfForm.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="传真:" class="colum-item-right" size="small" prop="fax" label-width="128px">
                      <el-input v-model="baseInfForm.fax"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <!-- 隐藏的模板 -->
              <el-row v-if="false">
                <el-form-item label="企业简称:" class="inline-item" size="small" prop="enterpriseAbbreviation" label-width="130px">
                  <el-input v-model="baseInfForm.enterpriseAbbreviation"></el-input>
                </el-form-item>
                <el-form-item label="部门:" class="inline-item" size="small" prop="depart" label-width="130px">
                  <el-input v-model="baseInfForm.depart"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="产品:" class="inline-item" size="small" prop="product" label-width="130px">
                  <el-input v-model="baseInfForm.product"></el-input>
                </el-form-item>
                <el-form-item label="职务:" class="inline-item" size="small" prop="job" label-width="130px">
                  <el-input v-model="baseInfForm.job"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="企业类型:" class="inline-item" size="small" prop="companyType" label-width="130px">
                  <el-input v-model="baseInfForm.companyType"></el-input>
                </el-form-item>
                <el-form-item label="手机:" class="inline-item" size="small" prop="telephone" label-width="130px">
                  <el-input v-model="baseInfForm.telephone"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="" class="inline-item" size="small" prop="companyTypeElse" label-width="130px">
                  <el-input v-model="baseInfForm.companyTypeElse"></el-input>
                </el-form-item>
                <el-form-item label="传真:" class="inline-item" size="small" prop="fax" label-width="130px">
                  <el-input v-model="baseInfForm.fax"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="所属行业:" class="inline-item" size="small" prop="industry" label-width="130px">
                  <el-input v-model="baseInfForm.industry"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="意向申请展位数量:" class="inline-item" size="small" prop="intentionBoothNum" label-width="130px">
                  <el-input v-model="baseInfForm.intentionBoothNum"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="意向申请届数:" class="inline-item" size="small" prop="intentionExhSes" label-width="130px">
                  <el-input v-model="baseInfForm.intentionExhSes"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="企业logo:" class="inline-item" size="small" prop="companyLogoFileId" label-width="130px">
                  <el-upload v-model="baseInfForm.companyLogoFileId" class="upload-demo"
                    ref="upload" :action="uploadApi" :limit="1"
                    :data="uploadSingleParams" :before-upload="beforeUploadSingle"
                    :on-success="baseSuccess" :on-error="uploadError" :file-list="fileList">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-row>
              <el-row v-if="false">
                <el-form-item label="公司简介:" class="inline-item" size="small" prop="companySummary" label-width="130px">
                  <el-input type="textarea" :rows="2" v-model="baseInfForm.companySummary"></el-input>
                </el-form-item>
              </el-row>
              <!-- 隐藏的模板END -->
            </el-form>
          </el-collapse-item>
          <!-- 参展资质文件 -->
          <el-collapse-item  name="3">
            <template slot="title">
              <div class="submint-div">
                参展资质文件
                <el-button  type="text" v-on:click.native.stop="submit('aptitudeForm')" class="submint-btn">保存</el-button>
              </div>
            </template>
            <el-form :model="aptitudeForm" ref="aptitudeForm" :disabled="isUpdate">
              <el-row>
                <el-form-item label="营业执照编码:" class="inline-item" size="small" prop="licenseCode" >
                  <el-input v-model="aptitudeForm.licenseCode"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-collapse-item>
          <!-- 认证获奖情况 -->
          <el-collapse-item  name="4">
            <template slot="title">
              <div class="submint-div">
                认证获奖情况
                <el-button  type="text" v-on:click.native.stop="submit('identForm')" class="submint-btn">保存</el-button>
              </div>
            </template>
            <el-form :model="identForm" ref="identForm" :disabled="isUpdate">
                <el-row>
                  <el-form-item label="获得国际认证数量:" class="inline-item" size="small" prop="interWitnessNum" label-width="140px">
                    <el-input v-model="identForm.interWitnessNum"></el-input>
                  </el-form-item>
                  <el-form-item label="企业/产品获奖数量:" class="inline-item" size="small" prop="prizeNum" label-width="140px">
                    <el-input v-model="identForm.prizeNum"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="获得国际认证证明:" class="inline-item" size="small" prop="" label-width="140px">
                    <div class="name-select" >
                      <ul style="padding-left: 10px;">
                        <template v-for="item in interWitnessNums">
                          <li :key="item.fileId" class="li-style" >{{ item.note }} &nbsp;<i class="el-icon-error" @click="removeImage(item.fileId)" v-if="ifRemove"></i></li>
                        </template>
                      </ul>
                    </div>
                  </el-form-item>
                  <el-form-item label="企业/产品获奖证明:" class="inline-item" size="small" prop="awardFileIds" label-width="140px">
                    <el-upload v-model="identForm.awardFileIds" class="upload-demo" ref="upload"
                      :action="moreApi" :data="uploadParams" :before-upload="beforeUpload" :on-success="awardSuccess"
                      :on-error="uploadError" :file-list="fileList">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="获得国际认证证明:" class="inline-item" size="small" prop="interCerFileIds" label-width="140px">
                    <el-button  size="small" type="primary" @click="showFileName(1, 0)">添加</el-button>
                  </el-form-item>
                  <el-form-item label="是否参加其他国际展会:" class="inline-item" size="small" prop="isAttendOtherExh" label-width="140px">
                    <el-select v-model="identForm.isAttendOtherExh" placeholder="请选择">
                      <el-option v-for="item in isAttendOtherExh"
                        :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="获取知识产权/专利数量:" class="inline-item" size="small" prop="propertyNum" label-width="140px">
                    <el-upload v-model="identForm.propertyNum"
                      class="upload-demo" ref="upload"
                      :action="moreApi" :data="uploadParams"
                      :before-upload="beforeUpload" :on-success="propertySuccess"
                      :on-error="uploadError" :file-list="fileList">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="参加国际展会名称:" class="inline-item" size="small" prop="" label-width="140px">
                    <div class="name-select" >
                      <ul style="padding-left: 10px;">
                        <template v-for="item in countryRegion">
                          <li :key="item.fileId" class="li-style" >{{ item.note }} &nbsp;<i class="el-icon-error" @click="removeImage(item.fileId)" v-if="ifRemove"></i></li>
                        </template>
                      </ul>
                    </div>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="知识产权/专利证明:" class="inline-item" size="small" prop="propertyFileIds" label-width="140px">
                    <el-input v-model="identForm.propertyFileIds"></el-input>
                  </el-form-item>
                  <el-form-item label="上传相关凭证:" class="inline-item" size="small" prop="otherExhFileIds" label-width="140px" v-if="ifAttendOtherExh">
                    <el-button  size="small" type="primary" @click="showFileName(2, 3)">添加</el-button>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="是否财富五百强企业或子公司:" class="inline-item" size="small" prop="isFortune" label-width="140px">
                    <el-select v-model="identForm.isFortune" placeholder="请选择">
                      <el-option v-for="item in isFortune"
                        :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="上传相关凭证:" class="inline-item" size="small" prop="fortuneFileIds" label-width="140px" v-if="ifFortune">
                    <el-upload
                      v-model="identForm.fortuneFileIds"
                      class="upload-demo" ref="upload"
                      :action="moreApi" :data="uploadParams"
                      :before-upload="beforeUpload" :on-success="fortuneSuccess"
                      :on-error="uploadError" :file-list="fileList">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-row>
            </el-form>
            <el-dialog title="添加" :visible.sync="dialogProduct" style="width:70%">
              <el-form :model="addUpload" ref="addUpload" :rules="formRules">
                <el-row>
                  <el-form-item label="名称" prop="fileName" size="small" class="fileName">
                    <el-input v-model="addUpload.fileName"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="上传" prop="" size="small" class="fileName">
                    <el-upload v-if = "successName === 1" class="upload-demo"
                      ref="upload" :action="identApi"
                      :data="uploadParams" :before-upload="beforeUploadT"
                      :on-remove="handleRemove" :on-success="interCerSuccess"
                      :on-error="uploadError" :file-list="fileList">
                      <el-button slot="trigger" size="small" type="primary">上传</el-button>
                    </el-upload>
                    <el-upload v-else class="upload-demo" ref="upload"
                      :action="identApi" :data="uploadParams"
                      :before-upload="beforeUploadT" :on-remove="handleRemove"
                      :on-success="otherExhSuccess" :on-error="uploadError"
                      :file-list="fileList">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                  </el-form-item>
                </el-row>
              </el-form>
              <div class="btn-style">
                <el-button type="danger" @click="closeShow">确定</el-button>
                <el-button @click="closeShow">取消</el-button>
              </div>
            </el-dialog>
          </el-collapse-item>
          <!-- 分支机构/代理情况 -->
          <el-collapse-item  name="5">
            <template slot="title">
              <div class="submint-div">
                分支机构/代理情况
                <el-button  type="text" v-on:click.native.stop="submit('exhIdenForm')" class="submint-btn">保存</el-button>
              </div>
            </template>
            <el-form :model="exhIdenForm" ref="exhIdenForm" :disabled="isUpdate">
              <el-row>
                <el-form-item label="" class="checkbox-item" size="small" prop="" >
                  <el-checkbox>本公司有分支机构</el-checkbox>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="分支机构名称:" class="inline-item" size="small" prop="branchOrgName" >
                  <el-input v-model="exhIdenForm.branchOrgName"></el-input>
                </el-form-item>
                <el-form-item label="地址:" class="inline-item" size="small" prop="branchOrgAddress" >
                  <el-input v-model="exhIdenForm.branchOrgAddress"></el-input>
                </el-form-item>
              </el-row>
              <el-row style="margin-left: 0">
                <el-form-item label="" class="checkbox-item" size="small" prop="" style="margin-left: 0">
                  <el-checkbox>本公司有代理商</el-checkbox>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="代理商名称:" class="inline-item" size="small" prop="branchAgentName" >
                  <el-input v-model="exhIdenForm.branchAgentName"></el-input>
                </el-form-item>
                <el-form-item label="地址:" class="inline-item" size="small" prop="branchAgentAddress" >
                  <el-input v-model="exhIdenForm.branchAgentAddress"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-collapse-item>
          <!-- 出口情况 -->
          <el-collapse-item  name="6">
            <template slot="title">
              <div class="submint-div">
                出口情况
                <el-button  type="text" v-on:click.native.stop="submit('epxConForm')" class="submint-btn">保存</el-button>
              </div>
            </template>
            <el-form :model="epxConForm" ref="epxConForm" :disabled="isUpdate" label-width="108px">
              <el-row>
                <el-form-item label="年销售额:" class="inline-item" size="small" prop="yearSales" >
                  <el-input v-model="epxConForm.yearSales"></el-input>
                </el-form-item>
                <el-form-item label="主要出口地区1:" class="inline-item" size="small" prop="countryRegionsF">
                  <el-input v-model="epxConForm.countryRegionsF"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="年出口额:" class="inline-item" size="small" prop="yearExp" >
                  <el-input v-model="epxConForm.yearExp"></el-input>
                </el-form-item>
                <el-form-item label="主要出口地区2:" class="inline-item" size="small" prop="countryRegionsS">
                  <el-input v-model="epxConForm.countryRegionsS"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="目标客户:" class="inline-item" size="small" prop="targetClient" >
                  <el-select  placeholder="请选择" v-model="epxConForm.targetClient">
                    <el-option v-for="item in targetClientArr" :key="item.value"
                      :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="epxConForm.targetClient"></el-input> -->
                </el-form-item>
                <el-form-item label="主要出口地区3:" class="inline-item" size="small" prop="countryRegionsT" >
                  <el-input v-model="epxConForm.countryRegionsT"></el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="clientType">
                <el-form-item label="" class="inline-item" size="small" prop="targetClient" >
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>

      <!-- 信息修改记录 -->
      <el-tab-pane label="信息修改记录" name="second">
        <el-form :inline="true" :model="searchForm" class="demo-ruleForm">
          <el-form-item label="审核状态:" size="mini" prop="state">
            <el-select  placeholder="请选择" v-model="searchForm.state">
              <el-option label="全部" value=""></el-option>
              <el-option :label="item.label" :value="item.value" 
                v-for="item in checkStateArr" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="submitSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableForm"
          :formatter="formatterRow"
          style="width: 100%;">
          <el-table-column v-for="item in tableHead" :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            >
            <template slot-scope="scope">
              <el-button  type="text" size="small" @click="toDetail(scope.row.id)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  data() {
    let checkLength = (rule, value, callback) => {
      // let errors = [];
      if (value != null && value.length > rule.length) {
        // errors.push(new Error("长度超过限制" + rule.length));
        return callback(new Error('长度超过限制' + rule.length));
      }
      // callback(errors);
    };
    return {
      tables: ['1'],
      successName: "",
      dialogProduct: false,
      ifFortune: true,
      ifAttendOtherExh: true,
      ifRemove: true,
      exhibitionAgentId: "",
      tableForm: [],
      modifyImpType: "",
      exhId: "",
      otherExh: [],
      interCer: [],
      type: "",
      approveStatus: "",
      finalApproveStatus: "",
      isUpdate: false,
      interWitnessNums: [],
      watchForm: {},
      boothStatus: "",
      modifyStatus: true,
      uploadApi: "", // 上传地址
      identApi: "",
      moreApi: "",
      countryRegion: [],
      uploadSingleParams: {}, // 单文件上传用
      uploadParams: {},
      InterCerOrOtherExh: {},
      baseApi: process.env.API_POT_URL,
      activeName: "first",
      options: [
        {
          value: 111,
          label: 222
        }
      ],
      firmTypeArr: [
        {
          label: "其他",
          value: 1
        },
        {
          label: "不其他",
          value: 2
        }
      ],
      targetClientArr: [
        {
          label: "其他",
          value: 1
        },
        {
          label: "bu其他",
          value: 2
        }
      ],
      isFortune: [
        {
          value: "0",
          label: '否'
        },
        {
          value: "1",
          label: '是'
        }
      ],
      isAttendOtherExh: [
        {
          value: "0",
          label: '否'
        },
        {
          value: "1",
          label: '是'
        }
      ],
      fileList: [],
      impInfForm: {
        companyNameEn: "",
        telephone: "",
        companyNameCh: "",
        contact: "",
        companyAddressCh: "",
        companyNetAddress: "",
        countryRegionId: "",
        mail: "",
        licenseFile: "",
        exhibitionAgentId: "",
        sourceAreaFile: ""
      },
      baseInfForm: {
        enterpriseAbbreviation: "",
        depart: "",
        product: "",
        job: "",
        companyType: "",
        telephone: "",
        companyTypeElse: "",
        fax: "",
        industry: "",
        intentionBoothNum: "",
        intentionExhSes: "",
        companyLogoFileId: "",
        companySummary: ""
      },
      identForm: {
        interWitnessNums: []
      },
      aptitudeForm: { // 参展资质文件
        licenseCode: ""
      },
      exhIdenForm: {
        branchOrgName: "",
        branchOrgAddress: "",
        branchAgentName: "",
        branchAgentAddress: ""
      },
      epxConForm: {
        yearSales: "",
        countryRegionsF: "",
        yearExp: "",
        countryRegionsS: "",
        targetClient: "",
        countryRegionsT: ""
      },
      addUpload: {
        fileName: ""
      },
      value: "",
      formRules: {
        fileName: [{ required: true, message: "文件名称不能为空", trigger: "blur" }]
      },
      impInfRules: {
        companyNameEn: [{ required: true, message: "企业英文名称不能为空", trigger: "blur" }],
        telephone: [{ required: true, message: "联系电话不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([0-9]{0,255})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("只能输入数字"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        companyNameCh: [{ required: true, message: "企业中文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
              let regRuleT = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
              if (regRuleT.test(value) || regRule.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }

            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }],
        contact: [{ required: true, message: "联系人不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        companyAddressCh: [{ required: true, message: "企业地址不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        companyNetAddress: [{ required: true, message: "网址不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        countryRegionId: [{ required: true, message: "所在国家地区不能为空", trigger: "blur" }],
        mail: [{ required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的邮箱格式"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ],
        licenseFile: [{ required: true, message: "营业执照不能为空", trigger: "blur" }],
        exhibitionAgentId: [{ required: true, message: "代理归属不能为空", trigger: "blur" }],
        sourceAreaFile: [{ required: true, message: "原产地文件不能为空", trigger: "blur" }]
      },
      baseRules: {
        enterpriseAbbreviation: [{ required: true, message: "企业简称不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }],
        depart: [{ required: true, message: "部门不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        product: [{ required: true, message: "产品不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        job: [{ required: true, message: "职务不能为空", trigger: "blur" },
        { length: "100", validator: checkLength }],
        companyType: [{ required: true, message: "企业类型不能为空", trigger: "blur" },
         { length: "32", validator: checkLength }],
        telephone: [{ required: true, message: "手机不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([0-9]{0,255})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("只能输入数字"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        fax: [{ required: true, message: "传真不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的传真格式"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        industry: [{ required: true, message: "所属行业不能为空", trigger: "blur" }],
        intentionBoothNum: [{ required: true, message: "意向申请展位数量不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([0-9]{0,255})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("只能输入数字"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "50", validator: checkLength }],
        intentionExhSes: [{ required: true, message: "意向申请届数不能为空", trigger: "blur" }],
        companyLogoFileId: [{ required: true, message: "企业logo不能为空", trigger: "blur" }],
        companySummary: [{ required: true, message: "公司简介不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }]
      },
      //信息修改记录---data
      checkStateArr: [
        {
          label: "审核",
          value: "1"
        },
        {
          label: "wei审核",
          value: "2"
        }
      ],
      tableHead: [
        {
          label: "申请修改信息时间",
          prop: "applyModifyTime"
        },
        {
          label: "审核状态",
          prop: "checkStatus"
        }
      ],
      tableData: [
        {
          id: 1,
          applyModifyTime: "2018.7.5",
          checkStatus: "1"
        },
        {
          id: 2,
          applyModifyTime: "2018.8.5",
          checkStatus: "2"
        }
      ],
      searchForm: {
        state: ""
      }
    };
  },
  computed: {
    firmType: function() {
      // console.log(this.baseInfForm.companyType);
      return this.baseInfForm.companyType === 1;
    },
    clientType: function() {
      return this.epxConForm.targetClient === 1;
    }
  },
  methods: {
    // 带note上传
    beforeUploadT(file) {
      let isTrue;
      let formName = 'addUpload';
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadParams.companyId = "aaa";
          this.uploadParams.creatorId = "aaa";
          this.uploadParams.creatorName = "企业英文名称";
          this.uploadParams.note = this.addUpload.fileName;
          this.uploadParams.type = this.type;
          this.uploadParams.file = file;

          isTrue = true;
        } else {
          isTrue = false;
        }
      });
      return isTrue;
    },
    beforeUploadSingle(file) {
      this.uploadSingleParams.creatorId = "aaa";
      this.uploadSingleParams.creatorName = "企业英文名称";
      this.uploadSingleParams.note = this.addUpload.fileName;
      this.uploadSingleParams.file = file;
    },
    // 单文件上传
    beforeUpload(file) {
      // this.dialogruleForm.files = file;
      // 进行图片大小验证
      // let testPdf = file.type === "image/jpeg";
      // if (!testPdf) {
      //   this.$message.warning("文件格式上传错误!");
      //   return false;
      // }
      // const isLt2M = file.size / 1024 / 1024 < 5;
      // if (!isLt2M) {
      //   this.$message.warning("上传文件大小不能超过 5MB!");
      //   return false;
      // }
      this.uploadParams.companyId = "aaa"; // "0007898572"
      this.uploadParams.creatorId = "aaa";
      this.uploadParams.creatorName = "企业英文名称";
      this.uploadParams.note = this.addUpload.fileName;
      this.uploadParams.type = this.type;
      this.uploadParams.file = file;
      return true;
    },
    uploadSuccess(responese, res, file) { // 营业执照
      if (responese.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.impInfForm.licenseFile = responese.data.fileId;
      }
    },
    baseSuccess(responese, res, file) {
      if (responese.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.baseInfForm.companyLogoFileId = responese.data.fileId;
      }
    },
    awardSuccess(responese, res, file) {
      if (responese.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.identForm.awardFileIds.push(responese.data.fileIds);
      }
    },
    propertySuccess(responese, res, file) {
      if (responese.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.identForm.propertyNum.push(responese.data.fileIds);
      }
    },
    otherExhSuccess(responese, res, file) {
      let arm = [];
      if (responese.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.identForm.otherExhFileIds = responese.data.fileId;
        arm.push(responese.data.fileId);
        this.countryRegion.push({ fileId: responese.data.fileId, fileName: this.addUpload.fileName, note: this.addUpload.fileName });
        this.addUpload.fileName = "";
      }
      this.otherExh = arm;
    },
    fortuneSuccess(responese, res, file) {
      if (responese.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.identForm.fortuneFileIds.push(responese.data.fileIds);
      }
    },
    sourceSuccess(responese, res, file) { // 原产地
      if (res.flag === "0") {
        this.$refs.upload.clearFiles();
        this.$message.error("文件上传失败");
      } else {
        this.$message.success("文件上传成功");
        this.impInfForm.sourceAreaFile = responese.data.fileId;
      }
    },
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleRemove(file, fileList) {
      if (this.successName === 1) {
        for (let i = 0; i < this.interWitnessNums.length; i++) {
          if (file.response.data.fileIds === this.interWitnessNums[i].fileId) {
            this.interWitnessNums.splice(i, 1);
          }
        }
      } else {
        for (let i = 0; i < this.countryRegion.length; i++) {
          if (file.response.data.fileIds === this.countryRegion[i].fileId) {
            this.countryRegion.splice(i, 1);
          }
        }
      }
    },
    // 关闭上传添加弹窗
    closeShow() {
      this.$refs.upload.clearFiles();
      this.dialogProduct = false;
    },
    //信息修改记录---methods
    // 查询按钮
    submitSearch() {
      let tableParam = {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "type",
            "values": [
              "1"
            ]
          },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "object_id",
            "values": [
              "aaa" // "0007898572"
            ]
          }
        ],
        "orderModelField": [
          {
            "asc": false,
            "orderByField": "apply_modify_time"
          }
        ]
      };
      if (this.searchForm.state === "0") {
        tableParam.customQueryParams[2] = {
          "findType": "EQ",
          "joinType": "And",
          "name": "approveStatus",
          "values": [
            "0"
          ]
        };
      } else if (this.searchForm.state === "1") {
        tableParam.customQueryParams[2] = {
          "findType": "EQ",
          "joinType": "And",
          "name": "approveStatus",
          "values": [
            "2"
          ]
        };
      } else if (this.searchForm.state === "2") {
        tableParam.customQueryParams[2] = {
          "findType": "EQ",
          "joinType": "And",
          "name": "approveStatus",
          "values": [
            "1"
          ]
        };
      } else if (this.searchForm.state === "3") {
        tableParam.customQueryParams[2] = {
          "findType": "EQ",
          "joinType": "And",
          "name": "finalApproveStatus",
          "values": [
            "2"
          ]
        };
      } else if (this.searchForm.state === "4") {
        tableParam.customQueryParams[2] = {
          "findType": "EQ",
          "joinType": "And",
          "name": "finalApproveStatus",
          "values": [
            "1"
          ]
        };
      }
      //信息修改记录初始化
      this.getCompanyUpdateHistoryInfo(tableParam).then(res => {
        this.tableForm = res.records;
      });
    },
    formatterRow(row, column, cellValue, index) {
      // console.log("lie", row, column);
      let prop = column.property;
      if (prop === "checkStatus") {
        let value = row[prop];
        if (value === "1") {
          return "已审核";
        } else {
          return "未审核";
        }
      } else {
        return row[prop];
      }
    },
    toDetail(param) {
      this.$router.push(`/agent_company_alertRecorde/${param}`);
    }
  },
  created() {
    console.log("canshu", this.$route.params.id);
  }
};
</script>
