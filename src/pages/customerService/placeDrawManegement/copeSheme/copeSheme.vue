/**
 * @file 复制标准展位展具配置方案
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="复制标准展位展具配置方案" name="first">
      <el-form :inline="true" :rules="rules">
        <el-form-item label="届数：" prop="sessionNum">
          <el-select v-model="sessionNum" clearable>
            <el-option label="第122期" value="1"></el-option>
            <el-option label="第123期" value="2"></el-option>
            <el-option label="第124期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="searchBtn" @click="copy">复制</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      sessionNum: "",
      sessionNums: [],
      rules: {
        sessionNum: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapGetters('dictionary', ['dictionaryData'])
  },
  async beforeCreate() {
    this.sessionNums = await kindo.dictionary.get('sessionNums'); // 届数
  },
  methods: {
    handleClick(tab, event) {
    },
    copy() {
      this.$router.push("/sheme");
    }
  }
};
</script>
<style scoped>
.searchBtn {
  margin-left: 30px;
  width: 100px; /* width: 80px; */
}
</style>


