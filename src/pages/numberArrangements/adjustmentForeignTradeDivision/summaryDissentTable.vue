<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团汇总异议表" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="item in coceralOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评审企业">
          <el-select v-model="queryForm.companyCode" clearable>
            <el-option v-for="item in companyOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="foreignSummaryData.records" v-loading="loading" border>
        <el-table-column label="评审企业" prop="companyName" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="商协会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="原安排展位数" prop="beforeNumber" align="center"></el-table-column>
        <el-table-column label="异议内容" prop="objectionContent" align="center"></el-table-column>
        <el-table-column label="处理意见" prop="disposeOpinion" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium">打印</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="foreignSummaryData.total">
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
      coceralOpts: [],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyCode: '',
        coceralId: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('adjustmentForeignTradeDivision', ['foreignSummaryData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        companyCode: this.queryForm.companyCode,
        coceralId: this.queryForm.coceralId,
        dealClusterId: this.queryForm.dealClusterId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    this.createdQuery();
  },
  methods: {
    ...mapActions('adjustmentForeignTradeDivision', ['getForeignSummaryQuery', 'getForeignSummary']),
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
      this.getForeignSummaryQuery().then(res => {
        this.exhibitionAreaOpts = res.exhibitionAreaOptsT;
        this.dealClusterOpts = res.dealClusterOptsT;
        this.coceralOpts = res.coceralOptsT;
        this.companyOpts = res.companyOptsT;
        this.getForeignSummary(this.formQuery).then(() => {
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
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
