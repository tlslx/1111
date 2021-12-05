/**
 * @file 联合方查看审核进度
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="联合布展" name="0">
      <div class="tip">
        <p>提示：</p>
        <p>1、申请联合布展的展位必须在同一展厅同一展区且位置相连。</p>
        <p>2、至少一家企业为特装展位参展企业。</p>
        <p>3、申请企业中若有标准展位企业，须证明所有申请企业属同一法人代表或属同一母公司的全资或绝对控股子公司或两两之间存在股权关系。</p>
        <p>4、联合布展的流程为：一家企业提出申请-->其他企业确认 --> 交易团审核 --> 商协会审核 --> 广交会审核 --> 委托施工单位报图</p>
      </div>
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionaryData"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :cols="cols"
        :data="getUnionExhibition"
        :loading="loading"
        @deal-with-operate="confirm"
      ></cust-table>
      <div class="associa-recom-btn-container">
        <pagination
          class="page-bar"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
      <div class="btn-bar">
        <el-button class="recommend-btn" @click="pass">申请联合布展</el-button>
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
      loading: true,
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
            prop: "checkResults",
            label: "审核结果",
            value: "",
            type: "select"
          },
          {
            prop: "boothNo",
            label: "展位号",
            value: "",
            type: "input"
          }
        ]
      },
       // 查询传参需要
      searchParams: {
        "unionExhibitionInfoSession": {
          "type": "2",
          "phase": "",
          "approveResult": "",
          "boothNo": ""
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 传参需要
      initParams: {
        "unionExhibitionInfoSession": {
          "type": "2"
        },
        "pageStart": "1",
        "pageSize": "10"
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
          label: "审核结果",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "确认",
              style: "cursor: pointer;text-decoration: underline;color: red;"
            }
          ]
        }
      ],
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
    this.getUnionExhibitionInfo(this.initParams).then(res => {
      _this.loading = false;
      if (res.total > 0) {
        this.pageInfo.currentPage = res.current;
        this.pageInfo.total = res.total;
      } else if (res.total === 0) {
        this.pageInfo.currentPage = 1;
        this.pageInfo.total = 0;
      }
    });
  },
  computed: {
    ...mapGetters('companyApplyUnionExhibition', ['getUnionExhibition']),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  methods: {
    ...mapActions('companyApplyUnionExhibition', ['getUnionExhibitionInfo']),
    // 重置查询分页参数
    initSearchParamsPageInfo() {
      this.searchParams.pageStart = 1;
      this.searchParams.pageSize = 10;
    },
    // 确认按钮跳转
    confirm(val, prop, value) {
      // 路由传参
      this.$router.push({
        name: "联合方确认",
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
          this.searchParams.unionExhibitionInfoSession.phase = formVal.value;
        }
        if (formVal.prop === 'checkResults' && formVal.type === 'input') {
          this.searchParams.unionExhibitionInfoSession.approveResult = formVal.value;
        }
        if (formVal.type === 'input') {
          this.searchParams.unionExhibitionInfoSession.boothNo = formVal.value;
        }
      });
      this.initSearchParamsPageInfo();
      this.getUnionExhibitionInfo(temp).then(res => {
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
    // 修改页面展示条数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.initParams.pageSize = val;
      this.getUnionExhibitionInfo(this.initParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.initParams.pageStart = val;
      this.getUnionExhibitionInfo(this.initParams).then(res => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    handleClick() {},
    pass() {
      this.$router.push('/enterprisesApplyExhibition');
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
  text-align: center;
}
.tip {
  margin: 5px;
  padding: 10px;
  background-color: #ffffdf;
  color: #cc003b;
}
.recommend-btn {
  float: left;
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
