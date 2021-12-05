<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="外贸司审定表彰展位安排" name="first"></el-tab-pane>
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
        :tableData="reviewtData.data"
        :newSummary="newSummary"
        :selection ='selection'
        :isSelectable ='isSelectable'
        @deal-with-operate="dealWithChangeStatusEvent"
        @change-multiple-selection ='selectAll'
      ></canBeEdit-table>
      <div style="line-height: 68px; display: flex; justify-content: space-between;">
        <div>
          <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="batch('通过')">通过</el-button>
          <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="batch('不通过')">不通过</el-button>
        </div>
        <!-- <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="jumpath">打印</el-button> -->
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
      selection: true,
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
        },
        {
          prop: "examineStatus",
          label: "审核状态",
          type: "input",
          userDefined: true
        },
        {
          prop: "examineOpinion",
          label: "审核意见",
          type: "input",
          userDefined: true
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "120",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #409EFF; margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #409EFF;"
              }
            ]
          }
        }
      ],
      reviewtData: {
        data: []
      },
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
    // this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "generateList", // 查询工作部设置的规则相关的交易团
      'checkboothinfoList'  //外贸司通过不通过按钮
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getGeneratebooth", // 确认表彰交易团列表查询
      'getCheckBoothInfo'  //外贸司通过不通过按钮
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getGeneratebooth(this.searchParams)
        .then(response => {
          this.reviewtData.data = response.records;
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
            this.reviewtData.data = res.records;
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
    // 全选按钮
    isSelectable(row, index) {
      if (row.publishStatus === '已发布') {
        return false;
      } else {
        return true;
      }
    },
    selectAll(val) {
      this.NoticeDate = val;
    },
    //批量处理
    batch(val) {
      let _this = this;
      if (this.NoticeDate && this.NoticeDate.length > 0) {
        let newDate = [];
        for (let key in this.NoticeDate) {
          let formName = {};
          formName["examineUserId"] = this.$store.getters.userInfo.userId;
          formName["examineUserCn"] = this.$store.getters.userInfo.userName;
          formName["operatorId"] = this.$store.getters.userInfo.userId;
          formName["operatorName"] = this.$store.getters.userInfo.userName;
          formName["relationId"] = this.NoticeDate[key].relationId;
          newDate.push(formName);
        }
        if (val === '通过') {
          for (let key in newDate) {
            newDate[key].examineStatus = 1;
            newDate[key].examineOpinion = '通过';
          }
          this.getCheckBoothInfo(newDate).then((res) => {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.getData();
          });
        } else if (val === '不通过') {
          this.$prompt(
            "此操作企业展位申请将审核不通过并填入不通过理由, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPattern: /^(?!(\s+$)).{1,200}$/,
              inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
            }
          )
          .then(value => {
            for (let key in newDate) {
              newDate[key].examineStatus = 2;
              newDate[key].examineOpinion = value.value;
            }
            _this.getCheckBoothInfo(newDate).then(res => {
              _this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getData();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
        }
      } else {
        this.$message.error("请选择要操作的交易团");
      }
    },
    // 处理操作按钮事件
    dealWithChangeStatusEvent(eventType, scope) {
      let _this = this;
      let newDate = [];
      let formName = {};
      formName["relationId"] = eventType.row.relationId;
      formName["examineUserId"] = this.$store.getters.userInfo.userId;
      formName["examineUserCn"] = this.$store.getters.userInfo.userName;
      formName["operatorId"] = this.$store.getters.userInfo.userId;
      formName["operatorName"] = this.$store.getters.userInfo.userName;
      if (scope === "pass") {
        formName["examineStatus"] = 1;
        formName["examineOpinion"] = '通过';
        newDate.push(formName);
        this.getCheckBoothInfo(newDate).then((res) => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.getData();
        });
      } else if (scope === "nopass") {
        formName["examineStatus"] = 2;
        this.$prompt(
          "此操作企业展位申请将审核不通过并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            formName["examineOpinion"] = value.value;
            newDate.push(formName);
            _this.getCheckBoothInfo(newDate).then(res => {
              _this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getData();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    }
  },
  watch: {
    'reviewtData.data'(newVal) {
      if (newVal && newVal.length > 0) {
        newVal.map(ele => {
          ele.operating = true;
        });
      }
    }
  }
};
</script>