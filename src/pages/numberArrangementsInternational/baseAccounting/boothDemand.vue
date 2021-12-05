<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看交易团需求申报结果" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="查看维度">
          <el-select v-model="role" @change="createdQuery">
            <el-option v-for="(item, index) in roleOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团" v-if="role">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区" v-if="!role">
          <el-select v-model="queryForm.exhibitionAreaCode" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="createdQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 交易团维度 -->
      <el-table :data="delegationApply" border v-loading="loading" v-if="role">
        <el-table-column label="交易团" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="期数" align="center" prop="exhibitionPeriod"></el-table-column>
        <el-table-column label="展区" align="center" prop="exhibitionAreaName"></el-table-column>
        <el-table-column label="需求展位数" align="center" prop="boothNumber"></el-table-column>
      </el-table>
      <!-- 展区维度 -->
      <el-table :data="delegationApply" border v-loading="loading" v-if="!role">
        <el-table-column label="展区" align="center" prop="exhibitionAreaName"></el-table-column>
        <el-table-column label="需求展位数" align="center" prop="boothNumber"></el-table-column>
      </el-table>
      <el-row type="flex" justify="start" class="pagination-footer">
        <span class="add_btn">
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      role: true, // 维度角色 true为交易团 false为展区
      roleOpts: [{ value: true, label: '交易团维度' }, { value: false, label: '展区维度' }],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      queryForm: {
        delegationId: '',
        exhibitionAreaCode: '',
        selectType: ''
      }
    };
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "delegationApply"
    ]),
    formQuery() {
      return {
        selectType: '1',
        delegationId: this.queryForm.delegationId
      };
    },
    formQueryEx() {
      return {
        selectType: '2',
        exhibitionAreaCode: this.queryForm.exhibitionAreaCode
      };
    }
  },
  created() {
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions("baseAccounting", [
      "postDelegationNeedApply"
    ]),
    ...mapActions("nainformation", [
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 下载
    handleDownload() {
      if (this.role) {
        window.open(`${process.env.API_NA_URL}/api/ordinaryBase/selectDemandRecord/download?selectType=1&delegationId=${this.queryForm.delegationId}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
      } else {
        window.open(`${process.env.API_NA_URL}/api/ordinaryBase/selectDemandRecord/download?selectType=2&exhibitionArea=${this.queryForm.exhibitionArea}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
      }
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      let queryData = {};
      if (this.role) {
        queryData = this.formQuery;
      } else {
        queryData = this.formQueryEx;
      }
      this.postDelegationNeedApply(queryData).then(() => {
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
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}    
</style>