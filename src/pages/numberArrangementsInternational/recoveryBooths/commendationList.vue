<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="确定表彰对象交易团列表" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        :newSummary='newSummary'
        @select-params="selectParams"
        @new-params='onSubmit'
      ></search-param-link>
      <canBeEdit-table
        :loading="loading"
        :selection ='selection'
        :isSelectable ='isSelectable'
        :tableTrData="reviewTrDate"
        :tableData="reviewtData"
        @deal-with-operate="dealWithChangeStatusEvent"
        @change-multiple-selection ='selectAll'
      ></canBeEdit-table>
      <div style="line-height: 68px; display: flex; justify-content: space-between;">
        <div>
          <el-button style="height: 32px; margin-top: 20px;" type="danger" @click="openApplication" >放开申请</el-button>
          <el-button style="height: 32px; margin-top: 20px;" @click="addcommend" type="primary" >新增</el-button>
        </div>
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
        <el-dialog title="编辑" :visible.sync="btnDialogVisible" width="30%;" style="float: left;">
          <openApplication @closeModal="customsModal" :fatDate="fatDate"></openApplication>
        </el-dialog>
        <el-dialog title="新增" :visible.sync="addVisible" width="30%;" style="float: left;">
          <addcommend @closeModal="closeAdd" :fatDate="fatDate"></addcommend>
        </el-dialog>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import openApplication from "./component/openApplication";
import addcommend from "./component/addcommend";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    openApplication,
    addcommend
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      selection: true,
      addVisible: false,
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
          type: "btn",
          show: true,
          unChangeStatus: true,
          operating: true,
          label: "操作",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "beginToReview",
                label: "编辑",
                style:
                  "cursor: pointer;text-decoration: underline;color: #0099ff;margin-right: 10px;"
              },
              {
                prop: "remove",
                label: "删除",
                style:
                  "cursor: pointer;text-decoration: underline;color: red;"
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
            label: "届数",
            value: "",
            width: "100px",
            maxlength: '3',
            type: "input"
          }
        ],
        dictionary: {
          delegation: []
        }
      },
      newSummary: false,
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10
      },
      searchDate: [],
      fatDate: {},
      NoticeDate: []
    };
  },
  async created() {
    this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
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
    ...mapGetters("boothNumrange", [
      "commendationList", // 查询工作部设置的规则相关的交易团
      'listCommendation', // 获取表彰交易团列表
      'removeapplicationList', // 确认表彰交易团列表删除操作
      'confirmationList'  ///放开申请
    ])
    // ...mapGetters('dictionary', ['dictionaryData'])// 数据字典
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getlistCommendation", // 确认表彰交易团列表查询
      "getListOpenApplication", // 获取表彰交易团列表
      'getRemoveApplication',  // 确认表彰交易团列表删除操作
      'getConfirmationopenApplication' //放开申请
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getlistCommendation(this.searchParams)
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
      if (operate.prop === "beginToReview") {
        scope.row.isEdit = false;
        scope.row.operateType = "icon";
        this.btnDialogVisible = true;
        this.fatDate = scope.row;
      } else if (operate.prop === "remove") {
        scope.row.isEdit = false;
        this.getRemoveApplication({ delegationRewardId: scope.row.delegationRewardId }).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getData();
        });
      }
    },
    // 获取按钮
    onSubmit() {
      this.getListOpenApplication().then((res) => {
        // console.log(res, 'kkk');
      });
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
    },
    // 全选按钮
    isSelectable(row, index) {
      if (row.openStatus === '1') {
        return false;
      } else {
        return true;
      }
    },
    selectAll(val) {
      this.NoticeDate = val;
    },
    //新增弹框
    addcommend() {
      this.addVisible = true;
    },
    //关闭新增弹框
    closeAdd() {
      this.addVisible = false;
      this.getData();
    },
    //放开申请
    openApplication() {
      if (this.NoticeDate.length !== 0) {
        let newDate = [];
        for (let key in this.NoticeDate) {
          let temp = {};
          temp.operatorId = this.$store.getters.userInfo.userId;
          temp.operatorName = this.$store.getters.userInfo.userName;
          temp.delegationRewardId = this.NoticeDate[key].delegationRewardId;
          newDate.push(temp);
        }
        this.getConfirmationopenApplication(newDate).then((res) => {
          if (res === 'success') {
            this.$message({
              type: "success",
              message: "放开申请成功!"
            });
            this.getData();
          } else {
            this.$message.error(res);
            this.getData();
          }
        });
      } else {
        this.$message.error('请选择需要放开申请的交易团');
      }
    }
  }
};
</script>