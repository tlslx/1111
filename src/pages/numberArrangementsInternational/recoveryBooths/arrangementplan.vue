<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="工作部制定用于表彰安排展位的安排方案" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <canBeEdit-table
        v-if="showDate"
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="reviewtData"
        @deal-with-operate="dealWithChangeStatusEvent"
      ></canBeEdit-table>
      <div style="line-height: 68px;">
          <div style="float: left;">
            <el-button type="primary" @click="download">下载</el-button>
            <el-button type="primary" @click="generateBooth">生成展位安排表</el-button>
          </div>
          <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
        <el-dialog title="编辑" :visible.sync="btnDialogVisible" width="30%;" style="float: left;">
          <eidtArrangementplan @closeModel="customsModal" :fatDate="fatDate"></eidtArrangementplan>
        </el-dialog>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import eidtArrangementplan from "./component/eidtArrangementplan";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    eidtArrangementplan
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      btnDialogVisible: false,
      fatDate: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "delegationName",
          label: "交易团(分团)",
          type: "input",
          userDefined: true
        },
        {
          prop: "initialNumber",
          label: "第127届总展位数",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothNumber",
          label: "获安排展位总数",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothType",
          label: "获安排展位类别",
          type: "input",
          userDefined: true
        }
      ],
      reviewtData: [
        {
          delegationName: "广东",
          initialNumber: 123,
          operating: true,
          BM02: "F"
        }
      ],
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
            prop: "allnum",
            label: "总展位数",
            value: "",
            width: "150px",
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
      searchDate: [],
      showDate: false,
      labelDate: []
    };
  },
  async created() {
    this.searchParamsForm.dictionary.delegation = await kindo.dictionary.get('delegation'); // 交易团
  },
  mounted() {
    this.getData();
    this.getScheduleheader();
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "arrangeList", // 查询工作部设置的规则相关的交易团
      "headerList",
      "preser"
    ])
  },
  watch: {
    headerList(newVal) {
      if (newVal.records.length > 0) {
        for (let key in newVal.records) {
          let headerDate = {};
          if (newVal.records[key].exhibitionArea) {
            headerDate.label = newVal.records[key].exhibitionArea;
            headerDate.prop = newVal.records[key].exhibitionAreaCode;
            headerDate.type = "input";
            headerDate.userDefined = true;
          }
          this.reviewTrDate.splice(key - 0 + 2, 0, headerDate);
        }
        let newBtn = {
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
                  "cursor: pointer;text-decoration: underline;color: #0099ff;margin-right: 4px;"
              }
              // {
              //   prop: "add",
              //   label: "保存",
              //   style:
              //     "cursor: pointer;text-decoration: underline;color: #0099ff;"
              // }
            ]
          }
        };
        this.reviewTrDate.push(newBtn);
      }
    },
    "arrangeList.page.data.records"(newVal) {
      if (newVal && newVal.length > 0) {
        this.reviewtData = JSON.parse(JSON.stringify(newVal));
        this.reviewtData.map(ele => {
          ele.operating = true;
        });
        this.reviewTrDate[1].label = "第" + (this.reviewtData[0].exhibitionSession - 1) + "届总展位数";
      } else {
        this.reviewtData = [];
      }
    },
    "arrangeList.commendBoothApplyInfoList.records"(newVal) {
      if (newVal && newVal.length > 0) {
        let addDate = JSON.parse(JSON.stringify(newVal));
        for (let key in this.reviewtData) {
          this.reviewtData[key].label = [];
          for (let i in addDate) {
            if (
              this.reviewtData[key].delegationName === addDate[i].delegationName
            ) {
              if (addDate[i].sequenceIndex) {
                this.reviewtData[key][addDate[i].exhibitionAreaCode] = addDate[i].sequenceIndex;
                addDate[i].newVal = "是";
              } else {
                this.reviewtData[key][addDate[i].exhibitionAreaCode] = "";
                addDate[i].newVal = "否";
              }
              this.reviewtData[key].label.push(addDate[i]);
            }
          }
        }
        this.showDate = true;
      }
    }
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getArrangementplan", // 确认表彰交易团列表查询
      "getScheduleheader",
      "getPreservation"
    ]),
    // 初始化调用接口
    getData() {
      // this.getScheduleheader(this.searchParams);
      this.loading = true;
      this.getArrangementplan(this.searchParams)
        .then(response => {
          // // this.reviewtData = response.records;
          if (response.page.data.total > 0) {
            this.pageInfo.currentPage = response.page.data.current;
            this.pageInfo.total = response.page.data.total;
          } else if (response.page.data.total === 0) {
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
      this.getArrangementplan(this.searchParams)
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
      this.getArrangementplan(this.searchParams)
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
      });
      this.loading = true;
      this.getArrangementplan(temp)
        .then(res => {
          _this.loading = false;
          if (res.page.data.total > 0) {
            this.pageInfo.currentPage = res.page.data.current;
            this.pageInfo.pageSize = 10;
            this.pageInfo.total = res.page.data.total;
          } else if (res.page.data.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
            this.reviewtData = res.records;
          }
        })
        .catch(e => {
          _this.loading = false;
        });
      // }
    },
    // 关闭新增按钮
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getData();
    },
    // 表格按钮操作
    dealWithChangeStatusEvent(scope, operateItem, operate) {
      if (operate.prop === "edit") {
        this.btnDialogVisible = true;
        for (let key in scope.row.label) {
          scope.row.label[key].boothNumber = scope.row.label[key].boothNumber - 0;
        }
        this.fatDate = scope.row;
      }
      //  else if (operate.prop === "add") {
      //   this.getPreservation(scope.row.delegationId).then(res => {
      //     this.$message({
      //       type: "success",
      //       message: "保存成功!"
      //     });
      //     this.getData();
      //   });
      //   scope.row.operating = false;
      // }
    },
    //下载
    download() {
      window.open(`${process.env.API_NA_URL}/api/commendArrange/getCommendApplyPlanInfo/download?token=${this.$store.state.token}`, '_blank');
    },
    //跳转生成展位安排表
    generateBooth() {
      this.$router.push({
        path: '/boothSchedulelist'
      });
    }
  }
};
</script>
