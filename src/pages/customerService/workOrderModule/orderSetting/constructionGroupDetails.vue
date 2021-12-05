/**
 * @file 施工组详情
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="施工组详情" name="three">
      <el-form label-width="200px" class="demo-ruleForm">
        <el-form-item label="接单员：" prop="acceptorName">
          {{listGroupDetails.acceptorName}}
        </el-form-item>
        <el-form-item label="施工组：" prop="constructionGroup">
          {{listGroupDetails.constructionGroup}}
        </el-form-item>
        <el-form-item label="施工单位名称：" prop="constructionGroupName">
          {{listGroupDetails.constructionGroupName}}
        </el-form-item>
        <el-form-item label="施工人员："  prop="constructionNames">
          {{listGroupDetails.constructionNames}}
        </el-form-item>
        <el-form-item label="无账号施工人员手机号：" prop="noAccountPhone">
          {{listGroupDetails.noAccountPhone}}
        </el-form-item>
        <el-form-item label="负责的展区：" prop="area">
          {{listGroupDetails.area}}
        </el-form-item>
        <el-form-item label="负责的展厅：" prop="hall">
          {{listGroupDetails.hall}}
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn2" @click="toBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "three",
      loading: '',
      id: '',
      workConstructionList: []
    };
  },
  created() {
    this.getQuery();
    let _this = this;
    this.loading = true;
    this.selectListGroupDetails(this.id).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getQuery'
  },
  computed: {
    ...mapGetters('orderSetting', ['listGroupDetails'])
  },
  methods: {
    ...mapActions('orderSetting', ['selectListGroupDetails']),
    getQuery() {
      // 取到路由带过来的参数 
      console.log(this.$route, "5555");
      let routerQuery = this.$route.query.id;
      // 将数据放在当前组件的数据内
      this.id = routerQuery;
    },
    handleClick(tab, event) {

    },
    // 取消返回列表页
    toBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.demo-ruleForm {
  margin: 30px 0px 12px 0px;
}
.div_hint {
  color: red;
  position: relative;
  left: 30%;
  margin-top: 30px;
}
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 26%;
  margin-top: 50px;
}
.btn1 {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
.small-select-width {
  width: 170px;
}
</style>
