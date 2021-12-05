<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业资质" name="first">
      <el-tabs v-model="companyActive" type="border-card">
        <el-tab-pane label="查看企业资料" name='info'>
          <el-tabs id="special_tabs" v-model="activeNameTwo" type="card">
            <el-tab-pane label="公司基本信息" name="first">
              <el-form label-width="280px">
                <div class="mesgbox">
                  <el-form-item label="企业中文名称：">
                    <span class="mesgbox_mesg">{{data.companyName}}</span>
                  </el-form-item>
                  <el-form-item label="企业英文名称：">
                    <span class="mesgbox_mesg">{{data.companyNameEn}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="企业公司简介：">
                    <span class="mesgbox_mesg">{{data.companyProfileCh || companyInfoForm.companyProfileEn}}</span>
                  </el-form-item>
                  <el-form-item label="是否上市公司：">
                    <span class="mesgbox_mesg">{{data.listedStatus | checkStatus}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="上市地点：">
                    <span class="mesgbox_mesg">{{data.listedPlace}}</span>
                  </el-form-item>
                  <el-form-item label="厂房面积：">
                    <span class="mesgbox_mesg">{{data.plantArea}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="股票代码：">
                    <span class="mesgbox_mesg">{{data.stockCode}}</span>
                  </el-form-item>
                  <el-form-item label="主营产品关键字（中文）：">
                    <span class="mesgbox_mesg">{{data.mainProductKeywordCh}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="商（协）会会员号：">
                    <span class="mesgbox_mesg">{{data.businessAssociationCode}}</span>
                  </el-form-item>
                  <el-form-item label="主营产品关键字（英文）：">
                    <span class="mesgbox_mesg">{{data.mainProductKeywordEn}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="公司成立年份：">
                    <span class="mesgbox_mesg">{{data.incorporationYear}}</span>
                  </el-form-item>
                  <el-form-item label="公司名称分词：">
                    <span class="mesgbox_mesg">{{data.companyPpl}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="注册资本：">
                    <span class="mesgbox_mesg">{{data.registeredCapital}}</span>
                  </el-form-item>
                  <el-form-item label="纳税人识别号/统一社会信用代码：">
                    <span class="mesgbox_mesg">{{data.taxpayerIdentificationNo}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="员工数量：">
                    <span class="mesgbox_mesg">{{data.employeesCount}}</span>
                  </el-form-item>
                  <el-form-item label="贸易形式：">
                    <span class="mesgbox_mesg">{{data.tradeForm}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="生产部门人数：">
                    <span class="mesgbox_mesg">{{data.productionEmployeesCount}}</span>
                  </el-form-item>
                  <el-form-item label="公司Logo：">
                    <span class="mesgbox_mesg">{{data.companyLogoId}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="研发部门人数：">
                    <span class="mesgbox_mesg">{{data.developEmployeesCount}}</span>
                  </el-form-item>
                  <el-form-item label="公司形象图：">
                    <span class="mesgbox_mesg">{{data.companyImageId}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="质检部门人数 ：">
                    <span class="mesgbox_mesg">{{data.qualityEmployeesCount}}</span>
                  </el-form-item>
                  <el-form-item label="公司简介：">
                    <span class="mesgbox_mesg">{{data.companyProfileCh}}</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="企业首次参展时间 ：">
                    <span class="mesgbox_mesg">{{data.firstExhibitionDate}}</span>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="企业品牌认证奖励专利" name="second">
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
            </el-tab-pane>
            <el-tab-pane label="参展及贸易需求" name="third">
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
            </el-tab-pane>
            <el-tab-pane label="企业联系方式" name="fourth">
              <el-form label-width="280px">
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
                    <span class="mesgbox_mesg">登记萨拉</span>
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
                    <span class="mesgbox_mesg">登记萨拉</span>
                  </el-form-item>
                </div>
                <div class="mesgbox">
                  <el-form-item label="传真：">
                    <span class="mesgbox_mesg">{{data.fax}}</span>
                  </el-form-item>
                  <el-form-item label="企业地址（英文）：">
                    <span class="mesgbox_mesg">登记萨拉</span>
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
                <el-table-column prop="brandName" label="商标名称" align="center"></el-table-column>
                <el-table-column prop="possessor" label="持有人" align="center"></el-table-column>
                <el-table-column prop="certificateCode" label="证书编号" align="center"></el-table-column>
                <el-table-column prop="registerPlace" label="注册地（国别）" align="center"></el-table-column>
                <el-table-column prop="indate" label="商标有效期" align="center"></el-table-column>
                <el-table-column prop="correlationCompanyName" label="企业名称" align="center"></el-table-column>
                <el-table-column prop="aptitudeSource" label="资质来源" align="center">
                  <template slot-scope="scope">
                    {{scope.row.aptitudeSource | sourceStatus}}
                  </template>
                </el-table-column>
                <el-table-column prop="brandPattern" label="商标图案" align="center"></el-table-column>
                <el-table-column prop="brandRegisteredCertificate" label="商标注册证书" align="center"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" align="center"></el-table-column>
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
                <el-table-column prop="brandName" label="商标名称" align="center"></el-table-column>
                <el-table-column prop="possessor" label="持有人" align="center"></el-table-column>
                <el-table-column prop="certificateCode" label="证书编号" align="center"></el-table-column>
                <el-table-column prop="indate" label="商标有效期" align="center"></el-table-column>
                <el-table-column prop="correlationCompanyName" label="企业名称" align="center"></el-table-column>
                <el-table-column prop="aptitudeSource" label="资质来源" align="center">
                  <template slot-scope="scope">
                    {{scope.row.aptitudeSource | sourceStatus}}
                  </template>
                </el-table-column>
                <el-table-column prop="brandRegisteredCertificate" label="商标注册证书" align="center"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" align="center"></el-table-column>
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
                <el-table-column prop="aptitudeSource" label="资质来源" align="center">
                  <template slot-scope="scope">
                    {{scope.row.aptitudeSource | sourceStatus}}
                  </template>
                </el-table-column>
                <el-table-column prop="correlationCompanyName" label="企业名称" align="center"></el-table-column>
                <el-table-column prop="category" label="类别" align="center"></el-table-column>
                <el-table-column prop="propertyType" label="类型" align="center"></el-table-column>
                <el-table-column prop="patentName" label="专利名称" align="center"></el-table-column>
                <el-table-column prop="patentCode" label="专利号" align="center"></el-table-column>
                <el-table-column prop="" label="对应证件号" align="center"></el-table-column>
                <el-table-column prop="issuingAuthority" label="颁发机构" align="center"></el-table-column>
                <el-table-column prop="possessor" label="专利持有人" align="center"></el-table-column>
                <el-table-column prop="indate" label="有效期" align="center"></el-table-column>
                <el-table-column prop="certificate" label="注册证书" align="center"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" align="center"></el-table-column>
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
                <el-table-column prop="aptitudeSource" label="资质来源" align="center">
                  <template slot-scope="scope">
                    {{scope.row.aptitudeSource | sourceStatus}}
                  </template>
                </el-table-column>
                <el-table-column prop="correlationCompanyName" label="企业名称" align="center"></el-table-column>
                <el-table-column prop="brandName" label="标准名称" align="center"></el-table-column>
                <el-table-column prop="certificateCode" label="标准编码" align="center"></el-table-column>
                <el-table-column prop="" label="发布单位" align="center"></el-table-column>
                <el-table-column prop="brandRegisteredCertificate" label="上传证书" align="center"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" align="center"></el-table-column>
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
                <el-table-column prop="authenticationCategory" label="认证类别" align="center"></el-table-column>
                <el-table-column prop="authenticationProject" label="认证项目" align="center"></el-table-column>
                <el-table-column prop="certificateCode" label="证书编号" align="center"></el-table-column>
                <el-table-column prop="authenticationUnit" label="认证单位" align="center"></el-table-column>
                <el-table-column prop="indate" label="有效期" align="center"></el-table-column>
                <el-table-column prop="correlationCompanyName" label="企业名称" align="center"></el-table-column>
                <el-table-column prop="aptitudeSource" label="资质来源" align="center">
                  <template slot-scope="scope">
                    {{scope.row.aptitudeSource | sourceStatus}}
                  </template>
                </el-table-column>
                <el-table-column prop="brandRegisteredCertificate" label="商标注册证书" align="center"></el-table-column>
                <el-table-column prop="checkStatus" label="审核状态" align="center"></el-table-column>
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
      data: {},
      activeName: 'first',
      companyActive: 'info',
      activeNameTwo: 'first',
      activeNameCol: ['1'],
      brandApplyId: '', // 查询id
      companyId: '', // 查询id
      activeType: '' // tab类型
    };
  },
  filters: {
    checkStatus(val) {
      if (val === "0") {
        return "否";
      } else if (val === "1") {
        return "是";
      }
    },
    sourceStatus(val) {
      switch (val) {
        case "1":
          "本企业所有";
          break;
        case "2":
          "绝对控股子公司所有";
          break;
        case "3":
          "相对控股子公司所有";
          break;
        case "4":
          "绝对控股母公司所有";
          break;
        case "5":
          "绝对控股母公司的其他绝对控股子公司所有";
          break;
        default:
          break;
      }
    }
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['companyAptitudeData'])
  },
  created() {
    // console.log(this.$router.history.current.query, "9277");
    let dataInfo = {
      companyId: this.$router.history.current.query.data.companyId,
      exhibitionArea: this.$router.history.current.query.data.exhibitionArea
    };
    this.companyId = this.$router.history.current.query.data.companyId;
    this.activeType = this.$router.history.current.query.type;
    this.getcompanyInfoById({ companyId: this.companyId }).then(res => {
      // console.log(res, "res");
      this.data = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getcompanyProductList(dataInfo).then(res => {
      // console.log(res, "zhanquzhanpin");
    }).catch(e => {});
    this.postConCompanyAptitudeQuery({ companyId: this.companyId }).then(res => {
      // console.log(JSON.parse(res), "审核");
    }).catch(e => {});
    // let fullScreenloading = this.$loading({ fullscreen: true });
    // let paramsData = this.$route.params.id.split('&');
    // this.brandApplyId = this.$route.query.data;
    // this.activeType = this.$route.query.type;
    this.companyActive = this.activeType;
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
    ...mapActions('checkRecommendCompany', ['postConCompanyAptitudeQuery', 'getCompanyInfo']),
    ...mapActions('nainformation', [
      'getcompanyInfoById', // 根据企业ID查询企业信息
      'getcompanyProductList' // 根据展区查询企业的展品
    ])
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
