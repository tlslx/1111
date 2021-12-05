<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="审核企业资质" name="first">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="企业基本信息:" name="0">
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
          <!-- <div class="newfathbtn">
            <div class="newonebtn">审核</div>
            <div class="newonebtn">
              <el-button style="padding: 3px 0" type="text" @click="btnshow('通过')">通过</el-button>
              <el-button style="padding: 3px 0" type="text" @click="btnshow('不通过')">不通过</el-button>
            </div>
          </div> -->
          <div class="newfathbtn" style="margin-top: 30px; border-top: 1px solid #ebeef5; font-weight: 900;">
            <div class="newonebtn" style="background: #ebeef5;">是否大会禁止参展企业:</div>
            <div class="newonebtn" style="color: red;">
              <!-- <div v-if="!companyBaseInfoData.forbidJoin">该企业属大会规定禁止参展的企业</div> -->
              <!-- <div v-if="enterpriseList.forbidJoin">{{enterpriseList.forbidJoin}}</div> -->
              <!-- <div v-else><el-button type="text" :disabled="enterpriseList.companyForbidJoin === '1'" @click="companyBan">禁止参展企业</el-button><el-button type="text" :disabled="enterpriseList.companyForbidJoin === '2'" @click="companyonBan">非禁止参展企业</el-button></div>
              {{enterpriseList.forbidJoin}} -->
            </div>
          </div>
          <div class="newbtn context">
            <p> 企业不属于下列任一情况：</p>
            <p>（一）商务部向社会公告的违规违法企业，在公告期内禁止参展。</p>
            <p>（二）国家工商、海关、税务、质检、外汇、环保、药监等部门通报的违规违法企业, 在处罚期限内禁止参展；无处罚期限的，从处罚之日起连续六届禁止参展。</p>
            <p>（三）因违规转让或转租（卖）广交会展位、涉嫌展品质量与贸易纠纷投诉、知识产权侵权等行为违反大会相关规定，并处于被取消参展资格处罚期限内的企业。</p>
            <p>（四）因拒不服从大会管理、破坏展览秩序等其他行为，被大会认为对广交会声誉或正常运营造成较大不良影响，被取消参展资格的企业。</p>
          </div>
          <div class="newfathbtn">
            <div class="newonebtn">企业基本信息审核意见：{{companyBaseInfoData.clusterCheckStatus | checkStatus}}</div>
            <div class="newonebtn">不通过原因：{{companyBaseInfoData.clusterCheckOpinion}}</div>
            <div class="newonebtn">
              <el-button type="primary" @click="btnshow('通过')">通过</el-button>
              <el-button type="primary" @click="btnshow('不通过')">不通过</el-button>
            </div>
          </div>
          <!-- 第一个 通过 不通过 弹框 李康 新增于 5/22 18.30 -->
          <el-dialog title="审核" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" width="500px">
            <el-form :model="auditForm" ref="auditRef" size="small" :rules="auditRules" label-width="140px">
              <el-form-item label="审核不通过原因 ：" prop="examineOpinion">
                <el-input type="textarea" v-model="auditForm.examineOpinion" maxlength="120" row="5"></el-input>
              </el-form-item>
              <div class="cont">
                <el-button class="formStyle" @click="npSeave('auditRef')">保存</el-button>
                <el-button class="formStyle" @click="isShow = false">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
          <el-dialog title="设置公布批次时间" :visible.sync="btnDialogVisible" width="30%;">
            <btndialog @closeModal="customsModal" :onebtnData="onebtnData"></btndialog>
          </el-dialog>
        </el-collapse-item>
        <el-collapse-item title="企业申请资料：" name="1">
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
              <!-- jcrao 删除 5/24
              <tr>
                <td class="name">营业执照：</td>
                <td class="content"><a href="javascript:;" @click="handleDownloadFile(companyDetailsForm.businessLicenceNo)" v-if="companyDetailsForm.businessLicenceNo">查看</a></td>
                <td class="name">产品HS编码：</td>
                <td class="content">{{ companyDetailsForm.hscode }}</td>
              </tr>
              -->
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
                <td class="name">企业类型：</td>
                <td class="content">{{ companyDetailsAllInfo | companyTypeFilter }}</td>
                <!--  jcrao 删除 5/24
                <td class="name">我司参展展品为：</td>
                <td class="content">{{ companyDetailsForm.joinProductType | joinFilter }}</td>
                -->
              </tr>
              <tr>
                <td class="name">联营企业：</td>
                <td class="content"><div v-for="(item, index) in companyDetailsForm.companyUnionDTOList" :key="index" v-if="companyDetailsForm.companyUnionDTOList && companyDetailsForm.companyUnionDTOList.length > 0">
                  <div v-if="item.enterprisesInfoDTO">{{ item.enterprisesInfoDTO['nameCh']}}</div>
                </div></td>
                <td class="name">企业申请资料审核结果：</td>
                <td class="content">{{ companyDetailsForm.clusterCheckStatus | statusFilter }}</td>
              </tr>
              <tr>
                <td class="name">审核不通过原因：</td>
                <td class="content">{{ companyDetailsForm.clusterCheckOpinion }}</td>
                <td class="name">审核：</td>
                <td class="content">
                  <el-button type="text" @click="handlePass('company', '', '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('company', '1', '2')">不通过</el-button>
                </td>
                <td class="name"></td>
                <td class="content"></td>
              </tr>
            </tbody>
          </table>
          <div style="text-align: center; margin-top: 20px;           ">
            <el-button type="danger" @click="openSetting">设置广交会编码</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="企业展品信息：" name="2">
          <div>
            <el-table :data="companyDetailsForm.companyProductList" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'companyProduct', 'companyProductId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" align="center" prop="clusterCheckStatus">
                <template slot-scope="scope">
                  {{ scope.row.clusterCheckStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('companyProduct', scope.row.companyProductId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('companyProduct', scope.row.companyProductId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('companyProduct', '', '1')" :disabled="handleDisabled('companyProduct')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('companyProduct', '', '2')" :disabled="handleDisabled('companyProduct')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="营业执照：" name="3">
          <div>
            <el-table :data="enterpriseLegal.list" v-loading="loading" max-height="390" border>
              <el-table-column label="营业执照" align="center" prop="enterpriseLegalId">
                <template slot-scope="scope">
                  <div v-if="scope.row.enterpriseLegalId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.enterpriseLegalId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" align="center" prop="clusterCheckStatus">
                <template slot-scope="scope">
                  {{ scope.row.clusterCheckStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('enterpriseLegal', demandRecordIdData.demandRecordId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('enterpriseLegal', demandRecordIdData.demandRecordId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="外贸经营资质证明：" name="4">
          <div>
            <el-table :data="foreignCertificate.list" v-loading="loading" max-height="390" border>
              <el-table-column label="外贸经营资质证明" align="center" prop="certificateId">
                <template slot-scope="scope">
                  <div v-if="scope.row.certificateId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.certificateId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" align="center" prop="clusterCheckStatus">
                <template slot-scope="scope">
                  {{ scope.row.clusterCheckStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('foreignCertificate', demandRecordIdData.demandRecordId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('foreignCertificate', demandRecordIdData.demandRecordId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="海关编码：" name="5">
          <div>
            <el-table :data="oneDemandData.companyCustomsCodeList" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'customsCode', 'customsCodeId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckCustomsOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="clusterCheckCustomsStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.clusterCheckCustomsStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('customsCode', scope.row.customsCodeId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('customsCode', scope.row.customsCodeId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('customsCode', '', '1')" :disabled="handleDisabled('customsCode')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('customsCode', '', '2')" :disabled="handleDisabled('customsCode')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="国内销售额：" name="6">
          <div>
            <el-table :data="domesticSalesList" v-loading="loading" max-height="390" fit border>
              <el-table-column label="国内销售额（万元）" align="center" prop="insideSale"></el-table-column>
              <el-table-column label="增值税纳税申报表" align="center" prop="uploadTanxId">
                <template slot-scope="scope">
                  <div v-if="scope.row.uploadTanxId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.uploadTanxId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="经交易团审核国内销售额（万元）" align="center" prop="saleCheck">
                <template slot-scope="scope">
                  <div v-if="scope.row.edit">
                    <el-form :model="scope.row" :ref="`saleCheck${scope.$index}`" :rules="saleRules">
                      <el-form-item class="item-Num" prop="saleCheck">
                        <el-input placeholder="请输入" v-model.trim="scope.row.saleCheck" maxlength="10" ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div v-else>{{ scope.row.saleCheck }}</div>
                </template>
              </el-table-column>
              <!--<el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="clusterCheckStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.clusterCheckStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('domesticSales', demandRecordIdData.demandRecordId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('domesticSales', demandRecordIdData.demandRecordId, '2')">不通过</el-button>
                </template>
              </el-table-column>-->
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="text" @click="toSave(scope.$index, scope.row)" :disabled="!scope.row.edit">保存</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="产品简介：" name="7">
          <div>
            <el-table :data="productBrief.list" v-loading="loading" max-height="390" border>
              <el-table-column label="产品简介" align="center" prop="productBriefId">
                <template slot-scope="scope">
                  <div v-if="scope.row.productBriefId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.productBriefId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="clusterCheckStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.clusterCheckStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('productBrief', demandRecordIdData.demandRecordId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('productBrief', demandRecordIdData.demandRecordId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="境外注册商标：" name="8">
          <div>
            <el-table :data="tradeMarkRegistOut" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'tradeMarkRegistOut', 'brandOutsideId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="关系证明" prop="proofRelationship" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.proofRelationship">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.proofRelationship)">查看文件</a>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="checkStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('tradeMarkRegistOut', scope.row.brandOutsideId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('tradeMarkRegistOut', scope.row.brandOutsideId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('tradeMarkRegistOut', '', '1')" :disabled="handleDisabled('tradeMarkRegistOut')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('tradeMarkRegistOut', '', '2')" :disabled="handleDisabled('tradeMarkRegistOut')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="国家高新技术：" name="9">
          <div>
            <el-table :data="innovateProperty.countrySkill" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'countrySkill', 'intellectualId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="checkStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('countrySkill', scope.row.intellectualId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('countrySkill', scope.row.intellectualId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('countrySkill', '', '1')" :disabled="handleDisabled('countrySkill')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('countrySkill', '', '2')" :disabled="handleDisabled('countrySkill')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="专利证明：" name="10">
          <div>
            <el-table :data="innovateProperty.innovateProve" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'innovateProve', 'intellectualId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="checkStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('innovateProve', scope.row.intellectualId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('innovateProve', scope.row.intellectualId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('innovateProve', '', '1')" :disabled="handleDisabled('innovateProve')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('innovateProve', '', '2')" :disabled="handleDisabled('innovateProve')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="参与国家或行业标准制定：" name="11">
          <div>
            <el-table :data="propertyStandard" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'propertyStandard', 'standardId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="checkStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('propertyStandard', scope.row.standardId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('propertyStandard', scope.row.standardId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('propertyStandard', '', '1')" :disabled="handleDisabled('propertyStandard')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('propertyStandard', '', '2')" :disabled="handleDisabled('propertyStandard')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="国际通行认证：" name="12">
          <div>
            <el-table :data="intelPassCertified" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'intelPassCertified', 'internationalId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
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
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" prop="checkStatus" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('intelPassCertified', scope.row.internationalId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('intelPassCertified', scope.row.internationalId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('intelPassCertified', '', '1')" :disabled="handleDisabled('intelPassCertified')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('intelPassCertified', '', '2')" :disabled="handleDisabled('intelPassCertified')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="近两年参加国际专业展：" name="13">
          <div>
            <el-table :data="assistanceProject" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'actorExhibit', 'actorExhibitId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
              <el-table-column label="展会名称" align="center" prop="exhibitName"></el-table-column>
              <el-table-column label="参与时间" align="center" prop="actorDate"></el-table-column>
              <el-table-column label="证明材料" align="center" prop="fileId">
                <template slot-scope="scope">
                  <div v-if="scope.row.fileId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.fileId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" align="center" prop="approveStatus">
                <template slot-scope="scope">
                  {{ scope.row.approveStatus | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('actorExhibit', scope.row.actorExhibitId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('actorExhibit', scope.row.actorExhibitId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('actorExhibit', '', '1')" :disabled="handleDisabled('actorExhibit')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('actorExhibit', '', '2')" :disabled="handleDisabled('actorExhibit')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="近两年参与商务部对外经济合作、援助项目：" name="14">
          <div>
            <el-table :data="actorProject" v-loading="loading" max-height="390" @selection-change="rows => handleCheckedChange(rows, 'actorProject', 'actorProjectId')" border>
              <el-table-column type="selection" width="40px"></el-table-column>
              <el-table-column label="项目名称" align="center" prop="projectName"></el-table-column>
              <el-table-column label="参与时间" align="center" prop="actorDate"></el-table-column>
              <el-table-column label="证明材料" align="center" prop="fileId">
                <template slot-scope="scope">
                  <div v-if="scope.row.fileId">
                    <a href="javascript:;" @click="handleDownloadFile(scope.row.fileId)">查看文件</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="审核不通过原因" min-width="140px" align="center" prop="clusterCheckOpinion"></el-table-column>
              <el-table-column label="审核结果" align="center" prop="approveResult">
                <template slot-scope="scope">
                  {{ scope.row.approveResult | statusFilter }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handlePass('actorProject', scope.row.actorProjectId, '1')">通过</el-button>
                  <el-button type="text" @click="handleNoPass('actorProject', scope.row.actorProjectId, '2')">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="start" class="pagination-footer">
              <span class="add_btn">
                <el-button type="primary" size="medium" @click="handlePass('actorProject', '', '1')" :disabled="handleDisabled('actorProject')">通过</el-button>
                <el-button type="primary" size="medium" @click="handleNoPass('actorProject', '', '2')" :disabled="handleDisabled('actorProject')">不通过</el-button>
              </span>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 不通过弹框 -->
      <el-dialog title="审核" :visible.sync="isPass" v-if="isPass">
        <el-form :model="checkTable" ref="checkTable" :rules="rules">
          <el-form-item label="审核不通过原因：" label-width="140px" prop="examineOpinion">
            <el-input type="textarea" v-model="checkTable.examineOpinion" :rows="4" maxlength="120"></el-input>
          </el-form-item>
        </el-form>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="handleSave('checkTable')">保存</el-button>
          <el-button size="medium" @click="isPass = false;">取消</el-button>
        </div>
      </el-dialog>
      <!-- 设置广交会编码弹框 -->
      <el-dialog title="设置广交会编码" :visible.sync="isSet" v-if="isSet">
        <el-form :model="setTable" ref="setTable" :rules="setRules">
          <el-form-item label="广交会编码：" label-width="140px" prop="cantonCode">
            <el-input placeholder="请输入" v-model="setTable.cantonCode" maxlength="7" :disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="handleCodeSave('setTable')">保存</el-button>
          <el-button size="medium" @click="isSet = false;">取消</el-button>
        </div>
      </el-dialog>
      <el-tabs v-model="checkName">
        <el-tab-pane label="审核" name="first">
          <el-form :model="checkForm" ref="checkForm" :rules="checkRules" label-width="140px" class="check-form">
            <el-form-item label="审核：" prop="examineStatus">
              <el-select v-model="checkForm.examineStatus" @change="handleChange">
                <el-option v-for="(item, index) in examineStatusOpts" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核不通过原因：" prop="examineOpinion" v-if="checkForm.examineStatus === '2'">
              <el-input type="textarea" v-model="checkForm.examineOpinion" :rows="4" maxlength="120"></el-input>
            </el-form-item>
          </el-form>
          <div class="total-footer">
            <el-button type="primary" size="medium" @click="handleSaveDetails('checkForm')">保存</el-button>
            <el-button size="medium" @click="handleCancel">取消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
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
    var needFloat = (rule, value, callback) => {
      const reg = /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/;
      if (value === '' || value < 0) {
        return callback(new Error('请输入>=0的数'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入最多保留两位小数的数'));
      } else {
        return callback();
      }
    };
    let validateNum = (rule, value, callback) => {
      let str = /^[A-Za-z0-9]{3}([A-Z]){1}[A-Za-z0-9]{3}$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确的广交会编码,第四位为大写字母,长度为7个字符'));
      } else {
        return callback();
      }
    };
    return {
      isShow: false,
      activeName: 'first',
      activeCollapse: ['0'],
      checkName: 'first',
      isPass: false,
      loadingone: false,
      btnDialogVisible: false,
      noCheckList: [], // 未审核的部分集合
      //设置广交会编码
      isSet: false,
      setTable: {
        cantonCode: '',
        companyId: ''
      },
      disabled: '',
      setRules: {
        cantonCode: [{ required: true, validator: validateNum, trigger: 'blur' }]
      },
      // 临时选中的值
      checkList: {
        company: [], // 企业资料
        companyProduct: [], // 企业展品信息
        enterpriseLegal: [], // 营业执照
        foreignCertificate: [], // 外贸经营资质证明
        customsCode: [], // 海关编码
        domesticSales: [], // 国内销售额
        productBrief: [], // 产品简介
        tradeMarkRegistOut: [], // 境外注册商标
        countrySkill: [], // 国家高新技术
        innovateProve: [], // 专利版权
        propertyStandard: [], // 国家或行业标准
        intelPassCertified: [], // 国际通行认证
        actorExhibit: [], // 国际专业展
        actorProject: [] // 援助项目
      },
      domesticSalesList: [], // 国内销售额
      lastIndex: '',
      lastSalesList: [],
      saleRules: {
        saleCheck: [{ required: true, validator: needFloat, trigger: 'blur' }]
      },
      demandRecordIdData: {
        demandRecordId: ''
      },
      companyId: '',
      examineStatusOpts: [{ value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      loading: '',
      companyDetailsForm: {},
      companyDetailsAllInfo: {},
      checkTable: {
        examineStatus: '',
        examineUserId: this.$store.getters.userInfo.org.userId,
        examineUserCn: this.$store.getters.userInfo.org.userName,
        examineOpinion: '',
        examineOrg: 'DELEGATION'
      },
      checkForm: {
        examineStatus: '',
        ownId: '',
        examineUserId: this.$store.getters.userInfo.org.userId,
        examineUserCn: this.$store.getters.userInfo.org.userName,
        examineOpinion: '',
        examineOrg: 'DELEGATION'
      },
      rules: {
        examineOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      checkRules: {
        examineStatus: [{ required: true, message: '请选择', trigger: 'change' }],
        examineOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      saveData: {
        type: '',
        id: '',
        status: ''
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
      newcafe: '',
      listingPlace: [],
      post: [],
      mainMarket: [],
      mainType: [],
      developNum: [],
      participationGoal: [],
      tradeForm: [],
      staff: [],
      auditForm: {
        examineOpinion: ""
      },
      auditRules: {
        examineOpinion: [{ required: true, message: "必填项", trigger: "blur" }]
      },
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
    statusFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '未审核';
        case '1':
          return '通过';
        case '2':
          return '不通过';
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
    // 审核情况 通过 不通过
    checkStatus(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "通过";
      } else if (val === "2") {
        return "不通过";
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
    ...mapGetters('newThemeCheckRecommendCompany', ['oneDemandData']),
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
    this.demandRecordIdData.demandRecordId = this.$route.query.id;
    this.companyId = this.$route.query.row.companyId;
    this.listingPlace = await kindo.dictionary.get('listingPlace');    //上市地点
    this.post = await kindo.dictionary.get('post');    //职位
    this.mainMarket = await kindo.dictionary.get('mainMarket');    //目标市场
    this.mainType = await kindo.dictionary.get('mainType');    //目标客户类型
    this.developNum = await kindo.dictionary.get('developNum');    //研发部门人数
    this.participationGoal = await kindo.dictionary.get('participationGoal');    //参展目的
    this.tradeForm = await kindo.dictionary.get('tradeForm');    //贸易形式
    this.staff = await kindo.dictionary.get('staff');    //员工数量
    if (this.$route.query.row.clusterCheckStatus !== '0') {
      this.checkForm.examineStatus = this.$route.query.row.clusterCheckStatus;
      this.checkForm.examineOpinion = this.$route.query.row.clusterCheckOpinion;
    }
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
    },
    'newcafe': {
      handler(val) {
        if (val && val.length > 0) {
          this.setTable.cantonCode = val;
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('newThemeCheckRecommendCompany', ['getOneDemand', 'postCheckCompanyInfo', 'postCheckCompanyApply']),
    ...mapActions('newThemeWorkDepartCheckNumber', ['postCheckCustomsCode', // 海关编码审核
      'getCompanyBaseInfo', // 企业基本信息
      'postcheckCompanyBaseInfo', // 企业基本信息审核
      'postcheckCompanyProduct', // 企业展品信息审核
      'getEnterpriseLegal', // 营业执照
      'postCheckEnterpriseLegal', // 营业执照审核
      'getForeignCertificate', // 外贸经营资质证明
      'postCheckForeignCertificate', // 外贸经营资质证明审核
      'getDomesticSales', // 国内销售额
      'postcheckDomesticSales', // 国内销售额审核
      'getProductBrief', // 产品简介
      'postCheckProductBrief', // 产品简介审核
      'getTradeMarkRegistOut', // 境外商标
      'postCheckTradeMarkRegistOut', // 境外商标审核
      'getInnovateProperty', // 专利版权
      'postCheckInnovateProperty', // 专利版权审核
      'getPropertyStandard', // 国家或行业标准
      'postCheckPropertyStandard', // 国家或行业标准审核
      'getIntelPassCertified', // 国际通行认证
      'postCheckIntelPassCertified', // 国际通行认证审核
      'getAssistanceProject', // 国际专业展
      'postCheckAssistanceProject', // 国际专业展审核
      'getActorProject', // 援助项目
      'postCheckActorProject',  // 援助项目审核
      'getFile' // 获取附件图片
    ]),
    ...mapActions("quantitativeArrangement", [
      "getSetCantonCode", //修改广交会编码
      'getCheckCantonCode'  //广交会编码判重
    ]),
    //企业基本信息
    getcompanyInfo() {
      this.loadingone = true;
      this.getCompanyBaseInfo({
        companyId: this.$route.query.row.companyId
      }).then(res => {
        this.tableData.data = JSON.parse(JSON.stringify(res));
        if (res.clusterCheckStatus === '2') {
          this.examineStatusOpts = [{ value: '2', label: '不通过' }];
          if (this.$route.query.row.clusterCheckStatus === '2') {
            this.checkForm.examineStatus = this.$route.query.row.clusterCheckStatus;
            this.checkForm.examineOpinion = this.$route.query.row.clusterCheckOpinion;
          } else {
            this.checkForm.examineStatus = "";
          }
        } else if (this.companyDetailsForm.clusterCheckStatus !== '2' && this.companyBaseInfoData.clusterCheckStatus !== '2') {
          this.examineStatusOpts = [{ value: '1', label: '通过' }, { value: '2', label: '不通过' }];
        }
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
    // 打开设置广交会编码弹框
    openSetting() {
      if (this.companyBaseInfoData.cantonCode !== '' && this.companyBaseInfoData.cantonCode != null) {
        this.$message.warning("企业已获得广交会编码，交易团不能重新设置");
      } else {
        this.setTable.companyId = this.$route.query.row.companyId;
        this.setTable.cantonCode = '';
        this.isSet = true;
      }
    },
    // 设置广交会编码保存
    handleCodeSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          let newCode = this.$store.getters.userInfo.workDeptCode;
          let newlength = this.setTable.cantonCode.slice(0, this.$store.getters.userInfo.workDeptCode.length);
          if (this.disabled === false) {
            if (newCode === newlength) {
              this.getCheckCantonCode(this.setTable.cantonCode).then((res) => {
                this.getSetCantonCode(this.setTable).then((newres) => {
                  this.$nextTick(() => {
                    fullScreenloading.close();
                  });
                  this.$message({
                    type: "success",
                    message: "修改成功!"
                  });
                  this.isSet = false;
                  this.getcompanyInfo();
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
            } else {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message.error('广交会编码必须与交易团编码一致!');
            }
          } else {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message.error('请重新提交修改广交会编码申请!');
          }
        }
      });
    },
    // 附件下载
    handleDownloadFile(url) {
      window.open(`${process.env.API_NA_URL}/api/file/get?fileId=${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
      // this.getFile({ fileId: url }).then(res => {
      // }).catch(e => {});
    },
    // 图片下载
    handleDownloadImg(url) {
      window.open(`${process.env.API_NA_URL}/api/file/getImg?fileId=${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 是否已有勾选值
    handleDisabled(type) {
      let list = this.checkList[type];
      if (list.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    // 勾选封装
    handleCheckedChange(rows, list, id) { // 选中的数据获取
      this.checkList[list] = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList[list].push({
              ownId: row[id],
              examineStatus: '',
              examineUserId: this.$store.getters.userInfo.userId,
              examineUserCn: this.$store.getters.userInfo.userName,
              examineOpinion: '',
              examineOrg: 'DELEGATION'
            });
          }
        });
      }
    },
    // 审核选项改变
    handleChange() {
      this.checkForm.examineOpinion = '';
    },
    // 单条通过审核
    handlePass(type, id, status) {
      let submitData = [];
      let checkData = {};
      if (this.checkList[type].length < 2 || id !== '') {
        let fullScreenloading = this.$loading({ fullscreen: true });
        if (this.checkList[type].length === 0 || id !== '') {
          checkData = JSON.parse(JSON.stringify(this.checkTable));
          submitData.push(checkData);
          submitData[0].ownId = id;
        } else if (this.checkList[type].length === 1) {
          submitData = this.checkList[type];
        }
        submitData[0].examineStatus = status;
        // 修改人 李康  时间 5/27 修改了问题4  单选通过时的提示框
        // this.$confirm('确定进行此操作吗', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        switch (type) {
          case 'company':
            submitData[0].ownId = this.$route.query.id;
            this.postCheckCompanyInfo(submitData[0]).then(() => {
              if (this.companyDetailsForm.clusterCheckStatus !== '2' && this.companyBaseInfoData.clusterCheckStatus !== '2') {
                this.examineStatusOpts = [{ value: '1', label: '通过' }, { value: '2', label: '不通过' }];
              }
              this.singleCreatedQuery('company', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'companyProduct':
            this.postcheckCompanyProduct(submitData).then(() => {
              this.singleCreatedQuery('companyProduct', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'customsCode':
            this.postCheckCustomsCode(submitData).then(() => {
              this.singleCreatedQuery('customsCode', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'enterpriseLegal':
            this.postCheckEnterpriseLegal(submitData[0]).then(() => {
              this.singleCreatedQuery('enterpriseLegal', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'foreignCertificate':
            this.postCheckForeignCertificate(submitData[0]).then(() => {
              this.singleCreatedQuery('foreignCertificate', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          // case 'domesticSales':
          //   this.postcheckDomesticSales(submitData[0]).then(() => {
          //     this.$message.success('操作成功');
          //     this.createdQuery();
          //   }).catch(e => {
          //     this.$nextTick(() => {
          //       fullScreenloading.close();
          //     });
          //   });
          //   break;
          case 'productBrief':
            this.postCheckProductBrief(submitData[0]).then(() => {
              this.singleCreatedQuery('productBrief', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'countrySkill':
          case 'innovateProve':
            this.postCheckInnovateProperty(submitData).then(() => {
              this.singleCreatedQuery('innovateProve', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'tradeMarkRegistOut':
            this.postCheckTradeMarkRegistOut(submitData).then(() => {
              this.singleCreatedQuery('tradeMarkRegistOut', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'propertyStandard':
            this.postCheckPropertyStandard(submitData).then(() => {
              this.singleCreatedQuery('propertyStandard', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'intelPassCertified':
            this.postCheckIntelPassCertified(submitData).then(() => {
              this.singleCreatedQuery('intelPassCertified', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'actorExhibit':
            this.postCheckAssistanceProject(submitData).then(() => {
              this.singleCreatedQuery('actorExhibit', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          case 'actorProject':
            this.postCheckActorProject(submitData).then(() => {
              this.singleCreatedQuery('actorProject', 0);
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
            break;
          default:
            break;
        }
        // }).catch(() => {
        //   this.$message.info('已取消本次操作');
        // });
      } else if (this.checkList[type].length > 1 && status === '1' && id === '') {
        this.handleIsPass(type, status);
      } else {
        this.handleNoPass(type, '', status);
      }
    },
    // 批量通过
    handleIsPass(type, status) {
      let submitData = [];
      for (let i = 0, l = this.checkList[type].length; i < l; i++) {
        this.checkList[type][i].examineStatus = status;
      }
      submitData = this.checkList[type];
      this.$confirm('确定将勾选项进行此操作吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        switch (type) {
          case 'companyProduct':
            this.postcheckCompanyProduct(submitData).then(() => {
              this.singleCreatedQuery('companyProduct', 0);
            }).catch(e => {});
            break;
          case 'customsCode':
            this.postCheckCustomsCode(submitData).then(() => {
              this.singleCreatedQuery('customsCode', 0);
            }).catch(e => {});
            break;
          case 'countrySkill':
          case 'innovateProve':
            this.postCheckInnovateProperty(submitData).then(() => {
              this.singleCreatedQuery('innovateProve', 0);
            }).catch(e => {});
            break;
          case 'tradeMarkRegistOut':
            this.postCheckTradeMarkRegistOut(submitData).then(() => {
              this.singleCreatedQuery('tradeMarkRegistOut', 0);
            }).catch(e => {});
            break;
          case 'propertyStandard':
            this.postCheckPropertyStandard(submitData).then(() => {
              this.singleCreatedQuery('propertyStandard', 0);
            }).catch(e => {});
            break;
          case 'intelPassCertified':
            this.postCheckIntelPassCertified(submitData).then(() => {
              this.singleCreatedQuery('intelPassCertified', 0);
            }).catch(e => {});
            break;
          case 'actorExhibit':
            this.postCheckAssistanceProject(submitData).then(() => {
              this.singleCreatedQuery('actorExhibit', 0);
            }).catch(e => {});
            break;
          case 'actorProject':
            this.postCheckActorProject(submitData).then(() => {
              this.singleCreatedQuery('actorProject', 0);
            }).catch(e => {});
            break;
          default:
            break;
        }
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    // 打开批量审核弹框
    handleNoPass(type, id, status) {
      this.checkTable.examineOpinion = '';
      this.saveData = {
        type: type,
        id: id,
        status: status
      };
      this.isPass = true;
    },
    // 点击保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          let submitData = [];
          let checkData = {};
          if (this.checkList[this.saveData.type].length === 0) {
            checkData = JSON.parse(JSON.stringify(this.checkTable));
            checkData.examineStatus = this.saveData.status;
            checkData.ownId = this.saveData.id;
            checkData.examineOpinion = this.checkTable.examineOpinion;
            submitData.push(checkData);
          } else if (this.checkList[this.saveData.type].length > 0) {
            if (this.saveData.id === '') {
              for (let i = 0, l = this.checkList[this.saveData.type].length; i < l; i++) {
                this.checkList[this.saveData.type][i].examineStatus = this.saveData.status;
                this.checkList[this.saveData.type][i].examineOpinion = this.checkTable.examineOpinion;
              }
              submitData = this.checkList[this.saveData.type];
            } else {
              checkData = JSON.parse(JSON.stringify(this.checkTable));
              checkData.examineStatus = this.saveData.status;
              checkData.ownId = this.saveData.id;
              checkData.examineOpinion = this.checkTable.examineOpinion;
              submitData.push(checkData);
            }
          }
          switch (this.saveData.type) {
            case 'company':
              submitData[0].ownId = this.$route.query.id;
              this.postCheckCompanyInfo(submitData[0]).then(() => {
                this.examineStatusOpts = [{ value: '2', label: '不通过' }];
                this.checkForm.examineStatus = "";
                this.singleCreatedQuery('company', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'companyProduct':
              this.postcheckCompanyProduct(submitData).then(() => {
                this.singleCreatedQuery('companyProduct', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'enterpriseLegal':
              this.postCheckEnterpriseLegal(submitData[0]).then(() => {
                this.singleCreatedQuery('enterpriseLegal', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'foreignCertificate':
              this.postCheckForeignCertificate(submitData[0]).then(() => {
                this.singleCreatedQuery('foreignCertificate', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'customsCode':
              this.postCheckCustomsCode(submitData).then(() => {
                this.singleCreatedQuery('customsCode', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            // case 'domesticSales':
            //   this.postcheckDomesticSales(submitData[0]).then(() => {
            //     this.$message.success('操作成功');
            //     this.isPass = false;
            //     this.createdQuery();
            //   }).catch(e => {
            //     this.$nextTick(() => {
            //       fullScreenloading.close();
            //     });
            //   });
            //   break;
            case 'productBrief':
              this.postCheckProductBrief(submitData[0]).then(() => {
                this.singleCreatedQuery('productBrief', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'countrySkill':
            case 'innovateProve':
              this.postCheckInnovateProperty(submitData).then(() => {
                this.singleCreatedQuery('innovateProve', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'tradeMarkRegistOut':
              this.postCheckTradeMarkRegistOut(submitData).then(() => {
                this.singleCreatedQuery('tradeMarkRegistOut', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'propertyStandard':
              this.postCheckPropertyStandard(submitData).then(() => {
                this.singleCreatedQuery('propertyStandard', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'intelPassCertified':
              this.postCheckIntelPassCertified(submitData).then(() => {
                this.singleCreatedQuery('intelPassCertified', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'actorExhibit':
              this.postCheckAssistanceProject(submitData).then(() => {
                this.singleCreatedQuery('actorExhibit', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'actorProject':
              this.postCheckActorProject(submitData).then(() => {
                this.singleCreatedQuery('actorProject', 1);
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            default:
              break;
          }
        }
      });
    },
    // 国内销售额编辑
    toEdit(index, row) {
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.lastSalesList = JSON.parse(JSON.stringify(this.domesticSalesList));
        this.domesticSalesList[index]['edit'] = true;
        this.lastIndex = index;
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃本次编辑？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.domesticSalesList = JSON.parse(JSON.stringify(this.lastSalesList));
          for (let i = 0; i < this.domesticSalesList.length; i++) {
            this.domesticSalesList[i]['edit'] = false;
          }
          this.domesticSalesList[index]['edit'] = true;
          this.lastIndex = index;
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 国内销售额保存
    toSave(index, row) {
      let validArr = [];
      let flag = '';
      for (let i = 0; i < this.domesticSalesList.length; i++) {
        if (this.$refs[`saleCheck${i}`]) {
          this.$refs[`saleCheck${i}`].validate(valid => {
            validArr.push(valid);
          });
        } else {
          continue;
        }
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        let submitObj = {
          examineStatus: '1',
          ownId: this.demandRecordIdData.demandRecordId,
          examineUserId: this.$store.getters.userInfo.userId,
          examineUserCn: this.$store.getters.userInfo.userName,
          examineOpinion: row.saleCheck,
          examineOrg: 'DELEGATION'
        };
        this.postcheckDomesticSales(submitObj).then(() => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.domesticSalesList[index]['edit'] = false;
          this.lastIndex = '';
          this.singleCreatedQuery('domesticSales', 0);
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      } else {
        this.$message.error('请确认所有可填项填写正确');
      }
    },
    handleFlagCheck(arr, status, name) {
      let st = true;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][status] === '0') {
          st = false;
          break;
        }
      }
      if (st) {
        this.noCheckList.push('true');
      } else {
        this.noCheckList.push(name);
      }
      return st;
    },
    // 关闭第一个审核弹框
    btnshow(val) {
      // if (this.$route.query.id) {
      //   this.onebtnData.examineOpinion = val;
      //   this.onebtnData.row = this.$route.query.id;
      //   // this.btnDialogVisible = true;

      // }
      // if (this.$route.query.row) {
      this.auditForm.examineOpinion = '';
      this.onebtnData.examineOpinion = val;
      this.onebtnData.row = this.$route.query.row;
      // this.btnDialogVisible = true;   // 修改人 李康 将此行注释 增加了下面内容 5/22
      let temp = {};
      temp.ownId = this.$route.query.row.companyId;
      temp.examineOrg = this.$store.getters.userInfo.org.deptId;
      temp.examineOrgCn = this.$store.getters.userInfo.org.deptName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.roleJsonStr;
      if (val === "通过") {
        temp.examineStatus = 1;
        temp.examineOpinion = '';
        this.postcheckCompanyBaseInfo(temp).then(res => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.getcompanyInfo();
        });
      } else {
        this.isShow = true;
      }
      // }
    },
    // 第一个 审核不通过 弹框
    npSeave(datae) {
      let temp = {};
      temp.ownId = this.$route.query.row.companyId;
      temp.examineOrg = this.$store.getters.userInfo.org.deptId;
      temp.examineOrgCn = this.$store.getters.userInfo.org.deptName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.roleJsonStr;
      temp.examineStatus = 2;
      temp.examineOpinion = this.auditForm.examineOpinion;
      this.$refs[datae].validate(vald => {
        if (vald) {
          this.postcheckCompanyBaseInfo(temp).then(res => {
            this.isShow = false;
            this.$message({
              message: "审核不通过",
              type: "success"
            });
            this.examineStatusOpts = [{ value: '2', label: '不通过' }];
            this.checkForm.examineStatus = "";
            this.getcompanyInfo();
          }).catch(e => {});
        }
      });
    },
    // 关闭企业基本信息审核
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getcompanyInfo();
    },
    // 底部保存
    handleSaveDetails(formName) {
      this.checkForm.ownId = this.$route.query.id;
      let flag = [];
      this.noCheckList = [];
      // 企业基本信息
      if (this.companyBaseInfoData.clusterCheckStatus !== '0') {
        flag.push(true);
        this.noCheckList.push('true');
      } else {
        flag.push(false);
        this.noCheckList.push('企业基本信息');
      }
      // 企业申请资料
      if (this.oneDemandData.clusterCheckStatus !== '0') {
        flag.push(true);
        this.noCheckList.push('true');
      } else {
        flag.push(false);
        this.noCheckList.push('企业申请资料');
      }
      // 企业展品信息
      flag.push(this.handleFlagCheck(this.companyDetailsForm.companyProductList, 'clusterCheckStatus', '企业展品信息'));
      // 营业执照
      flag.push(this.handleFlagCheck(this.enterpriseLegal.list, 'clusterCheckStatus', '营业执照'));
      // 外贸经营资质证明
      flag.push(this.handleFlagCheck(this.foreignCertificate.list, 'clusterCheckStatus', '外贸经营资质证明'));
      // 海关编码
      flag.push(this.handleFlagCheck(this.oneDemandData.companyCustomsCodeList, 'clusterCheckCustomsStatus', '海关编码'));
      // 国内销售额
      // flag.push(this.handleFlagCheck(this.domesticSales.list, 'checkStatus', '国内销售额'));
      flag.push(true);
      this.noCheckList.push('true');
      // 产品简介
      flag.push(this.handleFlagCheck(this.productBrief.list, 'clusterCheckStatus', '产品简介'));
      // 境外注册商标
      flag.push(this.handleFlagCheck(this.tradeMarkRegistOut, 'checkStatus', '境外注册商标'));
      // 国家高新技术
      flag.push(this.handleFlagCheck(this.innovateProperty.countrySkill, 'checkStatus', '国家高新技术'));
      // 专利证明
      flag.push(this.handleFlagCheck(this.innovateProperty.innovateProve, 'checkStatus', '专利证明'));
      // 参与国家或行业标准制定
      flag.push(this.handleFlagCheck(this.propertyStandard, 'checkStatus', '参与国家或行业标准制定'));
      // 国际通行认证
      flag.push(this.handleFlagCheck(this.intelPassCertified, 'checkStatus', '国际通行认证'));
      // 近两年参加国际专业展
      flag.push(this.handleFlagCheck(this.assistanceProject, 'approveStatus', '近两年参加国际专业展'));
      // 近两年参与商务部对外经济合作、援助项目
      flag.push(this.handleFlagCheck(this.actorProject, 'approveResult', '近两年参与商务部对外经济合作、援助项目'));
      if (!flag.includes(false)) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.postCheckCompanyApply(this.checkForm).then(() => {
              this.$message.success('保存成功');
              this.handleCancel();
            }).catch(e => {});
          }
        });
      } else {
        let str = '';
        let noCheckArr = [];
        let indexArr = [];
        for (let i = 0; i < this.noCheckList.length; i++) {
          if (this.noCheckList[i] !== 'true') {
            noCheckArr.push(this.noCheckList[i]);
            indexArr.push(`${i}`);
          }
        }
        str = noCheckArr.join('；');
        this.$message.warning(`请确认 ${str} 这些信息中所有的数据是否已审核`);
        this.activeCollapse = indexArr;
      }
    },
    // 点击取消
    handleCancel() {
      let queryForm = this.$route.query.form;
      let pageInfo = this.$route.query.page;
      this.$router.push({ path: '/checkCompanyTable', query: { form: queryForm, page: pageInfo }});
    },
    // 单个查询封装
    singleCreatedQuery(name, flag) {
      this.$message.success('操作成功');
      if (flag) {
        this.isPass = false;
      }
      let fullScreenloading = this.$loading({ fullscreen: true });
      // 初始化
      this.checkList = {
        company: [], // 企业资料
        companyProduct: [], // 企业展品信息
        enterpriseLegal: [], // 营业执照
        foreignCertificate: [], // 外贸经营资质证明
        customsCode: [], // 海关编码
        domesticSales: [], // 国内销售额
        productBrief: [], // 产品简介
        tradeMarkRegistOut: [], // 境外注册商标
        countrySkill: [], // 国家高新技术
        innovateProve: [], // 专利版权
        propertyStandard: [], // 国家或行业标准
        intelPassCertified: [], // 国际通行认证
        actorExhibit: [], // 国际专业展
        actorProject: [] // 援助项目
      };
      this.checkTable.examineOpinion = '';
      // 释放国内销售额编辑的内存
      this.lastIndex = '';
      this.lastSaleList = [];
      // 单个表进行查询
      switch (name) {
        case 'company':
          this.getOneDemand(this.demandRecordIdData).then(res => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.companyDetailsForm = JSON.parse(JSON.stringify(this.oneDemandData));
            this.companyDetailsAllInfo = this.companyDetailsForm.companyAllInfo ? this.companyDetailsForm.companyAllInfo.enterprisesType : '';
            if (this.companyDetailsForm.clusterCheckStatus === '2') {
              this.examineStatusOpts = [{ value: '2', label: '不通过' }];
              this.checkForm.examineStatus = "";
            }
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'companyProduct':
          this.getOneDemand(this.demandRecordIdData).then(res => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.companyDetailsForm = JSON.parse(JSON.stringify(this.oneDemandData));
            this.companyDetailsAllInfo = this.companyDetailsForm.companyAllInfo ? this.companyDetailsForm.companyAllInfo.enterprisesType : '';
            if (this.companyDetailsForm.clusterCheckStatus === '2') {
              this.examineStatusOpts = [{ value: '2', label: '不通过' }];
              this.checkForm.examineStatus = "";
            }
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'enterpriseLegal':
          this.getEnterpriseLegal(this.demandRecordIdData).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'domesticSales':
          this.getDomesticSales(this.demandRecordIdData).then(() => {
            let list = JSON.parse(JSON.stringify(this.domesticSales));
            for (let i = 0, l = list.length; i < l; i++) {
              list[i].edit = false;
              list[i].saleCheck = list[i].clusterCheckOpinion ? list[i].clusterCheckOpinion : list[i].insideSale;
            }
            this.domesticSalesList = JSON.parse(JSON.stringify(list));
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'foreignCertificate':
          this.getForeignCertificate(this.demandRecordIdData).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'customsCode':
          this.getOneDemand(this.demandRecordIdData).then(res => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.companyDetailsForm = JSON.parse(JSON.stringify(this.oneDemandData));
            this.companyDetailsAllInfo = this.companyDetailsForm.companyAllInfo ? this.companyDetailsForm.companyAllInfo.enterprisesType : '';
            if (this.companyDetailsForm.clusterCheckStatus === '2') {
              this.examineStatusOpts = [{ value: '2', label: '不通过' }];
              this.checkForm.examineStatus = "";
            }
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'productBrief':
          this.getProductBrief(this.demandRecordIdData).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'innovateProve':
          this.getInnovateProperty({ companyId: this.companyId }).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'tradeMarkRegistOut':
          this.getTradeMarkRegistOut({ companyId: this.companyId }).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'propertyStandard':
          this.getPropertyStandard({ companyId: this.companyId }).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'intelPassCertified':
          this.getIntelPassCertified({ companyId: this.companyId }).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'actorExhibit':
          this.getAssistanceProject({ companyId: this.companyId }).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        case 'actorProject':
          this.getActorProject({ companyId: this.companyId }).then(() => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
          break;
        default:
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          break;
      }
    },
    // 查询封装
    createdQuery() {
      let fullScreenloading = this.$loading({ fullscreen: true });
      // 初始化
      this.checkList = {
        company: [], // 企业资料
        companyProduct: [], // 企业展品信息
        enterpriseLegal: [], // 营业执照
        foreignCertificate: [], // 外贸经营资质证明
        customsCode: [], // 海关编码
        domesticSales: [], // 国内销售额
        productBrief: [], // 产品简介
        tradeMarkRegistOut: [], // 境外注册商标
        countrySkill: [], // 国家高新技术
        innovateProve: [], // 专利版权
        propertyStandard: [], // 国家或行业标准
        intelPassCertified: [], // 国际通行认证
        actorExhibit: [], // 国际专业展
        actorProject: [] // 援助项目
      };
      this.checkTable.examineOpinion = '';
      this.getOneDemand(this.demandRecordIdData).then(res => {
        this.companyDetailsForm = JSON.parse(JSON.stringify(this.oneDemandData));
        this.companyDetailsAllInfo = this.companyDetailsForm.companyAllInfo ? this.companyDetailsForm.companyAllInfo.enterprisesType : '';
        if (this.companyDetailsForm.clusterCheckStatus === '2') {
          this.examineStatusOpts = [{ value: '2', label: '不通过' }];
          this.checkForm.examineStatus = "";
        }
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
        this.getDomesticSales(this.demandRecordIdData).then(() => {
          let list = JSON.parse(JSON.stringify(this.domesticSales));
          for (let i = 0, l = list.length; i < l; i++) {
            list[i].edit = false;
            list[i].saleCheck = list[i].clusterCheckOpinion ? list[i].clusterCheckOpinion : list[i].insideSale;
          }
          this.lastIndex = '';
          this.lastSaleList = [];
          this.domesticSalesList = JSON.parse(JSON.stringify(list));
        }).catch(e => {
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
<style lang='less' scoped>
.newbtn {
    padding: 10px 0;
    border: 1px solid #ebeef5;
    border-top: 0;
    font-size: 12px;
    background-color: #F5F7FA;
  }
  .newfathbtn {
    border: 1px solid #ebeef5;
    border-top: 0; display: flex;
    justify-content: space-around;
    line-height: 34px;
    .newonebtn {
      border-right: 1px solid #ebeef5;
      flex:1;
      text-align: center;
    }
  }
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
  // 弹框 ↓
  .cont {
    text-align: center;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .formStyle {
    padding: 8px 30px;
  }
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}
</style>
<style scoped>
.item-Num >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
</style>
