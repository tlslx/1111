/**
 * @file 标准展位展具配置详情
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="标准展位展具配置详情" name="three">
      <el-form label-width="200px">
        <el-form-item label="* 届数：" prop="sessionNum">
          {{byId.sessionNum}}
        </el-form-item>
        <el-form-item label="* 期数：" prop="issueNum">
          {{byId.issueNum}}
        </el-form-item>
        <el-form-item label="* 展区编号：" prop="exhibitionAreaNumber">
          {{byId.exhibitionAreaNumber}}
        </el-form-item>
        <el-form-item label="* 展区名称：" prop="quanexhibitionAreaNametity">
          {{byId.quanexhibitionAreaNametity}}
        </el-form-item>
        <el-form-item label="* 规标准展位长度（毫米）：" prop="standardBoothLength">
          {{byId.standardBoothLength}}
        </el-form-item>
        <el-form-item label="* 标准展位宽度（毫米）：" prop="standardBoothWidth">
          {{byId.standardBoothWidth}}
        </el-form-item>
        <el-form-item label="* 展具配置费限额（元）：" prop="configurationFeeLimit">
          {{byId.configurationFeeLimit}}
        </el-form-item>
        <el-form-item label="* 默认配置方案：" prop="defaultSchemeName">
          {{byId.defaultSchemeName}}
        </el-form-item>
        <el-form-item label="* 方案编码：" prop="schemeCode">
          {{byId.schemeCode}}
        </el-form-item>
        <el-form-item label="* 方案名称：" prop="programName">
          {{byId.programName}}
        </el-form-item>
        <el-form-item label="* 配置效果图：" prop="rendering">
          {{byId.rendering}}
        </el-form-item>
        <el-form-item label="* 配置图：" prop="configurationDiagram">
          {{byId.configurationDiagram}}
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
      activeName: "three",
      loading: '',
      id: ''
    };
  },
  created() {
    this.getQuery();
    let _this = this;
    this.loading = true;
    this.selectById(this.id).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('sheme', ['byId']),
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getQuery'
  },
  methods: {
    ...mapActions('sheme', ['selectById']),
    getQuery() {
      // 取到路由带过来的参数 
      console.log(this.$route, "5555");
      let routerQuery = this.$route.query.id;
      // 将数据放在当前组件的数据内
      this.id = routerQuery;
    },
    handleClick(tab, event) {

    },
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
</style>
