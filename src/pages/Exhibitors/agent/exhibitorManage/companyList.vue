/**
* @file 企业列表
* @author: weiwei
* @date:2019/6/5
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="企业列表" name="first">
      <el-form :inline="true" :model="queryForm">
        <el-form-item label="企业名称" size="small" prop="companyName">
          <el-input v-model="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="国家/地区" size="small" prop="countryRegionId">
          <el-select v-model="queryForm.countryRegionId" clearable>
            <!-- <el-option v-for="item in []" :key="item" :value="item"></el-option> -->
            <el-option v-for="item in countries" :key="item.countryRegionId"
              :label="item.crChName" :value="item.countryRegionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" prop="countryRegionId">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="companyListData.records">
        <el-table-column prop="companyNameCh" label="企业中文名称"></el-table-column>
        <el-table-column prop="companyNameEn" label="企业英文名称"></el-table-column>
        <el-table-column prop="crChName" label="国家/地区"></el-table-column>
        <el-table-column prop="cantonCode" label="广交会编码"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row.companyId)">编辑</el-button>
            <el-button type="text" @click="handleRecords(scope.row.companyId)">企业信息修改记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="companyListData.total">
        </el-pagination>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      pageInfoData: {
        currentPage: 1, pageSize: 10
      },
      queryForm: { companyName: '', countryRegionId: '' },
      countries: []
    };
  },
  computed: {
    ...mapGetters('companyInfo', ['companyListData']),
    queryParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize,
        companyName: this.queryForm.companyName,
        countryRegionId: this.queryForm.countryRegionId,
        orderByField: 'ic.create_date',
        isAsc: false
      };
    }
  },
  created() {
    this.getAllCountryInfo().then(res => {
      this.countries = res;
    }).then(() => {
      this.getCompanyList(this.queryParams);
    });
  },
  methods: {
    ...mapActions("companyInfo", ["getCompanyList"]),
    ...mapActions('regist', ['getAllCountryInfo']),
    // 修改
    handleEdit(_companyId) {
      this.$router.push({
        path: '/agentPerfectInfo',
        query: {
          companyId: _companyId
        }
      });
    },
    handleRecords(_companyId) {
      this.$router.push({
        path: '/agentInfoUpdate',
        query: {
          companyId: _companyId
        }
      });
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getCompanyList(this.queryParams);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getCompanyList(this.queryParams);
    },
    handleQuery() {
      this.getCompanyList(this.queryParams);
    }
  }
};
</script>
<style lang='less' scoped>

</style>
