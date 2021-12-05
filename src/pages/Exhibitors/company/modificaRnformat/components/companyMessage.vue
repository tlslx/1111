<style lang="less">
  #components-companyMessage {
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
  <div id="components-companyMessage">
    <el-collapse v-model="tables">
      <!-- 重要信息 -->
      <el-collapse-item  name="1">
        <template slot="title">
          <div class="submint-div">
            重要信息
            <el-button type="text" v-on:click.native.stop="submit('impInfForm')" class="submint-btn" v-if="false">保存</el-button>
            <!-- <el-button type="text" class="submint-btn" v-on:click.native.stop="submit('impInfForm')" v-else>申请修改信息</el-button> -->
          </div>
        </template>
        <span class="remarke">*号为必填项</span>
        <el-form :model="impInfForm" ref="impInfForm" :rules="impInfRules" :disabled="true">
          <el-row>
            <el-form-item label="企业英文名称:" class="inline-item" size="small" prop="companyNameEn" label-width="130px">
              <el-input v-model="impInfForm.companyNameEn"></el-input>
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
                <el-option
                  v-for="item in countries" :key="item.countryRegionId"
                  :label="item.crChName" :value="item.countryRegionId">
                </el-option>
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
                <el-option
                  v-for="item in exhibitionAgents" :key="item.exhibitionAgentId"
                  :label="item.agentCh" :value="item.exhibitionAgentId">
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
          <el-button  type="text" v-on:click.native.stop="submit('baseInfForm')" class="submint-btn" v-if="false">保存</el-button>
          </div>
        </template>
        <!-- :disabled="isUpdate" -->
        <el-form :model="baseInfForm" ref="baseInfForm" :rules="baseRules" :disabled="true">
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
                    <el-option v-for="item in companyTypeOptionsData" :key="item.value" 
                      :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" class="colum-item-left" size="small" prop="companyTypeElse" label-width="130px" v-if="firmType">
                  <el-input placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所属行业:" class="colum-item-left" size="small" prop="industry" label-width="130px">
                  <!-- <el-input v-model="baseInfForm.industry"></el-input> -->
                  <el-select v-model="baseInfForm.industry">
                    <el-option v-for="item in industryTypeOptionsData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
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
        </el-form>
      </el-collapse-item>
      <!-- 参展资质文件 -->
      <el-collapse-item  name="3">
        <template slot="title">
          <div class="submint-div">
            参展资质文件
            <el-button  type="text" v-on:click.native.stop="submit('aptitudeForm')" class="submint-btn" v-if="false">保存</el-button>
          </div>
        </template>
        <el-form :model="aptitudeForm" ref="aptitudeForm" :disabled="true">
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
            <el-button  type="text" v-on:click.native.stop="submit('identForm')" class="submint-btn" v-if="false">保存</el-button>
          </div>
        </template>
        <el-form :model="identForm" ref="identForm" :disabled="true">
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
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
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
                      <li :key="item.fileId" class="li-style" >{{ item.note }} &nbsp;</li>
                      <!-- <i class="el-icon-error" @click="removeImage(item.fileId)" v-if="ifRemove"></i> -->
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
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="0"></el-option>
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
            <el-button  type="text" v-on:click.native.stop="submit('exhIdenForm')" class="submint-btn" v-if="false">保存</el-button>
          </div>
        </template>
        <el-form :model="exhIdenForm" ref="exhIdenForm" :disabled="true">
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
            <el-button  type="text" v-on:click.native.stop="submit('epxConForm')" class="submint-btn" v-if="false">保存</el-button>
          </div>
        </template>
        <el-form :model="epxConForm" ref="epxConForm" :disabled="true" label-width="108px">
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
                <el-option v-for="item in targetConstomSelectData" :key="item.value" 
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
  </div>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [tableMixIn, listPageBase],
  props: {
    companyId: {
      type: String,
      default: () => { }
    }
  },
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
      exhibitionAgents: [],
      countries: [],
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
      isUpdate: true,
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
  watch: {
    impInfForm: {
      handler: function(obj) {
        let objs = JSON.parse(JSON.stringify(obj));
        let param = {
          companyNameEn: objs.companyNameEn,
          telephone: objs.telephone,
          companyNameCh: objs.companyNameCh,
          contact: objs.contact,
          companyAddressCh: objs.companyAddressCh,
          companyNetAddress: objs.companyNetAddress,
          countryRegionId: objs.countryRegionId,
          mail: objs.mail,
          licenseFile: objs.licenseFile,
          sourceAreaFile: objs.sourceAreaFile
        };
        let form = {
          companyNameEn: this.watchForm.companyNameEn,
          telephone: this.watchForm.telephone,
          companyNameCh: this.watchForm.companyNameCh,
          contact: this.watchForm.contact,
          companyAddressCh: this.watchForm.companyAddressCh,
          companyNetAddress: this.watchForm.companyNetAddress,
          countryRegionId: this.watchForm.countryRegionId,
          mail: this.watchForm.mail,
          licenseFile: this.watchForm.licenseFile,
          sourceAreaFile: this.watchForm.sourceAreaFile
        };

        if (objs.exhibitionAgentId !== this.exhibitionAgentId && !this.isEquals(form, param)) {
          this.modifyStatus = true; // 重要信息和代理归属同时修改了
        } else if (objs.exhibitionAgentId !== this.exhibitionAgentId && this.isEquals(form, param)) {
          this.modifyImpType = 2; // 修改了招展代理归属，未修改其他重要信息
        } else if (objs.exhibitionAgentId === this.exhibitionAgentId && !this.isEquals(form, param)) {
          this.modifyImpType = 1; // 未修改招展代理归属，修改了其他重要信息
        } else if (objs.exhibitionAgentId === this.exhibitionAgentId && this.isEquals(form, param)) {
          this.modifyImpType = 0; // 未修改重要信息
        } else if (objs.exhibitionAgentId !== this.exhibitionAgentId && this.exhId === "1") {
          this.modifyStatus = false; // modifyStatus = 1 不能修改代理归属 修改了代理归属
        }
      },
      deep: true
    },
    identForm: {
      handler: function(obj) {
        // 不是财富五百强企业或子公司 或 未选择
        if (this.identForm.isFortune === "0" || this.identForm.isFortune == null) {
          this.ifFortune = false; // 隐藏上传凭证
          // 是财富五百强企业或子公司
        } else if (this.identForm.isFortune === "1") {
          this.ifFortune = true; //显示上传凭证
        }
        // 未参加其他国际展会 或 未选择
        if (this.identForm.isAttendOtherExh === "0" || this.identForm.isAttendOtherExh == null) {
          this.ifAttendOtherExh = false; // 隐藏上传凭证
          // 参加其他国际展会
        } else if (this.identForm.isAttendOtherExh === "1") {
          this.ifAttendOtherExh = true; //显示上传凭证
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('regist', ['companyTypeOptionsData', 'industryTypeOptionsData', 'exhibitListAllData']),
    ...mapGetters('companyInfo', ['getComInfo', 'getCompany', 'targetConstomSelectData']),   // 获取企业基本信息
    firmType: function() {
      // console.log(this.baseInfForm.companyType);
      return this.baseInfForm.companyType === 1;
    },
    clientType: function() {
      return this.epxConForm.targetClient === 1;
    }
  },
  methods: {
    ...mapActions('companyInfo', ['getCompanyInformationInfo', 'updateInfo', 'getTargetConstomSelect']),   // 获取企业基本信息
    ...mapActions('companyInfo', ['removeCpFileLkInfo']),   // 删除多选文件
    ...mapActions('companyInfo', ['updateInfo']),   // 企业信息修改
    ...mapActions('regist', [
      'getAllCountryInfo',
      'getAllAgentsInfo',
      'getCompanyTypeOptions',
      'getIndustryTypeOptions',
      'getExhibitListAll'
    ]),
    // 删除多选文件
    // removeImage(fileId) {
    //   let param = {
    //     "customQueryParams": [
    //       {
    //         "findType": "EQ",
    //         "joinType": "And",
    //         "name": "file_id",
    //         "values": [
    //           fileId
    //         ]
    //       }
    //     ]
    //   };
    //   this.removeCpFileLkInfo(param).then(res => {
    //     // 移除页面文件名显示
    //     for (let i = 0; i < this.interWitnessNums.length; i++) {
    //       if (fileId === this.interWitnessNums[i].fileId) {
    //         this.interWitnessNums.splice(i, 1);
    //       }
    //     }
    //     for (let i = 0; i < this.countryRegion.length; i++) {
    //       if (fileId === this.countryRegion[i].fileId) {
    //         this.countryRegion.splice(i, 1);
    //       }
    //     }
    //     this.$message({
    //       message: '删除成功',
    //       type: 'success'
    //     });
    //   });
    // },
    // 保存提交
    submit(formName) {
      let param = {
        "ifoCompany": {

        },
        "modifyImpType": this.modifyImpType,
        "loginType": "0",
        "awardFileIds": this.identForm.awardFileIds,
        "otherExhFileIds": this.otherExh,
        "fortuneFileIds": this.identForm.fortuneFileIds,
        "propertyFileIds": this.identForm.propertyNum,
        "interCerFileIds": this.interCer

      };
      if (formName === 'epxConForm') {
        this.epxConForm.countryRegions = [this.epxConForm.countryRegionsF, this.epxConForm.countryRegionsS, this.epxConForm.countryRegionsT];
      }
      let model = this.$refs[formName].model;
      // console.log(model, 'medole');
      
      let _model = {};
      for (let key in model) { // 没值不传
        if (model[key] != null && model[key] !== '') {
          _model[key] = model[key];
        }
      }
      // param.ifoCompany = this.$refs[formName].model;
      param.ifoCompany = _model;
      // console.log(param, 'param');
      
      // this.updateInfo(param).then(resS => {
      //   this.$message({
      //     message: '修改成功',
      //     type: 'success'
      //   });
      // });
    },
    // 打开上传添加弹窗
    showFileName(successName, type) {
      this.dialogProduct = true;
      this.successName = successName;
      this.type = type;

    },
    // 关闭上传添加弹窗
    closeShow() {
      this.$refs.upload.clearFiles();
      this.dialogProduct = false;
    },

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
    interCerSuccess(responese, res, file) {
      let _this = this;
      let arm = [];
      if (responese.flag === "0") {
        _this.$refs.upload.clearFiles();
        _this.$message.error("文件上传失败");
      } else {
        _this.$message.success("文件上传成功");
        _this.identForm.interCerFileIds = responese.data.fileId;
        arm.push(responese.data.fileId);
        _this.interWitnessNums.push({ fileId: responese.data.fileId, fileName: _this.addUpload.fileName, note: _this.addUpload.fileName });
        _this.addUpload.fileName = "";
      }
      this.interCer = arm;
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
    },

    // 判断两个对象是否值相等
    isEquals(x, y) {
      if (x === y) {
        return true;
      }
      if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
      }
      if (x.constructor !== y.constructor) {
        return false;
      }

      for (let p in x) {
        if (x.hasOwnProperty(p)) {
          if (!y.hasOwnProperty(p)) {
            return false;
          }
          if (x[p] === y[p]) {
            continue;
          }
          if (typeof (x[p]) !== "object") {
            return false;
          }
          if (!Object.equals(x[p], y[p])) {
            return false;
          }
        }
      }
      for (let p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    },
    //页面提前准备
    createdGetSelect() { // 获取下拉框
      this.getAllCountryInfo().then(resS => {
        this.countries = resS;
      });
      this.getAllAgentsInfo().then(resT => {
        this.exhibitionAgents = resT;
      });
    }
  },
  created() {
    this.uploadApi = this.baseApi + '/api/manageCompanyInformation/uploadSingleFile'; // 单文件上传（企业LOGO，原产地，营业执照文件）
    this.identApi = this.baseApi + '/api/manageCompanyInformation/uploadInterCerOrOtherExh'; // 单文件上传（国际认证，其他国际展会）
    this.moreApi = this.baseApi + '/api/manageCompanyInformation/uploadMultiFiles'; // 多文件证明文件上传

    this.createdGetSelect();
    this.getCompanyTypeOptions(); // 企业类型
    this.getIndustryTypeOptions(); // 所属行业
    this.getTargetConstomSelect(); // 目标客户

    // let { companyId } = JSON.parse(this.$route.query.data);
    // console.log(this.$route.query.data, 'companyId');
    
    this.getCompanyInformationInfo({ companyId: this.companyId }).then(res => {
      // console.log("qiye", res);
      for (let i = 0; i < res.filesOfTypes.length; i++) {
        // 企业国际认证上传的文件
        if (res.filesOfTypes[i].type === "0") {
          this.interWitnessNums = res.filesOfTypes[i].filesInfo; // 企业国际认证上传的文件名称集合
          this.interCer = res.filesOfTypes[i].filesInfo.fileId; // 企业国际认证上传的文件ID
          // 企业知识产权上传的文件
        } else if (res.filesOfTypes[i].type === "1") {
          this.identForm.propertyNum = res.filesOfTypes[i].filesInfo.fileId; // 企业知识产权上传的文件ID
          // 企业获奖文件上传的文件
        } else if (res.filesOfTypes[i].type === "2") {
          this.identForm.awardFileIds = res.filesOfTypes[i].filesInfo.fileId; // 企业获奖文件上传的文件ID
          // 企业参加其他展会上传的文件
        } else if (res.filesOfTypes[i].type === "3") {
          this.countryRegion = res.filesOfTypes[i].filesInfo; // 企业参加其他展会上传的文件名称集合
          this.otherExh = res.filesOfTypes[i].filesInfo.fileId; // 企业参加其他展会上传的文件ID
          // 企业财富500强上传的文件
        } else if (res.filesOfTypes[i].type === "4") {
          this.identForm.fortuneFileIds = res.filesOfTypes[i].filesInfo.fileId; // 企业财富500强上传的文件ID
        }
      }
      this.boothStatus = res.boothStatus;
      // 不能修改重要信息，不能修改基本信息
      if (res.boothStatus === "0" || res.boothStatus === "2") {
        this.isUpdate = true; //不能修改基本信息
        this.ifRemove = false; // 不能删除图片
        this.modifyStatus = false; //不能修改重要信息
        // 能修改重要信息，能修改基本信息
      } else if (res.boothStatus === "3") {
        this.isUpdate = false;
        this.modifyStatus = true;
        //不能修改重要信息，能修改基本信息
      } else if (res.boothStatus === "1") {
        this.isUpdate = false;
        this.modifyStatus = false;
      }
      this.watchForm = JSON.parse(JSON.stringify(res.ifoCompany));
      // 可以修改重要信息（除代理归属）或仅修改重要信息中的代理归属
      if (res.modifyStatus === "3") {
        this.modifyStatus = true;
        // 不能修改重要信息
      } else if (res.modifyStatus === "0" || res.modifyStatus === "2") {
        this.modifyStatus = false;
        // 不能修改代理归属
      } else if (res.modifyStatus === "1") {
        this.exhId = "1"; // // 不能修改代理归属
        this.modifyStatus = true;
      }
      this.exhibitionAgentId = JSON.parse(JSON.stringify(res.ifoCompany.exhibitionAgentId)); // 代理归属ID
      this.impInfForm = JSON.parse(JSON.stringify(res.ifoCompany));// this.impInfForm = res.ifoCompany; // 重要信息赋值
      this.baseInfForm = JSON.parse(JSON.stringify(res.ifoCompany));// this.baseInfForm = res.ifoCompany; // 基础信息赋值
      this.identForm = JSON.parse(JSON.stringify(res.ifoCompany));// this.identForm = res.ifoCompany; // 认证获奖情况
      this.aptitudeForm = JSON.parse(JSON.stringify(res.ifoCompany));// this.aptitudeForm = res.ifoCompany; // 参展资质文件
      this.epxConForm = JSON.parse(JSON.stringify(res.ifoCompany));// this.epxConForm = res.ifoCompany; // 出口情况
      this.exhIdenForm = JSON.parse(JSON.stringify(res.ifoCompany));// this.exhIdenForm = res.ifoCompany; // 分支机构/代理情况
      this.epxConForm.countryRegions = JSON.parse(JSON.stringify(res.countryRegions));// this.epxConForm.countryRegions = res.countryRegions; // 主要出口地区
      let _this = this;

      for (let i = 0; i < res.filesOfTypes.length; i++) {
             // 企业国际认证的文件 （successName为复用功能，区分是国际认证的上传还是企业参加其他展会的上传）
        if (res.filesOfTypes[i].type === "0" && this.successName === 1) {
          for (let j = 0; j < res.filesOfTypes[i].filesInfo.length; j++) {
            _this.interWitnessNums.push(res.filesOfTypes[i].filesInfo[j].note); // 循环赋值企业国际认证上传的文件名称集合
          }
            // 企业参加其他展会
        } else if (res.filesOfTypes[i].type === "3" && this.successName === 2) {
          for (let j = 0; j < res.filesOfTypes[i].filesInfo.length; j++) {
            _this.countryRegion.push(res.filesOfTypes[i].filesInfo[j].note); // 循环赋值企业参加其他展会证明的的文件名称集合
          }
        }
      }
      if (res.countryRegions) {
        this.epxConForm.countryRegionsF = res.countryRegions[0]; // 主要出口地区1
        this.epxConForm.countryRegionsS = res.countryRegions[1]; // 主要出口地区2
        this.epxConForm.countryRegionsT = res.countryRegions[2]; // 主要出口地区3
      }
    });
    
  }
};
</script>
