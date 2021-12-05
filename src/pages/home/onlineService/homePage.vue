/**
 * @file 网上服务首页
 */
<style scoped>
  .outer-home-page {
    padding: 0 15px;
    background-color: #ededed;
  }
  .outer-home-page >>> .el-table .readed-row {
    color: #b0b0b0;
  }
  .outer-home-page >>> .el-table__body {
    width: 100%!important;
  }
  .outer-home-page img {
    cursor: pointer;
  }
  .outer-home-page >>> .el-card {
    margin: 10px 0;
    height: 360px;
    overflow: scroll;
  }
  .box-card-overflow-x >>> .el-card__body {
    min-width: 500px;
  }
  .dele-notice-container >>> .el-table__header-wrapper {
    display: none;
  }
  .inline-child-list-style {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 3px;
    height: 3px;
    border: 1px solid #000;
    border-radius: 50%;
    background-color: #000;
  }
  .home-page-inline-parent {
    display: table;
    padding-bottom: 10px;
  }
  .home-page-inline-child {
    display: table-cell;
    vertical-align: middle;
  }
  .company-index-container {
    margin-top: 20px;
    color: #7e89a3;
  }
  .identifi-indicator-check {
    margin-top: 10px;
    text-decoration: underline;
    color: #d80c18;
    cursor: pointer;
  }
  .identifi-indicator-check:hover {
    color: #ff5059;
  }
  .dele-audit-doc-status {
    margin: 25px 0;
  }
  .dele-audit-doc-status-img {
    padding-right: 10px;
  }
  .outer-page-login-time {
    margin-top: 20px;
  }
  .dele-audit-doc-status-text {
    font-weight: bold;
  }
  .booth-apply-flow {
    margin-bottom: 20px;
  }
  .booth-apply-flow-text {
    padding-left: 10px;
    font-weight: bold;
  }
  .home-page-booth-apply-step-container {
    display: table;
    vertical-align: middle;
    margin-bottom: 25px;
    color: #fff;
  }
  .home-page-booth-apply-step {
    /* display: -webkit-inline-box;
    display: -ms-inline-flexbox; */
    display: table-cell;
    width: 2%;
    padding: 35px 12px;
    text-align: center;
    vertical-align: middle;
    height: 90px;
    background: linear-gradient(to bottom, #fd1948, #ff7569);
    border-radius: 7px;
    box-shadow: 1px 2px 4px #fda0a1;
  }
  .home-page-booth-apply-step-img {
    display: table-cell;
    width: 0.5%;
    text-align: center;
    vertical-align: middle;
    padding: 0 10px;
  }
  .home-page-booth-apply-step-container-item {
    display: inline-block;
  }
  .outer-home-table-title-bar {
    width: 100%;
  }
  .table-title-icon {
    width: 10px;
    padding-right: 10px;
  }
  .table-title-select-btn {
    text-align: right;
  }
  .continue-booth-apply-btn {
    padding: 0 20px;
    border-radius: 7px;
    box-shadow: 1px 2px 4px #ccc;
    height: 35px;
    background-color: #ffcdcf;
    color: #ee0021;
    border: 0;
  }
  .join-cf-award {
    padding: 0 20px;
    border-radius: 7px;
    box-shadow: 1px 2px 4px #ccc;
    height: 35px;
    float: right;
    background-color: #fbe3c5;
    color: #ff8400;
    border: 0;
  }
  .invite-customs {
    padding: 0 20px;
    border-radius: 7px;
    box-shadow: 1px 2px 4px #ccc;
    height: 35px;
    float: right;
    background-color: #fbe3c5;
    color: #ff8400;
    border: 0;
  }
</style>
<template>
  <div class="outer-home-page" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card box-card-overflow-x" style="overflow-x: scroll;">
          <div class="home-page-inline-parent booth-apply-flow">
            <div class="home-page-inline-child"><img src="../../../../static/img/onlineService/flow 5@2x.png" alt="展位申请流程图标"></div>
            <div class="home-page-inline-child booth-apply-flow-text"><span>展位申请流程</span></div>
          </div>
          <div class="home-page-booth-apply-step-container">
            <template class="home-page-booth-apply-step-container-item" v-for="(item, index) in boothAppliProcess" >
              <div :key="index" class="home-page-booth-apply-step" :style="{ 'width': item.width + 'px', 'min-width': item.minWidth + 'px' }">{{ item.text }}</div>
              <div :key="'key' + index" v-if="boothAppliProcess.length && index !== (boothAppliProcess.length - 1)" class="home-page-booth-apply-step-img"><img src="../../../../static/img/onlineService/next 7@2x.png" alt="展位申请流程图标"></div>
            </template>
          </div>
          <div>
            <el-button class="continue-booth-apply-btn" @click="turnToPage('/brand_applicat_list')">
              <div class="home-page-inline-parent" style="padding-bottom: 0;">
                <div class="home-page-inline-child" style="padding-right: 5px;"><span>继续我的展位申请</span></div>
                <div class="home-page-inline-child"><img src="../../../../static/img/onlineService/boult 8@2x.png" alt="继续我的展位申请图标"></div>
              </div>
            </el-button>
            <el-button class="invite-customs">
              <div class="home-page-inline-parent" style="padding-bottom: 0;">
                <div class="home-page-inline-child" style="padding-right: 5px;"><span>我要邀请客户</span></div>
                <div class="home-page-inline-child"><img src="../../../../static/img/onlineService/user 9@2x.png" alt="继续我的展位申请图标"></div>
              </div>
            </el-button>
            <el-button class="join-cf-award">
              <div class="home-page-inline-parent" style="padding-bottom: 0;">
                <div class="home-page-inline-child" style="padding-right: 5px;"><span>我要参加CF奖</span></div>
                <div class="home-page-inline-child"><img src="../../../../static/img/onlineService/plate 10@2x.png" alt="继续我的展位申请图标"></div>
              </div>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card box-card-overflow-x">
          <div>
            <div class="home-page-inline-parent">
              <div class="home-page-inline-child"><div class="inline-child-list-style"></div><span>我的企业：</span></div>
              <div class="home-page-inline-child"><el-button type="text" @click="turnToPage('/basEntInf')">更新</el-button></div>
              <div class="home-page-inline-child"><img src="../../../../static/img/onlineService/refresh @2x.png" @click="turnToPage('/basEntInf')" alt="更新图标"></div>
            </div>
            <div class="home-page-inline-parent">
              <div class="home-page-inline-child"><div class="inline-child-list-style"></div><span>我的展品：您已添加了{{ detailInfo.exhibitsNum }}个展品</span></div>
              <div class="home-page-inline-child"><el-button type="text" @click="turnToPage('/enterExManagement')">添加</el-button></div>
              <div class="home-page-inline-child"><img src="../../../../static/img/onlineService/add @2x.png" alt="添加图标" @click="turnToPage('/enterExManagement')"></div>
            </div>
            <div class="home-page-inline-parent">
              <div class="home-page-inline-child">
                <div class="inline-child-list-style"></div>
                <span>我的证件：参展商证指标</span>
                <span>{{ detailInfo.exhibitorsCard }}，</span>
                <span>已用</span>
                <span>{{ detailInfo.usedIndicators }}，</span>
                <span>详情请点击</span>
                <span class="identifi-indicator-check">证件申请进度查询</span>
              </div>
              <!-- <div class="home-page-inline-child"><el-button type="text" @click="turnToPage('/enterExManagement')">添加</el-button></div>
              <div class="home-page-inline-child"><img src="../../../static/img/onlineService/add @2x.png" alt="添加图标" @click="turnToPage('/enterExManagement')"></div> -->
            </div>
          </div>
          <!-- <div class="company-index-container">
            <span>我的参展商证指标为</span>
            <span>{{ detailInfo.exhibitorsCard }}，</span>
            <span>已用</span>
            <span>{{ detailInfo.usedIndicators }}，</span>
            <span>详情请点击</span>
          </div> -->
          <!-- <div class="identifi-indicator-check">证件申请进度查询</div> -->
          <div class="home-page-inline-parent dele-audit-doc-status">
            <div class="home-page-inline-child dele-audit-doc-status-img"><img src="../../../../static/img/onlineService/group 11@2x.png" alt="交易团审核企业资料状态图标"></div>
            <div class="home-page-inline-child dele-audit-doc-status-text"><span>交易团审核企业资料状态</span></div>
          </div>
          <el-table
            border
            :header-cell-style="{ background: '#ecf0f6' }"
            :data="detailInfo.deleCheckStatus"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="reviewResult"
              label="审核状态">
            </el-table-column>
            <el-table-column
              prop="approveExplain"
              label="审核情况说明">
            </el-table-column>
          </el-table>
          <div class="outer-page-login-time"><span>您上次登录时间是：</span><span>{{ detailInfo.loginTime }}</span></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card dele-notice-container box-card-overflow-x">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><img src="../../../../static/img/onlineService/notice 12@2x.png" alt="交易团通知公告图标"></div>
            <div class="home-page-inline-child table-title-title"><span>通知公告</span></div>
            <!-- <div class="home-page-inline-child table-title-select-btn"><el-button type="text" @click="selectMoreNotice">查看更多</el-button></div> -->
          </div>
          <el-table
            size="mini"
            :data="deleNotice"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="notice"
              label="">
              <!-- width="70%" -->
              <template slot-scope="scope">
                <a v-if="scope.row.downLoadFile" style="color: #d80c18;cursor: pointer;" @click="downLoadFile(scope.row)">{{scope.row.notice}}</a>
                 <!-- :href="loadLoadUrl + scope.row.notice" -->
                <div v-else>{{scope.row.notice}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="addresor"
              label=""
              width="10%">
            </el-table-column>
            <el-table-column
              prop="addresorTime"
              label=""
              width="20%">
            </el-table-column> -->
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card booth-apply-and-check-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><img src="../../../../static/img/onlineService/plan 13@2x.png" alt="展位申请、审核图标"></div>
            <div class="home-page-inline-child table-title-title"><span>展位申请、审核</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button type="text" @click="turnToPage('/brand_applicat_list')">查看更多</el-button></div>
          </div>
          <cust-table class="add-vip-enterprise-list" :cols="boothApplyAndCheckCols" :data="boothApplyAndCheck"></cust-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card num-arrange-and-booth-arrange-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><img src="../../../../static/img/onlineService/result 15@2x.png" alt="数量安排、展位安排结果图标"></div>
            <div class="home-page-inline-child table-title-title"><span>数量安排、展位安排结果</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button type="text" @click="turnToPage('/boothConfirmRegister')">查看更多</el-button></div>
          </div>
          <cust-table class="add-vip-enterprise-list" :cols="numAndBoothResultCols" :data="numAndBoothResult"></cust-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { $date, $helper } from "@/scripts/project/utils";
import custTable from "@/components/project/onlineService/common/custTable.vue";
export default {
  data() {
    return {
      loading: true,
      // 下载接口
      loadLoadUrl: process.env.API_OS_URL + '/efOS/file/downloadFile?fileId=',
      // 字典--展位性质
      boothType: [],
      // 字典--布展类型
      exhibitionType: [],
      loginTime: '',
      detailInfo: {
        exhibitsNum: '0',
        exhibitorsCard: '0',
        usedIndicators: '0',
        deleCheckStatus: [],
        loginTime: ''
      },
      boothAppliProcess: [
        {
          text: '填报展位申请信息',
          step: '1'
        },
        {
          text: '填报企业信息，如联营参展请登记联营企业',
          step: '2'
        },
        {
          text: '填报展品信息',
          step: '3'
        },
        {
          text: '打印展位申请表，加盖公章后报送所属交易团',
          step: '4'
        },
        {
          text: '交易团审核后分配展位',
          step: '5'
        },
        {
          text: '填报展位负责人，如有联营企业进行确认，并打印《展位使用责任书》加盖公章后报送所属交易团',
          step: '6'
        }
        // {
        //   text: '填报展区、展位数量，提交展位申请',
        //   step: '1',
        //   width: '75'
        // },
        // {
        //   text: '确认、补充公司及展品信息',
        //   step: '2',
        //   width: '75'
        // },
        // {
        //   text: '如联营参展，登记联营企业',
        //   step: '3',
        //   width: '75'
        // },
        // {
        //   text: '打印《展位申请表》，加盖公章后交易团备案，等待审核',
        //   step: '4',
        //   width: '85'
        // },
        // {
        //   text: '交易团审核后分配展位',
        //   step: '5',
        //   width: '70'
        // },
        // {
        //   text: '填报展位负责人，如有联营企业进行确认，并打印《展位使用责任书》加盖公章后交易团备案，等待审核',
        //   step: '6',
        //   minWidth: '150'
        // }
      ],
      deleNotice: [
        {
          sequenceNum: '1',
          notice: '广交会品牌展位企业申请表',
          readStatus: '1',
          downLoadFile: true,
          fileId: 'notes/广交会品牌展位企业申请表.rar',
          type: 'download'
        },
        {
          sequenceNum: '2',
          notice: '关于第126届中国进出口商品交易会出口展展位申请事宜的通告',
          readStatus: '1',
          downLoadFile: true,
          fileId: 'notes/第126届中国进出口商品交易会出口展展位申请事宜通告.docx',
          href: 'http://www.cantonfair.org.cn/html/cantonfair/cn/info/2016-05/39459.shtml',
          type: 'turnToPage'
        },
        {
          sequenceNum: '3',
          notice: '广交会出口展参展易捷通网上服务平台用户操作指南',
          readStatus: '1',
          downLoadFile: true,
          fileId: 'notes/ExhibitorSystem V001R001C01 广交会出口展参展易捷通网上服务平台用户操作指南.doc',
          type: 'download'
        },
        {
          sequenceNum: '4',
          notice: '广交会出口展参展易捷通网上服务平台 FAQ',
          readStatus: '1',
          downLoadFile: true,
          fileId: 'notes/ExhibitorSystem V001R001C01 广交会出口展参展易捷通网上服务平台 FAQ.docx',
          type: 'download'
        }
        // {
        //   sequenceNum: '1',
        //   notice: '交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页',
        //   addresor: '交易团',
        //   addresorTime: '2019/02/28 18:20:09',
        //   readStatus: '0'
        // },
        // {
        //   sequenceNum: '1',
        //   notice: '交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页',
        //   addresor: '交易团',
        //   addresorTime: '2019/02/28 18:20:09',
        //   readStatus: '0'
        // },
        // {
        //   sequenceNum: '1',
        //   notice: '交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页',
        //   addresor: '交易团',
        //   addresorTime: '2019/02/28 18:20:09',
        //   readStatus: '0'
        // },
        // {
        //   sequenceNum: '1',
        //   notice: '交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页',
        //   addresor: '交易团',
        //   addresorTime: '2019/02/28 18:20:09',
        //   readStatus: '0'
        // },
        // {
        //   sequenceNum: '1',
        //   notice: '交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页，交易团参展企业新规即将上线，请关注首页',
        //   addresor: '交易团',
        //   addresorTime: '2019/02/28 18:20:09',
        //   readStatus: '0'
        // }
      ],
      boothApplyAndCheckCols: [
        {
          prop: 'exhibitionAreaName',
          label: '展区'
        },
        {
          prop: 'boothType',
          label: '展位性质'
        },
        {
          prop: 'exhibitionType',
          label: '布展类型'
        },
        {
          prop: 'boothNumber',
          label: '申请数量'
        },
        {
          prop: 'boothAcreage',
          label: '申请面积'
        },
        {
          prop: 'unionExamineStatus',
          label: '联营企业（审核状态）',
          width: '150',
          containMultiLine: true
        },
        {
          prop: 'checkExamineStatus',
          label: '展位申请审核状态',
          width: '140'
        }
      ],
      boothApplyAndCheck: {
        data: []
      },
      numAndBoothResultCols: [
        {
          prop: 'exhibitionPeriod',
          label: '期数'
        },
        {
          prop: 'exhibitionAreaName',
          label: '展区'
        },
        {
          prop: 'boothType',
          label: '展位性质'
        },
        {
          prop: 'exhibitionType',
          label: '布展类型'
        },
        {
          prop: 'scheduleBoothNumber',
          label: '安排展位数'
        },
        {
          prop: 'boothAcreage',
          label: '面积'
        },
        {
          prop: 'zwh',
          label: '展位号'
        }
      ],
      numAndBoothResult:
      {
        data: []
      }
    };
  },
  components: {
    'cust-table': custTable
  },
  async beforeCreate () {
    this.boothType = await kindo.dictionary.get('booth_Type'); // 字典--展位性质
    this.exhibitionType = await kindo.dictionary.get('exhibitionType'); // 字典--布展类型
  },
  created() {
    this.detailInfo.loginTime = $date.format(new Date(this.$store.state.userInfo.data.loginTime));
    this.loading = false;
    let companyId = this.$store.state.userInfo.companyId;
    this.getReviewResultInfo(companyId).then(res => {
      this.detailInfo.deleCheckStatus.push(res);
    });
    this.getBoothAndAuditInfo(companyId);
    this.getNumAndBoothArrangeInfo(companyId);
    this.getExhibitStatusInfo(this.$store.state.userInfo.companyId);
  },
  filters: {
    toAuditStatus: function(status) {
      switch (status) {
        case '0' || 0:
          return '不通过';
        case '1' || 1:
          return '通过';
        default:
          return '可审核';
      }
    }
  },
  computed: {
    ...mapGetters('onlineServiceHomePage', ['reviewResults', 'boothApplyAndAuditData', 'numAndBoothRangeData']),
    ...mapGetters('enterExManagement', ['getStatus'])
  },
  methods: {
    ...mapActions('onlineServiceHomePage', ['getReviewResultInfo', 'getBoothAndAuditInfo', 'getNumAndBoothArrangeInfo']),
    ...mapActions('enterExManagement', ['getExhibitStatusInfo']),
    // 跳转页面
    turnToPage(path) {
      this.$router.push({
        path: path
      });
    },
    // 通知公告根据已读未读状态给予不同颜色标注
    tableRowClassName({ row, rowIndex }) {
      if (row.readStatus === '0') {
        return 'readed-row';
      }
    },
    // 下载通知公告信息
    downLoadFile(row) {
      if (row.type === 'download') {
        this.$confirm('确认下载？')
        .then(_ => {
          window.open(this.loadLoadUrl + row.fileId);
        })
        .catch(_ => {});
      } else if (row.type === 'turnToPage') {
        window.open(row.href);
      }

    }
    // 查看更多通知公告
    // selectMoreNotice() {
    //   window.open('http://www.cantonfair.org.cn/cn/info/list.aspx?ModuleID=25', '_blank');
    // }
  },
  watch: {
    boothApplyAndAuditData(val) {
      // 修改人：李康 修改了这个方法的部分逻辑 如下：0504
      // 品牌展位布展类型应默认显示为：
      // 大型机械及设备展区：统一布展 MA02
      // 其他展区：特装
      let _this = this;
      _this.boothApplyAndCheck.data = JSON.parse(JSON.stringify(val));
      if (_this.boothApplyAndCheck.data.length > 0) {
        _this.boothApplyAndCheck.data.forEach((value) => {
          value.boothType = value.boothType ? $helper.getDictLabel(_this.boothType, value.boothType) : '';
          value.exhibitionType = value.exhibitionType ? $helper.getDictLabel(_this.exhibitionType, value.exhibitionType) : (value.exhibitionAreaCode === "MA02" ? "统一布展" : "绿色特装");
          // value.exhibitionType = value.exhibitionType ? $helper.getDictLabel(_this.exhibitionType, value.exhibitionType) : '';
        });
      }
    },
    numAndBoothRangeData(val) {
      let _this = this;
      _this.numAndBoothResult.data = JSON.parse(JSON.stringify(val));
      if (_this.numAndBoothResult.data.length > 0) {
        _this.numAndBoothResult.data.forEach((value) => {
          value.boothType = value.boothType ? $helper.getDictLabel(_this.boothType, value.boothType) : '';
          value.exhibitionType = value.exhibitionType ? $helper.getDictLabel(_this.exhibitionType, value.exhibitionType) : '';
        });
      }
    },
    getStatus(val) {
      this.detailInfo.exhibitsNum = val.totalNum;
    }
  }
};
</script>



