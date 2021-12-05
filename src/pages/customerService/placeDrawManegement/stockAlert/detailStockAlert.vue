/**
 * @file 预警消息列表详细
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="预警消息列表详细" name="first">
      <el-form label-width="140px" class="demo-ruleForm">
        <el-form-item label="* 届数：" prop="sessionNum">
          {{byId.sessionNum}}
        </el-form-item>
        <el-form-item label="* 期数：" prop="issueNum">
          {{byId.issueNum}}
        </el-form-item>
        <el-form-item label="* 区域：" prop="area">
          {{byId.area}}
        </el-form-item>
        <el-form-item label="* 预警时间：" prop="warmDatetime">
          {{byId.warmDatetime}}
        </el-form-item>
        <el-form-item label="* 联系人：" prop="contactName">
          {{byId.contactName}}
        </el-form-item>
        <el-form-item label="* 展材名称：" prop="materialName">
          {{byId.sessionNum}}
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn2" @click="toBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: "first",
      loading: '',
      id: ''
    };
  },
  created() {
    this.getQuery();
    let _this = this;
    this.loading = true;
    this.getById(this.id).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('stockAlert', ['byId'])
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getQuery'
  },
  methods: {
    ...mapActions('stockAlert', ['getById']),
    getQuery() {
      // 取到路由带过来的参数 
      console.log(this.$route, "5555");
      let routerQuery = this.$route.query.id;
      // 将数据放在当前组件的数据内
      this.id = routerQuery;
    },
    toBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
</style>