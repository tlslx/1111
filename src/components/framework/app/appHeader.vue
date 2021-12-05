<template>
  <header class="app-header">
    <a href="/">
      <!-- <img src="../../../theme/framework/images/logo.png"> -->
      <span>集成开发框架系统</span>
    </a>
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
};
</script>

<style>
.app-header {
  height: 0px;
  background-color: #8294ea;
  text-align: center;
}

.app-header>a {
  display: inline-block;
  vertical-align: middle;
  font-size: 24px;
  color: #ffffff;
  text-decoration: none;
  margin-top: 6px;
}

.app-header>a>img {
  width: 48px;
  height: 48px;
  margin-left: 50px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 20px;
}

.app-header>a>span {
  line-height: 48px;
  display: inline-block;
  vertical-align: middle;
}
</style>
