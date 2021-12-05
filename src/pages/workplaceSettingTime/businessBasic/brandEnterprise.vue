<style lang="less" scoped>
.recognitionBooths {
  .box-card {
    margin-bottom: 24px;
  }
  .btnClass {
    text-align: center;
    margin: 20px 0;
    /deep/.el-dialog__header {
      text-align: left;
    }
  }
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
  .fathbtn {
    border: 1px solid #ebeef5;
    border-top: 0;
    display: flex;
    justify-content: space-around;
    line-height: 34px;
    .onebtn {
      width: 49%;
      text-align: center;
    }
  }
  .rightbtn {
    text-align: right;
    border: 1px solid #ebeef5;
    padding: 20px;
  }
  .context p{
    text-align: justify;
    text-justify: inter-ideograph;
    text-indent: 2em;
  }
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
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
</style>
<template>
  <el-tabs v-model="activeName" class="recognitionBooths">
    <el-tab-pane label="审核企业清单" name="first"></el-tab-pane>
    <!-- 企业基本资料 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业基本资料:</span>
      </div>
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
            <td class="tac">{{enterpriseList.companyName}}</td>
            <td class="tbc">企业英文名称</td>
            <td class="tac">{{enterpriseList.companyNameEn}}</td>
          </tr>
          <tr>
            <td class="tbc">企业简称</td>
            <td class="tac">{{enterpriseList.enterpriseAbbreviation}}</td>
            <td class="tbc">广交会编码</td>
            <td class="tac">{{enterpriseList.cantonCode}}</td>
          </tr>
          <tr>
            <td class="tbc">企业中文地址</td>
            <td class="tac">{{enterpriseList.adressCh}}</td>
            <td class="tbc">企业英文地址</td>
            <td class="tac">{{enterpriseList.adressEn}}</td>
          </tr>
          <tr>
            <td class="tbc">邮政编码</td>
            <td class="tac">{{enterpriseList.postalCode}}</td>
            <td class="tbc">法定代表人</td>
            <td class="tac">{{enterpriseList.legalPerson}}</td>
          </tr>
          <tr>
            <td class="tbc">企业统一社会信用代码（营业执照号）</td>
            <td class="tac">{{enterpriseList.businessLicenceNo}}</td>
            <td class="tbc">企业类型</td>
            <td class="tac">{{enterpriseList.enterprisesType | companyTypeFilter}}</td>
          </tr>
          <tr>
            <td class="tbc">企业属性</td>
            <td class="tac">{{enterpriseList.enterpriseAttribute | companyProp}}</td>
            <td class="tbc">上年度出口额（万美元）（企业填报）</td>
            <td class="tac">{{enterpriseList.exportVolumeLast}}</td>
          </tr>
          <tr>
            <td class="tbc">企业成立年份</td>
            <td class="tac">{{enterpriseList.incorporationYear}}</td>
            <td class="tbc">注册资本（万人民币）</td>
            <td class="tac">{{enterpriseList.registeredCapital}}</td>
          </tr>
          <tr>
            <td class="tbc">参展联系人</td>
            <td class="tac">{{enterpriseList.businessContactsCh}}</td>
            <td class="tbc">联系电话</td>
            <td class="tac">{{enterpriseList.telephone}}</td>
          </tr>
          <tr>
            <td class="tbc">电子邮箱</td>
            <td class="tac">{{enterpriseList.dedicatedEmail}}</td>
            <td class="tbc">联系手机</td>
            <td class="tac">{{enterpriseList.phone}}</td>
          </tr>
          <tr>
            <td class="tbc">企业传真</td>
            <td class="tac">{{enterpriseList.fax}}</td>
            <td class="tbc">企业网址</td>
            <td class="tac">{{enterpriseList.website}}</td>
          </tr>
        </table>
      </div>
      <!--<cust-table :loading='loadingone' :cols="cols" :data="tableData"></cust-table>
      <div class="newfathbtn">
        <div class="newonebtn">审核</div>
        <div class="newonebtn">
          <el-button style="padding: 3px 0" type="text" @click="btnshow('通过')">通过</el-button>
          <el-button style="padding: 3px 0" type="text" @click="btnshow('不通过')">不通过</el-button>
        </div>
      </div>
      -->
      <div class="newfathbtn" style="margin-top: 30px; border-top: 1px solid #ebeef5; font-weight: 900;">
        <div class="newonebtn" style="background: #ebeef5;">是否大会禁止参展企业:</div>
        <div class="newonebtn" style="color: red;">
          <div v-if="!enterpriseList.forbidJoin">该企业属大会规定禁止参展的企业</div>
          <!-- <div v-else><el-button type="primary">{{enterpriseList.forbidJoin}}</el-button></div> -->
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
        <div class="newonebtn">交易团审核：{{enterpriseList.clusterCheckStatus | checkStatus}}</div>
        <div class="newonebtn" v-if="enterpriseList.clusterCheckStatus === '1'">交易团审核不通过原因：无</div>
        <div class="newonebtn" v-else-if="enterpriseList.clusterCheckStatus === '2'">交易团审核不通过原因：{{enterpriseList.clusterCheckOpinion}}</div>
        <div class="newonebtn" v-else>交易团审核不通过原因：{{enterpriseList.clusterCheckOpinion}}</div>
        <div class="newonebtn">分团审核：{{enterpriseList.subClusterCheckStatus | checkStatus}}</div>
        <div class="newonebtn" v-if="enterpriseList.subClusterCheckStatus === '1'">分团审核不通过原因：无</div>
        <div class="newonebtn" v-else-if="enterpriseList.subClusterCheckStatus === '2'">分团审核不通过原因：{{enterpriseList.subClusterCheckOpinion}}</div>
        <div class="newonebtn" v-else>分团审核不通过原因：{{enterpriseList.subClusterCheckOpinion}}</div>
        <div class="newonebtn">
          <el-button type="primary" @click="btnshow('通过')">通过</el-button>
          <el-button type="primary" @click="btnshow('不通过')">不通过</el-button>
        </div>
      </div>
      <el-dialog title="审核" :visible.sync="btnDialogVisible" width="30%;">
        <el-form :model="reasonForm" ref="passReasonForm" :rules="reasonFormRule">
          <el-form-item label="不通过原因：" prop="examineOpinion">
            <el-input type="textarea" v-model="reasonForm.examineOpinion" :rows="4" maxlength="120"></el-input>
          </el-form-item>
          <div class="dialog-footer">
            <el-button type="primary" size="medium" @click="handlePassSave('passReasonForm')">保存</el-button>
            <el-button size="medium" @click="btnDialogVisible = false;">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-card>
    <!--
    <div class="newfathbtn" style="margin-top: 30px; border-top: 1px solid #ebeef5; font-weight: 900;">
      <div class="newonebtn" style="background: #ebeef5;">是否大会禁止参展企业:</div>
      <div class="newonebtn" style="color: red;">
        <div>{{enterpriseList.forbidJoin}}</div>
      </div>
    </div>
    <div class="newbtn context">
      <p> 企业不属于下列任一情况：</p>
      <p>（一）商务部向社会公告的违规违法企业，在公告期内禁止参展。</p>
      <p>（二）国家工商、海关、税务、质检、外汇、环保、药监等部门通报的违规违法企业, 在处罚期限内禁止参展；无处罚期限的，从处罚之日起连续六届禁止参展。</p>
      <p>（三）因违规转让或转租（卖）广交会展位、涉嫌展品质量与贸易纠纷投诉、知识产权侵权等行为违反大会相关规定，并处于被取消参展资格处罚期限内的企业。</p>
      <p>（四）因拒不服从大会管理、破坏展览秩序等其他行为，被大会认为对广交会声誉或正常运营造成较大不良影响，被取消参展资格的企业。</p>
    </div>
    -->
    <!-- 企业参展展品 -->
    <!--
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业展品信息:</span>
      </div>
      <canbeedit-table
        :height='exhibitsHeight'
        :loading="loadtwo"
        :tableTrData="exhibitsTrDate"
        :tableData="ExhibitsDate"
        :selection ='selection'
        :isSelectable ='isSelectable'
        @change-multiple-selection ='selectAll'
        @deal-with-operate="exhibitsEvent"
      ></canbeedit-table>
      <pagination
        class="pages"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
      <div class="rightbtn">
        <el-button type="text" @click="allpass">批量通过</el-button>
      </div>
      <div  class="fathbtn">
        <div class="onebtn" style="font-size: 12px;border-right: 1px solid #ebeef5; flex: 5;text-align: left;padding: 20px;">
          <p v-for="item in cityDate" :key="item.value">{{item.label}}</p>
      -->
          <!--
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in cityDate" :label="item.label" :key="item.value">
            </el-checkbox>
          </el-checkbox-group> -->
       <!--
        </div>
        <div class="onebtn" style="font-size: 12px;border-right: 1px solid #ebeef5; flex: 1;text-align: left;padding: 20px;">
          <p>交易团审核结果</p>
          <p>{{companyResult.clusterCheckStatus}}</p>
        </div>
        <div class="onebtn" style="border-right: 1px solid #ebeef5; flex: 1;">
          <div style="margin-top: 50%;">
            <el-button style="padding: 30px 0; color:red;" type="text" @click="producttextBtn('通过')">通过</el-button>
            <el-button style="padding: 30px 0; color:red;" type="text" @click="producttextBtn('不通过')">不通过</el-button>
          </div>
        </div>
      </div>
    </el-card>
    -->
    <!--
    <el-dialog title="设置公布批次时间" :visible.sync="btnDialogVisible" width="30%;">
      <btndialog @closeModal="customsModal" :onebtnData="onebtnData"></btndialog>
    </el-dialog>
    -->
    <div class="btnClass">
      <el-button @click="enterpriseback">返回</el-button>
    </div>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/common/custTable.vue";
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import addcustoms from "./component/addCustoms";
import addcustomsCode from "./component/addcustomsCode";
import addapply from "./component/addApply";
import btndialog from "./component/btnDialog";
import pagination from "@/components/project/common/pagination.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "cust-table": custTable,
    "canbeedit-table": canBeEditTable,
    "addcustoms": addcustoms,
    "addapply": addapply,
    "btndialog": btndialog,
    addcustomsCode,
    pagination
  },
  data() {
    return {
      companyId: '',
      newcafe: '',
      reasonForm: {
        examineOpinion: ''
      },
      reasonFormRule: {
        examineOpinion: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      routeData: {},
      cityDate: [
        {
          label: '企业参展展品不属于以下任一情况：',
          value: 0
        },
        {
          label: '（一）《中国进出口商品交易会参展展品范围（出口展）》规定之外的展品。',
          value: 1
        },
        {
          label: '（二）不符合《中华人民共和国产品质量法》、《中华人民共和国进出口商品检验法》及其他有关出口产品质量法律法规规定的展品。',
          value: 2
        },
        {
          label: '（三）涉及商标、专利、版权，但未取得合法权利证书或使用许可合同的展品。',
          value: 3
        },
        {
          label: '（四）在商务、出入境检验检疫机构、药品等质量监督管理部门有不良记录且未经复检合格的展品。',
          value: 4
        },
        {
          label: '（五）被司法机关、仲裁机关或知识产权行政管理机关认定侵权的展品',
          value: 5
        }
      ],
      companyIdDate: '',
      applyHeight: "300",
      exhibitsHeight: "300",
      jointventureHeight: "300",
      exporHeight: "300",
      customsHeight: "300",
      enterpriseDate: {},
      customsult: '',
      loadingone: false,
      loading: false,
      loadtwo: false,
      loadthree: false,
      customsloading: false,
      dealWithaddCustoms: false,
      selection: true,
      isNew: false,
      roleJsonStr: [],
      exportDate: [],
      keyDate: [],
      ExhibitsDate: [],
      jointDate: [],
      NoticeDate: [],
      activeName: "first",
      onebtnData: {
        'examineOpinion': '',
        'newdata': ''
      },
      centerDialogVisible: false,
      applyDialogVisible: false,
      btnDialogVisible: false,
      loadingExport: false,
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
       // 第五个表头数据
      exhibitsTrDate: [
        {
          prop: "exhibitNameCh",
          label: "产品名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "imgfile",
          label: "图片",
          type: "images",
          style: 'width: 100%; height:100%',
          userDefined: true
        },
        {
          prop: "exhibitModelCh",
          label: "型号",
          type: "string"
        },
        {
          prop: "productType",
          label: "类别",
          type: "string"
        },
        {
          prop: "forbid",
          label: "是否大会禁止参展产品",
          type: "string"
        },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "string"
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "120",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #409EFF;"
              }
            ]
          }
        }
      ],
      exhibitsData: [
        {
          applyCode: "1111",
          apply: "境外",
          operateType: "text",
          Code: "lalal",
          enclosure: "wwww",
          register: "sss"
        }
      ],
      listingPlace: [],
      post: [],
      mainMarket: [],
      mainType: [],
      developNum: [],
      participationGoal: [],
      tradeForm: [],
      staff: [],
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10,
        // companyId: 1916800303
        companyId: this.$route.query.id
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      }
    };
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "enterpriseList",
      "exportList", //企业进出口经营权
      "auditList", //企业进出口经营权审核
      "enterpriseApplication",
      "auditenterList",
      "exhibitsList", //企业产品信息列表
      "productcheckList", //审核企业产品信息
      "jointventureList",
      'auditjointList',  //审核联营企业
      'photoUrl',  //获取图片地址
      'customCodeList',  //海关编码列表
      'amountsult',  //出口额是否达标审核结果
      'companyproductExplain',  //展品文字审核
      'companyResult' //展品文字审核结果
    ])
  },
  filters: {
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
    }
  },
  async created() {
    this.listingPlace = await kindo.dictionary.get('listingPlace');    //上市地点
    this.post = await kindo.dictionary.get('post');    //职位
    this.mainMarket = await kindo.dictionary.get('mainMarket');    //目标市场
    this.mainType = await kindo.dictionary.get('mainType');    //目标客户类型
    this.developNum = await kindo.dictionary.get('developNum');    //研发部门人数
    this.participationGoal = await kindo.dictionary.get('participationGoal');    //参展目的
    this.tradeForm = await kindo.dictionary.get('tradeForm');    //贸易形式
    this.staff = await kindo.dictionary.get('staff');    //员工数量
  },
  mounted() {
    this.routeData = this.$route.query.row;
    this.getPhotourl().then((res) => {
      this.city = res;
    });
    let newArry = [];
    for (let key in this.$store.getters.userInfo.role) {
      let newobj = {};
      newobj.roleId = this.$store.getters.userInfo.role[key].roleId;
      newobj.roleName = this.$store.getters.userInfo.role[key].roleName;
      newArry.push(newobj);
    }
    this.roleJsonStr = JSON.stringify(newArry);
    if (this.$route.query.id) {
      this.getcompanyInfo();
      // this.getExhibits(this.searchParams);
      // this.getCompanyresult(this.$route.query.id).then((res) => {
      // });
    }
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
    ...mapActions("quantitativeArrangement", [
      "getEnterpriseinformation",
      'getQualificationaudit', // 企业基本资料审核
      "getExportOperating", //企业进出口经营权
      "getBusinessaudit", //企业进出口经营权审核
      "getEnterpriseapplication",
      "getAuditenterpriseBooth",
      "getExhibitsinformation", //企业产品信息列表
      "getProductcheck", //审核企业产品信息通过按钮
      "getJointventure", //审核联营企业列表
      'getAuditjoint',  //审核联营企业通过按钮
      'getPhotourl', //获取图片地址
      'getCustomCode',  //海关编码列表
      'getCustomcheck',   //海关编码审核
      'getCustomRemove',  //海关编码删除
      'getAmountcheck',  //出口额是否达标审核
      'getAmountasult',   //出口额是否达标审核结果
      'getAllproduct',  //批量审核企业展品,
      'getCompanyProductExplain', //展品文字审核
      'getCompanyresult'  //展品文字审核结果
    ]),
    //企业基本信息
    getcompanyInfo() {
      this.loadingone = true;
      this.getEnterpriseinformation({
        companyId: this.$route.query.id
      }).then(res => {
        this.tableData.data = JSON.parse(JSON.stringify(res));
        this.tableData.data[this.tableData.data.length - 1].name = '';
        this.tableData.data[this.tableData.data.length - 1].type = '';
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
            // console.log(twostr, 'kkktwostr');
            // this.getPhotourl(str).then((newres) => {
            //   if (newres.province) {
            //     pro = newres.province;
            //   }
            //   for (let newc in newres.city) {
            //     if (newres.city[newc].provinceCityId === twostr) {
            //       twopro = newres.city[newc].provinceCityName;
            //     }
            //   }
            //
            // });
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
        // for (let i in this.tableData.data) {
        //   if (this.tableData.data[i].name === '交易团分团审核结果:') {
        //     this.tableData.data[i].name === '';
        //     this.tableData.data[i].type === '';
        //   }
        // }
        this.onebtnData.newdata = JSON.parse(JSON.stringify(this.enterpriseList));
        this.loadingone = false;
      });
    },
    // 关闭企业基本信息审核
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getcompanyInfo();
    },
    // 通过
    btnshow(val) {
      if (val === '通过') {
        this.$confirm('是否审核通过', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let submitOnj = {
            exhibitionSession: this.routeData.exhibitionSession,
            ownId: this.routeData.companyId,
            examineUserId: this.$store.getters.userInfo.userId,
            examineUserCn: this.$store.getters.userInfo.userName,
            examineStatus: '1',
            examineOpinion: "通过",
            examineOrg: this.routeData.delegationId,
            examineOrgCn: this.routeData.delegationName
          };
          this.getQualificationaudit(submitOnj).then(() => {
            this.$message.success('操作成功');
            this.getcompanyInfo();
          }).catch(e => {});
        }).catch(() => {
          this.$message.info('已取消本次操作');
        });
      } else {
        this.reasonForm.examineOpinion = '';
        this.btnDialogVisible = true;
      }
    },
    // 不通过
    handlePassSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          let submitOnj = {
            exhibitionSession: this.routeData.exhibitionSession,
            ownId: this.routeData.companyId,
            examineUserId: this.$store.getters.userInfo.userId,
            examineUserCn: this.$store.getters.userInfo.userName,
            examineStatus: '2',
            examineOpinion: this.reasonForm.examineOpinion,
            examineOrg: this.routeData.delegationId,
            examineOrgCn: this.routeData.delegationName
          };
          this.getQualificationaudit(submitOnj).then(() => {
            //this.$message.success('操作成功');
            this.btnDialogVisible = false;
            this.reasonForm.examineOpinion = '';
            //审核不通过跳转页面
            this.$confirm('审核企业基本材料不通过，请提交相关企业退回展位申请。', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({ path: '/companyBackBoothApply', query: { data: { companyId: submitOnj.ownId }}});
            });
            this.getcompanyInfo();
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          }).catch(e => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
          });
        }
      });
    },
    //关闭海关编码
    addcustomsModal(val) {
      this.dealWithaddCustoms = val;
      this.getcustomDate();

    },
    // 企业展品信息
    getExhibits(searchParams) {
      this.loadtwo = true;
      this.getExhibitsinformation(searchParams).then(res => {
        this.ExhibitsDate = JSON.parse(JSON.stringify(res.records));
        if (res.total > 0) {
          if (this.$route.query.row.subClusterCheckStatus === '-') {
            for (let key in this.ExhibitsDate) {
              this.ExhibitsDate[key].subClusterCheckStatus = '-';
            }
          }
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.loadtwo = false;
      })
      .catch(e => {
        this.loadtwo = false;
      });
    },
    //企业展品批量通过
    selectAll(val) {
      this.NoticeDate = val;
    },
    // 企业展品全选按钮
    isSelectable(row, index) {
      return true;
      // if (this.$store.getters.userInfo.org.deptType === '7') {
      //   // 交易团
      //   if (row.clusterCheckStatus === '未审核') {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // } else if (this.$store.getters.userInfo.org.deptType === '30') {
      //   //交易团分团
      //   if (row.subClusterCheckStatus === '未审核') {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }
    },
    //企业展品批量通过
    allpass() {
      if (this.NoticeDate && this.NoticeDate.length > 0) {
        let tempArry = [];
        for (let key in this.NoticeDate) {
          let temp = {};
          temp.ownId = this.NoticeDate[key].exhibitId;
          temp.examineStatus = '1';
          temp.examineOpinion = '通过';
          temp.examineUserId = this.$store.getters.userInfo.userId;
          temp.examineUserCn = this.$store.getters.userInfo.userName;
          temp.roleJsonStr = this.roleJsonStr;
          tempArry.push(temp);
        }
        this.getAllproduct(tempArry).then((res) => {
          this.getExhibits(this.searchParams);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
      } else {
        this.$message.error('请选择要审核的企业产品!');
      }
    },
     // 企业展品修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      // this.searchParams.companyId = this.$route.query.id;
      // this.searchParams.companyId = 1916800303;
      this.getExhibits(this.searchParams);
    },
    // 企业展品修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      // this.searchParams.companyId = this.$route.query.id;
      // this.searchParams.companyId = 1916800303;
      this.getExhibits(this.searchParams);
    },
     // 企业展品信息通过按钮
    exhibitsEvent(scope, prop, iconItem) {
      let temp = {};
      let _this = this;
      temp.ownId = scope.row.exhibitId;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.examineOrg = scope.row.delegationId;
      temp.examineOrgCn = scope.row.delegationName;
      temp.roleJsonStr = this.roleJsonStr;
      if (iconItem.prop === "pass") {
        temp.examineStatus = "1";
        temp.examineOpinion = "通过";
        this.$confirm("此操作企业产品信息将审核" + temp.examineOpinion + ", 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.getProductcheck(temp).then(res => {
              _this.getExhibits(_this.searchParams);
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      } else if (iconItem.prop === "nopass") {
        temp.examineStatus = "2";
        this.$prompt(
          "此操作将审核不通过并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            temp.examineOpinion = value.value;
            _this.getProductcheck(temp).then(res => {
              _this.getExhibits(_this.searchParams);
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    //展品文字审核
    producttextBtn(val) {
      let temp = {};
      let _this = this;
      temp.ownId = this.$route.query.id;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.examineOrg = this.$store.getters.userInfo.dept.id;
      // temp.examineOrg = this.$store.getters.userInfo.dept.code;
      temp.examineOrgCn = this.$store.getters.userInfo.dept.name;
      temp.roleJsonStr = this.roleJsonStr;
      if (val === "通过") {
        temp.examineStatus = "1";
        temp.examineOpinion = "通过";
        this.$confirm("此操作展品文字将审核" + val + ", 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.getCompanyProductExplain(temp).then(res => {
              // _this.getcustomDate();
              _this.getCompanyresult(this.$route.query.id);
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      } else if (val === "不通过") {
        temp.examineStatus = "2";
        this.$prompt(
          "此操作展品文字将审核不通过并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            temp.examineOpinion = value.value;
            _this.getCompanyProductExplain(temp).then(res => {
              // _this.getcustomDate();
              _this.getCompanyresult(this.$route.query.id);
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    //返回按钮
    enterpriseback() {
      this.$router.push(
        { path: "/businessBrandaudit", query: { currentPage: this.$route.query.currentPage }});
    }
  }
};
</script>
