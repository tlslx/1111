<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="参照企业设置（查询结果界面）" name="first">
      <el-form :model="queryForm" :inline="true" label-width="80">
        <el-form-item label="届数">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionAreaCode" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="queryForm.boothType" clearable>
            <el-option v-for="(item, index) in boothTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
        </el-form-item>
        <el-form-item label="结算方式">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="贫困企业标志">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
      <el-table border v-loading="loading">
        <el-table-column label="届数" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="交易团" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="企业" align="center" prop="companyName"></el-table-column>
        <el-table-column label="展区" align="center" prop="exhibitionAreaName"></el-table-column>
        <el-table-column label="展位类型" align="center" prop="boothType">
          <template slot-scope="scope">
            {{ scope.row.boothType | boothTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="结算方式" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="贫困企业" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="展位费优惠比例" align="center" prop="delegationName"></el-table-column>
      </el-table>
      <el-row type="flex" justify="center" class="pagination-footer">
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="0">
        </el-pagination>
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
      // 查询条件
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      boothTypeOpts: [{ value: '1', label: '品牌展位' }, { value: '2', label: '一般性展位' }],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      pageInfo: { current: 1, size: 10 }
    };
  },
  filters: {
    boothTypeFilter: value => {
      let val = value + '';
      switch (val) {
        case '1':
          return '品牌展位';
        case '2':
          return '一般性展位';
        default:
          return;    
      }
    }
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "delegationApply"
    ]),
    formQuery() {
      return {
        exhibitionSession: this.queryForm.exhibitionSession,
        delegationId: this.queryForm.delegationId,
        exhibitionAreaCode: this.queryForm.exhibitionAreaCode,
        boothType: this.queryForm.boothType,
        companyName: this.queryForm.companyName,
        current: this.queryForm.current,
        size: this.queryForm.size
      };
    }
  },
  created() {
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
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
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 查询
    handleQuery() {
      this.pageInfo.current = 1;
    },
    // 操作页面
    handleSizeChange(val) {
      this.pageInfo.current = val;
    },
    handleCurrentChange(val) {
      this.pageInfo.size = val;
    },
    // 查询封装
    createdQuery() {
      
    }
  }
};
</script>
<style scoped>
.pagination-container{
  float: right;
}
.queryBtn{
  margin-bottom: 20px;
}
.setForm{
  width: 70%;
  min-width: 550px;
  margin: 0 auto;
}
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}    
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>