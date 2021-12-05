/**
 * @file 展商动态
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展商动态" name="0">
      <div class="headText">贵公司在第{{ session }}届可发布数量：3 已发布：{{ published }} 可发布：{{ 3 - published }}</div>
     <cust-table
        :cols="cols"
        :data="tableData"
        :loading="loading"
        @deal-with-diff-event="dealWithDiffEvent"
        @to-boost="toBoost"
        @to-show-big-pic="toShowBigPic"></cust-table>
      <div class="btn-bar">
        <el-button type="primary" class="recommend-btn" @click="pass" :disabled="disabled">发布新动态</el-button>
      </div>
      <el-dialog title="图片预览" :visible.sync="dialogVisible">
        <img :src="imgSrc" width="100%">
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "vipCheckReviewResultsReception",
  components: {
    "cust-table": custTable
  },
  data() {
    return {
      //tab默认
      activeName: "0",
      dialogVisible: false,
      imgSrc: "",
      // 禁用变量
      disabled: false,
      // 表格loading
      loading: true,
      // 可发布数量
      published: 0,
      //表头数据
      cols: [
        {
          prop: "companyName",
          label: "企业名称"
        },
        {
          prop: "contentTitle",
          label: "新闻标题"
        },
        {
          prop: "contentText",
          label: "新闻内容"
        },
        {
          prop: "imageUrl",
          type: "img",
          multiPics: true,
          label: "图片预览"
        },
        {
          prop: "modifyDate",
          label: "更新时间"
        },
        {
          prop: "releaseStatus",
          label: "发布状态"
        },
        {
          prop: "approverResult",
          label: "审核状态"
        },
        {
          prop: "popularity",
          label: "人气"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: 'edit',
              label: "修改"
            },
            {
              type: 'del',
              label: "删除"
            },
            {
              type: 'select',
              label: '查看'
            }
          ]
        }
      ],
      // 传参
      searchParams: {
        "reviewPublishExhibitionSession": {
          "companyId": "",
          "numberSessions": ''
        },
        "pageStart": "1",
        "pageSize": "10"
      },
      // 表格数据
      tableData: {
        data: []
      }
    };
  },
  watch: {
    // 监听表格数据
    getPubExh(newVal) {
      this.tableData.data = JSON.parse(JSON.stringify(newVal));
      if (this.tableData.data.length > 0) {
        this.tableData.data.forEach((value, index, array) => {
          value.select = true;
          if (value.releaseStatus === "待发布") {
            value.approverResult = '';
            value.class = 'underline-red';
            value.edit = true;
            value.del = true;
          }
          value.class = 'underline-blue';
          if (value.approverResult === '审核中' || value.approverResult === '已通过') {
            value.select = true;
            // value.del = true;
            value.class = 'underline-blue';
          }
          if (value.approverResult === "待审核" || value.approverResult === "不通过") {
            value.class = 'underline-red';
            value.edit = true;
            value.del = true;
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters('exhibitorDynamicInfo', ['getPubExh', 'delDynTrd']),   // 展商动态列表查询
    ...mapGetters('common', ['session'])
  },
  created() {
    // 初始届数
    this.getSessionInfo().then(reso => {
      let param = {
        "publishedExhibitionCountSession":
        {
          "companyId": localStorage.getItem("getComPanyId"),
          "numberSessions": reso.session
        }
      };
      this.searchParams.reviewPublishExhibitionSession.companyId = localStorage.getItem("getComPanyId");
      this.searchParams.reviewPublishExhibitionSession.numberSessions = reso.session;
      // 展商动态列表查询
      this.getData();
      // 获取可发布数量
      this.reviewExhibitionInfo(param).then(resop => {
        this.published = resop;
      });
    });
  },
  methods: {
    ...mapActions('exhibitorDynamicInfo', ['getPublishExhibition', 'reviewExhibitionInfo', 'deleteDynamicTrade']),   // 展商动态列表查询
    ...mapActions('common', ['getSessionInfo']),
    // 初始化
    getData() {
      // 改变表格loading
      this.loading = true;
      // 获取表格数据
      this.getPublishExhibition(this.searchParams).then(res => {
        // 查询成功
        if (res.records.length >= 3) {
          this.disabled = true;
        }
        this.loading = false;
      }).catch(e => {
        // 查询失败
        this.loading = false;
      });
    },
    // 单图预览大图
    toBoost(scope) {
      this.imgSrc = scope.row.imageUrl;
      this.dialogVisible = true;
    },
    // 多图预览大图
    toShowBigPic(url) {
      this.dialogVisible = true;
      this.imgSrc = url;
    },
    // 编辑数据
    editData(scope) {
      // 跳转页面并传值
      this.$router.push({
        path: "/enterprisePutExhibitorState",
        query: {
          operateStatus: 'edit',
          contentTitle: scope.row.contentTitle,
          contentText: scope.row.contentText,
          contentTitleEn: scope.row.contentTitleEn,
          contentTextEn: scope.row.contentTextEn,
          exhibitorDynamicId: scope.row.exhibitorDynamicId,
          imageEnclosure: scope.row.imageEnclosure,
          companyName: scope.row.companyName,
          companyId: scope.row.companyId,
          isAudit: "1"
        }
      });
    },
    // 删除数据
    delData(scope) {
      // 定义传参
      let exhibitorDynamicId = scope.row.exhibitorDynamicId;
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数据
        this.deleteDynamicTrade(exhibitorDynamicId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$router.go(0);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 查看数据
    selectData(scope) {
      // 跳转页面并传值
      this.$router.push({
        path: "/enterprisePutExhibitorState",
        query: {
          operateStatus: 'select',
          contentTitle: scope.row.contentTitle,
          contentText: scope.row.contentText,
          contentTitleEn: scope.row.contentTitleEn,
          contentTextEn: scope.row.contentTextEn,
          exhibitorDynamicId: scope.row.exhibitorDynamicId,
          imageEnclosure: scope.row.imageEnclosure,
          companyName: scope.row.companyName,
          companyId: scope.row.companyId,
          isAudit: "1"
        }
      });
    },
    // 操作方法
    dealWithDiffEvent(eventType, scope) {
      // 编辑点击事件
      if (eventType === "edit") {
        this.editData(scope);
      }
      // 删除点击事件
      if (eventType === "del") {
        this.delData(scope);
      }
      // 查看点击事件
      if (eventType === 'select') {
        this.selectData(scope);
      }
    },
    // 发表新动态，跳转页面
    pass() {
      this.$router.push({
        path: "/enterprisePutExhibitorState",
        params: {
          operateStatus: 'add'
        }
      });
    }
  }
};
</script>
<style scoped>
.headText {
 color: red;
 margin: 20px 10px;
}
.btn-bar {
  text-align: left;
  margin-left: 10px;
}
.recommend-btn {
  float: left;
  margin-top: 20px;
}
.pages{
  width: 60%;
  float: right;
}
</style>
