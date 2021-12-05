<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="下载模板" name="first">
      <h2 class="calign">交易团反馈品牌数量安排方案</h2>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <template v-for="(item, index) in tableDataMain">
          <el-table-column
            v-if="item.isShow"
            align="center"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          >
            <template slot-scope="scope">
              <span>{{scope.row.isDispose === "1" ? "已提交" : "未提交"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            align="center"
            :key="index"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
          ></el-table-column>
        </template>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      obj: {},
      tableDataMain: [
        { label: "评审企业", prop: "companyName" },
        { label: "所属交易团", prop: "dealClusterName" },
        { label: "展区", prop: "exhibitionAreaName" },
        { label: "商协会", prop: "coceralName" },
        { label: "原安排展位数", prop: "beforeNumber" },
        { label: "反馈状态", prop: "isDispose", isShow: true },
        { label: "异议内容", prop: "objectionContent" }
      ],
      tableData: [],
      fullLoading: true,
      activeName: "first"
    };
  },
  created() {
    this.obj = this.$router.history.current.query.Obj;
  },
  mounted() {
    this.getList(this.obj);
  },
  methods: {
    ...mapActions("feedbackBrand", [
      "getfeedBackList", // 获取
      "downloadtrad" // 下载反馈意见汇总
    ]),
    getList(Url) {
      this.downloadtrad(Url)
        .then(res => {
          this.fullLoading = false;
        })
        .catch(e => {});
      this.getfeedBackList(Url)
        .then(res => {
          this.tableData = JSON.parse(JSON.stringify(res.records));
        })
        .catch(e => {});
    }
  }
};
</script>
<style scoped>
.calign {
  text-align: center;
}
</style>

