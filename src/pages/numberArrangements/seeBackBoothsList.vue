<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团查看退回展位列表" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-select v-model="queryForm.cantonFairCode" clearable>
            <el-option v-for="(item, index) in cantonFairCodeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyId" clearable>
            <el-option v-for="(item, index) in companyOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="seeBackBoothsList.records" v-loading="loading" border>
        <el-table-column align="center" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="退回展位数" prop="backBoothNumber"></el-table-column>
        <el-table-column align="center" label="本届保留展位数" prop="currentReserveNumber"></el-table-column>
        <el-table-column align="center" label="退回书附件" prop="attachment">
          <template slot-scope="scope">
            <el-button type="text">预览图片</el-button>
          </template>
        </el-table-column>
        <el-table-column label="退回原因" align="center" prop="backReason"></el-table-column>
      </el-table>
      <el-button class="utils-button" type="primary" size="medium">下载</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="seeBackBoothsList.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
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
      exhibitionAreaOpts: [],
      cantonFairCodeOpts: [],
      companyOpts: [],
      queryForm: {
        dealClusterId: this.$store.getters.userInfo.org.deptId, // 交易团id 暂时数据
        exhibitionArea: '', // 展区id
        cantonFairCode: '', // 广交会编码
        companyId: '' // 企业id
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('numberBrands', ['seeBackBoothsList']),
    // 查询数据
    formQuery() {
      return {
        dealClusterId: this.queryForm.dealClusterId,
        cantonFairCode: this.queryForm.cantonFairCode,
        exhibitionArea: this.queryForm.exhibitionArea,
        companyId: this.queryForm.companyId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.loading = true;
    this.getSeeBackBoothsList({ dealClusterId: this.queryForm.dealClusterId, current: 0, size: 0 }).then(res => {
      this.cantonFairCodeOpts = res.cantonFairCodeOpts;
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('numberBrands', ['getSeeBackBoothsList']),
    ...mapActions('nainformation', ['getexhibitionArea']),
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
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getSeeBackBoothsList(this.formQuery).then(() => {
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
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
