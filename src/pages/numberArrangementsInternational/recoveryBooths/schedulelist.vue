<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="生成展位安排表" name="first"></el-tab-pane>
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
        :tableData="generateList.records"
        :newSummary="newSummary"
      ></canBeEdit-table>
      <div style="line-height: 68px; display: flex; justify-content: space-between;">
        <div>
          <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="jumpath">打印</el-button>
          <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="download">下载</el-button>
        </div>
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
          prop: "delegationName",
          label: "交易团",
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
          prop: "boothNumber",
          label: "展位数",
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
        variate: "exhibitionArea",
        data: [
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "150px",
            type: "select"
          },
          {
            prop: "boothNumber",
            label: "展位数",
            value: "",
            width: "100px",
            type: "input"
          },
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "100px",
            type: "select"
          }
        ],
        dictionary: {
          delegation: [],
          exhibitionArea: []
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
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
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
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "generateList" // 查询工作部设置的规则相关的交易团
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getGeneratebooth" // 确认表彰交易团列表查询
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getGeneratebooth(this.searchParams)
        .then(response => {
          // this.reviewtData = response.records;
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
      this.getGeneratebooth(this.searchParams)
        .then(res => {
          this.loading = false;
          this.pageInfo.pageSize = res.size;
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
      this.getGeneratebooth(this.searchParams)
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
        if (formVal.prop === "delegation" && formVal.type === "select") {
          this.searchParams.delegationId = formVal.value;
        }
        if (formVal.type === "input" && formVal.prop === "boothNumber") {
          if (!isNaN(formVal.value - 0)) {
            this.searchParams.boothNumber = formVal.value;
          } else {
            this.$message.error("展位数请输入数字");
            formVal.value = '';
          }
        }
        if (formVal.type === "select" && formVal.prop === "exhibitionArea") {
          this.searchParams.exhibitionAreaCode = formVal.value;
        }
      });
      if (
        !isNaN(this.searchParams.boothNumber) || this.searchParams.boothNumber === ""
      ) {
        this.loading = true;
        this.getGeneratebooth(temp)
          .then(res => {
            _this.loading = false;
            // this.reviewtData = res.records;
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
    },
    // 打印按钮跳转页面
    jumpath() {
      this.$router.push({
        path: '/boothPrinttemplate',
        name: "打印模板",
        params: {
          reviewtData: this.searchParams
        }
      });
    },
    //下载
    download() {
      window.open(`${process.env.API_NA_URL}/api/commendArrange/getBoothArrangeAllInfo/download?token=${this.$store.state.token}`, '_blank');
    }
  }
};
</script>