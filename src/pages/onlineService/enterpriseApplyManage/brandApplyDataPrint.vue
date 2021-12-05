/**
 * @file 一般性展位申请打印
 */
 <style scoped>
  .date {
    margin-left: 5px;
    margin-right: 5px;
  }
  .table_div {
    width: 93%;
    margin-top: 30px;
    margin-right: auto;
    margin-bottom: 20px;
    margin-left: auto;
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
  .txAline {
    text-align: center;
  }
   .minHead{
     margin: 0 auto;
     padding: 0;
   }
 </style>

<template>
  <div class="table_div">
    <table border="1" cellpadding="0" cellspacing="0" width='100%' :style="isUnionCom ? 'table-layout:fixed;page-break-after:always;':'table-layout:fixed;'">
      <thead>
        <tr>
          <td colspan='15' border='0'>
            <h1 style="text-align: left;margin-bottom: 5px; margin-top: 10px;"><img src="../../../../static/img/print/printHead.jpg" style="width: 20%; height:30px;"></h1>
            <h2 class="minHead">第{{session}}届广交会<span v-if="isShow === true">品牌展位确认</span><span v-else>出口展</span>参展申请表<span v-if="printList.exhibitionArea === 'CG06' || printList.exhibitionArea === 'NE01'">（新能源、宠物用品展区适用）</span></h2>
            <div v-if="printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08' || printList.exhibitionArea === 'VS04' || printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'HD06'" class="thead"><h3 style="margin: 0 auto">(大型机械及设备展区、工程农机展区、车辆展区及铁石装饰品及户外水疗设施展区)</h3></div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">申报展区代码</td>
          <td colspan="3">{{printList.exhibitionArea}}</td>
          <td colspan="2">申报展区</td>
          <td colspan="3">{{printList.exhibitionAreaName}}</td>
          <td colspan="2">展位性质</td>
          <td colspan="3">一般性展位</td>
        </tr>
        <tr>
          <td colspan="2">申请展位数</td>
          <td colspan="3">{{printList.boothNumber}}</td>
          <td colspan="2">布展类型</td>
          <td colspan="3">{{exhibitionType}}</td>
          <td colspan="2">上届展位数</td>
          <td colspan="3">{{printList.boothNumberLast}}</td>
        </tr>
        <tr>
          <td colspan="2">企业永久代码</td>
          <td colspan="3">{{companyInfo.companyId}}</td>
          <td colspan="2">交易团</td>
          <td colspan="3">{{printList.delegationName}}</td>
          <td colspan="2">广交会编码</td>
          <td colspan="3">{{companyInfo.cantonCode}}</td>
        </tr>
        <tr>
          <td colspan="2" rowspan="2">申请企业名称</td>
          <td colspan="3">中文</td>
          <td colspan="10">{{companyInfo.companyName}}</td>
        </tr>
        <tr>
          <td colspan="3">英文</td>
          <td colspan="10">{{companyInfo.companyNameEn}}</td>
        </tr>
        <tr>
          <td colspan="2" rowspan="2">申请企业地址</td>
          <td colspan="3">中文</td>
          <td colspan="10">{{companyInfo.adressCh}}</td>
        </tr>
        <tr>
          <td colspan="3">英文</td>
          <td colspan="10">{{companyInfo.adressEn}}</td>
        </tr>
        <tr>
          <td colspan="5">海关编码</td>
          <td colspan="10">{{customsCode}}</td>
        </tr>
        <tr>
          <td colspan="5">主要展示产品</td>
          <td colspan="10">{{productName}}</td>
        </tr>
        <tr>
          <td colspan="5">产品海关编码(HS编码)</td>
          <td colspan="10">{{hsCode}}</td>
        </tr>
        <tr v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08' || printList.exhibitionArea === 'VS04' || printList.exhibitionArea === 'HD06'">
          <td colspan="5">产品最大外形尺寸(mm)</td>
          <td colspan="10">长:{{printList.productLong}} , 宽:{{printList.productWidth}} , 高:{{printList.productHeight}}</td>
        </tr>
        <tr>
          <td colspan="2">法定代表人</td>
          <td colspan="3">{{companyInfo.legalPerson}}</td>
          <td colspan="6">统一社会信用代码/营业执照号</td>
          <td colspan="4">{{companyInfo.businessLicenceNo}}</td>
        </tr>
        <tr>
          <td colspan="5">是否愿意在广交会上接洽国内采购商</td>
          <td colspan="2">{{printList.isContacted}}</td>
          <td colspan="4">是否有联营参展单位</td>
          <td colspan="4">{{unionComName}}</td>
        </tr>
        <tr>
          <td colspan="4">企业类型</td>
          <td colspan="3">{{comType}}</td>
          <td colspan="4">企业属性</td>
          <td colspan="4">{{comAttribute}}</td>
        </tr>
        <tr>
          <td colspan="4">进出口企业代码</td>
          <td colspan="3">{{companyInfo.importExportCode}}</td>
          <td colspan="4">上年度出口额</td>
          <td colspan="4">{{companyInfo.exportVolumeLast}} 万美元</td>
        </tr>
        <tr v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08' || printList.exhibitionArea === 'VS04' || printList.exhibitionArea === 'HD06'">
          <td colspan="4">本届申请摊位面积(m²)</td>
          <td colspan="3">{{printList.boothAcreage}}</td>
          <td colspan="4">上届摊位面积(m²)</td>
          <td colspan="4">{{printList.boothAcreageLast}}</td>
        </tr>
        <tr v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08' || printList.exhibitionArea === 'VS04' || printList.exhibitionArea === 'HD06'">
          <td colspan="4">重量(kg)</td>
          <td colspan="3">{{printList.productWeight}}</td>
          <td colspan="4">运输时底座面积(m²)</td>
          <td colspan="4">{{printList.bottomLong*printList.bottomWidth}}</td>
        </tr>
        <tr>
          <td colspan="4">参展联系人</td>
          <td colspan="3">{{companyInfo.exhibitorContact}}</td>
          <td colspan="4">手机</td>
          <td colspan="4">{{companyInfo.exhibitorContactPhone}}</td>
        </tr>
        <tr>
          <td colspan="4">联系电话</td>
          <td colspan="3">{{getTelephone}}</td>
          <td colspan="4">传真</td>
          <td colspan="4">{{getFax}}</td>
        </tr>
        <tr>
          <td colspan="4">邮政编码</td>
          <td colspan="3">{{companyInfo.postalCode}}</td>
          <td colspan="4">E-mail</td>
          <td colspan="4">{{companyInfo.businessContactsEmail}}</td>
        </tr>
        <tr>
          <td style="text-align: left"  colspan="7">
            注：1.本企业一经申请盖章，保证填报内容的真实性并确认已经阅读并接受《广交会出口展展位使用责任书》、《中国进出口商品交易会出口展参展须知》、《中国进出口商品责任交易会出口展参展商服务指南》
            <span v-if="printList.exhibitionArea === 'CG06' || printList.exhibitionArea === 'NE01'">、《广交会新能源、宠物用品展区退展位约束机制》</span>
            及有关增订条款，
            <span>承诺遵守广交会各项规章制度。</span>
            <br/>
            2.通过参展易捷通填报展品信息时提交了同意授权声明的企业，须对其所声明的内容负责。
            <br/>
            <div style="float: right">
              <span>（申请企业盖章）</span>
              <br/>
              <span><i class="date">年</i><i class="date">&nbsp;&nbsp;月</i><i class="date">&nbsp;&nbsp;日</i></span>
            </div>
          </td>
          <td style="text-align: left"  colspan="8">
            <div style="float: right;">
              <span> （交易团盖章）</span> <br/>
              <span><i class="date">年</i><i class="date">&nbsp;&nbsp;月</i><i class="date">&nbsp;&nbsp;日</i></span>
            </div>
          </td>
        </tr>
        <tr>
          <td style="text-align: left"  colspan="15" v-if="printList.exhibitionArea === 'MA02' || printList.exhibitionArea === 'MA07' || printList.exhibitionArea === 'MA08' || printList.exhibitionArea === 'VS04' || printList.exhibitionArea === 'HD06'">
            说明：<br/>
            1.本表根据申请企业录入参展易捷通的资料自动生成（一个展区对应一份申请表）。<br/>
            2.请如实申报产品外形尺寸（产品参展时的外切矩形尺寸），如实际参展产品尺寸与申报不一致，视为违规。<br/>
            3.本表须加盖申请企业公章<span v-if="isShow === false">，并连同相关证明材料（如上年度出口额、国家级奖励、国际通行的管理体系认证、专利、列入国家高新技术产品目录或国家科技部颁发的高新技术产品证书、海外注册商标等）</span>一并提交给所在行政区域或系统交易团/中央企业交易团分团，参展申请方正式生效。({{printList.delegationName}}地址：{{sysDepartmentDTO.deptAddr}}  邮政编码：{{sysDepartmentDTO.postcode}} 联系电话:{{sysDepartmentDTO.contactsInfo}} 传真:{{sysDepartmentDTO.fax}} )<br/>
            <span v-if="isShow === false">4.如有联营（供货）单位共同参展，请在参展申请时同时提交联营单位申请资料。</span><br/>
          </td>
          <td style="text-align: left"  colspan="15" v-else>
            说明：<br/>
            1.本表根据申请企业录入参展易捷通的资料自动生成（一个展区对应一份申请表）。<br/>
            2.本表须加盖申请企业公章<span v-if="isShow === false">，并连同相关证明材料（如上年度出口额、国家级奖励、国际通行的管理体系认证、专利、列入国家高新技术产品目录或国家科技部颁发的高新技术产品证书、海外注册商标等）</span>一并提交给所在行政区域或系统交易团/中央企业交易团分团，参展申请方正式生效。({{sysDepartmentDTO.fullName}}地址：{{sysDepartmentDTO.deptAddr}}  邮政编码：{{sysDepartmentDTO.postcode}} 联系电话:{{sysDepartmentDTO.contactsInfo}} 传真:{{sysDepartmentDTO.fax}} )<br/>
            <span v-if="isShow === false">3.如有联营（供货）单位共同参展，请在参展申请时同时提交联营单位申请资料。</span><br/>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 联营企业打印表 -->
    <template v-if="isUnionCom">
      <div v-for="(union, index) in unionDetail" :key="index">
        <table style="margin-top: 50px;" border="1" cellpadding="0" cellspacing="0" width='100%' :style="isOne && index === 0 ? 'table-layout:fixed;page-break-after:always;':'table-layout:fixed;'">
          <thead>
            <tr>
              <td colspan='15' border='0' class="thead" style="text-align: left">
                <h1><img src="../../../../static/img/print/printHead.jpg" style="width: 20%; height:30px;"></h1>
                <h2 class="thead">第{{session}}届广交会出口展联营参展申请表</h2>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">申报展区代码</td>
              <td colspan="5">{{printList.exhibitionArea}}</td>
              <td colspan="3">申报展区</td>
              <td colspan="5">{{printList.exhibitionAreaName}}</td>
            </tr>
            <tr>
              <td colspan="2">申请企业永久代码</td>
              <td colspan="5">{{companyInfo.companyId}}</td>
              <td colspan="3">申请企业广交会编码</td>
              <td colspan="5">{{companyInfo.cantonCode}}</td>
            </tr>
            <tr>
              <td colspan="2">申请企业中文名称</td>
              <td colspan="13">{{companyInfo.companyName}}</td>
            </tr>
            <tr>
              <td colspan="2" rowspan="2">联营单位名称</td>
              <td colspan="3">中文</td>
              <td colspan="10">{{union.nameCh ? union.nameCh : ''}}</td>
            </tr>
            <tr>
              <td colspan="3">英文</td>
              <td colspan="10">{{union.nameEn}}</td>
            </tr>
            <tr>
              <td colspan="2" rowspan="2">联营单位地址</td>
              <td colspan="3">中文</td>
              <td colspan="10">{{union.addressCh}}</td>
            </tr>
            <tr>
              <td colspan="3">英文</td>
              <td colspan="10">{{union.addressEn}}</td>
            </tr>
            <tr>
              <td colspan="3">法定代表人</td>
              <td colspan="4">{{union.legalPerson}}</td>
              <td colspan="3">统一社会信用代码(营业执照号)</td>
              <td colspan="5">{{union.businessLicenceNo}}</td>
            </tr>
            <tr>
              <td colspan="3">海关编码</td>
              <td colspan="4">{{union.customsRegisterNo}}</td>
              <td colspan="3">企业类型</td>
              <td colspan="5">{{union.companyType}}</td>
            </tr>
            <tr>
              <td colspan="3">进出口企业代码</td>
              <td colspan="4">{{companyInfo.importExportCode}}</td>
              <td colspan="3">企业属性</td>
              <td colspan="5">{{union.companyAttribute}}</td>
            </tr>
            <tr>
              <td colspan="3">联系人</td>
              <td colspan="4">{{union.contacts}}</td>
              <td colspan="3">手机</td>
              <td colspan="5">{{union.telephone}}</td>
            </tr>
            <tr>
              <td colspan="3">联系电话</td>
              <td colspan="4">{{union.phone}}</td>
              <td colspan="3">传真</td>
              <td colspan="5">{{union.fax}}</td>
            </tr>
            <tr>
              <td colspan="3">邮政编码</td>
              <td colspan="4">{{companyInfo.postalCode}}</td>
              <td colspan="3">E-mail</td>
              <td colspan="5">{{union.email}}</td>
            </tr>
            <tr>
              <td style="text-align: left;" colspan="7">
                注：企业一经申请盖章，保证填报内容的真实性并确认已经阅读并接受《广交会出口展展位使用责任书》、《中国进出口商品交易会出口展参展须知》、《中国进出口商品责任交易会出口展参展商服务指南》及有关增订条款，承诺遵守广交会各项规章制度。
                <br/>
                <div style="float: right">
                  <span>（申请企业盖章）</span> <br/>
                  <span><i class="date">年</i><i class="date">&nbsp;&nbsp;月</i><i class="date">&nbsp;&nbsp;日</i></span>
                </div>
              </td>
              <td colspan="8">
                <div style="float: right;">
                  <span>（交易团盖章）</span> <br/>
                  <span><i class="date">年</i><i class="date">&nbsp;&nbsp;月</i><i class="date">&nbsp;&nbsp;日</i></span>
                </div>
              </td>
            </tr>
            <tr>
              <td style="text-align: left;" colspan="15">
                说明：<br/>
                1.本表根据申请企业录入参展易捷通的资料自动生成（一个展区对应一份申请表）。<br/>
                2.如有联营(供货)单位共同参展，请在参展申请时同时提交联营参展申请表，本表须加盖申请参展单位公章，并提交给所在行政区域或系统交易团/中央企业交易团分团，联营参展申请方正式生效。({{sysDepartmentDTO.fullName}}地址：{{sysDepartmentDTO.deptAddr}}  邮政编码：{{sysDepartmentDTO.postcode}} 联系电话:{{sysDepartmentDTO.contactsInfo}} 传真:{{sysDepartmentDTO.fax}} )<br/>
                3.联营参展仅限于流通型企业与非流通型企业联营。企业在同一个展区有2个以上展位才能联营，其中每个展位仅限1家联营单位，同一展区最多只能填报2家联营单位。<br/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <div class="txAline">
      <el-button type="primary" class="mimeograph" @click="handPrint">打印</el-button>
      <el-button type="primary" @click="handBack" class="mimeograph">返回</el-button>
    </div>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        printList: {},
        isUnionCom: false,
        companyInfo: {},
        sysDepartmentDTO: {},
        unionPrintList: [],
        // unionDetail: [], // 联营企业信息
        unionDetail: [],
        session: "",
        productName: "",
        // 存hs编码的集合
        mainProductCodeList: [],
        // hs编码
        hsCode: "",
        // 存海关编码的集合
        companyCustomsCodeList: [],
        // 海关编码
        customsCode: "",
        companyProductList: [],
        isShow: false,
        boothType: "",
        exhibitionType: "",
        isOne: false, //判断是否需要换页
        unionComName: "", // 联营企业名称
        finalExhibitionTypeOpts: [], // 展位类型字典
        companyType: [], // 企业类型字典
        companyAttribute: [], // 企业属性字典
        comType: "", // 企业类型
        comAttribute: "" //企业属性
      };
    },
    computed: {
      getTelephone() {
        if ((this.companyInfo.telephoneCode !== '') && (this.companyInfo.telephoneCodeLast !== '')) {
          return this.companyInfo.telephoneCode + '-' + this.companyInfo.telephoneCodeLast;
        } else {
          return '';
        }
      },
      getFax() {
        if ((this.companyInfo.faxCode !== '') && (this.companyInfo.faxCodeLast !== '')) {
          return this.companyInfo.faxCode + '-' + this.companyInfo.faxCodeLast;
        } else {
          return '';
        }
      }
    },
    methods: {
      ...mapActions("companyInfomation", ["getHandRemove", 'getAreaCodeInfo', 'getGeneralAddi', 'getAssociateEnterprisesDetailInfo']),
      ...mapActions('common', ['getSessionInfo']),
      // 返回
      handBack() {
        if (this.$route.query.isShow === false) {
          this.$router.push({
            path: "/brand_applicat_list"
          });
        } else {
          this.$router.push({
            path: "/brandConfirmNum"
          });
        }

      },
      // 打印
      handPrint() {
        window.print();
      }
    },
    async beforeCreate () {
      this.finalExhibitionTypeOpts = await kindo.dictionary.get('exhibitionType');
      this.companyType = await kindo.dictionary.get('companyType');
      this.companyAttribute = await kindo.dictionary.get('companyAttribute');
    // this.typeOfExhibitsArrangement = await kindo.dictionary.get('typeOfExhibitsArrangement'); // 布展类型
    },
    created() {
      let _this = this;
      this.isShow = this.$route.query.isShow;
      if (this.$route.query.demandRecordId) {
        let val = encodeURI(JSON.stringify({ demandRecordId: this.$route.query.demandRecordId }));
        this.getHandRemove(val).then(resT => {
          for (let i in resT) {
            if (resT[i] == null) {
              resT[i] = '';
            }
            this.printList[i] = resT[i];
          }
          // 处理是否愿意在广交会上接纳国内采购商情况
          if (this.printList.isContacted && this.printList.isContacted === '1') {
            this.printList.isContacted = '是';
          } else {
            this.printList.isContacted = '否';
          }
          // 处理是否有联营参展单位情况
          if (_this.printList.companyUnionList && _this.printList.companyUnionList.length > 0) {
            // _this.unionDetail = [{}];
            _this.unionDetail = [];
            // this.printList.unionId = '是';
            for (let m = 0; m < _this.printList.companyUnionList.length; m++) {
              _this.getAssociateEnterprisesDetailInfo(_this.printList.companyUnionList[m].unionId).then(resM => {
                if (resM) {
                  for (let n = 0; n < this.companyAttribute.length; n++) {
                    if (_this.companyAttribute[n].value === resM.companyAttribute) {
                      resM.companyAttribute = _this.companyAttribute[n].label;
                    }
                  }
                  for (let t = 0; t < _this.companyType.length; t++) {
                    if (_this.companyType[t].value === resM.companyType) {
                      resM.companyType = _this.companyType[t].label;
                    }
                  }
                  _this.unionDetail.push(resM);
                }
                if (_this.printList.companyUnionList.length - 1 === m) {
                  _this.isUnionCom = true;
                }
              });
            }
          } else {
            // this.printList.unionId = '否';
            this.isUnionCom = false;
          }
          // 处理企业信息
          if (resT.companyAllInfo == null) {
            resT.companyAllInfo = '';
          } else {
            this.companyInfo = resT.companyAllInfo;
          }
          if (resT.sysDepartmentDTO == null) {
            resT.sysDepartmentDTO = '';
          } else {
            // this.sysDepartmentDTO = resT.sysDepartmentDTO;
            for (let k in resT.sysDepartmentDTO) {
              this.sysDepartmentDTO[k] = resT.sysDepartmentDTO[k];
            }
          }
          // 处理展位类型
          // if (this.printList.exhibitionType === 'SPECIAL_BOOTH') {
          //   this.printList.exhibitionType = '特装';
          // } else if (this.printList.exhibitionType === 'STANDARD_BOOTH') {
          //   this.printList.exhibitionType = '标摊';
          // } else if (this.printList.exhibitionType === 'UNIFICATION_BOOTH') {
          //   this.printList.exhibitionType = '统一布展';
          // } else {
          //   this.printList.exhibitionType = '';
          // }
          // 处理主要展示产品
          if (resT.companyProductList && resT.companyProductList == null) {
            resT.companyProductList = '';
          } else if (resT.companyProductList && resT.companyProductList.length > 0) {
            this.productName = '';
            this.companyProductList = [];
            this.companyProductList = resT.companyProductList;
            if (this.companyProductList.length > 1) {
              this.productName = this.companyProductList[0].productName;
              for (let i = 1; i < this.companyProductList.length; i++) {
                this.productName = this.productName + "," + this.companyProductList[i].productName;
              }
            } else {
              this.productName = this.companyProductList[0].productName;
            }
          }
          // 处理联营企业
          if (resT.companyUnionList && resT.companyUnionList == null || resT.companyUnionList.length === 0) {
            resT.companyUnionList = '';
            this.unionComName = '无联营企业';
          } else if (resT.companyUnionList && resT.companyUnionList.length > 0) {
            this.unionComName = '';
            let unionComNameList = [];
            this.isOne = false;
            if (resT.companyUnionList.length > 1) {
              if (resT.companyUnionList[1].unionId !== 'none') {
                this.isOne = true;
              }
              this.getGeneralAddi(encodeURI(JSON.stringify({ companyId: this.$store.state.userInfo.companyId }))).then(resU => {
                for (let i = 0; i < resT.companyUnionList.length; i++) {
                  for (let j = 0; j < resU.length; j++) {
                    if (resT.companyUnionList[i].unionId === resU[j].associateId) {
                      unionComNameList.push(resU[j].nameCh);
                    }
                  }
                }
                this.unionComName = unionComNameList.join(',');
              });

            } else {
              this.getGeneralAddi(encodeURI(JSON.stringify({ companyId: this.$store.state.userInfo.companyId }))).then(resU => {
                for (let i = 0; i < resU.length; i++) {
                  if (resT.companyUnionList[0].unionId === resU[i].associateId) {
                    this.unionComName = resU[i].nameCh;
                  }
                }
              });
            }
          }
          // 处理多个联营企业打印页
          if (resT.companyUnionDTOList && resT.companyUnionDTOList == null) {
            resT.companyUnionDTOList = '';
          } else if (resT.companyUnionDTOList && resT.companyUnionDTOList.length > 0) {
            this.unionPrintList = [];
            for (let i = 0; i < resT.companyUnionDTOList.length; i++) {
              this.unionPrintList.push(resT.companyUnionDTOList[i].enterprisesInfoDTO);
            }
          }
          // 处理hs编码
          if ((this.printList.exhibitionArea === 'CG06' || this.printList.exhibitionArea === 'NE01') && resT.mainProductCodeList && resT.mainProductCodeList.length > 0) { // 新宠情况
            this.mainProductCodeList = [];
            this.mainProductCodeList = resT.mainProductCodeList;
            if (this.mainProductCodeList.length > 1) {
              this.hsCode = this.mainProductCodeList[0].hsCode;
              for (let i = 1; i < this.mainProductCodeList.length; i++) {
                this.hsCode = this.hsCode + ',' + this.mainProductCodeList[i].hsCode;
              }
            } else {
              this.hsCode = this.mainProductCodeList[0].hsCode;
            }
          } else {
            this.hsCode = this.printList.hscode;
          }
          // 处理海关编码
          if (this.printList.exhibitionArea === 'CG06' || this.printList.exhibitionArea === 'NE01') {
            this.companyCustomsCodeList = [];
            this.companyCustomsCodeList = resT.companyCustomsCodeList;
            if (this.companyCustomsCodeList.length > 1) {
              this.customsCode = this.companyCustomsCodeList[0].customsCode;
              for (let i = 1; i < this.companyCustomsCodeList.length; i++) {
                this.customsCode = this.customsCode + ',' + this.companyCustomsCodeList[i].customsCode;
              }
            } else {
              this.customsCode = this.companyCustomsCodeList[0].customsCode;
            }
          } else {
            this.customsCode = this.companyInfo.customsCode;
          }
          // if (resT.mainProductCodeList == null) {
          //   resT.mainProductCodeList = '';
          // } else if (resT.mainProductCodeList && resT.mainProductCodeList.length > 0) {
          //   this.hsCode = '';
          //   this.mainProductCodeList = [];
          //   this.mainProductCodeList = resT.mainProductCodeList;
          //   if (this.mainProductCodeList.length > 1) {
          //     this.hsCode = this.mainProductCodeList[0].hsCode;
          //     for (let i = 1; i < this.mainProductCodeList.length; i++) {
          //       this.hsCode = this.hsCode + ',' + this.mainProductCodeList[i].hsCode;
          //     }
          //   } else {
          //     this.hsCode = this.mainProductCodeList[0].hsCode;
          //   }
          // }
          for (let i = 0; i < _this.finalExhibitionTypeOpts.length; i++) {
            if (_this.finalExhibitionTypeOpts[i].value === resT.exhibitionType) {
              _this.exhibitionType = _this.finalExhibitionTypeOpts[i].label;
            }
          }
          for (let i = 0; i < _this.companyType.length; i++) {
            if (_this.companyType[i].value === resT.companyAllInfo.enterprisesType) {
              _this.comType = _this.companyType[i].label;
            }
          }
          for (let i = 0; i < this.companyAttribute.length; i++) {
            if (_this.companyAttribute[i].value === resT.companyAllInfo.enterpriseAttribute) {
              _this.comAttribute = _this.companyAttribute[i].label;
            }
          }
          let areaCode = '';
          if (this.printList.exhibitionArea) {
            areaCode = this.printList.exhibitionArea;
          }
          _this.getAreaCodeInfo({
            "areaCode": areaCode,
            "session": _this.session
          }).then(res => {
            if (res && res.length > 0) {
              for (let k = 0; k < res.length; k++) {
                if (res[k].specialAreas && res[k].specialAreas.length > 0) {
                  let currentSpecialAreas = res[k].specialAreas;
                  for (let i = 0; i < currentSpecialAreas.length; i++) {
                    let currentSubSpecialAreas = currentSpecialAreas[i];
                    if (currentSubSpecialAreas.specialAreaCode === resT.productType && currentSubSpecialAreas.languages && currentSubSpecialAreas.languages.length > 0) {
                      let currentLanguages = currentSubSpecialAreas.languages;
                      for (let j = 0; j < currentLanguages.length; j++) {
                        if (currentLanguages[j].language === 'zh') {
                          _this.boothType = currentLanguages[j].name;
                        }
                      }
                    }
                  }
                }
              }
            }
          });
        }).then(() => {
          setTimeout(() => {
            window.print();
          }, 2000);
        });
      }
      this.getSessionInfo().then(res => {
        this.session = res.session;
      });


    }
  };
</script>

<style scoped>
@media print {
  .mimeograph {
    display: none;
  }


  .edit-text {
    display: none;
  }

  .noprint {
    display: none;
  }
}

@page {
  margin: 0;
}
</style>


