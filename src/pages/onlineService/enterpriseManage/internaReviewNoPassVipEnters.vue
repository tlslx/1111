/**
 * @file 交易团查看审核不通过VIP企业
 */
<style scoped>
</style>
<template>
  <el-page ref="recomendStatusOfEnter">
    <template slot="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="查看审核不通过VIP企业" name="0">
          <search-param-link :searchParamsForm="searchParamsForm.data"
            :variate="searchParamsForm.variate"
            :dictionary="dictionaryData"
            @select-params="selectParams">
          </search-param-link>
          <cust-table class="vip-enterprise-list" :cols="cols" :loading="loading" :data="data"></cust-table>
          <pagination :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange">
          </pagination>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-page>
</template>
<script>
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import custTable from "@/components/project/onlineService/common/custTable.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from "@/scripts/project/utils";
export default {
  name: 'recomendStatusOfEnter',
  components: {
    'cust-table': custTable,
    'pagination': pagination,
    'search-param-link': searchParamLinkage
  },
  data() {
    return {
      activeName: 0,
      loading: true,
      cols: [
        {
          "prop": "sequenceNum",
          "label": "序号"
        },
        {
          "prop": "cantonCode",
          "label": "广交会企业编码"
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
          "prop": "companyName",
          "label": "企业名称"
        },
        {
          "prop": "auditResult",
          "label": "审核结果"
        },
        {
          "prop": "approveResult",
          "label": "审核意见"
        }
      ],
      formInline: {},
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
          }
        ]
      },
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "padding: 10px 0;text-align: center;"
      }
    };
  },
  created() {
    let _this = this;
    this.getSessionInfo().then(res => {
      this.initParams.customQueryParams.forEach((value, index, array) => {
        if (value.name === 'session') {
          value.values[0] = res.session;
        }
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
      }).catch(e => {
        _this.loading = false;
      });
    });
  },
  computed: {
    ...mapGetters('generateVIP', ['vipCompanyInfoList']),
    ...mapGetters('common', ['session']),
    ...mapGetters('dictionary', ['dictionaryData']),
    data() {
      return {
        data: this.vipCompanyInfoList
      };
    }
  },
  methods: {
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('generateVIP', ['selectVIPEnterList']),
    // 重置分页信息
    initPageInfo() {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = 10;
    },
    // 重置查询分页参数
    initSearchParamsPageInfo() {
      this.searchParams.pageIndex = 1;
      this.searchParams.pageSize = 10;
    },
    handleClick() {},
    // 修改每页显示条数
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
    }
  }
};
</script>


