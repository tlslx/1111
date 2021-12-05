<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="结算配置列表" name="first">
      <el-form :model="queryForm" :inline="true" label-width="80">
        <el-form-item label="展期">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="款项类别">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
            <el-select v-model="queryForm.delegationId" clearable>
              <el-option v-for="(item, index) in delegationOpts" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="展位">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionAreaCode" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
            <el-select v-model="queryForm.delegationIsRecommend" clearable>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="审核不通过" value="0"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">筛选</el-button>
        </el-form-item>
      </el-form>
        <div class="queryBtn">
            <el-button type="primary" @click="isSet = true; diaTitle = '新增'">新增</el-button>
            <el-button type="primary" >执行记录</el-button>
        </div>
     <el-table border v-loading="loading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="展期" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="标题" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="款项类别" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="交易团" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展位" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展区" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="执行状态" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="提交审批" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="审批状态" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text">结算</el-button>
              <el-button type="text">修改</el-button>
              <el-button type="text">删除</el-button>
              <el-button type="text">下载</el-button>
            </div>
          </template>
        </el-table-column>
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
      // 结算设置
      isSet: false,
      setForm: {
        settlementType: ''
      },
      settlementTypeOpts: [],
      labelTitle: '',
      setRule: {

      },
      // 贫困企业比例
      isPoor: false,
      poorForm: {

      },
      poorRule: {

      },
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