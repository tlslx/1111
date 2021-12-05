<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="统计生成退回展位企业列表清单" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyId" clearable>
            <el-option v-for="item in companyOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="情况分类">
          <el-select v-model="queryForm.backType" clearable>
            <el-option v-for="item in backTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="returnBoothData.records" v-loading="loading" border>
        <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column>
        <el-table-column label="商会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="申请展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="上届品牌展位数" prop="lastBoothNumber" align="center"></el-table-column>
        <el-table-column label="本届品牌展位变化量" prop="changeBoothNumber" align="center"></el-table-column>
        <el-table-column label="本届保留品牌展位数" prop="currentReserveNumber" align="center"></el-table-column>
        <el-table-column label="情况分类" prop="backType" align="center">
          <template slot-scope="scope">
            {{ scope.row.backType === 1 ? '全部退回' : '部分退回' }}
          </template>
        </el-table-column>
        <el-table-column label="退出原因" prop="backReason" align="center"></el-table-column>
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
          :total="returnBoothData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      exhibitionAreaOpts: [],
      dealClusterOpts: [],
      companyOpts: [],
      backTypeOpts: [{ value: '1', label: '全部退回' }, { value: '2', label: '部分退回' }],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyId: '',
        backType: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['returnBoothData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyId: this.queryForm.companyId,
        backType: this.queryForm.backType,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.loading = true;
    this.getReturnBooth({ current: 0, size: 10 }).then(res => {
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.dealClusterOpts = res.dealClusterOpts;
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('workDepartReturn', ['getReturnBooth']),
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
      this.getReturnBooth(this.formQuery).then(res => {
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
