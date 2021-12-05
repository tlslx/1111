/**
 * @file 前台首页
*/
<style lang="less" scoped>
@import "../../../theme/framework/css/definitions.less";
// .index-page-container
//   /deep/.el-tabs__nav-wrap, .el-tabs__content {
//   padding: 0 85px;
// }
// .index-page-container
//   /deep/.el-tabs__content {
//   padding: 0 85px;
// }
.index-page-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
  .el-container {
    // height: 100%;
    .el-main {
      width: 100%;
      background-color: #d80c18;
      // overflow-y: hidden;
    }
  }
  .front-desk-header {
    display: table;
    background-color: #d80c18;
    color: @theme-text-color;
    width: 100%;
    .front-desk-header-container {
      position: relative;
      display: table-cell;
      vertical-align: middle;
      box-shadow: 0px 0px 0.3px #888888;
      .front-desk-logo {
        display: inline-block;
        vertical-align: middle;
      }
      .front-desk-logo-image {
        padding-left: 40px;
        padding-right: 10px;
        img {
          width: 210px;
          height: 45px;
        }
      }
      .front-desk-logo-title {
        padding-left: 25px;
        color: @theme-text-color;
        border-left: 1px solid #fff;
        font-size: 20px;
      }
      .front-desk-hint-container {
        position: absolute;
        top: 40px;
        right: 40px;
        .common-question {
          padding-left: 8px;
          cursor: pointer;
        }
      }
    }
  }
  .front-desk-container {
    margin: auto;
    width: 820px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
<template>
  <div class="index-page-container">
    <el-container>
      <el-header class="front-desk-header" style="height: 100px;">
        <div class="front-desk-header-container">
          <div class="front-desk-logo-image front-desk-logo">
            <img src="../../../theme/framework/images/system-logo.png" alt="前台系统logo">
          </div>
          <div class="front-desk-logo-title front-desk-logo">
            <!-- 易捷通 -->
            <img src="../../../theme/framework/images/join-exhibit-logo.png" alt="易捷通文字logo">
          </div>
          <div class="front-desk-hint-container">
            <span class="common-question" @click="toLoginPage">登录</span>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <div class="front-desk-container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="个人注册" name="first">
                <personal-user-register></personal-user-register>
              </el-tab-pane>
              <el-tab-pane label="企业注册" name="second">
                <enterprise-user-register></enterprise-user-register>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import applyAssWithCompanyUser from "@/components/project/onlineService/user/applyAssWithCompanyUser";
import userRegisterEnterprise from "@/components/project/onlineService/user/userRegisterEnterprise";
export default {
  name: "registerPage",
  components: {
    'personal-user-register': applyAssWithCompanyUser,
    'enterprise-user-register': userRegisterEnterprise
  },
  data() {
    return {
      activeName: 'second'
    };
  },
  computed: {
  },
  created() {

  },
  methods: {
    handleClick() {},
    toLoginPage() {
      this.$router.push("/login");
      sessionStorage.clear();
    }
  }
};
</script>


