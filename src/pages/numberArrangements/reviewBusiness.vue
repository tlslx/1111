<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核企业资料详情页" name="first"></el-tab-pane>
      <el-button @click="back" type="danger">返回</el-button>
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">公司基本信息：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter">{{id.checkResult === '1' ? '审核通过' :(id.checkResult === '2' ? '审核不通过' : '未审核') }}</div>
        </el-col>
      </el-row>
      <!-- 表格1 -->
      <el-collapse v-model="activeNames" id="collapsebox" @change="handleChange">
        <el-card class="box-card">
          <el-collapse-item title="公司基本信息：" name="1">
            <el-form label-width="280px" size="small">
              <div class="mesgbox">
                <el-form-item label="是否上市公司：">
                  <span class="mesgbox_mesg">{{data.listedStatus | checkStatus}}</span>
                </el-form-item>
                <el-form-item label="厂房面积：">
                  <span class="mesgbox_mesg">{{data.plantArea}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="上市地点：">
                  <span class="mesgbox_mesg">{{data.listedPlace}}</span>
                </el-form-item>
                <el-form-item label="主营产品关键字（中文）：">
                  <span class="mesgbox_mesg">{{data.mainProductKeywordCh}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="股票代码：">
                  <span class="mesgbox_mesg">{{data.stockCode}}</span>
                </el-form-item>
                <el-form-item label="主营产品关键字（英文）：">
                  <span class="mesgbox_mesg">{{data.mainProductKeywordEn}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="商（协）会会员号：">
                  <span class="mesgbox_mesg">{{data.businessAssociationCode}}</span>
                </el-form-item>
                <el-form-item label="公司名称分词：">
                  <span class="mesgbox_mesg">{{data.companyPpl}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="公司成立年份：">
                  <span class="mesgbox_mesg">{{data.incorporationYear}}</span>
                </el-form-item>
                <el-form-item label="纳税人识别号/统一社会信用代码：">
                  <span class="mesgbox_mesg">{{data.taxpayerIdentificationNo}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="注册资本：">
                  <span class="mesgbox_mesg">{{data.registeredCapital}}</span>
                </el-form-item>
                <el-form-item label="贸易形式：">
                  <span class="mesgbox_mesg">{{data.tradeForm}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="员工数量：">
                  <span class="mesgbox_mesg">{{data.employeesCount}}</span>
                </el-form-item>
                <el-form-item label="公司Logo：">
                  <!-- <span class="mesgbox_mesg">{{data.companyLogoId}}</span> -->
                  <img style="width: 100%; height: 100%; text-align: center;" :src="data.companyLogoId" alt>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="生产部门人数：">
                  <span class="mesgbox_mesg">{{data.productionEmployeesCount}}</span>
                </el-form-item>
                <el-form-item label="公司形象图：">
                  <!-- <span class="mesgbox_mesg">{{data.companyImageId}}</span> -->
                  <img style="width: 100%; height: 100%; text-align: center;" :src="data.companyImageId" alt>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="研发部门人数：">
                  <span class="mesgbox_mesg">{{data.developEmployeesCount}}</span>
                </el-form-item>
                <el-form-item label="公司简介：">
                  <span class="mesgbox_mesg">{{data.companyProfileCh}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="质检部门人数 ：">
                  <span class="mesgbox_mesg">{{data.qualityEmployeesCount}}</span>
                </el-form-item>
                <el-form-item label="企业首次参展时间 ：">
                  <span class="mesgbox_mesg">{{data.firstExhibitionDate}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="">
                  <span class="mesgbox_mesg">{{"是否大会禁止参展企业"}}</span>
                </el-form-item>
                <el-form-item :label="enterpriseList.forbidJoin">
                  <!-- <span class="mesgbox_mesg">{{isTrue}}</span> -->
                </el-form-item>
              </div>
              <div class="newbtn">
                <p>（一）商务部向社会公告的违规违法企业，在公告期内禁止参展。</p>
                <p>（二）国家工商、海关、税务、质检、外汇、环保、药监等部门通报的违规违法企业, 在处罚期限内禁止参展；无处罚期限的，从处罚之日起连续六届禁止参展。</p>
                <p>（三）因违规转让或转租（卖）广交会展位、涉嫌展品质量与贸易纠纷投诉、知识产权侵权等行为违反大会相关规定，并处于被取消参展资格处罚期限内的企业。</p>
                <p>（四）因拒不服从大会管理、破坏展览秩序等其他行为，被大会认为对广交会声誉或正常运营造成较大不良影响，被取消参展资格的企业。</p>
              </div>
            </el-form>
          </el-collapse-item>
        </el-card>
        <!-- <el-collapse-item title="企业品牌/认证/奖励/专利：" name="2">
          <el-form label-width="280px">
            <div class="mesgbox">
              <el-form-item label="品牌(商标)：">
                <span class="mesgbox_mesg">{{data.brand}}</span>
              </el-form-item>
              <el-form-item label="是否使用该品牌出口：">
                <span class="mesgbox_mesg">{{data.isOwnBrandExit | checkStatus}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="品牌中文名称：">
                <span class="mesgbox_mesg">{{data.brandCn}}</span>
              </el-form-item>
              <el-form-item label="商标（logo）：">
                <span class="mesgbox_mesg">登记萨拉</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="品牌英文名称：">
                <span class="mesgbox_mesg">{{data.brandEn}}</span>
              </el-form-item>
              <el-form-item label="国家级奖励数量：">
                <span class="mesgbox_mesg">{{data.nationalAwardsCount}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="是否自有品牌：">
                <span class="mesgbox_mesg">{{data.isSelfBrand | checkStatus}}</span>
              </el-form-item>
              <el-form-item label="省级奖励数量：">
                <span class="mesgbox_mesg">{{data.provincialAwardsCount}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="海外注册商标的国家及地区数量：">
                <span class="mesgbox_mesg">{{data.registeredTrademarkCount}}</span>
              </el-form-item>
              <el-form-item label="发明专利数：">
                <span class="mesgbox_mesg">{{data.inventionPatentsCount}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="国际/行业通行的管理体系认证的数量：">
                <span class="mesgbox_mesg">{{data.internationallytCertificationCount}}</span>
              </el-form-item>
              <el-form-item label="实用新型专利数：">
                <span class="mesgbox_mesg">{{data.utilityPatentsCount}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="面向企业的行业认证数量：">
                <span class="mesgbox_mesg">{{data.industryCertificationCount}}</span>
              </el-form-item>
              <el-form-item label="外观设计专利数：">
                <span class="mesgbox_mesg">{{data.patentsDesignCount}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="面向产品或生产线的行业认证数量：">
                <span class="mesgbox_mesg">{{data.productCertificationQuantity}}</span>
              </el-form-item>
            </div>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="参展及贸易需求：" name="3">
          <el-form label-width="280px">
            <div class="mesgbox">
              <el-form-item label="参展目的（多选）：">
                <span class="mesgbox_mesg">{{data.participationGoal}}</span>
              </el-form-item>
              <el-form-item label="主要目标客户类型（多选）：">
                <span class="mesgbox_mesg">{{data.mainCustomersType}}</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="是否有内贸业务：">
                <span class="mesgbox_mesg">{{data.nternalTradeStatus | checkStatus}}</span>
              </el-form-item>
              <el-form-item label="参展产品：">
                <span class="mesgbox_mesg">登记萨拉</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="上年度出口额前三位客户的国别或地区：">
                <span class="mesgbox_mesg">{{data.firstThreeCustomersCountry}}</span>
              </el-form-item>
              <el-form-item label="申请展位：">
                <span class="mesgbox_mesg">登记萨拉</span>
              </el-form-item>
            </div>
            <div class="mesgbox">
              <el-form-item label="主要目标市场（多选）：">
                <span class="mesgbox_mesg">{{data.mainTargetMarket}}</span>
              </el-form-item>
              <el-form-item label="是否禁止参展产品：">
                <span class="mesgbox_mesg">登记萨拉</span>
              </el-form-item>
            </div>
          </el-form>
        </el-collapse-item> -->
        <el-card class="box-card">
          <el-collapse-item title="企业联系方式：" name="4">
            <el-form label-width="280px" size="small">
              <div class="mesgbox">
                <el-form-item label="省份/城市：">
                  <span class="mesgbox_mesg">{{data.province + "/" + data.city}}</span>
                </el-form-item>
                <el-form-item label="广交会参展业务专用联系电子邮件：">
                  <span class="mesgbox_mesg">{{data.dedicatedEmail}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="业务联系人姓名（中文）：">
                  <span class="mesgbox_mesg">{{data.businessContactsCh}}</span>
                </el-form-item>
                <el-form-item label="网址：">
                  <span class="mesgbox_mesg">{{data.website}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="业务联系人姓名（英文）：">
                  <span class="mesgbox_mesg">{{data.businessContactsEn}}</span>
                </el-form-item>
                <el-form-item label="是否在“展商展品查询”中隐藏联系方式：">
                  <span class="mesgbox_mesg">{{data.hiddenContact}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="职位：">
                  <span class="mesgbox_mesg">{{data.businessContactsPosition}}</span>
                </el-form-item>
                <el-form-item label="所属交易团：">
                  <span class="mesgbox_mesg">{{data.businessDelegationName}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="电话：">
                  <span class="mesgbox_mesg">{{data.telephone}}</span>
                </el-form-item>
                <el-form-item label="交易团联系方式：">
                  <span class="mesgbox_mesg">登记萨拉</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="手机：">
                  <span class="mesgbox_mesg">{{data.phone}}</span>
                </el-form-item>
                <el-form-item label="企业地址（中文）：">
                  <span class="mesgbox_mesg">{{data.addressCh}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="传真：">
                  <span class="mesgbox_mesg">{{data.fax}}</span>
                </el-form-item>
                <el-form-item label="企业地址（英文）：">
                  <span class="mesgbox_mesg">{{data.addressEn}}</span>
                </el-form-item>
              </div>
              <div class="mesgbox">
                <el-form-item label="业务联系电子邮件：">
                  <span class="mesgbox_mesg">{{data.businessContactsEmail}}</span>
                </el-form-item>
                <el-form-item label="邮政编码：">
                  <span class="mesgbox_mesg">{{data.postalCode}}</span>
                </el-form-item>
              </div>
            </el-form>
          </el-collapse-item>
        </el-card>
        <el-card class="box-card">
          <el-collapse-item title="企业展品信息：" name="5">
            <el-table :data="ExhibitsDate" style="width: 100%" border size="small">
              <el-table-column label="产品名称" align="center" prop="productName"></el-table-column>
              <el-table-column label="图片" align="center" prop="imgfile">
                <!-- <div style="width: 148px; height: 148px; margin-bottom: 4px;"> -->
                <template slot-scope="scope">
                  <img style="width: 100%; height: 100%; text-align: center;" :src="scope.row.imgfile" alt>
                </template>
                <!-- </div> -->
              </el-table-column>
              <el-table-column label="型号" align="center" prop="productModel"></el-table-column>
              <el-table-column label="类别" align="center" prop="productType"></el-table-column>
            </el-table>
            <div class="newbtn">
              <p>（一）商务部向社会公告的违规违法企业，在公告期内禁止参展。</p>
              <p>（二）国家工商、海关、税务、质检、外汇、环保、药监等部门通报的违规违法企业, 在处罚期限内禁止参展；无处罚期限的，从处罚之日起连续六届禁止参展。</p>
              <p>（三）因违规转让或转租（卖）广交会展位、涉嫌展品质量与贸易纠纷投诉、知识产权侵权等行为违反大会相关规定，并处于被取消参展资格处罚期限内的企业。</p>
              <p>（四）因拒不服从大会管理、破坏展览秩序等其他行为，被大会认为对广交会声誉或正常运营造成较大不良影响，被取消参展资格的企业。</p>
            </div>
          </el-collapse-item>
        </el-card>
      </el-collapse>
      <!-- <el-table :data="tableDataA" v-show="isTableOne" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2">
        </el-table-column>
      </el-table> -->
      <!-- 企业品牌/认证/奖励/专利 -->
      <!-- <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">企业品牌/认证/奖励/专利：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowOne" class="el-icon-arrow-up" @click="arrowUpOne"></i><i
              v-show="!isShowOne" @click="arrowDownOne" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row> -->
      <!-- 表格2 -->
      <!-- <el-table :data="tableDataB" v-show="isTableTwo" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2"></el-table-column>
      </el-table> -->
      <!-- 参展及贸易需求 -->
      <!-- <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">参展及贸易需求：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowTwo" class="el-icon-arrow-up" @click="arrowUpTwo"></i><i v-show="!isShowTwo" @click="arrowDownTwo" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row> -->
      <!-- 表格3 -->
      <!-- <el-table :data="tableDataC" v-show="isTableThree" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2"></el-table-column>
      </el-table> -->
      <!-- 企业联系方式 -->
      <!-- <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">企业联系方式：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowThree" class="el-icon-arrow-up" @click="arrowUpThree"></i><i v-show="!isShowThree" @click="arrowDownThree" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row> -->
      <!-- 表格4 -->
      <!-- <el-table :data="tableDataD" v-show="isTableFour" style="width: 100%">
        <el-table-column align="right" header-align="center" label="名称" prop="name1"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter1"></el-table-column>
        <el-table-column align="right" label="名称" prop="name2"></el-table-column>
        <el-table-column align="center" label="内容" prop="matter2"></el-table-column>
      </el-table> -->
      <!-- 企业展品信息 -->
      <!-- <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">企业展品信息：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter"><i v-show="isShowFour" class="el-icon-arrow-up" @click="arrowUpFour"></i><i v-show="!isShowFour" @click="arrowDownFour" class="el-icon-arrow-down"></i></div>
        </el-col>
      </el-row> -->
      <!-- 表格5 -->
      <!-- <el-table :data="tableDataE" v-show="isTableFive" style="width: 100%">
        <el-table-column align="center" label="产品名称" prop="name"></el-table-column>
        <el-table-column align="center" label="图片" prop="picture">
        </el-table-column>
        <el-table-column align="right" label="型号" prop="type"></el-table-column>
        <el-table-column align="center" label="类别" prop="category"></el-table-column>
      </el-table> -->
      <!-- 交易团审核 -->
      <el-row>
        <el-col :span="6">
          <div class="allborder bgccc lheight fsizer">交易团审核：</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight">&nbsp;</div>
        </el-col>
        <el-col :span="6">
          <div class="allborder bgccc lheight fzcenter">
            <!-- <i v-show="isShowFive" class="el-icon-arrow-up" @click="arrowUpFive"></i><i v-show="!isShowFive" @click="arrowDownFive" class="el-icon-arrow-down"></i> -->
          </div>
        </el-col>
      </el-row>
      <el-card>
        <el-row>
          <el-col :span="6">
            <div class="allborder" style="text-align: right; line-height: 26px;">审核结果：</div>
          </el-col>
          <el-col :span="6">
            <div class="allborder" style="text-align: center; line-height: 26px;">
              <el-button type="primary" @click="handelSure" size="small" :disabled="disabled">通过</el-button>
              <!-- <el-button type="danger" :disabled="disabled" @click="handelBure">不通过</el-button> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="allborder" style="text-align: center; line-height: 26px;"><el-button type="danger" size="small" :disabled="disabled" @click="handelBure">不通过</el-button></div>
          </el-col>
          <el-col :span="6">
            <div class="allborder">&nbsp;</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="allborder" style="text-align: right; line-height: 26px;">审核意见：</div>
          </el-col>
          <el-col :span="18">
            <div class="allborder">
              <el-input type="textarea" :rows="5" :disabled="disabled" maxlength="48" @change="bur" v-model="audit" size="mini"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-tabs>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {
        isTrue: "是",
        ExhibitsDate: [],
        id: '',
        activeName: '',
        audit: '',
        disabled: true,
        isShowOne: true,
        isTableOne: false,
        isShowTwo: true,
        isTableTwo: false,
        isShowThree: true,
        isTableThree: false,
        isShowFour: true,
        isTableFour: false,
        isShowFive: true,
        isTableFive: false,
        checkResult: '',
        tableDataA: [
          {
            name1: "是否上市公司：",
            matter1: "是",
            name2: "厂房面积：",
            matter2: "965亩"
          },
          {
            name1: "上市地点：",
            matter1: "香港",
            name2: "主营产品关键字（中文）:",
            matter2: "手机"
          },
          {
            name1: "股票代码：",
            matter1: "123422",
            name2: "主营产品关键字（英文）:",
            matter2: "shouji"
          },
          {
            name1: "商（协）会会员号：",
            matter1: "123422",
            name2: "公司名称分词:",
            matter2: "大清"
          },
          {
            name1: "公司成立年份：",
            matter1: "1644年",
            name2: "纳税人识别号/统一社会信用代码:",
            matter2: "大清"
          },
          {
            name1: "注册资本：",
            matter1: "123422",
            name2: "贸易形式:",
            matter2: "大清"
          },
          {
            name1: "员工数量：",
            matter1: "123422",
            name2: "公司Logo:",
            matter2: "img",
            url: ""
          },
          {
            name1: "生产部门人数：",
            matter1: "123422",
            name2: "公司形象图:",
            matter2: "img",
            url: ""
          },
          {
            name1: "研发部门人数：",
            matter1: "123422",
            name2: "公司简介",
            matter2: "反清复明"
          },
          {
            name1: "质检部门人数：",
            matter1: "123422",
            name2: "企业首次参展时间:",
            matter2: "1644年"
          }
        ],
        tableDataB: [
          {
            name1: "品牌（商标）：",
            matter1: "是",
            name2: "是否使用该品牌出口：",
            matter2: "965亩"
          },
          {
            name1: "品牌中文名称：",
            matter1: "香港",
            name2: "商标（logo）:",
            matter2: "手机"
          },
          {
            name1: "品牌英文名称：",
            matter1: "123422",
            name2: "国家级奖励数量:",
            matter2: "shouji"
          },
          {
            name1: "是否自有品牌：",
            matter1: "123422",
            name2: "省级奖励数量:",
            matter2: "大清"
          },
          {
            name1: "海外注册商标的国家及地区数量：",
            matter1: "1644年",
            name2: "发明专利数:",
            matter2: "大清"
          },
          {
            name1: "国际/行业通行的管理体系认证的数量：",
            matter1: "123422",
            name2: "实用新型专利数:",
            matter2: "大清"
          },
          {
            name1: "面向企业的行业认证数量：",
            matter1: "123422",
            name2: "外观设计专利数:",
            matter2: "img"
          },
          {
            name1: "面向产品或生产线的行业认证数量：",
            matter1: "123422",
            name2: "",
            matter2: ""
          }
        ],
        tableDataC: [
          {
            name1: "参展目的（多选）：",
            matter1: "是",
            name2: "主要目标客户类型（多选）：",
            matter2: "965亩"
          },
          {
            name1: "是否有内贸业务：",
            matter1: "香港",
            name2: "参展产品:",
            matter2: "手机"
          },
          {
            name1: "上年度出口额前三位客户的国别或地区：",
            matter1: "123422",
            name2: "申请展位:",
            matter2: "shouji"
          },
          {
            name1: "主要目标市场：",
            matter1: "123422",
            name2: "是否禁止参展产品:",
            matter2: "大清"
          }
        ],
        tableDataD: [
          {
            name1: "省份/城市：",
            matter1: "是",
            name2: "广交会参展业务专用联系电子邮件：",
            matter2: "965亩"
          },
          {
            name1: "业务联系人姓名（中文）：",
            matter1: "香港",
            name2: "网址:",
            matter2: "手机"
          },
          {
            name1: "业务联系人姓名（英文）：",
            matter1: "123422",
            name2: "是否在“展商展品查询”中隐藏联系方式:",
            matter2: "shouji"
          },
          {
            name1: "职位：",
            matter1: "123422",
            name2: "所属交易团:",
            matter2: "大清"
          },
          {
            name1: "电话：",
            matter1: "1644年",
            name2: "交易团联系方式:",
            matter2: "大清"
          },
          {
            name1: "手机：",
            matter1: "123422",
            name2: "企业地址（中文）:",
            matter2: "大清"
          },
          {
            name1: "传真：",
            matter1: "123422",
            name2: "企业地址（英文）:",
            matter2: "img"
          },
          {
            name1: "业务联系电子邮件：",
            matter1: "123422",
            name2: "邮政编码：",
            matter2: ""
          }
        ],
        tableDataE: [
          {
            name: "马桶",
            picture: "img",
            type: "aw123",
            category: "Al马桶"
          },
          {
            name: "马桶",
            picture: "img",
            type: "aw123",
            category: "Al马桶"
          }
        ],
        activeNames: ["1"],
        data: {}
      };
    },
    mounted() {
      this.getEnterpriseinformation(this.$route.query.id.companyId);
      this.id = this.$router.history.current.query.id;
      if (this.id.checkResult === "1" || this.id.checkResult === "2") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.getcompanyInfoById({ companyId: this.id.companyId }).then(res => {
        // console.log(res, "res");
        this.data = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      // let dataInfo = {
      //   companyId: this.id.companyId,
      //   exhibitionArea: this.id.exhibitionArea
      // };
      // this.getcompanyProductList(dataInfo).then(res => {
      //   // console.log(res, "zhanquzhanpin");
      // }).catch(e => {});
    },
    computed: {
      ...mapGetters("quantitativeArrangement", ["enterpriseList"])
    },
    methods: {
      ...mapActions("enterprisesConfirm", ["postEviewBusiness"]),
      ...mapActions('nainformation', [
        'getcompanyInfoById', // 根据企业ID查询企业信息
        'getcompanyProductList' // 根据展区查询企业的展品
      ]),
      ...mapActions("quantitativeArrangement", ["getEnterpriseinformation", "getExhibitsinformation"]),
      back() {
        this.$router.go(-1);
      },
      // 企业展品信息
      getExhibits() {
        this.loadtwo = true;
        this.getExhibitsinformation(this.$route.query.id).then(res => {
          if (this.$route.query.row.subClusterCheckStatus === '-') {
            this.ExhibitsDate = JSON.parse(JSON.stringify(res));
            for (let key in this.ExhibitsDate) {
              this.ExhibitsDate[key].subClusterCheckStatus = '-';
            }
          } else {
            this.ExhibitsDate = JSON.parse(JSON.stringify(res));
          }
          this.loadtwo = false;
        });
      },
      // 第一个表格的收起按钮
      arrowUpOne() {
        this.isShowOne = !this.isShowOne;
        this.isTableOne = !this.isTableOne;
      },
      // 第一个表格的打开按钮
      arrowDownOne() {
        this.isShowOne = !this.isShowOne;
        this.isTableOne = !this.isTableOne;
      },
      // 第二个表格的收起按钮
      arrowUpTwo() {
        this.isShowTwo = !this.isShowTwo;
        this.isTableTwo = !this.isTableTwo;
      },
      // 第二个表格的打开按钮
      arrowDownTwo() {
        this.isShowTwo = !this.isShowTwo;
        this.isTableTwo = !this.isTableTwo;
      },
      // 第三个表格的收起按钮
      arrowUpThree() {
        this.isShowThree = !this.isShowThree;
        this.isTableThree = !this.isTableThree;
      },
      // 第三个表格的打开按钮
      arrowDownThree() {
        this.isShowThree = !this.isShowThree;
        this.isTableThree = !this.isTableThree;
      },
      // 第四个表格的收起按钮
      arrowUpFour() {
        this.isShowFour = !this.isShowFour;
        this.isTableFour = !this.isTableFour;
      },
      // 第四个表格的打开按钮
      arrowDownFour() {
        this.isShowFour = !this.isShowFour;
        this.isTableFour = !this.isTableFour;
      },
      // 第五个表格的收起按钮
      arrowUpFive() {
        this.isShowFive = !this.isShowFive;
        this.isTableFive = !this.isTableFive;
      },
      // 第五个表格的打开按钮
      arrowDownFive() {
        this.isShowFive = !this.isShowFive;
        this.isTableFive = !this.isTableFive;
      },
      bur() {
      },
      handleChange(val) {
      },
      //通过
      handelSure() {
        let obj = {
          "boothAffirmId": this.id.boothAffirmId,
          "checkResult": 1,
          "checkDescribe": this.audit
        };
        this.postEviewBusiness(obj).then(res => {
          this.$router.push('/dumplingAudit');
        }).catch(e => { });
      },
      //不通过
      handelBure() {
        let boaa = {
          "boothAffirmId": this.id.boothAffirmId,
          "checkResult": 2,
          "checkDescribe": this.audit
        };
        if (this.audit === "") {
          this.$message("请填写审核意见");
        } else {
          this.postEviewBusiness(boaa).then(res => {
            this.$router.push('/dumplingAudit');
          }).catch(e => { });
        }
        // this.postEviewBusiness(boaa).then(res => {
        //   this.$router.push('/dumpling_audit');
        // }).catch(e => { });
      }
    }
  };
</script>
<style>
  .allborder {
    border: 1px solid #fff;
  }

  .bgccc {
    background: #ccc;
  }

  .lheight {
    line-height: 30px;
  }

  .fsizer {
    font-size: 16px;
    font-weight: 600;
    text-align: right;
  }

  .fzcenter {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
  #special_tabs >>> .el-tabs__header{
    border-bottom: 0 !important;
  }  
  #special_tabs >>> .el-tabs__header .el-tabs__nav{
    border: 0 !important;
    float: right;
  }
  .mesgbox{
    display: flex;
  }
  .mesgbox .el-form-item{
    width: 50%;
  }
  .mesgbox .mesgbox_mesg{
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .el-layout #collapsebox >>> .el-collapse-item__header {
    background-color: #f5f7fa !important;
    padding: 0 10px !important;
  }
  .newbtn {
    padding: 10px 0;
    border: 1px solid #ebeef5;
    border-top: 0;
    font-size: 12px;
    background-color: #F5F7FA;
  }
  .box-card {
    margin-bottom: 0 24px 24px 24px;
  }
</style>