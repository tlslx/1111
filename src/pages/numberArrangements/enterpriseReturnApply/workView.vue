<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部查看汇总" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="广交会编码">
          <el-select v-model="queryForm.cantonFairCode" clearable>
            <el-option v-for="(item, key) in cantonFairCodeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核结果">
          <el-select v-model="queryForm.checkStatus" clearable>
            <el-option v-for="(item, key) in checkStatusOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyName" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="情况分类">
          <el-select v-model="queryForm.backType" clearable>
            <el-option v-for="(item, key) in backTypeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterName" clearable>
            <el-option v-for="(item, key) in dealClusterOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="queryForm.exhibitionPeriod" clearable>
            <el-option v-for="(item, key) in exhibitionPeriodOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起方">
          <el-select v-model="queryForm.applyRole" clearable>
            <el-option v-for="(item, key) in applyRoleOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="workViewData.records" v-loading="loading" border>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="发起方" prop="applyRole" align="center">
          <template slot-scope="scope">
            {{ scope.row.applyRole === '1' ? '企业' : (scope.row.applyRole === '2' ? '交易团' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="广交会编号" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="情况分类" prop="backType" align="center">
          <template slot-scope="scope">
            {{ scope.row.backType === 1 ? '全部退回' : (scope.row.backType === 2 ? '部分退回' : '') }}
          </template>
        </el-table-column>
        <el-table-column label="退回原因" prop="backReason" align="center"></el-table-column>
        <el-table-column label="审核结果" prop="checkStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.checkStatus | checkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="附件" prop="attachment" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="workViewData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      cantonFairCodeOpts: [],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '审核通过' }, { value: '2', label: '审核未通过' }],
      backTypeOpts: [{ value: 1, label: '全部退回' }, { value: 2, label: '部分退回' }],
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      companyOpts: [],
      exhibitionPeriodOpts: [],
      applyRoleOpts: [{ value: '1', label: '企业' }, { value: '2', label: '交易团' }],
      queryForm: {
        exhibitionArea: '',
        cantonFairCode: '',
        checkStatus: '',
        backType: '',
        dealClusterName: '',
        companyName: '',
        exhibitionPeriod: '',
        applyRole: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    checkFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1': 
          return '审核通过';
        case '2':
          return '审核未通过';
        default:
          return '';    
      }
    }
  },
  computed: {
    ...mapGetters('enterpriseReturnApply', ['workViewData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        cantonFairCode: this.queryForm.cantonFairCode,
        checkStatus: this.queryForm.checkStatus,
        backType: this.queryForm.backType,
        dealClusterName: this.queryForm.dealClusterName,
        exhibitionPeriod: this.queryForm.exhibitionPeriod,
        companyName: this.queryForm.companyName,
        applyRole: this.queryForm.applyRole,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.loading = true;
    this.postSummaryList({ current: 0, size: 0 }).then(res => {
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.dealClusterOpts = res.dealClusterOpts;
      this.exhibitionPeriodOpts = res.exhibitionPeriodOpts;
      this.companyOpts = res.companyOpts;
      this.cantonFairCodeOpts = res.cantonFairCodeOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('enterpriseReturnApply', ['postSummaryList']),
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.postSummaryList(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
</style>
