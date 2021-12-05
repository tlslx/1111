<template>
  <el-dialog :title="articleTitle" :visible.sync="showArticle" :before-close="handleClose" @open="handleOpen" width="90%" top="1vh" :lock-scroll=true>
    <div class="content" v-html="articleContent"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showArticle = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    name: "articleView",
    props: ["showArticle", "articleId"],
    data() {
      return {
        articleTitle: "",
        articleContent: ""
      };
    },
    methods: {
      handleClose(done) {
        this.$emit("closeArticleView");
        return;
      },
      handleOpen() {
        this.$emit("openArticleView");
      },
      getArticle(_articleId) {
        var _this = this;
        var paramData = {
          id: _articleId
        };
        this.$http
          .get("/api/article/getSingleById", paramData)
          .then(function (resultData) {
            _this.articleContent = resultData.content;
            _this.articleTitle = resultData.title;
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log("获取文章内容出错：" + msg);
          });
      }
    }
  };

</script>

<style>
.content {
  overflow: auto;
}
</style>

