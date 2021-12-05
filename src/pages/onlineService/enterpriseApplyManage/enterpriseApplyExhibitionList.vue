/**
 * @file 企业申请展区调整列表及状态（后台）
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="申请展区调整列表" name="0">
      <search-param-link :searchParamsForm="searchParamsForm.data" :variate="searchParamsForm.variate"
        @select-params="selectParams"></search-param-link>
      <cust-table class="vip-enterprise-list" :cols="cols" :data="tableData"></cust-table>
      <pagination class="page-bar" :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  name: "vipCheckReviewResultsReception",
  components: {
    "cust-table": custTable,
    'search-param-link': searchParamLinkage,
    'pagination': pagination
  },
  data() {
    return {
      activeName: 0,
      cols: [
        {
          prop: "applyAdjustCustomsCode",
          label: "申请调整的海关编码"
        },
        {
          prop: "suggestedAddExhibitionName",
          label: "建议增加展区名称"
        },
        {
          prop: "checkStates",
          label: "审核状态",
          style: "color: green;"
        }
      ],
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "companyName",
            label: "海关商品编码",
            value: "",
            width: "115px",
            type: "input"
          }
        ]
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      }
    };
  },
  computed: {
    tableData() {
      return {
        data: [
          {
            applyAdjustCustomsCode: "326487649623",
            suggestedAddExhibitionName: "高端轻工艺展区",
            checkStates: "审核通过"
          }
        ]
      };
    }
  },
  methods: {
    selectParams() {},
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      // let _searchParams = {};
      // if (!this.searchParams.customQueryParams) {
      //   _searchParams = this.initParams;
      //   _searchParams.pageSize = val;
      // } else {
      //   this.searchParams.pageSize = val;
      //   _searchParams = this.searchParams;
      // }
      // this.getVIPEnterCertifiIndicators(_searchParams).then(res => {
      //   this.loading = false;
      // }).catch(e => {
      //   this.loading = false;
      // });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      // let _searchParams = {};
      // if (!this.searchParams.customQueryParams) {
      //   this.initParams.pageIndex = val;
      //   _searchParams = this.initParams;
      // } else {
      //   this.searchParams.pageIndex = val;
      //   _searchParams = this.searchParams;
      // }
      // this.getVIPEnterCertifiIndicators(_searchParams).then(res => {
      //   this.loading = false;
      // }).catch(e => {
      //   this.loading = false;
      // });
    }
  }
};
</script>
<style scoped>

</style>
