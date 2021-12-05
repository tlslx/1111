
/**
 * @file 申请方查看审核进度
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="联合布展" name="0">
      <div v-loading="loading">
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
          :dictionary="osDictionaryData"
          @select-params="selectParams"
        ></search-param-link>
        <cust-table
          :cols="cols"
          :data="tableData"
          :loading="loading"
          @deal-with-diff-event="dealWithDiffEvent"
        ></cust-table>
        <div class="associa-recom-btn-container">
          <el-button class="recommend-btn" @click="pass">申请联合布展</el-button>
          <pagination
            class="page-bar"
            :pageInfo="pageInfo"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"
          ></pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import { $helper } from '@/scripts/project/utils';
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
            prop: "approveResult",
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
      // 查询传参需要
      searchParams: {
        "unionExhibitionInfoSession": {
          "type": "",
          "phase": "",
          "approveResult": "",
          "boothNo": "",
          "companyId": localStorage.getItem("getComPanyId"),
          "createSession": "125"
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 传参需要
      initParams: {
        "unionExhibitionInfoSession": {
          "type": "",
          "phase": "",
          "approveResult": "",
          "boothNo": "",
          "companyId": localStorage.getItem("getComPanyId"),
          "createSession": "125"
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 表格数据
      tableData: {
        data: []
      },
      // 表头数据
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
          changeByCondition: true,
          btns: [
            {
              type: "detail",
              label: "详细"
            },
            {
              type: "delete",
              label: "删除"
            },
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "confirm",
              label: "确认"
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
  computed: {
    ...mapGetters('companyApplyUnionExhibition', ['getUnionExhibition', 'deleteByApplyCodeInfo']),
    ...mapGetters('dictionary', ['osDictionaryData'])
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
        this.tableData = res.records;
      }
    });
  },
  methods: {
    ...mapActions('companyApplyUnionExhibition', ['getUnionExhibitionInfo', 'deleteByApplyCodeData']),
    // 重置查询分页参数
    initSearchParamsPageInfo() {
      this.searchParams.pageStart = 1;
      this.searchParams.pageSize = 10;
    },
    // 搜索组件返回的数据
    selectParams() {
      let _this = this;
      let temp = this.searchParams;
      this.loading = true;
      // 判断查询条件
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.type === 'select' && formVal.prop === 'phase') {
          this.searchParams.unionExhibitionInfoSession.phase = formVal.value;
        }
        if (formVal.prop === 'approveResult' && formVal.type === 'select') {
          this.searchParams.unionExhibitionInfoSession.approveResult = formVal.value;
        }
        if (formVal.type === 'select' && formVal.prop === 'boothNo') {
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
          this.tableData = res.records;
        }
      }).catch(e => {
        _this.loading = false;
      });
    },
    // 处理按钮数据
    dealWithDiffEvent(eventType, scope) {
      if (eventType === 'edit') {
        this.editData(scope);
      } else if (eventType === 'delete') {
        this.deleteData(scope);
      } else if (eventType === 'detail') {
        this.detailData(scope);
      } else if (eventType === 'confirm') {
        this.confirmData(scope);
      }
    },
    // 确认按钮
    confirmData(scope) {
      this.$router.push({
        name: "联合方确认",
        params: {
          applyCode: scope.row.applyCode
        }
      });
    },
    // 编辑数据
    editData(scope) {
      this.$router.push({
        name: "企业申请联合布展业务",
        params: {
          applyCode: scope.row.applyCode,
          type: "editbtn"
        }
      });
    },
    // 删除数据
    deleteData(scope) {
      let _this = this;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          applyCompanyId: scope.row.applyCompanyId,
          applyCode: scope.row.applyCode
        };
        this.deleteByApplyCodeData(param).then(res => {
          this.$message.success("删除成功");
          this.getUnionExhibitionInfo(this.initParams).then(rest => {
            if (rest.total > 0) {
              this.pageInfo.currentPage = rest.current;
              this.pageInfo.pageSize = 10;
              this.pageInfo.total = rest.total;
            } else if (rest.total === 0) {
              this.pageInfo.currentPage = 1;
              this.pageInfo.total = 0;
            }
          });
          _this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 查看详情数据
    detailData(scope) {
      // 路由传参
      this.$router.push({
        name: "申请方确认",
        path: "/applicantconsortiumConfirm",
        params: {
          applyCode: scope.row.applyCode
        }
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
      this.$router.push({
        name: "企业申请联合布展业务",
        path: "/enterprisesApplyExhibition",
        params: {
          type: "passbtn"
        }
      });
    }
  },
  watch: {
    "getUnionExhibition.data"(newVal) {
      if (newVal && newVal.length > 0) {
        this.tableData.data = JSON.parse(JSON.stringify(newVal));
        this.tableData.data.forEach((value, index) => {
          if (value.type === '申请方' && !value.approveResult) {
            value.detail = true;
            value.delete = true;
            value.edit = true;
            value.class = 'underline-red';
          }
          if (value.type === '申请方' && value.otherCompanyOpinion === "都已确认" || value.otherCompanyOpinion === "有企业不同意") {
            value.detail = true;
            value.delete = false;
            value.edit = false;
            value.class = 'underline-red';
          }
          if (value.type === '申请方') {
            value.detail = true;
            value.delete = true;
            value.class = 'underline-red';
          }
          if (value.type === '联合方') {
            value.detail = true;
            value.confirm = true;
            value.class = 'underline-red';
          }
          if (value.type === '联合方' && value.otherCompanyOpinion === '都已确认') {
            value.detail = true;
            value.confirm = false;
            value.class = 'underline-red';
          }
          if (value.approveResult == null) {
            value.approveResult = '待审核';
          } else {
            value.approveResult = $helper.getDicLabel(this.osDictionaryData.approveResult, value.approveResult);
          }
        });
      }
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
.tip {
  margin: 5px;
  padding: 10px;
  background-color: #ffffdf;
  color: #cc003b;
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
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
