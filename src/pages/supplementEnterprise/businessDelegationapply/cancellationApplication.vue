<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="交易团提交追加撤销联营申请" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate" 
        :dictionary="searchParamsForm.dictionary" 
        @new-onchange='newChange'
        @select-params="selectParams">
      </search-param-link>
      <canBeEdit-table :loading="loading" :tableTrData="reviewTrDate" :tableData="openaccessList.records" @deal-with-operate="dealWithChangeStatusEvent"></canBeEdit-table>
      <div style="line-height: 68px;">
        <pagination class="pages" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
      </div>
      <el-dialog title="编辑" :visible.sync="btnDialogVisible" width="30%;">
        <editCancellation @closeModal="customsModal" :demandRecordId='demandRecordId'></editCancellation>
      </el-dialog>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import editCancellation from "./component/editCancellation";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    editCancellation
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      demandRecordId: {},
      // 表头数据
      reviewTrDate: [
        // {
        //   prop: "exhibitionSession",
        //   label: "企业编码",
        //   type: "input",
        //   userDefined: true
        // },
        {
          prop: "companyName",
          label: "企业名称",
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
          prop: "productTypeName",
          label: "展品专区",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothNumber",
          label: "申请数量",
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
          prop: "processCloseStatus",
          label: "任务状态",
          type: "input",
          userDefined: true
        },
        {
          prop: "checkStatus",
          label: "联营企业审核情况",
          type: "input",
          userDefined: true
        },
        {
          prop: "unionNameOne",
          label: "联营企业1",
          type: "input",
          userDefined: true
        },
        {
          prop: "unionNameTwo",
          label: "联营企业2",
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
            width: "140px",
            type: "select"
          },
          {
            prop: "productType",
            label: "展品专区",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "processCloseStatus",
            label: "任务状态",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "checkStatus",
            label: "联营企业审核情况",
            value: "",
            width: "140px",
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
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      },
      processCloseStatus: [
        {
          value: "0",
          label: "未完成"
        },
        {
          value: "1",
          label: "已完成"
        },
        {
          value: "2",
          label: "未提交审批"
        }
      ],
      checkStatus: [
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "已通过"
        },
        {
          value: "2",
          label: "审核不通过"
        }
      ],
      searchDate: []
    };
  },
  async created() {
    this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.searchParamsForm.dictionary.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
  },
  mounted() {
    this.searchParamsForm.dictionary.checkStatus = this.checkStatus;
    this.searchParamsForm.dictionary.processCloseStatus = this.processCloseStatus;
    this.getData();
  },
  computed: {
    ...mapGetters("supplementEnterprise", [
      "openaccessList" // 1.	交易团提交追加撤销联营企业申请列表
    ])
  },
  methods: {
    ...mapActions("supplementEnterprise", [
      "getOpenAccess", // 1.	交易团提交追加撤销联营企业申请列表
      'getApplicationJointventure'
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
        let temp = {
          demandRecordId: scope.row.demandRecordId,
          companyId: scope.row.companyId
        };
        this.demandRecordId = temp;
        this.btnDialogVisible = true;
      }
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getOpenAccess(this.searchParams)
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
      this.getOpenAccess(this.searchParams)
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
                this.searchParams.exhibitionAreaName = this.searchParamsForm.dictionary.exhibitionArea[key].label;
              }
            }
          } else {
            this.searchParams.exhibitionArea = "";
            this.searchParams.exhibitionAreaName = "";
          }
        }
        if (formVal.prop === "exhibitionPeriod" && formVal.type === "select") {
          this.searchParams.exhibitionPeriod = formVal.value;
        }
        if (formVal.prop === "processCloseStatus" && formVal.type === "select") {
          this.searchParams.processCloseStatus = formVal.value;
        }
        if (formVal.prop === "checkStatus" && formVal.type === "select") {
          this.searchParams.checkStatus = formVal.value;
        }
        if (formVal.prop === "companyName" && formVal.type === "input") {
          this.searchParams.companyName = formVal.value;
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
      this.getOpenAccess(obj)
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
