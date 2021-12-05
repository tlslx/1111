/**
 * @file 交易团查询成交记录
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="查询成交统计明细" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
        @change-multiple-selection="changeMultipleSelection"
      ></cust-table>
      <div class="associa-recom-btn-container">
        <pagination
          class="page-bar"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="查询企业成交汇总情况" name="1"></el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      formInline: {},
      form: {},
      activeName: "0",
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "enterpriseCode",
            label: "企业编码",
            value: "",
            type: "input"
          },
          {
            prop: "countryRegions",
            label: "国家/地区",
            value: "",
            type: "select"
          },
          {
            prop: "date",
            label: "日期",
            value: "",
            type: "select"
          }
        ]
      },
      // 字典数据
      dictionary: {
        // 总团人员审核
        countryRegions: [
          {
            label: "中国",
            code: "01",
            value: "01"
          }
        ]
      },
      cols: [
        {
          prop: "gjhMeetingCode",
          label: "广交会编码",
          type: "string"
        },
        {
          prop: "companyName",
          label: "公司名称",
          type: "string"
        },
        {
          prop: "countryRegions",
          label: "国家地区",
          type: "string"
        },
        {
          prop: "bargainGoods",
          label: "成交商品",
          type: "string"
        },
        {
          prop: "shortNum",
          label: "短单数",
          type: "string"
        },
        {
          prop: "middleNum",
          label: "中单数",
          type: "string"
        },
        {
          prop: "longNum",
          label: "长单数",
          type: "string"
        },
        {
          prop: "totalAmount",
          label: "成交金额",
          type: "string"
        },
        {
          prop: "fillDate",
          label: "填报日期",
          type: "string"
        },
        {
          prop: "dataSource",
          label: "数据来源",
          type: "string"
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 800,
        style: "padding: 20px 0;text-align: center;"
      }
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          },
          {
            gjhMeetingCode: "328723",
            companyName: "广东萌果科技有限公司",
            countryRegions: "阿尔巴尼亚",
            bargainGoods: "日用陶瓷",
            shortNum: "12",
            middleNum: "1",
            longNum: "3",
            totalAmount: "16",
            fillDate: "2018/10/19",
            dataSource: "企业自录入"
          }
        ]
      };
    }
  },
  methods: {
    handleClick() {},
    onSubmit() {},
    dealWithOperate() {},
    changeMultipleSelection() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>
<style scoped>
.associa-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
}
.btn-bar {
  display: table-cell;
  text-align: left;
  vertical-align: middle;
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
