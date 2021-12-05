/**
 * @file 内部门户首页
 */
<template ref="index">
  <div class="inner-home-page" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="mainbg">
          <div class="mainbox">
            <h2>第{{detailInfo.exhibitsNum}}届广交会</h2>
            <h3>离第{{detailInfo.exhibitsNum}}届广交会开幕还有[{{detailInfo.exhibitorsCard}}]天</h3>
            <h3>离申请展位截止日期还有[{{detailInfo.usedIndicators}}]天</h3>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <el-card class="box-card dele-notice-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><img src="../../../static/img/onlineService/notice 12@2x.png" alt="交易团通知公告图标"></div>
            <div class="home-page-inline-child table-title-title"><span>通知公告</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button type="text">查看更多</el-button></div>
          </div>
          <el-table
            size="mini"
            :data="deleNotice"
            style="width: 100%">
            <el-table-column
              prop="notice"
              label=""
              width="70%">
            </el-table-column>
            <el-table-column
              prop="addresor"
              label=""
              width="15%">
            </el-table-column>
            <el-table-column
              prop="addresorTime"
              label=""
              width="15%">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card booth-apply-and-check-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><i class="iconfont icon-jindu"></i></div>
            <div class="home-page-inline-child table-title-title"><span>组展进度执行</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button title="查看更多" class="el-icon-d-arrow-right" type="text"></el-button></div>
          </div>
          <cust-table :cols="groupExhCols" :data="groupExh"></cust-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card num-arrange-and-booth-arrange-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><i class="iconfont icon-shuliangtongji"></i></div>
            <div class="home-page-inline-child table-title-title"><span>展位安排进度</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button title="查看更多" class="el-icon-d-arrow-right" type="text"></el-button></div>
          </div>
          <cust-table :cols="completionExhCols" :data="completionExh"></cust-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card num-arrange-and-booth-arrange-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><i class="iconfont icon-xiaoxi1"></i></div>
            <div class="home-page-inline-child table-title-title"><span>最新消息</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button title="查看更多" class="el-icon-d-arrow-right" type="text"></el-button></div>
          </div>
          <cust-table :cols="numAndBoothResultCols" :data="numAndBoothResult"></cust-table>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card booth-apply-and-check-container">
          <div class="home-page-inline-parent outer-home-table-title-bar">
            <div class="home-page-inline-child table-title-icon"><i class="iconfont icon-icon-p_mrpjinduzhuizong"></i></div>
            <div class="home-page-inline-child table-title-title"><span>交易团一般性展位等量/不等量调整</span></div>
            <div class="home-page-inline-child table-title-select-btn"><el-button title="查看更多" class="el-icon-d-arrow-right" type="text"></el-button></div>
          </div>
          <cust-table :cols="boothApplyAndCheckCols" :data="boothApplyAndCheck"></cust-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { mapGetters, mapActions } from "vuex";
import $ from "jquery";
import custTable from "@/components/project/onlineService/common/custTable.vue";
export default {
  data() {
    return {
      loading: true,
      api: {
        get: kindo.config.api.expUrl + '/api/exp/exhibitions/current',
        getCount: kindo.config.api.positionArrangeUrl + '/api/ordinaryExchangeIntent/getListAll',
        getNews: kindo.config.api.baseUrl + '/api/sysInmail/Record/getListPage',
        getSpeed: kindo.config.api.positionArrangeUrl + '/api/speciaAreaExternal/finalBrandDivbrand/get',
        getDegree: kindo.config.api.positionArrangeUrl + '/api/speciaAreaExternal/finalDivnewBoothApply/get'
      },
      detailInfo: {
        exhibitsNum: '',
        exhibitorsCard: '',
        usedIndicators: ''
      },
      userType: this.$store.getters.userInfo.org.deptType,
      boothApplyAndCheckCols: [
        {
          prop: 'inExhibitionArea',
          label: '他团换入展位'
        },
        {
          prop: 'outExhibitionArea',
          label: '他团换出展位'
        },
        {
          prop: 'exchangeNumber',
          label: '调换展位数量'
        },
        {
          prop: 'boothType',
          label: '展位类型'
        },
        {
          prop: 'delegationName',
          label: '对方交易团'
        },
        {
          prop: 'remark',
          label: '备注'
        }
      ],
      boothApplyAndCheck: {
        data: []
      },
      numAndBoothResultCols: [
        {
          prop: 'title',
          label: '主题'
        },
        {
          prop: 'receiverName',
          label: '发出机构'
        },
        {
          prop: 'status',
          label: '需回复'
        },
        {
          prop: 'receiveTime',
          label: '发出时间'
        }
        // {
        //   prop: 'receiveTime',
        //   label: '附件'
        // }
      ],
      numAndBoothResult: 
      {
        data: []
      },
      groupExhCols: [
        {
          prop: 'business',
          label: '组展事项'
        },
        {
          prop: 'businessLink',
          label: '子项'
        },
        {
          prop: 'specificBusiness',
          label: '具体业务环节'
        },
        // {
        //   prop: 'bzlx',
        //   label: '计划开始时间'
        // },
        // {
        //   prop: 'apzws',
        //   label: '计划完成时间'
        // },
        {
          prop: 'exhibitionUnit',
          label: '组展单位'
        },
        {
          prop: 'degree',
          label: '完成进度'
        }
      ],
      groupExh: 
      {
        data: []
      },
      completionExhCols: [
        {
          prop: 'businessType',
          label: '展位类型'
        },
        {
          prop: 'businessLink',
          label: '展位总数'
        },
        {
          prop: 'exhibitionUnit',
          label: '数量安排',
          childs: [
            {
              prop: 'business',
              label: '安排进度(%)'
            },
            {
              prop: 'businessLink',
              label: '未安排展位数'
            }]
        },
        {
          prop: 'degree',
          label: '位置安排',
          childs: [
            {
              prop: 'business',
              label: '安排进度(%)'
            },
            {
              prop: 'businessLink',
              label: '未安排展位数'
            }]
        }
      ],
      completionExh: 
      {
        data: []
      }
    };
  },
  components: {
    'cust-table': custTable
  },
  created() {
    this.loading = false;
    // let companyId = String(localStorage.getItem('getComPanyId'));
    // this.getReviewResultInfo(companyId);
    // this.getBoothAndAuditInfo(companyId);
    // this.getNumAndBoothArrangeInfo(companyId);
  },
  mounted() {
    this.switchTheme();
    this.get();
  },
  computed: {
    
  },
  methods: {
    switchTheme() {
      let $el = $(this.$el);
      let $left = $el.find(".mainbg");
      $left.css("background", "url(/static/img/" + kindo.config.theme + "/banner.jpg) no-repeat");
      $left.css("background-size", "cover");
    },
    get() {
      this.$http.get(this.api.get).then(res => {
        let datetime = 0;
        if (res.periods[0].curtainTime) {
          let timecur = this.getdate(res.periods[0].curtainTime);
          if (timecur > 0) {
            datetime = timecur;
          }
        }
        this.detailInfo.exhibitsNum = res.exhibitionNum;
        this.detailInfo.exhibitorsCard = datetime;
        this.detailInfo.usedIndicators = '28';
      });
      this.getNews(); // 最新消息
      this.getSpeed(); // 组展进度执行
      this.getDegree(); // 展位安排进度
      this.getCount(); // 交易团一般性展位等量
    },
    getCount() {
      let params = {
        size: 10,
        delegationId: this.userType
      };
      this.$http.get(this.api.getCount, params).then(res => {
        let recordList = [];
        res.records.map(item => {
          if (item.boothType === "1") {
            item.boothType = "一般性展位";
          } else {
            item.boothType = "中央通道展位";
          }
          recordList.push(item);
        });
        this.boothApplyAndCheck.data = recordList;
      });
    },
    getNews() {
      this.$http.get(this.api.getNews).then(res => {
        this.numAndBoothResult.data = res.records;
      });
    },
    getSpeed() {
      let params = {
        delegationCode: this.userType
      };
      this.$http.get(this.api.getSpeed, params).then(res => {
        let data = [];
        if (res.degree) {
          res.degree = res.degree * 100;
        }
        data.push(res);
        this.groupExh.data = data;
      });
    },
    getDegree() {
      // let params = {
      //   delegationCode: this.userType
      // };
      // this.$http.get(this.api.getDegree, params).then(res => {
      //   let data = [];
      //   res.degree = res.degree * 100;
      //   data.push(res);
      //   this.completionExh.data = data;
      // });
    },
    getdate(time) {
      let olddate = time;  //开始时间
      let nowdate = new Date();    //当前时间
      let curtime = new Date(olddate).getTime() - nowdate.getTime();   //时间差的毫秒数
      //计算出相差天数
      return Math.floor(curtime / (24 * 3600 * 1000));
    }
  }
};
</script>
<style scoped>
  .mainbg {
    width: 100%;
    height: 210px;
    margin-top: 10px;
    background-color: #0340F3;
    position: relative;
  }
  .mainbox {
    position: absolute;
    color: #ededed;
    top: 32px;
    left: 235px;
  }
  .mainbox h2{
    font-size: 40px;
    margin: 10px 0;
  }
  .iconfont {
    font-size: 24px;
  }
  .el-button{
    padding: 0px;
  }
  .inner-home-page {
    padding: 0 15px;
    background-color: #ededed;
  }
  .inner-home-page >>> .el-table__body {
    width: 100%!important;
  }
  .inner-home-page img {
    cursor: pointer;
  }
  .inner-home-page >>> .el-card {
    margin: 10px 0;
    height: 360px;
    overflow-y: scroll;
  }
  .dele-notice-container >>> .el-table__header-wrapper {
    display: none;
  }
  .home-page-inline-parent {
    display: table;
    padding-bottom: 10px;
  }
  .home-page-inline-child {
    display: table-cell;
    vertical-align: middle;
  }
  .outer-home-table-title-bar {
    width: 100%;
  }
  .table-title-icon {
    width: 10px;
    padding-right: 10px;
    color: #2b579a;
  }
  .table-title-select-btn {
    text-align: right;
  }
</style>
