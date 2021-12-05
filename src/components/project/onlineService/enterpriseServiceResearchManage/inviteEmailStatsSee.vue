/**
 * @file 邀请邮件统计查看
 */
<template>
  <div>
    <search-param-link :searchParamsForm="searchParamsForm.data" :variate="searchParamsForm.variate"
      :dictionary="dictionary" @select-params="selectParams"></search-param-link>
    <cust-table :cols="cols" :data="tableData"></cust-table>
    <div class="associa-recom-btn-container">
      <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"></pagination>
    </div>
  </div>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  name: "vipCheckReviewResultsReception",
  components: {
    "search-param-link": searchParamLinkage,
    "cust-table": custTable,
    pagination: pagination
  },
  data() {
    return {
      activeName: "2",
      dictionary: {},
      formInline: {
        date: "",
        handlingState: ""
      },
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "theNumber",
            label: "届数",
            value: "",
            type: "input"
          },
          {
            prop: "tradeGroup",
            label: "交易团",
            value: "",
            type: "input"
          },
          {
            prop: "enterpriseCode",
            label: "企业编码",
            value: "",
            type: "input"
          }
        ]
      },
      cols: [
        {
          prop: "theNumber",
          label: "届数"
        },
        {
          prop: "tradeGroup",
          label: "交易团"
        },
        {
          prop: "enterpriseCode",
          label: "企业编码"
        },
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "sendMessagesNum",
          label: "发送邮件数"
        },
        {
          prop: "actualBuyersNum",
          label: "实际到会采购商人数"
        },
        {
          prop: "newActualBuyersNum",
          label: "实际到会新采购商人数"
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 800,
        style: "padding: 20px 0;text-align: center;"
      },
      // 传参
      searchParams: {
        "orderModelField": [
          {
            "orderByField": "exhibitNameCh",
            "desc": true
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": ["1"],
            "description": ""
          }
        ],
        "pageIndex": 0,
        "pageSize": 10
      }
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            theNumber: "123",
            tradeGroup: "广东东莞市",
            enterpriseCode: "328723",
            companyName: "广东萌果科技有限公司",
            sendMessagesNum: "78",
            actualBuyersNum: "50",
            newActualBuyersNum: "20"
          }
        ]
      };
    }
  },
  methods: {
    selectParams() {},
    // 分页事件
    handleSizeChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.pageSize = val;
      // let _this = this;
      // this.getAuditEnterProductInfo(this.searchParams).then(res => {

      //   //设置table的loading变量
      //   this.loading = false;
      //   this.tableData = res.records;
      // });
    },
    handleCurrentChange(val) {
      //设置table的loading变量
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.pageIndex = val;
      // let _this = this;
      // this.getAuditEnterProductInfo(this.searchParams).then(res => {

      //   //设置table的loading变量
      //   this.loading = false;
      //   this.tableData = res.records;
      // });
    }
  }
};
</script>
<style scoped>
.associa-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
}
.recommend-btn {
  background-color: #ff0033;
  color: #fff;
  outline: none;
  border: 0;
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>
