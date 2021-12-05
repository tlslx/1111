/**
* @file 管理企业信息
* @author:weiwei
* @date:2019/4/4
*/
<template>
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="完善企业信息" name="first" v-loading="loading">
        <el-collapse @change="collapseChangeFn" v-model="collapseActiveName" accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <div class="collapse-title">
                <span>重要信息</span>
                <el-button type="text" class="save-button" @click.native.stop="submitOne('zyForm')" :disabled="saveOneDisabled">{{this.saveOneText}}</el-button>
              </div>
            </template>
            <el-form :model="zyInfoData" :rules="rulesOne" ref="zyForm" label-width="160px">
              <span style="color: #D5434C">*号为必填项 当届提交过展位申请或有参展记录的企业需提交信息修改申请，经审核后生效</span>
              <el-row>
                <el-col :span="12"><el-form-item label="企业英文名称:" prop="companyNameEn">
                  <el-input v-model="zyInfoData.companyNameEn" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="固定电话:" prop="fixed">
                  <el-input v-model="zyInfoData.fixed" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="企业中文名称:" prop="companyNameCh">
                  <el-input v-model="zyInfoData.companyNameCh" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="联系人:" prop="contact">
                  <el-input v-model="zyInfoData.contact" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="企业地址:" prop="companyAddressCh">
                  <el-input v-model="zyInfoData.companyAddressCh" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="网址:" prop="companyNetAddress">
                  <el-input v-model="zyInfoData.companyNetAddress" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="英文地址:" prop="companyAddressEn">
                  <el-input v-model="zyInfoData.companyAddressEn" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="邮箱:" prop="mail">
                  <el-input v-model="zyInfoData.mail" :disabled="this.zyDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="所在国家地区:" prop="countryRegionId">
                  <el-select v-model="zyInfoData.countryRegionId" :disabled="this.zyDisabled">
                    <el-option
                      v-for="item in countries" :key="item.countryRegionId"
                      :label="item.crChName" :value="item.countryRegionId">
                    </el-option>
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="代理归属:" prop="exhibitionAgentId">
                  <el-select v-model="zyInfoData.exhibitionAgentId" :disabled="this.dlDisabled">
                    <el-option
                      v-for="item in exhibitionAgents" :key="item.exhibitionAgentId"
                      :label="item.agentCh" :value="item.exhibitionAgentId">
                    </el-option>
                  </el-select>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="营业执照:" prop="licenseFile" :disabled="this.zyDisabled">
                  <el-upload  v-model="zyInfoData.licenseFile" :action="this.helpData.uploadApi" :limit="1"
                  :data="singleFiledata" :on-success="singleUploadSuccessyy" :on-error="singleUploadError"
                  :file-list="licenseFileList">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="原产地文件:" prop="sourceAreaFile" :disabled="this.zyDisabled">
                  <el-upload v-model="zyInfoData.sourceAreaFile" :action="this.helpData.uploadApi" :limit="1"
                  :data="singleFiledata" :on-success="singleUploadSuccessycd" :on-error="singleUploadError"
                  :file-list="sourceFileList">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item></el-col>
              </el-row>
            </el-form>
          </el-collapse-item>

          <el-dialog title="选择你接下来的进程" :visible.sync="selectOneCollapse">
            <el-form :data="selectOneCollapseForm">
              <el-form-item>
                <el-select v-model="selectOneCollapseForm.value" placeholder="请选择活动区域">
                  <el-option label="修改重要信息" value="0"></el-option>
                  <el-option label="修改代理归属" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="selectOneCollapse = false">确 定</el-button>
            </span>
          </el-dialog>

          <el-collapse-item name="2">
            <template slot="title">
              <div class="collapse-title">
                <span>基本信息</span>
                <el-button type="text" class="save-button" @click.native.stop="submitTwo('jbForm')">保存</el-button>
              </div>
            </template>
            <el-form :model="jbInfoData" :rules="rulesTwo" ref="jbForm" style="padding-top: 10px" label-width="160px">
              <el-row>
                <el-col :span="12"><el-form-item label="企业简称:" prop="enterpriseAbbreviation">
                  <el-input v-model="jbInfoData.enterpriseAbbreviation" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="部门:" prop="depart">
                  <el-input v-model="jbInfoData.depart" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="产品:" prop="product">
                  <el-input v-model="jbInfoData.product" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="职务:" prop="job">
                  <el-input v-model="jbInfoData.job" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="企业类型:" prop="companyType">
                  <el-select v-model="jbInfoData.companyType" :disabled="this.jbDisabled" clearable>
                    <el-option v-for="item in companyTypeOptionsData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="手机:" prop="telephone">
                  <el-input v-model="jbInfoData.telephone" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label=" " prop="companyTypeElse">
                  <el-input v-model="jbInfoData.companyTypeElse" :disabled="this.jbDisabled || this.jbInfoData.companyType != '05'"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="传真:" prop="fax">
                  <el-input v-model="jbInfoData.fax" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="所属行业:" prop="industry">
                  <el-select v-model="jbInfoData.industry" :disabled="this.jbDisabled">
                    <el-option v-for="item in industryTypeOptionsData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="省/洲:" prop="province">
                  <el-input v-model="jbInfoData.province" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="意向申请展位数量:" prop="intentionBoothNum">
                  <el-input v-model="jbInfoData.intentionBoothNum" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="市:" prop="city">
                  <el-input v-model="jbInfoData.city" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="意向申请届数:" prop="intentionExhSes">
                  <el-select v-model="jbInfoData.intentionExhSes" :disabled="this.jbDisabled">
                    <el-option v-for="item in exhibitListAllData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="邮编:" prop="postCode">
                  <el-input v-model="jbInfoData.postCode" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="企业logo:" prop="companyLogoFileId">
                  <el-upload :action="this.helpData.uploadApi" v-model="jbInfoData.companyLogoFileId" :limit="1"
                  :data="singleFiledata" :on-success="singleUploadSuccesslogo" :on-error="singleUploadError"
                  :file-list="logoFileList" list-type="picture" :disabled="this.jbDisabled">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="原产地:" prop="sourceArea">
                  <el-input v-model="jbInfoData.sourceArea" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="公司简介:" prop="companySummary">
                  <el-input type="textarea" v-model="jbInfoData.companySummary" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
            </el-form>
          </el-collapse-item>

          <el-collapse-item name="3">
            <template slot="title">
              <div class="collapse-title">
                <span>参展资质文件</span>
                <el-button type="text" class="save-button" @click.native.stop="submitThree">保存</el-button>
              </div>
            </template>
            <el-form :model="czInfoData" style="padding-top: 10px" label-width="160px">
              <el-row>
                <el-col :span="12"><el-form-item label="营业执照编码:" prop="licenseCode">
                  <el-input v-model="czInfoData.licenseCode" :disabled="this.jbDisabled"></el-input>
                </el-form-item></el-col>
              </el-row>
            </el-form>
          </el-collapse-item>

          <el-collapse-item name="4">
            <template slot="title">
              <div class="collapse-title">
                <span>认证获奖情况</span>
                <el-button type="text" class="save-button" @click.native.stop="submitFour">保存</el-button>
              </div>
            </template>
            <el-form :model="rzInfoData" style="padding-top: 10px" label-width="160px">
              <el-row>
                <el-col :span="12">
                  <!-- <el-form-item label="获得国际认证数量:" prop="interWitnessNum"><el-input v-model="rzInfoData.interWitnessNum"></el-input> -->
                  <el-form-item label="获得国际认证数量:"><el-input :value="this.renzheng.length" disabled></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                  <!-- <el-form-item label="企业/产品获奖数量:" prop="prizeNum"><el-input v-model="rzInfoData.prizeNum"></el-input></el-form-item> -->
                  <el-form-item label="企业/产品获奖数量:"><el-input :value="this.huojiang.length" disabled></el-input></el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="获得国际认证证明:">
                  <a v-for="(item, i) in this.renzheng" :key="i" :href="item.url" style="display: block;">{{item.name}}</a>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="企业/产品获奖证明:" prop="awardFileIds">
                  <el-upload v-model="rzInfoData.awardFileIds" :action="this.helpData.moreApi" :disabled="this.jbDisabled"
                    :data="moreFiledatahj" :on-success="moreUploadSuccesshj" :on-error="moreUploadError"
                    :on-remove = "moreUploadRemovehj" :file-list="huojiang">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item>
                  <!-- 国际认证上传文件本地展示 -->
                  <el-table :data="this.helpData.interCerFileIdsTable" v-if="this.helpData.interCerFileIdsTable.length" border
                    size='mini' :show-header="false">
                    <el-table-column label="文件名" prop="note"></el-table-column>
                    <el-table-column label="操作" prop="operate">
                      <template slot-scope="scope">
                        <el-button type="text" @click="deleteTableRZ(scope.row.fileId)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="是否参加其他国际展会:" prop="isAttendOtherExh">
                  <el-select v-model="rzInfoData.isAttendOtherExh" :disabled="this.jbDisabled">
                    <el-option v-for="item in helpData.isAttendOtherExhArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="获得国际认证证明:" prop="interCerFileIds">
                  <!-- <el-upload action="" v-model="rzInfoData.interCerFileIds"> -->
                    <el-button size="small" type="primary" @click="showUpDiarz" :disabled="this.jbDisabled">添加</el-button>
                  <!-- </el-upload> -->
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="参加国际展会名称:">
                  <a v-for="(item, i) in this.zhanhui" :key="i" :href="item.url" style="display: block;">{{item.name}}</a>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="获取知识产权/专利数量:">
                  <!-- <el-input v-model="rzInfoData.propertyNum"></el-input> -->
                  <el-input :value="this.zhishi.length" disabled></el-input>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item>
                  <!-- 展会上传文件本地展示 -->
                  <el-table :data="this.helpData.otherExhFileIdsTable" v-if="this.helpData.otherExhFileIdsTable.length" border
                    size='mini' :show-header="false">
                    <el-table-column label="文件名" prop="note"></el-table-column>
                    <el-table-column label="操作" prop="operate">
                      <template slot-scope="scope">
                        <el-button type="text" @click="deleteTableZH(scope.row.fileId)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="知识产权/专利证明:" prop="propertyFileIds">
                  <el-upload :action="this.helpData.moreApi" v-model="rzInfoData.propertyFileIds" :disabled="this.jbDisabled"
                    :data="moreFiledatazs" :on-success="moreUploadSuccesszs" :on-error="moreUploadError"
                    :on-remove = "moreUploadRemovezs" :file-list="zhishi">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item></el-col>
                <el-col :span="12"><el-form-item label="上传相关凭证:" prop="otherExhFileIds">
                  <!-- <el-upload action="" v-model="rzInfoData.otherExhFileIds"> -->
                    <el-button size="small" type="primary" @click="showUpDiazh" :disabled="this.jbDisabled">添加</el-button>
                  <!-- </el-upload> -->
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="是否财富五百强企业或子公司:" prop="isFortune">
                  <el-select v-model="rzInfoData.isFortune" :disabled="this.jbDisabled">
                    <el-option v-for="item in helpData.isFortuneArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><el-form-item label="上传相关凭证:" prop="fortuneFileIds">
                  <el-upload v-model="rzInfoData.fortuneFileIds" :action="this.helpData.moreApi" :disabled="this.jbDisabled"
                    :data="moreFiledataq" :on-success="moreUploadSuccessq" :on-error="moreUploadError"
                    :on-remove = "moreUploadRemoveq" :file-list="fiveh">
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item></el-col>
              </el-row>
            </el-form>
          </el-collapse-item>

          <el-dialog title="添加" :visible.sync="upDiarz">
            <!-- renzheng :file-list="renzheng"-->
            <el-form :model="identFiledatarz">
              <el-form-item label="名称:" size="small">
                <el-input v-model="identFiledatarz.note"></el-input>
              </el-form-item>
              <el-form-item label="上传" size="small">
                <el-upload ref="renzheng" :action="this.helpData.identApi" :data="identFiledatarz"
                  :on-success="addSuccessrz" :on-error="addError" :auto-upload="false" :limit="1">
                  <el-button size="small" type="primary">选择</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="upDiarz = false">取 消</el-button>
              <el-button type="primary" @click="submitRZ">确定上传</el-button>
            </span>
          </el-dialog>

          <el-dialog title="添加" :visible.sync="upDiazh">
            <!-- zhanhui :file-list="zhanhui"-->
            <el-form :model="identFiledatazh">
              <el-form-item label="名称:" size="small">
                <el-input v-model="identFiledatazh.note"></el-input>
              </el-form-item>
              <el-form-item label="上传" size="small">
                <el-upload ref="zhanhui" :action="this.helpData.identApi" :data="identFiledatazh"
                  :on-success="addSuccesszh" :on-error="addError" :auto-upload="false" :limit="1">
                  <el-button size="small" type="primary">选择</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="upDiazh = false">取 消</el-button>
              <el-button type="primary" @click="submitZH">确定上传</el-button>
            </span>
          </el-dialog>

          <el-collapse-item name="5">
            <template slot="title">
              <div class="collapse-title">
                <span>分支机构/代理情况</span>
                <el-button type="text" class="save-button" @click.native.stop="submitFive">保存</el-button>
              </div>
            </template>
            <el-form :model="fzInfoData" style="padding-top: 10px" label-width="160px">
              <el-form-item>
                <el-checkbox-group v-model="helpData.branchCheckbox" :disabled="this.jbDisabled">
                  <el-checkbox label="1" name="type">本公司有分支机构</el-checkbox>
                  <el-row>
                    <el-col :span="12"><el-form-item label="分支机构名称:" prop="branchOrgName">
                      <el-input v-model="fzInfoData.branchOrgName" :disabled="this.jbDisabled"></el-input>
                    </el-form-item></el-col>
                    <el-col :span="12"><el-form-item label="地址:" prop="branchOrgAddress">
                      <el-input v-model="fzInfoData.branchOrgAddress" :disabled="this.jbDisabled"></el-input>
                    </el-form-item></el-col>
                  </el-row>
                  <el-checkbox label="2" name="type">本公司有代理商</el-checkbox>
                  <el-row>
                    <el-col :span="12"><el-form-item label="代理商名称:" prop="branchAgentName">
                      <el-input v-model="fzInfoData.branchAgentName" :disabled="this.jbDisabled"></el-input>
                    </el-form-item></el-col>
                    <el-col :span="12"><el-form-item label="地址:" prop="branchAgentAddress">
                      <el-input v-model="fzInfoData.branchAgentAddress" :disabled="this.jbDisabled"></el-input>
                    </el-form-item></el-col>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </el-collapse-item>

          <el-collapse-item name="6">
            <template slot="title">
              <div class="collapse-title">
                <span>出口情况</span>
                <el-button type="text" class="save-button" @click.native.stop="submitSix">保存</el-button>
              </div>
            </template>
            <el-form :model="ckInfoData" style="padding-top: 10px" label-width="160px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="年销售额:" prop="yearSales">
                    <el-input v-model="ckInfoData.yearSales" :disabled="this.jbDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主要出口地区1:" prop="countryRegionsF">
                    <el-input v-model="ckInfoData.countryRegionsF" :disabled="this.jbDisabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="年出口额:" prop="yearExp">
                    <el-input v-model="ckInfoData.yearExp" :disabled="this.jbDisabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主要出口地区2:" prop="countryRegionsS">
                    <el-input v-model="ckInfoData.countryRegionsS" :disabled="this.jbDisabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="目标客户:" prop="targetClient">
                    <el-select v-model="ckInfoData.targetClient" :disabled="this.jbDisabled">
                      <el-option v-for="item in targetConstomSelectData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主要出口地区3:" prop="countryRegionsT">
                    <el-input v-model="ckInfoData.countryRegionsT" :disabled="this.jbDisabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import store from '@/scripts/framework/store/';
const required = { required: true, message: '请输入', trigger: 'blur' };
// let collapseChangeFnVal = function() {
//   var _this = this;
//   if (_this.collapseActiveName.indexOf('1') !== -1) { // 如果打开了第一个弹框
//     // console.log(this.collapseActiveName, 'collapseActiveName');
//     this.selectOneCollapse = true; // 打开弹框
//   }
// };
export default {
  data() {
    // let companyTypeValid = (rule, value, callback) => { // 公司类型下拉框
    //   if (!value && !this.jbInfoData.companyTypeElse) {
    //     return callback(new Error('公司类型不能为空'));
    //   } else if (value && this.jbInfoData.companyTypeElse) {
    //     console.log(value, this.jbInfoData.companyTypeElse, 'ct');
    //     return callback(new Error('公司类型重复填写'));
    //   }
    // };
    // let companyTypeElseValid = (rule, value, callback) => { // 公司类型输入框
    //   if (!value && !this.jbInfoData.companyType) {
    //     return callback(new Error('公司类型不能为空'));
    //   } else if (value && this.jbInfoData.companyType) {
    //     console.log(value, this.jbInfoData.companyType, 'ctelse');
    //     return callback(new Error('公司类型重复填写'));
    //   }
    // };
    return {
      loading: true,
      baseApi: process.env.API_POT_URL,
      saveOneText: '保存',
      activeName: 'first',
      collapseActiveName: '',
      selectOneCollapse: false, // collapse one 弹框
      selectOneCollapseForm: {
        value: ''
      },
      infoParams: { // 查询 loginId: 'aaa', loginType: '0'
        loginId: null
      },
      // singleFiledata: { creatorId: 'test', creatorName: 'test' },
      // moreFiledatazs: { creatorId: 'test', creatorName: 'test', type: '1' }, //zhishi
      // moreFiledatahj: { creatorId: 'test', creatorName: 'test', type: '2' }, //huojiang
      // moreFiledataq: { creatorId: 'test', creatorName: 'test', type: '4' }, //500qiang
      // identFiledatarz: { creatorId: 'test', creatorName: 'test', type: '0', note: '' }, //renzheng
      // identFiledatazh: { creatorId: 'test', creatorName: 'test', type: '3', note: '' }, //zhanhui

      singleFiledata: { },
      moreFiledatazs: { type: '1' }, //zhishi
      moreFiledatahj: { type: '2' }, //huojiang
      moreFiledataq: { type: '4' }, //500qiang
      identFiledatarz: { type: '0', note: '' }, //renzheng
      identFiledatazh: { type: '3', note: '' }, //zhanhui
      zyInfoData: { // 重要
        companyNameEn: '',
        fixed: '', // 固话
        companyNameCh: '',
        contact: '',
        companyAddressCh: '',
        companyAddressEn: '',
        companyNetAddress: '',
        countryRegionId: '', // 所在国家地区
        mail: '',
        licenseFile: '', // 营业执照
        exhibitionAgentId: '', // 代理归属
        sourceAreaFile: '' // 原产地文件
      },
      jbInfoData: { // base
        enterpriseAbbreviation: '',
        depart: '',
        product: '',
        job: '',
        companyType: '',
        telephone: '',
        companyTypeElse: '',
        fax: '',
        industry: '',
        intentionBoothNum: '',
        intentionExhSes: '',
        companyLogoFileId: '',
        companySummary: '',
        province: '',
        city: '',
        postCode: '',
        sourceArea: ''
      },
      czInfoData: { // 参展
        licenseCode: '' // 营业执照编码
      },
      rzInfoData: { // 认证
        // interWitnessNum: '', // 获得国际认证数量
        // prizeNum: '',
        awardFileIds: [], // huojiang
        isAttendOtherExh: '', // 是否参加其他国际展会
        interCerFileIds: [],
        // propertyNum: '',
        propertyFileIds: [], // zhishi
        otherExhFileIds: [],
        isFortune: '', // 是否财富五百强企业或子公司
        fortuneFileIds: [] // 500qiang
      },
      fzInfoData: { // 分支
        branchOrgName: '', //分支机构名称
        branchOrgAddress: '', // 地址
        branchAgentName: '', // 代理商名称
        branchAgentAddress: '' // 地址
      },
      ckInfoData: { // 出口
        yearSales: '', //年销售额
        countryRegionsF: '', // 主要出口地区1
        yearExp: '', // 年出口额
        countryRegionsS: '', // 主要出口地区2
        targetClient: '', // 目标客户
        countryRegionsT: '' //主要出口地区3
      },
      helpData: {
        isAttendOtherExhArr: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
        isFortuneArr: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
        branchCheckbox: [], // 1分支机构 2代理商
        boothStatus: '',
        modifyImpType: '1', //重要信息-传过来的状态
        uploadApi: "", // 上传地址 请求
        identApi: "", // 请求
        moreApi: "", // 请求
        awardFileIds: [], // jiangjin // 提交用
        fortuneFileIds: [], // 500q
        interCerFileIds: [], // renzheng
        interCerFileIdsTable: [], // renzheng 本地展示
        otherExhFileIds: [], // zhanhui
        otherExhFileIdsTable: [], // zhanhui 本地展示
        propertyFileIds: [] // zhuanli
      },
      // 以下fileList
      licenseFileList: [],
      sourceFileList: [],
      logoFileList: [],
      countries: [], // 1.所在国家地区
      exhibitionAgents: [], // 1.代理归属
      saveOneDisabled: false, // 重要信息的保存按钮
      zyDisabled: false, // 重要-是否禁用
      jbDisabled: false, // 基本-是否禁用
      dlDisabled: false, // 代理-是否禁用
      renzheng: [],
      zhishi: [],
      huojiang: [],
      zhanhui: [],
      fiveh: [],
      upDiarz: false, // 上传弹框 人证
      upDiazh: false, // 上传弹框 展会

      rulesOne: {//验证
        companyNameEn: [required],
        fixed: [required], // 固话
        companyNameCh: [required],
        contact: [required],
        companyAddressCh: [required],
        companyAddressEn: [required],
        companyNetAddress: [required],
        countryRegionId: [required], // 所在国家地区
        mail: [required],
        licenseFile: [required], // 营业执照
        exhibitionAgentId: [required], // 代理归属
        sourceAreaFile: [required] // 原产地文件
      },
      rulesTwo: {
        enterpriseAbbreviation: [required],
        depart: [required],
        product: [required],
        job: [required],
        // companyType: [{ validator: companyTypeValid, trigger: 'blur' }],
        companyType: [required],
        telephone: [required],
        // companyTypeElse: [{ validator: companyTypeElseValid, trigger: 'blur' }],
        fax: [required],
        industry: [required],
        intentionBoothNum: [required],
        intentionExhSes: [required],
        companyLogoFileId: [required],
        companySummary: [required],
        province: [required],
        city: [required],
        postCode: [required],
        sourceArea: [required]
      }
      // tab2
      // searchForm: {
      //   state: ''
      // }
    };
  },
  computed: {
    ...mapGetters('companyInfo', ['getComInfo', 'getCompany', 'targetConstomSelectData']),
    ...mapGetters('regist', ['companyTypeOptionsData', 'industryTypeOptionsData', 'exhibitListAllData']),
    selectOneCollapseFormValue() { // 选择collapse1进程
      return this.selectOneCollapseForm.value;
    },
    exhibitionAgentId() {
      return this.zyInfoData.exhibitionAgentId;
    },
    companyType() {
      return this.jbInfoData.companyType; // 企业类型是否选其他
    },
    oneParams() { // 1
      let _ifoCompany = this.zyInfoData;
      // _ifoCompany.companyId = this.infoParams.loginId;
      // _ifoCompany.creatorId = 'test';
      // _ifoCompany.creatorName = 'test';
      // _ifoCompany.modifierId = 'test';
      // _ifoCompany.modifierName = 'test';
      return {
        ifoCompany: _ifoCompany,
        boothStatus: this.helpData.boothStatus, // 传过来的状态
        flag: '1'
        // loginType: "0"
      };
    },
    twoParams() { // 2
      let _ifoCompany = this.jbInfoData;
      // _ifoCompany.companyId = this.infoParams.loginId;
      // _ifoCompany.creatorId = 'test';
      // _ifoCompany.creatorName = 'test';
      // _ifoCompany.modifierId = 'test';
      // _ifoCompany.modifierName = 'test';
      return {
        ifoCompany: _ifoCompany,
        boothStatus: this.helpData.boothStatus // 传过来的状态
        // modifyImpType: '0'
        // loginType: "0"
      };
    },
    threeParams() { // 3
      let _ifoCompany = this.czInfoData;
      // _ifoCompany.companyId = this.infoParams.loginId;
      // _ifoCompany.creatorId = 'test';
      // _ifoCompany.creatorName = 'test';
      // _ifoCompany.modifierId = 'test';
      // _ifoCompany.modifierName = 'test';
      return {
        ifoCompany: _ifoCompany,
        boothStatus: this.helpData.boothStatus
        // loginType: "0"
      };
    },
    fourParams() { // 4
      let _ifoCompany = this.rzInfoData;
      // _ifoCompany.companyId = this.infoParams.loginId;
      // _ifoCompany.creatorId = 'test';
      // _ifoCompany.creatorName = 'test';
      // _ifoCompany.modifierId = 'test';
      // _ifoCompany.modifierName = 'test';
      return {
        ifoCompany: _ifoCompany,
        boothStatus: this.helpData.boothStatus,
        loginType: "0",
        awardFileIds: this.helpData.awardFileIds, // jiangjin // 提交用
        fortuneFileIds: this.helpData.fortuneFileIds, // 500q
        interCerFileIds: this.helpData.interCerFileIds, // renzheng
        otherExhFileIds: this.helpData.otherExhFileIds, // zhanhui
        propertyFileIds: this.helpData.propertyFileIds // zhuanli
      };
    },
    fiveParams() { // 5
      let _ifoCompany = this.fzInfoData;
      // _ifoCompany.companyId = this.infoParams.loginId;
      // _ifoCompany.creatorId = 'test';
      // _ifoCompany.creatorName = 'test';
      // _ifoCompany.modifierId = 'test';
      // _ifoCompany.modifierName = 'test';
      return {
        ifoCompany: _ifoCompany,
        boothStatus: this.helpData.boothStatus
        // loginType: "0"
      };
    },
    sixParams() { // 6
      let _ifoCompany = {};
      _ifoCompany.yearSales = this.ckInfoData.yearSales;
      _ifoCompany.yearExp = this.ckInfoData.yearExp;
      _ifoCompany.targetClient = this.ckInfoData.targetClient;
      let _countryRegions = [this.ckInfoData.countryRegionsF, this.ckInfoData.countryRegionsS,
        this.ckInfoData.countryRegionsT];
      // _ifoCompany.companyId = this.infoParams.loginId;
      // _ifoCompany.creatorId = 'test';
      // _ifoCompany.creatorName = 'test';
      // _ifoCompany.modifierId = 'test';
      // _ifoCompany.modifierName = 'test';
      return {
        ifoCompany: _ifoCompany,
        countryRegions: _countryRegions,
        boothStatus: this.helpData.boothStatus
        // loginType: "0"
      };
    },
    tableParam() {
      let cs = {
        "findType": "EQ",
        "joinType": "And",
        "name": "approve_status",
        "values": [
          "0"
        ]
      };
      let fs = {
        "findType": "EQ",
        "joinType": "And",
        "name": "final_approve_status",
        "values": [
          "0"
        ]
      };
      let _params = {
        customQueryParams: [
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
              "aaa"
            ]
          }
        ]
      };
      const state = this.searchForm.state;
      switch (state) {
        case '0':
          cs.values[0] = '0';
          fs.values[0] = '0';
          _params.customQueryParams[2] = cs;
          _params.customQueryParams[3] = fs;
          break;
        case '1':
          cs.values[0] = '2';
          fs.values[0] = '0';
          _params.customQueryParams[2] = cs;
          _params.customQueryParams[3] = fs;
          break;
        case '2':
          cs.values[0] = '1';
          fs.values[0] = '0';
          _params.customQueryParams[2] = cs;
          _params.customQueryParams[3] = fs;
          break;
        case '3':
          cs.values[0] = '2';
          fs.values[0] = '2';
          _params.customQueryParams[2] = cs;
          _params.customQueryParams[3] = fs;
          break;
        case '4':
          cs.values[0] = '2';
          fs.values[0] = '1';
          _params.customQueryParams[2] = cs;
          _params.customQueryParams[3] = fs;
          break;
        default: '';
      }
      return _params;
    }
  },
  watch: {
    selectOneCollapseFormValue(val) {
      switch (val) {
        case '0': // 选重要信息
          this.zyDisabled = false;
          this.dlDisabled = true;
          break;
        case '1': // 选代理归属
          this.zyDisabled = true;
          this.dlDisabled = false;
          // 修改验证
          break;
        case '':
          return;
        default: '';
      }
    },
    companyType(val) {
      switch (val) {
        case '05':
          this.rulesTwo.companyTypeElse = [{ required: true, trigger: 'blur' }];
          break;
        default:
          delete this.rulesTwo.companyTypeElse;
      }
    }
  },
  methods: {
    ...mapActions('companyInfo', ['getCompanyInformationInfo', 'updateInfo', 'getTargetConstomSelect']), // , 'getCompanyUpdateHistoryInfo'
    ...mapActions('regist', ['getAllCountryInfo', 'getAllAgentsInfo', 'getCompanyTypeOptions', 'getIndustryTypeOptions', 'getExhibitListAll']),
    // 点击collapse弹框
    collapseChangeFn() {

    },
    showUpDiarz() { // 显示弹框-认证
      this.upDiarz = true;
    },
    showUpDiazh() { // 显示弹框-展会
      this.upDiazh = true;
    },
    submitSix() {
      this.updateInfo(this.sixParams).then(res => {
        this.$message.success('更新完善公司信息成功');
        this.createdGetInfo();
      });
    },
    submitFive() {
      this.updateInfo(this.fiveParams).then(res => {
        this.$message.success('更新完善公司信息成功');
        this.createdGetInfo();
      });
    },
    submitFour() {
      let _fourParams = this.fourParams;

      let interCerFileIdsTable = this.helpData.interCerFileIdsTable;
      if (interCerFileIdsTable.length > 0) { // 国际认证 与原数组合并
        let newArr = [];
        interCerFileIdsTable.map(val => {
          newArr.push(val.fileId);
        });
        _fourParams.interCerFileIds = [..._fourParams.interCerFileIds, ...newArr];
      }

      let otherExhFileIdsTable = this.helpData.otherExhFileIdsTable;
      if (otherExhFileIdsTable.length > 0) { // 展会 与原数组合并
        let newArr = [];
        otherExhFileIdsTable.map(val => {
          newArr.push(val.fileId);
        });
        _fourParams.otherExhFileIds = [..._fourParams.otherExhFileIds, ...newArr];
      }
      this.updateInfo(_fourParams).then(res => {
        this.$message.success('更新完善公司信息成功');
        this.createdGetInfo();
        this.helpData.interCerFileIdsTable = [];
        this.helpData.otherExhFileIdsTable = [];
      });
    },

    // 特殊多文件 国际认证 本地删除
    deleteTableRZ(_fileId) {
      let interCerFileIdsTable = this.helpData.interCerFileIdsTable;
      interCerFileIdsTable.splice(interCerFileIdsTable.findIndex(item => item.fileId === _fileId), 1); // 删除
    },
    // 特殊多文件 展会 本地删除
    deleteTableZH(_fileId) {
      let otherExhFileIdsTable = this.helpData.otherExhFileIdsTable;
      otherExhFileIdsTable.splice(otherExhFileIdsTable.findIndex(item => item.fileId === _fileId), 1); // 删除
    },

    // 多文件-新增
    moreUploadSuccesshj(res, file) { // huojiang
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data.fileIds[0]; // 本地增加
        this.helpData.awardFileIds.push(item);
      }
    },
    moreUploadSuccessq(res, file) { // 500qiang
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data.fileIds[0]; // 本地增加
        this.helpData.fortuneFileIds.push(item);
      }
    },
    moreUploadSuccesszs(res, file) { //zhishi
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功');
        let item = file.response.data.fileIds[0]; // 本地增加
        this.helpData.propertyFileIds.push(item);
      }
    },

    // 多文件-删除
    moreUploadRemovehj(file, fileList) { // 获奖
      let awardFileIds = this.helpData.awardFileIds;
      if (file.response) {
        let _item = file.response.data[0];
        awardFileIds.splice(awardFileIds.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        awardFileIds.splice(awardFileIds.findIndex(item => item === _item), 1);
      }
    },
    moreUploadRemovezs(file, fileList) { // 知识
      let propertyFileIds = this.helpData.propertyFileIds;
      if (file.response) {
        let _item = file.response.data[0];
        propertyFileIds.splice(propertyFileIds.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        propertyFileIds.splice(propertyFileIds.findIndex(item => item === _item), 1);
      }
    },
    moreUploadRemoveq(file, fileList) {
      let fortuneFileIds = this.helpData.fortuneFileIds;
      if (file.response) {
        let _item = file.response.data[0];
        fortuneFileIds.splice(fortuneFileIds.findIndex(item => item === _item), 1);
      } else {
        let _item = file.url.split('=')[1];
        fortuneFileIds.splice(fortuneFileIds.findIndex(item => item === _item), 1);
      }
    },

    moreUploadError() {
      this.$message.error('上传失败');
    },

    addSuccessrz(res) { // 特殊单文件 认证
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功，请保存');
        // this.helpData.interCerFileIds = [res.data.fileId];
        // this.helpData.interCerFileIds.push(res.data.fileId); // 先不添加 需要本地维护
        this.helpData.interCerFileIdsTable.push({ fileId: res.data.fileId, note: this.identFiledatarz.note ? this.identFiledatarz.note : '认证文件' });
        this.$refs.renzheng.clearFiles();
        this.identFiledatarz.note = '';
        this.upDiarz = false;
      }
    },
    submitRZ() {
      this.$refs.renzheng.submit();
    },
    addSuccesszh(res) { // 特殊单文件 展会
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('上传成功，请保存');
        // this.helpData.otherExhFileIds = [res.data.fileId];
        // this.helpData.otherExhFileIds.push(res.data.fileId);
        this.helpData.otherExhFileIdsTable.push({ fileId: res.data.fileId, note: this.identFiledatazh.note ? this.identFiledatazh.note : '展会文件' });
        this.$refs.zhanhui.clearFiles();
        this.identFiledatazh.note = '';
        this.upDiazh = false;
      }
    },
    submitZH() {
      this.$refs.zhanhui.submit();
    },
    addError() { // 特殊单文件
      this.$message.error('上传失败');
    },

    submitOne(formName) { // 1
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateInfo(this.oneParams).then(res => {
            this.$message.success('更新完善公司信息成功');
            this.createdGetInfo();
          });
        } else {
          this.$message.error('请将表单填写完整');
        }
      });
    },
    submitTwo(formName) { // 2
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateInfo(this.twoParams).then(res => {
            this.$message.success('更新完善公司信息成功');
            this.createdGetInfo();
          });
        } else {
          this.$message.error('请将表单填写完整');
        }
      });
    },
    submitThree() { // 3
      this.updateInfo(this.threeParams).then(res => {
        this.$message.success('更新完善公司信息成功');
        this.createdGetInfo();
      });
    },
    singleUploadSuccessyy(res) { // 营业执照
      this.zyInfoData.licenseFile = res.data.fileId;
      this.$message.success('上传成功');
    },
    singleUploadSuccessycd(res) { // 原产地
      this.zyInfoData.sourceAreaFile = res.data.fileId;
      this.$message.success('上传成功');
    },
    singleUploadSuccesslogo(res) { // logo图片
      this.jbInfoData.companyLogoFileId = res.data.fileId;
      this.$message.success('上传成功');
    },
    singleUploadError() {
      this.$message.error('上传失败');
    },
    // 准备
    createdGetSelect() { // 获取下拉框
      Promise.all([this.getAllCountryInfo(), this.getAllAgentsInfo()]).then(([resS, resT]) => {
        this.countries = resS;
        this.exhibitionAgents = resT;
      }).then(() => {
        this.createdGetInfo(); // 页面初始化
      });
      setTimeout(() => { // 如果请求失败 计时器清除转圈
        this.loading = false;
      }, 6500);
    },
    createdGetInfo() { // 页面初始化
      this.getCompanyInformationInfo(this.infoParams).then(res => {
        // console.log(this.getComInfo, 'getComInfo');
        // 重要
        this.zyInfoData.companyNameEn = this.getComInfo.ifoCompany.companyNameEn;
        this.zyInfoData.fixed = this.getComInfo.ifoCompany.fixed; // 固话
        this.zyInfoData.companyNameCh = this.getComInfo.ifoCompany.companyNameCh;
        this.zyInfoData.contact = this.getComInfo.ifoCompany.contact;
        this.zyInfoData.companyAddressCh = this.getComInfo.ifoCompany.companyAddressCh;
        this.zyInfoData.companyNetAddress = this.getComInfo.ifoCompany.companyNetAddress;
        this.zyInfoData.companyAddressEn = this.getComInfo.ifoCompany.companyAddressEn;
        this.zyInfoData.countryRegionId = this.getComInfo.ifoCompany.countryRegionId; // 所在国家地区
        this.zyInfoData.mail = this.getComInfo.ifoCompany.mail;
        if (this.getComInfo.licenseFile && this.getComInfo.licenseFile.fileId) {
          this.zyInfoData.licenseFile = this.getComInfo.licenseFile.fileId; // 营业执照
        } else {
          this.zyInfoData.licenseFile = null;
        }
        this.zyInfoData.exhibitionAgentId = this.getComInfo.ifoCompany.exhibitionAgentId; // 代理归属
        if (this.getComInfo.sourceFile && this.getComInfo.sourceFile.fileId) {
          this.zyInfoData.sourceAreaFile = this.zyInfoData.sourceAreaFile.fileId; // 原产地文件
        } else {
          this.zyInfoData.sourceAreaFile = null;
        }
        this.licenseFileList = this.getComInfo.licenseFileList;
        this.sourceFileList = this.getComInfo.sourceFileList;
        // base
        this.jbInfoData.enterpriseAbbreviation = this.getComInfo.ifoCompany.enterpriseAbbreviation;
        this.jbInfoData.depart = this.getComInfo.ifoCompany.depart;
        this.jbInfoData.product = this.getComInfo.ifoCompany.product;
        this.jbInfoData.job = this.getComInfo.ifoCompany.job;
        this.jbInfoData.companyType = this.getComInfo.ifoCompany.companyType;
        this.jbInfoData.telephone = this.getComInfo.ifoCompany.telephone;
        this.jbInfoData.companyTypeElse = this.getComInfo.companyTypeElse;
        this.jbInfoData.fax = this.getComInfo.ifoCompany.fax;
        this.jbInfoData.industry = this.getComInfo.ifoCompany.industry;
        this.jbInfoData.intentionBoothNum = this.getComInfo.ifoCompany.intentionBoothNum;
        this.jbInfoData.intentionExhSes = this.getComInfo.ifoCompany.intentionExhSes;
        if (this.getComInfo.logoFile && this.getComInfo.logoFile.fileId) {
          this.jbInfoData.companyLogoFileId = this.getComInfo.logoFile.fileId; // logo
        } else {
          this.jbInfoData.companyLogoFileId = null;
        }
        this.jbInfoData.companySummary = this.getComInfo.ifoCompany.companySummary;
        this.jbInfoData.province = this.getComInfo.ifoCompany.province,
        this.jbInfoData.city = this.getComInfo.ifoCompany.city,
        this.jbInfoData.postCode = this.getComInfo.ifoCompany.postCode,
        this.jbInfoData.sourceArea = this.getComInfo.ifoCompany.sourceArea,
        this.logoFileList = this.getComInfo.logoFileList;
        // 资质
        this.czInfoData.licenseCode = this.getComInfo.ifoCompany.licenseCode;
        // 认证
        this.rzInfoData.isAttendOtherExh = this.getComInfo.ifoCompany.isAttendOtherExh; // 是否参加其他国际展会
        this.rzInfoData.isFortune = this.getComInfo.ifoCompany.isFortune; // 是否财富五百强企业或子公司
        // 多文件上传
        this.getComInfo.filesOfTypes.forEach(ele => {
          var type = ele.type;
          switch (type) {
            case '0':
              ele.filesInfo.forEach(e => {
                if (e.fileId) {
                  let item = e.fileId;
                  this.rzInfoData.interCerFileIds.push(item);
                }
              });
              // this.rzInfoData.interCerFileIds = ele.filesInfo;
              break;
            case '1':
              ele.filesInfo.forEach(e => {
                if (e.fileId) {
                  let item = e.fileId;
                  this.rzInfoData.propertyFileIds.push(item);
                }
              });
              // this.rzInfoData.propertyFileIds = ele.filesInfo;
              break;
            case '2':
              ele.filesInfo.forEach(e => {
                if (e.fileId) {
                  let item = e.fileId;
                  this.rzInfoData.awardFileIds.push(item);
                }
              });
              // this.rzInfoData.awardFileIds = ele.filesInfo;
              break;
            case '3':
              ele.filesInfo.forEach(e => {
                if (e.fileId) {
                  let item = e.fileId;
                  this.rzInfoData.otherExhFileIds.push(item);
                }
              });
              this.rzInfoData.otherExhFileIds = ele.filesInfo;
              break;
            case '4':
              ele.filesInfo.forEach(e => {
                if (e.fileId) {
                  let item = e.fileId;
                  this.rzInfoData.fortuneFileIds.push(item);
                }
              });
              // this.rzInfoData.fortuneFileIds = ele.filesInfo;
              break;
            default:
              break;
          }
        });

        // 本地展示
        this.renzheng = this.getComInfo.renzheng; // filelist
        this.zhishi = this.getComInfo.zhishi;
        this.huojiang = this.getComInfo.huojiang;
        this.zhanhui = this.getComInfo.zhanhui;
        this.fiveh = this.getComInfo.fiveh;
        // 本地增删
        this.helpData.awardFileIds = JSON.parse(JSON.stringify(this.getComInfo.havehuojiang)); // 获奖 - 原数组
        this.helpData.fortuneFileIds = JSON.parse(JSON.stringify(this.getComInfo.havefiveh)); // 500强
        this.helpData.propertyFileIds = JSON.parse(JSON.stringify(this.getComInfo.havezhishi)); // 知识
        this.helpData.interCerFileIds = JSON.parse(JSON.stringify(this.getComInfo.haverenzheng)); // 知识
        this.helpData.otherExhFileIds = JSON.parse(JSON.stringify(this.getComInfo.havezhanhui)); // zhanhui
        // 分支
        this.fzInfoData.branchOrgName = this.getComInfo.ifoCompany.branchOrgName; //分支机构名称
        this.fzInfoData.branchOrgAddress = this.getComInfo.ifoCompany.branchOrgAddress; // 地址
        this.fzInfoData.branchAgentName = this.getComInfo.ifoCompany.branchAgentName; // 代理商名称
        this.fzInfoData.branchAgentAddress = this.getComInfo.ifoCompany.branchAgentAddress; // 地址
        // 出口
        this.ckInfoData.yearSales = this.getComInfo.ifoCompany.yearSales; //年销售额
        this.ckInfoData.yearExp = this.getComInfo.ifoCompany.yearExp; // 年出口额
        this.ckInfoData.targetClient = this.getComInfo.ifoCompany.targetClient; // 目标客户
        this.ckInfoData.countryRegionsF = this.getComInfo.countryRegionsF; // 主要出口地区1
        this.ckInfoData.countryRegionsS = this.getComInfo.countryRegionsS;
        this.ckInfoData.countryRegionsT = this.getComInfo.countryRegionsT;

        this.helpData.boothStatus = this.getComInfo.boothStatus; // 状态
        // 禁用处理-初始赋值
        if (this.getComInfo.boothStatus === '0' || this.getComInfo.boothStatus === '1' || this.getComInfo.boothStatus === '2') {
          // 禁用重要信息-可提交申请
          this.zyDisabled = false; // 不能直接改
          this.dlDisabled = false;
          this.jbDisabled = true;
          this.saveOneText = '提交修改申请';
          if (this.getComInfo.boothStatus === '1') {
            // 能修改基本信息
            this.jbDisabled = false;
            // this.saveOneText = '保存';
          }

          if (this.getComInfo.modifyStatus === '0' && this.getComInfo.modifyStatus === '2') {
            this.zyDisabled = true;
            this.dlDisabled = true;
            this.saveOneText = '提交修改申请'; // 不许修改申请 不许提交
            this.saveOneDisabled = true; // 不许修改申请 不许提交
          } else if (this.getComInfo.modifyStatus === '1') {
            this.saveOneText = '保存';
            this.zyDisabled = false;
            this.dlDisabled = true;
          } else if (this.getComInfo.modifyStatus === '3') {
            this.saveOneText = '保存';
            this.zyDisabled = false;
            this.dlDisabled = false;
            this.selectOneCollapseForm.value = '1';
            this.collapseChangeFn = this.collapseChangeFnVal; // 方法赋值
          }

        } else if (this.getComInfo.boothStatus === '3') { // boothStatus-能修改重要信息
          if (this.getComInfo.modifyStatus === '0' && this.getComInfo.modifyStatus === '2') { // modifyStatus-禁用重要信息
            this.zyDisabled = true;
            this.dlDisabled = true;
            this.saveOneText = '提交修改申请'; // 不许修改申请 不许提交
            this.saveOneDisabled = true; // 不许修改申请 不许提交
          } else if (this.getComInfo.modifyStatus === '1') { // 重要√ 代理×
            this.saveOneText = '保存';
            this.zyDisabled = false;
            this.dlDisabled = true;
          } else if (this.getComInfo.modifyStatus === '3') { // 重要√ 或 代理√, 提交做处理
            this.saveOneText = '保存';
            this.zyDisabled = false;
            this.dlDisabled = false;
            this.selectOneCollapseForm.value = '1';
            this.collapseChangeFn = this.collapseChangeFnVal; // 方法赋值
          }
        }
      }).then(() => {
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    collapseChangeFnVal() {
      // var _this = this;
      // _this.collapseActiveName 因为此方法被调用时，dom还没加载出来，_this.collapseActiveName无值 弹框出不来;
      let collapseActiveName = this.collapseActiveName;
      if (collapseActiveName.indexOf('1') !== -1) { // 如果打开了第一个弹框
        this.selectOneCollapse = true; // 打开弹框
      }
    }
  },
  created() {
    this.createdGetSelect(); // 页面初始化
    this.getCompanyTypeOptions(); // 企业类型
    this.getIndustryTypeOptions(); // 所属行业
    this.getExhibitListAll(); // 申请届数
    this.getTargetConstomSelect(); // 目标客户
    this.helpData.uploadApi = this.baseApi + '/api/manageCompanyInformation/uploadSingleFile'; // 单文件上传（企业LOGO，原产地，营业执照文件）
    this.helpData.identApi = this.baseApi + '/api/manageCompanyInformation/uploadInterCerOrOtherExh'; // 单文件上传（国际认证，其他国际展会）
    this.helpData.moreApi = this.baseApi + '/api/manageCompanyInformation/uploadMultiFiles'; // 多文件证明文件上传
  }
};
</script>
<style lang='less' scoped>
.page-contain {
  /deep/ .el-collapse-item__header {
    border: 1px solid #EBEEF5;
    background-color: #D5434C;
    border-radius: 5px;
    position: relative;
    /deep/ .collapse-title {
      span{
        padding-left: 20px;
      }
      color: #fff;
      .save-button {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        color: #fff;
      }
    }
    .el-collapse-item__arrow {
      color: #fff;
    }
  }
  /deep/ .el-collapse-item__content {
    padding-bottom: 0px;
    /deep/ .el-form{
      .el-input{
        width: 90%;
      }
      .el-select{
        width: 90%;
      }
    }
  }
}
</style>
