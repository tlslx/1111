<template>
  <el-layout id="app" :class="themeClass">
    <!--   <app-header slot="top"> </app-header> -->
    <app-body
      slot="center"
      slot-scope="scope"
      :height="scope.height"
    ></app-body>
    <app-menu
      slot="left"
      slot-scope="scope"
      :height="scope.height"
    ></app-menu>
    <!-- <app-footer slot="bottom"></app-footer>  -->
  </el-layout>
</template>

<script>
// import Header from "./components/framework/app/appHeader";
// import Footer from "./components/framework/app/appFooter";
import Body from "./components/framework/app/appBody";
import Menu from "./components/framework/app/appMenu";
import axios from 'axios';
export default {
  name: "app",
  components: {
    // [Header.name]: Header,
    //  [Footer.name]: Footer,
    [Body.name]: Body,
    [Menu.name]: Menu
  },
  data() {
    return {
      theme: "blue",
      loading: false,
      loadingCount: 0,
      source: {
        language: {}
      }
    };
  },
  beforeCreate() {
    kindo.$bus = kindo.$bus || this;
  },
  created() {
     // 读取国际化
    this.source.language = kindo.util.getLanguage('CommonLang');
    // 引入主题样式
    let _this = this;
    // const axiosInstance = axios.create();
    // const configPath = `static/config/config.json`; // ${process.env.API_BASE_URL}/
    // axiosInstance.get(configPath).then(config => {
    //   kindo.config = Object.assign({}, kindo.config, config.data);
    //   if (kindo.config.theme) {
    //     _this.theme = kindo.config.theme;
    //     require('../static/css/' + kindo.config.theme + '/index.css');
    //   } else {
    //     _this.theme = 'blue';
    //     require('../static/css/blue/index.css');
    //   }
    // });
    let usertheme = kindo.cache.get(kindo.constant.THEME, 'session');
    if (usertheme) {
      kindo.config = usertheme;
      _this.theme = kindo.config.theme;
      require('../static/css/' + kindo.config.theme + '/index.css');
    } else {
      const axiosInstance = axios.create();
      const configPath = `static/config/config.json`; // ${process.env.API_BASE_URL}/
      axiosInstance.get(configPath).then(config => {
        kindo.config = Object.assign({}, kindo.config, config.data);
        if (kindo.config.theme) {
          _this.theme = kindo.config.theme;
          require('../static/css/' + kindo.config.theme + '/index.css');
        } else {
          _this.theme = 'blue';
          require('../static/css/blue/index.css');
        }
      });
    }
    // 初始化 app, 添加 global bus
    this.createGlobalBus();
  },

  computed: {
    themeClass() {
      // console.log(`theme-${this.theme}`);
      return `theme-${this.theme}`;
    }
  },

  methods: {
    createGlobalBus() {
      this.$on("loading", loadingStatus => {
        if (loadingStatus) {
          this.loadingCount = this.loadingCount + 1;

          this.loading = true;
        } else {
          this.loadingCount = this.loadingCount - 1;

          if (this.loadingCount === 0) {
            this.loading = false;
          }
        }
      });

      kindo.$bus.$on(
        "notify",
        (message = this.source.language.tips, title = this.source.language.tips, type = "info") => {
          kindo.$bus.$notify({
            showClose: true,
            title: title,
            message: message,
            type: type
          });
        }
      );

      kindo.$bus.$on(
        "message",
        (message = this.source.language.tips, title = this.source.language.tips, type = "info") => {
          kindo.$bus.$message({
            showClose: true,
            title: title,
            message: message,
            type: type
          });
        }
      );

      kindo.$bus.$on(
        "confirm",
        (
          message = this.source.language.tips,
          title = this.source.language.tips,
          type = "info",
          successCallBack,
          errorCallBack
        ) => {
          kindo.$bus
            .$confirm(message, title, {
              confirmButtonText: this.source.language.confirm,
              cancelButtonText: this.source.language.cancel,
              type: type
            })
            .then(successCallBack)
            .catch(errorCallBack);
        }
      );
    }
  }
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
  color: #333;
}

.el-table .cell,
.el-table th > div {
  padding-left: 15px !important;
  padding-right: 10px !important;
}
</style>
