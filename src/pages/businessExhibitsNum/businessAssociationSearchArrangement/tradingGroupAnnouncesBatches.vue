<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="设置展位公示批次" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <div>
        <p style="text-indent: 2em;">
          展位数量公布批次是指展位数量通过“参展易捷通”对企业公布的时间批次。品牌展位数量按大会设置批次公布，一般性展位（包括一般性特装、标摊、中央通道）数量公布批次可由交易团自行调整。
        </p>
        <p style="text-indent: 2em;">
          第一批公布时间是: {{batchTime[0].label}} ,第二批公布时间是: {{batchTime[1].label}} ,第三批公布时间是: {{batchTime[2].label}},第四批公布时间是: {{batchTime[3].label}}
        </p>
      </div>
      <div style="float:right;">
        <p>共查询到{{arrangepublishList.length}}条记录</p>
      </div>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="arrangepublishList"
        :selection ='selection'
        :isSelectable ='isSelectable'
        @change-multiple-selection ='selectAll'
      ></canBeEdit-table>
      <div style="margin-top: 20px;">
        <el-button  type="danger" @click="onNotice('即时公布')">即时公布</el-button>
        <el-button  type="primary" @click="onNotice('第一批')">第一批</el-button>
        <el-button  type="primary" @click="onNotice('第二批')">第二批</el-button>
        <el-button  type="primary" @click="onNotice('第三批')">第三批</el-button>
        <el-button  type="primary" @click="onNotice('第四批')">第四批</el-button>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      selection: true,
      timeAll: [
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_1' },
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_2' },
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_3' },
        { time: 'NUMBER_OF_BUSINERSS_EXHIBITS_4' }
      ],
      batchTime: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "exhibitionPeriod",
          label: "期数",
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
          prop: "exhibitionType",
          label: "布展类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "publishBatchName",
          label: "公布批次",
          type: "input",
          userDefined: true
        },
        {
          prop: "publishStatus",
          label: "状态",
          type: "input",
          width: '100',
          userDefined: true
        }
      ],
      reviewtData: [
      ],
      // 搜索框联动设置
      searchParamsForm: {
        variate: "exhibitionArea",
        data: [
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "exhibitionPeriod",
            label: "期数",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "publishBatch",
            label: "公布批次",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "exhibitionType",
            label: "布展类型",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "publishStatus",
            label: "公布状态",
            value: "",
            width: "100px",
            type: "select"
          }
        ],
        dictionary: {
          exhibitionPeriod: [],
          exhibitionArea: [],
          exhibitionType: []
        }
      },
      noticeStatus: [
        {
          value: "2",
          label: "未发布"
        },
        {
          value: "1",
          label: "已发布"
        }
      ],
      publishBatch: [
        {
          value: "0",
          label: "即时公布"
        },
        {
          value: "1",
          label: "第一批次"
        },
        {
          value: "2",
          label: "第二批次"
        },
        {
          value: "3",
          label: "第三批次"
        },
        {
          value: "4",
          label: "第四批次"
        }
      ],
      // 传参
      searchParams: {
      },
      NoticeDate: []
    };
  },
  async created() {
    this.searchParamsForm.dictionary.exhibitionPeriod = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    // this.searchParamsForm.dictionary.exhibitionArea = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.searchParamsForm.dictionary.exhibitionType = await kindo.dictionary.get('exhibitionType'); // 布展类型
    for (let i = 0; i < this.timeAll.length; i++) {
      let temp = {};
      temp.orald = this.$store.getters.userInfo.org.deptId;
      temp.subKey = this.timeAll[i].time;
      this.getBatchtime(temp).then(res => {
        let reg = new RegExp('/', "g");
        let resTime = res.startTime.replace(reg, '-');
        this.batchTime.push({ label: resTime, value: i });
        this.batchTime.sort(function (a, b) {
          return (a.value - b.value);
        });
        console.log(this.batchTime);
      });
    }
  },
  mounted() {
     // 展区
    this.getexhibitionArea().then(res => {
      let newRes = JSON.parse(JSON.stringify(res));
      this.searchParamsForm.dictionary.exhibitionArea = newRes.map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
    }).catch(e => {});
    this.searchParamsForm.dictionary.publishStatus = this.noticeStatus;
    this.searchParamsForm.dictionary.publishBatch = this.publishBatch;
    this.getData();
  },
  computed: {
    ...mapGetters("businessAssociationSearchArrangement", [
      "arrangepublishList" // 商协会复核查询
    ])
  },
  methods: {
    ...mapActions("businessAssociationSearchArrangement", [
      "getArrangePublish", // 商协会复核查询
      'getUpdateOrdinary'
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    ...mapActions("quantitativeArrangement", [
      "getBatchtime" //获取审核结果的公布批次时间
    ]),
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
    //通知按钮
    onNotice(val) {
      if (this.NoticeDate.length !== 0) {
        let demandRecordList = [];
        for (let key in this.NoticeDate) {
          let newDate = {};
          newDate.modifierId = this.$store.getters.userInfo.userId;
          newDate.modifierName = this.$store.getters.userInfo.userName;
          if (this.NoticeDate[key].exhibitionType === '中央通道') {
            newDate.exhibitionType = 'CENTER_CHANNEL_BOOTH';
          } else if (this.NoticeDate[key].exhibitionType === '标摊') {
            newDate.exhibitionType = 'STANDARD_BOOTH';
          } else if (this.NoticeDate[key].exhibitionType === '特装') {
            newDate.exhibitionType = 'SPECIAL_BOOTH';
          } else if (this.NoticeDate[key].exhibitionType === '统一布展') {
            newDate.exhibitionType = 'UNIFICATION_BOOTH';
          }
          if (this.NoticeDate[key].exhibitionType === '未发布') {
            newDate.publishStatus = 0;
          }
          if (val === '即时公布') {
            newDate.publishBatchName = '即时公布';
            newDate.publishBatch = '0';
            newDate.publishStatus = 1;
          } else if (val === '第一批') {
            newDate.publishBatchName = '第一批';
            newDate.publishBatch = '1';
          } else if (val === '第二批') {
            newDate.publishBatchName = '第二批';
            newDate.publishBatch = '2';
          } else if (val === '第三批') {
            newDate.publishBatchName = '第三批';
            newDate.publishBatch = '3';
          } else if (val === '第四批') {
            newDate.publishBatchName = '第四批';
            newDate.publishBatch = '4';
          }
          newDate.batchId = this.NoticeDate[key].batchId;
          newDate.delegationId = this.NoticeDate[key].delegationId;
          newDate.delegationName = this.NoticeDate[key].delegationName;
          newDate.exhibitionAreaCode = this.NoticeDate[key].exhibitionAreaCode;
          demandRecordList.push(newDate);
        }
        this.getUpdateOrdinary(demandRecordList).then((res) => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.getData();
        });
      } else {
        this.$message.error('请选择要通知的企业');
      }

    },
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getArrangePublish(this.searchParams)
        .then(response => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 模糊查询
    selectParams() {
      let _this = this;
      this.searchParams.delegationId = this.$store.getters.userInfo.org.deptId,
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === "exhibitionArea" && formVal.type === "select") {
          this.searchParams.exhibitionArea = formVal.value;
          if (this.searchParams.exhibitionArea !== '' && this.searchParams.exhibitionArea != null) {
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
            this.searchParams.exhibitionAreaName = '';
          }
        }
        if (formVal.prop === "exhibitionType" && formVal.type === "select") {
          this.searchParams.exhibitionType = formVal.value;
        }
        if (formVal.prop === "exhibitionPeriod" && formVal.type === "select") {
          this.searchParams.exhibitionPeriod = formVal.value;
        }
        if (formVal.prop === "publishStatus" && formVal.type === "select") {
          this.searchParams.publishStatus = formVal.value;
        }
        if (formVal.prop === "publishBatch" && formVal.type === "select") {
          this.searchParams.publishBatch = formVal.value;
        }
      });
      let obj = {
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
      this.getArrangePublish(obj)
        .then(res => {
          _this.loading = false;
        })
        .catch(e => {
          _this.loading = false;
        });
    }
  }
};
</script>
