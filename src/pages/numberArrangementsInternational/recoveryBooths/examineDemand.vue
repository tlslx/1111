<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="审核交易团申请" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <canBeEdit-table
        :loading="loading"
        :selection ='selection'
        :isSelectable ='isSelectable'
        :tableTrData="reviewTrDate"
        :tableData="newDate.data"
        @deal-with-operate="dealWithChangeStatusEvent"
        @change-multiple-selection ='selectAll'
      ></canBeEdit-table>
      <div style="line-height: 68px;display: flex; justify-content: space-between;">
        <div>
          <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="passbtn" >通过</el-button>
          <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="nopassbtn">不通过</el-button>
        </div>
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
        <el-dialog title="审核" :visible.sync="btnDialogVisible" width="30%;" style="float: left;">
          <nopass @closeModel="customsModal" :fatDate="fatDate"></nopass>
        </el-dialog>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import nopass from "./component/nopass";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    nopass
  },
  data() {
    return {
      activeName: "first",
      selection: true,
      btnDialogVisible: false,
      loading: false,
      NoticeDate: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "delegationName",
          label: "交易团",
          type: "string"
        },
        {
          prop: "details",
          label: "申报详情",
          type: "string"
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
        },
        // {
        //   prop: "operation",
        //   type: "operator",
        //   label: "操作",
        //   changeByCondition: true,
        //   btns: [
        //     {
        //       prop: "pass",
        //       label: "通过",
        //       type: "text"
        //     },
        //     {
        //       prop: "nopass",
        //       label: "不通过",
        //       type: "text"
        //     }
        //   ]
        // },
        {
          prop: "examineOpinion",
          label: "审核意见",
          type: "string"
        },
        {
          prop: "examineStatus",
          label: "审核状态",
          type: "string"
        }
      ],
      newDate: {
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
        variate: "finalApproveStatus",
        data: [
          {
            prop: "delegation",
            label: "交易团",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "finalApproveStatus",
            label: "审核状态",
            value: "01",
            width: "100px",
            type: "select"
          }
        ],
        dictionary: {
          delegation: [],
          finalApproveStatus: []
        }
      },
      // 传参
      searchParams: {
        current: 1,
        size: 10,
        examineStatus: 0
      },
      searchDate: [],
      fatDate: {}
    };
  },
  async created() {
    this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
  },
  mounted() {
    // 审核状态字典
    let dictData = JSON.parse(localStorage.getItem("dictData"));
    let finalApproveStatus = dictData.finalApproveStatus.map(item => {
      return { value: item.value, label: item.text };
    });
    this.searchParamsForm.dictionary.finalApproveStatus = finalApproveStatus;
    this.getData();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "declaredList", // 查询工作部审核交易团申请
      'updatecommend'
    ])
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getDeclaredDemand", // 查询工作部审核交易团申请
      'getUpdateCommend'
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getDeclaredDemand(this.searchParams)
        .then(response => {
          this.newDate.data = JSON.parse(JSON.stringify(response.records));
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
    dealWithChangeStatusEvent(eventType, scope) {
      if (scope === "pass") {
        this.fatDate.eventType = 1;
        let formName = {};
        formName["recordId"] = eventType.row.recordId;
        formName["examineUserId"] = this.$store.getters.userInfo.userId;
        formName["examineUserCn"] = this.$store.getters.userInfo.userName;
        formName["operatorId"] = this.$store.getters.userInfo.userId;
        formName["operatorName"] = this.$store.getters.userInfo.userName;
        formName["examineStatus"] = this.fatDate.eventType;
        this.getUpdateCommend(formName).then((res) => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.getData();
        });
      } else {
        this.btnDialogVisible = true;
        this.fatDate.eventType = 2;
        this.fatDate.row = eventType.row;
      }
    },
    // 修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      this.getDeclaredDemand(this.searchParams)
        .then(res => {
          this.newDate.data = JSON.parse(JSON.stringify(res.records));
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
      this.getDeclaredDemand(this.searchParams)
        .then(res => {
          this.newDate.data = JSON.parse(JSON.stringify(res.records));
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 模糊查询
    selectParams() {
      let temp = this.searchParams;
      this.searchParams.current = 1;
      this.searchParams.size = 10;
      this.pageInfo.pageSize = 10;
      let _this = this;
      this.loading = true;
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (
          formVal.prop === "finalApproveStatus" && formVal.type === "select"
        ) {
          // console.log(formVal.value, 'kkk');
          if (formVal.value === "01") {
            this.searchParams.examineStatus = 0;
          } else if (formVal.value === "02") {
            this.searchParams.examineStatus = 2;
          } else if (formVal.value === "03") {
            this.searchParams.examineStatus = 1;
          } else {
            this.searchParams.examineStatus = '';
          }
        }
        if (formVal.prop === "delegation" && formVal.type === "select") {
          this.searchParams.delegationId = formVal.value;
        }
      });
      this.getDeclaredDemand(temp)
        .then(res => {
          _this.loading = false;
          this.newDate.data = JSON.parse(JSON.stringify(res.records));
          if (res.total > 0) {
            this.pageInfo.currentPage = res.current;
            this.pageInfo.pageSize = 10;
            this.pageInfo.total = res.total;
          } else if (res.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
            this.newDate.data = res.records;
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
    },
     // 全选按钮
    isSelectable(row, index) {
      if (row.examineStatus !== '未审核') {
        return false;
      } else {
        return true;
      }
    },
    selectAll(val) {
      this.NoticeDate = val;
    },
    //批量通过
    passbtn() {
      if (this.NoticeDate.length > 0) {
        let newDate = [];
        for (let key in this.NoticeDate) {
          let temp = {};
          temp.recordId = this.NoticeDate[key].recordId;
          temp.examineUserCn = this.$store.getters.userInfo.userName;
          temp.examineUserId = this.$store.getters.userInfo.userId;
          temp.operatorName = this.$store.getters.userInfo.userName;
          temp.operatorId = this.$store.getters.userInfo.userId;
          temp.examineStatus = 1;
          newDate.push(temp);
        }
        this.getUpdateCommend(newDate).then((res) => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.getData();
        });
      } else {
        this.$message.error('请选择需要通过的交易团!');
      }
    },
    //批量不通过
    nopassbtn() {
      if (this.NoticeDate.length > 0) {
        this.btnDialogVisible = true;
        this.fatDate.row = this.NoticeDate;
        this.fatDate.eventType = 2;
        this.fatDate.isshow = true;
      } else {
        this.$message.error('请选择需要通过的交易团!');
      }
    }
  },
  watch: {
    'newDate.data'(newVal) {
      if (newVal && newVal.length > 0) {
        newVal.forEach((value, index) => {
          if (value.examineStatus !== '未审核') {
            value.operating = false;
          } else {
            value.operating = true;
            value.nopass = true;
            value.pass = true;
            value.class = "underline-blue";
          }
        });
      }
    }
  }
};
</script>
