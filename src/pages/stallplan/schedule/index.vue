<template>
<el-page class="schedule">
    <template slot="body">
      <el-container>
        <el-header>
          <headline label="检查安排进度"/>
        </el-header>
        <el-main>
          <el-form :inline="true" size="small" :model="searchForm" label-width="85px">
            <el-form-item label="企业名称：">
              <el-input v-model="searchForm.heading" clearable placeholder="企业名称"></el-input>
            </el-form-item>
            <el-form-item label="交易团：">
              <el-input v-model="searchForm.jytuan" clearable placeholder="交易团"></el-input>
            </el-form-item>
            <el-form-item label="展期：">
              <el-select v-model="searchForm.zhanqi" clearable placeholder="请选择展期">
                <el-option :key="1" label="第2期" :value="2"></el-option>
                <el-option :key="2" label="第3期" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="筛选粒度：">
              <el-select v-model="searchForm.lidu" clearable placeholder="筛选粒度">
                <el-option :key="1" label="交易团" :value="1"></el-option>
                <el-option :key="2" label="企业" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>

          <el-table class="m-b" :data="tableData" border v-loading="loading">
            <el-table-column prop="sessionNumber" label="展期"></el-table-column>
            <el-table-column prop="exhibitionPeriod" label="交易团"></el-table-column>
            <el-table-column prop="exhibitionAreaName" label="相关商会"></el-table-column>
            <el-table-column prop="exhibitionProperty" label="推荐总数"></el-table-column>
            <el-table-column prop="schemeName" label="已安排数"></el-table-column>
            <el-table-column prop="company" label="进度"></el-table-column>
          </el-table>

          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.current"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="paginationInfo.total">
          </el-pagination>
        </el-main>
      </el-container>
    </template>
</el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'schedule',
  mixins: [listPageBase],
  components: {
    'headline': () => import('../components/headline')
  },
  data () {
    return {
      'searchForm': {},
      'tableData': [],
      'loading': false,
      'paginationInfo': { 'total': 37, 'current': 1 }
    };
  },
  methods: {
    handleCurrentChange () {

    }
  }
};
</script>

<style scoped>
.schedule {
  overflow-y: auto;
}
.m-b {
  margin-bottom: 18px;
}
</style>
