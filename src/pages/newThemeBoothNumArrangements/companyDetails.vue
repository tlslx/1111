<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="审核企业资质" name="first">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="公司基本信息：" name="COMPANY_BASE_INFO" v-if="handleShow('COMPANY_BASE_INFO')">
          <!-- <cust-table :loading='loadingone' :cols="cols" :data="tableData"></cust-table> -->
          <div>
            <table class="default-table">
              <tr>
                <th>项目</th>
                <th>内容</th>
                <th>项目</th>
                <th>内容</th>
              </tr>
              <tr>
                <td class="tbc">企业中文名称</td>
                <td class="tac">{{companyBaseInfoData.companyName}}</td>
                <td class="tbc">企业英文名称</td>
                <td class="tac">{{companyBaseInfoData.companyNameEn}}</td>
              </tr>
              <tr>
                <td class="tbc">企业简称</td>
                <td class="tac">{{companyBaseInfoData.enterpriseAbbreviation}}</td>
                <td class="tbc">广交会编码</td>
                <td class="tac">{{companyBaseInfoData.cantonCode}}</td>
              </tr>
              <tr>
                <td class="tbc">企业中文地址</td>
                <td class="tac">{{companyBaseInfoData.adressCh}}</td>
                <td class="tbc">企业英文地址</td>
                <td class="tac">{{companyBaseInfoData.adressEn}}</td>
              </tr>
              <tr>
                <td class="tbc">邮政编码</td>
                <td class="tac">{{companyBaseInfoData.postalCode}}</td>
                <td class="tbc">法定代表人</td>
                <td class="tac">{{companyBaseInfoData.legalPerson}}</td>
              </tr>
              <tr>
                <td class="tbc">企业统一社会信用代码（营业执照号）</td>
                <td class="tac">{{companyBaseInfoData.businessLicenceNo}}</td>
                <td class="tbc">企业类型</td>
                <td class="tac">{{companyBaseInfoData.enterprisesType | companyTypeFilter}}</td>
              </tr>
              <tr>
                <td class="tbc">企业属性</td>
                <td class="tac">{{companyBaseInfoData.enterpriseAttribute | companyProp}}</td>
                <td class="tbc">上年度出口额（万美元）（企业填报）</td>
                <td class="tac">{{companyBaseInfoData.exportVolumeLast}}</td>
              </tr>
              <tr>
                <td class="tbc">企业成立年份</td>
                <td class="tac">{{companyBaseInfoData.incorporationYear}}</td>
                <td class="tbc">注册资本（万人民币）</td>
                <td class="tac">{{companyBaseInfoData.registeredCapital}}</td>
              </tr>
              <tr>
                <td class="tbc">参展联系人</td>
                <td class="tac">{{companyBaseInfoData.businessContactsCh}}</td>
                <td class="tbc">联系电话</td>
                <td class="tac">{{companyBaseInfoData.telephone}}</td>
              </tr>
              <tr>
                <td class="tbc">电子邮箱</td>
                <td class="tac">{{companyBaseInfoData.dedicatedEmail}}</td>
                <td class="tbc">联系手机</td>
                <td class="tac">{{companyBaseInfoData.phone}}</td>
              </tr>
              <tr>
                <td class="tbc">企业传真</td>
                <td class="tac">{{companyBaseInfoData.fax}}</td>
                <td class="tbc">企业网址</td>
                <td class="tac">{{companyBaseInfoData.website}}</td>
              </tr>
            </table>
          </div>
          <div class="newfathbtn" style="margin-top: 30px; border-top: 1px solid #ebeef5; font-weight: 900;">
            <div class="newonebtn" style="background: #ebeef5;">是否大会禁止参展企业:</div>
            <div class="newonebtn" style="color: red;">
              <!--<div v-if="!companyBaseInfoData.forbidJoin">该企业属大会规定禁止参展的企业</div>-->
              <!-- <div>{{enterpriseList.forbidJoin}}</div> -->
            </div>
          </div>
          <div class="newbtn context">
            <p> 企业不属于下列任一情况：</p>
            <p>（一）商务部向社会公告的违规违法企业，在公告期内禁止参展。</p>
            <p>（二）国家工商、海关、税务、质检、外汇、环保、药监等部门通报的违规违法企业, 在处罚期限内禁止参展；无处罚期限的，从处罚之日起连续六届禁止参展。</p>
            <p>（三）因违规转让或转租（卖）广交会展位、涉嫌展品质量与贸易纠纷投诉、知识产权侵权等行为违反大会相关规定，并处于被取消参展资格处罚期限内的企业。</p>
            <p>（四）因拒不服从大会管理、破坏展览秩序等其他行为，被大会认为对广交会声誉或正常运营造成较大不良影响，被取消参展资格的企业。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item title="企业申请资料：" name="COMPANY_APPLY_INFO" v-if="handleShow('COMPANY_APPLY_INFO')">
          <table class="company_details_table">
            <thead>
              <tr>
                <th>名称</th>
                <th>内容</th>
                <th>名称</th>
                <th>内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="name">展位性质：</td>
                <td class="content">{{ companyDetailsForm.boothType ? '一般性' : ''  }}</td>
                <td class="name">展区：</td>
                <td class="content">{{ companyDetailsForm.exhibitionAreaName }}</td>
              </tr>
              <tr v-if="companyDetailsForm.companyProductList" v-for="(item, index) in companyDetailsForm.companyProductList">
                <td class="name">{{ `主要展示产品${index + 1}：` }}</td>
                <td class="content">{{ item.productName }}</td>
                <td class="name">展品专区：</td>
                <td class="content">{{ companyDetailsForm.productTypeName }}</td>
              </tr>
              <tr v-if="!companyDetailsForm.companyProductList || companyDetailsForm.companyProductList.length === 0">
                <td class="name">主要展示产品：</td>
                <td class="content"></td>
                <td class="name">展品专区：</td>
                <td class="content">{{ companyDetailsForm.productTypeName }}</td>
              </tr>
              <tr v-if="companyDetailsForm.mainProductCodeList" v-for="(item, index) in companyDetailsForm.mainProductCodeList">
                <td class="name">海关HS编号：</td>
                <td class="content">{{ item.hsCode }}</td>
                <td class="name">对应具体展具名称：</td>
                <td class="content">{{ item.exhibitsCn }}</td>
              </tr>
              <tr v-if="!companyDetailsForm.mainProductCodeList || companyDetailsForm.mainProductCodeList.length === 0">
                <td class="name">海关HS编号：</td>
                <td class="content"></td>
                <td class="name">对应具体展具名称：</td>
                <td class="content"></td>
              </tr>
              <tr>
                <td class="name">申请展位数量：</td>
                <td class="content">{{ companyDetailsForm.boothNumber }}</td>
                <td class="name">折合面积：</td>
                <td class="content">{{ companyDetailsForm.boothAcreage }}</td>
              </tr>
              <tr>
                <td class="name">上届展位数量：</td>
                <td class="content">{{ companyDetailsForm.boothNumberLast }}</td>
                <td class="name">上届折合面积：</td>
                <td class="content">{{ companyDetailsForm.boothAcreageLast }}</td>
              </tr>
              <tr>
                <td class="name">是否愿意接洽国内采购商：</td>
                <td class="content">{{ companyDetailsForm.isContacted === '0' ? '否' : (companyDetailsForm.isContacted === '1' ? '是' : '') }}</td>
                <td class="name">展会期间开展的内贸业务：</td>
                <td class="content">{{ companyDetailsForm.isCarryOut === '0' ? '由外贸人员兼顾' : (companyDetailsForm.isCarryOut === '1' ? '由内贸人员专项负责' : '') }}</td>
              </tr>
              <tr>
                <td class="name">布展类型：</td>
                <td class="content">{{ companyDetailsForm.exhibitionType | typeFilter }}</td>
                <td class="name">我司参展展品为：</td>
                <td class="content">{{ companyDetailsForm.joinProductType | joinFilter }}</td>
              </tr>
              <tr>
                <td class="name">联营企业：</td>
                <td class="content"><div v-for="(item, index) in companyDetailsForm.companyUnionDTOList" :key="index" v-if="companyDetailsForm.companyUnionDTOList && companyDetailsForm.companyUnionDTOList.length > 0">
                  <div v-if="item.enterprisesInfoDTO">{{ item.enterprisesInfoDTO['nameCh']}}</div>
                </div></td>
                <td class="name">出口额：</td>
                <td class="content">{{ companyDetailsForm.companyType }}</td>
              </tr>
            </tbody>
          </table>
        </el-collapse-item>
        <el-collapse-item title="企业展品信息：" name="COMPANY_PRODUCT_INFO" v-if="handleShow('COMPANY_PRODUCT_INFO')">
          <div>
            <el-table :data="companyDetailsForm.companyProductList" v-loading="loading" max-height="390" border>
              <el-table-column label="产品名称" align="center" prop="productName"></el-table-column>
              <el-table-column label="图片" align="center" prop="productImageId">
                <template slot-scope="scope">
                  <div v-if="scope.row.productImageId">
                    <a href="javascript:;" @click="handleDownloadImg(scope.row.productImageId)">查看图片</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="型号" align="center" prop="productModel"></el-table-column>
              <el-table-column label="类别" align="center" prop="productType"></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="营业执照：" name="BUSINESS_LICENSE" v-if="handleShow('BUSINESS_LICENSE')">
          <div>
            <el-table :data="enterpriseLegal.list" v-loading="loading" max-height="390" border>
              <el-table-column label="营业执照" align="center" prop="enterpriseLegalId">
                <template slot-scope="scope">
                  <div v-if="scope.row.enterpriseLegalId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.enterpriseLegalId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="外贸经营资质证明：" name="FOREIGN_CERTIFICATE" v-if="handleShow('FOREIGN_CERTIFICATE')">
          <div>
            <el-table :data="foreignCertificate.list" v-loading="loading" max-height="390" border>
              <el-table-column label="外贸经营资质证明" align="center" prop="certificateId">
                <template slot-scope="scope">
                  <div v-if="scope.row.certificateId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.certificateId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="海关编码：" name="CUSTOMS_CODE" v-if="handleShow('CUSTOMS_CODE')">
          <div>
            <el-table :data="oneDemandData.companyCustomsCodeList" v-loading="loading" max-height="390" border>
              <el-table-column label="海关编码" prop="customsCode" align="center"></el-table-column>
              <el-table-column label="与本企业的关系" prop="relationship" align="center">
                <template slot-scope="scope">
                  {{ scope.row.relationship | relationshipFilter }}
                </template>
              </el-table-column>
              <el-table-column label="编码对应企业名称" prop="relationshipName" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.relationship === 'ENTERPRISE'">{{ oneDemandData.companyName }}</div>
                  <div v-if="scope.row.relationship !== 'ENTERPRISE'">{{ scope.row.relationshipName }}</div>
                </template>
              </el-table-column>
              <el-table-column label="注册登记证书" prop="attachment" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.attachment">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.attachment)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="国内销售额：" name="DOMESTIC_SALES" v-if="handleShow('DOMESTIC_SALES')">
          <div>
            <el-table :data="domesticSales.list" v-loading="loading" max-height="390" border>
              <el-table-column label="国内销售额（万元）" align="center" prop="insideSale"></el-table-column>
              <el-table-column label="增值税纳税申报表" align="center" prop="uploadTanxId">
                <template slot-scope="scope">
                  <div v-if="scope.row.uploadTanxId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.uploadTanxId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="经交易团审核国内销售额（万元）" align="center" prop="clusterCheckOpinion">
                <template slot-scope="scope">
                  <div v-if="scope.row.clusterCheckOpinion">{{ scope.row.clusterCheckOpinion }}</div>
                  <div v-else>{{ scope.row.insideSale }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="产品简介：" name="PRODUCT_BRIEF" v-if="handleShow('PRODUCT_BRIEF')">
          <div>
            <el-table :data="productBrief.list" v-loading="loading" max-height="390" border>
              <el-table-column label="产品简介" align="center" prop="productBriefId">
                <template slot-scope="scope">
                  <div v-if="scope.row.productBriefId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.productBriefId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="境外注册商标：" name="APTITUDE_OUTSIDE" v-if="handleShow('APTITUDE_OUTSIDE')">
          <div>
            <el-table :data="tradeMarkRegistOut" v-loading="loading" max-height="390" border>
              <el-table-column label="商标名称" prop="brandName" align="center"></el-table-column>
              <el-table-column label="持有人" prop="possessor" align="center"></el-table-column>
              <el-table-column label="证书编号" prop="certificateCode" align="center"></el-table-column>
              <el-table-column label="注册地（国别）" prop="registerPlace" align="center"></el-table-column>
              <el-table-column label="商标有效期" prop="indate" align="center"></el-table-column>
              <el-table-column label="与本企业的关系" prop="aptitudeSource" align="center">
                <template slot-scope="scope">
                  {{ scope.row.aptitudeSource | aptitudeSourceFilter }}
                </template>
              </el-table-column>
              <el-table-column label="资质来源企业名称" prop="correlationCompanyName" align="center"></el-table-column>
              <el-table-column label="关系证明" prop="brandPattern" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.brandPattern">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.brandPattern)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="商标注册证书" prop="brandRegisteredCertificate" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.brandRegisteredCertificate">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.brandRegisteredCertificate)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="国家高新技术：" name="NATIONAL_HIGH_TECH" v-if="handleShow('NATIONAL_HIGH_TECH')">
          <div>
            <el-table :data="innovateProperty.countrySkill" v-loading="loading" max-height="390" border>
              <el-table-column label="证书名称" align="center" prop="patentName"></el-table-column>
              <el-table-column label="持有人" align="center" prop="possessor"></el-table-column>
              <el-table-column label="有效期" align="center" prop="indate"></el-table-column>
              <el-table-column label="与本企业的关系" prop="aptitudeSource" align="center">
                <template slot-scope="scope">
                  {{ scope.row.aptitudeSource | aptitudeSourceFilter }}
                </template>
              </el-table-column>
              <el-table-column label="资质来源企业名称" align="center" prop="correlationCompanyName"></el-table-column>
              <el-table-column label="关系证明" prop="proofRelationship" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.proofRelationship">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.proofRelationship)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="证书" align="center" prop="certificate">
                <template slot-scope="scope">
                  <div v-if="scope.row.certificate">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.certificate)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="专利证明：" name="INNOVATE_PROPERTY_PATENT" v-if="handleShow('INNOVATE_PROPERTY_PATENT')">
          <div>
            <el-table :data="innovateProperty.innovateProve" v-loading="loading" max-height="390" border>
              <el-table-column label="专利类型" align="center" prop="patentName">
                <template slot-scope="scope">
                  {{ scope.row.patentName | propertyTypeFilter }}
                </template>
              </el-table-column>
              <el-table-column label="持有人" align="center" prop="possessor"></el-table-column>
              <el-table-column label="有效期" align="center" prop="indate"></el-table-column>
              <el-table-column label="与本企业的关系" prop="aptitudeSource" align="center">
                <template slot-scope="scope">
                  {{ scope.row.aptitudeSource | aptitudeSourceFilter }}
                </template>
              </el-table-column>
              <el-table-column label="资质来源企业名称" align="center" prop="correlationCompanyName"></el-table-column>
              <el-table-column label="关系证明" prop="proofRelationship" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.proofRelationship">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.proofRelationship)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="证书" align="center" prop="certificate">
                <template slot-scope="scope">
                  <div v-if="scope.row.certificate">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.certificate)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="参与国家或行业标准制定：" name="INNOVATE_PROPERTY_STANDARD" v-if="handleShow('INNOVATE_PROPERTY_STANDARD')">
          <div>
            <el-table :data="propertyStandard" v-loading="loading" max-height="390" border>
              <el-table-column label="证书名称" align="center" prop="brandName"></el-table-column>
              <el-table-column label="持有人" align="center" prop="registrant"></el-table-column>
              <el-table-column label="有效期" align="center" prop="indate"></el-table-column>
              <el-table-column label="与本企业的关系" prop="aptitudeSource" align="center">
                <template slot-scope="scope">
                  {{ scope.row.aptitudeSource | aptitudeSourceFilter }}
                </template>
              </el-table-column>
              <el-table-column label="资质来源企业名称" align="center" prop="correlationCompanyName"></el-table-column>
              <el-table-column label="关系证明" prop="remark" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.remark">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.remark)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="证书" align="center" prop="certificateCode">
                <template slot-scope="scope">
                  <div v-if="scope.row.certificateCode">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.certificateCode)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="国际通行认证：" name="APTITUDE_INTERNATIONAL" v-if="handleShow('APTITUDE_INTERNATIONAL')">
          <div>
            <el-table :data="intelPassCertified" v-loading="loading" max-height="390" border>
              <el-table-column label="认证类型" prop="authenticationCategory" align="center">
                <template slot-scope="scope">
                  {{ scope.row.authenticationCategory | categoryFilter }}
                </template>
              </el-table-column>
              <el-table-column label="认证名称" prop="authenticationProject" align="center"></el-table-column>
              <el-table-column label="持有人" align="center" prop="possessor"></el-table-column>
              <el-table-column label="有效期" prop="indate" align="center"></el-table-column>
              <el-table-column label="与本企业的关系" prop="aptitudeSource" align="center">
                <template slot-scope="scope">
                  {{ scope.row.aptitudeSource | aptitudeSourceFilter }}
                </template>
              </el-table-column>
              <el-table-column label="资质来源企业名称" prop="correlationCompanyName" align="center"></el-table-column>
              <el-table-column label="关系证明" prop="proofRelationship" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.proofRelationship">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.proofRelationship)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="证书" prop="certificateCode" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.certificateCode">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.certificateCode)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="近两年参加国际专业展：" name="INTERNATIONAL_PROJECT" v-if="handleShow('INTERNATIONAL_PROJECT')">
          <div>
            <el-table :data="assistanceProject" v-loading="loading" max-height="390" border>
              <el-table-column label="展会名称" align="center" prop="exhibitName"></el-table-column>
              <el-table-column label="参与时间" align="center" prop="actorDate"></el-table-column>
              <el-table-column label="证明材料" align="center" prop="fileId">
                <template slot-scope="scope">
                  <div v-if="scope.row.fileId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.fileId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="近两年参与商务部对外经济合作、援助项目：" name="ACTOR_PROJECT" v-if="handleShow('ACTOR_PROJECT')">
          <div>
            <el-table :data="actorProject" v-loading="loading" max-height="390" border>
              <el-table-column label="项目名称" align="center" prop="projectName"></el-table-column>
              <el-table-column label="参与时间" align="center" prop="actorDate"></el-table-column>
              <el-table-column label="证明材料" align="center" prop="fileId">
                <template slot-scope="scope">
                  <div v-if="scope.row.fileId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.fileId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="total-footer">
        <el-button size="medium" type="primary" @click="handleCancel">返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
import custTable from "@/components/project/common/custTable.vue";
import btndialog from "./../workplaceSettingTime/businessBasic/component/btnDialog";
export default {
  mixins: [listPageBase],
  components: {
    "cust-table": custTable,
    "btndialog": btndialog
  },
  data() {
    return {
      activeName: 'first',
      activeCollapse: '1',
      isPass: false,
      loadingone: false,
      demandRecordIdData: {
        demandRecordId: ''
      },
      companyId: '',
      examineStatusOpts: [{ value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      loading: '',
      companyDetailsForm: {},
      workDepartRangeList: [],

      saveData: {
        type: '',
        id: ''
      },
      tableData: {
        data: []
      },
      // 表头数据
      cols: [
        {
          prop: "name",
          label: "名称",
          type: "string"
        },
        {
          prop: "type",
          label: "内容",
          type: "imgfile"
        },
        {
          prop: "nametwo",
          label: "名称",
          type: "string"
        },
        {
          prop: "typetwo",
          label: "内容",
          type: "imgfile"
        }
      ],
      onebtnData: {
        'examineOpinion': '',
        'newdata': ''
      },
      listingPlace: [],
      post: [],
      mainMarket: [],
      mainType: [],
      developNum: [],
      participationGoal: [],
      tradeForm: [],
      staff: [],
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    typeFilter: value => {
      switch (value) {
        case 'SPECIAL_BOOTH':
          return '绿色特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        default:
          return;
      }
    },
    joinFilter: value => {
      switch (value) {
        case '0':
          return '全面面向境外市场';
        case '1':
          return '外销设计，但也可兼顾境内销售';
        case '2':
          return '有部分主要针对境内市场';
        default:
          return;
      }
    },
    propertyTypeFilter: value => {
      let val = value + '';
      switch (val) {
        case '01':
          return '发明专利';
        case '02':
          return '实用新型专利';
        case '03':
          return '外观专利';
        case '04':
          return '版权';
        case '05':
          return '参与制定国家或行业标准';
        case '06':
          return '获国家高新技术企业';
        default:
          return;
      }
    },
    aptitudeSourceFilter: value => {
      let val = value + '';
      switch (val) {
        case '01':
          return '本公司';
        case '02':
          return '全资公司';
        case '03':
          return '控股子公司';
        case '1':
          return '本企业所有';
        case '2':
          return '绝对控股子公司所有';
        case '3':
          return '相对控股子公司所有';
        case '4':
          return '绝对控股母公司所有';
        case '5':
          return '绝对控股母公司的其他绝对控股子公司所有';
        default:
          return;
      }
    },
    // 认证类型
    categoryFilter: value => {
      let val = value + '';
      switch (val) {
        case '01':
          return '管理体系认证';
        case '02':
          return '行业认证';
        case '管理体系认证':
          return '管理体系认证';
        case '行业认证':
          return '行业认证';
        default:
          return;
      }
    },
    // 公司关系
    relationshipFilter: value => {
      switch (value) {
        case 'ENTERPRISE':
          return '本企业';
        case 'SUBSIDARYCOMPANY':
          return '全资子公司';
        case 'HOLDCOMPANY':
          return '控股子公司';
        default:
          return;
      }
    },  
    // 企业类型
    companyTypeFilter: value => {
      let companyTypeOptsw = kindo.dictionary.get('companyType');
      for (let i = 0; i < companyTypeOptsw.length; i++) {
        if (value === companyTypeOptsw[i].value) {
          return companyTypeOptsw[i].label;
        }
      }
    },
    // 企业属性
    companyProp: value => {
      let companyAttribute = kindo.dictionary.get('companyAttribute');
      for (let i = 0; i < companyAttribute.length; i++) {
        if (value === companyAttribute[i].value) {
          return companyAttribute[i].label;
        }
      }
    }
  },
  computed: {
    ...mapGetters('newThemeRecommendCompany', ['oneDemandData', 'rangeWorkDepart']),
    ...mapGetters('newThemeWorkDepartCheckNumber', [
      'companyBaseInfoData', // 企业基本信息
      'enterpriseLegal', // 营业执照
      'foreignCertificate', // 外贸经营资质证明
      'domesticSales', // 国内销售额
      'productBrief', // 产品简介
      'tradeMarkRegistOut', // 境外商标
      'innovateProperty', // 专利版权
      'propertyStandard', // 国家或行业标准
      'intelPassCertified', // 国际通行认证
      'assistanceProject', // 国际专业展
      'actorProject' // 援助项目
    ])
  },
  async created() {
    this.demandRecordIdData.demandRecordId = this.$route.query.idOne;
    this.companyId = this.$route.query.idTwo;
    this.listingPlace = await kindo.dictionary.get('listingPlace');    //上市地点
    this.post = await kindo.dictionary.get('post');    //职位
    this.mainMarket = await kindo.dictionary.get('mainMarket');    //目标市场
    this.mainType = await kindo.dictionary.get('mainType');    //目标客户类型
    this.developNum = await kindo.dictionary.get('developNum');    //研发部门人数
    this.participationGoal = await kindo.dictionary.get('participationGoal');    //参展目的
    this.tradeForm = await kindo.dictionary.get('tradeForm');    //贸易形式
    this.staff = await kindo.dictionary.get('staff');    //员工数量
    this.createdQuery();
  },
  watch: {
    //判断企业基本信息中的企业统一社会信用代码(营业执照号)是否在企业进出口经营权中出现,,若出现显示为空
    'tableData.data': {
      handler(val) {
        if (val && val.length > 0) {
          for (let key in val) {
            if (val[key].nametwo === "纳税人识别号/统一社会信用代码:") {
              for (let i in this.exportDate) {
                if (this.exportDate[i].code === val[key].typetwo) {
                  val[key].nametwo = '';
                  val[key].typetwo = '';
                }
              }
            }
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('newThemeRecommendCompany', ['getOneDemand', 'getRangeWorkDepart']),
    ...mapActions('newThemeWorkDepartCheckNumber', ['postCheckCustomsCode', // 海关编码审核
      'getCompanyBaseInfo', // 企业基本信息
      'getEnterpriseLegal', // 营业执照
      'getForeignCertificate', // 外贸经营资质证明
      'getDomesticSales', // 国内销售额
      'getProductBrief', // 产品简介
      'getTradeMarkRegistOut', // 境外商标
      'getInnovateProperty', // 专利版权
      'getPropertyStandard', // 国家或行业标准
      'getIntelPassCertified', // 国际通行认证
      'getAssistanceProject', // 国际专业展
      'getActorProject' // 援助项目
    ]),
    //企业基本信息
    getcompanyInfo() {
      this.loadingone = true;
      this.getCompanyBaseInfo({
        companyId: this.companyId
      }).then(res => {
        this.tableData.data = JSON.parse(JSON.stringify(res));
        for (let key in this.tableData.data) {
          if (this.tableData.data[key].name === '广交会编码：') {
            this.newcafe = this.tableData.data[key].type;
          }
        }
        for (let key in this.tableData.data) {
          if (this.tableData.data[key].nametwo === '省份/城市:') {
            let pro = '';
            let twopro = '';
            let str = '';
            let twostr = '';
            if (this.tableData.data[key].iscity) {
              twostr = this.tableData.data[key].typetwo;
              str = '';
            } else {
              str = this.tableData.data[key].typetwo.substring(0, 2);
              twostr = this.tableData.data[key].typetwo.substring(3, this.tableData.data[key].typetwo.length);
            }
            for (let i in this.city) {
              if (str === i) {
                pro = this.city[i];
              }
              if (twostr === i) {
                twopro = this.city[i];
              }

            }
            this.tableData.data[key].typetwo = pro + twopro;
          }
        }
        for (let key in this.listingPlace) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '上市地点：') {
              if (this.tableData.data[i].typetwo === this.listingPlace[key].value) {
                this.tableData.data[i].typetwo = this.listingPlace[key].label;
              }
            }
          }
        }
        for (let key in this.post) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '职位: ') {
              if (this.tableData.data[i].typetwo === this.post[key].value) {
                this.tableData.data[i].typetwo = this.post[key].label;
              }
            }
          }
        }
        for (let key in this.mainMarket) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '主要目标市场（多选）：') {
              if (this.tableData.data[i].typeonet) {
                let newtype = this.tableData.data[i].typeonet.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.mainMarket[key].value) {
                    this.tableData.data[i].typetwo += (this.mainMarket[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.mainType) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '主要目标客户类型（多选）：') {
              if (this.tableData.data[i].typeone) {
                let newtype = this.tableData.data[i].typeone.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.mainMarket[key].value) {
                    this.tableData.data[i].type += (this.mainMarket[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.participationGoal) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '参展目的（多选）: ') {
              if (this.tableData.data[i].typeonef) {
                let newtype = this.tableData.data[i].typeonef.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.participationGoal[key].value) {
                    this.tableData.data[i].type += (this.participationGoal[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.tradeForm) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '贸易形式:') {
              if (this.tableData.data[i].typeones) {
                let newtype = this.tableData.data[i].typeones.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.tradeForm[key].value) {
                    this.tableData.data[i].type += (this.tradeForm[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.developNum) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '研发部门人数:') {
              if (this.tableData.data[i].typetwo === this.developNum[key].value) {
                this.tableData.data[i].typetwo = this.developNum[key].label;
              }
            }
          }
        }
        for (let key in this.staff) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '员工数量:') {
              if (this.tableData.data[i].typetwo === this.staff[key].value) {
                this.tableData.data[i].typetwo = this.staff[key].label;
              }
            }
          }
        }
        for (let key in this.staff) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '生产部门人数:') {
              if (this.tableData.data[i].type === this.staff[key].value) {
                this.tableData.data[i].type = this.staff[key].label;
              }
            }
          }
        }
        for (let key in this.developNum) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '质检部门人数:') {
              if (this.tableData.data[i].type === this.developNum[key].value) {
                this.tableData.data[i].type = this.developNum[key].label;
              }
            }
          }
        }
        this.onebtnData.newdata = JSON.parse(JSON.stringify(this.companyBaseInfoData));
        this.loadingone = false;
      })
      .catch(e => {
        this.loadingone = false;
      });
    },
    // 附件下载
    handleDownloadFile(url) {
      window.open(`${process.env.API_NA_URL}/api/file/get?fileId=${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 图片下载
    handleDownloadImg(url) {
      window.open(`${process.env.API_NA_URL}/api/file/getImg?fileId=${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 面板隐藏显示
    handleShow(collapse) {
      for (let i = 0; i < this.workDepartRangeList.length; i++) {
        if (collapse === this.workDepartRangeList[i].configKey) {
          if (this.workDepartRangeList[i].configValue === '1') {
            return true;
          } else {
            return false;
          }
        }
      }
    },
    // 点击返回
    handleCancel() {
      let queryForm = this.$route.query.form;
      let pageInfo = this.$route.query.page;
      this.$router.push({ path: '/recommendApplyCompany', query: { form: queryForm, page: pageInfo }});
    },
    // 查询封装
    createdQuery() {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.getRangeWorkDepart().then(res => {
        this.workDepartRangeList = this.rangeWorkDepart;
        for (let i = 0; i < this.workDepartRangeList.length; i++) {
          if (this.workDepartRangeList[i].configValue === '1') {
            this.activeCollapse = this.workDepartRangeList[i].configKey;
            break;
          }
        }
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
      this.getOneDemand(this.demandRecordIdData).then(res => {
        this.companyDetailsForm = JSON.parse(JSON.stringify(this.oneDemandData));
        // 企业基本信息
        this.getcompanyInfo();
        // 营业执照
        this.getEnterpriseLegal(this.demandRecordIdData).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 外贸经营资质证明
        this.getForeignCertificate(this.demandRecordIdData).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 国内销售额
        this.getDomesticSales(this.demandRecordIdData).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 产品简介
        this.getProductBrief(this.demandRecordIdData).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 境外商标
        this.getTradeMarkRegistOut({ companyId: this.companyId }).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 专利版权
        this.getInnovateProperty({ companyId: this.companyId }).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 国家或行业标准
        this.getPropertyStandard({ companyId: this.companyId }).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 国际通行认证
        this.getIntelPassCertified({ companyId: this.companyId }).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 国际专业展
        this.getAssistanceProject({ companyId: this.companyId }).then(() => {}).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
        // 援助项目
        this.getActorProject({ companyId: this.companyId }).then(() => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.add_btn{
  margin-left: 30px;
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
.check-form{
  width: 100%;
  max-width: 550px;
}
.company_details_table{
  border-collapse: collapse;
  width: 100%;
}
.company_details_table tr th:nth-of-type(2n) {
  width: 30%;
}
.company_details_table tr th:nth-of-type(2n-1) {
  width: 20%;
}
.company_details_table tr td, .company_details_table tr th{
  border: 1px solid #ebeef5;
  padding: 12px 0;
  color: #909399;
}
.company_details_table tr .name{
  text-align: right;
  color: #606266;
}
.company_details_table tr .content{
  text-align: center;
  color: #606266;
}
  /*table start*/
  table.default-table{
    /* -moz-border-radius: 5px;
    -webkit-border-radius:5px;
    border-radius:5px; */
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
 "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    width: 100%;
    border:solid #EBEEF5;
    border-width:1px 0px 0px 1px;
    border-collapse: collapse;
    border-spacing: 0;
    color: #909399;
    font-size: 12px;
  }
  table.default-table tr{
    height: 23px;
    color: #909399;
    line-height: 23px;
  }
  table.default-table tr.odd{
    background-color: #fff;
  }
  table.default-table tr.even{
    background-color: #F5F5F5;
  }
  table.default-table tr:hover{
    background-color: #eee;
  }
  table.default-table tr th,table.default-table tr td{
    width: 25%;
    padding:6px 20px;
    text-align: left;
    /* border: 1px solid #ddd; */
    border:solid #EBEEF5;
    border-width:0px 1px 1px 0px;
  }
  table.default-table tr th{
    font-weight: bold;
    text-align: center;
  }
  table.default-table tr td.tac{
    color: #606266;
    text-align: left;
  }
  table.default-table tr td.tbc{
    color: #606266;
    text-align: right;
  }
  table.default-table tr td a:hover{
    color:#0080c0;
  }
  .cont {
    text-align: center;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .formStyle {
    padding: 8px 30px;
  }
</style>
