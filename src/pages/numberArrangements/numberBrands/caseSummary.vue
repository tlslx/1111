<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="企业订金情况汇总" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="广交会编码">
          <el-select v-model="queryForm.cantonFairCode" clearable>
            <el-option v-for="(item, key) in cantonFairCodeOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否收取订金">
          <el-select v-model="queryForm.isDepositGather" clearable>
            <el-option v-for="(item, key) in isDepositGatherOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyId" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, key) in dealClusterOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="depositInfo.records" v-loading="loading" border>
        <el-table-column align="center" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="申请展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="申请数量" prop="brandBoothNumber"></el-table-column>
        <el-table-column align="center" label="交易团" prop="dealClusterName"></el-table-column>
        <el-table-column align="center" label="企业联系人" prop="businessContactsCh">
          <template slot-scope="scope">
            {{ scope.row.companyOtherInfo.businessContactsCh ? scope.row.companyOtherInfo.businessContactsCh : scope.row.companyOtherInfo.businessContactsEn }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系方式" prop="telephone">
          <template slot-scope="scope">
            {{ scope.row.companyOtherInfo.telephone ? scope.row.companyOtherInfo.telephone : scope.row.companyOtherInfo.phone }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否收取企业订金" prop="isDepositGather">
          <template slot-scope="scope">
            {{ scope.row.isDepositGather === '0' ? '否' : (scope.row.isDepositGather === '1' ? '是' : '') }}
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="primary" size="medium">下载</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="prev, pager, next, jumper, total"
            :total="depositInfo.total"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
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
      activeName: 'first',
      loading: '',
      cantonFairCodeOpts: [],
      isDepositGatherOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      companyOpts: [],
      dealClusterOpts: [],
      queryForm: {
        cantonFairCode: '', // 广交会编码
        isDepositGather: '', // 是否收取订金
        companyId: '', // 企业id
        dealClusterId: '' // 交易团id
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('numberBrands', ['depositInfo']),
    formQuery() {
      return {
        cantonFairCode: this.queryForm.cantonFairCode, 
        isDepositGather: this.queryForm.isDepositGather,
        companyId: this.queryForm.companyId, 
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.loading = true;
    this.getDepositInfo({ current: 0, size: 0 }).then(res => {
      this.cantonFairCodeOpts = res.cantonFairCodeOpts;
      this.companyOpts = res.companyOpts;
      this.dealClusterOpts = res.dealClusterOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('numberBrands', ['getDepositInfo']),
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
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getDepositInfo(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.utils-button, .pagination-container{
  margin-top: 20px;
} 
</style>
