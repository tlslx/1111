<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业资质" name="first">
      <el-tabs v-model="companyActive" type="border-card">
        <el-tab-pane label="查看企业资料" name='info'>
          <el-tabs id="special_tabs" v-model="activeNameTwo" type="card">
            <el-tab-pane label="公司基本信息" name="first">
              <el-form label-width="280px">
                <div class="mesgbox">
                  <el-form-item label="是否上市公司：">
                    <span class="mesgbox_mesg">{{ listedStatus }}</span>
                  </el-form-item>
                  <el-form-item label="厂房面积：">
                    <span class="mesgbox_mesg">{{ plantArea }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="上市地点：">
                    <span class="mesgbox_mesg">{{ listedPlace }}</span>
                  </el-form-item>
                  <el-form-item label="主营产品关键字（中文）：">
                    <span class="mesgbox_mesg">{{ mainProductKeywordCh }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="股票代码：">
                    <span class="mesgbox_mesg">{{ stockCode }}</span>
                  </el-form-item>
                  <el-form-item label="主营产品关键字（英文）：">
                    <span class="mesgbox_mesg">{{ mainProductKeywordEn }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="商（协）会会员号：">
                    <span class="mesgbox_mesg">{{ businessAssociationCode }}</span>
                  </el-form-item>
                  <el-form-item label="公司名称分词：">
                    <span class="mesgbox_mesg">{{ companyPpl }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="公司成立年份：">
                    <span class="mesgbox_mesg">{{ incorporationYear }}</span>
                  </el-form-item>
                  <el-form-item label="纳税人识别号/统一社会信用代码：">
                    <span class="mesgbox_mesg">{{ taxpayerIdentificationNo }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="注册资本：">
                    <span class="mesgbox_mesg">{{ registeredCapital }}</span>
                  </el-form-item>
                  <el-form-item label="贸易形式：">
                    <span class="mesgbox_mesg">{{ tradeForm }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="员工数量：">
                    <span class="mesgbox_mesg">{{ employeesCount }}</span>
                  </el-form-item>
                  <el-form-item label="公司Logo：">
                    <span class="mesgbox_mesg">{{ companyLogoId }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="生产部门人数：">
                    <span class="mesgbox_mesg">{{ productionEmployeesCount }}</span>
                  </el-form-item>
                  <el-form-item label="公司形象图：">
                    <span class="mesgbox_mesg">{{ companyImageId }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="研发部门人数：">
                    <span class="mesgbox_mesg">{{ developEmployeesCount }}</span>
                  </el-form-item>
                  <el-form-item label="公司简介：">
                    <span class="mesgbox_mesg">{{ companyProfileCh ? companyProfileCh : companyProfileEn }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="质检部门人数：">
                    <span class="mesgbox_mesg">{{ qualityEmployeesCount }}</span>
                  </el-form-item>
                  <el-form-item label="企业首次参展时间：">
                    <span class="mesgbox_mesg">{{ firstExhibitionDate }}</span>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="企业品牌认证奖励专利" name="second">
              <el-form label-width="280px">
                <div class="mesgbox">
                  <el-form-item label="品牌(商标)：">
                    <span class="mesgbox_mesg">{{ brand }}</span>
                  </el-form-item>
                  <el-form-item label="是否使用该品牌出口：">
                    <span class="mesgbox_mesg">{{ isOwnBrandExit }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="品牌中文名称：">
                    <span class="mesgbox_mesg">{{ brandCn }}</span>
                  </el-form-item>
                  <el-form-item label="商标（logo）：">
                    <span class="mesgbox_mesg">登记萨拉</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="品牌英文名称：">
                    <span class="mesgbox_mesg">{{ brandEn }}</span>
                  </el-form-item>
                  <el-form-item label="国家级奖励数量：">
                    <span class="mesgbox_mesg">{{ nationalAwardsCount }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="是否自有品牌：">
                    <span class="mesgbox_mesg">{{ isSelfBrand }}</span>
                  </el-form-item>
                  <el-form-item label="省级奖励数量：">
                    <span class="mesgbox_mesg">{{ nationalAwardsCount }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="海外注册商标的国家及地区数量：">
                    <span class="mesgbox_mesg">{{ registeredTrademarkCount }}</span>
                  </el-form-item>
                  <el-form-item label="发明专利数：">
                    <span class="mesgbox_mesg">{{ inventionPatentsCount }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="国际/行业通行的管理体系认证的数量：">
                    <span class="mesgbox_mesg">{{ internationallytCertificationCount }}</span>
                  </el-form-item>
                  <el-form-item label="实用新型专利数：">
                    <span class="mesgbox_mesg">{{ utilityPatentsCount }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="面向企业的行业认证数量：">
                    <span class="mesgbox_mesg">{{ industryCertificationCount }}</span>
                  </el-form-item>
                  <el-form-item label="外观设计专利数：">
                    <span class="mesgbox_mesg">{{ patentsDesignCount }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="面向产品或生产线的行业认证数量：">
                    <span class="mesgbox_mesg">{{ productCertificationQuantity }}</span>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="参展及贸易需求" name="third">
              <el-form label-width="280px">
                <div class="mesgbox">
                  <el-form-item label="参展目的（多选）：">
                    <span class="mesgbox_mesg">{{ participationGoal }}</span>
                  </el-form-item>
                  <el-form-item label="主要目标客户类型（多选）：">
                    <span class="mesgbox_mesg">{{ mainCustomersType }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="是否有内贸业务：">
                    <span class="mesgbox_mesg">{{ nternalTradeStatus }}</span>
                  </el-form-item>
                  <el-form-item label="参展产品：">
                    <span class="mesgbox_mesg">登记萨拉</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="上年度出口额前三位客户的国别或地区：">
                    <span class="mesgbox_mesg">{{ firstThreeCustomersCountry }}</span>
                  </el-form-item>
                  <el-form-item label="申请展位：">
                    <span class="mesgbox_mesg">登记萨拉</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="主要目标市场（多选）：">
                    <span class="mesgbox_mesg">{{ mainTargetMarket }}</span>
                  </el-form-item>
                  <el-form-item label="是否禁止参展产品：">
                    <span class="mesgbox_mesg">登记萨拉</span>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="企业联系方式" name="fourth">
              <el-form label-width="280px">
                <div class="mesgbox">
                  <el-form-item label="省份/城市：">
                    <span class="mesgbox_mesg">{{ province ? province : city }}</span>
                  </el-form-item>
                  <el-form-item label="广交会参展业务专用联系电子邮件：">
                    <span class="mesgbox_mesg">{{ dedicatedEmail }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="业务联系人姓名（中文）：">
                    <span class="mesgbox_mesg">{{ businessContactsCh }}</span>
                  </el-form-item>
                  <el-form-item label="网址：">
                    <span class="mesgbox_mesg">{{ website }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="业务联系人姓名（英文）：">
                    <span class="mesgbox_mesg">{{ businessContactsEn }}</span>
                  </el-form-item>
                  <el-form-item label="是否在“展商展品查询”中隐藏联系方式：">
                    <span class="mesgbox_mesg">{{ hiddenContact }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="职位：">
                    <span class="mesgbox_mesg">{{ businessContactsPosition }}</span>
                  </el-form-item>
                  <el-form-item label="所属交易团：">
                    <span class="mesgbox_mesg">{{ businessDelegationId }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="电话：">
                    <span class="mesgbox_mesg">{{ telephone }}</span>
                  </el-form-item>
                  <el-form-item label="交易团联系方式：">
                    <span class="mesgbox_mesg">登记萨拉</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="手机：">
                    <span class="mesgbox_mesg">{{ phone }}</span>
                  </el-form-item>
                  <el-form-item label="企业地址（中文）：">
                    <span class="mesgbox_mesg">{{ adressCh }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="传真：">
                    <span class="mesgbox_mesg">{{ fax }}</span>
                  </el-form-item>
                  <el-form-item label="企业地址（英文）：">
                    <span class="mesgbox_mesg">{{ adressEn }}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="业务联系电子邮件：">
                    <span class="mesgbox_mesg">{{ businessContactsEmail }}</span>
                  </el-form-item>
                  <el-form-item label="邮政编码：">
                    <span class="mesgbox_mesg">{{ postalCode }}</span>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="企业展品信息" name="fiveth">
              <el-table border>
                <el-table-column label="产品名称" align="center"></el-table-column>
                <el-table-column label="图片" align="center"></el-table-column>
                <el-table-column label="型号" align="center"></el-table-column>
                <el-table-column label="类别" align="center"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="审核企业资质" name="aptitude">
          <el-collapse id="collapsebox" v-model="activeNameCol">
            <el-collapse-item title="境外注册商标：" name="1">
              <el-table border>
                <el-table-column label="商标名称" align="center" prop="brandName"></el-table-column>
                <el-table-column label="持有人" align="center" prop="possessor"></el-table-column>
                <el-table-column label="证书编号" align="center" prop="certificateCode"></el-table-column>
                <el-table-column label="注册地（国别）" align="center" prop="registerPlace"></el-table-column>
                <el-table-column label="商标有效期" align="center" prop="indate"></el-table-column>
                <el-table-column label="企业名称" align="center" prop="correlationCompanyName"></el-table-column>
                <el-table-column label="资质来源" align="center" prop="aptitudeSource"></el-table-column>
                <el-table-column label="商标图案" align="center" prop="brandPattern"></el-table-column>
                <el-table-column label="商标注册证书" align="center" prop="brandRegisteredCertificate"></el-table-column>
                <el-table-column label="审核状态" align="center" prop="checkStatus"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text">通过</el-button>
                    <el-button type="text">不通过</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="境内注册商标：" name="2">
              <el-table border>
                <el-table-column label="商标名称" align="center" prop="brandName"></el-table-column>
                <el-table-column label="持有人" align="center" prop="registrant"></el-table-column>
                <el-table-column label="证书编号" align="center" prop="certificateCode"></el-table-column>
                <el-table-column label="商标有效期" align="center" prop="indate"></el-table-column>
                <el-table-column label="企业名称" align="center" prop="correlationCompanyName"></el-table-column>
                <el-table-column label="资质来源" align="center" prop="aptitudeSource"></el-table-column>
                <el-table-column label="商标注册证书" align="center" prop="brandRegisteredCertificate"></el-table-column>
                <el-table-column label="审核状态" align="center" prop="checkStatus"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text">通过</el-button>
                    <el-button type="text">不通过</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="专利／版权／高新技术登记：" name="3">
              <el-table border>
                <el-table-column label="资质来源" align="center" prop="aptitudeSource"></el-table-column>
                <el-table-column label="企业名称" align="center" prop="correlationCompanyName"></el-table-column>
                <el-table-column label="类别" align="center" prop="category"></el-table-column>
                <el-table-column label="类型" align="center" prop="propertyType"></el-table-column>
                <el-table-column label="专利名称" align="center" prop="patentName"></el-table-column>
                <el-table-column label="专利号" align="center" prop="patentCode"></el-table-column>
                <el-table-column label="对应证件号" align="center"></el-table-column>
                <el-table-column label="颁发机构" align="center" prop="issuingAuthority"></el-table-column>
                <el-table-column label="专利持有人" align="center" prop="possessor"></el-table-column>
                <el-table-column label="有效期" align="center" prop="indate"></el-table-column>
                <el-table-column label="注册证书" align="center" prop="certificate"></el-table-column>
                <el-table-column label="审核状态" align="center" prop="checkStatus"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text">通过</el-button>
                    <el-button type="text">不通过</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="国家或行业标准：" name="4">
              <el-table border>
                <el-table-column label="资质来源" align="center" prop="aptitudeSource"></el-table-column>
                <el-table-column label="企业名称" align="center" prop="correlationCompanyName"></el-table-column>
                <el-table-column label="标准名称" align="center" prop="brandName"></el-table-column>
                <el-table-column label="标准编码" align="center" ></el-table-column>
                <el-table-column label="发布单位" align="center" ></el-table-column>
                <el-table-column label="上传证书" align="center" prop="brandRegisteredCertificate"></el-table-column>
                <el-table-column label="审核状态" align="center" prop="checkStatus"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text">通过</el-button>
                    <el-button type="text">不通过</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="国际通行认证：" name="5">
              <el-table border>
                <el-table-column label="认证类别" align="center" prop="authenticationCategory"></el-table-column>
                <el-table-column label="认证项目" align="center" prop="authenticationProject"></el-table-column>
                <el-table-column label="证书编号" align="center" prop="certificateCode"></el-table-column>
                <el-table-column label="认证单位" align="center" prop="authenticationUnit"></el-table-column>
                <el-table-column label="有效期" align="center" prop="indate"></el-table-column>
                <el-table-column label="企业名称" align="center" prop="correlationCompanyName"></el-table-column>
                <el-table-column label="资质来源" align="center" prop="aptitudeSource"></el-table-column>
                <el-table-column label="商标注册证书" align="center" prop="brandRegisteredCertificate"></el-table-column>
                <el-table-column label="审核状态" align="center" prop="checkStatus"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text">通过</el-button>
                    <el-button type="text">不通过</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      companyActive: 'info',
      activeNameTwo: 'first',
      activeNameCol: ['1'],
      brandApplyId: '', // 查询id
      activeType: '', // tab类型
      // 公司信息
      companyInfo: {}
    };
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['companyAptitudeData'])
  },
  created() {
    // let fullScreenloading = this.$loading({ fullscreen: true });
    // let paramsData = this.$route.query.id.split('&');
    // this.brandApplyId = paramsData[0];
    // this.activeType = paramsData[1];
    // this.companyActive = this.activeType;
    // this.postConCompanyAptitudeQuery({ brandApplyId: this.brandApplyId }).then(res => {
    //   this.$nextTick(() => {
    //     fullScreenloading.close();
    //   });
    // }).catch(e => {
    //   this.$nextTick(() => {
    //     fullScreenloading.close();
    //   });
    // });
  },
  methods: {
    ...mapActions('checkRecommendCompany', ['postConCompanyAptitudeQuery'])
  }
};
</script>
<style scoped>
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
#collapsebox >>> .el-collapse-item__header{
  background-color: #f5f7fa !important;
  padding: 0 10px !important;
}
</style>
