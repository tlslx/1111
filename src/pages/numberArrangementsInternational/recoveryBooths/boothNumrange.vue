<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="组展表彰展位安排" name="first"></el-tab-pane>
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
        :rules="rules"
        :tableData="reviewtData"
        :newSummary="newSummary"
        :dictionaryData="dictionaryData"
        @deal-with-change-status-event="dealWithChangeStatusEvent"
      ></canBeEdit-table>
      <div style="line-height: 68px; display: flex; justify-content: space-between;">
        <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="btnDialogVisible = true">新增</el-button>
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
        <el-dialog title="新增" :visible.sync="btnDialogVisible" width="30%;" style="float: left;">
          <btnDialog @closeModal="customsModal"></btnDialog>
        </el-dialog>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import btnDialog from "./component/addNumrange";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    btnDialog
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      newSummary: true,
      // 表头数据
      reviewTrDate: [
        {
          prop: "exhibitionSession",
          label: "届数",
          type: "number",
          userDefined: true,
          editTable: true,
          maxlength: 3
        },
        {
          prop: "exhibitionArea",
          label: "展区",
          type: "select",
          userDefined: true
        },
        {
          prop: "boothNumber",
          label: "数量",
          type: "number",
          editTable: true,
          maxlength: 11
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          changeStatus: true,
          operations: [
            {
              prop: "edit",
              label: "编辑",
              type: "text",
              class: "primary"
            },
            {
              prop: "remove",
              label: "删除",
              type: "text",
              class: "warning"
            },
            {
              prop: "confirm",
              type: "icon",
              iconName: "el-icon-check",
              class: "confirm"
            }
          ]
        }
      ],
      rules: {
        boothNumber: [
          // { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      },
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
            prop: "exhibitionSession",
            label: "届数",
            value: "",
            width: "80px",
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
          exhibitionArea: []
        }
      },
      dictionaryData: {
        exhibitionArea: []
      },
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      },
      searchDate: [],
      haveDate: false
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
      this.dictionaryData.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
    // let dictData = await kindo.dictionary.get('exhibitionArea'); 
    // let Mapdata = dictData.map(item => {
    //   return { value: item.value, text: item.label };
    // });
    // this.dictionaryData.exhibitionArea = Mapdata;
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "List" // 查询工作部设置的规则相关的交易团
    ])
  },
  watch: {
    "List.records"(newVal) {
      if (newVal && newVal.length > 0) {
        this.reviewtData = JSON.parse(JSON.stringify(newVal));
        this.reviewtData.map(ele => {
          ele.operateType = "text";
          ele.isEdit = false;
        });
      }
    }
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getlistAllOrdinary", // 查询展位数量及范围
      "getDeleNumregiste", // 删除展位数量及范围
      "getEditNumregiste" // 编辑展位数量及范围
    ]),
    ...mapActions('nainformation', ['getexhibitionArea']),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getlistAllOrdinary(this.searchParams)
        .then(response => {
          if (response.total > 0) {
            this.pageInfo.currentPage = response.current;
            this.pageInfo.total = response.total;
            // 查询下拉框塞入数据
            // let arryDate = [];
            // response.records.forEach((val, index) => {
            //   let newDate = {};
            //   if (val.exhibitionArea && val.exhibitionAreaCode) {
            //     newDate.label = val.exhibitionArea;
            //     newDate.value = val.exhibitionAreaCode;
            //   }
            //   arryDate.push(newDate);
            // });
            // 去重
            // let obj = {};
            // this.searchParamsForm.dictionary.exhibitionArea = arryDate.reduce(
            //   (cur, next) => {
            //     obj[next.value]
            //       ? ""
            //       : (obj[next.value] = true && cur.push(next));
            //     return cur;
            //   },
            //   []
            // );
            // this.haveDate = true;
          } else if (response.total === 0) {
            this.reviewtData = res.records;
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
    dealWithChangeStatusEvent(scope, operateItem) {
      if (operateItem.prop === "edit") {
        scope.row.isEdit = true;
        scope.row.operateType = "icon";
      } else if (operateItem.prop === "confirm") {
        if (scope.row.exhibitionSession === '' || scope.row.boothNumber === '' || (scope.row.exhibitionSession - 0) === 0) {
          this.$message.error('届数或数量不能为空或届数不能为0!');
        } else {
          this.editData(scope);
          scope.row.isEdit = false;
          scope.row.operateType = "text";
        }
      } else {
        this.delData(scope);
      }
    },
    // 编辑按钮
    editData(scope) {
      // let newArea = "";
      this.dictionaryData.exhibitionArea.map(el => {
        if (el.value === scope.row.exhibitionArea) {
          scope.row.exhibitionAreaCode = el.value;
          scope.row.exhibitionArea = el.text;
        }
      });
      let param = {
        areaRewardId: scope.row.areaRewardId,
        exhibitionSession: scope.row.exhibitionSession,
        boothNumber: scope.row.boothNumber,
        operatorId: this.$store.getters.userInfo.userId,
        operatorName: this.$store.getters.userInfo.userName,
        exhibitionAreaCode: scope.row.exhibitionAreaCode,
        exhibitionArea: scope.row.exhibitionArea
      };
      this.getEditNumregiste(param).then(res => {
        this.loading = false;
        this.getData();
        this.$message({
          type: "success",
          message: "编辑成功!"
        });
      });
    },
    // 移除数据
    delData(scope) {
      let _this = this;
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.getDeleNumregiste(scope.row.areaRewardId).then(res => {
            _this.getData();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getlistAllOrdinary(this.searchParams)
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
      this.getlistAllOrdinary(this.searchParams)
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
          this.searchParams.exhibitionArea = formVal.value;
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
      if (!isNaN(this.searchParams.exhibitionSession - 0) || this.searchParams.exhibitionSession === ""
      ) {
        this.loading = true;
        this.getlistAllOrdinary(temp)
          .then(res => {
            _this.loading = false;
            if (res.total > 0) {
              this.pageInfo.currentPage = res.current;
              this.pageInfo.pageSize = 10;
              this.pageInfo.total = res.total;
            } else if (res.total === 0) {
              this.reviewtData = res.records;
              this.pageInfo.currentPage = 1;
              this.pageInfo.total = 0;
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



