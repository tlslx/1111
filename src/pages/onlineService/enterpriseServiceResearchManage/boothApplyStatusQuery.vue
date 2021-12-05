/**
 * @file 展位申请情况查询
 */
<template>
  <div>
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
  </div>
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
    "pagination": pagination
  },
  data() {
    return {
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "nper",
            label: "届数",
            value: "",
            type: "select"
          },
          {
            prop: "boothNature",
            label: "展位性质",
            value: "",
            type: "select"
          },
          {
            prop: "booth",
            label: "展位",
            value: "",
            type: "select"
          }
        ]
      },
      // 字典数据
      dictionary: {
        // 届数
        nper: [
          {
            label: "请选择",
            code: "01",
            value: "01"
          }
        ],
        boothNature: [
          {
            label: "请选择",
            code: "01",
            value: "01"
          }
        ],
        booth: [
          {
            label: "请选择",
            code: "01",
            value: "01"
          }
        ]
      },
      cols: [
        {
          prop: "nper",
          label: "届数",
          type: "string"
        },
        {
          prop: "applyArea",
          label: "申请展区",
          type: "string"
        },
        {
          prop: "boothNature",
          label: "展位性质",
          type: "string"
        },
        {
          prop: "applyNum",
          label: "申请数量",
          type: "string"
        },
        {
          prop: "actualExhibitorsNum",
          label: "实际参展数量",
          type: "string"
        },
        {
          prop: "boothNo",
          label: "展位号",
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
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "汽车和汽车配件",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "品牌展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "12.N723"
          },
          {
            nper: "123",
            applyArea: "日用陶瓷",
            boothNature: "一般性展位",
            applyNum: "12",
            actualExhibitorsNum: "2",
            boothNo: "4.C873"
          }
        ]
      };
    }
  },
  methods: {
    selectParams() {},
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
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>
