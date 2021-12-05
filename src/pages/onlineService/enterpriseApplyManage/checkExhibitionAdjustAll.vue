/**
 * @file 审核展区调整（所有角色审核）
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核展区调整" name="0">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        @select-params="selectParams"
      ></search-param-link>
      <can-be-edit-table
        :selection="tableData.selection"
        :isSelectable="selectInit"
        :tableTrData="tableData.tableTrData"
        @change-multiple-selection="changeMultipleSelection"
        @change-all-selection="changeAllSelection"
        @change-select-row="changeSelectRow"
        @edit-table-data="editTableData"
        :loading="loading"
        :tableData="tableDatas"
        @deal-with-operate="dealWithOperate">
      </can-be-edit-table>
      <div class="associa-recom-btn-container">
        <div class="btn-bar">
          <el-button type="primary" @click="pass">通过</el-button>
          <el-button @click="noPass">不通过22</el-button>
        </div>
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
import canBeEditTable from "@/components/project/onlineService/common/canBeEditTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    'can-be-edit-table': canBeEditTable,
    'search-param-link': searchParamLinkage,
    'pagination': pagination
  },
  data() {
    return {
      activeName: 0,
      loading: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "companyName",
            label: "企业名称",
            value: "",
            type: "input"
          },
          {
            prop: "enterpriseCode",
            label: "企业编码",
            value: "",
            type: "input"
          },
          {
            prop: "tradeGroup",
            label: "交易团",
            value: "",
            type: "input"
          }
        ]
      },
      tableDatas: [
        {
          "companyName": "韩式企业",
          "enterpriseGjhCode": "1023",
          "tradeGroup": "中央团",
          "businessAssociation": "生活协会",
          "customsCommodityCode": "112396",
          "productName": "112345",
          "suggestedAddExhibition": "生活区",
          "status": "0"
        }
      ],
      tableData: {
        selection: true,
        tableTrData: [
          {
            prop: "companyName",
            label: "企业名称",
            type: "string"
          },
          {
            prop: "enterpriseGjhCode",
            label: "广交会企业编码",
            type: "string"
          },
          {
            prop: "tradeGroup",
            label: "交易团",
            type: "string"
          },
          {
            prop: "businessAssociation",
            label: "商协会",
            type: "string"
          },
          {
            prop: "customsCommodityCode",
            label: "海关商品编码",
            type: "string"
          },
          {
            prop: "productName",
            label: "对应商品编码",
            type: "string"
          },
          {
            prop: "suggestedAddExhibition",
            label: "建议增加展区",
            type: "string"
          },
          {
            prop: "recommendReason",
            label: "建议原因",
            type: "input",
            maxlength: "20"
          },
          {
            type: "btn",
            label: "操作",
            show: true,
            unChangeStatus: true,
            operator: {
              textArray: [
                {
                  prop: "pass",
                  label: "通过",
                  type: "text",
                  class: "primary"
                },
                {
                  prop: "passnot",
                  label: "通过",
                  type: "text",
                  class: "warning"
                }
              ]
            }
          }
        ]
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: center;"
      },
      multipleSelection: [] //保存勾选到的数据
    };
  },
  created() {
    // this.tableData.map(el => {
    //   if (el.status === "0") {
    //     el.isEdit = true;
    //   }
    // });
  },
  computed: {},
  methods: {
    // 判断是否可勾选
    selectInit(row, index) {
      // if (row.recommendStatus === '已推荐') {
      //   return false;
      // } else {
      //   return true;
      // }
    },
    // 修改当前行
    editTableData(params) {
      params.iconType = 'text';
      // this.setSingleVipEnterCertifi(params).then(res => {
      //   this.$message({
      //     type: 'success',
      //     message: '设置成功'
      //   });
      // });
    },
    selectParams() {},
    dealWithOperate() {},
    changeMultipleSelection(val) {
      this.multipleSelection = val;
    },
    changeSelectRow(row) {
    },
    // 全选操作
    changeAllSelection(val) {},
    pass() {},
    noPass() {},
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

.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>
