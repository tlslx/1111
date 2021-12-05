<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabs" :label="item.name" :name="item.id" :key="item.id" type="card">
        <div class="item" v-for="article in hotArticle" :key="article.articleId" @click="onShowArticle(article.articleId)">
          <div class="item-content" :style="{'width': article.coverImage.length > 100 ? 'calc(100% - 140px)' : '100%' }">
            <div class="content-title"><span class="title-label">[测试]</span> {{article.title}} </div>
            <div v-if="article.description.length > 1" class="content-description">“{{article.description}}”</div>
          </div>
          <div v-if="article.coverImage.length > 100" class="item-image"><img :src="article.coverImage" style="width:120px;height:80px;border-radius: 10%;" /></div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <article-view ref="articleview" :showArticle="showArticleView" :articleId="showArticleId" @closeArticleView="onCloseArticleView"
      @openArticleView="onOpenArticleView"></article-view>
  </div>
</template>
<script>
  import articleView from "@/components/project/plugins/articleView.vue";
  export default {
    name: "articleHotList",
    data() {
      return {
        activeName: "",
        tabs: [],
        allHotArticle: [],
        showArticleId: "",
        showArticleView: false
      };
    },
    created() {
      this.getArticlCateogry();
    },
    methods: {
      handleClick(tab, event) {
        this.getHotArticle(this.activeName);
      },
      // 获取文章分类
      getArticlCateogry() {
        var _this = this;
        this.$http
          .get("/api/article/getCategory")
          .then(function (resultData) {
            resultData.records.map(item => {
              var _category = {
                name: "",
                id: ""
              };
              _category.name = item.category;
              _category.id = item.categoryId;
              _this.tabs.push(_category);
            });
            // 获取首个分类的文章
            _this.getHotArticle(_this.tabs[0].id);
            _this.activeName = _this.tabs[0].id;
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log("获取资讯目录出错：" + msg);
          });
      },
      // 获取热门文章
      getHotArticle(_categoryId) {
        // 判断是否已经获取过该类文章，如果获取过了就不再获取，直接过滤当前分类数据
        var _index = -1;
        _index = this.allHotArticle.findIndex(function (x) {
          return x.categoryId === _categoryId;
        });
        if (_index > -1) {
          return;
        }
        let _this = this;
        let paramData = {
          categoryId: _categoryId
        };
        this.$http
          .get("/api/article/getHotArticleList", paramData)
          .then(function (resultData) {
            resultData.records.map(item => {
              var _article = {
                articleId: "",
                top: "",
                author: "",
                description: "",
                coverImage: "",
                title: "",
                category: "",
                categoryId: "",
                content: ""
              };
              _article.articleId = item.article_id;
              _article.top = item.top;
              _article.author = item.author;
              _article.description = item.description;
              _article.coverImage = item.cover_image;
              _article.title = item.title;
              _article.category = item.category;
              _article.categoryId = item.category_id;
              _article.content = item.content;
              _this.allHotArticle.push(_article);
            });
          })
          .catch(function (msg) {
            // 错误捕捉
            // console.log("获取资讯目录出错：" + msg);
          });
      },
      onShowArticle(_articleId) {
        this.showArticleId = _articleId;
        this.showArticleView = true;
      },
      onCloseArticleView() {
        this.showArticleView = false;
      },
      onOpenArticleView() {
        this.$refs.articleview.getArticle(this.showArticleId);
      }
    },
    computed: {
      hotArticle() {
        return this.allHotArticle.filter(
          item => item.categoryId === this.activeName
        );
      }
    },
    components: {
      articleView
    }
  };

</script>

<style scoped>
  .item {
    clear: both;
  }

  .item .item-image {
    float: right;
    width: 120px;
    height: 80px;
  }

  .item .item-content {
    overflow: hidden;
    display: inline-block;
    padding-right: 10px;
  }

  .title-label {
    color: #67c23a;
    font-size: 12px;
    margin-left: 3px;
    margin-top: 4px;
    margin-right: 3px;
  }

  .content-title {
    color: #3a3838;
    font-size: 16px;
    margin-top: 5px;
  }

  .content-description {
    color: #979292;
    margin: 8px 0px 10px;
    display: block;
  }

</style>
