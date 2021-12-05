/**
 * @file 展位调整申请
 * @author: llluj
*/
<style scoped>
  .marring {
    float: right;
    margin-top: 10px;
  }

  .btnecommend {
    margin-top: 10px;
  }

  .page-bar {
    text-align: right;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位调整申请" name="frist">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <cust-table
        :loading="loading"
        :cols="cols"
        :data="tableData"
        @deal-with-operate="dealWithOperate"
      ></cust-table>
      <div style="display:flex; justify-content: space-between;">
        <el-button @click="recommendBuyers" type="primary" class="btnecommend" size="medium">申请调整</el-button>
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
import { mapGetters, mapActions } from "vuex";
import pagination from "@/components/project/onlineService/common/pagination.vue";
// import store from "../../../scripts/framework/store";
export default {
  components: {
    "cust-table": custTable,
    pagination: pagination,
    "search-param-link": searchParamLinkage
  },
  data() {
    return {
      // store,
      id: "",
      delegationId: "140",
      loading: true,
      activeName: "frist",
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      searchParamsForm: {
        variate: "exhibitionKind",
        data: [
          {
            prop: "exhibitionAreaName",
            label: "日期",
            value: "",
            type: "input"
          },
          {
            prop: "exhibitionAreaName",
            label: "届数",
            value: "",
            type: "select"
          },
          {
            prop: "exhibitionType",
            label: "布展类型",
            value: "",
            type: "select"
          },
          {
            prop: "checkStatus",
            label: "审核状态",
            value: "",
            type: "select"
          }
        ]
      },

      dictionary: {
        exhibitionAreaOpts: [],
        exhibitionKind: [],
        checkStatus: []
      },
      searchParamsed: {
        companyId: this.$store.state.userInfo.companyId,
        exhibitionArea: "",
        exhibitionType: "",
        checkStatus: "",
        current: "1",
        size: "10"
      },
      searchParams: {
        companyId: this.$store.state.userInfo.companyId,
        current: "1",
        size: "10"
      },
      tableData: {
        data: []
      },
      cols: [
        {
          prop: "exhibitionSession",
          label: "届数",
          type: "string"
        },
        {
          prop: "exhibitionAreaName",
          label: "展区",
          type: "string"
        },
        {
          prop: "boothNo",
          label: "展位号",
          type: "string"
        },
        {
          prop: "originalRecommend",
          label: "原推荐数量",
          type: "string"
        },
        {
          prop: "adjustedNumber",
          label: "调整后数量",
          type: "string"
        },
        {
          prop: "nowBoothType",
          label: "现布展类型",
          type: "string"
        },
        {
          prop: "exhibitionType",
          label: "调整后布展类型",
          type: "string"
        },
        {
          prop: "checkStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          btns: [
            {
              type: "underlineText",
              label: "查看",
              style: "cursor: pointer;color: red;"
            },
            {
              type: "underlineText",
              label: "修改",
              style: "cursor: pointer;color: red;"
            },
            {
              type: "underlineText",
              label: "删除",
              style: "cursor: pointer;color: red;"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.dictionary.exhibitionAreaName = this.osDictionaryData.exhibitionAreaOpts;
    this.dictionary.exhibitionType = this.osDictionaryData.exhibitionKind;
    this.dictionary.checkStatus = this.osDictionaryData.checkStatus;
    this.handeSuerDate(this.searchParams);
  },
  mounted() {
  },
  computed: {
    ...mapGetters("dictionary", ["osDictionaryData"]),
    ...mapGetters("boothAdjustApply", ["getNumBer"])
  },
  methods: {
    ...mapActions("file", ["delFileInfo"]),
    ...mapActions("boothAdjustApply", [
      "getNumberBoothData",
      "postDeleteAddedBooths"
    ]),
    // 获取初始化数据
    handeSuerDate(val) {
      let values = encodeURI(JSON.stringify(val));
      this.loading = true;
      this.getNumberBoothData(values)
        .then(res => {
          let resData = JSON.parse(JSON.stringify(res));
          this.tableData.data = resData.records;
          this.pageInfo.total = resData.total;
          this.pageInfo.currentPage = resData.current;
          this.pageInfo.pageSize = resData.size;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 分页
    handleCurrentChange(current) {
      this.pageInfo.currentPage = current;
      this.searchParamsed.current = current;
      this.handeSuerDate(this.searchParamsed);
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.searchParamsed.size = val;
      this.handeSuerDate(this.searchParamsed);
    },
    // 新增
    recommendBuyers() {
      this.$router.push({
        path: "/enterpriseNumberAdjustData",
        query: {
          id: this.searchParamsed.companyId,
          delegationId: this.delegationId
        }
      });
    },
    // 表格事件
    dealWithOperate(val, prop, value) {
      if (value === "修改") {
        this.$router.push({
          path: "/enterpriseNumberAdjustData",
          query: {
            dataIs: "修改",
            val: val.row
          }
        });
      } else if (value === "删除") {
        let addid = {
          adjustId: val.row.adjustId
        };
        let addFile = {
          fileId: val.row.material
        };
        this.$confirm('确定删除该条记录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postDeleteAddedBooths(addid)
          .then(() => {
            this.delFileInfo(addFile)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                setTimeout(() => {
                  this.handeSuerDate(this.searchParams);
                }, 1000);
              }).catch();
          }).catch();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      } else {
        this.$router.push({
          path: "/enterpriseNumberAdjustData",
          query: {
            dataIs: "查看",
            val: val.row
          }
        });
      }
    },
    // 查询事件
    selectParams() {
      let temp = this.searchParamsed;
      // this.loading = true;
      // 判断查询条件
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (
          formVal.type === "select" && formVal.prop === "exhibitionAreaName"
        ) {
          this.searchParamsed.exhibitionArea = formVal.value;
        }
        if (formVal.prop === "exhibitionType" && formVal.type === "select") {
          this.searchParamsed.exhibitionType = formVal.value;
        }
        if (formVal.prop === "checkStatus" && formVal.type === "select") {
          this.searchParamsed.checkStatus = formVal.value;
        }
      });
      let values = encodeURI(JSON.stringify(temp));
      this.loading = true;
      this.getNumberBoothData(values)
        .then(res => {
          let resData = JSON.parse(JSON.stringify(res));
          this.tableData.data = resData.records;
          this.pageInfo.total = resData.total;
          this.pageInfo.currentPage = resData.current;
          this.pageInfo.pageSize = resData.size;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    }
  }
};
</script>

