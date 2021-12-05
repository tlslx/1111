<template>
  <el-container>
    <el-header>
      <headline :label="languageSource.AdjustmentApply.baseInfo"/>
    </el-header>
    <el-main class="p-b-n">
      <el-form :inline="true" size="small" :model="searchForm">
        <el-form-item class="m-b-n" :label="languageSource.LocationLang.programName">
          <el-input v-model="searchForm.schemeName" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="m-b-n" :label="languageSource.LocationLang.exhibitionProperty">
          <el-input v-model="searchForm.exhibitionProperty" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="m-b-n" :label="languageSource.LocationLang.exhibitionAreaName" >
          <el-input v-model="searchForm.exhibitionAreaName" clearable :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'info',
  components: {
    'headline': () => import('../../components/headline')
  },
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      'searchForm': {}
    };
  },
  created () {
    this.searchForm = this.$route.query.scopeRow;
  }
};
</script>

<style scoped>
.m-b-n {
  margin-bottom: 0px;
}
.p-b-n {
  padding-bottom: 0px;
}
</style>
