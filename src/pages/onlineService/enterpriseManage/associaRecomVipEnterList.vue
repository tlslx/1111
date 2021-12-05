/**
 * @file 商协会推荐VIP企业名单
 */
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
    background-color: #ff6600;
    color: #fff;
    outline: none;
    border: 0;
  }
  .page-bar {
    display: table-cell;
    vertical-align: middle;
    padding-right: 40px;
  }
  .associa-edit-table >>> .el-form-item {
    margin-bottom: 0;
  }
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="商协会推荐VIP企业名单" name="0">
      <search-param-link :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionaryData"
        @select-params="selectParams">
      </search-param-link>
      <can-be-edit-table
        class="associa-edit-table"
        :selection="tableData.selection"
        :isSelectable="selectInit"
        :tableData="tableInfo"
        :tableTrData="tableData.tableTrData"
        :loading="loading"
        @change-multiple-selection="changeMultipleSelection"
        @change-all-selection="changeAllSelection"
        @change-select-row="changeSelectRow">
      </can-be-edit-table>
      <div class="associa-recom-btn-container">
        <div class="btn-bar">
          <el-button :disabled="multipleSelection.length <= 0" :class="multipleSelection.length > 0 ? 'recommend-btn' : ''" @click="recommendEnter">推荐VIP企业</el-button>
        </div>
        <pagination
          class="page-bar"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange">
        </pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import canBeEditTable from "@/components/project/onlineService/common/canBeEditTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  components: {
    'can-be-edit-table': canBeEditTable,
    'pagination': pagination,
    'search-param-link': searchParamLinkage
  },
  data() {
    return {
      activeName: '0',
      loading: true,
      tableInfo: [],
      // 搜索框联动设置
      searchParamsForm: {
        variate: "exhibitionArea",
        data: [
          {
            "prop": "cantonCode",
            "label": "广交会企业编码",
            "width": "150px",
            "value": "",
            "type": "input"
          },
          {
            "prop": "companyName",
            "label": "企业名称",
            "value": "",
            "type": "input"
          },
          {
            "prop": "recommendStatus",
            "label": "状态",
            "value": "",
            "type": "select"
          },
          {
            "prop": "exhibitionArea",
            "label": "展区",
            "value": "",
            "type": "select"
          }
        ]
      },
      // 推荐VIP企业传参
      recommendEnterParams: {
        "efOsVipCompanyInfos": []
      },
      initParams: {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "session",
            "findType": "EQ",
            "joinType": "And",
            "values": []
          }
        ],
        "pageIndex": 1,
        "pageSize": 10
      },
      searchParams: {},
      tableData: {
        selection: true,
        tableTrData: [
          {
            "prop": "exhibitionArea",
            "label": "展区",
            "type": "string"
          },
          {
            "prop": "cantonCode",
            "label": "广交会企业编码",
            "type": "string"
          },
          {
            "prop": "businessAssociation",
            "label": "商协会",
            "type": "string"
          },
          {
            "prop": "businessDelegation",
            "label": "交易团",
            "type": "string"
          },
          {
            "prop": "companyName",
            "label": "企业名称",
            "type": "string"
          },
          {
            "prop": "recommendStatus",
            "label": "状态",
            "type": "string",
            "style": "color: #ff0033"
          },
          {
            "prop": "recommendSource",
            "label": "推荐来源",
            "type": "string",
            "style": "color: #2d92ec;"
          },
          {
            "prop": "recommendReason",
            "label": "推荐理由",
            "type": "input"
          }
        ]
      },
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      multipleSelection: [] //保存勾选到的数据
    };
  },
  created() {
    let _this = this;
    this.getSessionInfo().then(res => {
      _this.initParams.customQueryParams.forEach((paraValue, paraIndex, paraArray) => {
        if (paraValue.name === 'session') {
          paraValue.values[0] = res.session;
        }
      });
      _this.selectVIPEnterList(_this.initParams).then(response => {
        _this.loading = false;
        if (response.total > 0) {
          _this.pageInfo.currentPage = response.current;
          _this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          _this.pageInfo.currentPage = 1;
          _this.pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    });
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('generateVIP', ['vipCompanyInfoList']),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['selectVIPEnterList']),
    ...mapActions('recomVipEnterList', ['recommendVipEnterInfo']),
    // 判断是否可勾选
    selectInit(row, index) {
      if (row.recommendStatus === '已推荐') {
        return false;
      } else {
        return true;
      }
    },
    // 重置查询分页参数
    initSearchParamsPageInfo() {
      this.searchParams.pageIndex = 1;
      this.searchParams.pageSize = 10;
    },
    // 查询
    selectParams() {
      let _this = this;
      this.loading = true;
      this.searchParams = JSON.parse(JSON.stringify(this.initParams));
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        let currentObject = {};
        if (formVal.value !== '') {
          currentObject.name = formVal.prop;
          if (formVal.type === 'input') {
            currentObject.findType = 'LIKE';
          }
          if (formVal.type === 'select') {
            currentObject.findType = 'EQ';
          }
          currentObject.joinType = 'And';
          currentObject.values = [];
          currentObject.values.push($helper.trim(formVal.value));
          this.searchParams.customQueryParams.push(currentObject);
        }
      });
      this.initSearchParamsPageInfo();
      this.selectVIPEnterList(this.searchParams).then(res => {
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.pageSize = 10;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 推荐vip企业
    recommendEnter() {
      let _this = this;
      this.recommendEnterParams.efOsVipCompanyInfos = JSON.parse(JSON.stringify(this.multipleSelection));
      if (this.recommendEnterParams.efOsVipCompanyInfos.length > 0) {
        this.recommendEnterParams.efOsVipCompanyInfos.forEach((value, index, array) => {
          value.recommendSource = '1';
        });
      }
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        _searchParams = this.initParams;
      } else {
        _searchParams = this.searchParams;
      }
      this.loading = true;
      this.recommendVipEnterInfo(this.recommendEnterParams).then(res => {
        this.$message({
          type: 'success',
          message: '设置成功'
        });
        _this.selectVIPEnterList(_searchParams).then(response => {
          _this.loading = false;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        _searchParams = this.initParams;
        _searchParams.pageSize = val;
      } else {
        this.searchParams.pageSize = val;
        _searchParams = this.searchParams;
      }
      this.selectVIPEnterList(_searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页数
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      let _searchParams = {};
      if (!this.searchParams.customQueryParams) {
        this.initParams.pageIndex = val;
        _searchParams = this.initParams;
      } else {
        this.searchParams.pageIndex = val;
        _searchParams = this.searchParams;
      }
      this.selectVIPEnterList(_searchParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    changeMultipleSelection(val) {
      this.multipleSelection = val;
    },
    changeSelectRow(row) {
    },
    // 全选功能
    changeAllSelection(val) {
      let tempObj = JSON.parse(JSON.stringify(this.tableInfo));
      if (val.length < 1) {
        for (const item of tempObj) {
          item['isEdit'] = false;
        }
        this.$nextTick(() => {
          this.tableInfo = tempObj;
        });
      } else {
        val.map(el => {
          el.isEdit = true;
        });
      }
    },
    getTableData() {

    },
    handleClick(tab, event) {
    }
  },
  watch: {
    vipCompanyInfoList(newVal) {
      this.tableInfo = JSON.parse(JSON.stringify(newVal));
    }
  }
};
</script>




