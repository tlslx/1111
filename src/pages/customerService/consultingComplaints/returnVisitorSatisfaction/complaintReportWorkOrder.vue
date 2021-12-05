/**
 * @file 投诉报障工单
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="投诉报障工单" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="工单号：">
          <el-input v-model="queryForm.workOrderNumber" placeholder="张"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="queryForm.workOrderType" clearable>
            <el-option v-for="item in workOrderTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="queryForm.status" clearable>
            <el-option v-for="item in statusOps" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="listByCondtion" v-loading="loading">
        <el-table-column label="工单号" prop="workOrderNumber" align="center"></el-table-column>
        <el-table-column label="类型" prop="workOrderType" align="center"></el-table-column>
        <el-table-column label="状态" prop="status" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="creationTime" align="center"></el-table-column>
        <el-table-column label="展览代码" prop="exhibitionNumber" align="center"></el-table-column>
        <el-table-column label="展览名称" prop="exhibitionName" align="center"></el-table-column>
        <el-table-column label="标题" prop="complaintReportTitle" align="center"></el-table-column>
        <el-table-column label="内容" prop="complaints" align="center"></el-table-column>
        <el-table-column label="项目" prop="complaintsReport" align="center"></el-table-column>
        <el-table-column label="投诉报障单号" prop="counselingComplainId" align="center"></el-table-column>
        <el-table-column label="下单人" prop="orderingPerson" align="center"></el-table-column>
        <el-table-column label="施工人员" prop="issueNum" align="center"></el-table-column>
        <el-table-column label="施工人员电话" prop="place" align="center"></el-table-column>
        <el-table-column label="操作" prop="issueNum" align="center"></el-table-column>
      </el-table>
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item>
          <el-button type="primary" @click="handleQuery">下载</el-button>
        </el-form-item>
      </el-form>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="listByCondtion.total">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      workOrderTypes: [], 
      statusOps: [], 
      queryForm: {
        workOrderNumber: '', 
        workOrderType: '', 
        status: '' 
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.loading = true;
    this.selectListByCondtion(this.complaintReportQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('returnVisitorSatisfaction', ['listByCondtion']),
    ...mapGetters('dictionary', ['dictionaryData']),
    complaintReportQuery() {
      return {
        workOrderNumber: this.queryForm.workOrderNumber,
        workOrderType: this.queryForm.workOrderType,
        status: this.queryForm.status,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  // async beforeCreate() {
  //   this.sessionNums = await kindo.dictionary.get('sessionNums'); // 届数
  //   this.issueNums = await kindo.dictionary.get('issueNums'); // 展期
  //   this.places = await kindo.dictionary.get('places'); // 展区
  // },
  methods: {
    ...mapActions('returnVisitorSatisfaction', ['selectListByCondtion']),
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.selectListByCondtion(this.complaintReportQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>













