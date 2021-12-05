/**
 * @file 工作部管理VIP企业统计报表
 */
<style scoped>
  .intera-manage-btn-container {
    display: table;
    padding: 10px 20px;
    width: 100%;
  }
  .btn-bar {
    display: table-cell;
    text-align: left;
    vertical-align: middle;
  }
  .download-btn {
    color: #fff;
    outline: none;
    border: 0;
  }
  .page-bar {
    display: table-cell;
    vertical-align: middle;
  }
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name">
      <search-param-link :searchParamsForm="item.searchParamsForm.data"
        :variate="item.searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams">
      </search-param-link>
      <cust-table :cols="item.cols"
        :data="item.data">
      </cust-table>
      <div class="intera-manage-btn-container">
        <div class="btn-bar">
          <el-button v-if="activeName === '0'" type="primary" class="download-btn" @click="download">下载</el-button>
        </div>
        <pagination
          class="page-bar"
          :pageInfo="item.pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange">
        </pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import custTable from "@/components/project/onlineService/common/custTable.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    'cust-table': custTable,
    'pagination': pagination,
    'search-param-link': searchParamLinkage
  },
  data() {
    return {
      activeName: '0',
      tabList: [
        {
          "name": "0",
          "label": "活动申请表",
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "companyName",
            data: [
              {
                "prop": "companyName",
                "label": "企业名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "contactPerson",
                "label": "联系人",
                "value": "",
                "type": "input"
              },
              {
                "prop": "activityName",
                "label": "活动名称",
                "value": "",
                "type": "input"
              }
            ]
          },
          "searchParams": {
            "orderModelField": [
              {
                "orderByField": "",
                "asc": false
              }
            ],
            "customQueryParams": [
              {
                "name": "companyName",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "contactPerson",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "activityName",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              }
            ],
            "pageIndex": 1,
            "pageSize": 10
          },
          "cols": [
            {
              "prop": "companyName",
              "label": "VIP企业名称"
            },
            {
              "prop": "contactPerson",
              "label": "VIP业务联系人"
            },
            {
              "prop": "activityName",
              "label": "活动名称"
            },
            {
              "prop": "activityPlace",
              "label": "活动地点"
            },
            {
              "prop": "registerTime",
              "label": "活动时间"
            },
            {
              "prop": "registerPerson",
              "label": "报名人员"
            },
            {
              "prop": "gender",
              "label": "性别"
            },
            {
              "prop": "identifyNum",
              "label": "身份证证件号"
            },
            {
              "prop": "phone",
              "label": "联系电话"
            }
          ],
          "data": {
            "data": [
              {
                "companyName": "广东萌果科技有限公司",
                "contactPerson": "张雪",
                "activityName": "商协会贸易交流活动",
                "activityPlace": "广州市琶洲国际会展中心",
                "registerTime": "2018/12/19",
                "registerPerson": "市场部经理",
                "gender": "男",
                "identifyNum": "347418455414741512",
                "phone": "17812419234"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0,
            "style": "padding: 10px 0;text-align: right;"
          }
        },
        {
          "name": "1",
          "label": "历届VIP企业基本信息",
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "companyName",
            data: [
              {
                "prop": "companyName",
                "label": "企业名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "exhibitionArea",
                "label": "展区",
                "value": "",
                "type": "select"
              },
              {
                "prop": "session",
                "label": "届数",
                "value": "",
                "type": "select"
              },
              {
                "prop": "businessAssociation",
                "label": "商协会",
                "value": "",
                "type": "select"
              },
              {
                "prop": "businessDelegation",
                "label": "交易团",
                "value": "",
                "type": "select"
              }
            ]
          },
          "searchParams": {
            "orderModelField": [
              {
                "orderByField": "",
                "asc": false
              }
            ],
            "customQueryParams": [
              {
                "name": "companyName",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "exhibitionArea",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "businessAssociation",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "businessDelegation",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              }
            ],
            "pageIndex": 1,
            "pageSize": 10
          },
          "cols": [
            {
              "prop": "session",
              "label": "届数"
            },
            {
              "prop": "businessAssociation",
              "label": "商协会"
            },
            {
              "prop": "businessDelegation",
              "label": "交易团"
            },
            {
              "prop": "companyName",
              "label": "VIP企业名称"
            },
            {
              "prop": "exhibitionArea",
              "label": "展区"
            },
            {
              "prop": "boothNo",
              "label": "展位号"
            },
            {
              "prop": "cantonCode",
              "label": "广交会企业编码"
            },
            {
              "prop": "contactAddress",
              "label": "联系地址"
            },
            {
              "prop": "contactPerson",
              "label": "VIP业务联系人"
            },
            {
              "prop": "post",
              "label": "职务"
            },
            {
              "prop": "tel",
              "label": "联系电话"
            },
            {
              "prop": "phone",
              "label": "手机"
            },
            {
              "prop": "email",
              "label": "E-mail"
            },
            {
              "prop": "recommendSource",
              "label": "推荐来源"
            }
          ],
          "data": {
            "data": [
              {
                "session": "2",
                "phase": "1",
                "businessAssociation": "日用品协会",
                "businessDelegation": "广东省东莞市",
                "companyName": "广东萌果科技有限公司",
                "exhibitionArea": "C区",
                "boothNo": "C231",
                "cantonCode": "328723",
                "contactAddress": "广东省广州市海珠区琶洲商业广场",
                "contactPerson": "张雪",
                "post": "市场部经理",
                "tel": "021-838713",
                "phone": "178****9234",
                "email": "1738689234@163.com",
                "recommendSource": "品牌展位数达到标准"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0,
            "style": "text-align: center;"
          }
        },
        {
          "name": "2",
          "label": "办证数量统计",
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "activityName",
            data: [
              {
                "prop": "companyName",
                "label": "企业名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "businessAssociation",
                "label": "商协会",
                "value": "",
                "type": "select"
              },
              {
                "prop": "businessDelegation",
                "label": "交易团",
                "value": "",
                "type": "select"
              }
            ]
          },
          "searchParams": {
            "orderModelField": [
              {
                "orderByField": "",
                "asc": false
              }
            ],
            "customQueryParams": [
              {
                "name": "companyName",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "businessAssociation",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "businessDelegation",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              }
            ],
            "pageIndex": 1,
            "pageSize": 10
          },
          "cols": [
            {
              "prop": "session",
              "label": "届数"
            },
            {
              "prop": "businessAssociation",
              "label": "商协会"
            },
            {
              "prop": "businessDelegation",
              "label": "交易团"
            },
            {
              "prop": "companyName",
              "label": "VIP企业名称"
            },
            {
              "prop": "identifyType",
              "label": "证件类型"
            },
            {
              "prop": "bzsl",
              "label": "办证数量"
            },
            {
              "prop": "bzryxm",
              "label": "办证人员姓名"
            }
          ],
          "data": {
            "data": [
              {
                "session": "124",
                "businessAssociation": "日用品协会",
                "businessDelegation": "广东省东莞市",
                "companyName": "广东萌果科技有限公司",
                "identifyType": "342584199714154171",
                "bzsl": "5",
                "bzryxm": "张雪"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0,
            "style": "text-align: center;"
          }
        },
        {
          "name": "3",
          "label": "服务使用情况",
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "session",
            data: [
              {
                "prop": "session",
                "label": "届数",
                "value": "",
                "type": "input"
              }
            ]
          },
          "searchParams": {
            "orderModelField": [
              {
                "orderByField": "",
                "asc": false
              }
            ],
            "customQueryParams": [
              {
                "name": "session",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              }
            ],
            "pageIndex": 1,
            "pageSize": 10
          },
          "cols": [
            {
              "prop": "session",
              "label": "届数"
            },
            {
              "prop": "exhibitionCert",
              "label": "筹展证"
            },
            {
              "prop": "rebackExhibitionCert",
              "label": "撤展证"
            },
            {
              "prop": "receptionCert",
              "label": "接待证"
            },
            {
              "prop": "parkingCert",
              "label": "停车证"
            },
            {
              "prop": "hysq",
              "label": "会议申请"
            },
            {
              "prop": "cgstj",
              "label": "采购商推荐"
            },
            {
              "prop": "hdlt",
              "label": "活动论坛"
            },
            {
              "prop": "dcwj",
              "label": "调查问卷"
            },
            {
              "prop": "znxx",
              "label": "站内消息"
            },
            {
              "prop": "qysysltj",
              "label": "VIP企业使用数量统计"
            }
          ],
          "data": {
            "data": [
              {
                "session": "115",
                "exhibitionCert": "11",
                "rebackExhibitionCert": "25",
                "receptionCert": "55",
                "parkingCert": "21",
                "hysq": "11",
                "cgstj": "521",
                "hdlt": "1",
                "dcwj": "1",
                "znxx": "2",
                "qysysltj": "3"
              }
            ]
          },
          "pageInfo": {
            "currentPage": 1,
            "pageSize": 10,
            "total": 0,
            "style": "text-align: center;"
          }
        }
      ],
      // 字典数据
      dictionary: {
        // 企业名称
        companyName: [
          {
            "label": "企业1",
            "code": "01",
            "value": "01"
          },
          {
            "label": "企业2",
            "code": "02",
            "value": "02"
          },
          {
            "label": "企业3",
            "code": "03",
            "value": "03"
          },
          {
            "label": "企业4",
            "code": "04",
            "value": "04"
          },
          {
            "label": "企业5",
            "code": "05",
            "value": "05"
          }
        ],
        // 企业编码
        companyId: [
          {
            "label": "企业编码1",
            "code": "01",
            "value": "01",
            "exhibitionArea": "01"
          },
          {
            "label": "企业编码2",
            "code": "02",
            "value": "02",
            "exhibitionArea": "01"
          },
          {
            "label": "企业编码3",
            "code": "03",
            "value": "03",
            "exhibitionArea": "02"
          },
          {
            "label": "企业编码4",
            "code": "04",
            "value": "04",
            "exhibitionArea": "02"
          },
          {
            "label": "企业编码5",
            "code": "05",
            "value": "05",
            "exhibitionArea": "01"
          }
        ]
      }
    };
  },
  mounted() {
    this.getSessionInfo().then(res => {
      this.tabList.forEach((value, index, array) => {
        value.searchParams.customQueryParams.forEach((paraValue, paraIndex, paraArray) => {
          if (index !== 1) {
            paraValue.session = res.session;
          }
        });
      });
      // this.selectVIPEnterList(this.searchParams).then(response => {
      //   this.pageInfo.total = response.total;
      // });
    });
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('generateVIP', ['vipCompanyInfoList']),
    data() {
      return {
        data: this.vipCompanyInfoList,
        selection: true
      };
    }
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['selectVIPEnterList']),
    ...mapActions('reviewVipEnterList', ['reviewVipEnterInfo']),
    // 重置分页信息
    initPageInfo(index) {
    },
    // 重置查询分页参数
    initSearchParamsPageInfo(index) {
    },
    // 查询
    selectParams() {
      let _this = this;
      let tabIndex = parseInt(this.activeName);
      this.tabList[tabIndex].searchParams.pageIndex = 1;
      this.tabList[tabIndex].searchParams.pageSize = 10;
      this.tabList[tabIndex].pageInfo.currentPage = 1;
      this.tabList[tabIndex].pageInfo.pageSize = 10;
      this.tabList[tabIndex].searchParams.customQueryParams.forEach((value, index, array) => {
        _this.tabList[tabIndex].searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
          if (value.name === formVal.prop && formVal.value !== '') {
            value.values[0] = formVal.value;
          }
          if (value.name === formVal.prop && formVal.value === '') {
            value.values = [];
          }
          if (value.name === formVal.prop && formVal.type === 'input' && value.values.length !== 0) {
            value.findType = 'LIKE';
          }
          if (value.values.length === 0) {
            value.findType = 'IS_NOT_NULL';
          }
          if (value.name === formVal.prop && formVal.type === 'select' && value.values.length !== 0) {
            value.findType = 'EQ';
          }
        });
      });
      if (tabIndex === 1) {
        this.selectVIPEnterList(this.tabList[tabIndex].searchParams).then(res => {
          this.tabList[tabIndex].data.data = res.records;
          this.tabList[tabIndex].pageInfo.total = res.total;
        });
      }
    },
    handleDataChange(index) {

    },
    handleSizeChange(val) {
      if (this.activeName === '1') {
        this.tabList[1].pageInfo.pageSize = val;
        this.tabList[1].searchParams.pageSize = val;
        this.selectVIPEnterList(this.tabList[1].searchParams).then(res => {
          this.tabList[1].data.data = res.records;
          this.tabList[1].pageInfo.total = res.total;
        });
      }
    },
    handleCurrentChange(val) {
      if (this.activeName === '1') {
        this.tabList[1].pageInfo.currentPage = val;
        this.tabList[1].searchParams.pageIndex = val;
        this.selectVIPEnterList(this.tabList[1].searchParams).then(res => {
          this.tabList[1].data.data = res.records;
          this.tabList[1].pageInfo.total = res.total;
        });
      }
    },
    // 下载
    download() {},
    handleClick(tab, event) {
      if (this.activeName === '1') {
        this.selectVIPEnterList(this.tabList[1].searchParams).then(res => {
          this.tabList[1].data.data = res.records;
          this.tabList[1].pageInfo.total = res.total;
        });
      }
    }
  }
};
</script>



