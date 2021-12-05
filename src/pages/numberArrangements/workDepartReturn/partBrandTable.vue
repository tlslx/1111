<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="生成当届调整安排表" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="item in coceralOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="adjustmentArrangeInfoData.records" v-loading="loading" border>
        <el-table-column label="编号" prop="publishId" align="center"></el-table-column>
        <el-table-column label="商会" prop="coceralName" align="center"></el-table-column>
        <el-table-column label="展届" prop="exhibitionSession" align="center"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="上届品牌展位数" prop="lastBrandBoothNumber" align="center"></el-table-column>
        <el-table-column label="本届品牌展位变化量" prop="changeBrandBoothNumber" align="center"></el-table-column>
        <el-table-column label="本届品牌展位数" prop="brandBoothNumber" align="center"></el-table-column>
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
          :total="adjustmentArrangeInfoData.total">
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
      coceralOpts: [],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        coceralId: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['adjustmentArrangeInfoData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
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
    ...mapActions('workDepartReturn', ['getAdjustmentArrangeInfo']),
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
      this.getAdjustmentArrangeInfo({ current: 0, size: 0 }).then(res => {
        this.exhibitionAreaOpts = res.exhibitionAreaOpts;
        this.dealClusterOpts = res.dealClusterOpts;
        this.coceralOpts = res.coceralOpts;
        this.getAdjustmentArrangeInfo(this.formQuery).then(() => {
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
