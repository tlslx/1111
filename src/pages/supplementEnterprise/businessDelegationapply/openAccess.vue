<style lang="less" scoped>
/deep/.el-dialog {
  width: 30%;
}
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="工作部开放交易团补录权限及时间窗口" name="first"></el-tab-pane>
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
        :tableData="openaccessList.records"
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
      <el-dialog title="编辑" :visible.sync="btnDialogVisible" width="30%;">
        <editOpenaccess @closeModal="customsModal" :fatDate="fatDate"></editOpenaccess>
      </el-dialog>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import editOpenaccess from "./component/editOpenaccess";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    editOpenaccess
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      // 表头数据
      reviewTrDate: [
        {
          prop: "exhibitionSession",
          label: "届数",
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
          prop: "delegationName",
          label: "补录类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "delegationName",
          label: "权限开始时间",
          type: "input",
          userDefined: true
        },
        {
          prop: "delegationName",
          label: "权限截止时间",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionAreaName",
          label: "展区",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyName",
          label: "企业名称",
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
                prop: "edit",
                label: "编辑",
                style:
                  "cursor: pointer;text-decoration: underline;color: #0099ff;margin-right: 10px;"
              },
              {
                prop: "remove",
                label: "删除",
                style:
                  "cursor: pointer;text-decoration: underline;color: #0099ff;"
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
        variate: "delegation",
        data: [
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "exhibitionSession",
            label: "补录类型",
            value: "",
            width: "100px",
            type: "input"
          },
          {
            prop: "exhibitionSession",
            label: "届数",
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
          delegation: []
        }
      },
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
    let dictData = JSON.parse(localStorage.getItem("dictData"));
    let Mapdata = dictData.delegation.map(item => {
      return { value: item.value, label: item.text };
    });
    let exhibitionArea = dictData.delegation.map(item => {
      return { value: item.value, label: item.text };
    });
    this.searchParamsForm.dictionary.delegation = Mapdata;
    this.searchParamsForm.dictionary.exhibitionArea = exhibitionArea;
  },
  mounted() {
    this.getData();
  },
  watch: {
    "commendationList.records"(newVal) {
      if (newVal && newVal.length > 0) {
        this.reviewtData = JSON.parse(JSON.stringify(newVal));
        this.reviewtData.map(ele => {
          ele.operating = true;
        });
      }
    }
  },
  computed: {
    ...mapGetters("supplementEnterprise", [
      'openaccessList'
       // 查询工作部设置的规则相关的交易团
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("supplementEnterprise", [
      "getOpenAccess" // 确认表彰交易团列表查询
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getOpenAccess(this.searchParams)
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
      if (operate.prop === "edit") {
        scope.row.isEdit = false;
        scope.row.operateType = "icon";
        this.btnDialogVisible = true;
        this.fatDate = scope.row;
      }
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getlistCommendation(this.searchParams)
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
      this.getlistCommendation(this.searchParams)
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
        if (formVal.type === "input") {
          if (!isNaN(formVal.value - 0)) {
            this.searchParams.exhibitionSession = formVal.value;
          } else {
            this.$message.error("届数请输入数字");
            formVal.value = '';
          }
        }
      });
      if (
        !isNaN(this.searchParams.exhibitionSession) || this.searchParams.exhibitionSession === ""
      ) {
        this.loading = true;
        this.getlistCommendation(temp)
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
    },
    // 关闭新增按钮
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getData();
    }
  }
};
</script>
