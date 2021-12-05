/**
 * @file 广交会审核联合布展
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="审核联合布展业务" name="0">
      <search-param-link
      :searchParamsForm="searchParamsForm.data"
      :variate="searchParamsForm.variate"
      :dictionary="osDictionaryData"
      @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination
  },
  data() {
    return {
      activeName: 0,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "companyName",
        data: [
          {
            prop: "phase",
            label: "展期",
            value: "",
            type: "select"
          },
          {
            prop: "cantonApproveResult",
            label: "审核结果",
            value: "",
            type: "select"
          },
          {
            prop: "boothNo",
            label: "展位号",
            value: "",
            type: "select"
          }
        ]
      },
      // 字典数据
      dictionary: {
        // 总团人员审核
        "rollOver": [
          {
            "label": "请选择",
            "code": "01",
            "value": "01",
            "companyName": "企业1"
          }
        ]
      },
      cols: [
        {
          prop: "applyCode",
          label: "联合布展编号",
          type: "string"
        },
        {
          prop: "type",
          label: "类型",
          type: "string"
        },
        {
          prop: "companyName",
          label: "申请企业",
          type: "string"
        },
        {
          prop: "phase",
          label: "期数",
          type: "string"
        },
        {
          prop: "boothNo",
          label: "展位号",
          type: "string"
        },
        {
          prop: "exhibitionArea",
          label: "展区",
          type: "string"
        },
        {
          prop: "otherCompanyOpinion",
          label: "所有企业确认",
          type: "string"
        },
        {
          prop: "approveResult",
          label: "最终审核结果",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "审核",
              style: "cursor: pointer;text-decoration: underline;color: red;"
            }
          ]
        }
      ],
      // 表格类型
      tableData: {
        data: []
      },
      // 查询传参需要
      searchParams: {
        "cantonSession": {
          "createSession": "125",
          "type": "",
          "phase": "",
          "cantonApproveResult": "",
          "boothNo": ""
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 传参需要
      initParams: {
        "cantonSession": {
          "createSession": "125"
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "text-align: right;"
      }
    };
  },
  created() {
    let _this = this;
    this.querycantonSessionInfo(this.initParams).then(res => {
      _this.loading = false;
      if (res.total > 0) {
        this.pageInfo.currentPage = res.current;
        this.pageInfo.total = res.total;
        this.tableData.data = res.records;
      } else if (res.total === 0) {
        this.pageInfo.currentPage = 1;
        this.pageInfo.total = 0;
        this.tableData.data = res.records;
      }
    });
  },
  computed: {
    ...mapGetters('companyApplyUnionExhibition', ['querycantonSession']),
    ...mapGetters('dictionary', ['osDictionaryData'])
  },
  methods: {
    ...mapActions('companyApplyUnionExhibition', ['querycantonSessionInfo']),
    // 重置查询分页参数
    initSearchParamsPageInfo() {
      this.searchParams.pageStart = 1;
      this.searchParams.pageSize = 10;
    },
    // 审核功能按钮
    dealWithOperate(val, prop, value) {
      // 路由传参
      this.$router.push({
        name: "审核联合布展(工作部)",
        params: {
          applyCode: val.row.applyCode
        }
      });

    },
    // 搜索组件返回的数据
    selectParams() {
      let _this = this;
      let temp = this.searchParams;
      this.loading = true;
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.type === 'select' && formVal.prop === 'phase') {
          this.searchParams.cantonSession.phase = formVal.value;
        }
        if (formVal.prop === 'cantonApproveResult' && formVal.type === 'select') {
          this.searchParams.cantonSession.cantonApproveResult = formVal.value;
        }
        if (formVal.type === 'select' && formVal.prop === 'boothNo') {
          this.searchParams.cantonSession.boothNo = formVal.value;
        }
      });
      this.querycantonSessionInfo(temp).then(res => {
        _this.loading = false;
        if (res.total > 0) {
          this.pageInfo.currentPage = res.current;
          this.pageInfo.pageSize = 10;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
          this.tableData.data = res.records;
        }
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 修改页面展示条数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.initParams.pageSize = val;
      this.querycantonSessionInfo(this.initParams).then(res => {
        this.loading = false;
        this.tableData.data = res.records;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.initParams.pageStart = val;
      this.querycantonSessionInfo(this.initParams).then(res => {
        this.loading = false;
        this.tableData.data = res.records;
      }).catch(e => {
        this.loading = false;
      });
    },
    handleClick() {},
    pass() {
      // this.$router.push('/enterprisesApplyExhibitionbusiness');
    }
  },
  watch: {
    "querycantonSession.data"(newVal) {
      if (newVal && newVal.length > 0) {
        this.tableData.data = JSON.parse(JSON.stringify(newVal));
        this.tableData.data.forEach((value, index) => {
          value.approveResult = $helper.getDicLabel(this.osDictionaryData.approveResult, value.approveResult);
        });
      }
    }
  }
};
</script>
<style scoped>

</style>
