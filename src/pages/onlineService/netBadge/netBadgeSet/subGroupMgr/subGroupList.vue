<template>
  <div class="subGroupListBox">
    <kindo-box title="分团指标列表">
      <kindo-box>
        <el-form :model="form" inline label-width="80px" size="small" label-position="right">
          <el-form-item label="分团名称:">
            <el-input v-model="form.deptName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="分团代码:">
            <el-input v-model="form.deptCode" placeholder=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table ref="tradeTableData" :pagination='false' :pageIndex='false' :height='"580px"' :url='api.getBranchTradeIndex' :queryParam="getQueryParam">
          <el-table-column label="分团代码" prop="deptCode" align="center" min-width="80"></el-table-column>
          <el-table-column label="分团名称" prop="deptName" align="center" min-width="80"></el-table-column>
          <el-table-column label="参展商证配额" prop="exhibitorBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="exhibitorBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="exhibitorBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="exhibitorBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="参展代表证配额" prop="exhibitorDelegateBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="exhibitorDelegateBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="exhibitorDelegateBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="exhibitorDelegateBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="筹展证配额" prop="prepareExhibitionBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="prepareExhibitionBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="prepareExhibitionBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="prepareExhibitionBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="撤展证配额" prop="cancelExhibitionBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="cancelExhibitionBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="cancelExhibitionBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="cancelExhibitionBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="操作" align="center" min-width="80" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" class="btnUnderline" @click="edit(scope)">修改</el-button>
              <el-button type="text" class="btnUnderline" @click="deleteSub(scope)">删除</el-button>
            </template>
          </el-table-column>
        </kindo-table>
        <!-- 交易团分团数据不多，暂时不做分页 -->
        <!-- <div class="pagination-block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current" :page-sizes="[5, 10, 15, 20, 30, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
          </el-pagination>
        </div> -->
      </kindo-box>
    </kindo-box>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/subGroupMgr/subGroupList",
      api: {
        getBranchTradeIndex: 'http://10.28.124.108:9001/api/branchTradeIndex/getBranchTradeIndex'
      },
      form: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 52
      },
      tableLoading: false
    };
  },
  methods: {
    edit(scope) {
      console.log({ ...scope });
    },
    deleteSub(scope) {
      console.log({ ...scope });
    },
    query() {
      console.log({ ...this.form });
      this.$refs.tradeTableData.loadData();
    },
    handleSizeChange(pagesize) {
      this.pagination.pageSize = pagesize;
      //   this.getTradeBadgeIndex();
    },
    handleCurrentChange(current) {
      this.pagination.current = current;
      //   this.getTradeBadgeIndex();
    }
  },
  mounted() {
    this.query();
  },
  computed: {
    getQueryParam() {
      return {
        queryParams: this.form
      };
    }
  }
};
</script>
<style lang="less" scoped>
.subGroupListBox {
  .pagination-block {
    float: right;
  }
  .btnUnderline {
    text-decoration: underline;
  }
}
</style>

