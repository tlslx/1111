/**
* @file  打印申请书（退回展位）
* @author:zhangwenjian   修改人(张文建 2019-4-20  去除了第52行代码)
* @date:2019/4/14
*/
 <style scoped>
.date {
  margin-left: 5px;
  margin-right: 5px;
}
.table_div {
  width: 93%;
  margin: 30px auto;
}
td {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  font-family: 宋体;
}
.thead {
  height: 35px;
  text-align: center;
  line-height: 35px;
}
</style>
<template>
  <div class="content" ref="printarea">
    <!-- 附件 -->
    <div v-if="isShowConfirm" class="application">
      <div class="table_div">
        <table border="1" cellpadding="0" cellspacing="0" width='100%' style="table-layout:fixed">
          <thead>
          <tr>
            <td colspan='15' border='0' class="thead" style="text-align: left">
              <h1><img src="../../../../static/img/print/printHead.jpg" style="width: 22%; height:30px;margin-left: 5px;margin-top: 5px"></h1>
              <h2 style="margin: 0px auto;margin-top:-10px;text-align: center">第{{session}}届广交会<span v-if="isShow === true">品牌展位确认</span>参展申请表<span v-if="printList.exhibitionArea === 'CG06' || printList.exhibitionArea === 'NE01'">（新能源、宠物用品展区适用）</span></h2>
            </td>
          </tr>
          </thead>
          <tr>
            <td colspan='2'>申报展区代码</td>
            <td colspan='3'>{{printList.exhibitionArea}}</td>
            <td colspan='2'>申报展区</td>
            <td colspan='3'>{{printList.exhibitionAreaName}}</td>
            <td colspan='2'>展位类型</td>
            <td colspan='3'>
              <span v-if="boothType">{{boothType}}</span>
              <span v-else>品牌</span>
            </td>
          </tr>
          <tr>
            <td colspan='2'>申请展位数</td>
            <td colspan='3'>{{printList.boothNumber}}</td>
            <td colspan='2'>布展类型</td>
            <td colspan='3'>
              <span v-if="printList.exhibitionArea === 'MA02'">统一布展</span>
              <span v-else>绿色特装</span>
            </td>
            <td colspan='2'>上届展位数</td>
            <td colspan='3'>{{printList.boothNumberLast}}</td>
          </tr>
          <tr>
            <td colspan='2'>企业永久代码</td>
            <td colspan='3'>{{companyInfo.companyId}}</td>
            <td colspan='2'>交易团</td>
            <td colspan='3'>{{printList.delegationName}}</td>
            <td colspan='2'>广交会编码</td>
            <td colspan='3'>{{companyInfo.cantonCode}}</td>
          </tr>
          <tr>
            <td rowspan="2" colspan='2'>申请企业名称</td>
            <td colspan='3'>中文</td>
            <td colspan='10'>{{companyInfo.companyName}}</td>
          </tr>
          <tr>
            <td colspan='3'>英文</td>
            <td colspan="10">{{companyInfo.companyNameEn}}</td>
          </tr>
          <tr>
            <td rowspan="2" colspan='2'>申请企业地址</td>
            <td colspan='3'>中文</td>
            <td colspan="10">{{companyInfo.adressCh}}</td>
          </tr>
          <tr>
            <td colspan='3'>英文</td>
            <td colspan="10">{{companyInfo.adressEn}}</td>
          </tr>
          <tr>
            <td colspan='2'>法定代表人</td>
            <td colspan="5">{{companyInfo.legalPerson}}</td>
            <td colspan='3'>统一社会信用代码/营业执照号</td>
            <td colspan="5">{{companyInfo.businessLicenceNo}}</td>
          </tr>
          <tr>
            <td colspan='2'>企业类型</td>
            <td colspan="5">{{comType}}</td>
            <td colspan='3'>企业属性</td>
            <td colspan="5">{{comAttribute}}</td>
          </tr>
          <tr>
            <td colspan='3'>进出口企业代码</td>
            <td colspan="4">{{companyInfo.importExportCode}}</td>
            <td colspan='3'>上年度出口额</td>
            <td colspan="5">{{companyInfo.exportVolumeLast}} 万美元</td>
          </tr>
          <tr>
            <td colspan='3'>主要展示产品</td>
            <td colspan="12">
              <span v-for="(companyProduct,index) in companyProductList" :key="index">
                <!-- <span>{{companyProduct.productName}}、</span> -->
                <template v-if="index !== (companyProductList.length - 1)"><span>{{companyProduct.productName}}、</span></template>
                <template v-if="index === (companyProductList.length - 1)"><span>{{companyProduct.productName}}</span></template>
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="3">产品海关编码(HS编码)</td>
            <td colspan="12">{{printList.hscode}}</td>
          </tr>
          <tr v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08'">
            <td colspan="2">本届申请摊位面积(m²)</td>
            <td colspan="1">{{printList.boothAcreage}}</td>
            <td>上届摊位面积(m²)</td>
            <td colspan="2">{{printList.boothAcreageLast}}</td>
          </tr>
          <tr v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08'">
            <td colspan="2">产品最大外形尺寸(m)</td>
            <td colspan="4">{{printList.productWidth*printList.productLong*printList.productHeight}}</td>
          </tr>
          <tr v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08'">
            <td>重量(kg)</td>
            <td colspan="2">{{printList.productWeight}}</td>
            <td colspan="2">运输时底座面积(m²)</td>
            <td colspan="1">{{printList.bottomLong*printList.bottomLong}}</td>
          </tr>
          <tr>
            <td colspan='3'>是否愿意在广交会上接洽国内采购商</td>
            <td colspan="4" v-if="printList.isContacted === 0 || printList.isContacted === '0'">否</td>
            <td colspan="4" v-else>是</td>
            <td colspan='2'>是否有联营参展单位</td>
            <td colspan="6" v-if="companyInfo.unionIds">{{companyInfo.unionNames}}</td>
            <td colspan="6" v-else>无联营参展单位</td>
          </tr>
          <tr>
            <td colspan='2'>参展联系人</td>
            <td colspan="5">{{companyInfo.exhibitorContact}}</td>
            <td colspan='2'>手机</td>
            <td colspan="6">{{companyInfo.exhibitorContactPhone}}</td>
          </tr>
          <tr>
            <td colspan='2'>联系电话</td>
            <td colspan="5">{{companyInfo.telephoneCodeLast}}</td>
            <td colspan='2'>传真</td>
            <td colspan="6">{{companyInfo.faxCodeLast}}</td>
          </tr>
          <tr>
            <td colspan='2'>邮政编码</td>
            <td colspan="5">{{companyInfo.postalCode}}</td>
            <td colspan='2'>E-mail</td>
            <td colspan="6">{{companyInfo.businessContactsEmail}}</td>
          </tr>
          <tr>
            <td style="text-align: left" colspan="7">注：1、本企业一经申请盖章，保证填报内容的真实性并确认已经阅读并接受《广交会出口展展位使用责任书》、《中国进出口商品交易会出口展参展须知》、《中国进出口商品交易会出口展参展商服务指南》及有关增订条款。<span v-if="isShow === true">承诺遵守广交会各项规章制度。</span>
              <br />
              2、通过参展易捷通填报展品信息时提交了同意授权声明的企业，须对其所声明的内容负责。
              <br />
              <span v-if="printList.exhibitionArea === 'CG06' || printList.exhibitionArea === 'NE01'">3.企业承诺如未能在指定时间前交齐展位费，将视同放弃参展，大会有权收回展位。</span>
              <br />
              <div style="float: right">
                <span> （申请企业盖章）</span> <br />
                <span><i class="date">年</i><i class="date">月</i><i class="date">日</i></span>
              </div>
            </td>
            <td colspan="8">
              <div style="float: right;margin-top: 120px">
                <span> （交易团盖章）</span> <br />
                <span><i class="date">年</i><i class="date">月</i><i class="date">日</i></span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="15" style="text-align: left">
              说明：<br/>
              1.本表根据申请企业录入参展易捷通的资料自动生成（一个展区对应一份申请表）。<br/>
              2.本表须加盖申请企业公章<span v-if="isShow === false">，并连同相关证明材料（如上年度出口额、国家级奖励、国际通行的管理体系认证、专利、列入国家高新技术产品目录或国家科技部颁发的高新技术产品证书、海外注册商标等）</span>一并提交给所在行政区域或系统交易团/中央企业交易团分团，参展申请方正式生效。({{sysDepartmentDTO ? sysDepartmentDTO.fullName : ''}}地址：{{sysDepartmentDTO ? sysDepartmentDTO.deptAddr : ''}}  邮政编码：{{sysDepartmentDTO ? sysDepartmentDTO.postcode : ''}} 联系电话:{{sysDepartmentDTO ? sysDepartmentDTO.contactsInfo : ''}} 传真:{{sysDepartmentDTO ? sysDepartmentDTO.fax : ''}} )<br/>
              <span v-if="isShow === false">3.如有联营（供货）单位共同参展，请在参展申请时同时提交联营单位申请资料。</span><br/>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="isReturn" :class="{back:isShowConfirm }">
      <div style="margin: 0 30px">
        <h1 style="text-align: center;margin: 15px 30px">关于退回第<span class="downline">{{printForm.exhibitionSession}}</span>届广交会品牌展位申请</h1>
        <div style="font-size: 20px;font-family: '宋体'">
          <div class="content_title">
            <span class="downline" v-if="printList.delegationName">{{printList.delegationName}}</span>
            <span class="downline" v-else>{{printForm.dealClusterName}}</span>
            交易团:</div>
          <div class="item">经研究，本司决定退回第<span> {{printForm.exhibitionSession}} </span>届广交会品牌展位，具体为:</div>
          <div class="item">
            <span>展区:</span>
            <span class="downline">{{printForm.exhibitionAreaName}}</span>
          </div>
          <div class="item">
            <span>本届可确认品牌展位数:</span>
            <span class="downline">{{printForm.initialBoothNum}}</span>
          </div>
          <div class="item">
            <span>本届已确认品牌展位数:</span>
            <span class="downline" v-if="printForm.affirmBoothNumber">{{printForm.affirmBoothNumber}}</span>
            <span class="downline" v-else>0</span>
          </div>
          <div class="item">
            <span>申请退回品牌展位数:</span>
            <span class="downline" v-if="printForm.selfBackNumber">{{printForm.selfBackNumber}}</span>
            <span class="downline" v-else>{{printForm.initialBoothNum}}</span>
          </div>
          <div class="item">
            <span>退回原因:</span>
            <span class="downline">{{printForm.backReason}}</span>
          </div>
          <div class="item">
            特此申请。
          </div>
          <div class="bottom_content">
            <div>
              <span class="downline">{{printForm.companyName}}</span>
              <span>(盖章)</span>
            </div>
            <div>
              <span>{{printForm.currentTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align: center"  class="mimeograph">
      <el-button type="primary" @click="handlePrintApplication()">打印申请书</el-button>
      <el-button type="primary" @click="handleGoBackList()">返回</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "printApplicationForm",
  data() {
    return {
      demandRecordId: '',
      activeName: 'first',
      loading: false,
      isList: false,
      isShowConfirm: true,
      isReturn: true,
      isCancel: false,
      isFirm: false,
      companyProductList: [],
      printForm: {
        dealClusterName: '',
        exhibitionSession: "",
        exhibitionArea: "",
        exhibitionAreaName: '',
        brandBoothNumber: "",
        violationBoothNum: "",
        initialBoothNum: '',
        selfBackNumber: '',
        backReason: '',
        affirmBoothNumber: '',
        boothNumber: "", // 申请数量
        boothNumberLast: '', // 上届申请数量
        lastBoothNum: '',
        cantonFairCode: '',
        companyProductList: [],
        productType: "", // 展品分类
        domains: [
          // 主要展示产品
          {
            products: ""
          }
        ],
        hscode: '',
        currentTime: '',
        postalCode: '',
        boothType: '02',
        canEdit: false,
        boothAffirmId: '',
        exhibitionPeriod: '',
        backBoothNumber: '',
        currentChangeNumber: '',
        currentReserveNumber: '',
        companyId: '',
        companyName: '',
        companyCode: '',
        backType: '',
        isContacted: "0", // 是否愿意接洽国内采购商
        isCarryOut: '',  // 展位期间开展的内贸业务
        joinProductType: '' // 我司参展展品为
      },
      writeForm: {},
      baseApi: process.env.API_OS_URL,
      //附件数据
      printList: {},
      companyInfo: {},
      sysDepartmentDTO: {},
      sysDepartment: '',
      session: "",
      isShow: true,
      boothType: "",
      exhibitionType: "",
      finalExhibitionTypeOpts: [], // 展位类型字典
      companyType: [], // 企业类型字典
      companyAttribute: [], // 企业属性字典
      comType: "", // 企业类型
      comAttribute: "" //企业属性
    };
  },
  async created() {
    this.finalExhibitionTypeOpts = await kindo.dictionary.get('exhibitionType');
    this.companyType = await kindo.dictionary.get('companyType');
    this.companyAttribute = await kindo.dictionary.get('companyAttribute');

    // this.typeOfExhibitsArrangement = await kindo.dictionary.get('typeOfExhibitsArrangement'); // 布展类型
  },
  mounted() {
    this.beforeSubmit();
  },
  methods: {
    ...mapActions('companyInfomation', [
      'getConfirmNote',
      'getSchemePublishConfirm',
      'addSubmitConfirmBookData',
      'addSchemePublishConfirmData',
      "postSchemePublishSubmit"  //全部退回不需要
    ]),
    ...mapActions("companyInfomation", ["getHandRemove", 'getAreaCodeInfo']),
    ...mapActions('common', ['getSessionInfo']),
    // 打印申请书
    handlePrintApplication() {
      window.print();
      // this.$print(this.$refs.printarea);
    },
    // 页面赋值
    beforeSubmit() {
      let _this = this;
      let writeForm = JSON.parse(this.$route.query.writeForm);
      // isCancel  打印退回申请的标识
      this.isCancel = this.$route.query.isCancel;
      this.demandRecordId = this.$route.query.demandRecordId;
      // isFirm  打印确认表单标识符
      this.isFirm = this.$route.query.isFirm;
      this.isList = this.$route.query.isList;
      if (this.isCancel && this.isList) {
        this.isShowConfirm = false;
        this.isReturn = true;
      }
      if (this.isFirm) {
        this.isReturn = false;
        this.isShowConfirm = true;
      }
      this.writeForm = writeForm;
      let isAll = this.$route.query.isAll;
      if (this.writeForm.demandRecordId || this.writeForm.companyDemandRecord) {
        let para = encodeURI(JSON.stringify({ demandRecordId: this.writeForm.demandRecordId }));
        if (this.writeForm.companyDemandRecord) {
          para = encodeURI(JSON.stringify({ demandRecordId: this.writeForm.companyDemandRecord.demandRecordId }));
        }
        if (!isAll) {
          this.getHandRemove(para).then(res => {
            this.companyInfo = res.companyAllInfo;
            this.sysDepartmentDTO = res.sysDepartmentDTO;
            this.companyProductList = res.companyProductList;
            this.printList = res;

            for (let i = 0; i < _this.finalExhibitionTypeOpts.length; i++) {
              if (_this.finalExhibitionTypeOpts[i].value === res.exhibitionType) {
                _this.exhibitionType = _this.finalExhibitionTypeOpts[i].label;
              }
            }
            for (let i = 0; i < _this.companyType.length; i++) {
              if (_this.companyType[i].value === res.companyAllInfo.enterprisesType) {
                _this.comType = _this.companyType[i].label;
              }
            }
            for (let i = 0; i < this.companyAttribute.length; i++) {
              if (_this.companyAttribute[i].value === res.companyAllInfo.enterpriseAttribute) {
                _this.comAttribute = _this.companyAttribute[i].label;
              }
            }
            _this.getAreaCodeInfo({
              "areaCode": para,
              "session": _this.session
            }).then((response) => {
              if (response.specialAreas) {
                for (let i = 0; i < response.specialAreas.length; i++) {
                  for (let j = 0; j < response.specialAreas.length; j++) {
                    if (response.specialAreas[i].specialAreaCode === res.boothType) {
                      _this.boothType = response.specialAreas[i].languages[j].language.name;
                    }
                  }
                }
              }
            });
          }).catch((error) => {});
        }
      }
      if (this.demandRecordId) {
        let para = encodeURI(JSON.stringify({ demandRecordId: this.demandRecordId }));
        this.getHandRemove(para).then(res => {
          this.companyInfo = res.companyAllInfo;
          this.companyProductList = res.companyProductList;
          this.printList = res;

          for (let i = 0; i < _this.finalExhibitionTypeOpts.length; i++) {
            if (_this.finalExhibitionTypeOpts[i].value === res.exhibitionType) {
              _this.exhibitionType = _this.finalExhibitionTypeOpts[i].label;
            }
          }
          for (let i = 0; i < _this.companyType.length; i++) {
            if (_this.companyType[i].value === res.companyAllInfo.enterprisesType) {
              _this.comType = _this.companyType[i].label;
            }
          }
          for (let i = 0; i < this.companyAttribute.length; i++) {
            if (_this.companyAttribute[i].value === res.companyAllInfo.enterpriseAttribute) {
              _this.comAttribute = _this.companyAttribute[i].label;
            }
          }
          _this.getAreaCodeInfo({
            "areaCode": para,
            "session": _this.session
          }).then((response) => {
            if (response.specialAreas) {
              for (let i = 0; i < response.specialAreas.length; i++) {
                for (let j = 0; j < response.specialAreas.length; j++) {
                  if (response.specialAreas[i].specialAreaCode === res.boothType) {
                    _this.boothType = response.specialAreas[i].languages[j].language.name;
                  }
                }
              }
            }
          });
        }).catch((error) => {});
      }
      if (this.isList) {
        this.printForm.dealClusterName = this.writeForm.dealClusterName;
        this.printForm.exhibitionSession = this.writeForm.schemePublish.exhibitionSession;
        this.printForm.exhibitionAreaName = this.writeForm.exhibitionAreaName;
        this.printForm.initialBoothNum = this.writeForm.schemePublish.initialBoothNum;
        this.printForm.companyName = this.writeForm.companyName;
        this.printForm.currentTime = this.getNowFormatDate();
        if (this.writeForm.backConfirmation) {
          this.printForm.affirmBoothNumber = this.writeForm.backConfirmation.currentReserveNumber;
          this.printForm.selfBackNumber = this.writeForm.backConfirmation.backBoothNumber;
          this.printForm.backReason = this.writeForm.backConfirmation.backReason;
          this.printForm.dealClusterName = this.writeForm.backConfirmation.dealClusterName;
        } else {
          this.printForm.affirmBoothNumber = this.writeForm.affirm.affirmBoothNumber;
          this.printForm.selfBackNumber = "0";
        }
      } else {
        for (let item in writeForm) {
          this.$set(this.printForm, item, writeForm[item]);
          // this.printForm[item] = writeForm[item];
        }
        this.printForm.selfBackNumber = parseInt(this.printForm.initialBoothNum) - parseInt(this.printForm.affirmBoothNumber);
        if (this.printForm.selfBackNumber === 0) {
          this.isReturn = false;
          this.isShowConfirm = true;
        }
        if (parseInt(this.printForm.affirmBoothNumber) === 0) {
          this.isShowConfirm = false;
          this.isReturn = true;
        }
        if (isAll) {
          this.printForm.affirmBoothNumber = 0;
          this.printForm.selfBackNumber = this.printForm.initialBoothNum;
        } else if (this.$route.query.isback) {
          this.isShowConfirm = false;
          this.printForm.exhibitionSession = this.writeForm.schemePublish.exhibitionSession;
        }
        this.printForm.affirmBoothNumber = this.writeForm.affirmBoothNumber;
        this.printForm.lastBoothNum = this.writeForm.brandBoothNumber;
        this.printForm.cantonFairCode = this.writeForm.companyCode;
        this.printForm.currentTime = this.getNowFormatDate();
        this.printForm.boothNumber = this.writeForm.currentReserveNumber;
        this.printForm.boothNumberLast = this.writeForm.brandBoothNumber;
        this.printForm.dealClusterName = this.writeForm.dealClusterName;
        this.printForm.selfBackNumber = parseInt(this.printForm.initialBoothNum) - parseInt(this.printForm.affirmBoothNumber);
        // 主要展示产品
        this.printForm.companyProductList = [];
        for (let key in writeForm.domains) {
          this.writeForm.companyProductList.push({ productId: this.writeForm.domains[key].products });
          this.printForm.companyProductList.push({ productId: this.writeForm.domains[key].products });
        }
      }

      this.getSessionInfo().then(res => {
        this.session = res.session;
      });

    },
    // 返回
    handleGoBackList() {
      this.$router.push({ path: '/brandConfirmNum' });
    },
    getNowFormatDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + ' 年 ' + month + ' 月 ' + strDate + ' 日 ';
      return currentdate;
    }

  }
};
</script>
<style media="print">
  @page {
    margin-bottom: 0mm;
    margin-top: 0mm
  }
</style>
<style scoped>
  @media print {
    .mimeograph {
      display: none;
    }
  }
.content {
  margin-left: 5px;
}

.item {
  margin-left: 40px;
  padding: 15px 0;
}
.bottom_content {
  margin: 100px 30px 50px 0;
  text-align: right;
}
.content_title {
  padding: 15px 0;
}
.downline {
  /*text-decoration: underline;*/
  display: inline-block;
  margin-right: 5px;
}
.application{
  margin-bottom: 20px;
  /* 控制打印页顶部是否分页，avoid为避免分页，always是必须分页，auto为自动 */
  page-break-before: auto;
  /* 控制打印页底部是否分页，avoid为避免分页，always是必须分页 */
  page-break-after: avoid;
}
.back{
   page-break-before: always;
}
</style>
