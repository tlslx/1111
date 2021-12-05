/**
 * @file 企业填报成交统计后台
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="成交统计" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data1"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <search-param-link
        :searchParamsForm="searchParamsForm.data2"
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
      activeName: 0,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data1: [
          {
            prop: "rankingNum",
            label: "排位号",
            value: "",
            type: "input"
          },
          {
            prop: "country",
            label: "国家",
            value: "",
            type: "input"
          },
          {
            prop: "commodityName",
            label: "商品名称",
            value: "",
            type: "input"
          }
        ],
        data2: [
          {
            prop: "fillDate",
            label: "填报日期",
            value: "",
            type: "input"
          },
          {
            prop: "checkStates",
            label: "审核状态",
            value: "",
            type: "select"
          },
          {
            prop: "nper",
            label: "期数",
            value: "",
            type: "input"
          }
        ]

      },
      // 字典数据
      dictionary: {
        // 总团人员审核
        checkStates: [
          {
            label: "通过",
            code: "01",
            value: "01"
          }
        ]
      },
      cols: [
        {
          prop: "fillDate",
          label: "填报日期",
          type: "string"
        },
        {
          prop: "nper",
          label: "期数",
          type: "string"
        },
        {
          prop: "rankingNum",
          label: "排位号",
          type: "string"
        },
        {
          prop: "country",
          label: "国家",
          type: "string"
        },
        {
          prop: "commodityName",
          label: "商品名称",
          type: "string"
        },
        {
          prop: "shortAmount",
          label: "短单余额",
          type: "string"
        },
        {
          prop: "middleAmount",
          label: "中单余额",
          type: "string"
        },
        {
          prop: "longAmount",
          label: "长单余额",
          type: "string"
        },
        {
          prop: "totalAmount",
          label: "成交总金额（万美元）",
          type: "string"
        },
        {
          prop: "checkStates",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "checkOpinion",
          label: "审核意见",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "修改",
              style:
                "cursor: pointer;text-decoration: underline;color: green;margin: 0px 8px;"
            },
            {
              type: "underlineText",
              label: "删除",
              style: "cursor: pointer;text-decoration: underline;color: red;"
            }
          ]
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
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "美国",
            commodityName: "汽车和汽车配件",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "等待审核",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "泰国",
            commodityName: "五金",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "印度尼西亚",
            commodityName: "仪表仪器",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "等待审核",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
          },
          {
            fillDate: "2018/10/19",
            nper: "1",
            rankingNum: "2.C420",
            country: "巴西",
            commodityName: "日用陶瓷",
            shortAmount: "12",
            middleAmount: "1",
            longAmount: "3",
            totalAmount: "16",
            checkStates: "审核通过",
            checkOpinion: ""
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
