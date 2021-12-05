<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="候选企业排序表" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="商协会">
          <el-select v-model="queryForm.coceralId" clearable>
            <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <p v-if="isArrang">该展区可重新安排展位 {{ arrangForm.backBoothNumber }} 个，商协会安排 {{ arrangForm.scheduleBoothNumber }} 个，尚余 {{ arrangForm.arrangableBoothNumber }} 个未安排。</p>
      <el-table :data="candiSortDataList" v-loading="loading" :span-method="arraySpanMethod" border>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="品牌评审结果未安排企业排名" prop="rowNo" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="商协会评分" prop="coceralTotalGrade" align="center"></el-table-column>
        <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
        <el-table-column label="拟安排展位数" prop="scheduleBoothNumber" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="是否涉及岛形展位" prop="isIsland" align="center"></el-table-column>
        <el-table-column label="是否新企业" prop="isNewEnterprises" align="center"></el-table-column>
        <el-table-column label="商会安排理由" prop="scheduleReason" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="candiSortData.total">
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
      isArrang: false,
      candiSortDataList: [],
      exhibitionAreaOpts: [],
      delegationOpts: [],
      coceralOpts: [],
      companyOpts: [],
      arrangForm: {
        exhibitionArea: '', // 展区
        backBoothNumber: '', // 可重新安排展位数
        scheduleBoothNumber: '', // 商协会安排
        arrangableBoothNumber: '' // 未安排
      },
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyName: '',
        coceralId: '',
        cantonFairCode: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['boothArrangeNum', 'candiSortData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyName: this.queryForm.companyName,
        coceralId: this.queryForm.coceralId,
        cantonFairCode: this.queryForm.cantonFairCode,
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
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商会
    this.getassociationDepartment().then(res => {
      this.coceralOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getBoothArrangeNumber', 'postCandidateSortInfo']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 合并列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.scheduleBoothNumber) {
        if (columnIndex === 0) {
          return [1, 3];
        } else if (columnIndex === 1) {
          return [0, 0];
        } else if (columnIndex === 2) {
          return [0, 0];
        }
        row.exhibitionAreaName = row.companyName;
      }
    },
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&cantonFairCode=${this.queryForm.cantonFairCode}&coceralId=${this.queryForm.coceralId}&companyName=${this.queryForm.companyName}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/reschedule/candidateCompany/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      if (this.queryForm.exhibitionArea) {
        this.getBoothArrangeNumber({ exhibitionArea: this.queryForm.exhibitionArea }).then(res => {
          this.arrangForm.backBoothNumber = res.backBoothNumber;
          this.arrangForm.scheduleBoothNumber = res.scheduleBoothNumber;
          this.arrangForm.arrangableBoothNumber = res.arrangableBoothNumber;
          this.isArrang = true;
          this.createdQuery();
        }).catch(e => {});
      } else {
        this.isArrang = false;
        this.createdQuery();
      }
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
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.postCandidateSortInfo(this.formQuery).then(res => {
        this.loading = false;
        this.candiSortDataList = JSON.parse(JSON.stringify(res.records));
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
