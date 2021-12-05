<style scoped>
/* 打印时去掉页眉页脚、以及按钮等不需要打印的元素  */
@media print {
  .printBtn {
    display: none;
  }
}
@page {
  margin: 0;
}
</style>
<template>
  <el-tabs v-model="activeName" class="declaredDemand">
    <el-tab-pane label="填写申报需求" name="first"></el-tab-pane>
    <el-card class="box-card">
      <div>
        <h4 style="text-align: center;">展位类别申报表</h4>
        <div>
          <p>请根据本团展位需求勾选</p>
          <p>
            <el-radio v-model="radio" label="1">1.无相关类别展位需求,本团自愿放弃本次奖励展位安排</el-radio>
          </p>
          <p>
            <el-radio v-model="radio" label="2">2.有相关类别展位需求,具体如下:</el-radio>
          </p>
        </div>
      </div>
      <div>
        <el-table :data="reviewtData" style="width: 100%" stripe border v-loading="loading" size="mini">
          <el-table-column label="展位类别" prop="exhibitionArea"></el-table-column>
          <el-table-column label="是否需求" prop="demand">
            <template slot-scope="scope">
              <el-select v-model="scope.row.demand" placeholder="请选择" :disabled="havuedemand">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="申报优先次序（A/B/C/D/E/F/G/H/I）" prop="sequenceIndex">
            <template slot-scope="scope" v-if="scope.row.demand === 1 || scope.row.demand == undefined">
              <el-select v-model="scope.row.sequenceIndex" placeholder="请选择" :disabled="havuedemand">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <p style="text-indent:2em;">备注：以A-I的字母顺序代表有限次序，即A代表最需要的展位类别，B次之，以此类推；如某类别无需求，请在是否有需求一栏选择否，申报优先次序一栏无需填写。若某展位类别无需求，则视为放弃该类别展位安排。</p>
        <p style="text-indent:2em;">申报一旦获取安排，第xxx届广交会不得退回，有效期至下次一般性展位数量重合为止。</p>
      </div>
      <div class="printBtn">
        <div style="float: left;">
          <el-button type="primary" @click="download">下载</el-button>
          <el-button @click="print()">打印</el-button>
        </div>
        <div style="text-align: center;">
          <el-button type="primary" @click="preservation(reviewtData)">保存</el-button>
          <el-button @click="cancel(reviewtData)">取消</el-button>
        </div>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import openApplication from "./component/openApplication";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination,
    openApplication
  },
  data() {
    return {
      havuedemand: false,
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      radio: "2",
      options: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 2,
          label: "否"
        }
      ],
      options1: [
        {
          value: "A",
          label: "A"
        },
        {
          value: "B",
          label: "B"
        },
        {
          value: "C",
          label: "C"
        },
        {
          value: "D",
          label: "D"
        },
        {
          value: "E",
          label: "E"
        },
        {
          value: "F",
          label: "F"
        },
        {
          value: "G",
          label: "G"
        },
        {
          value: "H",
          label: "H"
        },
        {
          value: "I",
          label: "I"
        }
      ],
      // 表头数据
      reviewTrDate: [
        {
          prop: "exhibitionSession",
          label: "展位类别",
          type: "input",
          userDefined: true
        },
        {
          prop: "nodemand",
          label: "是否有需求",
          type: "select",
          userDefined: true
        },
        {
          prop: "delegationName",
          label: "申请优报次序(A/B/C/D/E/F/G/H/I)",
          type: "select",
          userDefined: true
        }
      ],
      reviewtData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      newSummary: true,
      // 传参
      searchParams: {
        value: "",
        value1: ""
        // exhibitionArea: "",
        // exhibitionSession: "",
        // current: 1,
        // size: 10
      },
      searchDate: [],
      fatDate: {}
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    radio(newVal, oldVal) {
      if (newVal === "1") {
        this.havuedemand = true;
        this.getData();
      } else {
        this.havuedemand = false;
      }
    }
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "demandList" // 查询工作部设置的规则相关的交易团
    ])
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getDeclareDemand", // 确认表彰交易团列表查询
      "getPreservationDemand" // 保存表彰交易团列表查询
    ]),
    // 确定按钮
    preservation(val) {
      if (this.radio === '2') {
        let isshow = true;
        for (let key in val) {
          if (val[key].demand === 2) {
            val[key].sequenceIndex = '';
          }
          val[key].delegationId = this.$store.getters.userInfo.workDeptCode;
          val[key].operatorId = this.$store.getters.userInfo.userId;
          val[key].operatorName = this.$store.getters.userInfo.userName;
          if (val[key].demand === '' && val[key].sequenceIndex === '') {
            isshow = false;
            break;
          } else if (val[key].demand === 1 && val[key].sequenceIndex === '') {
            isshow = false;
            break;
          } else if (val[key].demand === 1 && val[key].sequenceIndex === undefined) {
            isshow = false;
            break;
          } else {
            isshow = true;
          }
        }
        if (isshow === true) {
          this.getPreservationDemand(val).then(res => {
            this.$message({
              type: "success",
              message: "保存成功"
            });
            this.getData();
          });
        } else {
          this.$message.error('请将"是否需求"或"申报优先次序（A/B/C/D/E/F/G/H/I）"补充完整');
        }
      }
    },
    // 取消按钮
    cancel(val) {
      for (let key in val) {
        if (val[key].sequenceIndex || val[key].demand) {
          val[key].demand = "";
          val[key].sequenceIndex = "";
        }
      }
      this.reviewtData = val;
    },
    // 初始化调用接口
    getData() {
      this.loading = true;
      let newParam = {};
      newParam.delegationId = this.$store.getters.userInfo.workDeptCode;
      this.getDeclareDemand(newParam)
        .then(response => {
          let newReview = JSON.parse(JSON.stringify(response.records));
          for (let key in newReview) {
            if (newReview[key].sequenceIndex) {
              newReview[key].demand = 1;
            } else if (newReview[key].sequenceIndex === '' || newReview[key].sequenceIndex === undefined) {
              newReview[key].demand = 2;
            }
          }
          this.reviewtData = newReview;
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
    //下载
    download() {
      window.open(`${process.env.API_NA_URL}/api/commendArrange/getDeclaredDemandInfo/download?token=${this.$store.state.token}&delegationId=${this.$store.getters.userInfo.workDeptCode}`, '_blank');
    },
    //打印
    print() {
      window.print();
    }
  }
};
</script>
