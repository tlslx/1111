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
  <el-tabs v-model="activeName" class="commendationList">
    <el-tab-pane label="打印模板" name="first"></el-tab-pane>
    <el-card class="box-card">
      <canBeEdit-table :loading="loading" :tableTrData="reviewTrDate" :tableData="printAlList"></canBeEdit-table>
      <div class="printBtn">
        <el-button style="margin-top: 10px;" type="primary" @click="back">返回</el-button>
        <el-button style="margin-top: 10px;" type="primary" @click="print()">打印</el-button>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "canBeEdit-table": canBeEditTable
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      isshow: true,
      // 表头数据
      reviewTrDate: [
        {
          prop: "delegationName",
          label: "交易团",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionArea",
          label: "展区",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothNumber",
          label: "展位数",
          type: "input",
          userDefined: true
        }
      ],
      reviewtData: []
    };
  },
  computed: {
    ...mapGetters("boothNumrange", [
      "printAlList" //查询生成展位安排表全部
    ])
  },
  mounted() {
    if (this.$route.params.reviewtData) {
      // this.reviewtData = this.$route.params.reviewtData;
      let temp = {};
      for (let key in this.$route.params.reviewtData) {
        if (key !== 'size' && key !== 'current') {
          temp[key] = this.$route.params.reviewtData[key];
        }
      }
      this.getPrintAll(temp);
    }
  },
  methods: {
    ...mapActions("boothNumrange", [
      "getPrintAll" //查询生成展位安排表全部
    ]),
    //打印
    print() {
      window.print();
    },
    // 返回按钮
    back() {
      this.$router.push({
        path: '/boothSchedulelist'
      });
    }
  }
};
</script>