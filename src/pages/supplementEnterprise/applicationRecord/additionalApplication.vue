<style lang="less" scoped>
/deep/.el-dialog {
  width: 30%;
}
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="工作部查阅" name="first"></el-tab-pane>
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
        :tableData="unioncheckList.records"
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
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      // 表头数据
      reviewTrDate: [
        {
          prop: "companyName",
          label: "企业名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "delegationName",
          label: "交易团",
          type: "input",
          userDefined: true
        },
        {
          prop: "unionCname",
          label: "联营企业",
          type: "input",
          userDefined: true
        },
        {
          prop: "address",
          label: "企业地址",
          type: "input",
          userDefined: true
        },
        {
          prop: "appendType",
          label: "补录类型",
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
            prop: "companyName",
            label: "联营企业",
            value: "",
            width: "100px",
            type: "input"
          },
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "appendType",
            label: "补录类型",
            value: "",
            width: "100px",
            type: "select"
          }
        ],
        dictionary: {
          delegation: []
        }
      },
      appendType: [
        {
          value: 'ADD',
          label: '新增'
        },
        {
          value: 'REMOVE',
          label: '撤销'
        },
        {
          value: 'MODIFY',
          label: '修改'
        }
      ],
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      },
      searchDate: [],
      fatDate: {}
    };
  },
  created() {
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.searchParamsForm.dictionary.delegation = JSON.parse(JSON.stringify(res)).map(item => {
        return { label: item.deptName, value: item.deptId };
      });
    }).catch(e => {});
  },
  mounted() {
    this.searchParamsForm.dictionary.appendType = this.appendType;
    this.getData();
  },
  computed: {
    ...mapGetters("supplementEnterprise", [
      "unioncheckList" // 查询工作部设置的规则相关的交易团
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("supplementEnterprise", [
      "getUnioncheck" // 确认表彰交易团列表查询
    ]),
    ...mapActions('nainformation', ['getdelegationDepartment']),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getUnioncheck(this.searchParams)
        .then(response => {
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
      this.getUnioncheck(this.searchParams)
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
      this.getUnioncheck(this.searchParams)
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
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "delegation" && formVal.type === "select") {
          if (formVal.value !== "") {
            this.searchParams.delegationId = formVal.value;
            for (let key in this.searchParamsForm.dictionary.delegation) {
              if (
                this.searchParamsForm.dictionary.delegation[key].value === this.searchParams.delegationId
              ) {
                this.searchParams.delegationName = this.searchParamsForm.dictionary.delegation[key].label;
              }
            }
          } else {
            this.searchParams.delegationId = "";
            this.searchParams.delegationName = "";
          }
        }
        if (formVal.prop === "appendType" && formVal.type === "select") {
          this.searchParams.appendType = formVal.value;
        }
        if (formVal.prop === "companyName" && formVal.type === "input") {
          this.searchParams.companyName = formVal.value;
        }
      });
      let obj = {
        current: 1,
        size: 10
      };
      let key = Object.keys(this.searchParams);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.searchParams[key[i]];
        if (bSecend !== "") {
          obj[aFirst] = bSecend;
        }
      }
      this.loading = true;
      this.getUnioncheck(obj)
        .then(res => {
          _this.loading = false;
          if (res.total > 0) {
            this.pageInfo.currentPage = res.current;
            _this.pageInfo.pageSize = 10;
            _this.pageInfo.total = res.total;
            // });
          } else if (res.total === 0) {
            _this.pageInfo.currentPage = 1;
            _this.pageInfo.total = 0;
            _this.reviewtData = res.records;
          }
        })
        .catch(e => {
          _this.loading = false;
        });
    }
  }
};
</script>
