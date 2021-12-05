<template>
  <div class="badgeIndexResultBox">
    <kindo-box title="各团证件指标查询">
      <kindo-box>
        <el-form :model="form" inline label-width="80px" size="small" label-position="right">
          <el-form-item label="交易团:">
            <el-select v-model="form.selectTrade" placeholder="">
              <el-option v-for="item in tradeOptions" :key="item.id" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table ref="tradeTableData" :pagination='false' :pageIndex='false' :height='"580px"' v-loading="tableLoading">
          <el-table-column label="交易团" prop="orgName" align="center" min-width="80"></el-table-column>
          <el-table-column label="参展商证" prop="exhibitorBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="exhibitorBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="exhibitorBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="exhibitorBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="参展代表证" prop="exhibitorDelegateBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="exhibitorDelegateBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="exhibitorDelegateBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="exhibitorDelegateBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="交易团工作证" prop="tradeGroupWorkBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="tradeGroupWorkBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="tradeGroupWorkBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="tradeGroupWorkBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="筹展证" prop="prepareExhibitionBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="prepareExhibitionBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="prepareExhibitionBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="prepareExhibitionBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
          <el-table-column label="撤展证" prop="cancelExhibitionBadgeIndex" align="center" min-width="80">
            <el-table-column label="一期" prop="cancelExhibitionBadgeIndex.1" align="center" min-width="80"></el-table-column>
            <el-table-column label="二期" prop="cancelExhibitionBadgeIndex.2" align="center" min-width="80"></el-table-column>
            <el-table-column label="三期" prop="cancelExhibitionBadgeIndex.3" align="center" min-width="80"></el-table-column>
          </el-table-column>
        </kindo-table>
        <div class="pagination-block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current" :page-sizes="[5, 10, 15, 20, 30, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
          </el-pagination>
        </div>
      </kindo-box>
    </kindo-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/badgeIndexCal/badgeIndexResult",
      api: {
        getTradeInfo: kindo.config.api.osUrl + '/api/tradeRestrict/getTradeInfo',
        getTradeBadgeIndex: kindo.config.api.osUrl + '/api/settingBadgeIndex/getTradeBadgeIndex'
        // getTradeBadgeIndex: 'http://10.28.124.108:9001/api/settingBadgeIndex/getTradeBadgeIndex'
      },
      tableLoading: false,
      form: {
        selectTrade: ''
      },
      tradeOptions: [],
      tradeTableData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 52
      }
    };
  },
  methods: {
    handleSizeChange(pagesize) {
      this.pagination.pageSize = pagesize;
      this.getTradeBadgeIndex();
    },
    handleCurrentChange(current) {
      this.pagination.current = current;
      this.getTradeBadgeIndex();
    },
    query() {
      this.getTradeBadgeIndex();
    },
    getTradeInfo() {
      this.$http.get(this.api.getTradeInfo)
        .then(res => {
          res.forEach(r => {
            this.tradeOptions.push({
              id: r.deptId,
              value: r.deptId,
              label: r.deptName
            });
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    getTradeBadgeIndex() {
      this.tableLoading = true;
      const req = {
        json: {
          customQueryParams: {
            orgId: this.form.selectTrade
          }
        }
      };
      this.$http.get(this.api.getTradeBadgeIndex, req)
        .then(res => {
          this.$refs.tradeTableData.internalData = this.buildInternalData(res);
          this.tableLoading = false;
        });
    },
    buildInternalData(data) {
      const pagination = { ...this.pagination };
      pagination.total = data.length;
      const start = (pagination.current - 1) * pagination.pageSize;
      const end = start + pagination.pageSize;
      const internalData = data.slice(start, end);
      this.pagination = pagination;
      return internalData;
    }
  },
  mounted() {
    this.getTradeInfo();
    this.getTradeBadgeIndex();
  },
  computed: {
    getQueryParam() {
      return {
        queryParams: {
          id: this.form.selectTrade
        }
      };
    }
  }

};
</script>

<style lang="less" scoped>
.badgeIndexResultBox {
  .pagination-block {
    float: right;
  }
}
</style>


