<style lang="less" scoped>
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="确认本团的各期一般性展位数量" name="first"></el-tab-pane>
    <el-card class="box-card">
      <div>
        <p>请核对你团各展期展位数。本次确认的各期展位数量范围是在各交易团（分团）2018年11月19日确认的广交会各展期一般性展位数量的基础上，做一下增减：</p>
        <p>1.如第122届广交会获得“实际使用者得”展位、组展表彰奖励展位，则相应增加:</p>
        <p>2.如第123届广交会会有跨期等量调整，则相应调整；</p>
        <p>3.如第123届广交会有违规使用一般性展位，则相应扣减；</p>
        <p>4.铁石装饰品及户外水疗设施展区基数内展位列入范围内。</p>
        <p>注：上述展位数均不涉及新能源、宠物用品、贫困地区特色产品展区和中央通道展位。化工展区展位按4平米0.5个计。</p>
        <p>请于2018年11月23日17点前，确认打印并加盖公章后，传真至外贸中心（传真：020-89138550）</p>
      </div>
      <canBeEdit-table
        :loading="loading"
        :tableTrData="reviewTrDate"
        :tableData="reviewtData"
      ></canBeEdit-table>
      <div style="text-align: right;">
        <p>交易团(公章):___________</p>
        <p>日期:___________</p>
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <el-button  type="primary" @click="onNotice()">打印</el-button>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      // 表头数据
      reviewTrDate: [
        {
          prop: "name",
          label: "交易团名称",
          type: "number",
          userDefined: true,
          editTable: true,
          maxlength: 3
        },
        {
          prop: "one",
          label: "第一期",
          type: "input",
          userDefined: true,
          editTable: true
        },
        {
          prop: "exhibitionArea",
          label: "第二期",
          type: "select",
          userDefined: true
        },
        {
          prop: "delegation",
          label: "第三期",
          type: "select",
          userDefined: true
        },
        {
          prop: "isshow",
          label: "确认情况",
          type: "number",
          editTable: true
        }
      ],
      reviewtData: [],
      searchDate: [],
      haveDate: false
    };
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
      "getlistAllOrdinary" // 查询展位数量及范围
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getlistAllOrdinary(this.searchParams)
        .then(response => {
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    onNotice() {

    }
  }
};
</script>