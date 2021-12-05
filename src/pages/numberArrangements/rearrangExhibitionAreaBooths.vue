<template>
  <!-- <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="含退回情况汇总" name="first"> -->
  <div>
    <el-form :model="queryForm" :inline="true">
      <el-form-item label="申请展区">
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
      <el-form-item label="情况分类">
        <el-select v-model="queryForm.backType" clearable>
          <el-option v-for="item in backTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广交会编码">
        <el-input placeholder="请输入" v-model.trim="queryForm.cantonFairCode" clearable></el-input>
      </el-form-item>
      <el-form-item label="退回原因">
        <el-input placeholder="请输入" v-model.trim="queryForm.backReason" clearable></el-input>
      </el-form-item>
      <el-form-item label="商会">
        <el-select v-model="queryForm.coceralId" clearable>
          <el-option v-for="(item, index) in coceralOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="returnBoothData.records" v-loading="loading" border>
    <!-- <el-table :data="boothReorderData.records" v-loading="loading" border> -->
      <el-table-column label="展期" prop="exhibitionPeriod" align="center"></el-table-column>
      <el-table-column label="商会" prop="coceralName" align="center"></el-table-column>
      <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
      <el-table-column label="交易团" prop="dealClusterName" align="center"></el-table-column>
      <el-table-column label="广交会编码" prop="cantonFairCode" align="center"></el-table-column>
      <el-table-column label="企业名称" prop="companyName" align="center"></el-table-column>
      <el-table-column label="退回前品牌展位数" prop="lastBoothNumber" align="center"></el-table-column>
      <el-table-column label="退回品牌展位数" prop="changeBoothNumber" align="center"></el-table-column>
      <el-table-column label="保留品牌展位数" prop="currentReserveNumber" align="center"></el-table-column>
    <!--  <el-table-column label="退回展位号" prop="backBooth" align="center"></el-table-column> -->
      <el-table-column label="情况分类" prop="backType" align="center">
        <template slot-scope="scope">
          {{ scope.row.backType === 1 ? '全部退回' : '部分退回' }}
        </template>
      </el-table-column>
      <el-table-column label="退回原因" prop="backReason" align="center"></el-table-column>
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
        :total="returnBoothData.total">
        <!-- :total="boothReorderData.total"> -->
      </el-pagination>
    </el-row>
  </div>
    <!-- </el-tab-pane>
  </el-tabs> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      exhibitionAreaOpts: [],
      delegationOpts: [],
      companyOpts: [],
      coceralOpts: [],
      backTypeOpts: [{ value: '1', label: '全部退回' }, { value: '2', label: '部分退回' }],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        caller: '2',
        companyName: '',
        coceralId: '',
        backType: '',
        cantonFairCode: '',
        backReason: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('workDepartReturn', ['boothReorderData',
      "returnBoothData" // 李康 修改 5/16
    ]),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        caller: this.queryForm.caller,
        companyName: this.queryForm.companyName,
        coceralId: this.queryForm.coceralId,
        backType: this.queryForm.backType,
        cantonFairCode: this.queryForm.cantonFairCode,
        backReason: this.queryForm.backReason,
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
    if (this.$store.getters.userInfo.org.parentName.indexOf('商协会') !== -1 || this.$store.getters.userInfo.org.parentName.indexOf('商会') !== -1) {
      this.coceralOpts = {
        label: this.$store.getters.userInfo.org.deptName,
        value: this.$store.getters.userInfo.org.deptCode
      };
      this.queryForm.coceralId = this.$store.getters.userInfo.org.deptCode;
    } else {
      // 商协会
      this.getassociationDepartment().then(res => {
        this.coceralOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
    }
    this.createdQuery();
  },
  methods: {
    ...mapActions('workDepartReturn', ['getBoothReorder',
      "getReturnBooth" // 李康 修改于5/16
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    //coceralId: '',cantonFairCode: '',backReason: ''
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&dealClusterId=${this.queryForm.dealClusterId}&caller=${"2"}&companyName=${this.queryForm.companyName}&backType=${this.queryForm.backType}`;
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/backArrange/exportReturnCompanyInfo/download?${url}&token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
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
      // this.getBoothReorder(this.formQuery).then(res => {
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
