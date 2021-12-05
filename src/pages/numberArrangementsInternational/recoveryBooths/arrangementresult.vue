<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="公布获取表彰交易团奖励展位类别及数量安排结果" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="reviewtData"
        :newSummary="newSummary"
      ></canBeEdit-table>
      <div style="line-height: 68px;">
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      newSummary: true,
      // 表头数据
      reviewTrDate: [
        {
          prop: "boothType",
          label: "类别",
          type: "input",
          userDefined: true
        },
        {
          prop: "delegationName",
          label: "交易团",
          type: "select",
          userDefined: true
        },
        {
          prop: "exhibitionPeriod",
          label: "展期",
          type: "input",
          userDefined: true
        },
        {
          prop: "associatioName",
          label: "商会",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionArea",
          label: "展区",
          type: "input",
          userDefined: true
        },
        {
          prop: "oldInitialNumber",
          label: "X-1届最终展位数/X届初始展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "equalExchange",
          label: "等量调换",
          type: "input",
          userDefined: true
        },
        {
          prop: "unequalExchange",
          label: "不等量调换",
          type: "input",
          userDefined: true
        },
        {
          prop: "restoreExchange",
          label: "还原调整",
          type: "input",
          userDefined: true
        },
        {
          prop: "refund",
          label: "退展位",
          type: "input",
          userDefined: true
        },
        {
          prop: "newExhibition",
          label: "新增展位",
          type: "input",
          userDefined: true
        },
        {
          prop: "recovery",
          label: "回收展位",
          type: "input",
          userDefined: true
        },
        {
          prop: "typeExchange",
          label: "展位类型调整",
          type: "input",
          userDefined: true
        },
        {
          prop: "other",
          label: "其他调整",
          type: "input",
          userDefined: true
        },
        {
          prop: "initialNumber",
          label: "X届最终展位数",
          type: "input",
          userDefined: true
        }
      ],
      reviewtData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      // 搜索框联动设置
      searchParamsForm: {
        variate: "delegation",
        data: [
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "boothNumber",
            label: "展期",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "coceral",
            label: "商会",
            value: "",
            width: "100px",
            type: "select"
          }
        ],
        dictionary: {
          delegation: [],
          // 商会
          associatio: [],
          // 展期
          boothNumber: []
        },
        newButton: {}
      },
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      },
      searchDate: []
    };
  },
  async created() {
    // this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.delegation = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    }).catch(e => {});
    // 商会
    this.getassociationDepartment().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.coceral = newRes.map(item => {
        return { value: item.deptId, label: item.deptName };
      });
    }).catch(e => {});
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
    // this.searchParamsForm.dictionary.coceral = await kindo.dictionary.get('coceral'); // 商协会
    this.searchParamsForm.dictionary.boothNumber = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "grrangementList" // 查询工作部设置的规则相关的交易团
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getGrrangementresult" // 确认表彰交易团列表查询
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getGrrangementresult(this.searchParams)
        .then(response => {
          this.reviewtData = response.records;
          if (response.total > 0) {
            this.pageInfo.currentPage = response.current;
            this.pageInfo.total = response.total;
          } else if (response.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
          }
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getGrrangementresult(this.searchParams)
        .then(res => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      this.getGrrangementresult(this.searchParams)
        .then(res => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 模糊查询
    selectParams() {
      let _this = this;
      let temp = this.searchParams;
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          this.searchParams.exhibitionAreaCode = formVal.value;
        }
        if (formVal.type === "select" && formVal.prop === "delegation") {
          this.searchParams.delegationId = formVal.value;
        }
        if (formVal.type === "select" && formVal.prop === "coceral") {
          this.searchParams.associatioId = formVal.value;
        }
        if (formVal.type === "select" && formVal.prop === "boothNumber") {
          this.searchParams.exhibitionPeriod = formVal.value;
        }
      });
      this.loading = true;
      this.getGrrangementresult(temp)
        .then(res => {
          _this.loading = false;
          this.reviewtData = res.records;
          if (res.total > 0) {
            this.pageInfo.currentPage = res.current;
            this.pageInfo.pageSize = 10;
            this.pageInfo.total = res.total;
          } else if (res.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
            this.reviewtData = res.records;
          }
        })
        .catch(e => {
          _this.loading = false;
        });
    }
  }
};
</script>
