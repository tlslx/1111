/**
 * @file 工作部管理VIP企业
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
          "label": "企业基本信息",
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
                "prop": "companyId",
                "label": "企业编码",
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
                "name": "companyId",
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
              "label": "企业名称"
            },
            {
              "prop": "cantonCode",
              "label": "广交会企业编码"
            },
            {
              "prop": "businessContactsCh",
              "label": "业务联系人"
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
              "prop": "contactAddress",
              "label": "联系地址"
            },
            {
              "prop": "phase",
              "label": "期数"
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
              "prop": "businessAssociation",
              "label": "商协会"
            },
            {
              "prop": "businessDelegation",
              "label": "交易团"
            },
            {
              "prop": "zxqk",
              "label": "甄选情况"
            }

          ],
          "data": {
            "data": [
              {
                "companyName": "广东萌果科技有限公司",
                "cantonCode": "328723",
                "businessContactsCh": "张雪",
                "post": "市场部经理",
                "tel": "021-838713",
                "phone": "13414151412",
                "email": "13414151412@163.com",
                "contactAddress": "中国",
                "phase": "1",
                "exhibitionArea": "C区",
                "boothNo": "C618",
                "businessAssociation": "日用品商协会",
                "businessDelegation": "深圳团",
                "zxqk": "品牌展位数达到标准"
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
          "label": "企业申请证件",
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
                "prop": "companyId",
                "label": "企业编码",
                "value": "",
                "type": "select"
              },
              {
                "prop": "certificateType",
                "label": "证件类型",
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
                "name": "companyId",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "certificateType",
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
              "label": "企业名称"
            },
            {
              "prop": "cantonCode",
              "label": "广交会企业编码"
            },
            {
              "prop": "typeOfCertificate",
              "label": "申请证件类型"
            },
            {
              "prop": "numOfCertificate",
              "label": "申请证件个数"
            },
            {
              "prop": "applyPerson",
              "label": "申请人员"
            },
            {
              "prop": "sex",
              "label": "性别"
            },
            {
              "prop": "identityCard",
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
                "cantonCode": "328723",
                "typeOfCertificate": "内停车证",
                "numOfCertificate": "2",
                "applyPerson": "商协会工作人员",
                "sex": "男",
                "identityCard": "352415199714151258",
                "phone": "13875487487"
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
          "label": "企业参加活动",
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "activityName",
            data: [
              {
                "prop": "activityName",
                "label": "活动名称",
                "value": "",
                "type": "input"
              },
              {
                "prop": "activityPlace",
                "label": "活动地点",
                "value": "",
                "type": "input"
              },
              {
                "prop": "activityTime",
                "label": "活动时间",
                "value": "",
                "type": "time"
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
                "name": "activityName",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "activityPlace",
                "findType": "IS_NOT_NULL",
                "joinType": "And",
                "session": this.session,
                "values": []
              },
              {
                "name": "activityTime",
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
              "prop": "activityName",
              "label": "活动名称"
            },
            {
              "prop": "activityPlace",
              "label": "活动地点"
            },
            {
              "prop": "activityTime",
              "label": "活动时间"
            },
            {
              "prop": "gender",
              "label": "报名人员性别"
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
                "activityName": "广东萌果科技有限公司",
                "activityPlace": "广州市琶洲国际会展中心",
                "activityTime": "2018/12/19",
                "gender": "男",
                "identifyNum": "342584199714154171",
                "phone": "13414151412"
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
          "label": "推荐采购商",
          // 搜索框联动设置
          "searchParamsForm": {
            variate: "recomName",
            data: [
              {
                "prop": "recomName",
                "label": "推荐企业",
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
                "name": "recomName",
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
              "prop": "purchaseAgentName",
              "label": "姓名"
            },
            {
              "prop": "gender",
              "label": "性别"
            },
            {
              "prop": "purchaseAgentCountory",
              "label": "国籍"
            },
            {
              "prop": "purchaseAgentPassport",
              "label": "护照号码"
            },
            {
              "prop": "purchaseAgentPost",
              "label": "职务"
            },
            {
              "prop": "purchaseAgentEmail",
              "label": "E-mail"
            },
            {
              "prop": "companyId",
              "label": "推荐企业"
            },
            {
              "prop": "purchaserName",
              "label": "采购商所属公司"
            },
            {
              "prop": "purchaseIntention",
              "label": "采购意向"
            }
          ],
          "data": {
            "data": [
              {
                "purchaseAgentName": "广东萌果科技有限公司",
                "gender": "328723",
                "purchaseAgentCountory": "张雪",
                "purchaseAgentPassport": "市场部经理",
                "purchaseAgentPost": "021-838713",
                "purchaseAgentEmail": "13414151412",
                "companyId": localStorage.getItem("getComPanyId"),
                "purchaserName": "中国",
                "purchaseIntention": "1"
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
          paraValue.session = res.session;
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
    initPageInfo() {
    },
    // 重置查询分页参数
    initSearchParamsPageInfo() {
    },
    // 查询
    selectParams() {
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
    },
    // 下载
    download() {},
    handleClick(tab, event) {
    }
  }
};
</script>



