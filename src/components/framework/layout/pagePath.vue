<template>
  <el-breadcrumb class="el-page-path" :separator="separator">
      <i class="el-icon-menu"></i>
      <el-breadcrumb-item v-for="item in pathItems" :to="item.path" :key="item.pageName">{{item.pageName}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
  export default {
    name: 'ElPagePath',
    props: {
      separator: { type: String, default: '/' },
      pageSign: { type: String }
    },
    data () {
      return {
        pathItems: [
          { pageName: '首页', path: { path: '/' }},
          { pageName: '活动管理', path: { path: '/' }},
          { pageName: '活动列表', path: null },
          { pageName: '活动详情', path: null }
        ]
      };
    }
  };
</script>

<style>
.el-page-path{
  padding: 13px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  margin-bottom: 8px;
}

.page-path .el-icon-menu{
  float:left;
  margin:0px 10px 0px 5px;
  color:rgb(77, 130, 230);
}
</style>
