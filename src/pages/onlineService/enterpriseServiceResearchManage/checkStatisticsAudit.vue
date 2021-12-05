/**
 * @file 成交统计审核
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="成交统计审核" name="0">
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
        <el-button class="recommend-btn" @click="pass">审核通过</el-button>
        <el-button class="recommend-btn" @click="noPass">审核不通过</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage
  },
  data() {
    return {
      activeName: 0,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "gjhMeetingCode",
            label: "广交会编码",
            value: "",
            type: "input"
          },
          {
            prop: "checkResults",
            label: "审核结果",
            value: "",
            type: "select"
          },
          {
            prop: "data",
            label: "日期",
            value: "",
            type: "select"
          }
        ]
      },
      // 字典数据
      dictionary: {
        // 总团人员审核
        checkResults: [
          {
            label: "通过",
            code: "01",
            value: "01"
          }
        ],
        data: [
          {
            label: "2019",
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
        }
      ]
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            gjhMeetingCode: "4397593",
            companyName: "广东萌果科技有限公司",
            countryRegions: "中非共和国",
            shortNum: "2",
            middleNum: "1",
            longNum: "12",
            totalAmount: "15"
          },
          {
            gjhMeetingCode: "4397593",
            companyName: "广州新科对外贸易有限公司",
            countryRegions: "中非共和国",
            shortNum: "2",
            middleNum: "1",
            longNum: "12",
            totalAmount: "24"
          }
        ],
        selection: true
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
  padding: 20px 20px;
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
