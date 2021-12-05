<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="生成交易团获表彰展位数" name="first"></el-tab-pane>
    <el-card class="box-card">
      <div>
        <search-param-link
          :searchParamsForm="searchParamsForm.data"
          :variate="searchParamsForm.variate"
          :dictionary="searchParamsForm.dictionary"
          @select-params="selectParams"
        ></search-param-link>
        <div style="margin-bottom: 10px;float: right;">
          <el-button type="primary" @click="btnDialogVisible = true" >设置调和系数</el-button>
          <el-button type="primary" @click="calculation" >测算</el-button>
        </div>
      </div>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="listBootharrange.records"
        :newSummary="newSummary"
      ></canBeEdit-table>
      <div style="line-height: 68px; display: flex; justify-content: space-between">
        <div>
          <el-button type="primary" @click="download">下载</el-button>
        </div>
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
      <el-dialog title="设置调和系数" :visible.sync="btnDialogVisible" width="30%;" style="float: left;">
        <reconcile @closeModel="customsModal"></reconcile>
      </el-dialog>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import openApplication from "./component/openApplication";
import reconcile from "./component/reconcile";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    openApplication,
    reconcile
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      newSummary: true,
      btnDialogVisible: false,
      // 表头数据
      reviewTrDate: [
        {
          prop: "delegationName",
          label: "交易团(分团)",
          type: "input",
          userDefined: true
        },
        {
          prop: "exportVolume",
          label: "出口额(美元)",
          type: "input",
          userDefined: true
        },
        {
          prop: "exportProportion",
          label: "出口额占比",
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
        variate: "delegation",
        data: [
          {
            prop: "delegation",
            label: "交易团(分团)",
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
            prop: "exportVolume",
            label: "出口额",
            value: "",
            width: "100px",
            type: "input"
          }
        ],
        dictionary: {
          delegation: []
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
    this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "listBootharrange", // 查询工作部设置的规则相关的交易团
      'commendboothList'  //生成测算
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getBoothArrange", // 确认表彰交易团列表查询
      'getCommendBoothCalculation'  //生成测算
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getBoothArrange(this.searchParams)
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
      this.getBoothArrange(this.searchParams)
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
      this.getBoothArrange(this.searchParams)
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
            this.$message.error("届数请输入数字");
            formVal.value = '';
          }
        }
        if (formVal.type === "input" && formVal.prop === "exportVolume") {
          if (!isNaN(formVal.value - 0)) {
            this.searchParams.exportVolume = formVal.value;
          } else {
            this.$message.error("出口额请输入数字");
            formVal.value = '';
          }
        }
      });
      if (
        !isNaN(this.searchParams.boothNumber - 0) || this.searchParams.boothNumber === ""
      ) {
        if (
          !isNaN(this.searchParams.exportVolume - 0) || this.searchParams.exportVolume === ""
        ) {
          this.loading = true;
          this.getBoothArrange(temp)
            .then(res => {
              _this.loading = false;
              if (res.total > 0) {
                this.pageInfo.currentPage = res.current;
                this.pageInfo.pageSize = 10;
                this.pageInfo.total = res.total;
              } else if (res.total === 0) {
                this.pageInfo.currentPage = 1;
                this.pageInfo.total = 0;
              }
            })
            .catch(e => {
              _this.loading = false;
            });
        }
      }
    },
    //弹框
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getData();
    },
    //下载
    download() {
      window.open(`${process.env.API_NA_URL}/api/commendArrange/getEstimateInfo/download`);
    },
    //测算
    calculation() {
      let temp = {};
      temp.operatorId = this.$store.getters.userInfo.userId;
      temp.operator = this.$store.getters.userInfo.userName;
      this.getCommendBoothCalculation(temp).then((res) => {
        this.getData();
      });
    }
  }
};
</script>
