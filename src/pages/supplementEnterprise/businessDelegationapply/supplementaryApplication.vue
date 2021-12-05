<style lang="less" scoped>
/deep/.el-dialog {
  width: 90%;
}
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="外贸中心审核交易团追加联营申请" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
        @new-onchange='newChange'
      ></search-param-link>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="taskCloseList.records"
        @cell-click="cellClick"
        @deal-with-operate="dealWithChangeStatusEvent"
      ></canBeEdit-table>
      <div style="line-height: 68px;">
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
      </div>
      <el-dialog title="查看" :visible.sync="btnDialogVisible" width="90%;">
        <checkSupplementary @closeModal="customsModal" :fatDate="fatDate"></checkSupplementary>
      </el-dialog>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import checkSupplementary from "./component/checkSupplementary";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    checkSupplementary
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
          prop: "exhibitionAreaName",
          label: "申请展区",
          type: "input",
          userDefined: true
        },
        {
          prop: "productTypeName",
          label: "展品专区",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothType",
          label: "展位类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionPeriod",
          label: "期数",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothNumber",
          label: "申请展位数量",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothAcreage",
          label: "申请面积",
          type: "input",
          userDefined: true
        },
        {
          prop: "lastName",
          label: "联营企业",
          type: "string",
          userDefined: true,
          style: "text-decoration: underline;color: #409EFF; cursor: pointer;"
        },
        {
          prop: "checkStatus",
          label: "审核情况",
          type: "input",
          userDefined: true
        },
        {
          type: "btn",
          show: true,
          unChangeStatus: true,
          operating: true,
          label: "操作",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #0099ff;margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #0099ff;margin-right: 10px;"
              }
            ]
          }
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
            prop: "companyName",
            label: "企业名称",
            value: "",
            width: "100px",
            type: "input"
          },
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "100px",
            type: "select",
            ishow: '1'
          },
          {
            prop: "exhibitionPeriod",
            label: "期数",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "productType",
            label: "展品专区",
            value: "",
            width: "100px",
            type: "select"
          }
        ],
        dictionary: {
          exhibitionArea: [],
          exhibitionPeriod: [],
          productType: []
        }
      },
      // 传参
      searchParams: {
        current: 1,
        size: 10
      },
      searchDate: [],
      fatDate: []
    };
  },
  async created() {
    this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.searchParamsForm.dictionary.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    let companyInfo = {
      companyAttribute: [],
      companyType: []
    }; 
    companyInfo.companyAttribute = await kindo.dictionary.get('companyAttribute'); // 企业属性
    companyInfo.companyType = await kindo.dictionary.get('companyType'); // 企业类型
    await localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
  },
  mounted() {
    this.getData();
  },
  watch: {

  },
  computed: {
    ...mapGetters("supplementEnterprise", [
      "taskCloseList", // 查询工作部设置的规则相关的交易团
      "unioncompanyList"
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("supplementEnterprise", [
      "getTaskClosestatus", // 确认表彰交易团列表查询
      "getUnionCompanyApply",
      "getUnionIds"
    ]),
    ...mapActions("nainformation", [
      "getexhibitionInfoByCode" // 专区
    ]),
    //交易团下拉框
    newChange(val) {
      if (val) {
        for (let key in this.searchParamsForm.data) {
          if (this.searchParamsForm.data[key].prop === "productType" && this.searchParamsForm.data[key].type === "select") {
            this.searchParamsForm.data[key].value = "";
          }
        }
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val.value }).then(res => {
          let newDate = JSON.parse(JSON.stringify(res));
          this.searchParamsForm.dictionary.productType = newDate.map(item => {
            return { value: item.specialAreaName, label: item.specialAreaName };
          });
        }).catch(e => {});
      }
    },
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getTaskClosestatus(this.searchParams)
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
    // 处理操作按钮事件
    dealWithChangeStatusEvent(scope, operateItem, operate) {
      let temp = {};
      let _this = this;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.ownId = scope.row.demandRecordId;
      temp.taskId = scope.row.taskId;
      if (operate.prop === "pass") {
        temp.examineStatus = "1";
        temp.examineOpinion = "通过";
        this.$confirm("此操作将审核" + operate.label + ", 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.getUnionCompanyApply(temp).then(res => {
              _this.getData();
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      } else if (operate.prop === "nopass") {
        temp.examineStatus = "2";
        this.$prompt(
          "此操作将审核" + operate.label + "并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            temp.examineOpinion = value.value;
            _this.getUnionCompanyApply(temp).then(res => {
              _this.getData();
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    // 点击单元格获取信息
    cellClick(row, column, cell, event) {
      if (column.label === "联营企业") {
        this.getUnionIds(row.lastArry).then(res => {
          this.fatDate = res;
          this.btnDialogVisible = true;
        });
      }
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getTaskClosestatus(this.searchParams)
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
      this.getTaskClosestatus(this.searchParams)
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
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          if (formVal.value !== "") {
            this.searchParams.exhibitionArea = formVal.value;
            for (let key in this.searchParamsForm.dictionary.exhibitionArea) {
              if (
                this.searchParamsForm.dictionary.exhibitionArea[key].value === this.searchParams.exhibitionArea
              ) {
                this.searchParams.exhibitionAreaName = this.searchParamsForm.dictionary.exhibitionArea[
                  key
                ].label;
              }
            }
          } else {
            this.searchParams.exhibitionArea = "";
            this.searchParams.exhibitionAreaName = "";
          }
        }
        if (formVal.prop === "companyName" && formVal.type === "input") {
          this.searchParams.companyName = formVal.value;
        }
        if (formVal.prop === "exhibitionPeriod" && formVal.type === "select") {
          this.searchParams.exhibitionPeriod = formVal.value;
        }
        if (formVal.prop === "productType" && formVal.type === "select") {
          this.searchParams.productTypeName = formVal.value;
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
      this.getTaskClosestatus(obj)
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
    },
    // 关闭新增按钮
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getData();
    }
  }
};
</script>
