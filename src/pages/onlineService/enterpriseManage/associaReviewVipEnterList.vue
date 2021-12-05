/**
 * @file 商协会审核VIP企业名单
 */
<style scoped>
  .associa-review-btn-container {
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
    padding-right: 40px;
  }
  .accocia-review-edit-table >>> .el-form-item {
    margin-bottom: 0;
  }
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="审核VIP企业名单" name="0">
      <search-param-link :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionaryData"
        @select-params="selectParams">
      </search-param-link>
      <can-be-edit-table
        class="accocia-review-edit-table"
        :selection="tableData.selection"
        :isSelectable="selectInit"
        :tableData="tableInfo"
        :tableTrData="tableData.tableTrData"
        :loading="loading"
        @deal-with-operate="dealWithOperate"
        @edit-table-data="editTableData"
        @change-multiple-selection="changeMultipleSelection"
        @change-all-selection="changeAllSelection">
      </can-be-edit-table>
      <div class="associa-review-btn-container">
        <div class="btn-bar">
          <el-button type="primary" :disabled="multipleSelection.length <= 0" @click="pass">通过</el-button>
          <el-button type="danger" :disabled="multipleSelection.length <= 0" @click="noPass">不通过</el-button>
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
import pagination from "@/components/project/onlineService/common/pagination.vue";
import canBeEditTable from "@/components/project/onlineService/common/canBeEditTable.vue";
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
      selectAll: false,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
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
          },
          {
            "prop": "businessApproveResult",
            "label": "审核结果",
            "value": "0",
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
      tableInfo: [],
      // 审核VIP企业传参
      reviewEnterParams: {
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
            "prop": "recommendSource",
            "label": "推荐来源",
            "style": "color: #2d92ec;",
            "type": "string"
          },
          {
            "prop": "auditResult",
            "label": "审核结果",
            "type": "string"
          },
          {
            "type": "btn",
            "show": true,
            "unChangeStatus": true,
            "label": "操作",
            "operator": {
              "type": "text",
              "textArray": [
                {
                  "prop": "beginToReview",
                  "label": "开始审核",
                  "style": "cursor: pointer;text-decoration: underline;color: #0099ff;"
                }
              ]
            }
          },
          {
            "prop": "approveResult",
            "label": "审核意见",
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
      this.getApproveDateInfo(
        {
          "session": res.session,
          "type": 4
        }
      ).then(responses => {
        if (new Date().getTime() > new Date(responses.beginDate).getTime()) {
          _this.selectAll = true;
          this.$message.error('超出评选时间，无法审核');
        }
      });
      this.initParams.customQueryParams.forEach((paraValue, paraIndex, paraArray) => {
        if (paraValue.name === 'session') {
          paraValue.values[0] = res.session;
        }
      });
      // 初始化显示审核中数据
      // let approvingParams = JSON.parse(JSON.stringify(this.initParams));
      this.initParams.customQueryParams.push({
        "name": "businessApproveResult",
        "findType": "EQ",
        "joinType": "And",
        "values": ['0']
      });
      this.selectVIPEnterList(this.initParams).then(response => {
        _this.loading = false;
        if (response.total > 0) {
          this.pageInfo.currentPage = response.current;
          this.pageInfo.total = response.total;
        } else if (response.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        if (_this.selectAll && _this.tableInfo.length > 0) {
          _this.tableInfo.forEach((value, index, array) => {
            value.operating = false;
          });
        } else {
          this.$nextTick(() => {
            let temp = JSON.parse(JSON.stringify(_this.tableInfo));
            temp.map((ele) => {
              ele.operating = true;
            });
            _this.tableInfo = temp;
          });
        }
      }).catch(e => {
        _this.loading = false;
      });
    });
  },
  computed: {
    ...mapGetters('common', ['session']),
    ...mapGetters('generateVIP', ['vipCompanyInfoList']),
    ...mapGetters('dictionary', ['dictionaryData']),
    ...mapGetters('reviewVipEnterList', ['approveDateInfo'])
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['selectVIPEnterList']),
    ...mapActions('reviewVipEnterList', ['reviewVipEnterInfo', 'getApproveDateInfo']),
    // 判断是否可勾选
    selectInit(row, index) {
      if (row.businessApproveResult === '1' || row.businessApproveResult === '2' || this.selectAll) {
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
      // 查询初始化搜索信息
      this.initParams.customQueryParams = [
        {
          "name": "session",
          "findType": "EQ",
          "joinType": "And",
          "values": []
        }
      ];
      this.initParams.customQueryParams.forEach((paraValue, paraIndex, paraArray) => {
        if (paraValue.name === 'session') {
          paraValue.values[0] = this.session;
        }
      });
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
        this.$nextTick(() => {
          let temp = JSON.parse(JSON.stringify(_this.tableInfo));
          temp.map((ele) => {
            if (ele.businessApproveResult !== '0') {
              ele.operating = false;
            }
          });
          _this.tableInfo = temp;
        });
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 修改当前行
    editTableData(params) {
      params.iconType = 'text';
      this.setSingleVipEnterCertifi(params).then(res => {
        this.$message({
          type: 'success',
          message: '设置成功'
        });
      }).catch(e => {
        this.$message({
          showClose: true,
          message: e,
          type: 'error'
        });
      });
    },
    // 页面跳转
    dealWithOperate(scope) {
      this.$router.push({
        path: '/associaReviewVipEnterListReason',
        query: {
          row: scope.row,
          date: this.approveDateInfo ? this.approveDateInfo.beginDate : null
        }
      });
    },
    // 通过
    pass() {
      let _this = this;
      this.reviewEnterParams.efOsVipCompanyInfos = JSON.parse(JSON.stringify(this.multipleSelection));
      if (this.reviewEnterParams.efOsVipCompanyInfos.length > 0) {
        this.reviewEnterParams.efOsVipCompanyInfos.forEach((value, index, array) => {
          value.businessApproveResult = '1';
          value.recommendStatus = value.recommendStatus === '已推荐' ? '1' : '2';
          value.recommendSource = '1';
        });
        this.reviewVipEnterInfo(this.reviewEnterParams).then(res => {
          this.$message({
            type: 'success',
            message: '设置成功'
          });
          this.initSearchParamsPageInfo();
          _this.selectVIPEnterList(_this.searchParams).then(response => {
            if (response.total > 0) {
              this.pageInfo.currentPage = response.current;
              this.pageInfo.total = response.total;
            } else if (response.total === 0) {
              this.pageInfo.currentPage = 1;
              this.pageInfo.total = 0;
            }
            this.$nextTick(() => {
              let temp = JSON.parse(JSON.stringify(_this.tableInfo));
              temp.map((ele) => {
                if (ele.businessApproveResult !== '0') {
                  ele.operating = false;
                }
              });
              _this.tableInfo = temp;
            });
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: 'error'
          });
        });
      }
    },
    // 不通过
    noPass() {
      let _this = this;
      this.reviewEnterParams.efOsVipCompanyInfos = JSON.parse(JSON.stringify(this.multipleSelection));
      if (this.reviewEnterParams.efOsVipCompanyInfos.length > 0) {
        this.reviewEnterParams.efOsVipCompanyInfos.forEach((value, index, array) => {
          value.businessApproveResult = '2';
          value.recommendStatus = value.recommendStatus === '已推荐' ? '1' : '2';
          value.recommendSource = '1';
        });
        this.reviewVipEnterInfo(this.reviewEnterParams).then(res => {
          this.$message({
            type: 'success',
            message: '设置成功'
          });
          this.initSearchParamsPageInfo();
          _this.selectVIPEnterList(_this.searchParams).then(response => {
            if (response.total > 0) {
              this.pageInfo.currentPage = response.current;
              this.pageInfo.total = response.total;
            } else if (response.total === 0) {
              this.pageInfo.currentPage = 1;
              this.pageInfo.total = 0;
            }
            this.$nextTick(() => {
              let temp = JSON.parse(JSON.stringify(_this.tableInfo));
              temp.map((ele) => {
                if (ele.businessApproveResult !== '0') {
                  ele.operating = false;
                }
              });
              _this.tableInfo = temp;
            });
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: 'error'
          });
        });
      }
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      let _this = this;
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
        if (res.total > 0) {
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.total = 0;
        }
        this.$nextTick(() => {
          let temp = JSON.parse(JSON.stringify(_this.tableInfo));
          temp.map((ele) => {
            if (ele.businessApproveResult !== '0') {
              ele.operating = false;
            }
          });
          _this.tableInfo = temp;
        });
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 当前页修改
    handleCurrentChange(val) {
      let _this = this;
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
        if (res.total > 0) {
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.total = 0;
        }
        this.$nextTick(() => {
          let temp = JSON.parse(JSON.stringify(_this.tableInfo));
          temp.map((ele) => {
            if (ele.businessApproveResult !== '0') {
              ele.operating = false;
            }
          });
          _this.tableInfo = temp;
        });
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    changeMultipleSelection(val) {
      this.multipleSelection = val;
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
      this.tableInfo.map((ele) => {
        ele.operating = true;
      });
    }
  }
};
</script>



